import Event from "../models/Event.js";
import multer from "multer";
import fs from "fs";

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/events";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

export const uploadEvent = multer({ storage });

// Public Methods
export const getAllEvents = async (req, res) => {
  try {
    const items = await Event.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const item = await Event.findOne({ slug: req.params.slug, isActive: true });
    if (!item) return res.status(404).json({ error: "Event not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// Admin Methods
export const getAdminEvents = async (req, res) => {
  try {
    const items = await Event.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, slug, date, description, isActive } = req.body;

    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    const thumbnailPath =
      filesObj.thumbnail && filesObj.thumbnail.length > 0
        ? `/uploads/events/${filesObj.thumbnail[0].filename}`
        : req.body.thumbnail || "";

    const galleryPaths = (filesObj.gallery || []).map(
      (f) => `/uploads/events/${f.filename}`,
    );

    const item = await Event.create({
      title,
      slug,
      date,
      description,
      thumbnail: thumbnailPath,
      gallery: galleryPaths,
      isActive: isActive !== "false" && isActive !== false,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, slug, date, description, isActive } = req.body;

    const updates = {
      title,
      slug,
      date,
      description,
      isActive: isActive !== "false" && isActive !== false,
    };

    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    // Handle Thumbnail
    if (filesObj.thumbnail && filesObj.thumbnail.length > 0) {
      updates.thumbnail = `/uploads/events/${filesObj.thumbnail[0].filename}`;
    } else if (req.body.thumbnail) {
      updates.thumbnail = req.body.thumbnail;
    }

    // Handle Gallery
    const newGalleryFiles = (filesObj.gallery || []).map(
      (f) => `/uploads/events/${f.filename}`,
    );
    let existingGallery = [];
    if (req.body.existingGallery) {
      existingGallery = Array.isArray(req.body.existingGallery)
        ? req.body.existingGallery
        : [req.body.existingGallery];
    }
    updates.gallery = [...existingGallery, ...newGalleryFiles];

    const item = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Event not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Event not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
