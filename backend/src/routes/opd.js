import { Router } from "express";
import { getAvailableSlots, setSlots } from "../controllers/opdController.js";
import { cmsAuth } from "../middleware/auth.js";

const router = Router();

router.get("/slots", getAvailableSlots); // Public: patients check availability
router.post("/slots", cmsAuth, setSlots); // Admin only: set slot availability

export default router;
