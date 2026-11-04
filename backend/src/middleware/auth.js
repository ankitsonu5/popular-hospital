import jwt from "jsonwebtoken";
import securityConfig from "../config/security.js";
import AdminUser from "../models/AdminUser.js";
import { effectivePermissions, featureForUrl } from "../config/adminFeatures.js";

export const cmsAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid credentials" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, securityConfig.jwt.secret);
    req.user = decoded;

    // career_admin aur sub_admin ke liye har request pe session + active status check
    if (decoded.role === "career_admin" || decoded.role === "sub_admin") {
      const admin = await AdminUser.findById(decoded.id).select(
        "isActive activeSessions role permissions",
      );
      if (!admin || admin.isActive === false) {
        return res.status(403).json({ error: "account_disabled" });
      }
      const now = new Date();
      const sessionToken = decoded.sessionToken;
      const hasValid =
        Array.isArray(admin.activeSessions) &&
        admin.activeSessions.some(
          (s) => s.token === sessionToken && s.expires > now,
        );
      if (!hasValid) {
        return res.status(401).json({ error: "session_expired" });
      }

      // Feature permissions (granted by the super admin)
      const feature = featureForUrl(req.originalUrl);
      if (
        feature &&
        !effectivePermissions({ role: decoded.role, permissions: admin.permissions }).includes(feature)
      ) {
        return res.status(403).json({ error: "feature_not_permitted" });
      }
    }

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Only super_admin (or legacy "admin") can access
export const superAdminOnly = (req, res, next) => {
  const role = req.user?.role;
  if (role !== "super_admin" && role !== "admin") {
    return res.status(403).json({ error: "Access denied. Super admin only." });
  }
  return next();
};

// Super admin always; sub/career admins only for features granted to them
// (cmsAuth has already checked the grant for any feature-mapped URL).
export const superOrGrantedFeature = (req, res, next) => {
  const role = req.user?.role;
  if (role === "super_admin" || role === "admin") return next();
  if (
    (role === "sub_admin" || role === "career_admin") &&
    featureForUrl(req.originalUrl)
  ) {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Super admin only." });
};

// super_admin ya sub_admin — bookings access ke liye
// (career_admin only passes when the Bookings / Patient Reports feature is granted)
export const superOrSubAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (
    role !== "super_admin" &&
    role !== "admin" &&
    role !== "sub_admin" &&
    role !== "career_admin"
  ) {
    return res.status(403).json({ error: "Access denied." });
  }
  return next();
};
