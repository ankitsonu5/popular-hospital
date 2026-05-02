/**
 * Migration: Sync all localDoctors entries to production MongoDB
 * Adds only the doctors missing from the DB (safe to re-run anytime)
 * Run: node src/migrate-all-local-doctors.js
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Doctor from "./models/Doctor.js";
import Speciality from "./models/Speciality.js";
import Branch from "./models/Branch.js";

dotenv.config();
await connectDB();

const allBranches = await Branch.find({}, "_id").lean();
const branchIds = allBranches.map((b) => b._id);

const OPD_DEFAULT = {
  monday: "9am-12pm & 4pm-8pm",
  tuesday: "9am-12pm & 4pm-8pm",
  wednesday: "9am-12pm & 4pm-8pm",
  thursday: "9am-12pm & 4pm-8pm",
  friday: "9am-12pm & 4pm-8pm",
  saturday: "9am-12pm & 4pm-8pm",
  sunday: "-",
};

const doctors = [
  {
    name: "Dr. Abhishek Kumar",
    slug: "dr-abhishek-kumar",
    specialitySlug: "general-surgery",
    qualification: "M.B.B.S., MS - General Surgery, FIAGFS",
    experience_years: 10,
    bio: "Consultant General & Laparoscopic Surgeon with expertise in advanced laparoscopic procedures, hernia repair, laser proctology, and trauma care. Committed to evidence-based surgical practices for the best patient outcomes.",
    image_url: "/images/departments_doctor/dr-abhishek-kumar.png",
  },
  {
    name: "Dr. Greeshma Suresh",
    slug: "dr-greeshma-suresh",
    specialitySlug: "pediatric-surgery",
    qualification: "MBBS, MS, MCh (Pediatric Surgery) IMS, BHU",
    experience_years: 8,
    bio: "Expert in pediatric surgical procedures, specializing in neonatal and pediatric surgery with a focus on advanced surgical care for infants and children.",
    image_url: "/images/departments_doctor/dr_greeshma.jpeg",
  },
  {
    name: "Dr. R.K. Singh",
    slug: "dr-rk-singh",
    specialitySlug: "gastroenterology",
    qualification: "M.B.B.S, MS (Gastro Surgery)",
    experience_years: 10,
    bio: "Highly experienced gastroenterologist specializing in interventional endoscopy, biliary tract procedures, and management of complex gastrointestinal conditions.",
    image_url: "/images/departments-images/dr-rk-singh-gastro.png",
  },
  {
    name: "Dr. Rahul Dev",
    slug: "dr-rahul-dev",
    specialitySlug: "ctvs",
    qualification: "MS, MCh (CTVS)",
    experience_years: 12,
    bio: "Senior Cardiothoracic and Vascular Surgeon with expertise in complex cardiac bypass and valve procedures.",
  },
  {
    name: "Dr. Shalini Singh",
    slug: "dr-shalini-singh",
    specialitySlug: "ctvs",
    qualification: "MS, MCh (Thoracic Surgery)",
    experience_years: 8,
    bio: "Thoracic Surgery specialist with experience in minimally invasive lung and chest wall procedures.",
  },
];

let added = 0;
let skipped = 0;
let alreadyExists = 0;

for (const d of doctors) {
  const existing = await Doctor.findOne({ slug: d.slug }).lean();
  if (existing) {
    console.log(`⏭  Already exists: ${d.name} (${d.slug})`);
    alreadyExists++;
    continue;
  }

  const speciality = await Speciality.findOne({
    slug: d.specialitySlug,
  }).lean();
  if (!speciality) {
    console.warn(
      `⚠️  Speciality not found: ${d.specialitySlug} — skipping ${d.name}`,
    );
    skipped++;
    continue;
  }

  await Doctor.create({
    name: d.name,
    slug: d.slug,
    speciality: speciality._id,
    qualification: d.qualification,
    experience_years: d.experience_years,
    bio: d.bio,
    image_url: d.image_url || null,
    branches: branchIds,
    is_active: true,
    opd_timings: OPD_DEFAULT,
  });

  console.log(`✅ Added: ${d.name} → ${d.specialitySlug}`);
  added++;
}

console.log(
  `\n📊 Done — ${added} added, ${alreadyExists} already existed, ${skipped} skipped`,
);
await mongoose.disconnect();
