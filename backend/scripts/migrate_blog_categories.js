import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../src/models/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function migrate() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration...");

    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs to check.`);

    let updatedCount = 0;

    for (const blog of blogs) {
      const oldCat = (blog.category || "").trim();
      if (!oldCat) continue;

      let newCat = oldCat;

      // 1. Remove non-Varanasi locations
      newCat = newCat.replace(/\bin India\b/gi, "")
                     .replace(/\bin Uttar Pradesh\b/gi, "")
                     .replace(/\bin Varanasi\b/gi, "")
                     .trim();

      // 2. Map to standardized names if they match keywords
      const lower = newCat.toLowerCase();
      
      if (lower.includes("cardiology")) newCat = "Best Cardiology Hospital";
      else if (lower.includes("ortho")) newCat = "Best Orthopedic Hospital";
      else if (lower.includes("neuro")) newCat = "Best Neurology Hospital";
      else if (lower.includes("gastro")) newCat = "Gastroenterology";
      else if (lower.includes("cancer")) newCat = "Best Cancer Specialist Hospital";
      else if (lower.includes("dental")) newCat = "Best Dental Hospital";
      else if (lower.includes("eye")) newCat = "Best Eye Specialist Hospital";
      else if (lower.includes("gynaecologist") || lower.includes("gynecologist")) newCat = "Best Gynaecologist";
      else if (lower.includes("heart")) newCat = "Best Heart Hospital";
      else if (lower.includes("joint replacement")) newCat = "Best Joint Replacement Hospital";
      else if (lower.includes("medicine doctor")) newCat = "Best Medicine Doctor";
      else if (lower.includes("microbiology")) newCat = "Best Microbiology Lab";
      else if (lower.includes("plastic surgery")) newCat = "Best Plastic Surgery Hospital";
      else if (lower.includes("urologist")) newCat = "Best Urologist Hospital";
      else if (lower.includes("ent")) newCat = "ENT Care";
      else if (lower.includes("pediatrics")) newCat = "Pediatrics";
      else if (lower.includes("emergency")) newCat = "Emergency Care";
      else if (lower.includes("blood bank")) newCat = "Blood Bank";
      else if (lower.includes("critical care") || lower.includes("icu")) newCat = "Critical Care & ICU";
      else if (lower.includes("endocrinology")) newCat = "Endocrinology Center";
      else if (lower.includes("nephrology")) newCat = "Nephrology Specialist Center";

      // 3. Append Varanasi suffix
      newCat = `${newCat} in Varanasi`;

      if (oldCat !== newCat) {
        blog.category = newCat;
        await blog.save();
        console.log(`Updated: "${oldCat}" -> "${newCat}"`);
        updatedCount++;
      }
    }

    console.log(`Migration complete. Updated ${updatedCount} blogs.`);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
