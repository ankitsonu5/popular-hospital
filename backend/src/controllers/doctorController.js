import Doctor from '../models/Doctor.js';
import Speciality from '../models/Speciality.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Setup Multer Storage for Doctors
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/doctors';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploadDoctor = multer({ storage });

// GET /api/doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { speciality, branch, search } = req.query;
    const filter = { is_active: true };

    if (speciality) {
      // Find speciality by slug or ID
      let spec = null;
      if (speciality.match(/^[0-9a-fA-F]{24}$/)) {
        spec = await Speciality.findById(speciality);
      }
      if (!spec) {
        spec = await Speciality.findOne({ slug: speciality });
      }
      if (spec) filter.speciality = spec._id;
    }

    if (branch) {
      filter.branches = branch;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { qualification: { $regex: search, $options: 'i' } },
      ];
    }

    const doctors = await Doctor.find(filter)
      .populate('speciality', 'name slug')
      .populate('branches', 'name slug')
      .sort({ name: 1 });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctors/specialities
export const getAllSpecialities = async (req, res) => {
  try {
    const list = await Speciality.find().sort({ name: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctors/:idOrSlug
export const getDoctorByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    let doctor = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      doctor = await Doctor.findById(idOrSlug)
        .populate('speciality', 'name slug')
        .populate('branches', 'name slug');
    }
    if (!doctor) {
      doctor = await Doctor.findOne({ slug: idOrSlug })
        .populate('speciality', 'name slug')
        .populate('branches', 'name slug');
    }

    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cms/doctors
export const createDoctor = async (req, res) => {
  try {
    const { name, slug, speciality, qualification, experience_years, experience_location, bio, consultation_fee, available_days, branches, is_active, opd_timings } = req.body;
    if (!name || !slug || !speciality) {
      return res.status(400).json({ error: 'name, slug, speciality required' });
    }

    const image_url = req.file ? `/uploads/doctors/${req.file.filename}` : (req.body.image_url || '');

    // Parse opd_timings if it's a string (e.g. from FormData)
    let parsedOpdTimings = opd_timings;
    if (typeof opd_timings === 'string') {
      try {
        parsedOpdTimings = JSON.parse(opd_timings);
      } catch (e) {
        console.error('Failed to parse opd_timings:', e);
      }
    }

    const doctor = await Doctor.create({ 
      name, 
      slug, 
      speciality, 
      qualification, 
      experience_years: experience_years ? parseInt(experience_years) : null, 
      experience_location,
      bio, 
      image_url, 
      consultation_fee: consultation_fee ? parseInt(consultation_fee) : null, 
      available_days, 
      opd_timings: parsedOpdTimings,
      branches: branches || [],
      is_active: is_active !== 'false' && is_active !== false
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cms/doctors/:id
export const updateDoctor = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    if (updates.experience_years) updates.experience_years = parseInt(updates.experience_years);
    if (updates.consultation_fee) updates.consultation_fee = parseInt(updates.consultation_fee);
    if (updates.is_active !== undefined) updates.is_active = updates.is_active !== 'false' && updates.is_active !== false;

    if (updates.opd_timings && typeof updates.opd_timings === 'string') {
      try {
        updates.opd_timings = JSON.parse(updates.opd_timings);
      } catch (e) {
        console.error('Failed to parse opd_timings:', e);
      }
    }

    if (req.file) {
      updates.image_url = `/uploads/doctors/${req.file.filename}`;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cms/doctors/:id
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Specialities CMS ---

// POST /api/cms/specialities
export const createSpeciality = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'Name and slug are required' });
    
    const spec = await Speciality.create({ name, slug });
    res.status(201).json(spec);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A department with this name or slug already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cms/specialities/:id
export const updateSpeciality = async (req, res) => {
  try {
    const spec = await Speciality.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!spec) return res.status(404).json({ error: 'Speciality not found' });
    res.json(spec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/cms/specialities/:id
export const deleteSpeciality = async (req, res) => {
  try {
    const specId = req.params.id;
    const spec = await Speciality.findByIdAndDelete(specId);
    if (!spec) return res.status(404).json({ error: 'Speciality not found' });

    // Cascade delete: Remove all doctors in this speciality
    await Doctor.deleteMany({ speciality: specId });
    
    res.json({ ok: true, message: 'Department and associated doctors removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
