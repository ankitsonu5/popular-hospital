import { Router } from "express";
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners,
  uploadBannerFiles,
} from "../controllers/heroBannerController.js";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  uploadBranch,
  reorderBranches,
} from "../controllers/branchController.js";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  uploadDoctor,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  reorderDoctors,
  uploadSpecialityBanner,
} from "../controllers/doctorController.js";
import {
  getAllBookings,
  markBookingRead,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import {
  getSiteContent,
  setSiteContent,
} from "../controllers/cmsController.js";
import {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getAdminNews,
  uploadNews,
} from "../controllers/newsController.js";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  replyToComment,
  deleteAdminReply,
  deleteComment,
  upload,
  uploadBlogImage,
} from "../controllers/blogController.js";
import {
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadEvent,
} from "../controllers/eventController.js";
import {
  getAdminCoverage,
  createCoverage,
  updateCoverage,
  deleteCoverage,
  uploadCoverage,
} from "../controllers/coverageController.js";
import {
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
  uploadUpdates,
  getUpdateById,
} from "../controllers/updateController.js";
import {
  getAdminCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  getCareerById,
} from "../controllers/careerController.js";
import {
  getAllPatientStories,
  createPatientStory,
  updatePatientStory,
  deletePatientStory,
  reorderPatientStories,
  uploadPatientStoryThumbnail,
} from "../controllers/patientStoryController.js";
import {
  getPopup,
  upsertPopup,
  deletePopup,
  uploadPopupImage,
} from "../controllers/popupController.js";
import {
  getAdminDepartmentGallery,
  createDepartmentGalleryItem,
  updateDepartmentGalleryItem,
  deleteDepartmentGalleryItem,
  reorderDepartmentGalleryItems,
  uploadDepartmentGallery,
} from "../controllers/departmentGalleryController.js";
import { cmsAuth, superAdminOnly, superOrSubAdmin } from "../middleware/auth.js";
import {
  getCareerAdmins,
  createCareerAdmin,
  updateCareerAdmin,
  toggleCareerAdmin,
  deleteCareerAdmin,
  careerAdminLogout,
  forceLogoutCareerAdmin,
  forceLogoutAllCareerAdmins,
  getSubAdmins,
  createSubAdmin,
  updateSubAdmin,
  toggleSubAdmin,
  deleteSubAdmin,
  forceLogoutSubAdmin,
  forceLogoutAllSubAdmins,
  subAdminLogout,
} from "../controllers/authController.js";

const router = Router();

router.use(cmsAuth);

// Career Admin — self logout (any authenticated career_admin)
router.post("/career-admin/logout", careerAdminLogout);

// Career Admin management (super admin only)
router.get("/career-admin", superAdminOnly, getCareerAdmins);
router.post("/career-admin", superAdminOnly, createCareerAdmin);
router.put("/career-admin/:id", superAdminOnly, updateCareerAdmin);
router.patch("/career-admin/:id/toggle", superAdminOnly, toggleCareerAdmin);
router.delete(
  "/career-admin/sessions/all",
  superAdminOnly,
  forceLogoutAllCareerAdmins,
);
router.delete(
  "/career-admin/:id/session",
  superAdminOnly,
  forceLogoutCareerAdmin,
);
router.delete("/career-admin/:id", superAdminOnly, deleteCareerAdmin);

// ── Careers CRUD — accessible by both super_admin AND career_admin ──
router.get("/careers", getAdminCareers);
router.get("/careers/:id", getCareerById);
router.post("/careers", createCareer);
router.put("/careers/:id", updateCareer);
router.delete("/careers/:id", deleteCareer);

// ── Sub-Admin self-logout ────────────────────────────────────────────
router.post("/sub-admin/logout", subAdminLogout);

// ── Sub-Admin management (super_admin only) ──────────────────────────
router.get("/sub-admin", superAdminOnly, getSubAdmins);
router.post("/sub-admin", superAdminOnly, createSubAdmin);
router.put("/sub-admin/:id", superAdminOnly, updateSubAdmin);
router.patch("/sub-admin/:id/toggle", superAdminOnly, toggleSubAdmin);
router.delete("/sub-admin/sessions/all", superAdminOnly, forceLogoutAllSubAdmins);
router.delete("/sub-admin/:id/session", superAdminOnly, forceLogoutSubAdmin);
router.delete("/sub-admin/:id", superAdminOnly, deleteSubAdmin);

// ── Bookings — super_admin aur sub_admin dono access kar sakte hain ──
router.get("/bookings", superOrSubAdmin, getAllBookings);
router.patch("/bookings/:id/read", superOrSubAdmin, markBookingRead);
router.patch("/bookings/:id/status", superOrSubAdmin, updateBookingStatus);
router.delete("/bookings/:id", superOrSubAdmin, deleteBooking);

// ── From here: super_admin only ─────────────────────────────────────
router.use(superAdminOnly);

