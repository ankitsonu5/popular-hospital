import News from '../models/News.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/news';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploadNews = multer({ storage });

// GET /api/news (Public)
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// GET /api/news/:slug (Public)
export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isActive: true });
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// GET /api/cms/news (Admin)
export const getAdminNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// POST /api/cms/news (Admin)
export const createNews = async (req, res) => {
  try {
    const { 
      title, slug, content, date, author, isActive, excerpt,
      metaTitle, metaDescription, metaKeywords, focusKeyword 
    } = req.body;
    
    // Normalize files from .any() or .fields()
    const files = req.files || [];
    const filesObj = Array.isArray(files) 
      ? files.reduce((acc, f) => { acc[f.fieldname] = acc[f.fieldname] || []; acc[f.fieldname].push(f); return acc; }, {}) 
      : files;

    const existingImg = req.body.existingImage || req.body.image || '';
    const imagePath = (filesObj.image && filesObj.image.length > 0) ? `/uploads/news/${filesObj.image[0].filename}` : existingImg;
    
    const news = await News.create({
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      image: imagePath,
      date,
      author,
      isActive: isActive !== 'false' && isActive !== false,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription !== undefined ? metaDescription : (excerpt || ''),
      metaKeywords: metaKeywords || focusKeyword || '',
      focusKeyword: focusKeyword || ''
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// PUT /api/cms/news/:id (Admin)
export const updateNews = async (req, res) => {
  try {
    const { 
      title, slug, content, date, author, isActive, image, excerpt,
      metaTitle, metaDescription, metaKeywords, focusKeyword
    } = req.body;
    
    const updates = {
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      date,
      author,
      isActive: isActive !== 'false' && isActive !== false,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription !== undefined ? metaDescription : (excerpt || ''),
      metaKeywords: metaKeywords || focusKeyword || '',
      focusKeyword: focusKeyword || ''
    };

    // Normalize files from .any() or .fields()
    const files = req.files || [];
    const filesObj = Array.isArray(files) 
      ? files.reduce((acc, f) => { acc[f.fieldname] = acc[f.fieldname] || []; acc[f.fieldname].push(f); return acc; }, {}) 
      : files;

    const existingImg = req.body.existingImage || req.body.image || image;
    if (filesObj.image && filesObj.image.length > 0) {
      updates.image = `/uploads/news/${filesObj.image[0].filename}`;
    } else if (existingImg && existingImg.trim() !== '') {
      updates.image = existingImg;
    }

    const news = await News.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};

// DELETE /api/cms/news/:id (Admin)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'An internal error occurred.' });
  }
};
