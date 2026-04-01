import Update from "../models/Update.js";
import multer from "multer";
import fs from "fs";

// Setup Multer Storage for Updates (PDFs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/updates";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

export const uploadUpdates = multer({ storage });

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

    // Handle PDF upload if available
    if (req.file) {
      data.pdfUrl = `/uploads/updates/${req.file.filename}`;
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

    // Handle PDF upload if available
    if (req.file) {
      updates.pdfUrl = `/uploads/updates/${req.file.filename}`;
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
