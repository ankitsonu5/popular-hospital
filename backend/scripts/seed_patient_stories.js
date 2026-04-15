import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import PatientStory from "../src/models/PatientStory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const storiesToSeed = [
  {
    title: "Success Story: Cancer Care Journey",
    name: "Patient Story 1",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544257662-8e100808cf51?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-one.mp4",
  },
  {
    title: "A New Life: Recovery from Critical Condition",
    name: "Patient Story 2",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-two.mp4",
  },
  {
    title: "Advanced Medical Care Experience",
    name: "Patient Story 3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_one.mp4",
  },
  {
    title: "Excellence in Specialised Treatment",
    name: "Patient Story 4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_two.mp4",
  },
  {
    title: "Compassionate Care & Fast Recovery",
    name: "Patient Story 5",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_three.mp4",
  },
  {
    title: "Advanced Technology for Better Health",
    name: "Patient Story 6",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_four.mp4",
  },
  {
    title: "Transforming Lives Through Surgery",
    name: "Patient Story 7",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_five.mp4",
  },
  { name: "Patient Story 8", videoUrl: "https://youtu.be/u1bEdChi85k" },
  { name: "Patient Story 9", videoUrl: "https://youtu.be/XKOLgUQhQAc" },
  { name: "Patient Story 10", videoUrl: "https://youtu.be/P3o0GstAjOw" },
  { name: "Patient Story 11", videoUrl: "https://youtu.be/ns5Y_MiCk1g" },
  { name: "Patient Story 12", videoUrl: "https://youtu.be/CKELqiNRXlU" },
  { name: "Patient Story 13", videoUrl: "https://youtu.be/hQG0tT0oPwE" },
  { name: "Patient Story 14", videoUrl: "https://youtu.be/OQ--tSdAr44" },
  { name: "Patient Story 15", videoUrl: "https://youtu.be/_USYaLNBr0I" },
  { name: "Patient Story 16", videoUrl: "https://youtu.be/lWoTlBf-iWY" },
  { name: "Patient Story 17", videoUrl: "https://youtu.be/cA9QMYwRYvQ" },
  { name: "Patient Story 18", videoUrl: "https://youtu.be/lRSfBVFRRyU" },
  { name: "Patient Story 19", videoUrl: "https://youtu.be/JawHPyAW50U" },
  { name: "Patient Story 20", videoUrl: "https://youtu.be/eaaW5JgGkFM" },
  { name: "Patient Story 21", videoUrl: "https://youtu.be/_XYudCsc5zk" },
  { name: "Patient Story 22", videoUrl: "https://youtu.be/enhaFLhURq0" },
  { name: "Patient Story 23", videoUrl: "https://youtu.be/kM_fHur_wWM" },
  { name: "Patient Story 24", videoUrl: "https://youtu.be/5Q9q9Azr6dA" },
  { name: "Patient Story 25", videoUrl: "https://youtu.be/LiA2mdckn6U" },
  { name: "Patient Story 26", videoUrl: "https://youtu.be/-Yjto4oDNI0" },
  { name: "Patient Story 27", videoUrl: "https://youtu.be/rPYoLVXxvZM" },
  { name: "Patient Story 28", videoUrl: "https://youtu.be/dHcZfxm6ZEI" },
  { name: "Patient Story 29", videoUrl: "https://youtu.be/ykJorcbx6yA" },
  { name: "Patient Story 30", videoUrl: "https://youtu.be/xunfVSSJhXE" },
  { name: "Patient Story 31", videoUrl: "https://youtu.be/ICIDc8_pZFU" },
  { name: "Patient Story 32", videoUrl: "https://youtu.be/ttXWMDHxdXQ" },
].map((story, index) => ({
  title: story.title || "",
  name: story.name,
  videoUrl: story.videoUrl,
  thumbnailUrl: story.thumbnailUrl || "",
  order: index,
  isActive: true,
}));

async function runSeeder() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("MONGO_URI not found");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    await PatientStory.deleteMany({});
    await PatientStory.insertMany(storiesToSeed);

    console.log(`Seeded ${storiesToSeed.length} patient stories.`);
    process.exit(0);
  } catch (error) {
    console.error("Patient story seeding failed", error);
    process.exit(1);
  }
}

runSeeder();
