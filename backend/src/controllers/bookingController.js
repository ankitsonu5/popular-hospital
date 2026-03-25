import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { patient_name, patient_phone, patient_email, doctor, branch, slot_date, slot_time, notes } = req.body;
    if (!patient_name || !patient_phone || !doctor || !branch || !slot_date || !slot_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate phone format (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(patient_phone.replace(/[\s\-\+]/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Validate email if provided
    if (patient_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(doctor) || !mongoose.Types.ObjectId.isValid(branch)) {
      return res.status(400).json({ error: 'Invalid doctor or branch ID' });
    }

    const booking = await Booking.create({
      patient_name: String(patient_name).trim().substring(0, 200),
      patient_phone: String(patient_phone).trim().substring(0, 20),
      patient_email: patient_email ? String(patient_email).trim().substring(0, 200) : '',
      doctor,
      branch,
      slot_date,
      slot_time,
      notes: notes ? String(notes).trim().substring(0, 1000) : null,
    });
    res.status(201).json({ id: booking._id, message: 'Booking confirmed' });
  } catch (error) {
    console.error('[BOOKING]', error.message);
    res.status(500).json({ error: 'An error occurred while creating the booking.' });
  }
};

// GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const { phone, date } = req.query;
    const filter = {};
    if (phone) filter.patient_phone = String(phone).trim();
    if (date) filter.slot_date = String(date).trim();

    const bookings = await Booking.find(filter)
      .populate('doctor', 'name slug')
      .populate('branch', 'name slug')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('[BOOKING]', error.message);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

// GET /api/cms/bookings (all bookings for CMS)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('doctor', 'name slug')
      .populate('branch', 'name slug')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('[BOOKING]', error.message);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
