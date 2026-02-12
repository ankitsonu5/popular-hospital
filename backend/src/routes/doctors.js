import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const { speciality, branch, search } = req.query;
    let sql = `
      SELECT d.*, s.name as speciality_name, s.slug as speciality_slug
      FROM doctors d
      JOIN specialities s ON d.speciality_id = s.id
      WHERE d.is_active = 1
    `;
    const params = [];
    if (speciality) {
      sql += ' AND (s.slug = ? OR s.id = ?)';
      params.push(speciality, speciality);
    }
    if (search) {
      sql += ' AND (d.name LIKE ? OR d.qualification LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    sql += ' ORDER BY d.name';
    let doctors = db.prepare(sql).all(...params);
    if (branch) {
      const branchId = parseInt(branch, 10);
      doctors = doctors.filter(d => {
        const ids = d.branch_ids ? d.branch_ids.split(',').map(Number) : [];
        return ids.includes(branchId);
      });
    }
    res.json(doctors);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/specialities', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM specialities ORDER BY name').all();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:idOrSlug', (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const byId = db.prepare(`
      SELECT d.*, s.name as speciality_name, s.slug as speciality_slug
      FROM doctors d JOIN specialities s ON d.speciality_id = s.id
      WHERE d.id = ?
    `).get(idOrSlug);
    if (byId) return res.json(byId);
    const bySlug = db.prepare(`
      SELECT d.*, s.name as speciality_name, s.slug as speciality_slug
      FROM doctors d JOIN specialities s ON d.speciality_id = s.id
      WHERE d.slug = ?
    `).get(idOrSlug);
    if (bySlug) return res.json(bySlug);
    res.status(404).json({ error: 'Doctor not found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
