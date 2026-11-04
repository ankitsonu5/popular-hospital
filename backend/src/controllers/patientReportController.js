import PatientReport from "../models/PatientReport.js";
import securityConfig from "../config/security.js";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKEND_ROOT = path.join(__dirname, "../../");

// Reports live OUTSIDE the public /uploads folder (never served statically).
const PRIVATE_REL = "private_uploads/patient-reports";
const PRIVATE_DIR = path.join(BACKEND_ROOT, PRIVATE_REL);
const LEGACY_DIR = path.join(BACKEND_ROOT, "uploads/patient-reports");

const ALLOWED_MIME = ["application/pdf", "image/jpeg", "image/png"];
const MIME_BY_EXT = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

// Reports older than this many days (since upload) are moved to the
// "Older than 45 days" section of the admin page, where they can be deleted.
export const OLD_AFTER_DAYS = 45;
const DAY_MS = 24 * 60 * 60 * 1000;
const oldCutoff = () => new Date(Date.now() - OLD_AFTER_DAYS * DAY_MS);

const PATIENT_LINK_TTL_MS = 10 * 60 * 1000;
const ADMIN_LINK_TTL_MS = 5 * 60 * 1000;

/* ───────────────────────── Upload (multer) ───────────────────────── */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(PRIVATE_DIR, { recursive: true });
    cb(null, PRIVATE_DIR);
  },
  filename: (req, file, cb) => {
    // Random, unguessable name
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `report-${crypto.randomBytes(16).toString("hex")}${ext}`);
  },
});

export const uploadPatientReport = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 50 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF, JPG or PNG files are allowed"));
  },
});

const removeDiskFile = (relPath) => {
  if (!relPath) return;
  try {
    const full = path.join(BACKEND_ROOT, relPath.replace(/^\/+/, ""));
    if (full.startsWith(BACKEND_ROOT) && fs.existsSync(full)) fs.unlinkSync(full);
  } catch (error) {
    console.error("Error deleting patient report file:", error.message);
  }
};

// Check the real file signature, not just the browser-supplied MIME type.
const looksLikeAllowedFile = (absPath) => {
  try {
    const fd = fs.openSync(absPath, "r");
    const buf = Buffer.alloc(8);
    fs.readSync(fd, buf, 0, 8, 0);
    fs.closeSync(fd);
    const hex = buf.toString("hex");
    return (
      buf.toString("latin1", 0, 4) === "%PDF" ||
      hex.startsWith("ffd8ff") ||
      hex.startsWith("89504e47")
    );
  } catch {
    return false;
  }
};

const toFileDoc = (f) => ({
  name: f.originalname,
  mime: f.mimetype,
  size: f.size,
  path: `${PRIVATE_REL}/${f.filename}`,
});

const discardUploads = (files = []) =>
  files.forEach((f) => removeDiskFile(`${PRIVATE_REL}/${f.filename}`));

/* ───────────────────────── Signed temporary links ───────────────────────── */

const secret = () => securityConfig.jwt.secret;

const signToken = (payload) => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
};

const verifyToken = (token) => {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return payload.e > Date.now() ? payload : null;
  } catch {
    return null;
  }
};

const makeToken = (reportId, fileId, { admin = false } = {}) =>
  signToken({
    r: String(reportId),
    f: String(fileId),
    a: admin ? 1 : 0,
    e: Date.now() + (admin ? ADMIN_LINK_TTL_MS : PATIENT_LINK_TTL_MS),
  });

/* ───────────────────────── Helpers ───────────────────────── */

