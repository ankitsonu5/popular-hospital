import HeroBanner from "../models/HeroBanner.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Multer Storage for Banners
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/banners";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate unique name keeping extension valid
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `banner-${uniqueSuffix}${ext}`);
  },
});

export const uploadBannerFiles = multer({ storage });

// Helper function to delete old file
const deleteFile = (filePath) => {
  if (!filePath) return;
  // Make sure we strip any leading slash and "uploads" base map if needed.
  // Actually, the database saves URLs like '/uploads/banners/file.jpg'.
  try {
    const relativePath = filePath.replace(/^\//, "");
    const fullPath = path.join(__dirname, "../../", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

// GET /api/hero-banners
export const getActiveBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find({ isActive: true }).sort({
      order: 1,
    });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/cms/hero-banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await HeroBanner.find().sort({ order: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/hero-banners
export const createBanner = async (req, res) => {
  try {
    const { type, order, isActive } = req.body;
    let desktopMediaUrl = "";
    let mobileMediaUrl = "";

    if (req.files && req.files.desktopMedia) {
      desktopMediaUrl = `/uploads/banners/${req.files.desktopMedia[0].filename}`;
    }
    if (req.files && req.files.mobileMedia) {
      mobileMediaUrl = `/uploads/banners/${req.files.mobileMedia[0].filename}`;
    }

    if (!desktopMediaUrl || !mobileMediaUrl) {
      return res.status(400).json({
        error: "Both desktopMedia and mobileMedia files are required",
      });
    }

    const banner = await HeroBanner.create({
      type: type || "image",
      desktopMediaUrl,
      mobileMediaUrl,
      order: order || 0,
      isActive: isActive !== "false",
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/hero-banners/:id
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await HeroBanner.findById(id);

    if (!banner) return res.status(404).json({ error: "Banner not found" });

    const updates = { ...req.body };

    if (updates.isActive === "true") updates.isActive = true;
    if (updates.isActive === "false") updates.isActive = false;

    if (req.files) {
      if (req.files.desktopMedia) {
        deleteFile(banner.desktopMediaUrl);
        updates.desktopMediaUrl = `/uploads/banners/${req.files.desktopMedia[0].filename}`;
      }
      if (req.files.mobileMedia) {
        deleteFile(banner.mobileMediaUrl);
        updates.mobileMediaUrl = `/uploads/banners/${req.files.mobileMedia[0].filename}`;
      }
    }

    const updatedBanner = await HeroBanner.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(updatedBanner);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/hero-banners/:id
export const deleteBanner = async (req, res) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Banner not found" });

    deleteFile(banner.desktopMediaUrl);
    deleteFile(banner.mobileMediaUrl);

    await HeroBanner.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/hero-banners/reorder
export const reorderBanners = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "Ids array is required" });
    }

    const updates = ids.map((id, index) =>
      HeroBanner.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updates);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
