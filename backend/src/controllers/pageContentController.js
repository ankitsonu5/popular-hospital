import PageOverride from "../models/PageOverride.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Upload setup ────────────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, "../../uploads/page-content");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "page-" + uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadPageImage = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|avif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

// ── Manifest (frontend scan script se generate hota hai) ────────────────────
// frontend: `npm run scan:content` -> backend/data/content-manifest.json
const MANIFEST_PATH = path.join(__dirname, "../../data/content-manifest.json");
let manifestCache = { mtimeMs: 0, data: { pages: [] } };

function loadManifest() {
  try {
    const stat = fs.statSync(MANIFEST_PATH);
    if (stat.mtimeMs !== manifestCache.mtimeMs) {
      const data = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
      manifestCache = { mtimeMs: stat.mtimeMs, data };
    }
  } catch {
    // manifest abhi generate nahi hua
  }
  return manifestCache.data;
}

function findPage(pageKey) {
  return loadManifest().pages.find((p) => p.pageKey === pageKey);
}

const pageKeys = (page) =>
  new Set(page.sections.flatMap((s) => s.items.map((i) => i.key)));

// ── GET /api/page-content — public: saare overrides ek flat map mein ────────
export const getAllPublicPageContent = async (req, res) => {
  try {
    const docs = await PageOverride.find({}, { values: 1 }).lean();
    const flat = {};
    for (const d of docs) {
      for (const [k, v] of Object.entries(d.values || {})) {
        if (typeof v === "string" && v !== "") flat[k] = v;
      }
    }
    res.json(flat);
  } catch (error) {
    console.error("getAllPublicPageContent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── GET /api/page-content/:pageKey — public: ek page ke overrides ───────────
export const getPublicPageContent = async (req, res) => {
  try {
    const doc = await PageOverride.findOne({ pageKey: req.params.pageKey }).lean();
    res.json(doc?.values || {});
  } catch (error) {
    console.error("getPublicPageContent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── GET /api/cms/page-content — admin: pages ki list (summary) ──────────────
export const getAdminPageContent = async (req, res) => {
  try {
    const manifest = loadManifest();
    const docs = await PageOverride.find({}, { pageKey: 1, values: 1 }).lean();
    const edited = new Map(
      docs.map((d) => [d.pageKey, Object.keys(d.values || {}).length])
    );
    const pages = manifest.pages.map((p) => ({
      pageKey: p.pageKey,
      route: p.route,
      label: p.label,
      group: p.group,
      sectionCount: p.sections.length,
      itemCount: p.sections.reduce((n, s) => n + s.items.length, 0),
      editedCount: edited.get(p.pageKey) || 0,
    }));
    res.json({ generatedAt: manifest.generatedAt || null, pages });
  } catch (error) {
    console.error("getAdminPageContent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── GET /api/cms/page-content/:pageKey — admin: poora page (default + value) ─
export const getAdminPageContentByKey = async (req, res) => {
  try {
    const page = findPage(req.params.pageKey);
    if (!page) return res.status(404).json({ error: "Page not found" });

    const doc = await PageOverride.findOne({ pageKey: page.pageKey }).lean();
    const values = doc?.values || {};

    res.json({
      pageKey: page.pageKey,
      route: page.route,
      label: page.label,
      group: page.group,
      sections: page.sections.map((s) => ({
        key: s.key,
        label: s.label,
        items: s.items.map((i) => ({
          key: i.key,
          type: i.type,
          label: i.label,
          default: i.default,
          alt: i.alt || "",
          value: typeof values[i.key] === "string" && values[i.key] !== "" ? values[i.key] : i.default,
          edited: typeof values[i.key] === "string" && values[i.key] !== "",
        })),
      })),
    });
  } catch (error) {
    console.error("getAdminPageContentByKey error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── PUT /api/cms/page-content/:pageKey — body: { values: { key: value } } ───
// Jo value default ke barabar hai wo override se hata di jaati hai.
export const updatePageContent = async (req, res) => {
  try {
    const page = findPage(req.params.pageKey);
    if (!page) return res.status(404).json({ error: "Page not found" });

    const incoming = req.body?.values;
    if (!incoming || typeof incoming !== "object") {
      return res.status(400).json({ error: "values required" });
    }

    const valid = pageKeys(page);
    const defaults = new Map(
      page.sections.flatMap((s) => s.items.map((i) => [i.key, i.default]))
    );

    const doc = await PageOverride.findOne({ pageKey: page.pageKey });
    const next = { ...(doc?.values || {}) };

    for (const [key, raw] of Object.entries(incoming)) {
      if (!valid.has(key)) continue;
      const value = typeof raw === "string" ? raw : "";
      if (value === "" || value === defaults.get(key)) {
        delete next[key];
      } else {
        next[key] = value;
      }
    }

    if (Object.keys(next).length === 0) {
      await PageOverride.deleteOne({ pageKey: page.pageKey });
    } else {
      await PageOverride.findOneAndUpdate(
        { pageKey: page.pageKey },
        { $set: { values: next } },
        { upsert: true, new: true }
      );
    }

    res.json({ ok: true, editedCount: Object.keys(next).length });
  } catch (error) {
    console.error("updatePageContent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── POST /api/cms/page-content/:pageKey/upload-image ────────────────────────
export const uploadPageContentImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ ok: true, url: `/uploads/page-content/${req.file.filename}` });
  } catch (error) {
    console.error("uploadPageContentImage error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── DELETE /api/cms/page-content/:pageKey/overrides — ek page ko original par ─
export const resetPageContentByKey = async (req, res) => {
  try {
    await PageOverride.deleteOne({ pageKey: req.params.pageKey });
    res.json({ ok: true });
  } catch (error) {
    console.error("resetPageContentByKey error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ── PUT /api/cms/page-content/reset — saare pages original par ──────────────
export const resetPageContent = async (req, res) => {
  try {
    await PageOverride.deleteMany({});
    res.json({ ok: true });
  } catch (error) {
    console.error("resetPageContent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
