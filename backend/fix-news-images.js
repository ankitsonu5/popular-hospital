// One-time migration: fix broken image paths in seeded news articles
// Run: node fix-news-images.js

import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);

const News = mongoose.model("News", new mongoose.Schema({}, { strict: false }));

const fixes = [
  { slug: "best-medical-network-directory",          image: "/images/latestnews/one.jpg" },
  { slug: "importance-of-regular-health-checkups",   image: "/images/latestnews/two.jpg" },
  { slug: "managing-better-stress-for-better-mental-health", image: "/images/latestnews/three.jpg" },
];

for (const { slug, image } of fixes) {
  const result = await News.updateOne({ slug }, { $set: { image } });
  console.log(`${slug}: ${result.modifiedCount ? "✅ fixed" : "⚠️  not found / no change"}`);
}

await mongoose.disconnect();
console.log("Done.");
