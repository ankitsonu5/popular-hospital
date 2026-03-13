import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Branch from './models/Branch.js';
import Speciality from './models/Speciality.js';
import Doctor from './models/Doctor.js';
import SiteContent from './models/SiteContent.js';
import AdminUser from './models/AdminUser.js';
import News from './models/News.js';
import bcrypt from 'bcryptjs';

dotenv.config();
await connectDB();

// ──────────── Specialities (Departments/Categories) ────────────
const specialities = [
  // Super Specialties
  { name: 'Cardiology', slug: 'cardiology' },
  { name: 'Cardiothoracic & Vascular Surgery (CTVS)', slug: 'ctvs' },
  { name: 'Neurosurgery', slug: 'neurosurgery' },
  { name: 'Gastroenterology', slug: 'gastroenterology' },
  { name: 'Nephrology', slug: 'nephrology' },
  { name: 'Oncology', slug: 'oncology' },
  { name: 'Urology', slug: 'urology' },
  { name: 'Plastic & Reconstructive Surgery', slug: 'plastic-surgery' },
  { name: 'Interventional Radiology', slug: 'interventional-radiology' },
  { name: 'Pediatric Surgery', slug: 'pediatric-surgery' },

  // Specialties
  { name: 'Laparoscopy & General Surgery', slug: 'general-surgery' },
  { name: 'Obstetrics & Gynaecology', slug: 'gynaecology' },
  { name: 'Pediatrics And Neonatology', slug: 'pediatrics' },
  { name: 'Orthopedics & Joint Replacement', slug: 'orthopedics' },
  { name: 'General Medicine', slug: 'general-medicine' },
  { name: 'ENT', slug: 'ent' },
  { name: 'Laboratory Medicine', slug: 'laboratory-medicine' },
  { name: 'Dietetics & Nutrition', slug: 'nutrition' },
  { name: 'Ophthalmology', slug: 'ophthalmology' },
  { name: 'Dental', slug: 'dental' },
  { name: 'T.B & Respiratory Medicine', slug: 'respiratory-medicine' },
  { name: 'Anesthesiology, Critical Care & Pain Medicine', slug: 'anesthesiology' },
  { name: 'Psychiatry Department', slug: 'psychiatry' },
];

for (const s of specialities) {
  await Speciality.findOneAndUpdate({ slug: s.slug }, s, { upsert: true });
}
console.log(`✅ Seeded ${specialities.length} departments exactly as per image`);

// ──────────── Branches (all 5 locations) ────────────
// First delete old branches that no longer exist
await Branch.deleteMany({ slug: { $in: ['main', 'chetganj'] } });

