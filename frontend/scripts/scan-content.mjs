// Content scanner / codemod for the admin "Page Content" manager.
//
//   node scripts/scan-content.mjs          -> wrap un-wrapped text/images + regenerate manifest
//   node scripts/scan-content.mjs --dry    -> only report what would change (no file writes)
//   node scripts/scan-content.mjs --manifest-only
//
// What it does (idempotent):
//  1. Static JSX text   `<h2>Hello</h2>`           -> `<h2><T k="page_ab12cd" d={"Hello"} /></h2>`
//  2. Literal images    `<Image src="/a.png" />`   -> `<CImage k="page_ef34ab" src="/a.png" />`
//                       `<img src="/a.png" />`     -> `<CImg   k="page_ef34ab" src="/a.png" />`
//  3. Builds backend/data/content-manifest.json (page -> section -> items with original text).
//
// Defaults stay byte-for-byte identical to the original markup, so the website renders
// exactly the same until an admin overrides a value.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { discoverFiles, MANIFEST_OUT, FRONTEND_ROOT } from "./content-config.mjs";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const MANIFEST_ONLY = args.has("--manifest-only");

const EDITABLE_IMPORT = "@/components/content/Editable";
const SKIP_TAGS = new Set(["script", "style", "option", "textarea", "title", "noscript", "Script", "pre", "code"]);
const SECTION_FALLBACK_TAGS = new Set(["header", "main", "footer", "aside", "article", "nav"]);

const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c",
  ndash: "\u2013", mdash: "\u2014", hellip: "\u2026", copy: "\u00a9",
  reg: "\u00ae", trade: "\u2122", bull: "\u2022", middot: "\u00b7",
  times: "\u00d7", rarr: "\u2192", larr: "\u2190", deg: "\u00b0",
  plusmn: "\u00b1", laquo: "\u00ab", raquo: "\u00bb", euro: "\u20ac",
  hearts: "\u2665", check: "\u2713",
};

/** Decodes JSX entities; returns null when an unknown entity is found (node is then skipped). */
function decodeEntities(s) {
  let unknown = false;
  const out = s.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, (m, body) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    if (body in NAMED_ENTITIES) return NAMED_ENTITIES[body];
    unknown = true;
    return m;
  });
  return unknown ? null : out;
}

/** Same algorithm React/Babel use to turn raw JSXText into the rendered string. */
function cleanJsxText(raw) {
  const lines = raw.split(/\r\n|\n|\r/);
  let lastNonEmpty = 0;
  lines.forEach((l, i) => {
    if (/[^ \t]/.test(l)) lastNonEmpty = i;
  });
  let str = "";
  lines.forEach((line, i) => {
    const isFirst = i === 0;
    const isLast = i === lines.length - 1;
    let t = line.replace(/\t/g, " ");
    if (!isFirst) t = t.replace(/^[ ]+/, "");
    if (!isLast) t = t.replace(/[ ]+$/, "");
    if (t) {
      if (i !== lastNonEmpty) t += " ";
      str += t;
    }
  });
  return str;
}

const hash6 = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 6);

const tagNameOf = (el) => (el.tagName ? el.tagName.getText() : "");
const jsxTag = (node) => {
  if (ts.isJsxElement(node)) return tagNameOf(node.openingElement);
  if (ts.isJsxSelfClosingElement(node)) return tagNameOf(node);
  return "";
};

function getAttr(opening, name) {
  for (const a of opening.attributes.properties) {
    if (ts.isJsxAttribute(a) && a.name.getText() === name) return a;
  }
  return null;
}

/** String value of a JSX attribute if it's a plain literal (src="x", src={"x"}, src={`x`}). */
function literalAttr(attr) {
  if (!attr || !attr.initializer) return null;
  const init = attr.initializer;
  if (ts.isStringLiteral(init)) return init.text;
  if (ts.isJsxExpression(init) && init.expression) {
    const e = init.expression;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
  }
  return null;
}

