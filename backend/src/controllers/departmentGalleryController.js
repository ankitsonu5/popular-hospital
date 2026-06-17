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
    cb(null, `gallery-${Date.now()}-${base || "file"}${ext.toLowerCase()}`);
  },
});

export const uploadDepartmentGallery = multer({
  storage,
  limits: { fileSize: 80 * 1024 * 1024 },
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
    if (!dept) return res.status(400).json({ error: "Department is required" });

    const mediaFile = req.files?.media?.[0];
    if (!mediaFile)
      return res.status(400).json({ error: "Media file is required" });

    const item = await DepartmentGalleryItem.create({
      department: dept._id,
      type: type === "video" ? "video" : "image",
      title: title || "",
      mediaUrl: `/uploads/department-gallery/${mediaFile.filename}`,
      thumbnailUrl: req.files?.thumbnail?.[0]
        ? `/uploads/department-gallery/${req.files.thumbnail[0].filename}`
        : "",
      order: Number(order) || 0,
      isActive: parseBoolean(req.body.isActive, true),
    });

    await item.populate("department", "name slug department_display_name");
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/department-gallery/:id
export const updateDepartmentGalleryItem = async (req, res) => {
  try {
    const item = await DepartmentGalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Gallery item not found" });

    const updates = {
      title: req.body.title || "",
      type: req.body.type === "video" ? "video" : "image",
      order: Number(req.body.order) || 0,
      isActive: parseBoolean(req.body.isActive, item.isActive),
    };

    if (req.body.department) {
      const dept = await findDepartmentByIdOrSlug(req.body.department);
      if (!dept) return res.status(400).json({ error: "Invalid department" });
      updates.department = dept._id;
    }

    if (req.files?.media?.[0]) {
      deleteFile(item.mediaUrl);
      updates.mediaUrl = `/uploads/department-gallery/${req.files.media[0].filename}`;
    }

    if (req.files?.thumbnail?.[0]) {
      deleteFile(item.thumbnailUrl);
      updates.thumbnailUrl = `/uploads/department-gallery/${req.files.thumbnail[0].filename}`;
    }

    const updated = await DepartmentGalleryItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    ).populate("department", "name slug department_display_name");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/department-gallery/:id
export const deleteDepartmentGalleryItem = async (req, res) => {
  try {
    const item = await DepartmentGalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Gallery item not found" });

    deleteFile(item.mediaUrl);
    deleteFile(item.thumbnailUrl);
    await DepartmentGalleryItem.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
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
