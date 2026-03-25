import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import securityConfig from '../config/security.js';

// In-memory login attempt tracking (use Redis in production cluster)
const loginAttempts = new Map();

const getAttemptKey = (email) => email.toLowerCase().trim();

const checkLockout = (email) => {
  const key = getAttemptKey(email);
  const record = loginAttempts.get(key);
  if (!record) return false;
  
  // Check if lockout has expired
  if (record.lockedUntil && Date.now() > record.lockedUntil) {
    loginAttempts.delete(key);
    return false;
  }
  
  return record.lockedUntil && Date.now() < record.lockedUntil;
};

const recordFailedAttempt = (email) => {
  const key = getAttemptKey(email);
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: null };
  record.count += 1;
  
  if (record.count >= securityConfig.lockout.maxAttempts) {
    record.lockedUntil = Date.now() + securityConfig.lockout.lockoutDurationMs;
    console.warn(`[SECURITY] Account locked for ${email} after ${record.count} failed attempts`);
  }
  
  loginAttempts.set(key, record);
};

const clearAttempts = (email) => {
  loginAttempts.delete(getAttemptKey(email));
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // Check account lockout
    if (checkLockout(sanitizedEmail)) {
      return res.status(429).json({ 
        error: 'Account temporarily locked due to too many failed attempts. Try again in 15 minutes.' 
      });
    }

    const admin = await AdminUser.findOne({ email: sanitizedEmail });
    if (!admin) {
      recordFailedAttempt(sanitizedEmail);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      recordFailedAttempt(sanitizedEmail);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login — clear attempt counter
    clearAttempts(sanitizedEmail);

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      securityConfig.jwt.secret,
      { expiresIn: securityConfig.jwt.accessTokenExpiry }
    );

    res.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error('[AUTH] Login error:', error.message);
    res.status(500).json({ error: 'An error occurred during authentication.' });
  }
};

export const getMe = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.user.id).select('-password_hash');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('[AUTH] getMe error:', error.message);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