const digits = (v) => String(v || "").replace(/\D/g, "");
const clean = (v, max = 200) => String(v || "").trim().substring(0, max);
const escapeRegex = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Older records stored one public file in file_url. Move those files into
// private storage and convert them to `files` (runs once, idempotent).
let migrated = false;
const ensureMigrated = async () => {
  if (migrated) return;
  try {
    const legacy = await PatientReport.find({
      file_url: { $ne: "" },
      "files.0": { $exists: false },
    });
    for (const r of legacy) {
      const base = path.basename(r.file_url);
      const from = path.join(LEGACY_DIR, base);
      if (!fs.existsSync(from)) continue;
      fs.mkdirSync(PRIVATE_DIR, { recursive: true });
      const to = path.join(PRIVATE_DIR, base);
      fs.renameSync(from, to);
      const ext = path.extname(base).toLowerCase();
      r.files = [
        {
          name: r.file_name || base,
          mime: MIME_BY_EXT[ext] || "application/octet-stream",
          size: fs.statSync(to).size,
          path: `${PRIVATE_REL}/${base}`,
        },
      ];
      r.file_url = "";
      await r.save();
    }
    migrated = true;
  } catch (error) {
    console.error("[PATIENT_REPORT] migration:", error.message);
  }
};

const adminShape = (r) => ({
  _id: r._id,
  patient_name: r.patient_name,
  mobile: r.mobile,
  bill_id: r.bill_id,
  reg_no: r.reg_no,
  report_title: r.report_title,
  report_date: r.report_date,
  isActive: r.isActive,
  createdAt: r.createdAt,
  ageDays: Math.floor((Date.now() - new Date(r.createdAt).getTime()) / DAY_MS),
  isOld: new Date(r.createdAt) < oldCutoff(),
  files: (r.files || []).map((f) => ({
    id: f._id,
    name: f.name,
    mime: f.mime,
    size: f.size,
  })),
});

const readFields = (body) => ({
  patient_name: clean(body.patient_name),
  mobile: digits(body.mobile).slice(-10),
  bill_id: clean(body.bill_id, 100),
  reg_no: clean(body.reg_no, 100),
  report_title: clean(body.report_title),
  report_date: body.report_date ? new Date(body.report_date) : undefined,
});

const validate = (f) => {
  if (!f.patient_name) return "Patient name is required.";
  if (f.mobile.length !== 10)
    return "A valid 10-digit mobile number is required.";
  if (!f.bill_id && !f.reg_no) return "Enter a Bill ID or a Registration No.";
  if (!f.report_title) return "Report title is required.";
  if (f.report_date && Number.isNaN(f.report_date.getTime()))
    return "Invalid report date.";
  return null;
};

const badFiles = (files = []) =>
  files.find((f) => !looksLikeAllowedFile(path.join(PRIVATE_DIR, f.filename)));

/* ───────────────────────── Public ───────────────────────── */

// Search throttle (per IP)
const attempts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_ATTEMPTS = 10;
const throttled = (ip) => {
  const now = Date.now();
  const list = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  attempts.set(ip, list);
  return list.length > MAX_ATTEMPTS;
};

