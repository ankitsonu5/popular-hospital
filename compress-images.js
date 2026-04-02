const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "frontend/public");
let totalSaved = 0;
let totalFiles = 0;

function getSize(filePath) {
  return fs.statSync(filePath).size;
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function findImages(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findImages(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const images = findImages(PUBLIC_DIR);
console.log(`Found ${images.length} images\n`);

for (const imgPath of images) {
  const ext = path.extname(imgPath).toLowerCase();
  const before = getSize(imgPath);
  const tmp = imgPath + ".tmp";

  try {
    if (ext === ".jpg" || ext === ".jpeg") {
      execSync(`convert "${imgPath}" -quality 82 -strip -interlace Plane "${tmp}"`, { stdio: "pipe" });
    } else if (ext === ".png") {
      execSync(`convert "${imgPath}" -strip -define png:compression-level=9 "${tmp}"`, { stdio: "pipe" });
    } else if (ext === ".webp") {
      execSync(`cwebp -q 82 -m 6 "${imgPath}" -o "${tmp}"`, { stdio: "pipe" });
    }

    if (fs.existsSync(tmp)) {
      const after = getSize(tmp);
      if (after < before) {
        fs.renameSync(tmp, imgPath);
        const saved = before - after;
        totalSaved += saved;
        totalFiles++;
        console.log(`✓ ${path.relative(PUBLIC_DIR, imgPath)} | ${formatMB(before)} → ${formatMB(after)} | saved ${formatMB(saved)}`);
      } else {
        fs.unlinkSync(tmp);
        console.log(`- ${path.relative(PUBLIC_DIR, imgPath)} | already optimized`);
      }
    }
  } catch (e) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    console.log(`✗ ${path.relative(PUBLIC_DIR, imgPath)} | error: ${e.message.slice(0, 60)}`);
  }
}

console.log(`\n=== Done ===`);
console.log(`Compressed: ${totalFiles} files`);
console.log(`Total saved: ${formatMB(totalSaved)}`);
