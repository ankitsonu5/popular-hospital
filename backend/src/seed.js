import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const specialities = [
  { name: 'General Physician', slug: 'general-physician' },
  { name: 'Cardiology', slug: 'cardiology' },
  { name: 'Orthopedics', slug: 'orthopedics' },
  { name: 'Pediatrics', slug: 'pediatrics' },
  { name: 'Dermatology', slug: 'dermatology' },
  { name: 'ENT', slug: 'ent' },
  { name: 'Gynecology', slug: 'gynecology' },
  { name: 'Neurology', slug: 'neurology' },
];

const insertSpec = db.prepare('INSERT OR IGNORE INTO specialities (name, slug) VALUES (?, ?)');
specialities.forEach(s => insertSpec.run(s.name, s.slug));

const branches = [
  { name: 'Popular Hospital - Main', slug: 'main', address: '123 Health Avenue', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', phone: '022-12345678', email: 'main@popularhospital.com', description: 'Our flagship hospital with full facilities.' },
  { name: 'Popular Hospital - West', slug: 'west', address: '45 Care Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400058', phone: '022-87654321', email: 'west@popularhospital.com', description: 'West branch with OPD and diagnostics.' },
  { name: 'Popular Hospital - Delhi', slug: 'delhi', address: '78 Medical Complex', city: 'New Delhi', state: 'Delhi', pincode: '110001', phone: '011-23456789', email: 'delhi@popularhospital.com', description: 'NCR branch offering multi-speciality care.' },
];

const insertBranch = db.prepare(`
  INSERT OR IGNORE INTO branches (name, slug, address, city, state, pincode, phone, email, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
branches.forEach(b => insertBranch.run(b.name, b.slug, b.address, b.city, b.state, b.pincode, b.phone, b.email, b.description));

const specIds = db.prepare('SELECT id, slug FROM specialities').all();
const branchIds = db.prepare('SELECT id FROM branches ORDER BY id').all().map(r => r.id);

const doctors = [
  { name: 'Dr. Rajesh Kumar', slug: 'dr-rajesh-kumar', speciality: 'general-physician', qualification: 'MBBS, MD (Medicine)', experience: 15, fee: 500 },
  { name: 'Dr. Priya Sharma', slug: 'dr-priya-sharma', speciality: 'cardiology', qualification: 'MBBS, MD, DM (Cardiology)', experience: 12, fee: 800 },
  { name: 'Dr. Amit Patel', slug: 'dr-amit-patel', speciality: 'orthopedics', qualification: 'MBBS, MS (Orthopedics)', experience: 10, fee: 700 },
  { name: 'Dr. Sneha Reddy', slug: 'dr-sneha-reddy', speciality: 'pediatrics', qualification: 'MBBS, DCH, MD (Pediatrics)', experience: 8, fee: 600 },
  { name: 'Dr. Vikram Singh', slug: 'dr-vikram-singh', speciality: 'dermatology', qualification: 'MBBS, MD (Dermatology)', experience: 14, fee: 550 },
];

const insertDoctor = db.prepare(`
  INSERT OR IGNORE INTO doctors (name, slug, speciality_id, qualification, experience_years, consultation_fee, branch_ids) VALUES (?, ?, ?, ?, ?, ?, ?)
`);
doctors.forEach(d => {
  const spec = specIds.find(s => s.slug === d.speciality);
  if (spec) insertDoctor.run(d.name, d.slug, spec.id, d.qualification, d.experience, d.fee, branchIds.join(','));
});

const contentStmt = db.prepare('INSERT OR REPLACE INTO site_content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
[
  ['hero_title', 'Your Health, Our Priority'],
  ['hero_subtitle', 'Quality healthcare with compassion. Book appointments, find doctors, and visit our branches across the city.'],
  ['footer_phone', '1800-123-4567'],
  ['footer_email', 'info@popularhospital.com'],
].forEach(([k, v]) => contentStmt.run(k, v));

console.log('Seed completed: specialities, branches, doctors, site content.');
