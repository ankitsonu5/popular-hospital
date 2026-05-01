import jwt from "jsonwebtoken";
import securityConfig from "../config/security.js";
import AdminUser from "../models/AdminUser.js";

export const cmsAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid credentials" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, securityConfig.jwt.secret);
    req.user = decoded;

    // career_admin ke liye har request pe session + active status check
    if (decoded.role === "career_admin") {
      const admin = await AdminUser.findById(decoded.id).select("isActive sessionToken sessionExpires");
      if (!admin || admin.isActive === false) {
        return res.status(403).json({ error: "account_disabled" });
      }
      if (!admin.sessionToken || !admin.sessionExpires || admin.sessionExpires < new Date()) {
        return res.status(401).json({ error: "session_expired" });
      }
    }

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Only super_admin (or legacy "admin") can access — career_admin gets 403
export const superAdminOnly = (req, res, next) => {
  const role = req.user?.role;
  if (role !== "super_admin" && role !== "admin") {
    return res.status(403).json({ error: "Access denied. Super admin only." });
  }
  return next();
};
