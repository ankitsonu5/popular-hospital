import Coverage from "../models/Coverage.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/coverage";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    cb(null, `${Date.now()}-${base || "file"}${ext.toLowerCase()}`);
  },
});

export const uploadCoverage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});

// Public Methods
export const getAllCoverage = async (req, res) => {
  try {
    const items = await Coverage.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const getCoverageBySlug = async (req, res) => {
  try {
    const item = await Coverage.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!item)
      return res.status(404).json({ error: "Coverage item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// Admin Methods
export const getAdminCoverage = async (req, res) => {
  try {
    const items = await Coverage.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const createCoverage = async (req, res) => {
  try {
    const { title, date, source, isActive, excerpt, content } = req.body;

    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    // Build gallery from uploaded files
    const gallery = [];
    if (filesObj.gallery && filesObj.gallery.length > 0) {
      filesObj.gallery.forEach((f) => {
        gallery.push(`/uploads/coverage/${f.filename}`);
      });
    }

    // Fallback: single image field (backward compat)
    if (gallery.length === 0 && filesObj.image && filesObj.image.length > 0) {
      gallery.push(`/uploads/coverage/${filesObj.image[0].filename}`);
    }

    // Main image is the first gallery image
    const imagePath = gallery.length > 0 ? gallery[0] : req.body.image || "";

    const item = new Coverage({
      title,
      image: imagePath,
      gallery,
      date,
      source,
      excerpt: excerpt || "",
      content: content || "",
      isActive: isActive !== "false" && isActive !== false,
    });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const updateCoverage = async (req, res) => {
  try {
    const { title, date, source, isActive, excerpt, content } = req.body;

    const updates = {
      title,
      date,
      source,
      excerpt: excerpt !== undefined ? excerpt : undefined,
      content: content !== undefined ? content : undefined,
      isActive: isActive !== "false" && isActive !== false,
    };

    // Remove undefined values
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key],
    );

    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    // Build gallery: existing images kept by frontend + newly uploaded files
    const gallery = [];

    // Parse existing gallery paths sent by frontend
    if (req.body.existingGallery) {
      try {
        const existing = JSON.parse(req.body.existingGallery);
        if (Array.isArray(existing)) {
          gallery.push(...existing);
        }
      } catch (_) {}
    }

    // Add newly uploaded gallery files
    if (filesObj.gallery && filesObj.gallery.length > 0) {
      filesObj.gallery.forEach((f) => {
        gallery.push(`/uploads/coverage/${f.filename}`);
      });
    }

    // Fallback: single image field (backward compat)
    if (gallery.length === 0 && filesObj.image && filesObj.image.length > 0) {
      gallery.push(`/uploads/coverage/${filesObj.image[0].filename}`);
    }

    if (gallery.length > 0) {
      updates.gallery = gallery;
      updates.image = gallery[0]; // First image is the main image
    }

    const item = await Coverage.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!item)
      return res.status(404).json({ error: "Coverage item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const deleteCoverage = async (req, res) => {
  try {
    const item = await Coverage.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ error: "Coverage item not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
