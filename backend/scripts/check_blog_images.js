import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../src/models/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function check() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    console.log("Recent Blogs:");
    blogs.forEach(b => {
      console.log(`- Title: ${b.title}`);
      console.log(`  Image Path in DB: "${b.image}"`);
      console.log(`  CreatedAt: ${b.createdAt}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
