import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AdminUser from "../models/AdminUser.js";
import securityConfig from "../config/security.js";

// 4h in ms — matches JWT expiry
const SESSION_TTL_MS = 4 * 60 * 60 * 1000;

const hasActiveSession = (admin) =>
  admin.sessionToken &&
  admin.sessionExpires &&
  admin.sessionExpires > new Date();
import {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../services/emailService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    const admin = await AdminUser.findOne({ email: sanitizedEmail });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (admin.isActive === false) {
      return res.status(403).json({ error: "account_disabled" });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Single-session enforcement for career_admin and sub_admin
    if (
      (admin.role === "career_admin" || admin.role === "sub_admin") &&
      hasActiveSession(admin)
    ) {
      return res.status(403).json({ error: "already_logged_in" });
    }

    // Set session for career_admin and sub_admin
    if (admin.role === "career_admin" || admin.role === "sub_admin") {
      admin.sessionToken = crypto.randomBytes(32).toString("hex");
      admin.sessionExpires = new Date(Date.now() + SESSION_TTL_MS);
      await admin.save();
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role || "super_admin" },
      securityConfig.jwt.secret,
      { expiresIn: securityConfig.jwt.accessTokenExpiry },
    );

    res.json({
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role || "super_admin",
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
      return res.json({
        message:
          "If that email is registered, a password reset link has been sent.",
      });
    }

    // sub_admin and career_admin cannot reset password themselves
    if (admin.role === "sub_admin" || admin.role === "career_admin") {
      return res.status(403).json({ error: "restricted_role" });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash it before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    // Construct the reset URL
    const origin = req.headers.origin; // From where the request originated
    // fallback URL just in case
    const frontendUrl =
      origin || process.env.FRONTEND_URL || "https://www.popularhospital.in";
    const resetUrl = `${frontendUrl}/reset-admin-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(admin.email, resetUrl);

    res.json({
      message:
        "If that email is registered, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("[AUTH] forgotPassword error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

// GET /api/cms/career-admin — all career admins with live session status
export const getCareerAdmins = async (req, res) => {
  try {
    const admins = await AdminUser.find({ role: "career_admin" })
      .select("-password_hash -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });
    // attach isOnline derived field
    const result = admins.map((a) => ({
      ...a.toObject(),
      isOnline: hasActiveSession(a),
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/career-admin/logout — career admin clears own session
export const careerAdminLogout = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.user.id, {
      $unset: { sessionToken: 1, sessionExpires: 1 },
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/career-admin/:id/session — super admin force-clears one session
export const forceLogoutCareerAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({
      _id: req.params.id,
      role: "career_admin",
    });
    if (!admin)
      return res.status(404).json({ error: "Career admin not found." });
    admin.sessionToken = null;
    admin.sessionExpires = null;
    await admin.save();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/career-admin/sessions/all — super admin clears ALL career admin sessions
export const forceLogoutAllCareerAdmins = async (req, res) => {
  try {
    await AdminUser.updateMany(
      { role: "career_admin" },
      { $unset: { sessionToken: 1, sessionExpires: 1 } },
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PATCH /api/cms/career-admin/:id/toggle — enable / disable a specific career admin
export const toggleCareerAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({
      _id: req.params.id,
      role: "career_admin",
    });
    if (!admin)
      return res.status(404).json({ error: "Career admin not found." });
    admin.isActive = !admin.isActive;
    await admin.save();
    res.json({ ok: true, isActive: admin.isActive });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/career-admin/:id — update specific career admin
export const updateCareerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const admin = await AdminUser.findOne({
      _id: req.params.id,
      role: "career_admin",
    });
    if (!admin)
      return res.status(404).json({ error: "Career admin not found." });

    const emailLower = email.toLowerCase().trim();
    const conflict = await AdminUser.findOne({
      email: emailLower,
      _id: { $ne: admin._id },
    });
    if (conflict)
      return res.status(400).json({ error: "This email is already in use." });

    admin.email = emailLower;
    if (name) admin.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password_hash = await bcrypt.hash(password, salt);
    }
    await admin.save();
    res.json({ ok: true, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// POST /api/cms/career-admin — create new career admin
export const createCareerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });
    if (!password)
      return res.status(400).json({ error: "Password is required." });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const newAdmin = await AdminUser.create({
      email: email.toLowerCase().trim(),
      password_hash,
      name: name || "Career Admin",
      role: "career_admin",
    });
    res.json({
      ok: true,
      _id: newAdmin._id,
      email: newAdmin.email,
      name: newAdmin.name,
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ error: "This email is already in use." });
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// DELETE /api/cms/career-admin/:id — remove a career admin
export const deleteCareerAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOneAndDelete({
      _id: req.params.id,
      role: "career_admin",
    });
    if (!admin)
      return res.status(404).json({ error: "Career admin not found." });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// ── Sub-Admin CRUD ────────────────────────────────────────────────────────

export const getSubAdmins = async (req, res) => {
  try {
    const admins = await AdminUser.find({ role: "sub_admin" })
      .select("-password_hash -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });
    const result = admins.map((a) => ({ ...a.toObject(), isOnline: hasActiveSession(a) }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const createSubAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });
    if (!password) return res.status(400).json({ error: "Password is required." });
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const newAdmin = await AdminUser.create({
      email: email.toLowerCase().trim(),
      password_hash,
      name: name || "Sub Admin",
      role: "sub_admin",
    });
    res.json({ ok: true, _id: newAdmin._id, email: newAdmin.email, name: newAdmin.name });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: "This email is already in use." });
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const updateSubAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });
    const admin = await AdminUser.findOne({ _id: req.params.id, role: "sub_admin" });
    if (!admin) return res.status(404).json({ error: "Sub admin not found." });
    const emailLower = email.toLowerCase().trim();
    const conflict = await AdminUser.findOne({ email: emailLower, _id: { $ne: admin._id } });
    if (conflict) return res.status(400).json({ error: "This email is already in use." });
    admin.email = emailLower;
    if (name) admin.name = name;
    if (password) { const salt = await bcrypt.genSalt(10); admin.password_hash = await bcrypt.hash(password, salt); }
    await admin.save();
    res.json({ ok: true, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const toggleSubAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ _id: req.params.id, role: "sub_admin" });
    if (!admin) return res.status(404).json({ error: "Sub admin not found." });
    admin.isActive = !admin.isActive;
    await admin.save();
    res.json({ ok: true, isActive: admin.isActive });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const deleteSubAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOneAndDelete({ _id: req.params.id, role: "sub_admin" });
    if (!admin) return res.status(404).json({ error: "Sub admin not found." });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const forceLogoutSubAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ _id: req.params.id, role: "sub_admin" });
    if (!admin) return res.status(404).json({ error: "Sub admin not found." });
    admin.sessionToken = null;
    admin.sessionExpires = null;
    await admin.save();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const forceLogoutAllSubAdmins = async (req, res) => {
  try {
    await AdminUser.updateMany({ role: "sub_admin" }, { $unset: { sessionToken: 1, sessionExpires: 1 } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const subAdminLogout = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.user.id, { $unset: { sessionToken: 1, sessionExpires: 1 } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required" });
    }

    // Hash token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await AdminUser.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        error:
          "Invalid or expired reset token. This link will no longer work. Please go back to the login page and use 'Forgot Key?' to request a new one.",
      });
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

    res.json({
      message: "Password has been reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("[AUTH] resetPassword error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password." });
  }
};
