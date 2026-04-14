import { Router } from "express";
import { getActiveBanners } from "../controllers/heroBannerController.js";

const router = Router();

// Public route to get active hero banners
router.get("/", getActiveBanners);

export default router;
