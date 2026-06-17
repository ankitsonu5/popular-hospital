import multer from "multer";
import path from "path";
import fs from "fs";
import Application from "../models/Application.js";
import { sendApplicationEmail } from "../services/emailService.js";

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/applications";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF, DOC, and Images allowed."),
      false,
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Submit Application
export const submitApplication = async (req, res) => {
  try {
    let {
      name,
      gender,
      nationality,
      identificationType,
      mobile,
      email,
      address,
      location,
      appliedFor,
    } = req.body;

    // Safety check for appliedFor (if it's an empty string or 'null'/'undefined' string)
    if (!appliedFor || appliedFor === "null" || appliedFor === "undefined") {
      appliedFor = undefined;
    }

    if (!req.files || !req.files["resume"]) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const application = new Application({
      name,
      gender,
      nationality,
      identificationType,
      mobile,
      email,
      address,
      location,
      appliedFor,
      resumeUrl: `/uploads/applications/${req.files["resume"][0].filename}`,
      photoUrl: req.files["photo"]
        ? `/uploads/applications/${req.files["photo"][0].filename}`
        : undefined,
    });

    await application.save();

    // Send email notification (non-blocking)
    sendApplicationEmail(application).catch((err) => {
      console.error("[EMAIL] Failed to send application email:", err.message);
    });

    res.status(201).json({
      message: "Application submitted successfully!",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

// Admin: List Applications
export const getApplications = async (req, res) => {
  try {
    const filter = {};
    if (req.query.isRead !== undefined) {
      filter.isRead = req.query.isRead === "true";
    }
    const applications = await Application.find(filter)
      .populate("appliedFor", "designation department")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get Single Application
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "appliedFor",
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete Application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    // Optionally delete files from storage
    const resumePath = path.join(process.cwd(), application.resumeUrl);
    if (fs.existsSync(resumePath)) fs.unlinkSync(resumePath);

    if (application.photoUrl) {
      const photoPath = path.join(process.cwd(), application.photoUrl);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Toggle Starred Status
export const toggleStarred = async (req, res) => {
  try {
    const { id } = req.params;
    const { isStarred } = req.body;
    const application = await Application.findByIdAndUpdate(
      id,
      { isStarred },
      { new: true },
    ).populate("appliedFor");
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating starred status", error: err.message });
  }
};

// Toggle Read Status
export const toggleRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const application = await Application.findByIdAndUpdate(
      id,
      { isRead },
      { new: true },
    ).populate("appliedFor");
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating read status", error: err.message });
  }
};

// Update Application Status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Applied", "Shortlisted", "Selected", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).populate("appliedFor");

    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating status", error: err.message });
  }
};
