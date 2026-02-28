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
    res.status(500).json({ error: error.message });
  }
};

// GET /api/news/:slug (Public)
export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isActive: true });
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/cms/news (Admin)
export const getAdminNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cms/news (Admin)
export const createNews = async (req, res) => {
  try {
    const { title, slug, content, date, author, isActive } = req.body;
    let contentArr = [];
    if (content) {
      if (typeof content === 'string') {
        try { contentArr = JSON.parse(content); } catch { contentArr = [content]; }
      } else {
        contentArr = content;
      }
    }
    const excerpt = req.body.excerpt || (contentArr && contentArr[0] ? (typeof contentArr[0] === 'string' ? contentArr[0].substring(0, 150) + '...' : '') : '');
    
    const imagePath = req.file ? `/uploads/news/${req.file.filename}` : (req.body.image || '');
    
    const news = await News.create({
      title,
      slug,
      excerpt,
      content: contentArr,
      image: imagePath,
      date,
      author,
      isActive: isActive !== 'false' && isActive !== false
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cms/news/:id (Admin)
export const updateNews = async (req, res) => {
  try {
    const { title, slug, content, date, author, isActive } = req.body;
    
    let contentArr = [];
    if (content) {
      if (typeof content === 'string') {
        try { contentArr = JSON.parse(content); } catch { contentArr = [content]; }
      } else {
        contentArr = content;
      }
    }
    const excerpt = req.body.excerpt || (contentArr && contentArr[0] ? (typeof contentArr[0] === 'string' ? contentArr[0].substring(0, 150) + '...' : '') : '');
    
    const updates = {
      title,
      slug,
      excerpt,
      content: contentArr,
      date,
      author,
      isActive: isActive !== 'false' && isActive !== false
    };

    if (req.file) {
      updates.image = `/uploads/news/${req.file.filename}`;
    }

    const news = await News.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cms/news/:id (Admin)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ error: 'News article not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
