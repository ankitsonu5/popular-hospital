import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./src/models/Doctor.js";
import Designation from "./src/models/Designation.js";
import Speciality from "./src/models/Speciality.js";

dotenv.config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://hospitalpopular856_db_user:ieHgApCt4FLxrVyy@cluster0.9cjj9cd.mongodb.net/popular-hospital";

const doctorData = [
  {
    name: "Dr A.K Kaushik",
    qualification: "MBBS, MS (General Surgery)",
    designation: "Senior Consultant Surgeon",
    image_url: "/images/departments_doctor/dr_ak_kaushik.png",
  },
  {
    name: "Dr R.K Singh",
    qualification: "MBBS, MS (General Surgery)",
    designation: "Consultant Surgeon",
    image_url: "/images/departments_doctor/dr_rk_singh.png",
  },
  {
    name: "Dr Abhishek",
    qualification: "MBBS, MS (General Surgery)",
    designation: "Junior Consultant Surgeon",
    image_url: "/images/departments_doctor/dr_abhishek.jpg",
  },
  {
    name: "Dr Kiran Kaushik",
    qualification: "MBBS, DGO, MS (Obstetrics & Gynaecology)",
    designation: "Senior Consultant Gynaecologist",
    image_url: "/images/departments_doctor/dr_kiran_kaushik.png",
  },
  {
    name: "Dr Madhavi Paramar",
    qualification: "MBBS, MS (Obstetrics & Gynaecology)",
    designation: "Consultant Gynaecologist",
    image_url: "/images/departments_doctor/dr_madhavi_paramar.jpg",
  },
  {
    name: "Dr Priyanka Jaiswal",
    qualification: "MBBS, MS (Obstetrics & Gynaecology)",
    designation: "Consultant Gynaecologist",
    image_url: "/images/departments_doctor/dr_priyanka_jaiswal.jpg",
  },
  {
    name: "Dr Srishti Tanya",
    qualification: "MBBS, MS (Obstetrics & Gynaecology)",
    designation: "Consultant Gynaecologist",
    image_url: "/images/departments_doctor/dr_srishti_tanya.jpg",
  },
  {
    name: "Dr Alok C Bhardwajs",
    qualification: "MBBS, MD (Pediatrics)",
    designation: "Senior Consultant Pediatrician",
    image_url: "/images/departments_doctor/dr_alok_c_bhardwaj.png",
  },
  {
    name: "Dr Greeshma Suresh",
    qualification: "MBBS, MD (Pediatrics)",
    designation: "Consultant Pediatrician",
    image_url: "/images/departments_doctor/dr_greeshma_suresh.jpg",
  },
  {
    name: "Dr Prabhat Kumar",
    qualification: "MBBS, MD (Pediatrics)",
    designation: "Consultant Pediatrician",
    image_url: "/images/departments_doctor/dr_prabhat_kumar.jpg",
  },
  {
    name: "Dr Rajesh Kumar Singh",
    qualification: "MBBS, MD (Pediatrics)",
    designation: "Consultant Pediatrician",
    image_url: "/images/departments_doctor/dr_rajesh_kumar_singh.jpg",
  },
  {
    name: "Dr Md Akhtar Ali Ansari",
    qualification: "MBBS, MS (Orthopedics) AIIMS, New Delhi",
    designation:
      "Specialist in Joint Replacement, Arthroscopy, Spine Surgery & Trauma Care",
    image_url: "/images/departments_doctor/dr_ohd_akhtar_ali_ansari.jpg",
  },
  {
    name: "Dr Vinit Yadav",
    qualification: "MBBS, MS (Orthopedics) IMS, BHU",
    designation: "Consultant Orthopedic Surgeon",
    image_url: "/images/departments_doctor/dr_vinit_yadav.jpg",
  },
  {
    name: "Dr K.P Singh",
    qualification:
      "MBBS, MD, (Respiratory Medicine) Dip. Card MNCCP, MICS, MICAI, MIES, MERS",
    designation: "Senior Consultant Pulmonologist",
    image_url: "/images/departments_doctor/dr_k_p_singh.png",
  },
  {
    name: "Dr P.K Tiwari",
    qualification: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Senior Consultant Physician",
    image_url: "",
  },
  {
    name: "Dr Sandesh M Raykar",
    qualification: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Consultant Physician",
    image_url: "/images/departments_doctor/dr_sandesh_m_raykar.jpg",
  },
  {
    name: "Dr Shasank Shekhar Tripathi",
    qualification: "MBBS, MS, M.Ch (Urology)",
    designation: "Consultant Urologist",
    image_url: "/images/departments_doctor/dr_shasank_shekhar_tripathi.jpg",
  },
  {
    name: "Dr Dinesh Singh",
    qualification: "MBBS, MS (Surgery)",
    designation: "Consultant Surgeon",
    image_url: "/images/departments_doctor/dr_dinesh_singh.png",
  },
  {
    name: "Dr Piyush Saini",
    qualification: "MBBS, MS (Surgery)",
    designation: "Consultant Surgeon",
    image_url: "/images/departments_doctor/dr_piyush_saini.jpg",
  },
  {
    name: "Dr Neha Gupta",
    qualification: "MBBS, MD (Radiology)",
    designation: "Consultant Radiologist",
    image_url: "/images/departments_doctor/dr_neha_gupta.jpg",
  },
  {
    name: "Dr Rohan Kumar Singh",
    qualification: "MBBS, MD (Radiology)",
    designation: "Consultant Radiologist",
    image_url: "/images/departments_doctor/dr_rohan_kumar_singh.jpg",
  },
  {
    name: "Dr Omkareshwar Pratap Singh",
    qualification: "MBBS, MD (Radiology)",
    designation: "Consultant Radiologist",
    image_url: "/images/departments_doctor/dr_omkareshwar_pratap_singh.jpg",
  },
];

async function sync() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    for (const data of doctorData) {
      // 1. Find or create designation
      let designation = await Designation.findOne({ name: data.designation });
      if (!designation) {
        designation = await Designation.create({ name: data.designation });
        console.log(`Created designation: ${data.designation}`);
      }

      // 2. Find doctor by name (trimmed)
      const doctor = await Doctor.findOne({
        name: new RegExp(`^${data.name.trim()}$`, "i"),
      }).populate("speciality");

      if (doctor) {
        const updateFields = {
          qualification: data.qualification,
          designation: designation._id,
        };

        // Update image_url only if not already set or it's a default path
        if (!doctor.image_url || doctor.image_url.includes("placeholder")) {
          updateFields.image_url = data.image_url;
        } else if (data.image_url && !doctor.image_url.includes("/uploads/")) {
          // If it's a local path from our client components, use it
          updateFields.image_url = data.image_url;
        }

        // Add a default bio if missing
        if (!doctor.bio) {
          const specName = doctor.speciality
            ? doctor.speciality.name
            : "specialist";
          updateFields.bio = `${doctor.name} is a highly skilled ${data.designation} at Popular Hospital with extensive expertise in ${specName}. Dedicated to providing compassionate patient care and staying at the forefront of medical advancements.`;
        }

        // Add experience placeholders if missing
        if (!doctor.experience_years) {
          updateFields.experience_years = 10; // Default
        }

        await Doctor.findByIdAndUpdate(doctor._id, updateFields);
        console.log(`Updated details for: ${data.name}`);
      } else {
        console.warn(`Doctor not found in database: ${data.name}`);
      }
    }

    console.log("Sync completed successfully");
  } catch (error) {
    console.error("Error during sync:", error);
  } finally {
    await mongoose.disconnect();
  }
}

sync();
