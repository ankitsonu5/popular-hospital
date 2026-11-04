// Admin panel features a super admin can grant to Sub Admins / Career Admins.
// Keep keys in sync with backend/src/config/adminFeatures.js.
// "Settings" is intentionally not listed — it is for super admins only.

export const ADMIN_FEATURES = [
  { key: "dashboard", label: "Dashboard" },
  { key: "doctors", label: "Doctors" },
  { key: "branches", label: "Branches" },
  { key: "updates", label: "Updates" },
  { key: "career-portal", label: "Career Portal" },
  { key: "bookings", label: "Bookings" },
  { key: "contacts", label: "Contacts" },
  { key: "call-backs", label: "Call Backs" },
  { key: "patient-reports", label: "Patient Reports" },
  { key: "second-opinions", label: "Second Opinion" },
  { key: "departments", label: "Departments" },
  { key: "manage-content", label: "Manage Content" },
  { key: "site-content", label: "Site Content" },
  { key: "nav-menu", label: "Nav Menu Manager" },
  { key: "page-content", label: "Page Content" },
  { key: "media-blog", label: "Media & Blog" },
  { key: "seo-settings", label: "SEO Settings" },
] as const;

export type AdminFeatureKey = (typeof ADMIN_FEATURES)[number]["key"];

// Sidebar label -> feature key (Settings has none: super admin only)
export const FEATURE_BY_SIDEBAR_LABEL: Record<string, AdminFeatureKey> =
  Object.fromEntries(
    ADMIN_FEATURES.map((f) => [f.label, f.key]),
  ) as Record<string, AdminFeatureKey>;

// Access each role had before permissions existed — used when none are saved.
export const DEFAULT_PERMISSIONS: Record<string, AdminFeatureKey[]> = {
  sub_admin: [
    "bookings",
    "contacts",
    "call-backs",
    "patient-reports",
    "second-opinions",
  ],
  career_admin: ["career-portal"],
};

export const permissionsForUser = (user: {
  role?: string;
  permissions?: string[];
}): string[] =>
  Array.isArray(user?.permissions)
    ? user.permissions
    : DEFAULT_PERMISSIONS[user?.role || ""] || [];
