import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.post('/', (req, res) => {
  try {
    const { patient_name, patient_phone, patient_email, doctor_id, branch_id, slot_date, slot_time, notes } = req.body;
    if (!patient_name || !patient_phone || !doctor_id || !branch_id || !slot_date || !slot_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const stmt = db.prepare(`
      INSERT INTO bookings (patient_name, patient_phone, patient_email, doctor_id, branch_id, slot_date, slot_time, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      patient_name,
      patient_phone || '',
      patient_email || '',
      doctor_id,
      branch_id,
      slot_date,
      slot_time,
      notes || null
    );
    // Mark slot as taken (optional: could add opd_slots update)
    res.status(201).json({ id: result.lastInsertRowid, message: 'Booking confirmed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/', (req, res) => {
  try {
    const { phone, date } = req.query;
    let sql = `
      SELECT b.*, d.name as doctor_name, br.name as branch_name
      FROM bookings b
      JOIN doctors d ON b.doctor_id = d.id
      JOIN branches br ON b.branch_id = br.id
      WHERE 1=1
    `;
    const params = [];
    if (phone) { sql += ' AND b.patient_phone = ?'; params.push(phone); }
    if (date) { sql += ' AND b.slot_date = ?'; params.push(date); }
    sql += ' ORDER BY b.created_at DESC';
    const list = db.prepare(sql).all(...params);
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
