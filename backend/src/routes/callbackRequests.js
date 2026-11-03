import { Router } from "express";
import {
  createCallbackRequest,
  getCallbackRequests,
  updateCallbackStatus,
  deleteCallbackRequest,
  sendEmailToSubscribers,
} from "../controllers/callbackController.js";
import { cmsAuth, superAdminOnly } from "../middleware/auth.js";

const router = Router();

router.post("/", createCallbackRequest); // Public: form submission
router.get("/", cmsAuth, getCallbackRequests); // Admin: list all
router.post("/send-email", cmsAuth, sendEmailToSubscribers); // Admin: send email to subscriber(s)
router.patch("/:id/status", cmsAuth, updateCallbackStatus); // Admin: mark read/new
router.delete("/:id", cmsAuth, superAdminOnly, deleteCallbackRequest); // Super Admin ONLY: delete

export default router;
