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
  "dr-greeshma-suresh": {
    name: "Dr Greeshma Suresh",
    qualifications: "MBBS, MS, MCh (Pediatric Surgery) IMS, BHU",
    designation: "Consultant Pediatric Surgeon",
    speciality: "Pediatric Surgery",
    image: "/images/departments_doctor/dr_greeshma.jpeg",
    bio: "Expert in pediatric surgical procedures, specializing in neonatal and pediatric surgery with a focus on advanced surgical care for infants and children.",
    experience: "8+ Years",
    pastHospitals: ["IMS, BHU"],
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

  /* ── GENERAL MEDICINE ── */
  "dr-rajesh-kumar": {
    name: "Dr. Rajesh Kumar",
    qualifications: "MBBS, MD (Medicine)",
    designation: "Consultant",
    speciality: "General Medicine",
    bio: "Experienced General Physician with 15+ years of clinical practice. Specializes in diagnosis and management of acute and chronic medical conditions.",
    experience: "15+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── CARDIOLOGY ── */
  "dr-priya-sharma": {
    name: "Dr. Priya Sharma",
    qualifications: "MBBS, MD, DM (Cardiology)",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    bio: "Interventional Cardiologist with 12+ years of expertise in managing complex cardiac conditions, echocardiography, and preventive cardiology.",
    experience: "12+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── ORTHOPEDICS ── */
  "dr-amit-patel": {
    name: "Dr. Amit Patel",
    qualifications: "MBBS, MS (Orthopedics)",
    designation: "Consultant Orthopedic Surgeon",
    speciality: "Orthopedics",
    bio: "Orthopedic Surgeon with 10+ years of experience in joint replacement, sports injuries, spine surgery, and trauma care.",
    experience: "10+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── PEDIATRICS ── */
  "dr-sneha-reddy": {
    name: "Dr. Sneha Reddy",
    qualifications: "MBBS, DCH, MD (Pediatrics)",
    designation: "Consultant Pediatrician",
    speciality: "Pediatrics",
    bio: "Dedicated Pediatrician with 8+ years of experience in child healthcare, neonatal care, vaccination, and management of pediatric diseases.",
    experience: "8+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },

  /* ── DERMATOLOGY ── */
  "dr-vikram-singh": {
    name: "Dr. Vikram Singh",
    qualifications: "MBBS, MD (Dermatology)",
    designation: "Consultant Dermatologist",
    speciality: "Dermatology",
    bio: "Dermatologist with 14+ years of expertise in skin disorders, cosmetology, hair and nail diseases, and advanced dermatological procedures.",
    experience: "14+ Years",
    pastHospitals: [],
    opdTimings: [{ branch: "Varanasi", schedule: OPD_DEFAULT }],
  },
};
