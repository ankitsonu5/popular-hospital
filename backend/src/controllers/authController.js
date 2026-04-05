import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AdminUser from "../models/AdminUser.js";
import securityConfig from "../config/security.js";
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../services/emailService.js";

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
    console.warn(
      `[SECURITY] Account locked for ${email} after ${record.count} failed attempts`,
    );
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
      return res.status(400).json({ error: "Email and password are required" });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // Check account lockout
    if (checkLockout(sanitizedEmail)) {
      return res.status(429).json({
        error:
          "Account temporarily locked due to too many failed attempts. Try again in 15 minutes.",
      });
    }

    const admin = await AdminUser.findOne({ email: sanitizedEmail });
    if (!admin) {
      recordFailedAttempt(sanitizedEmail);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      recordFailedAttempt(sanitizedEmail);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Successful login — clear attempt counter
    clearAttempts(sanitizedEmail);

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      securityConfig.jwt.secret,
      { expiresIn: securityConfig.jwt.accessTokenExpiry },
    );

    res.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error.message);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
};

export const getMe = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.user.id).select(
      "-password_hash",
    );
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("[AUTH] getMe error:", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const admin = await AdminUser.findOne({ email: sanitizedEmail });

    if (!admin) {
      // Don't leak if email exists or not
      return res.json({ message: "If that email is registered, a password reset link has been sent." });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Hash it before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    // Construct the reset URL
    const origin = req.headers.origin; // From where the request originated
    // fallback URL just in case
    const frontendUrl = origin || process.env.FRONTEND_URL || "https://www.popularhospital.in";
    const resetUrl = `${frontendUrl}/reset-admin-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(admin.email, resetUrl);

    res.json({ message: "If that email is registered, a password reset link has been sent." });
  } catch (error) {
    console.error("[AUTH] forgotPassword error:", error.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }

    // Hash token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await AdminUser.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ error: "Invalid or expired reset token. This link will no longer work. Please go back to the login page and use 'Forgot Key?' to request a new one." });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    admin.password_hash = await bcrypt.hash(newPassword, salt);
    
    // Clear reset token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    
    await admin.save();

    // Send confirmation email
    await sendPasswordResetSuccessEmail(admin.email);

    res.json({ message: "Password has been reset successfully. You can now log in." });
  } catch (error) {
    console.error("[AUTH] resetPassword error:", error.message);
    res.status(500).json({ error: "An error occurred while resetting password." });
  }
};
