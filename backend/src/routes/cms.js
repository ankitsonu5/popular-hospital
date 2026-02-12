import { Router } from 'express';
import db from '../db.js';

const router = Router();

// Simple API key auth for CMS (in production use proper auth)
const cmsAuth = (req, res, next) => {
  const key = req.headers['x-cms-key'] || req.query.cms_key;
  if (key === process.env.CMS_API_KEY || key === 'popular-hospital-cms-dev') return next();
  return res.status(401).json({ error: 'Unauthorized' });
};

router.use(cmsAuth);

// Branches CRUD
router.get('/branches', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM branches ORDER BY city, name').all();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/branches', (req, res) => {
  try {
    const { name, slug, address, city, state, pincode, phone, email, description, image_url, facilities } = req.body;
    if (!name || !slug || !address || !city) return res.status(400).json({ error: 'name, slug, address, city required' });
    const stmt = db.prepare(`
      INSERT INTO branches (name, slug, address, city, state, pincode, phone, email, description, image_url, facilities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, slug, address, city, state || null, pincode || null, phone || null, email || null, description || null, image_url || null, facilities || null);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/branches/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, address, city, state, pincode, phone, email, description, image_url, facilities } = req.body;
    db.prepare(`
      UPDATE branches SET name=?, slug=?, address=?, city=?, state=?, pincode=?, phone=?, email=?, description=?, image_url=?, facilities=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
    `).run(name, slug, address, city, state, pincode, phone, email, description, image_url, facilities, id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/branches/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM branches WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Doctors CRUD
router.get('/doctors', (req, res) => {
  try {
    const list = db.prepare(`
      SELECT d.*, s.name as speciality_name FROM doctors d
      JOIN specialities s ON d.speciality_id = s.id
      ORDER BY d.name
    `).all();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/doctors', (req, res) => {
  try {
    const { name, slug, speciality_id, qualification, experience_years, bio, image_url, consultation_fee, available_days, branch_ids } = req.body;
    if (!name || !slug || !speciality_id) return res.status(400).json({ error: 'name, slug, speciality_id required' });
    const branchIdsStr = Array.isArray(branch_ids) ? branch_ids.join(',') : (branch_ids || '');
    const stmt = db.prepare(`
      INSERT INTO doctors (name, slug, speciality_id, qualification, experience_years, bio, image_url, consultation_fee, available_days, branch_ids)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(name, slug, speciality_id, qualification || null, experience_years ?? null, bio || null, image_url || null, consultation_fee ?? null, available_days || null, branchIdsStr);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/doctors/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, speciality_id, qualification, experience_years, bio, image_url, consultation_fee, available_days, branch_ids, is_active } = req.body;
    const branchIdsStr = Array.isArray(branch_ids) ? branch_ids.join(',') : (branch_ids ?? '');
    db.prepare(`
      UPDATE doctors SET name=?, slug=?, speciality_id=?, qualification=?, experience_years=?, bio=?, image_url=?, consultation_fee=?, available_days=?, branch_ids=?, is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?
    `).run(name, slug, speciality_id, qualification, experience_years, bio, image_url, consultation_fee, available_days, branchIdsStr, is_active !== undefined ? is_active : 1, id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/doctors/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM doctors WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Bookings list (read-only for CMS)
router.get('/bookings', (req, res) => {
  try {
    const list = db.prepare(`
      SELECT b.*, d.name as doctor_name, br.name as branch_name
      FROM bookings b JOIN doctors d ON b.doctor_id = d.id JOIN branches br ON b.branch_id = br.id
      ORDER BY b.created_at DESC
    `).all();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Site content (key-value for homepage etc.)
router.get('/content', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM site_content').all();
    const content = {};
    rows.forEach(r => { content[r.key] = r.value; });
    res.json(content);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/content', (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: 'key required' });
    db.prepare('INSERT OR REPLACE INTO site_content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)').run(key, value ?? '');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
