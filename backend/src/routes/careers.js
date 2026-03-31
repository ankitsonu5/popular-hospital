import { Router } from "express";
import { getActiveCareers } from "../controllers/careerController.js";

const router = Router();

// Public route to fetch active job openings
router.get("/", getActiveCareers);

export default router;
