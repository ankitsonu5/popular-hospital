// Admin panel features that can be granted to Sub Admins and Career Admins.
// Keep keys in sync with frontend/src/lib/adminFeatures.ts.
// "Settings" is intentionally not listed — it is for super admins only.

export const ADMIN_FEATURE_KEYS = [
  "dashboard",
  "doctors",
  "branches",
  "updates",
  "career-portal",
  "bookings",
  "contacts",
  "call-backs",
  "patient-reports",
  "second-opinions",
  "departments",
  "manage-content",
  "site-content",
  "nav-menu",
  "page-content",
  "media-blog",
  "seo-settings",
];

// What each role could use before permissions existed. Used whenever an admin
// has no saved permission list, so existing admins keep exactly their access.
export const DEFAULT_PERMISSIONS = {
  sub_admin: [
    "bookings",
    "contacts",
    "call-backs",
    "patient-reports",
    "second-opinions",
  ],
  career_admin: ["career-portal"],
};

export const effectivePermissions = (admin) => {
  if (!admin) return [];
  if (admin.role !== "sub_admin" && admin.role !== "career_admin") {
    return [...ADMIN_FEATURE_KEYS];
  }
  if (Array.isArray(admin.permissions)) {
    return admin.permissions.filter((k) => ADMIN_FEATURE_KEYS.includes(k));
  }
  return [...(DEFAULT_PERMISSIONS[admin.role] || [])];
};

export const sanitizePermissions = (value) =>
  Array.isArray(value)
    ? [...new Set(value.filter((k) => ADMIN_FEATURE_KEYS.includes(k)))]
    : undefined;

// API path prefix -> feature key. Endpoints not listed here are not
// feature-specific and keep their existing behaviour.
const ROUTE_FEATURES = [
  ["/api/cms/doctors", "doctors"],
  ["/api/cms/designations", "doctors"],
  ["/api/cms/branches", "branches"],
  ["/api/cms/updates", "updates"],
  ["/api/cms/careers", "career-portal"],
  ["/api/applications", "career-portal"],
  ["/api/cms/bookings", "bookings"],
  ["/api/bookings", "bookings"],
  ["/api/opd", "bookings"],
  ["/api/contacts", "contacts"],
  ["/api/callback-requests", "call-backs"],
  ["/api/patient-reports", "patient-reports"],
  ["/api/second-opinions", "second-opinions"],
  ["/api/cms/specialities", "departments"],
  ["/api/cms/hero-banners", "manage-content"],
  ["/api/cms/patient-stories", "manage-content"],
  ["/api/cms/department-gallery", "manage-content"],
  ["/api/cms/popup", "manage-content"],
  ["/api/cms/schemas", "manage-content"],
  ["/api/cms/content", "site-content"],
  ["/api/cms/nav-menus", "nav-menu"],
  ["/api/cms/page-content", "page-content"],
  ["/api/cms/blogs", "media-blog"],
  ["/api/cms/news", "media-blog"],
  ["/api/cms/events", "media-blog"],
  ["/api/cms/coverage", "media-blog"],
];

export const featureForUrl = (originalUrl = "") => {
  const path = originalUrl.split("?")[0].replace(/\/+$/, "");
  const hit = ROUTE_FEATURES.find(
    ([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
  );
  return hit ? hit[1] : null;
};