// Branches CRUD
router.get("/branches", getAllBranches);
router.put("/branches/reorder", reorderBranches);
router.post(
  "/branches",
  uploadBranch.fields([
    { name: "image_one", maxCount: 1 },
    { name: "image_two", maxCount: 1 },
    { name: "image_three", maxCount: 1 },
    { name: "image_four", maxCount: 1 },
  ]),
  createBranch,
);
router.put(
  "/branches/:id",
  uploadBranch.fields([
    { name: "image_one", maxCount: 1 },
    { name: "image_two", maxCount: 1 },
    { name: "image_three", maxCount: 1 },
    { name: "image_four", maxCount: 1 },
  ]),
  updateBranch,
);
router.delete("/branches/:id", deleteBranch);

// Doctors CRUD
router.get("/doctors", getAllDoctors);
router.put("/doctors/reorder", reorderDoctors);
router.post("/doctors", uploadDoctor.single("image"), createDoctor);
router.put("/doctors/:id", uploadDoctor.single("image"), updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

// Specialities (Departments) CRUD
router.get("/specialities", getAllSpecialities);
router.post(
  "/specialities",
  uploadSpecialityBanner.single("banner_image"),
  createSpeciality,
);
router.put(
  "/specialities/:id",
  uploadSpecialityBanner.single("banner_image"),
  updateSpeciality,
);
router.delete("/specialities/:id", deleteSpeciality);

// Designations CRUD
router.get("/designations", getAllDesignations);
router.post("/designations", createDesignation);
router.put("/designations/:id", updateDesignation);
router.delete("/designations/:id", deleteDesignation);

// Site Content
router.get("/content", getSiteContent);
router.post("/content", setSiteContent);

// Department Gallery
router.get("/department-gallery", getAdminDepartmentGallery);
router.post(
  "/department-gallery",
  uploadDepartmentGallery.fields([
    { name: "media", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createDepartmentGalleryItem,
);
router.put("/department-gallery/reorder", reorderDepartmentGalleryItems);
router.put(
  "/department-gallery/:id",
  uploadDepartmentGallery.fields([
    { name: "media", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateDepartmentGalleryItem,
);
router.delete("/department-gallery/:id", deleteDepartmentGalleryItem);

// News CRUD
router.get("/news", getAdminNews);
router.post("/news", uploadNews.any(), createNews);
router.put("/news/:id", uploadNews.any(), updateNews);
router.delete("/news/:id", deleteNews);

// Blogs CRUD
router.get("/blogs", getAdminBlogs);
router.post(
  "/blogs/image-upload-direct",
  upload.single("file"),
  uploadBlogImage,
);
router.post("/blogs", upload.single("image"), createBlog);
router.put("/blogs/:id", upload.single("image"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

// Blog Comments Management
router.post("/blogs/:id/comments/:commentId/reply", replyToComment);
router.delete(
  "/blogs/:id/comments/:commentId/reply/:replyId",
  deleteAdminReply,
);
router.delete("/blogs/:id/comments/:commentId", deleteComment);

// Coverage CRUD
router.get("/coverage", getAdminCoverage);
router.post("/coverage", uploadCoverage.any(), createCoverage);
router.put("/coverage/:id", uploadCoverage.any(), updateCoverage);
router.delete("/coverage/:id", deleteCoverage);

// =====================
// Updates Routes
// =====================
router.get("/updates", getUpdates);
router.get("/updates/:id", getUpdateById);
router.post("/updates", uploadUpdates.any(), createUpdate);
router.put("/updates/:id", uploadUpdates.any(), updateUpdate);
router.delete("/updates/:id", deleteUpdate);

// Events CRUD
router.get("/events", getAdminEvents);
router.post("/events", uploadEvent.any(), createEvent);
router.put("/events/:id", uploadEvent.any(), updateEvent);
router.delete("/events/:id", deleteEvent);

// Hero Banners CRUD
router.get("/hero-banners", getAllBanners);
router.put("/hero-banners/reorder", reorderBanners);
router.post(
  "/hero-banners",
  uploadBannerFiles.fields([
    { name: "desktopMedia", maxCount: 1 },
    { name: "mobileMedia", maxCount: 1 },
  ]),
  createBanner,
);
router.put(
  "/hero-banners/:id",
  uploadBannerFiles.fields([
    { name: "desktopMedia", maxCount: 1 },
    { name: "mobileMedia", maxCount: 1 },
  ]),
  updateBanner,
);
router.delete("/hero-banners/:id", deleteBanner);

// Patient Stories CRUD
router.get("/patient-stories", getAllPatientStories);
router.put("/patient-stories/reorder", reorderPatientStories);
router.post(
  "/patient-stories",
  uploadPatientStoryThumbnail.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "homeThumbnail", maxCount: 1 },
  ]),
  createPatientStory,
);
router.put(
  "/patient-stories/:id",
  uploadPatientStoryThumbnail.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "homeThumbnail", maxCount: 1 },
  ]),
  updatePatientStory,
);
router.delete("/patient-stories/:id", deletePatientStory);

// Popup
router.get("/popup", getPopup);
router.put("/popup", uploadPopupImage.single("image"), upsertPopup);
router.delete("/popup", deletePopup);

export default router;
