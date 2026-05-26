import SchemaContent from "../models/SchemaContent.js";

// Helper: parse incoming jsonLd which can be a string or object
const parseJsonLd = (input) => {
  if (input === undefined || input === null) {
    throw new Error("jsonLd is required");
  }
  if (typeof input === "object") return input;
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) throw new Error("jsonLd is required");
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error("jsonLd is not valid JSON: " + e.message);
    }
  }
  throw new Error("jsonLd must be a JSON object or stringified JSON");
};

// ─── PUBLIC ──────────────────────────────────────────

// GET /api/schemas/:pageKey  — public read for a single page key
export const getPublicSchema = async (req, res) => {
  try {
    const { pageKey } = req.params;
    if (!pageKey) return res.status(400).json({ error: "pageKey required" });
    const doc = await SchemaContent.findOne({
      pageKey: pageKey.trim(),
      isActive: true,
    }).lean();
    if (!doc) return res.json(null);
    res.json({ pageKey: doc.pageKey, jsonLd: doc.jsonLd });
  } catch (e) {
    console.error("[schemas:getPublic]", e);
    res.status(500).json({ error: "Internal error" });
  }
};

// ─── ADMIN ───────────────────────────────────────────

// GET /api/cms/schemas — list all
export const getAllSchemas = async (req, res) => {
  try {
    const list = await SchemaContent.find().sort({ updatedAt: -1 }).lean();
    res.json(list);
  } catch (e) {
    console.error("[schemas:getAll]", e);
    res.status(500).json({ error: "Internal error" });
  }
};

// GET /api/cms/schemas/:pageKey — get one by key
export const getSchemaByKey = async (req, res) => {
  try {
    const { pageKey } = req.params;
    const doc = await SchemaContent.findOne({ pageKey: pageKey.trim() }).lean();
    if (!doc) return res.json(null);
    res.json(doc);
  } catch (e) {
    console.error("[schemas:getOne]", e);
    res.status(500).json({ error: "Internal error" });
  }
};

// PUT /api/cms/schemas — upsert by pageKey
export const upsertSchema = async (req, res) => {
  try {
    const { pageKey, label, jsonLd, isActive, notes } = req.body;
    if (!pageKey || !pageKey.trim()) {
      return res.status(400).json({ error: "pageKey is required" });
    }

    let parsed;
    try {
      parsed = parseJsonLd(jsonLd);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const update = {
      label: label ?? "",
      jsonLd: parsed,
      notes: notes ?? "",
      isActive: isActive === false || isActive === "false" ? false : true,
    };

    const doc = await SchemaContent.findOneAndUpdate(
      { pageKey: pageKey.trim() },
      { $set: update, $setOnInsert: { pageKey: pageKey.trim() } },
      { new: true, upsert: true, runValidators: true },
    );

    res.json(doc);
  } catch (e) {
    console.error("[schemas:upsert]", e);
    res.status(500).json({ error: "Internal error" });
  }
};

// DELETE /api/cms/schemas/:pageKey
export const deleteSchema = async (req, res) => {
  try {
    const { pageKey } = req.params;
    await SchemaContent.deleteOne({ pageKey: pageKey.trim() });
    res.json({ ok: true });
  } catch (e) {
    console.error("[schemas:delete]", e);
    res.status(500).json({ error: "Internal error" });
  }
};