const parse = (file, text) =>
  ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function walk(node, cb) {
  cb(node);
  ts.forEachChild(node, (c) => walk(c, cb));
}

function hasSkippedAncestor(node) {
  for (let p = node.parent; p; p = p.parent) {
    if (ts.isJsxElement(p) || ts.isJsxSelfClosingElement(p)) {
      const tag = jsxTag(p);
      if (SKIP_TAGS.has(tag)) return true;
      const opening = ts.isJsxElement(p) ? p.openingElement : p;
      if (getAttr(opening, "data-no-edit")) return true;
    }
    if (ts.isFunctionLike(p) && !ts.isArrowFunction(p) && !ts.isFunctionExpression(p)) break;
  }
  return false;
}

// ── 1) Codemod ──────────────────────────────────────────────────────────────

/** Collect keys already present in the page so new keys never collide. */
function collectUsedKeys(files) {
  const used = new Set();
  for (const f of files) {
    const text = fs.readFileSync(f.file, "utf8");
    const sf = parse(f.file, text);
    walk(sf, (n) => {
      if (ts.isJsxSelfClosingElement(n) && ["T", "CImage", "CImg"].includes(tagNameOf(n))) {
        const k = literalAttr(getAttr(n, "k"));
        if (k) used.add(k);
      }
    });
  }
  return used;
}

function makeKey(pageKey, seed, used) {
  const base = `${pageKey}_${hash6(seed)}`;
  let key = base;
  let n = 2;
  while (used.has(key)) key = `${base}_${n++}`;
  used.add(key);
  return key;
}

function transformFile(entry, used) {
  const original = fs.readFileSync(entry.file, "utf8");
  const sf = parse(entry.file, original);
  const edits = []; // { start, end, text }
  const need = new Set();
  let textCount = 0;
  let imageCount = 0;

  // next/image local name
  let nextImageName = null;
  for (const st of sf.statements) {
    if (ts.isImportDeclaration(st) && st.moduleSpecifier.text === "next/image" && st.importClause?.name) {
      nextImageName = st.importClause.name.text;
    }
  }

  walk(sf, (node) => {
    // ── text ──
    if (ts.isJsxText(node)) {
      if (node.containsOnlyTriviaWhiteSpaces) return;
      const parent = node.parent;
      if (!(ts.isJsxElement(parent) || ts.isJsxFragment(parent))) return;
      if (hasSkippedAncestor(node)) return;

      const raw = original.slice(node.pos, node.end);
      const cleaned = cleanJsxText(raw);
      if (!cleaned) return;
      const decoded = decodeEntities(cleaned);
      if (decoded === null) return;
      if (!/[\p{L}\p{N}]/u.test(decoded)) return;

      const key = makeKey(entry.pageKey, decoded, used);
      edits.push({
        start: node.pos,
        end: node.end,
        text: `<T k="${key}" d={${JSON.stringify(decoded)}} />`,
      });
      need.add("T");
      textCount++;
      return;
    }

    // ── images ──
    const isSelf = ts.isJsxSelfClosingElement(node);
    const isOpen = ts.isJsxOpeningElement(node);
    if (!isSelf && !isOpen) return;
    const tag = tagNameOf(node);
    const isNextImage = nextImageName && tag === nextImageName;
    if (!isNextImage && tag !== "img") return;
    if (hasSkippedAncestor(node)) return;

    const src = literalAttr(getAttr(node, "src"));
    if (!src || src.startsWith("data:") || src.includes("${")) return;
    if (getAttr(node, "k")) return; // already converted

    const key = makeKey(entry.pageKey, src, used);
    const newName = isNextImage ? "CImage" : "CImg";
    edits.push({ start: node.tagName.getStart(sf), end: node.tagName.end, text: `${newName} k="${key}"` });
    if (isOpen) {
      const closing = node.parent.closingElement;
      if (closing) edits.push({ start: closing.tagName.getStart(sf), end: closing.tagName.end, text: newName });
    }
    need.add(newName);
    imageCount++;
  });

  if (edits.length === 0) return { text: original, textCount: 0, imageCount: 0, changed: false };

  // Import handling
  let importEdit = null;
  const existing = sf.statements.find(
    (st) => ts.isImportDeclaration(st) && st.moduleSpecifier.text === EDITABLE_IMPORT
  );
  if (existing) {
    const names = new Set(
      existing.importClause?.namedBindings && ts.isNamedImports(existing.importClause.namedBindings)
        ? existing.importClause.namedBindings.elements.map((e) => e.name.text)
        : []
    );
    const all = [...new Set([...names, ...need])];
    if (all.length !== names.size) {
      importEdit = {
        start: existing.getStart(sf),
        end: existing.end,
        text: `import { ${all.sort().join(", ")} } from "${EDITABLE_IMPORT}";`,
      };
    }
  } else {
    const imports = sf.statements.filter(ts.isImportDeclaration);
    const names = [...need].sort().join(", ");
    const line = `import { ${names} } from "${EDITABLE_IMPORT}";`;
    if (imports.length) {
      const last = imports[imports.length - 1];
      importEdit = { start: last.end, end: last.end, text: `\n${line}` };
    } else {
      // after "use client" directive if present
      const first = sf.statements[0];
      const afterDirective =
        first && ts.isExpressionStatement(first) && ts.isStringLiteral(first.expression) ? first.end : 0;
      importEdit = { start: afterDirective, end: afterDirective, text: `\n${line}\n` };
    }
  }
  if (importEdit) edits.push(importEdit);

  // apply from the end so offsets stay valid
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  let text = original;
  for (const e of edits) text = text.slice(0, e.start) + e.text + text.slice(e.end);
  return { text, textCount, imageCount, changed: true };
}

