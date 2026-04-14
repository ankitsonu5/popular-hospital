/**
 * One-time migration: rename existing upload files whose filenames contain
 * spaces, parentheses or other unsafe characters, and update the matching DB records.
 *
 * Run on the production server (where uploads/ lives and DB is reachable):
 *   cd backend
 *   node sanitize_upload_filenames.js
 *
 * Safe to re-run — it only touches files that still need sanitizing.
 */

import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import News from "./src/models/News.js";
import Blog from "./src/models/Blog.js";
import Branch from "./src/models/Branch.js";
import Doctor from "./src/models/Doctor.js";
import Event from "./src/models/Event.js";
import Coverage from "./src/models/Coverage.js";
import Update from "./src/models/Update.js";

const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/popular-hospital";

const UPLOADS_ROOT = path.resolve("uploads");

const sanitizeBase = (name) => {
  const ext = path.extname(name);
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${base || "file"}${ext.toLowerCase()}`;
};

const needsSanitize = (urlPath) => {
  if (!urlPath || typeof urlPath !== "string") return false;
  const file = path.basename(urlPath);
  // anything other than a-z 0-9 . _ - is unsafe
  return /[^a-zA-Z0-9._-]/.test(file);
};

const renameOnDisk = (oldRelUrl, newRelUrl) => {
  const oldAbs = path.join(UPLOADS_ROOT, oldRelUrl.replace(/^\/?uploads\//, ""));
  const newAbs = path.join(UPLOADS_ROOT, newRelUrl.replace(/^\/?uploads\//, ""));
  if (!fs.existsSync(oldAbs)) {
    console.warn(`  [skip] file missing on disk: ${oldAbs}`);
    return false;
  }
  // avoid clobbering an existing sanitized file
  let finalAbs = newAbs;
  let finalRel = newRelUrl;
  if (fs.existsSync(finalAbs)) {
    const ext = path.extname(newAbs);
    const stem = path.basename(newAbs, ext);
    finalAbs = path.join(path.dirname(newAbs), `${stem}-${Date.now()}${ext}`);
    finalRel = finalRel.replace(
      path.basename(newRelUrl),
      path.basename(finalAbs),
    );
  }
  fs.renameSync(oldAbs, finalAbs);
  console.log(`  renamed: ${path.basename(oldAbs)} -> ${path.basename(finalAbs)}`);
  return finalRel;
};

const fixSingleField = async (Model, label, fieldName) => {
  const docs = await Model.find({ [fieldName]: { $regex: /[ ()]/ } });
  console.log(`\n[${label}] ${fieldName}: ${docs.length} doc(s) need fix`);
  for (const doc of docs) {
    const oldUrl = doc[fieldName];
    if (!needsSanitize(oldUrl)) continue;
    const dir = path.dirname(oldUrl);
    const newFile = sanitizeBase(path.basename(oldUrl));
    const newUrl = `${dir}/${newFile}`;
    const resultUrl = renameOnDisk(oldUrl, newUrl);
    if (resultUrl) {
      doc[fieldName] = resultUrl;
      await doc.save();
      console.log(`  DB updated: ${doc._id} -> ${resultUrl}`);
    }
  }
};

(async () => {
  console.log("Connecting to Mongo:", MONGO_URI.replace(/\/\/.*@/, "//***@"));
  await mongoose.connect(MONGO_URI);

  try {
    await fixSingleField(News, "News", "image");
    await fixSingleField(Blog, "Blog", "image");
    await fixSingleField(Branch, "Branch", "image_one");
    await fixSingleField(Branch, "Branch", "image_two");
    await fixSingleField(Branch, "Branch", "image_three");
    await fixSingleField(Branch, "Branch", "image_four");
    await fixSingleField(Doctor, "Doctor", "image");
    await fixSingleField(Event, "Event", "image");
    await fixSingleField(Coverage, "Coverage", "image");
    await fixSingleField(Update, "Update", "pdfUrl");

    console.log("\n✅ Done.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await mongoose.disconnect();
  }
})();
