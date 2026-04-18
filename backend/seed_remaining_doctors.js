import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import Speciality from './src/models/Speciality.js';
import Doctor from './src/models/Doctor.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // ─── Pediatrics ───────────────────────────────────────────────
    let pediatrics = await Speciality.findOne({ slug: 'pediatrics-neonatology' });
    if (!pediatrics) {
      pediatrics = await Speciality.create({
        name: 'Pediatrics And Neonatology',
        slug: 'pediatrics-neonatology',
        department_display_name: 'Pediatrics & Neonatology'
      });
      console.log('Created Pediatrics speciality');
    } else {
      console.log('Pediatrics speciality already exists');
    }

    const pediatricsDoctors = [
      {
        name: 'Dr. Alok C. Bhardwaj',
        slug: 'dr-alok-c-bhardwaj',
        qualification: 'MBBS, MD (Pediatrics) IMS, BHU',
        image_url: '/images/departments_doctor/dr._alok_c_bhardwaj.jpg',
      },
      {
        name: 'Dr Prabhat Kumar',
        slug: 'dr-prabhat-kumar',
        qualification: 'MBBS, DCH, DNB (Pediatrics)',
        image_url: '/images/departments_doctor/dr_prabhat_kumar.png',
      },
    ];

    for (const doc of pediatricsDoctors) {
      const exists = await Doctor.findOne({ slug: doc.slug });
      if (!exists) {
        await Doctor.create({ ...doc, speciality: pediatrics._id, is_active: true });
        console.log(`Created ${doc.name}`);
      } else {
        await Doctor.updateOne({ _id: exists._id }, { qualification: doc.qualification, image_url: doc.image_url, speciality: pediatrics._id });
        console.log(`Updated ${doc.name}`);
      }
    }

    // ─── Pediatric Surgery ────────────────────────────────────────
    let pedSurgery = await Speciality.findOne({ slug: 'pediatric-surgery' });
    if (!pedSurgery) {
      pedSurgery = await Speciality.create({
        name: 'Pediatric Surgery',
        slug: 'pediatric-surgery',
        department_display_name: 'Pediatric Surgery'
      });
      console.log('Created Pediatric Surgery speciality');
    } else {
      console.log('Pediatric Surgery speciality already exists');
    }

    const greeshma = await Doctor.findOne({ slug: 'dr-greeshma-suresh' });
    if (!greeshma) {
      await Doctor.create({
        name: 'Dr Greeshma Suresh',
        slug: 'dr-greeshma-suresh',
        speciality: pedSurgery._id,
        qualification: 'MBBS, MS, MCh (Pediatric Surgery) IMS, BHU',
        image_url: '/images/departments_doctor/dr_greeshma.jpeg',
        is_active: true
      });
      console.log('Created Dr Greeshma');
    } else {
      await Doctor.updateOne({ _id: greeshma._id }, { qualification: 'MBBS, MS, MCh (Pediatric Surgery) IMS, BHU', image_url: '/images/departments_doctor/dr_greeshma.jpeg', speciality: pedSurgery._id });
      console.log('Updated Dr Greeshma');
    }

    console.log('\n✅ All done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
