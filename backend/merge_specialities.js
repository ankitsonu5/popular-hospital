import mongoose from "mongoose";
import Doctor from "./src/models/Doctor.js";
import Speciality from "./src/models/Speciality.js";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to DB");

  // Mapping of source slug to target slug (merging)
  const mergeMap = {
    gynecology: "gynaecology",
    "general-physician": "general-medicine",
    // ... any others?
  };

  for (const [sourceSlug, targetSlug] of Object.entries(mergeMap)) {
    const source = await Speciality.findOne({ slug: sourceSlug });
    const target = await Speciality.findOne({ slug: targetSlug });

    if (source && target) {
      console.log(`Merging ${sourceSlug} -> ${targetSlug}`);

      // Update doctors
      const updated = await Doctor.updateMany(
        { speciality: source._id },
        { speciality: target._id },
      );
      console.log(`  Updated ${updated.modifiedCount} doctors`);

      // Delete source speciality
      await Speciality.findByIdAndDelete(source._id);
      console.log(`  Deleted speciality: ${sourceSlug}`);
    }
  }

  // Ensure "General Medicine" has the correct name if it was merged
  const genMed = await Speciality.findOne({ slug: "general-medicine" });
  if (genMed) {
    await Speciality.findByIdAndUpdate(genMed._id, {
      name: "General Medicine / Physician",
    });
  }

  console.log("\nDeduplication complete.");
  process.exit();
}

run().catch(console.error);
