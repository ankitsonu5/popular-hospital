import Booking from '../models/Booking.js';

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { patient_name, patient_phone, patient_email, doctor, branch, slot_date, slot_time, notes } = req.body;
    if (!patient_name || !patient_phone || !doctor || !branch || !slot_date || !slot_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const booking = await Booking.create({
      patient_name,
      patient_phone,
      patient_email: patient_email || '',
      doctor,
      branch,
      slot_date,
      slot_time,
      notes: notes || null,
    });
    res.status(201).json({ id: booking._id, message: 'Booking confirmed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const { phone, date } = req.query;
    const filter = {};
    if (phone) filter.patient_phone = phone;
    if (date) filter.slot_date = date;

    const bookings = await Booking.find(filter)
      .populate('doctor', 'name slug')
      .populate('branch', 'name slug')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};
