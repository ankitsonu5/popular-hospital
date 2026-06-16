import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
const News = mongoose.model("News", new mongoose.Schema({}, { strict: false }));

const revertMap = {
  "happy-heart-day-at-affordable-prices":
    "/uploads/news/1776152221466-happy_heart_day.jpg",
  "mega-surgery-camp-at-affordable-prices":
    "/uploads/news/1776154760238-mega-surgery-camp-1 (1).jpg",
  "nabh-accreditation-under-5th-standard":
    "/uploads/news/1776154846385-nabh-accrediation-1 (1).jpg",
  "women-empowered-blood-donation-camp":
    "/uploads/news/1776155136786-woman-blood-donation-1.jpg",
  "knee-replacement-surgery-for-elderly-couple":
    "/uploads/news/1776155243763-knee-transplant-img.jpg",
  "popular-hospital-varanasi-diabetic-foot-clinic-":
    "/uploads/news/1776851722871-whatsapp-image-2026-04-22-at-2-46-35-pm-1.jpeg",
  "dr-a-k-kaushik-s-son-shines":
    "/uploads/news/1776154667252-son-shine (2).png",
  "-": "/uploads/news/1777720769165-whatsapp-image-2026-05-02-at-11-28-11-am.jpeg",
};

for (const [slug, oldImage] of Object.entries(revertMap)) {
  await News.updateOne({ slug }, { $set: { image: oldImage } });
  console.log(`Reverted ${slug} to ${oldImage}`);
}

await mongoose.disconnect();
console.log("Revert complete");
