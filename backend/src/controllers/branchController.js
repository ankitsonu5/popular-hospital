import Branch from "../models/Branch.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Setup Multer Storage for Branches
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/branches";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadBranch = multer({ storage });

// GET /api/branches
export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ order: 1 });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/branches/:idOrSlug
export const getBranchByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Try by ID first
    let branch = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      branch = await Branch.findById(idOrSlug);
    }

    // Fallback to slug
    if (!branch) {
      branch = await Branch.findOne({ slug: idOrSlug });
    }

    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/branches
export const createBranch = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.name || !body.slug || !body.address || !body.city) {
      return res
        .status(400)
        .json({ error: "name, slug, address, city required" });
    }

    // Handle multiple uploaded images
    if (req.files) {
      if (req.files.image_one)
        body.image_one = `/uploads/branches/${req.files.image_one[0].filename}`;
      if (req.files.image_two)
        body.image_two = `/uploads/branches/${req.files.image_two[0].filename}`;
      if (req.files.image_three)
        body.image_three = `/uploads/branches/${req.files.image_three[0].filename}`;
      if (req.files.image_four)
        body.image_four = `/uploads/branches/${req.files.image_four[0].filename}`;
    }

    const branch = await Branch.create(body);
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/branches/:id
export const updateBranch = async (req, res) => {
  try {
    const body = { ...req.body };

    // Handle multiple uploaded images
    if (req.files) {
      if (req.files.image_one)
        body.image_one = `/uploads/branches/${req.files.image_one[0].filename}`;
      if (req.files.image_two)
        body.image_two = `/uploads/branches/${req.files.image_two[0].filename}`;
      if (req.files.image_three)
        body.image_three = `/uploads/branches/${req.files.image_three[0].filename}`;
      if (req.files.image_four)
        body.image_four = `/uploads/branches/${req.files.image_four[0].filename}`;
    }

    const branch = await Branch.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/branches/:id
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/branches/reorder
export const reorderBranches = async (req, res) => {
  try {
    const { ids } = req.body; // Array of IDs in the new order
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "Ids array is required" });
    }

    const updates = ids.map((id, index) =>
      Branch.findByIdAndUpdate(id, { order: index }),
    );

    await Promise.all(updates);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
