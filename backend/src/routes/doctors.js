import { Router } from "express";
import {
  getAllDoctors,
  getAllSpecialities,
  getDoctorByIdOrSlug,
} from "../controllers/doctorController.js";

const router = Router();

router.get("/", getAllDoctors);
router.get("/specialities", getAllSpecialities);
router.get("/:idOrSlug", getDoctorByIdOrSlug);

export default router;
