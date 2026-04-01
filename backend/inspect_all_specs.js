import mongoose from "mongoose";
import Speciality from "./src/models/Speciality.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(uri);
  const specs = await Speciality.find({}, { name: 1, slug: 1 }).sort({
    name: 1,
  });
  fs.writeFileSync("all_specialities.json", JSON.stringify(specs, null, 2));
  console.log(`Saved ${specs.length} specialities to all_specialities.json`);
  process.exit();
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
