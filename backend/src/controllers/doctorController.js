import Doctor from "../models/Doctor.js";
import Speciality from "../models/Speciality.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import Designation from "../models/Designation.js";

// Setup Multer Storage for Doctors
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/doctors";
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

export const uploadDoctor = multer({ storage });

// Multer for department banner images
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/departments";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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
export const uploadSpecialityBanner = multer({ storage: bannerStorage });

// GET /api/doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { speciality, branch, search } = req.query;
    const filter = {};

    if (speciality) {
      // Find speciality by slug or ID
      let spec = null;
      if (speciality.match(/^[0-9a-fA-F]{24}$/)) {
        spec = await Speciality.findById(speciality);
      }
      if (!spec) {
        spec = await Speciality.findOne({ slug: speciality });
      }
      // No matching department — fail safe with an empty result instead of
      // silently returning every doctor from every department.
      if (!spec) return res.json([]);
      filter.speciality = spec._id;
    }

    if (branch) {
      filter.branches = branch;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { qualification: { $regex: search, $options: "i" } },
      ];
    }

    const doctors = await Doctor.find(filter)
      .populate("speciality", "name slug department_display_name")
      .populate("branches", "name slug")
      .populate("designation", "name");

    // Custom sorting in-memory
    doctors.sort((a, b) => {
      // First sort by sortIndex if they differ (default to 0 if undefined)
      const aIndex = typeof a.sortIndex === "number" ? a.sortIndex : 0;
      const bIndex = typeof b.sortIndex === "number" ? b.sortIndex : 0;

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      const priorityNames = [
        "General Surgeon / Surgery",
        "Gynecologist / OBGY",
      ];
      const aSpec = a.speciality?.name || "";
      const bSpec = b.speciality?.name || "";

      // If no speciality filter is applied, apply priority
      if (!speciality) {
        const aIndex = priorityNames.indexOf(aSpec);
        const bIndex = priorityNames.indexOf(bSpec);

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
      }

      // Group by speciality name
      if (aSpec !== bSpec) return aSpec.localeCompare(bSpec);

      // Sort by doctor name within group
      return a.name.localeCompare(b.name);
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/doctors/specialities
export const getAllSpecialities = async (req, res) => {
  try {
    const list = await Speciality.find().sort({ sortIndex: 1, name: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/doctors/specialities/:slug
export const getSpecialityBySlug = async (req, res) => {
  try {
    const spec = await Speciality.findOne({ slug: req.params.slug });
    if (!spec) return res.status(404).json({ error: "Department not found" });
    res.json(spec);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// GET /api/doctors/:idOrSlug
export const getDoctorByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    let doctor = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      doctor = await Doctor.findById(idOrSlug)
        .populate("speciality", "name slug department_display_name")
        .populate("branches", "name slug")
        .populate("designation", "name");
    }
    if (!doctor) {
      doctor = await Doctor.findOne({ slug: idOrSlug })
        .populate("speciality", "name slug department_display_name")
        .populate("branches", "name slug")
        .populate("designation", "name");
    }

    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/doctors
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      slug,
      speciality,
      qualification,
      experience_years,
      experience_location,
      bio,
      consultation_fee,
      available_days,
      branches,
      is_active,
      opd_timings,
      designation,
    } = req.body;
    if (!name || !slug || !speciality) {
      return res.status(400).json({ error: "name, slug, speciality required" });
    }

    const image_url = req.file
      ? `/uploads/doctors/${req.file.filename}`
      : req.body.image_url || "";

    // Parse opd_timings if it's a string (e.g. from FormData)
    let parsedOpdTimings = opd_timings;
    if (typeof opd_timings === "string") {
      try {
        parsedOpdTimings = JSON.parse(opd_timings);
      } catch (e) {
        console.error("Failed to parse opd_timings:", e);
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
      designation,
      is_active: is_active !== "false" && is_active !== false,
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/doctors/:id
export const updateDoctor = async (req, res) => {
  try {
    console.log("UPDATE DOCTOR REQ.BODY:", req.body);
    const updates = { ...req.body };
    if (updates.experience_years !== undefined) {
      updates.experience_years = updates.experience_years
        ? parseInt(updates.experience_years)
        : null;
    }
    if (updates.consultation_fee !== undefined) {
      updates.consultation_fee = updates.consultation_fee
        ? parseInt(updates.consultation_fee)
        : null;
    }
    if (updates.is_active !== undefined)
      updates.is_active =
        updates.is_active !== "false" && updates.is_active !== false;

    if (updates.opd_timings && typeof updates.opd_timings === "string") {
      try {
        updates.opd_timings = JSON.parse(updates.opd_timings);
      } catch (e) {
        console.error("Failed to parse opd_timings:", e);
      }
    }

    if (req.file) {
      updates.image_url = `/uploads/doctors/${req.file.filename}`;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/doctors/:id
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/doctors/reorder
export const reorderDoctors = async (req, res) => {
  try {
    const { doctors } = req.body;
    if (!Array.isArray(doctors)) {
      return res
        .status(400)
        .json({ error: "doctors must be an array of { id, sortIndex }" });
    }

    const updates = doctors.map((doc) => ({
      updateOne: {
        filter: { _id: doc._id || doc.id },
        update: { $set: { sortIndex: doc.sortIndex } },
      },
    }));

    if (updates.length > 0) {
      await Doctor.bulkWrite(updates);
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Error reordering doctors:", error);
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// --- Specialities CMS ---

// POST /api/cms/specialities
export const createSpeciality = async (req, res) => {
  try {
    const {
      name,
      slug,
      department_display_name,
      category,
      banner_color,
      banner_subtitle,
      description,
      usp_items,
      lists,
      meta_title,
      meta_description,
      sortIndex,
    } = req.body;
    if (!name || !slug)
      return res.status(400).json({ error: "Name and slug are required" });

    const banner_image = req.file
      ? `/uploads/departments/${req.file.filename}`
      : req.body.banner_image || "";

    const spec = await Speciality.create({
      name,
      slug,
      department_display_name,
      category,
      banner_image,
      banner_color,
      banner_subtitle,
      description,
      usp_items:
        typeof usp_items === "string" ? JSON.parse(usp_items) : usp_items || [],
      lists: typeof lists === "string" ? JSON.parse(lists) : lists || [],
      meta_title,
      meta_description,
      sortIndex: sortIndex ? parseInt(sortIndex) : 0,
    });
    res.status(201).json(spec);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "A department with this name or slug already exists" });
    }
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/specialities/:id
export const updateSpeciality = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file)
      updates.banner_image = `/uploads/departments/${req.file.filename}`;
    if (updates.usp_items && typeof updates.usp_items === "string")
      updates.usp_items = JSON.parse(updates.usp_items);
    if (updates.lists && typeof updates.lists === "string")
      updates.lists = JSON.parse(updates.lists);
    if (updates.sortIndex) updates.sortIndex = parseInt(updates.sortIndex);

    const spec = await Speciality.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!spec) return res.status(404).json({ error: "Speciality not found" });
    res.json(spec);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/specialities/:id
export const deleteSpeciality = async (req, res) => {
  try {
    const specId = req.params.id;
    const spec = await Speciality.findByIdAndDelete(specId);
    if (!spec) return res.status(404).json({ error: "Speciality not found" });

    // Cascade delete: Remove all doctors in this speciality
    await Doctor.deleteMany({ speciality: specId });

    res.json({
      ok: true,
      message: "Department and associated doctors removed",
    });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// --- Designations ---
export const getAllDesignations = async (req, res) => {
  try {
    const list = await Designation.find().sort({ name: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const createDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const desig = await Designation.create({ name });
    res.status(201).json(desig);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const updateDesignation = async (req, res) => {
  try {
    const desig = await Designation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!desig) return res.status(404).json({ error: "Designation not found" });
    res.json(desig);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const deleteDesignation = async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};
