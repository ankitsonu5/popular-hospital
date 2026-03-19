import Career from '../models/Career.js';

// Public method
export const getActiveCareers = async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ error: 'Career not found' });
    res.json(career);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin methods
export const getAdminCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCareer = async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    const savedCareer = await newCareer.save();
    res.status(201).json(savedCareer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCareer = async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Career not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCareer = async (req, res) => {
  try {
    const deleted = await Career.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Career not found' });
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
