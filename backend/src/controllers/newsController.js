import News from "../models/News.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const normalizeUploadPath = (value = "") => {
  if (typeof value !== "string" || !value) return "";
  const cleanValue = value.replace(/\\/g, "/").trim();
  const match = cleanValue.match(
    /(?:https?:\/\/[^"'\s<>)]+)?(?:\.\.\/)*\/?uploads\/[^"'\s<>)]+/i,
  );
  if (!match) return cleanValue;

  const uploadsIndex = match[0].toLowerCase().indexOf("uploads/");
  return `/${match[0].slice(uploadsIndex)}`;
};

const normalizeRichContent = (content = "") => {
  if (typeof content !== "string" || !content) return "";
  return content.replace(
    /\b(src|href)=["']([^"']+)["']/gi,
    (fullMatch, attribute, url) => {
      const normalizedUrl = normalizeUploadPath(url);
      return normalizedUrl === url
        ? fullMatch
        : `${attribute}="${normalizedUrl}"`;
    },
  );
};

const normalizeNewsOutput = (newsDoc) => {
  const obj = newsDoc.toObject ? newsDoc.toObject() : newsDoc;
  return {
    ...obj,
    image: normalizeUploadPath(obj.image || ""),
    content: normalizeRichContent(obj.content || ""),
    contentTablet: normalizeRichContent(obj.contentTablet || ""),
    contentMobile: normalizeRichContent(obj.contentMobile || ""),
  };
};

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/news";
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const uploadNews = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// GET /api/news (Public)
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(news.map(normalizeNewsOutput));
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/news/:slug (Public)
export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isActive: true });
    if (!news) return res.status(404).json({ error: "News article not found" });
    res.json(normalizeNewsOutput(news));
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/cms/news (Admin)
export const getAdminNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news.map(normalizeNewsOutput));
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/news/image-upload-direct (Admin TinyMCE)
export const uploadNewsImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = `/uploads/news/${req.file.filename}`;
    res.json({ location: imagePath, path: imagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cms/news (Admin)
export const createNews = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      contentTablet,
      contentMobile,
      date,
      author,
      isActive,
      excerpt,
      metaTitle,
      metaDescription,
      metaKeywords,
      focusKeyword,
    } = req.body;

    // Normalize files from .any() or .fields()
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    const existingImg = req.body.existingImage || req.body.image || "";
    const imagePath =
      filesObj.image && filesObj.image.length > 0
        ? `/uploads/news/${filesObj.image[0].filename}`
        : normalizeUploadPath(existingImg);
    const normalizedContent = normalizeRichContent(content || "");

    const news = await News.create({
      title,
      slug,
      excerpt: excerpt || "",
      content: normalizedContent,
      contentTablet: normalizeRichContent(contentTablet || ""),
      contentMobile: normalizeRichContent(contentMobile || ""),
      image: imagePath,
      date,
      author,
      isActive: isActive !== "false" && isActive !== false,
      metaTitle: metaTitle || title,
      metaDescription:
        metaDescription !== undefined ? metaDescription : excerpt || "",
      metaKeywords: metaKeywords || focusKeyword || "",
      focusKeyword: focusKeyword || "",
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/news/:id (Admin)
export const updateNews = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      contentTablet,
      contentMobile,
      date,
      author,
      isActive,
      image,
      excerpt,
      metaTitle,
      metaDescription,
      metaKeywords,
      focusKeyword,
    } = req.body;

    const updates = {
      title,
      slug,
      excerpt: excerpt || "",
      content: normalizeRichContent(content || ""),
      contentTablet: normalizeRichContent(contentTablet || ""),
      contentMobile: normalizeRichContent(contentMobile || ""),
      date,
      author,
      isActive: isActive !== "false" && isActive !== false,
      metaTitle: metaTitle || title,
      metaDescription:
        metaDescription !== undefined ? metaDescription : excerpt || "",
      metaKeywords: metaKeywords || focusKeyword || "",
      focusKeyword: focusKeyword || "",
    };

    // Normalize files from .any() or .fields()
    const files = req.files || [];
    const filesObj = Array.isArray(files)
      ? files.reduce((acc, f) => {
          acc[f.fieldname] = acc[f.fieldname] || [];
          acc[f.fieldname].push(f);
          return acc;
        }, {})
      : files;

    const existingImg = req.body.existingImage || req.body.image || image;
    if (filesObj.image && filesObj.image.length > 0) {
      updates.image = `/uploads/news/${filesObj.image[0].filename}`;
    } else if (existingImg && existingImg.trim() !== "") {
      updates.image = normalizeUploadPath(existingImg);
    }

    const news = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!news) return res.status(404).json({ error: "News article not found" });
    res.json(normalizeNewsOutput(news));
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/news/:id (Admin)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: "News article not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
