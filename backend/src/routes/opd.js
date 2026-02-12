import { Router } from 'express';
import db from '../db.js';

const router = Router();

const DEFAULT_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

router.get('/slots', (req, res) => {
  try {
    const { doctor_id, branch_id, date } = req.query;
    if (!doctor_id || !branch_id || !date) {
      return res.status(400).json({ error: 'doctor_id, branch_id and date are required' });
    }
    const booked = db.prepare(`
      SELECT slot_time FROM bookings
      WHERE doctor_id = ? AND branch_id = ? AND slot_date = ? AND status != 'cancelled'
    `).all(doctor_id, branch_id, date);
    const bookedSet = new Set(booked.map(r => r.slot_time));
    const stored = db.prepare(`
      SELECT slot_time FROM opd_slots
      WHERE doctor_id = ? AND branch_id = ? AND slot_date = ? AND is_available = 1
    `).all(doctor_id, branch_id, date);
    const availableStored = stored.filter(s => !bookedSet.has(s.slot_time)).map(s => s.slot_time);
    const allForDay = stored.length ? DEFAULT_SLOTS.filter(t => {
      const inStored = db.prepare('SELECT 1 FROM opd_slots WHERE doctor_id = ? AND branch_id = ? AND slot_date = ? AND slot_time = ? AND is_available = 1')
        .get(doctor_id, branch_id, date, t);
      return inStored;
    }) : DEFAULT_SLOTS;
    const available = allForDay.length ? allForDay.filter(t => !bookedSet.has(t)) : DEFAULT_SLOTS.filter(t => !bookedSet.has(t));
    res.json({ date, slots: available });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/slots', (req, res) => {
  try {
    const { branch_id, doctor_id, slot_date, slots } = req.body;
    if (!branch_id || !doctor_id || !slot_date || !Array.isArray(slots)) {
      return res.status(400).json({ error: 'branch_id, doctor_id, slot_date and slots array required' });
    }
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO opd_slots (branch_id, doctor_id, slot_date, slot_time, is_available)
      VALUES (?, ?, ?, ?, 1)
    `);
    for (const slot_time of slots) {
      stmt.run(branch_id, doctor_id, slot_date, slot_time);
    }
    res.json({ message: 'Slots updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
