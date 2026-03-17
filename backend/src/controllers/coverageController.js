import Coverage from '../models/Coverage.js';
import multer from 'multer';
import fs from 'fs';

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/coverage';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

export const uploadCoverage = multer({ storage });

// Public Methods
export const getAllCoverage = async (req, res) => {
  try {
    const items = await Coverage.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Methods
export const getAdminCoverage = async (req, res) => {
  try {
    const items = await Coverage.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCoverage = async (req, res) => {
  try {
    const { title, date, source, isActive } = req.body;
    
    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files) 
      ? files.reduce((acc, f) => { acc[f.fieldname] = acc[f.fieldname] || []; acc[f.fieldname].push(f); return acc; }, {}) 
      : files;

    const imagePath = (filesObj.image && filesObj.image.length > 0) 
      ? `/uploads/coverage/${filesObj.image[0].filename}` 
      : (req.body.image || '');

    const item = await Coverage.create({
      title,
      image: imagePath,
      date,
      source,
      isActive: isActive !== 'false' && isActive !== false
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoverage = async (req, res) => {
  try {
    const { title, date, source, isActive } = req.body;
    
    const updates = {
      title,
      date,
      source,
      isActive: isActive !== 'false' && isActive !== false
    };

    // Normalize files
    const files = req.files || [];
    const filesObj = Array.isArray(files) 
      ? files.reduce((acc, f) => { acc[f.fieldname] = acc[f.fieldname] || []; acc[f.fieldname].push(f); return acc; }, {}) 
      : files;

    // Handle Image
    if (filesObj.image && filesObj.image.length > 0) {
      updates.image = `/uploads/coverage/${filesObj.image[0].filename}`;
    } else if (req.body.image) {
      updates.image = req.body.image;
    }

    const item = await Coverage.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!item) return res.status(404).json({ error: 'Coverage item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCoverage = async (req, res) => {
  try {
    const item = await Coverage.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Coverage item not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
