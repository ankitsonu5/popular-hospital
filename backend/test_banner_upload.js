/**
 * Diagnostic: test hero-banner upload endpoint directly against the local backend.
 *
 * Usage (run ON the production server, or locally while backend is running):
 *
 *   cd backend
 *   node test_banner_upload.js <admin_jwt_token>
 *
 * Where <admin_jwt_token> is the value of localStorage.getItem("admin_token")
 * copied from your browser after logging into /admin-dashboard.
 *
 * Exit codes:
 *   0 = upload succeeded (banner saved in DB)
 *   1 = upload failed; error printed for diagnosis
 *
 * This bypasses the admin UI so you can see the raw HTTP error from multer /
 * nginx / cloudflare / express without any frontend masking.
 */

import fs from "fs";
import path from "path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5100";
const TOKEN = process.argv[2];

if (!TOKEN) {
  console.error(
    "❌ Missing token. Usage: node test_banner_upload.js <admin_jwt_token>",
  );
  process.exit(1);
}

// Build a tiny 1x1 PNG on the fly so we don't depend on a file on disk
const TINY_PNG = Buffer.from(
  "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6300010000050001" +
    "0d0a2db40000000049454e44ae426082",
  "hex",
);

async function main() {
  const form = new FormData();
  form.append(
    "desktopMedia",
    new Blob([TINY_PNG], { type: "image/png" }),
    "diagnostic-desktop.png",
  );
  form.append(
    "mobileMedia",
    new Blob([TINY_PNG], { type: "image/png" }),
    "diagnostic-mobile.png",
  );
  form.append("type", "image");
  form.append("isActive", "false"); // don't show diagnostic banners publicly
  form.append("order", "999");

  const url = `${BACKEND_URL}/api/cms/hero-banners`;
  console.log("▶ POST", url);
  console.log("  file size: desktop+mobile =", TINY_PNG.length * 2, "bytes");

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: form,
    });
  } catch (e) {
    console.error("❌ Network/connection error:", e.message);
    process.exit(1);
  }

  const body = await res.text();
  console.log("◀ Status:", res.status);
  console.log("◀ Body:  ", body.slice(0, 500));

  if (res.ok) {
    console.log("\n✅ Upload endpoint works. Problem is probably:");
    console.log("   - file size limit (nginx/cloudflare) for LARGER files");
    console.log("   - frontend not showing real error (fixed in latest code)");
    console.log("\nTry uploading with a larger file to find the real limit:");
    console.log(
      "   BACKEND_URL=... SIZE_MB=10 node test_banner_upload.js <token>",
    );
    process.exit(0);
  } else {
    console.error("\n❌ Upload failed with HTTP", res.status);
    if (res.status === 401) console.error("   -> token expired or invalid");
    if (res.status === 413)
      console.error("   -> file too large (multer/nginx/CF limit)");
    if (res.status === 403) console.error("   -> cmsAuth middleware rejected");
    if (res.status >= 500)
      console.error("   -> backend crashed — check server logs");
    process.exit(1);
  }
}

main();