// POST /api/patient-reports/search — needs ID AND registered mobile
export const searchPatientReports = async (req, res) => {
  try {
    if (throttled(req.ip)) {
      return res
        .status(429)
        .json({ error: "Too many attempts. Please try again in a minute." });
    }
    await ensureMigrated();

    const field = req.body.method === "reg" ? "reg_no" : "bill_id";
    const value = clean(req.body.value, 100);
    const mobile = digits(req.body.mobile).slice(-10);
    if (!value || mobile.length !== 10) {
      return res
        .status(400)
        .json({ error: "Enter your ID and 10-digit registered mobile number." });
    }

    const records = await PatientReport.find({
      [field]: new RegExp(`^${escapeRegex(value)}$`, "i"),
      isActive: true,
    }).sort({ report_date: -1 });

    res.json(
      records
        .filter((r) => digits(r.mobile).slice(-10) === mobile)
        .map((r) => ({
          id: r._id,
          patient_name: r.patient_name,
          report_title: r.report_title,
          report_date: r.report_date,
          files: r.files.map((f) => ({
            id: f._id,
            name: f.name,
            mime: f.mime,
            token: makeToken(r._id, f._id), // valid for 10 minutes
          })),
        })),
    );
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// GET /api/patient-reports/file/:token — streams a file for a valid signed link
export const serveReportFile = async (req, res) => {
  try {
    const payload = verifyToken(req.params.token);
    if (!payload) return res.status(403).send("This link has expired.");

    const record = await PatientReport.findById(payload.r);
    if (!record || (!payload.a && !record.isActive)) {
      return res.status(404).send("Not found.");
    }
    const file = record.files.id(payload.f);
    if (!file) return res.status(404).send("Not found.");

    const abs = path.join(BACKEND_ROOT, file.path);
    if (!abs.startsWith(BACKEND_ROOT) || !fs.existsSync(abs)) {
      return res.status(404).send("Not found.");
    }
    const safeName = String(file.name || "report").replace(/["\r\n]/g, "");
    res.setHeader("Content-Type", file.mime || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${safeName}"`);
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.sendFile(abs);
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).send("An error occurred.");
  }
};

/* ───────────────────────── Admin ───────────────────────── */

// GET /api/patient-reports?page=&limit=&q=&status=&from=&to=
export const getPatientReports = async (req, res) => {
  try {
    await ensureMigrated();
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const filter = {};

    const q = clean(req.query.q, 100);
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [
        { patient_name: rx },
        { mobile: rx },
        { bill_id: rx },
        { reg_no: rx },
        { report_title: rx },
      ];
    }
    if (req.query.status === "visible") filter.isActive = true;
    if (req.query.status === "hidden") filter.isActive = false;

    const range = {};
    if (req.query.from) {
      const d = new Date(req.query.from);
      if (!Number.isNaN(d.getTime())) range.$gte = d;
    }
    if (req.query.to) {
      const d = new Date(req.query.to);
      if (!Number.isNaN(d.getTime())) {
        d.setHours(23, 59, 59, 999);
        range.$lte = d;
      }
    }
    if (Object.keys(range).length) filter.report_date = range;

    // age=old -> uploaded more than 45 days ago; age=recent -> within 45 days
    const cutoff = oldCutoff();
    if (req.query.age === "old") filter.createdAt = { $lt: cutoff };
    if (req.query.age === "recent") filter.createdAt = { $gte: cutoff };

    const [oldTotal, recentTotal] = await Promise.all([
      PatientReport.countDocuments({ createdAt: { $lt: cutoff } }),
      PatientReport.countDocuments({ createdAt: { $gte: cutoff } }),
    ]);

    const [total, records] = await Promise.all([
      PatientReport.countDocuments(filter),
      PatientReport.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    res.json({
      items: records.map(adminShape),
      total,
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      stats: { old: oldTotal, recent: recentTotal, oldAfterDays: OLD_AFTER_DAYS },
    });
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// POST /api/patient-reports/:id/files/:fileId/link — admin opens a file
export const createFileLink = async (req, res) => {
  try {
    await ensureMigrated();
    const record = await PatientReport.findById(req.params.id);
    const file = record?.files.id(req.params.fileId);
    if (!file) return res.status(404).json({ error: "Not found." });
    res.json({ token: makeToken(record._id, file._id, { admin: true }) });
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// POST /api/patient-reports — one report with one or more files (field: files)
export const createPatientReport = async (req, res) => {
  const files = req.files || [];
  try {
    const fields = readFields(req.body);
    const err = validate(fields);
    if (err || files.length === 0 || badFiles(files)) {
      discardUploads(files);
      return res.status(400).json({
        error:
          err ||
          (files.length === 0
            ? "Please attach at least one report file."
            : "One of the files is not a valid PDF, JPG or PNG."),
      });
    }
    if (!fields.report_date) delete fields.report_date;
    const record = await PatientReport.create({
      ...fields,
      files: files.map(toFileDoc),
    });
    res.status(201).json(adminShape(record));
  } catch (error) {
    discardUploads(files);
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// POST /api/patient-reports/bulk — many files, one record each.
// body: files[] + meta = JSON array aligned with the files:
//   [{ patient_name, mobile, bill_id, reg_no, report_title, report_date }]
export const bulkCreatePatientReports = async (req, res) => {
  const files = req.files || [];
  try {
    let meta;
    try {
      meta = JSON.parse(req.body.meta || "[]");
    } catch {
      meta = null;
    }
    if (!Array.isArray(meta) || files.length === 0 || meta.length !== files.length) {
      discardUploads(files);
      return res
        .status(400)
        .json({ error: "Please attach files and fill the details for each." });
    }

    const created = [];
    const failed = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fields = readFields(meta[i] || {});
      const err =
        validate(fields) ||
        (looksLikeAllowedFile(path.join(PRIVATE_DIR, file.filename))
          ? null
          : "Not a valid PDF, JPG or PNG file.");
      if (err) {
        removeDiskFile(`${PRIVATE_REL}/${file.filename}`);
        failed.push({ index: i, name: file.originalname, error: err });
        continue;
      }
      if (!fields.report_date) delete fields.report_date;
      try {
        const record = await PatientReport.create({
          ...fields,
          files: [toFileDoc(file)],
        });
        created.push(String(record._id));
      } catch (e) {
        removeDiskFile(`${PRIVATE_REL}/${file.filename}`);
        failed.push({ index: i, name: file.originalname, error: "Could not save." });
      }
    }
    res.status(created.length ? 201 : 400).json({
      created: created.length,
      failed,
    });
  } catch (error) {
    discardUploads(files);
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PUT /api/patient-reports/:id — edit details, add files (files), remove files (removeFileIds)
export const updatePatientReport = async (req, res) => {
  const files = req.files || [];
  try {
    await ensureMigrated();
    const record = await PatientReport.findById(req.params.id);
    if (!record) {
      discardUploads(files);
      return res.status(404).json({ error: "Not found." });
    }
    const fields = readFields(req.body);
    const err = validate(fields);
    if (err || badFiles(files)) {
      discardUploads(files);
      return res.status(400).json({
        error: err || "One of the files is not a valid PDF, JPG or PNG.",
      });
    }

    let removeIds = [];
    try {
      removeIds = JSON.parse(req.body.removeFileIds || "[]").map(String);
    } catch {
      removeIds = [];
    }
    const removing = record.files.filter((f) => removeIds.includes(String(f._id)));
    if (record.files.length - removing.length + files.length < 1) {
      discardUploads(files);
      return res
        .status(400)
        .json({ error: "A report needs at least one file." });
    }

    if (!fields.report_date) delete fields.report_date;
    Object.assign(record, fields);
    removing.forEach((f) => record.files.pull(f._id));
    files.forEach((f) => record.files.push(toFileDoc(f)));
    await record.save();
    removing.forEach((f) => removeDiskFile(f.path));
    res.json(adminShape(record));
  } catch (error) {
    discardUploads(files);
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// PATCH /api/patient-reports/:id/toggle
export const togglePatientReport = async (req, res) => {
  try {
    const record = await PatientReport.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found." });
    record.isActive = !record.isActive;
    await record.save();
    res.json(adminShape(record));
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// DELETE /api/patient-reports/:id — super admin and sub admin
export const deletePatientReport = async (req, res) => {
  try {
    const record = await PatientReport.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found." });
    record.files.forEach((f) => removeDiskFile(f.path));
    if (record.file_url) removeDiskFile(record.file_url);
    res.json({ success: true });
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};

// DELETE /api/patient-reports/old — delete EVERY report older than 45 days
// (the cutoff is calculated here, so recent reports can never be removed by it)
export const deleteOldPatientReports = async (req, res) => {
  try {
    const old = await PatientReport.find({ createdAt: { $lt: oldCutoff() } });
    for (const record of old) {
      record.files.forEach((f) => removeDiskFile(f.path));
      if (record.file_url) removeDiskFile(record.file_url);
    }
    const result = await PatientReport.deleteMany({
      _id: { $in: old.map((r) => r._id) },
    });
    res.json({ deleted: result.deletedCount || 0 });
  } catch (error) {
    console.error("[PATIENT_REPORT]", error.message);
    res.status(500).json({ error: "An error occurred." });
  }
};
