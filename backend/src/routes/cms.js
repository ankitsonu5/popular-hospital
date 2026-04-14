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
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  reorderDoctors,
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
import { cmsAuth } from "../middleware/auth.js";

const router = Router();

router.use(cmsAuth);

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
router.post("/specialities", createSpeciality);
router.put("/specialities/:id", updateSpeciality);
router.delete("/specialities/:id", deleteSpeciality);

// Designations CRUD
router.get("/designations", getAllDesignations);
router.post("/designations", createDesignation);
router.put("/designations/:id", updateDesignation);
router.delete("/designations/:id", deleteDesignation);

// Bookings (read-only for CMS)
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/read", markBookingRead);
router.patch("/bookings/:id/status", updateBookingStatus);
router.delete("/bookings/:id", deleteBooking);

// Site Content
router.get("/content", getSiteContent);
router.post("/content", setSiteContent);

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
router.post("/updates", uploadUpdates.single("pdf"), createUpdate);
router.put("/updates/:id", uploadUpdates.single("pdf"), updateUpdate);
router.delete("/updates/:id", deleteUpdate);

// Careers CRUD
router.get("/careers", getAdminCareers);
router.get("/careers/:id", getCareerById);
router.post("/careers", createCareer);
router.put("/careers/:id", updateCareer);
router.delete("/careers/:id", deleteCareer);

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

export default router;
