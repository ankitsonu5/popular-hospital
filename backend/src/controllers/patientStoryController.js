import PatientStory from "../models/PatientStory.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/patient-stories";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `patient-story-${uniqueSuffix}${ext}`);
  },
});

export const uploadPatientStoryThumbnail = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Thumbnail must be an image file"));
    }
    cb(null, true);
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
    console.error("Error deleting patient story file:", error);
  }
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const YOUTUBE_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|\&v=)([^#\&\?]*).*/i;

const isYoutubeUrl = (value) => {
  if (!isValidUrl(value)) return false;
  const match = value.match(YOUTUBE_REGEX);
  return Boolean(match && match[2]?.length === 11);
};

export const getActivePatientStories = async (req, res) => {
  try {
    const stories = await PatientStory.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const getAllPatientStories = async (req, res) => {
  try {
    const stories = await PatientStory.find().sort({ order: 1, createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const createPatientStory = async (req, res) => {
  try {
    const { title, name, videoUrl, order, isActive, thumbnailUrl } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ error: "Story name is required" });
    }

    if (!videoUrl?.trim() || !isYoutubeUrl(videoUrl.trim())) {
      return res.status(400).json({ error: "Only YouTube links are supported" });
    }

    const resolvedThumbnailUrl = req.file
      ? `/uploads/patient-stories/${req.file.filename}`
      : thumbnailUrl?.trim() || "";

    const story = await PatientStory.create({
      title: title?.trim() || "",
      name: name.trim(),
      videoUrl: videoUrl.trim(),
      thumbnailUrl: resolvedThumbnailUrl,
      order: Number(order) || 0,
      isActive: isActive !== "false",
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const updatePatientStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await PatientStory.findById(id);

    if (!story) {
      return res.status(404).json({ error: "Patient story not found" });
    }

    const updates = {};

    if (typeof req.body.title === "string") {
      updates.title = req.body.title.trim();
    }

    if (typeof req.body.name === "string") {
      if (!req.body.name.trim()) {
        return res.status(400).json({ error: "Story name is required" });
      }
      updates.name = req.body.name.trim();
    }

    if (typeof req.body.videoUrl === "string") {
      if (!req.body.videoUrl.trim() || !isYoutubeUrl(req.body.videoUrl.trim())) {
        return res.status(400).json({ error: "Only YouTube links are supported" });
      }
      updates.videoUrl = req.body.videoUrl.trim();
    }

    if (typeof req.body.thumbnailUrl === "string") {
      updates.thumbnailUrl = req.body.thumbnailUrl.trim();
    }

    if (req.body.isActive === "true") updates.isActive = true;
    if (req.body.isActive === "false") updates.isActive = false;

    if (req.file) {
      if (story.thumbnailUrl?.startsWith("/uploads/")) {
        deleteFile(story.thumbnailUrl);
      }
      updates.thumbnailUrl = `/uploads/patient-stories/${req.file.filename}`;
    }

    const updatedStory = await PatientStory.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const deletePatientStory = async (req, res) => {
  try {
    const story = await PatientStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Patient story not found" });
    }

    if (story.thumbnailUrl?.startsWith("/uploads/")) {
      deleteFile(story.thumbnailUrl);
    }
    await PatientStory.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const reorderPatientStories = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "Ids array is required" });
    }

    await Promise.all(
      ids.map((id, index) => PatientStory.findByIdAndUpdate(id, { order: index })),
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
