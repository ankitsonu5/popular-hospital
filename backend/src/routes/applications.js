import express from "express";
import {
  submitApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
  toggleRead,
  toggleStarred,
  upload,
} from "../controllers/applicationController.js";
import { cmsAuth } from "../middleware/auth.js";

const router = express.Router();

// Public: Submit job application
router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  submitApplication,
);

// Admin: Require auth for all read/manage routes
router.use(cmsAuth);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.patch("/:id/read", toggleRead);
router.patch("/:id/star", toggleStarred);
router.delete("/:id", deleteApplication);

export default router;
