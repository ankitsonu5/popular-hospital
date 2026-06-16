import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads", "news");

const mapping = [
  {
    expected: "1776152221466-happy_heart_day.jpg",
    local: "1776083397311-happy_heart_day.jpg",
  },
  {
    expected: "1776154760238-mega-surgery-camp-1 (1).jpg",
    local: "1773750043267-mega-surgery-2.jpg",
  },
  {
    expected: "1776154846385-nabh-accrediation-1 (1).jpg",
    local: "1773232412724-nabh-accrediation-1.jpg",
  },
  {
    expected: "1776155136786-woman-blood-donation-1.jpg",
    local: "1773750693327-woman-blood-donation-2.jpg",
  },
  {
    expected: "1776155243763-knee-transplant-img.jpg",
    local: "1773662527106-knee-transplant-img.jpg",
  },
  {
    expected: "1776851722871-whatsapp-image-2026-04-22-at-2-46-35-pm-1.jpeg",
    local: "1772259242582-popular-leader.webp",
  },
  {
    expected: "1776154667252-son-shine (2).png",
    local: "1773661376822-son-shine (1).png",
  },
  {
    expected: "1777720769165-whatsapp-image-2026-05-02-at-11-28-11-am.jpeg",
    local: "1773232149282-heart.png",
  },
];

for (const { expected, local } of mapping) {
  const localPath = path.join(uploadsDir, local);
  const expectedPath = path.join(uploadsDir, expected);

  if (fs.existsSync(localPath)) {
    fs.copyFileSync(localPath, expectedPath);
    console.log(`Copied ${local} -> ${expected}`);
  } else {
    console.log(`Local file not found: ${local}`);
  }
}

console.log("Done syncing local files to match DB!");