const branches = [
  {
    name: 'Popular Hospital - Main Branch',
    slug: 'varanasi-main',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    order: 1,
    heading: 'Our Flagship Centre in Varanasi',
    title: 'Popular Hospital, Varanasi (Main Branch)',
    description: 'The main branch of Popular Hospital in Varanasi is equipped with state-of-the-art medical facilities, offering 24/7 emergency care, advanced diagnostics, surgical suites, and a full range of specialist departments. Located on B.L.W. Road, Kakarmatta, it serves as the primary hub for comprehensive healthcare in the region.',
    address: 'N-10 / 60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh, India',
    phone: '+91-7800001895',
    email: 'info@popularhospital.in',
    timings: 'Open 24 × 7 • OPD: 9 AM - 8 PM',
    image_one: '/images/branches/varanasi-main/1.webp',
    image_two: '/images/branches/varanasi-main/2.webp',
    image_three: '/images/branches/varanasi-main/3.webp',
    image_four: '/images/branches/varanasi-main/4.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5!2d82.9739!3d25.2677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e0f0f0f0f0f%3A0x0!2sPopular+Hospital+Kakarmatta!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.2677,82.9739&destination_place_id=popular+hospital+kakarmatta+varanasi',
  },
  {
    name: 'City Hospital – Sigra',
    slug: 'varanasi-city-centre',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    order: 5,
    heading: 'Advanced Care at Sigra, Varanasi',
    title: 'City Hospital, Sigra Branch',
    description: 'Situated in the heart of Varanasi at Chandrika Nagar Colony, Sigra, this branch provides outpatient consultations, advanced pathology services, ultrasound & X-ray diagnostics, and a modern pharmacy. Our experienced team of doctors ensures fast and compassionate care for every patient.',
    address: 'Chandrika Nagar Colony, Sigra, Varanasi, Uttar Pradesh, India',
    phone: '+91-7800001895',
    email: 'sigra@popularhospital.in',
    timings: 'Mon – Sat: 8 AM – 9 PM • Sun: 9 AM – 2 PM',
    image_one: '/images/branches/varanasi-sigra/1.webp',
    image_two: '/images/branches/varanasi-sigra/2.webp',
    image_three: '/images/branches/varanasi-sigra/3.webp',
    image_four: '/images/branches/varanasi-sigra/4.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5!2d82.9900!3d25.3100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCity+Hospital+Sigra+Varanasi!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.3100,82.9900&destination_place_id=city+hospital+sigra+varanasi',
  },
  {
    name: 'Popular Hospital – Mirzapur',
    slug: 'mirzapur',
    city: 'Mirzapur',
    state: 'Uttar Pradesh',
    order: 2,
    heading: 'Trusted Healthcare in Mirzapur',
    title: 'Popular Hospital, Mirzapur Branch',
    description: 'Bringing quality healthcare closer to Mirzapur, this branch features multi-speciality OPD, a 24-hour pharmacy, and modern ICU facilities. Located near Natwan Police Chowki on Jangi Road, the branch serves patients from surrounding towns and villages with the same high standards of care.',
    address: 'Near Natwan Police Chowki, Jangi Road, Mirzapur, Uttar Pradesh, India',
    phone: '+91-7800001895',
    email: 'mirzapur@popularhospital.in',
    timings: 'Open 24 × 7 • OPD: 9 AM – 7 PM',
    image_one: '/images/branches/mirzapur/1.webp',
    image_two: '/images/branches/mirzapur/2.webp',
    image_three: '/images/branches/mirzapur/3.webp',
    image_four: '/images/branches/mirzapur/4.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.0!2d82.5700!3d25.1500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Mirzapur!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.1500,82.5700&destination_place_id=popular+hospital+mirzapur',
  },
  {
    name: 'Popular Hospital – Gopiganj',
    slug: 'gopiganj',
    city: 'Gopiganj',
    state: 'Uttar Pradesh',
    order: 3,
    heading: 'Community Healthcare at Gopiganj',
    title: 'Popular Hospital, Gopiganj Branch',
    description: 'The Gopiganj branch serves as an essential healthcare hub, providing general medicine, paediatrics, gynaecology, and emergency stabilisation services. Located on G.T. Road near Indus Ind Bank, our dedicated team of resident doctors and nurses ensures the community receives timely medical attention.',
    address: 'G.T. Road, Parao, Near Indus Ind Bank, Gopiganj, Uttar Pradesh, India',
    phone: '+91-7800001895',
    email: 'gopiganj@popularhospital.in',
    timings: 'Mon – Sat: 8 AM – 8 PM • Emergencies 24/7',
    image_one: '/images/branches/gopiganj/1.webp',
    image_two: '/images/branches/gopiganj/2.webp',
    image_three: '/images/branches/gopiganj/3.webp',
    image_four: '/images/branches/gopiganj/4.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.0!2d82.5123!3d25.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Gopiganj!5e0!3m2!1sen!2sin!4v1700000000003!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.5123,82.5123&destination_place_id=popular+hospital+gopiganj',
  },
  {
    name: 'Popular Hospital – Bachhaon',
    slug: 'bachhaon',
    city: 'Bachhaon',
    state: 'Uttar Pradesh',
    order: 4,
    heading: 'Reliable Care at Bachhaon',
    title: 'Popular Hospital, Bachhaon Branch',
    description: 'Our branch in Bachhaon brings Popular Hospital\'s legacy of quality and compassion to the area. Located on Chunar Road, this branch is equipped with digital X-ray, pathology lab, and consultations across general medicine, orthopaedics, and ENT, ensuring residents can access specialist healthcare conveniently.',
    address: 'Chunar Road, Bachhaon, Varanasi, Uttar Pradesh, India',
    phone: '+91-7800001895',
    email: 'bachhaon@popularhospital.in',
    timings: 'Mon – Sat: 9 AM – 8 PM • Emergencies 24/7',
    image_one: '/images/branches/bachhaon/1.webp',
    image_two: '/images/branches/bachhaon/2.webp',
    image_three: '/images/branches/bachhaon/3.webp',
    image_four: '/images/branches/bachhaon/4.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d82.8500!3d25.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Bachhaon!5e0!3m2!1sen!2sin!4v1700000000004!5m2!1sen!2sin',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.3500,82.8500&destination_place_id=popular+hospital+bachhaon',
  },
];

