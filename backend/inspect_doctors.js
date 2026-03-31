import mongoose from "mongoose";
import Doctor from "./src/models/Doctor.js";
import Speciality from "./src/models/Speciality.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(uri);
  const docs = await Doctor.find(
    {},
    { name: 1, qualification: 1, speciality: 1 },
  );
  const broken = docs.map((d) => ({
    _id: d._id,
    name: d.name,
    qualification: d.qualification,
    specId: d.speciality,
  }));
  fs.writeFileSync("doctors_list.json", JSON.stringify(broken, null, 2));
  console.log(`Saved ${broken.length} doctors to doctors_list.json`);
  process.exit();
}
run().catch(console.error);
