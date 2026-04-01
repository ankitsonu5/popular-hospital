import Booking from "../models/Booking.js";
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

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(doctor) ||
      !mongoose.Types.ObjectId.isValid(branch)
    ) {
      return res.status(400).json({ error: "Invalid doctor or branch ID" });
    }

    const booking = await Booking.create({
      patient_name: String(patient_name).trim().substring(0, 200),
      patient_phone: String(patient_phone).trim().substring(0, 20),
      patient_email: patient_email
        ? String(patient_email).trim().substring(0, 200)
        : "",
      doctor,
      branch,
      slot_date,
      slot_time,
      notes: notes ? String(notes).trim().substring(0, 1000) : null,
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
    const { phone, date } = req.query;
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
    if (!["pending", "confirmed", "done"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updateData = { status };
    if (status === "confirmed") {
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
