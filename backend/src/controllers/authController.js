import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AdminUser from "../models/AdminUser.js";
import securityConfig from "../config/security.js";
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
      return res.status(403).json({ error: "Account is disabled. Contact the super admin." });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
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

// GET /api/cms/career-admin — super admin only
export const getCareerAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ role: "career_admin" }).select("-password_hash -resetPasswordToken -resetPasswordExpires");
    res.json(admin || null);
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PATCH /api/cms/career-admin/toggle — enable / disable career admin
export const toggleCareerAdmin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ role: "career_admin" });
    if (!admin) return res.status(404).json({ error: "No career admin found." });
    admin.isActive = !admin.isActive;
    await admin.save();
    res.json({ ok: true, isActive: admin.isActive });
  } catch (error) {
    res.status(500).json({ error: "An internal error occurred." });
  }
};

// PUT /api/cms/career-admin — create or update career admin credentials
export const upsertCareerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    const existing = await AdminUser.findOne({ role: "career_admin" });

    if (existing) {
      existing.email = email.toLowerCase().trim();
      if (name) existing.name = name;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        existing.password_hash = await bcrypt.hash(password, salt);
      }
      await existing.save();
      return res.json({ ok: true, email: existing.email });
    }

    if (!password) return res.status(400).json({ error: "Password is required for new career admin." });
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const newAdmin = await AdminUser.create({
      email: email.toLowerCase().trim(),
      password_hash,
      name: name || "Career Admin",
      role: "career_admin",
    });
    res.json({ ok: true, email: newAdmin.email });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: "This email is already in use." });
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
