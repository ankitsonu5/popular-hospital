import mongoose from "mongoose";
import Career from "./src/models/Career.js";
import dotenv from "dotenv";

dotenv.config();

const medicoOpenings = [
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Anaesthesiology",
    designation: "Consultant",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "2025-12-30",
    description:
      "<h3>Join as Consultant Anaesthesiologist</h3><p>We are looking for a highly skilled Consultant in Anaesthesiology to join our multi-specialty team.</p><ul><li>Ensure patient safety during surgical procedures</li><li>Post-operative care and pain management</li><li>Critical care support</li></ul>",
  },
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Endocrinology",
    designation: "Endocrinologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    description:
      "<h3>Endocrinologist Opportunity</h3><p>Manage endocrine disorders including diabetes, thyroid issues, and hormonal imbalances.</p>",
  },
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Cardiothoracic & Vascular Surgery (CTVS)",
    designation: "CTVS Surgeon (CTVS)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    description:
      "<h3>CTVS Surgeon Needed</h3><p>Lead the CTVS department in complex heart and lung surgeries.</p>",
  },
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Critical Care",
    designation: "Critical Care Medicine (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    description:
      "<h3>Critical Care Specialist</h3><p>Oversee intensive care unit operations and treat critically ill patients.</p>",
  },
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Gastrology",
    designation: "Gastroenterologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    description:
      "<h3>Gastroenterologist Role</h3><p>Specialist in digestive system disorders and endoscopic procedures.</p>",
  },
  {
    category: "Medico",
    postedOn: "25-11-2025",
    department: "Cardiology",
    designation: "Cardiologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    description:
      "<h3>Interventional Cardiologist</h3><p>Handle cardiac emergencies and specialized heart treatments.</p>",
  },
];

const nonMedicalOpenings = [
  {
    category: "Non-Medical",
    postedOn: "26-11-2025",
    department: "HR",
    designation: "HR Executive",
    location: "Varanasi",
    position: "1",
    lastDate: "2026-01-10",
    description:
      "<h3>HR Executive</h3><p>Manage recruitment, employee relations, and payroll processes.</p>",
  },
];

const adminOpenings = [
  {
    category: "Admin",
    postedOn: "26-11-2025",
    department: "Administration",
    designation: "Facility Manager",
    location: "Varanasi",
    position: "2",
    lastDate: "2026-01-15",
    description:
      "<h3>Facility Manager</h3><p>Ensure the hospital facility operates smoothly and maintains high standards of safety.</p>",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing careers
    await Career.deleteMany({});
    console.log("Cleared existing careers");

    const allOpenings = [
      ...medicoOpenings,
      ...nonMedicalOpenings,
      ...adminOpenings,
    ];
    await Career.insertMany(allOpenings);
    console.log("Seed data inserted successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
