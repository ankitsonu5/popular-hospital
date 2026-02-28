import Branch from '../models/Branch.js';

// GET /api/branches
export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ order: 1 });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cms/branches
export const createBranch = async (req, res) => {
  try {
    const { name, slug, address, city, state, pincode, phone, email, description, image_url, facilities } = req.body;
    if (!name || !slug || !address || !city) {
      return res.status(400).json({ error: 'name, slug, address, city required' });
    }
    const branch = await Branch.create({ name, slug, address, city, state, pincode, phone, email, description, image_url, facilities });
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cms/branches/:id
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cms/branches/:id
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
