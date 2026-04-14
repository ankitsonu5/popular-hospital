import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend
dotenv.config({ path: path.join(__dirname, "../.env") });

// Import the model using the actual path
import HeroBanner from "../src/models/HeroBanner.js";

const frontendImagesPath = path.join(__dirname, "../../frontend/public/images/slide_images");
const backendUploadsPath = path.join(__dirname, "../uploads/banners");

const slidesToSeed = [
  {
    order: 0,
    desktopFileName: "slide_one.png",
    mobileFileName: "slide_one_mobile.png",
  },
  {
    order: 1,
    desktopFileName: "slide_three.png",
    mobileFileName: "slide_three_mobile.png",
  },
  {
    order: 2,
    desktopFileName: "slide_two.png",
    mobileFileName: "slide_two_mobile.png",
  },
];

async function runSeeder() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("MONGO_URI not found");
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Ensure uploads folder exists
    if (!fs.existsSync(backendUploadsPath)) {
      fs.mkdirSync(backendUploadsPath, { recursive: true });
    }

    // Clear existing banners
    await HeroBanner.deleteMany({});
    console.log("Cleared existing banners.");

    for (const slide of slidesToSeed) {
      const srcDesktop = path.join(frontendImagesPath, slide.desktopFileName);
      const destDesktop = path.join(backendUploadsPath, slide.desktopFileName);

      const srcMobile = path.join(frontendImagesPath, slide.mobileFileName);
      const destMobile = path.join(backendUploadsPath, slide.mobileFileName);

      // Copy files if they don't already exist in destination
      if (fs.existsSync(srcDesktop)) {
        fs.copyFileSync(srcDesktop, destDesktop);
      } else {
        console.warn(`Warning: Could not find ${srcDesktop}`);
      }
      
      if (fs.existsSync(srcMobile)) {
        fs.copyFileSync(srcMobile, destMobile);
      } else {
        console.warn(`Warning: Could not find ${srcMobile}`);
      }

      await HeroBanner.create({
        type: "image",
        isActive: true,
        order: slide.order,
        desktopMediaUrl: `/uploads/banners/${slide.desktopFileName}`,
        mobileMediaUrl: `/uploads/banners/${slide.mobileFileName}`,
      });
      console.log(`Created banner ${slide.order + 1}`);
    }

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
}

runSeeder();