// ── 2) Manifest ─────────────────────────────────────────────────────────────

const HEADING_RE = /^h[1-6]$/;
const prettify = (s) =>
  s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();

function extractFromFile(entry, text, sectionCounter) {
  const sf = parse(entry.file, text);
  const found = []; // document-order items
  walk(sf, (n) => {
    if (!ts.isJsxSelfClosingElement(n)) return;
    const tag = tagNameOf(n);
    if (!["T", "CImage", "CImg"].includes(tag)) return;
    const k = literalAttr(getAttr(n, "k"));
    if (!k) return;
    const isText = tag === "T";
    const def = isText ? literalAttr(getAttr(n, "d")) : literalAttr(getAttr(n, "src"));
    if (def === null) return;
    found.push({ node: n, key: k, isText, def });
  });

  const sectionInfo = new Map(); // section node -> { id, label, count, typeCounts }
  const sectionOf = (n) => {
    let fallback = null;
    for (let p = n.parent; p; p = p.parent) {
      if (ts.isJsxElement(p)) {
        const tag = jsxTag(p);
        if (tag === "section") return p;
        if (!fallback && SECTION_FALLBACK_TAGS.has(tag)) fallback = p;
      }
    }
    return fallback;
  };

  const headingFor = (sectionNode) => {
    // first heading T inside the section
    let heading = null;
    walk(sectionNode, (n) => {
      if (heading || !ts.isJsxSelfClosingElement(n) || tagNameOf(n) !== "T") return;
      const parent = n.parent;
      if (ts.isJsxElement(parent) && HEADING_RE.test(jsxTag(parent))) heading = literalAttr(getAttr(n, "d"));
    });
    return heading;
  };

  const sections = []; // ordered: { node|null, items: [] }
  const bySectionNode = new Map();

  for (const f of found) {
    const sNode = sectionOf(f.node);
    let sec = bySectionNode.get(sNode ?? "general");
    if (!sec) {
      sec = { node: sNode, items: [], typeCounts: {} };
      bySectionNode.set(sNode ?? "general", sec);
      sections.push(sec);
    }
    const parent = f.node.parent;
    const parentTag = ts.isJsxElement(parent) ? jsxTag(parent) : "";
    let type = "image";
    if (f.isText) {
      if (HEADING_RE.test(parentTag)) type = "heading";
      else if (parentTag === "p" || f.def.length > 140) type = "paragraph";
      else if (["a", "button", "Link"].includes(parentTag)) type = "link";
      else if (parentTag === "li") type = "list";
      else type = "text";
    }
    sec.typeCounts[type] = (sec.typeCounts[type] || 0) + 1;
    const nice = { heading: "Heading", paragraph: "Paragraph", link: "Button / Link", list: "List item", text: "Text", image: "Image" }[type];
    const altAttr = !f.isText ? literalAttr(getAttr(f.node, "alt")) : null;
    sec.items.push({
      key: f.key,
      type,
      label: `${nice} ${sec.typeCounts[type]}`,
      default: f.def,
      ...(altAttr ? { alt: altAttr } : {}),
    });
  }

  return sections.map((s) => {
    sectionCounter.n += 1;
    let name = null;
    if (s.node) {
      name = headingFor(s.node);
      if (!name) {
        const opening = s.node.openingElement;
        name = literalAttr(getAttr(opening, "aria-label")) || (literalAttr(getAttr(opening, "id")) && prettify(literalAttr(getAttr(opening, "id"))));
      }
    }
    const short = name ? (name.length > 60 ? name.slice(0, 57) + "…" : name) : null;
    return {
      key: `s${sectionCounter.n}`,
      label: `Section ${sectionCounter.n}${short ? ` — ${short}` : s.node ? "" : " — General"}`,
      items: s.items,
    };
  });
}

