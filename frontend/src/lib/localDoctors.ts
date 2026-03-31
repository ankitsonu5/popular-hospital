/**
 * Local doctor details store.
 * Used as a fallback when the backend database does not have the full profile.
 * Add each department doctor here using their slug as the key.
 */

export interface LocalDoctorDetail {
  name: string;
  qualifications: string;
  designation: string;
  speciality: string;
  image?: string;
  bio?: string;
  experience?: string; // e.g. "10+ Years"
  pastHospitals?: string[];
  opdTimings?: {
    branch: string;
    schedule: {
      day: string;
      timing: string;
    }[];
  }[];
}

const OPD_DEFAULT = [
  { day: "Monday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Tuesday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Wednesday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Thursday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Friday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Saturday", timing: "9am-12pm & 4pm-8pm" },
  { day: "Sunday", timing: "-" },
];

export const localDoctors: Record<string, LocalDoctorDetail> = {
  /* ── CARDIOLOGY ── */
  "dr-manoj-sharma": {
    name: "Dr. Manoj Sharma",
    qualifications: "MBBS, MD- Physiology, PGDCC",
    designation: "Consultant",
    speciality: "Cardiology",
    image: "/images/departments_doctor/dr-Manoj-Sharma.jpg",
    bio: "Non Invasive Cardiologist having experience of many hospitals of repute like Medanta, Gurgaon. He has experties in 2D/3D Echo, Holter Monitoring, TMT etc",
    experience: "10+ Years",
    pastHospitals: [""],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },
  "dr-hari-krishan-srivastava": {
    name: "Dr. Hari Krishan Srivastava",
    qualifications: "DM - Cardiology",
    designation: "Consultant",
    speciality: "Cardiology",
    image: "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg",
    bio: "Specialist in Interventional Cardiology with extensive experience in complex cardiac procedures.",
    experience: "15+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── NEUROSURGERY ── */
  "dr-kamlesh-kumar-singh": {
    name: "Dr. Kamlesh Kumar Singh",
    qualifications:
      "MBBS (Gandhi Medical College, Bhopal), MS - General Surgery (Government Medical College, Patiala - 2016), MCh - Neurosurgery (Kasturba Medical College, Manipal - 2020)",
    designation: "Consultant",
    speciality: "Neurosurgery",
    image: "/images/departments_doctor/dr._kamlesh_kumar_Singh.jpg",
    bio: "Dr. Kamlesh Kumar Singh completed his MBBS from GMC Bhopal, MS GMC Patiala, MCh KMC Manipal.",
    experience: "1 Year",
    pastHospitals: ["Kadam Multi super speciality Hospital, Bhiwani"],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── GENERAL & LAPAROSCOPIC SURGERY ── */
  "dr-abhishek-kumar": {
    name: "Dr. Abhishek Kumar",
    qualifications: "M.B.B.S., MS - General Surgery, FIAGFS",
    designation: "Consultant",
    speciality: "General & Laparoscopic Surgery",
    image: "/images/departments_doctor/dr-abhishek-kumar.png",
    bio: "Consultant General & Laparoscopic Surgeon with expertise in advanced laparoscopic procedures, hernia repair, laser proctology, and trauma care. Committed to evidence-based surgical practices for the best patient outcomes.",
    experience: "10+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── PEDIATRIC SURGERY ── */
  "dr-pediatric-surgeon": {
    name: "Dr. Pediatric Surgeon",
    qualifications: "MS, MCh (Pediatric Surgery)",
    designation: "Sr. Consultant",
    speciality: "Pediatric Surgery",
    image: "/images/departments-images/dr-pediatric-surgeon.png",
    bio: "Specialist in pediatric surgical care with expertise in neonatal surgery, minimally invasive laparoscopic procedures for children, and complex congenital defect corrections.",
    experience: "12+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── UROLOGY ── */
  "dr-dinesh-singh": {
    name: "Dr. Dinesh Singh",
    qualifications: "M.B.B.S, MS, MCh",
    designation: "Sr. Consultant",
    speciality: "Urology",
    image: "/images/departments_doctor/dr-dinesh-singh.png",
    bio: "Sr. Consultant Urologist with expertise in laser kidney stone treatment, PCNL, endo-urology, laparoscopic urology, female urology, and male infertility (andrology). Pioneer in minimally invasive urological procedures in the region.",
    experience: "15+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── ONCOLOGY ── */
  "dr-oncologist": {
    name: "Dr. Oncologist",
    qualifications: "MBBS, MD, DM (Oncology)",
    designation: "Consultant Oncologist",
    speciality: "Oncology",
    image: "/images/departments-images/dr-oncologist.png",
    bio: "Dedicated cancer specialist with expertise in Medical, Surgical, and Radiation Oncology. Part of a multidisciplinary tumor board delivering personalized cancer treatment plans.",
    experience: "12+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── NEPHROLOGY ── */
  "dr-nephrology-specialist": {
    name: "Dr. Nephrologist",
    qualifications: "MBBS, MD, DM (Nephrology)",
    designation: "Consultant Nephrologist",
    speciality: "Nephrology",
    image: "/images/departments-images/dr-nephrology.png",
    bio: "Specialist in Nephrology with expertise in Hemodialysis, Peritoneal Dialysis, CRRT, and Kidney Transplant evaluation. Dedicated to improving quality of life for patients with kidney disease.",
    experience: "10+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── GASTROENTEROLOGY ── */
  "dr-rk-singh": {
    name: "Dr. R.K. Singh",
    qualifications: "M.B.B.S, MS (Gastro Surgery)",
    designation: "Consultant",
    speciality: "Gastroenterology",
    image: "/images/departments-images/dr-rk-singh-gastro.png",
    bio: "Dr. R.K. Singh is a highly experienced gastroenterologist specializing in interventional endoscopy, biliary tract procedures, and management of complex gastrointestinal conditions.",
    experience: "10+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── OBSTETRICS & GYNAECOLOGY ── */
  "dr-kiran-kaushik": {
    name: "Dr. Kiran Kaushik",
    qualifications:
      "MBBS (RIMCH Ranchi - 1991), MD - Obs & Gynae (IMS BHU Varanasi - 1996)",
    designation: "Managing Director & HOD",
    speciality: "Obstetrics & Gynaecology",
    image: "/images/departments_doctor/dr-kiran-kaushik.png",
    bio: "Founder and Head of Obstetrics and Gynaecology at Popular Hospital. Expert in maternal-fetal medicine, infertility management, and advanced gynaecological laparoscopy with over 25 years of clinical excellence.",
    experience: "25+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── CTVS ── */
  "dr-rahul-dev": {
    name: "Dr. Rahul Dev",
    qualifications: "MS, MCh (CTVS)",
    designation: "Senior Consultant",
    speciality: "Cardiothoracic & Vascular Surgery",
    image: "/images/departments-images/",
    bio: "Senior Cardiothoracic and Vascular Surgeon with expertise in complex cardiac bypass and valve procedures.",
    experience: "12+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },
  "dr-shalini-singh": {
    name: "Dr. Shalini Singh",
    qualifications: "MS, MCh (Thoracic Surgery)",
    designation: "Consultant",
    speciality: "Cardiothoracic & Vascular Surgery",
    image: "/images/departments-images/",
    bio: "Thoracic Surgery specialist with experience in minimally invasive lung and chest wall procedures.",
    experience: "8+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },
};
