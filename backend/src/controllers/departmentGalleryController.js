import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import DepartmentGalleryItem from "../models/DepartmentGalleryItem.js";
import Speciality from "../models/Speciality.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/department-gallery";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `gallery-${uniqueSuffix}-${base || "file"}${ext.toLowerCase()}`,
    );
  },
});

export const uploadDepartmentGallery = multer({
  storage,
  limits: { fileSize: 80 * 1024 * 1024, files: 3 },
});

const MAX_THUMBNAIL_SIZE = 200 * 1024;
const YOUTUBE_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|live\/|\&v=)([^#\&\?]*).*/i;

const getYoutubeId = (value = "") => {
  try {
    const url = new URL(value.trim());
    if (!["http:", "https:"].includes(url.protocol)) return null;
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const isYoutubeHost =
      hostname === "youtu.be" ||
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtube-nocookie.com" ||
      hostname.endsWith(".youtube-nocookie.com");
    if (!isYoutubeHost) return null;
  } catch {
    return null;
  }

  const match = value.trim().match(YOUTUBE_REGEX);
  return match && match[2]?.length === 11 ? match[2] : null;
};

const normalizeYoutubeUrl = (value = "") => {
  const videoId = getYoutubeId(value);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
};

const getUploadedFiles = (files = {}) =>
  Array.isArray(files) ? files : Object.values(files || {}).flat();

const getUploadedFile = (req, fieldName) =>
  getUploadedFiles(req.files).find((file) => file.fieldname === fieldName) ||
  null;

const ALLOWED_UPLOAD_FIELDS = new Set([
  "media",
  "thumbnail",
  "thumbnailDesktop",
  "thumbnailMobile",
]);

const deleteUploadedFiles = (files) => {
  getUploadedFiles(files).forEach((file) => {
    try {
      if (file?.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
    } catch (error) {
      console.error("Error deleting rejected gallery upload:", error);
    }
  });
};

export const validateDepartmentGalleryUploadFields = (req, res, next) => {
  const unexpectedFile = getUploadedFiles(req.files).find(
    (file) => !ALLOWED_UPLOAD_FIELDS.has(file.fieldname),
  );
  if (!unexpectedFile) return next();

  deleteUploadedFiles(req.files);
  return res.status(400).json({
    error: `Unsupported gallery upload field: ${unexpectedFile.fieldname}`,
  });
};

const validateImageFile = (file, label) => {
  if (!file) return null;
  if (!file.mimetype?.startsWith("image/")) {
    return `${label} must be an image file`;
  }
  return null;
};

const validateThumbnailFile = (file, label) => {
  const imageError = validateImageFile(file, label);
  if (imageError) return imageError;
  if (file && file.size > MAX_THUMBNAIL_SIZE) {
    return `${label} must be 200 KB or smaller`;
  }
  return null;
};

const getThumbnailFiles = (req) => ({
  desktop:
    getUploadedFile(req, "thumbnailDesktop") ||
    getUploadedFile(req, "thumbnail") ||
    null,
  mobile: getUploadedFile(req, "thumbnailMobile") || null,
});

const deleteFile = (filePath) => {
  if (!filePath || !filePath.startsWith("/uploads/")) return;
  try {
    const fullPath = path.join(
      __dirname,
      "../../",
      filePath.replace(/^\//, ""),
    );
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  } catch (error) {
    console.error("Error deleting department gallery file:", error);
  }
};

const parseBoolean = (value, fallback = true) => {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return fallback;
};

const findDepartmentByIdOrSlug = async (value) => {
  if (!value) return null;
  if (/^[0-9a-fA-F]{24}$/.test(value)) {
    const byId = await Speciality.findById(value);
    if (byId) return byId;
  }
  return Speciality.findOne({ slug: value });
};

// GET /api/department-gallery/:departmentSlug
export const getActiveDepartmentGallery = async (req, res) => {
  try {
    const department = await findDepartmentByIdOrSlug(
      req.params.departmentSlug,
    );
    if (!department) return res.json([]);

    const items = await DepartmentGalleryItem.find({
      department: department._id,
      isActive: true,
    })
      .populate("department", "name slug department_display_name")
      .sort({ order: 1, createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/cms/department-gallery?department=<id-or-slug>
export const getAdminDepartmentGallery = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) {
      const department = await findDepartmentByIdOrSlug(req.query.department);
      if (department) filter.department = department._id;
    }

    const items = await DepartmentGalleryItem.find(filter)
      .populate("department", "name slug department_display_name")
      .sort({ order: 1, createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/department-gallery
export const createDepartmentGalleryItem = async (req, res) => {
  try {
    const { department, type, title, order } = req.body;
    const dept = await findDepartmentByIdOrSlug(department);
    if (!dept) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ error: "Department is required" });
    }

    const normalizedType = type === "video" ? "video" : "image";
    const mediaFile = getUploadedFile(req, "media");
    const thumbnailFiles = getThumbnailFiles(req);
    const thumbnailError =
      validateThumbnailFile(
        thumbnailFiles.desktop,
        "Desktop video thumbnail",
      ) ||
      validateThumbnailFile(
        thumbnailFiles.mobile,
        "Mobile video thumbnail",
      );

    if (thumbnailError) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ error: thumbnailError });
    }

    let mediaUrl = "";
    if (normalizedType === "video") {
      if (mediaFile) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          error: "Video files are not supported. Add a YouTube link instead",
        });
      }

      mediaUrl = normalizeYoutubeUrl(req.body.mediaUrl);
      if (!mediaUrl) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({ error: "A valid YouTube link is required" });
      }
      if (!thumbnailFiles.desktop || !thumbnailFiles.mobile) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          error: "Desktop and mobile video thumbnails are required",
        });
      }
    } else {
      const mediaError = validateImageFile(mediaFile, "Gallery photo");
      if (!mediaFile || mediaError) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          error: mediaError || "Gallery photo is required",
        });
      }
      mediaUrl = `/uploads/department-gallery/${mediaFile.filename}`;
    }

    const item = await DepartmentGalleryItem.create({
      department: dept._id,
      type: normalizedType,
      title: title || "",
      mediaUrl,
      thumbnailUrl: thumbnailFiles.desktop
        ? `/uploads/department-gallery/${thumbnailFiles.desktop.filename}`
        : "",
      thumbnailMobileUrl: thumbnailFiles.mobile
        ? `/uploads/department-gallery/${thumbnailFiles.mobile.filename}`
        : "",
      order: Number(order) || 0,
      isActive: parseBoolean(req.body.isActive, true),
    });

    await item.populate("department", "name slug department_display_name");
    res.status(201).json(item);
  } catch (error) {
    deleteUploadedFiles(req.files);
    console.error("Error creating department gallery item:", error);
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/department-gallery/:id
export const updateDepartmentGalleryItem = async (req, res) => {
  let updateSucceeded = false;
  try {
    const item = await DepartmentGalleryItem.findById(req.params.id);
    if (!item) {
      deleteUploadedFiles(req.files);
      return res.status(404).json({ error: "Gallery item not found" });
    }

    const normalizedType = req.body.type === "video" ? "video" : "image";
    const mediaFile = getUploadedFile(req, "media");
    const thumbnailFiles = getThumbnailFiles(req);
    const thumbnailError =
      validateThumbnailFile(
        thumbnailFiles.desktop,
        "Desktop video thumbnail",
      ) ||
      validateThumbnailFile(
        thumbnailFiles.mobile,
        "Mobile video thumbnail",
      );

    if (thumbnailError) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ error: thumbnailError });
    }

    const updates = {
      title: req.body.title || "",
      type: normalizedType,
      order: Number(req.body.order) || 0,
      isActive: parseBoolean(req.body.isActive, item.isActive),
    };
    const oldFilesToDelete = [];

    if (req.body.department) {
      const dept = await findDepartmentByIdOrSlug(req.body.department);
      if (!dept) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({ error: "Invalid department" });
      }
      updates.department = dept._id;
    }

    if (normalizedType === "video") {
      if (mediaFile) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          error: "Video files are not supported. Add a YouTube link instead",
        });
      }

      const youtubeUrl = normalizeYoutubeUrl(
        req.body.mediaUrl?.trim() || item.mediaUrl,
      );
      if (!youtubeUrl) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({ error: "A valid YouTube link is required" });
      }
      if (
        (!thumbnailFiles.desktop && !item.thumbnailUrl) ||
        (!thumbnailFiles.mobile && !item.thumbnailMobileUrl)
      ) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({
          error: "Desktop and mobile video thumbnails are required",
        });
      }

      updates.mediaUrl = youtubeUrl;
      if (thumbnailFiles.desktop) {
        updates.thumbnailUrl = `/uploads/department-gallery/${thumbnailFiles.desktop.filename}`;
        oldFilesToDelete.push(item.thumbnailUrl);
      }
      if (thumbnailFiles.mobile) {
        updates.thumbnailMobileUrl = `/uploads/department-gallery/${thumbnailFiles.mobile.filename}`;
        oldFilesToDelete.push(item.thumbnailMobileUrl);
      }
      if (item.type !== "video") oldFilesToDelete.push(item.mediaUrl);
    } else {
      const mediaError = validateImageFile(mediaFile, "Gallery photo");
      if (mediaError) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({ error: mediaError });
      }
      if (
        !mediaFile &&
        (item.type !== "image" || !item.mediaUrl?.startsWith("/uploads/"))
      ) {
        deleteUploadedFiles(req.files);
        return res.status(400).json({ error: "Gallery photo is required" });
      }

      if (mediaFile) {
        updates.mediaUrl = `/uploads/department-gallery/${mediaFile.filename}`;
        oldFilesToDelete.push(item.mediaUrl);
      }
      updates.thumbnailUrl = "";
      updates.thumbnailMobileUrl = "";
      oldFilesToDelete.push(item.thumbnailUrl, item.thumbnailMobileUrl);
    }

    const updated = await DepartmentGalleryItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    ).populate("department", "name slug department_display_name");

    updateSucceeded = true;
    oldFilesToDelete.forEach(deleteFile);
    res.json(updated);
  } catch (error) {
    if (!updateSucceeded) deleteUploadedFiles(req.files);
    console.error("Error updating department gallery item:", error);
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/department-gallery/:id
export const deleteDepartmentGalleryItem = async (req, res) => {
  try {
    const item = await DepartmentGalleryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Gallery item not found" });

    deleteFile(item.mediaUrl);
    deleteFile(item.thumbnailUrl);
    deleteFile(item.thumbnailMobileUrl);
    res.json({ ok: true, id: item._id });
  } catch (error) {
    console.error("Error deleting department gallery item:", error);
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/department-gallery/reorder
export const reorderDepartmentGalleryItems = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "Ids array is required" });
    }

    await Promise.all(
      ids.map((id, index) =>
        DepartmentGalleryItem.findByIdAndUpdate(id, { order: index }),
      ),
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
