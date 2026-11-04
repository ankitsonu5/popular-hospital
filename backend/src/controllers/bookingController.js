import Booking from "../models/Booking.js";
import Doctor from "../models/Doctor.js";
import Branch from "../models/Branch.js";
import mongoose from "mongoose";
import { sendBookingEmail } from "../services/emailService.js";

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const {
      patient_name,
      patient_phone,
      patient_email,
      doctor,
      branch,
      slot_date,
      slot_time,
      notes,
      source,
    } = req.body;
    if (
      !patient_name ||
      !patient_phone ||
      !doctor ||
      !branch ||
      !slot_date ||
      !slot_time
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate phone format (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(patient_phone.replace(/[\s\-\+]/g, ""))) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Validate email if provided
    if (patient_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient_email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Resolve doctor ObjectId flexibly
    let doctorId = null;
    if (mongoose.Types.ObjectId.isValid(doctor)) {
      const docCheck = await Doctor.findById(doctor);
      if (docCheck) doctorId = docCheck._id;
    }
    if (!doctorId) {
      const docFound = await Doctor.findOne({
        $or: [
          { slug: String(doctor).toLowerCase() },
          { name: new RegExp(`^${doctor}$`, "i") },
          { name: new RegExp(String(doctor).replace(/^dr\.?\s*/i, ""), "i") },
        ],
      });
      if (docFound) doctorId = docFound._id;
    }
    if (!doctorId) {
      let docCreate = await Doctor.findOne({
        slug: String(doctor).toLowerCase(),
      });
      if (!docCreate) {
        docCreate = await Doctor.create({
          name:
            req.body.doctor_name ||
            String(doctor)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
          slug: String(doctor)
            .toLowerCase()
            .replace(/[^a-z0-9\-]/g, "-"),
          is_active: true,
        });
      }
      doctorId = docCreate._id;
    }

    // Resolve branch ObjectId flexibly
    let branchId = null;
    if (mongoose.Types.ObjectId.isValid(branch)) {
      const brCheck = await Branch.findById(branch);
      if (brCheck) branchId = brCheck._id;
    }
    if (!branchId) {
      const brFound = await Branch.findOne({
        $or: [
          { slug: String(branch).toLowerCase() },
          { name: new RegExp(`^${branch}$`, "i") },
          { name: new RegExp(String(branch).split(",")[0].trim(), "i") },
        ],
      });
      if (brFound) branchId = brFound._id;
    }
    if (!branchId) {
      const firstBranch =
        (await Branch.findOne({ is_active: true }).sort({ order: 1 })) ||
        (await Branch.findOne());
      if (firstBranch) {
        branchId = firstBranch._id;
      } else {
        const createdBranch = await Branch.create({
          name:
            typeof branch === "string" ? branch : "Popular Hospital Varanasi",
          slug: "popular-hospital-varanasi",
          is_active: true,
        });
        branchId = createdBranch._id;
      }
    }

    const booking = await Booking.create({
      patient_name: String(patient_name).trim().substring(0, 200),
      patient_phone: String(patient_phone).trim().substring(0, 20),
      patient_email: patient_email
        ? String(patient_email).trim().substring(0, 200)
        : "",
      doctor: doctorId,
      branch: branchId,
      slot_date,
      slot_time,
      notes: notes ? String(notes).trim().substring(0, 1000) : null,
      source: source === "chatbot" ? "chatbot" : "website",
    });

    // Populate references for email notification readability
    await booking.populate("doctor", "name");
    await booking.populate("branch", "name");

    // Dispatch email notification (non-blocking)
    sendBookingEmail(booking).catch((err) => {
      console.error("[EMAIL] Failed to send booking email:", err.message);
    });

    res.status(201).json({ id: booking._id, message: "Booking confirmed" });
  } catch (error) {
    console.error("[BOOKING]", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking." });
  }
};

// GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const { phone, date, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (phone) filter.patient_phone = String(phone).trim();
    if (date) filter.slot_date = String(date).trim();

    const bookings = await Booking.find(filter)
      .populate("doctor", "name slug")
      .populate("branch", "name slug")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("[BOOKING]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// GET /api/cms/bookings (all bookings for CMS)
export const getAllBookings = async (req, res) => {
  try {
    const { isRead, status } = req.query;
    const filter = {};
    if (isRead !== undefined) {
      filter.isRead = isRead === "false" ? { $ne: true } : true;
    }

    const bookings = await Booking.find(filter)
      .populate("doctor", "name slug")
      .populate("branch", "name slug")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("[BOOKING]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PATCH /api/cms/bookings/:id/read
export const markBookingRead = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    console.error("[BOOKING READ]", error.message);
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

// PATCH /api/cms/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "done", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updateData = { status };
    if (status === "confirmed" || status === "rejected") {
      updateData.isRead = true;
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (e) {
    console.error("[BOOKING STATUS UPDATE]", e.message);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// PATCH /api/cms/bookings/:id/admin-notes
export const updateAdminNotes = async (req, res) => {
  try {
    const { adminNotes } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        adminNotes: String(adminNotes ?? "")
          .trim()
          .substring(0, 2000),
      },
      { new: true },
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (e) {
    console.error("[BOOKING NOTES]", e.message);
    res.status(500).json({ error: "Failed to save notes" });
  }
};

// DELETE /api/cms/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("[BOOKING DELETE]", error.message);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
