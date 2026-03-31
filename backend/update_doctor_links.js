import mongoose from "mongoose";
import Doctor from "./src/models/Doctor.js";
import Speciality from "./src/models/Speciality.js";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

const mapping = [
  { keywords: [/cardiology/i], slug: "cardiology" },
  { keywords: [/neurosurgery/i], slug: "neurosurgery" },
  { keywords: [/orthopedics/i, /ortho/i], slug: "orthopedics" },
  { keywords: [/nephrology/i], slug: "nephrology" },
  { keywords: [/urology/i], slug: "urology" },
  { keywords: [/oncology/i], slug: "oncology" },
  {
    keywords: [/gastroenterology/i, /gastrosurgery/i],
    slug: "gastroenterology",
  },
  { keywords: [/plastic surgery/i], slug: "burns-plastic-surgery" },
  { keywords: [/general surgery/i, /laparoscopy/i], slug: "general-surgery" },
  {
    keywords: [/obgy/i, /gynaecology/i, /obstetrics/i, /dgoy/i],
    slug: "gynaecology",
  },
  { keywords: [/gynecology/i], slug: "gynecology" },
  {
    keywords: [/pediatrics/i, /neonatology/i, /pediatric/i],
    slug: "pediatrics",
  },
  {
    keywords: [/internal medicine/i, /physician/i, /medicine/i],
    slug: "general-medicine",
  },
  { keywords: [/anaesthesia/i, /pain/i], slug: "pain-management" },
  {
    keywords: [/radiology/i, /radiodiagnosis/i, /radiotherapy/i, /imaging/i],
    slug: "radiology",
  },
  {
    keywords: [/pathology/i, /microbiology/i, /laboratory/i],
    slug: "pathology",
  },
  { keywords: [/ent/i, /otorhinolaryngology/i], slug: "ent" },
  { keywords: [/dental/i, /bds/i], slug: "dental" },
  { keywords: [/psychiatry/i], slug: "psychiatry" },
  { keywords: [/physiotherapy/i, /mpt/i], slug: "physiotherapy" },
  { keywords: [/respiratory/i, /chest/i], slug: "respiratory" },
];

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to DB");

  const specialities = await Speciality.find();
  const specMap = {};
  specialities.forEach((s) => {
    specMap[s.slug] = s._id;
  });

  const doctors = await Doctor.find();
  let updatedCount = 0;

  for (const doc of doctors) {
    let matchedSlug = null;
    const q = doc.qualification || "";

    // Check if current speciality is broken
    const currentSpec = specialities.find(
      (s) => s._id.toString() === doc.speciality?.toString(),
    );

    if (!currentSpec) {
      console.log(
        `Doctor ${doc.name} has broken speciality ${doc.speciality}. Qualification: ${q}`,
      );

      for (const m of mapping) {
        if (m.keywords.some((k) => k.test(q))) {
          matchedSlug = m.slug;
          break;
        }
      }

      if (matchedSlug && specMap[matchedSlug]) {
        await Doctor.findByIdAndUpdate(doc._id, {
          speciality: specMap[matchedSlug],
        });
        console.log(`  -> Fixed! Linked to ${matchedSlug}`);
        updatedCount++;
      } else {
        console.log(`  -> Could not match qualification: ${q}`);
      }
    }
  }

  console.log(`\nDONE. Updated ${updatedCount} doctors.`);
  process.exit();
}

run().catch(console.error);
