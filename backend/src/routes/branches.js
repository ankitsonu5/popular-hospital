import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const branches = db.prepare('SELECT * FROM branches ORDER BY city, name').all();
    res.json(branches);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:idOrSlug', (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const byId = db.prepare('SELECT * FROM branches WHERE id = ?').get(idOrSlug);
    if (byId) return res.json(byId);
    const bySlug = db.prepare('SELECT * FROM branches WHERE slug = ?').get(idOrSlug);
    if (bySlug) return res.json(bySlug);
    res.status(404).json({ error: 'Branch not found' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
