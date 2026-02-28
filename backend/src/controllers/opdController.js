import OpdSlot from '../models/OpdSlot.js';
import Booking from '../models/Booking.js';

const DEFAULT_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

// GET /api/opd/slots
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctor_id, branch_id, date } = req.query;
    if (!doctor_id || !branch_id || !date) {
      return res.status(400).json({ error: 'doctor_id, branch_id and date are required' });
    }

    // Get booked slots
    const bookedBookings = await Booking.find({
      doctor: doctor_id,
      branch: branch_id,
      slot_date: date,
      status: { $ne: 'cancelled' },
    }).select('slot_time');
    const bookedSet = new Set(bookedBookings.map((b) => b.slot_time));

    // Get stored slots
    const storedSlots = await OpdSlot.find({
      doctor: doctor_id,
      branch: branch_id,
      slot_date: date,
      is_available: true,
    }).select('slot_time');

    const allForDay = storedSlots.length > 0
      ? storedSlots.map((s) => s.slot_time)
      : DEFAULT_SLOTS;

    const available = allForDay.filter((t) => !bookedSet.has(t));
    res.json({ date, slots: available });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/opd/slots
export const setSlots = async (req, res) => {
  try {
    const { branch_id, doctor_id, slot_date, slots } = req.body;
    if (!branch_id || !doctor_id || !slot_date || !Array.isArray(slots)) {
      return res.status(400).json({ error: 'branch_id, doctor_id, slot_date and slots array required' });
    }

    const operations = slots.map((slot_time) => ({
      updateOne: {
        filter: { branch: branch_id, doctor: doctor_id, slot_date, slot_time },
        update: { $set: { is_available: true } },
        upsert: true,
      },
    }));

    await OpdSlot.bulkWrite(operations);
    res.json({ message: 'Slots updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
