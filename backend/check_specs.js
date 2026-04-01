import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Speciality from "./models/Speciality.js";

dotenv.config();
await connectDB();

const specs = await Speciality.find();
console.log("COUNT:", specs.length);
console.log("NAMES:", specs.map((s) => s.name).join(", "));

await mongoose.disconnect();
process.exit(0);
