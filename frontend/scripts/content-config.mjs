// Shared config for content scanning tools (scan-content.mjs, snapshot).
// Decides which source files are "content pages" and maps them to a pageKey.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const FRONTEND_ROOT = path.resolve(__dirname, "..");
export const APP_DIR = path.join(FRONTEND_ROOT, "src", "app");
export const COMPONENTS_HOME_DIR = path.join(FRONTEND_ROOT, "src", "components", "home");
export const MANIFEST_OUT = path.resolve(FRONTEND_ROOT, "..", "backend", "data", "content-manifest.json");

// Top-level route segments whose pages are editable from the admin Page Content manager.
const INCLUDED_ROOTS = new Set([
  "about",
  "departments",
  "services",
  "careers",
  "media",
  "blog",
  "stories",
  "our-locations",
  "doctors",
]);

const GROUP_BY_ROOT = {
  "": "Home",
  about: "About Us",
  "our-locations": "Popular Finds",
  stories: "Popular Finds",
  doctors: "Popular Finds",
  departments: "Departments",
  services: "Services",
  careers: "Careers",
  media: "Media & Blog",
  blog: "Media & Blog",
};

const ACRONYMS = new Set(["ctvs", "ent", "ivf", "csr", "md", "ppl", "opd", "icu", "nicu"]);

const FILE_RE = /^(page|.*Client.*|.*Sidebar)\.tsx$/;

const titleize = (slug) =>
  slug
    .split("-")
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

export function describeRoute(route) {
  const segs = route.split("/").filter(Boolean);
  const root = segs[0] || "";
  const group = GROUP_BY_ROOT[root] ?? "Other";
  if (segs.length === 0) return { pageKey: "home", label: "Home Page", group };
  const pageKey = segs.join("-");
  const rest = segs.slice(1).map(titleize).join(" › ");
  const head = segs.length === 1 ? titleize(segs[0]) : group === "Media & Blog" || group === "Popular Finds" ? titleize(segs[0]) : group;
  const label = segs.length === 1 ? `${head} (Main Page)` : `${head} › ${rest}`;
  return { pageKey, label, group };
}

function excludedSegment(seg) {
  return seg.startsWith("[") || seg.startsWith("_") || seg.startsWith("(") || seg.startsWith("admin");
}

/** Returns [{ file, route, pageKey, label, group }] sorted by route then file. */
export function discoverFiles() {
  const out = [];

  const walk = (dir, segs) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (excludedSegment(entry.name)) continue;
        if (segs.length === 0 && !INCLUDED_ROOTS.has(entry.name)) continue;
        walk(path.join(dir, entry.name), [...segs, entry.name]);
      } else if (entry.name.endsWith(".tsx") && FILE_RE.test(entry.name)) {
        // Root level: only HomeClient.tsx (and page.tsx which has no visible text)
        if (segs.length === 0 && entry.name !== "HomeClient.tsx") continue;
        const route = "/" + segs.join("/");
        out.push({ file: path.join(dir, entry.name), route: route === "/" ? "/" : route });
      }
    }
  };
  walk(APP_DIR, []);

  if (fs.existsSync(COMPONENTS_HOME_DIR)) {
    for (const f of fs.readdirSync(COMPONENTS_HOME_DIR)) {
      if (f.endsWith(".tsx")) out.push({ file: path.join(COMPONENTS_HOME_DIR, f), route: "/" });
    }
  }

  return out
    .map((o) => ({ ...o, ...describeRoute(o.route) }))
    .sort((a, b) => a.route.localeCompare(b.route) || a.file.localeCompare(b.file));
}

/** Routes that can be fetched for snapshot testing (static pages only). */
export function snapshotRoutes() {
  return [...new Set(discoverFiles().map((f) => f.route))];
}
