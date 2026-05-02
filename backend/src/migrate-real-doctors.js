/**
 * Migration: Add 5 real doctors to production MongoDB
 * Run: node --experimental-vm-modules src/migrate-real-doctors.js
 * OR:  node src/migrate-real-doctors.js  (if package.json has "type":"module")
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Doctor from "./models/Doctor.js";
import Speciality from "./models/Speciality.js";
import Branch from "./models/Branch.js";

dotenv.config();
await connectDB();

const doctors = [
  {
    name: "Dr. Rajesh Kumar",
    slug: "dr-rajesh-kumar",
    specialitySlug: "general-medicine",
    qualification: "MBBS, MD (Medicine)",
    experience_years: 15,
    consultation_fee: 500,
    bio: "Experienced General Physician with 15+ years of clinical practice. Specializes in diagnosis and management of acute and chronic medical conditions.",
  },
  {
    name: "Dr. Priya Sharma",
    slug: "dr-priya-sharma",
    specialitySlug: "cardiology",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience_years: 12,
    consultation_fee: 800,
    bio: "Interventional Cardiologist with 12+ years of expertise in managing complex cardiac conditions, echocardiography, and preventive cardiology.",
  },
  {
    name: "Dr. Amit Patel",
    slug: "dr-amit-patel",
    specialitySlug: "orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experience_years: 10,
    consultation_fee: 700,
    bio: "Orthopedic Surgeon with 10+ years of experience in joint replacement, sports injuries, spine surgery, and trauma care.",
  },
  {
    name: "Dr. Sneha Reddy",
    slug: "dr-sneha-reddy",
    specialitySlug: "pediatrics",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    experience_years: 8,
    consultation_fee: 600,
    bio: "Dedicated Pediatrician with 8+ years of experience in child healthcare, neonatal care, vaccination, and management of pediatric diseases.",
  },
  {
    name: "Dr. Vikram Singh",
    slug: "dr-vikram-singh",
    specialitySlug: "dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experience_years: 14,
    consultation_fee: 550,
    bio: "Dermatologist with 14+ years of expertise in skin disorders, cosmetology, hair and nail diseases, and advanced dermatological procedures.",
  },
];

// Get all branches (assign all branches to each doctor)
const allBranches = await Branch.find({}, "_id");
const branchIds = allBranches.map((b) => b._id);

let added = 0;
let skipped = 0;

for (const d of doctors) {
  const speciality = await Speciality.findOne({ slug: d.specialitySlug });
  if (!speciality) {
    console.warn(
      `⚠️  Speciality not found: ${d.specialitySlug} — skipping ${d.name}`,
    );
    skipped++;
    continue;
  }

  const result = await Doctor.findOneAndUpdate(
    { slug: d.slug },
    {
      $set: {
        name: d.name,
        slug: d.slug,
        speciality: speciality._id,
        qualification: d.qualification,
        experience_years: d.experience_years,
        consultation_fee: d.consultation_fee,
        bio: d.bio,
        branches: branchIds,
        is_active: true,
        opd_timings: {
          monday: "9am-12pm & 4pm-8pm",
          tuesday: "9am-12pm & 4pm-8pm",
          wednesday: "9am-12pm & 4pm-8pm",
          thursday: "9am-12pm & 4pm-8pm",
          friday: "9am-12pm & 4pm-8pm",
          saturday: "9am-12pm & 4pm-8pm",
          sunday: "-",
        },
      },
    },
    { upsert: true, new: true },
  );

  const action =
    result.createdAt?.getTime() === result.updatedAt?.getTime()
      ? "inserted"
      : "updated";
  console.log(`✅ ${action}: ${d.name} (${d.specialitySlug})`);
  added++;
}

console.log(`\n📊 Done — ${added} doctors added/updated, ${skipped} skipped`);
await mongoose.disconnect();