const branchDocs = [];
for (const b of branches) {
  const doc = await Branch.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, new: true });
  branchDocs.push(doc);
}
console.log('✅ Branches seeded (5 locations)');

// ──────────── Doctors ────────────
const specDocs = await Speciality.find();
const specMap = {};
specDocs.forEach((s) => { specMap[s.slug] = s._id; });

const allBranchIds = branchDocs.map((b) => b._id);

const doctors = [
  { name: 'Dr. Rajesh Kumar', slug: 'dr-rajesh-kumar', speciality: 'general-physician', qualification: 'MBBS, MD (Medicine)', experience_years: 15, consultation_fee: 500 },
  { name: 'Dr. Priya Sharma', slug: 'dr-priya-sharma', speciality: 'cardiology', qualification: 'MBBS, MD, DM (Cardiology)', experience_years: 12, consultation_fee: 800 },
  { name: 'Dr. Amit Patel', slug: 'dr-amit-patel', speciality: 'orthopedics', qualification: 'MBBS, MS (Orthopedics)', experience_years: 10, consultation_fee: 700 },
  { name: 'Dr. Sneha Reddy', slug: 'dr-sneha-reddy', speciality: 'pediatrics', qualification: 'MBBS, DCH, MD (Pediatrics)', experience_years: 8, consultation_fee: 600 },
  { name: 'Dr. Vikram Singh', slug: 'dr-vikram-singh', speciality: 'dermatology', qualification: 'MBBS, MD (Dermatology)', experience_years: 14, consultation_fee: 550 },
  { name: 'Raveendra', slug: 'raveendra', speciality: 'dermatology', qualification: 'MBBS, MD (Dermatology)', experience_years: 14, consultation_fee: 550 },
];

for (const d of doctors) {
  await Doctor.findOneAndUpdate(
    { slug: d.slug },
    { ...d, speciality: specMap[d.speciality], branches: allBranchIds },
    { upsert: true }
  );
}
console.log('✅ Doctors seeded');

// ──────────── Site Content ────────────
const content = [
  { key: 'hero_title', value: 'Your Health, Our Priority' },
  { key: 'hero_subtitle', value: 'Quality healthcare with compassion. Book appointments, find doctors, and visit our branches across the city.' },
  { key: 'footer_phone', value: '+91-7800001895' },
  { key: 'footer_email', value: 'info@popularhospital.com' },
];

for (const c of content) {
  await SiteContent.findOneAndUpdate({ key: c.key }, c, { upsert: true });
}
console.log('✅ Site content seeded');

