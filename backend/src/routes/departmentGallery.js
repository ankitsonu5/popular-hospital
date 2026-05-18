import { Router } from "express";
import { getActiveDepartmentGallery } from "../controllers/departmentGalleryController.js";

const router = Router();

router.get("/:departmentSlug", getActiveDepartmentGallery);

export default router;
