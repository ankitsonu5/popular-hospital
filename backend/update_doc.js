import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(async () => {
    const Speciality = (await import('./src/models/Speciality.js')).default;
    const Doctor = (await import('./src/models/Doctor.js')).default;
    
    const spec = await Speciality.findOne({slug: 'pathology'});
    if (!spec) {
        console.log("Pathology speciality not found!");
        process.exit(1);
    }

    const piyush = await Doctor.findOne({ name: /Piyush Hari/i });
    if (piyush) {
        await Doctor.findByIdAndUpdate(piyush._id, {
            speciality: spec._id,
            image_url: '/images/departments_doctor/dr_piyush_hari.jpg',
            qualification: piyush.qualification || 'Pathologist'
        });
        console.log("Updated Dr Piyush Hari");
    } else {
        console.log("Dr Piyush Hari NOT FOUND");
    }

    const sachid = await Doctor.findOne({ name: /Sachidanand Sinha/i });
    if (sachid) {
        await Doctor.findByIdAndUpdate(sachid._id, {
            speciality: spec._id,
            image_url: '/images/departments_doctor/dr_sachidanand_sinha.jpg',
            qualification: sachid.qualification || 'Pathologist'
        });
        console.log("Updated Dr Sachidanand Sinha");
    } else {
        console.log("Dr Sachidanand Sinha NOT FOUND");
    }

    console.log("Done");
    process.exit(0);
}).catch(console.error);
