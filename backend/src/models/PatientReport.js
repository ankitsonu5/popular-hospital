import mongoose from "mongoose";

// One uploaded report document (PDF / image). Stored OUTSIDE the public
// /uploads folder and only served through short-lived signed links.
const reportFileSchema = new mongoose.Schema({
  name: { type: String, default: "report" },
  mime: { type: String, default: "application/pdf" },
  size: { type: Number, default: 0 },
  // path relative to the backend root, e.g. private_uploads/patient-reports/x.pdf
  path: { type: String, required: true },
});

const patientReportSchema = new mongoose.Schema(
  {
    patient_name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    bill_id: { type: String, default: "", trim: true },
    reg_no: { type: String, default: "", trim: true },
    report_title: { type: String, required: true, trim: true },
    report_date: { type: Date, default: Date.now },
    files: { type: [reportFileSchema], default: [] },
    // Legacy single-file fields (older records) — migrated into `files`
    file_url: { type: String, default: "" },
    file_name: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

patientReportSchema.index({ bill_id: 1 });
patientReportSchema.index({ reg_no: 1 });
patientReportSchema.index({ createdAt: -1 });

const PatientReport = mongoose.model("PatientReport", patientReportSchema);
export default PatientReport;
