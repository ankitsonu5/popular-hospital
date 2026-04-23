import { Router } from "express";
import {
  createCallbackRequest,
  getCallbackRequests,
  updateCallbackStatus,
  deleteCallbackRequest,
} from "../controllers/callbackController.js";
import { cmsAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createCallbackRequest);                        // Public: form submission
router.get("/", cmsAuth, getCallbackRequests);                  // Admin: list all
router.patch("/:id/status", cmsAuth, updateCallbackStatus);    // Admin: mark read/new
router.delete("/:id", cmsAuth, deleteCallbackRequest);         // Admin: delete

export default router;
