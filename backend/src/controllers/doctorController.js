import Doctor from '../models/Doctor.js';
import Speciality from '../models/Speciality.js';

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
    const { name, slug, speciality, qualification, experience_years, bio, image_url, consultation_fee, available_days, branches } = req.body;
    if (!name || !slug || !speciality) {
      return res.status(400).json({ error: 'name, slug, speciality required' });
    }
    const doctor = await Doctor.create({ name, slug, speciality, qualification, experience_years, bio, image_url, consultation_fee, available_days, branches: branches || [] });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/cms/doctors/:id
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
