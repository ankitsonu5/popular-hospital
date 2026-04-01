import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Speciality from "./models/Speciality.js";

dotenv.config();
await connectDB();

const specialities = [
  { name: "Cardiology", slug: "cardiology" },
  { name: "Cardiothoracic & Vascular Surgery (CTVS)", slug: "ctvs" },
  { name: "Neurosurgery", slug: "neurosurgery" },
  { name: "Gastroenterology", slug: "gastroenterology" },
  { name: "Nephrology", slug: "nephrology" },
  { name: "Oncology", slug: "oncology" },
  { name: "Urology", slug: "urology" },
  { name: "Burns & Plastic Surgery", slug: "burns-plastic-surgery" },
  { name: "Interventional Radiology", slug: "interventional-radiology" },
  { name: "Pediatric Surgery", slug: "pediatric-surgery" },
  { name: "Laparoscopy & General Surgery", slug: "general-surgery" },
  { name: "Obstetrics & Gynaecology", slug: "gynaecology" },
  { name: "Pediatrics And Neonatology", slug: "pediatrics" },
  { name: "Orthopedics & Joint Replacement", slug: "orthopedics" },
  { name: "General Medicine / Physician", slug: "general-medicine" },
  { name: "General Physician", slug: "general-physician" },
  { name: "ENT", slug: "ent" },
  { name: "Gynecology", slug: "gynecology" },
  { name: "Neurology", slug: "neurology" },
  { name: "Dermatology", slug: "dermatology" },
  { name: "Laboratory Medicine", slug: "laboratory-medicine" },
  { name: "Dietetics & Nutrition", slug: "nutrition" },
  { name: "Ophthalmology", slug: "ophthalmology" },
  { name: "Dental", slug: "dental" },
  { name: "Respiratory Medicine", slug: "respiratory" },
  { name: "Pain Medicine", slug: "pain-management" },
  { name: "Psychiatry Department", slug: "psychiatry" },
  { name: "Physiotherapy", slug: "physiotherapy" },
  { name: "Radiology", slug: "radiology" },
  { name: "Pathology", slug: "pathology" },
];

console.log("Clearing existing departments...");
await Speciality.deleteMany({});

console.log("Seeding new departments...");
for (const s of specialities) {
  await Speciality.create(s);
}

const count = await Speciality.countDocuments();
console.log(`✅ Success! Seeded ${count} departments.`);

await mongoose.disconnect();
process.exit(0);
