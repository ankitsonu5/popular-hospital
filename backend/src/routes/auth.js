import { Router } from "express";
import { loginAdmin, getMe, forgotPassword, resetPassword } from "../controllers/authController.js";
import { cmsAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", cmsAuth, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
