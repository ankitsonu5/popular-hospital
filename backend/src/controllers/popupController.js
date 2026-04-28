import Popup from "../models/Popup.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/popup";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `popup-${uniqueSuffix}${ext}`);
  },
});

export const uploadPopupImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const deleteFile = (filePath) => {
  if (!filePath) return;
  try {
    const relativePath = filePath.replace(/^\//, "");
    const fullPath = path.join(__dirname, "../../", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error("Error deleting popup file:", error);
  }
};

// GET /api/popup — public, returns active popup or null
export const getActivePopup = async (req, res) => {
  try {
    const popup = await Popup.findOne({ isActive: true }).sort({ updatedAt: -1 });
    res.json(popup || null);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/cms/popup — admin
export const getPopup = async (req, res) => {
  try {
    const popup = await Popup.findOne().sort({ updatedAt: -1 });
    res.json(popup || null);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/popup — admin upsert (create or update)
export const upsertPopup = async (req, res) => {
  try {
    const { linkUrl, isActive } = req.body;

    const existing = await Popup.findOne().sort({ updatedAt: -1 });

    let imageUrl = existing?.imageUrl || "";

    if (req.file) {
      if (existing?.imageUrl) deleteFile(existing.imageUrl);
      imageUrl = `/uploads/popup/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Popup image is required." });
    }

    const update = {
      imageUrl,
      linkUrl: linkUrl || "",
      isActive: isActive !== "false" && isActive !== false,
    };

    let popup;
    if (existing) {
      popup = await Popup.findByIdAndUpdate(existing._id, update, {
        new: true,
        runValidators: true,
      });
    } else {
      popup = await Popup.create(update);
    }

    res.json(popup);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/popup — admin, removes image and record
export const deletePopup = async (req, res) => {
  try {
    const popup = await Popup.findOne().sort({ updatedAt: -1 });
    if (!popup) return res.json({ ok: true });

    deleteFile(popup.imageUrl);
    await Popup.findByIdAndDelete(popup._id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