// ──────────── News ────────────
const newsArticles = [
  {
    slug: "best-medical-network-directory",
    title: "Best Medical Network Directory For Physicians & Clients",
    date: "February 10, 2026",
    excerpt: "Popular Hospital has always been at the forefront of building a comprehensive and accessible medical network that connects physicians, specialists, and patients across the region.",
    content: [
      "Popular Hospital has always been at the forefront of building a comprehensive and accessible medical network that connects physicians, specialists, and patients across the region. Our Medical Network Directory is designed to bridge the gap between healthcare providers and those in need of quality medical care.",
      "The directory serves as a one-stop resource for physicians looking to collaborate, refer patients, or find specialists within the Popular Hospital network. With detailed profiles of each department and specialist, the directory ensures that every patient receives the right care from the right doctor at the right time.",
      "Our network spans across multiple branches in Gopiganj, Bhadohi, Aurai, and Jangiganj, ensuring that quality healthcare is never far away. Each facility in our network is equipped with state-of-the-art medical equipment and staffed by highly trained medical professionals.",
      "The Medical Network Directory also facilitates seamless communication between departments, enabling faster consultations, second opinions, and coordinated treatment plans. This integrated approach has significantly improved patient outcomes and reduced treatment delays.",
      "For clients and patients, the directory provides easy access to information about available services, doctor schedules, and appointment booking. This transparency in healthcare delivery is a cornerstone of our commitment to patient-centric care at Popular Hospital.",
    ],
    image: "/news-1.png",
    author: "Dr. A.K. Kaushik",
    authorRole: "Chairman, Popular Group of Hospital"
  },
  {
    slug: "importance-of-regular-health-checkups",
    title: "The Importance of Regular Health Checkups",
    date: "February 8, 2026",
    excerpt: "Regular health checkups are one of the most important steps you can take to maintain your overall health and wellbeing.",
    content: [
      "Regular health checkups are one of the most important steps you can take to maintain your overall health and wellbeing. At Popular Hospital, we strongly advocate for preventive healthcare as the most effective way to detect potential health issues before they become serious problems.",
      "Hypertension, commonly known as high blood pressure, is a silent killer that can go unnoticed for years. Regular health checkups help in early detection and prevention of serious conditions including cardiovascular diseases, diabetes, and various forms of cancer.",
      "Our comprehensive health checkup packages are designed to provide a thorough assessment of your health status. These packages include blood tests, imaging studies, cardiac evaluations, and consultations with specialists who can provide personalized health recommendations.",
      "Studies have shown that people who undergo regular health checkups have significantly better health outcomes compared to those who only seek medical attention when symptoms appear. Early detection of conditions like diabetes, cholesterol imbalance, and thyroid disorders can lead to more effective and less invasive treatments.",
      "Popular Hospital offers a range of health checkup packages tailored for different age groups, genders, and risk factors. Our state-of-the-art diagnostic facilities ensure accurate results, while our experienced medical team provides comprehensive health guidance based on your individual health profile.",
    ],
    image: "/b-1.png",
    author: "Dr. Kiran Kaushik",
    authorRole: "MD, Popular Group of Hospital"
  },
  {
    slug: "managing-better-stress-for-better-mental-health",
    title: "Managing Better Stress for Better Mental Health",
    date: "February 5, 2026",
    excerpt: "In today's fast-paced world, stress has become an unavoidable part of life. However, chronic stress can have devastating effects on both physical and mental health.",
    content: [
      "In today's fast-paced world, stress has become an unavoidable part of life. However, chronic stress can have devastating effects on both physical and mental health. At Popular Hospital's Psychiatry Department, we are committed to helping patients develop effective strategies for managing stress and improving their mental wellbeing.",
      "Stress affects the body in numerous ways — it can lead to headaches, sleep disorders, digestive problems, weakened immunity, and even cardiovascular issues. Understanding the connection between stress and physical health is the first step toward better management.",
      "Our mental health team employs evidence-based approaches including cognitive behavioral therapy (CBT), mindfulness-based stress reduction, and relaxation techniques to help patients cope with stress. These methods have been proven effective in reducing anxiety, improving mood, and enhancing overall quality of life.",
      "We also emphasize the importance of lifestyle modifications in stress management. Regular exercise, balanced nutrition, adequate sleep, and maintaining social connections are all crucial factors in building resilience against stress.",
      "Popular Hospital's Psychiatry Department offers confidential counseling sessions, group therapy programs, and wellness workshops to support individuals and families dealing with stress and mental health challenges. We believe that seeking help is a sign of strength, not weakness.",
    ],
    image: "/b-2.png",
    author: "Dr. Priya Sharma",
    authorRole: "Head of Psychiatry, Popular Hospital"
  }
];

// Clear existing news and re-seed
await News.deleteMany({});
for (const n of newsArticles) {
  await News.create(n);
}
console.log('✅ News articles seeded (3 articles)');


// ──────────── Admin User ────────────
const adminEmail = 'admin@popularhospital.com';
const adminPassword = 'password123';
const hashed = await bcrypt.hash(adminPassword, 10);
await AdminUser.findOneAndUpdate(
  { email: adminEmail },
  { 
    email: adminEmail,
    name: 'Main Admin',
    password_hash: hashed
  },
  { upsert: true }
);
console.log('✅ Admin user seeded (admin@popularhospital.com / password123)');

console.log('\n🎉 Seed completed successfully!');
await mongoose.disconnect();
process.exit(0);
