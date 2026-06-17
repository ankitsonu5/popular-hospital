import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
const News = mongoose.model("News", new mongoose.Schema({}, { strict: false }));

await News.updateOne(
  { slug: "dr-a-k-kaushik-s-son-shines" },
  { $set: { image: "/uploads/news/1773661376822-son-shine (1).png" } },
);

await News.updateOne(
  { slug: "-" },
  { $set: { image: "/uploads/news/1773232149282-heart.png" } }, // fallback
);

await mongoose.disconnect();
console.log("Manual updates complete");
