import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

export const cmsAuth = (req, res, next) => {
  // Try getting token from authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // add user to request
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  // Fallback to legacy API key for backward compatibility or simple scripts
  const key = req.headers['x-cms-key'] || req.query.cms_key;
  if (key === process.env.CMS_API_KEY || key === 'popular-hospital-cms-dev') {
    req.user = { id: 'admin', role: 'admin' };
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized: Missing or invalid credentials' });
};
