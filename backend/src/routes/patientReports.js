import { Router } from "express";
import {
  searchPatientReports,
  serveReportFile,
  getPatientReports,
  createFileLink,
  createPatientReport,
  bulkCreatePatientReports,
  updatePatientReport,
  togglePatientReport,
  deletePatientReport,
  deleteOldPatientReports,
  uploadPatientReport,
} from "../controllers/patientReportController.js";
import { cmsAuth, superOrSubAdmin } from "../middleware/auth.js";

const router = Router();

// Public: patient lookup + files via short-lived signed links
router.post("/search", searchPatientReports);
router.get("/file/:token", serveReportFile);

// Admin (super_admin + sub_admin, incl. delete)
router.get("/", cmsAuth, superOrSubAdmin, getPatientReports);
router.post(
  "/bulk",
  cmsAuth,
  superOrSubAdmin,
  uploadPatientReport.array("files", 50),
  bulkCreatePatientReports,
);
router.post(
  "/",
  cmsAuth,
  superOrSubAdmin,
  uploadPatientReport.array("files", 10),
  createPatientReport,
);
router.post("/:id/files/:fileId/link", cmsAuth, superOrSubAdmin, createFileLink);
router.put(
  "/:id",
  cmsAuth,
  superOrSubAdmin,
  uploadPatientReport.array("files", 10),
  updatePatientReport,
);
router.patch("/:id/toggle", cmsAuth, superOrSubAdmin, togglePatientReport);
router.delete("/old", cmsAuth, superOrSubAdmin, deleteOldPatientReports);
router.delete("/:id", cmsAuth, superOrSubAdmin, deletePatientReport);

export default router;
