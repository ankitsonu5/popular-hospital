import SiteContent from '../models/SiteContent.js';

// GET /api/cms/content
export const getSiteContent = async (req, res) => {
  try {
    const rows = await SiteContent.find();
    const content = {};
    rows.forEach((r) => { content[r.key] = r.value; });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cms/content
export const setSiteContent = async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: 'key required' });

    await SiteContent.findOneAndUpdate(
      { key },
      { value: value ?? '' },
      { upsert: true, new: true }
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
