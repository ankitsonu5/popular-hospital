import Update from "../models/Update.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Setup Multer Storage for Updates (PDFs and images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/updates";
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

export const uploadUpdates = multer({ storage });

const getUploadedFiles = (req) => {
  if (Array.isArray(req.files)) {
    return req.files.reduce((acc, file) => {
      acc[file.fieldname] = acc[file.fieldname] || [];
      acc[file.fieldname].push(file);
      return acc;
    }, {});
  }

  return req.files || {};
};

// Get all updates (public & admin)
export const getUpdates = async (req, res) => {
  try {
    const { all } = req.query; // Admin might want to see inactive ones too
    const query = all === "true" ? {} : { isActive: true };
    const updates = await Update.find(query).sort({ _id: -1 }); // Sort by newest first
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const getUpdateById = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) return res.status(404).json({ error: "Update not found" });
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// Create a new update (Admin only)
export const createUpdate = async (req, res) => {
  try {
    const data = { ...req.body };
    const files = getUploadedFiles(req);

    // Handle PDF upload if available
    if (files.pdf?.[0]) {
      data.pdfUrl = `/uploads/updates/${files.pdf[0].filename}`;
    }

    if (files.image?.[0]) {
      data.imageUrl = `/uploads/updates/${files.image[0].filename}`;
    }

    const newUpdate = new Update(data);
    const savedUpdate = await newUpdate.save();
    res.status(201).json(savedUpdate);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data." });
  }
};

// Update an existing update (Admin only)
export const updateUpdate = async (req, res) => {
  try {
    const updates = { ...req.body };
    const files = getUploadedFiles(req);

    // Handle PDF upload if available
    if (files.pdf?.[0]) {
      updates.pdfUrl = `/uploads/updates/${files.pdf[0].filename}`;
    }

    if (files.image?.[0]) {
      updates.imageUrl = `/uploads/updates/${files.image[0].filename}`;
    }

    const updated = await Update.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Update not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data." });
  }
};

// Delete an update (Admin only)
export const deleteUpdate = async (req, res) => {
  try {
    const deleted = await Update.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Update not found" });
    res.json({ message: "Update deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
