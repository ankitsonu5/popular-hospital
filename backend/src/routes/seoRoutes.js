import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getSeoByRoute,
  getAllSeo,
  createOrUpdateSeo,
  deleteSeo
} from '../controllers/seoController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/seo";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "seo-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 250 * 1024 }, // 250kb limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|avif|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed!"));
  }
});

// GET /api/seo/by-route?route=/doctors/dr-a-k-kaushik
router.get('/by-route', getSeoByRoute);

// GET /api/seo
router.get('/', getAllSeo);

// POST /api/seo
router.post('/', createOrUpdateSeo);

// POST /api/seo/upload
router.post('/upload', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds 250KB limit' });
      }
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/seo/${req.file.filename}`;
    res.status(200).json({ success: true, url: imageUrl });
  });
});

// DELETE /api/seo/:id
router.delete('/:id', deleteSeo);

export default router;
