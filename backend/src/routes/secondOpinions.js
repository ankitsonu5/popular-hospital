import { Router } from "express";
import {
  createSecondOpinion,
  getSecondOpinions,
  updateSecondOpinionStatus,
  deleteSecondOpinion,
} from "../controllers/secondOpinionController.js";
import { cmsAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createSecondOpinion);                         // Public: form submission
router.get("/", cmsAuth, getSecondOpinions);                   // Admin: list all
router.patch("/:id/status", cmsAuth, updateSecondOpinionStatus); // Admin: mark read/new
router.delete("/:id", cmsAuth, deleteSecondOpinion);           // Admin: delete

export default router;