// ── main ────────────────────────────────────────────────────────────────────

const entries = discoverFiles();
const byPage = new Map();
for (const e of entries) {
  if (!byPage.has(e.pageKey)) byPage.set(e.pageKey, []);
  byPage.get(e.pageKey).push(e);
}

let totalText = 0;
let totalImages = 0;
let changedFiles = 0;
const manifestPages = [];

for (const [pageKey, files] of byPage) {
  const used = collectUsedKeys(files);
  const counter = { n: 0 };
  const sections = [];

  for (const entry of files) {
    let text = fs.readFileSync(entry.file, "utf8");
    if (!MANIFEST_ONLY) {
      const res = transformFile(entry, used);
      if (res.changed) {
        changedFiles++;
        totalText += res.textCount;
        totalImages += res.imageCount;
        text = res.text;
        if (!DRY) fs.writeFileSync(entry.file, text);
      }
    }
    sections.push(...extractFromFile(entry, text, counter));
  }

  const itemCount = sections.reduce((n, s) => n + s.items.length, 0);
  if (itemCount === 0) continue;
  const first = files[0];
  manifestPages.push({
    pageKey,
    route: first.route,
    label: first.label,
    group: first.group,
    sections,
  });
}

manifestPages.sort((a, b) => a.route.localeCompare(b.route));

if (!DRY) {
  fs.mkdirSync(path.dirname(MANIFEST_OUT), { recursive: true });
  fs.writeFileSync(
    MANIFEST_OUT,
    JSON.stringify({ generatedAt: new Date().toISOString(), pages: manifestPages }, null, 1)
  );
}

const items = manifestPages.reduce((n, p) => n + p.sections.reduce((m, s) => m + s.items.length, 0), 0);
console.log(
  `${DRY ? "[dry] " : ""}files changed: ${changedFiles}, new text nodes: ${totalText}, new images: ${totalImages}\n` +
    `manifest: ${manifestPages.length} pages, ${items} editable items${DRY ? "" : " -> " + path.relative(FRONTEND_ROOT, MANIFEST_OUT)}`
);
