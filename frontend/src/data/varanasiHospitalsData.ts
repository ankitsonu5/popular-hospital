export interface DoctorProfile {
  name: string;
  slug: string;
  designation: string;
  qualifications: string;
  image: string;
  bio?: string;
  experience?: string;
  opdTimings?: string;
  profileUrl: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  slug: string;
  category: "Super Speciality" | "Speciality";
  href: string;
  summary: string;
  badge: string;
  doctors: DoctorProfile[];
}

export interface HospitalProfile {
  id: string;
  number: number;
  name: string;
  shortName: string;
  category: string;
  location: string;
  area: string;
  address: string;
  established?: string;
  bedCapacity?: string;
  emergencyInfo: string;
  website: string;
  phone?: string;
  description: string;
  specialties: string[];
  keyHighlights: string[];
  image: string;
  alt: string;
  isPopularHospital?: boolean;
  directionsUrl: string;
  sourceReference: string;
  lastVerified: string;
}

export interface FacilityCard {
  title: string;
  category: string;
  desc: string;
  image: string;
  href: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 HOSPITALS DATA (Popular Hospital + 9 other candidates in Varanasi)
// ─────────────────────────────────────────────────────────────────────────────

export const HOSPITALS_LIST: HospitalProfile[] = [
  {
    id: "popular-hospital",
    number: 1,
    name: "Popular Hospital, Varanasi",
    shortName: "Popular Hospital",
    category: "Private Multi Super-Speciality Hospital",
    location: "Kakarmatta, BLW Road, Varanasi",
    area: "Kakarmatta / BLW",
    address: "N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi – 221004, Uttar Pradesh, India",
    established: "1992 (32+ Years of Clinical Legacy)",
    bedCapacity: "450+ Beds",
    emergencyInfo: "24/7 Emergency, Trauma Care & Cardiac ICU Support",
    website: "https://www.popularhospital.in/",
    phone: "+91-7800001895",
    description:
      "Popular Hospital is a premier multispeciality and super-speciality tertiary care institution situated on B.L.W. Road in Kakarmatta, Varanasi. With over three decades of clinical service, the hospital delivers structured specialist consultations, modular surgical suites, advanced interventional cardiology, neurosurgery, nephrology with continuous dialysis, oncology, laparoscopic procedures, and critical trauma care under one roof. It is supported by in-house pathology, 24/7 blood bank facilities, and comprehensive cashless insurance tie-ups.",
    specialties: [
      "Interventional Cardiology & CTVS",
      "Neurosurgery & Spine Surgery",
      "Gastroenterology & GI Surgery",
      "Nephrology & 24/7 Dialysis",
      "Laparoscopic Surgery & Gynaecology",
      "Orthopedics & Joint Replacement",
      "Burns & Plastic Surgery",
    ],
    keyHighlights: [
      "450+ hospital beds with modern ICU, CCU & NICU suites",
      "25+ clinical departments covering primary, secondary & super-specialty care",
      "Round-the-clock emergency, trauma, ambulance, pharmacy & blood bank",
      "Empanelled with leading insurance TPAs, Ayushman Bharat & corporate schemes",
    ],
    image: "/images/branches/varanasi-main/1.webp",
    alt: "Popular Hospital main campus building at Kakarmatta Varanasi",
    isPopularHospital: true,
    directionsUrl: "https://maps.google.com/?q=Popular+Hospital+Varanasi+Kakarmatta",
    sourceReference: "Popular Hospital Official Documentation & Institutional Registry (2026)",
    lastVerified: "October 2026",
  },
  {
    id: "sir-sunderlal-hospital-bhu",
    number: 2,
    name: "Sir Sunderlal Hospital (BHU)",
    shortName: "BHU Hospital",
    category: "Public / Government Teaching & Super-Speciality Hospital",
    location: "Banaras Hindu University Campus, Lanka, Varanasi",
    area: "Lanka / BHU",
    address: "Institute of Medical Sciences, Banaras Hindu University, Varanasi – 221005, Uttar Pradesh",
    established: "1926",
    bedCapacity: "1,500+ Beds",
    emergencyInfo: "24/7 Level-1 Trauma Centre & Central Emergency Services",
    website: "https://www.bhu.ac.in/ims/",
    description:
      "Sir Sunderlal Hospital, affiliated with the Institute of Medical Sciences at Banaras Hindu University (BHU), is the largest government tertiary healthcare and medical research institution in eastern Uttar Pradesh. It provides heavily subsidized outpatient, inpatient, and emergency treatments across a comprehensive array of medical, surgical, and super-speciality disciplines, alongside an integrated high-capacity Trauma Centre serving patients across Purvanchal, Bihar, and Jharkhand.",
    specialties: [
      "General Medicine & Surgery",
      "Cardiology & Cardiothoracic Surgery",
      "Neurology & Neurosurgery",
      "Oncology & Radiotherapy",
      "Nephrology & Urology",
      "Pediatrics & Neonatology",
    ],
    keyHighlights: [
      "Premier government teaching hospital with vast tertiary infrastructure",
      "Dedicated high-capacity Level-1 regional trauma facility",
      "Highly affordable consultation, diagnostics, and surgical charges",
      "Serves complex medical referrals from across North India",
    ],
    image: "/images/hospitals/bhu-hospital.jpg",
    alt: "Sir Sunderlal Hospital Banaras Hindu University campus building Varanasi",
    directionsUrl: "https://maps.google.com/?q=Sir+Sunderlal+Hospital+BHU+Varanasi",
    sourceReference: "Institute of Medical Sciences, BHU Official Portal (imsbhu.ac.in)",
    lastVerified: "October 2026",
  },
  {
    id: "heritage-hospital",
    number: 3,
    name: "Heritage Hospital",
    shortName: "Heritage Hospital",
    category: "Private Multi Super-Speciality Hospital",
    location: "Heritage Hospital Road, Near Lanka, Kabir Nagar, Varanasi",
    area: "Lanka / Kabir Nagar",
    address: "Lanka - BHU Road, Kabir Nagar, Varanasi – 221005, Uttar Pradesh",
    established: "1994",
    bedCapacity: "300+ Beds",
    emergencyInfo: "24/7 Critical Care, Trauma & Emergency Medical Services",
    website: "https://heritagehospitals.com/",
    description:
      "Heritage Hospital is an established private super-speciality healthcare facility located near Lanka in Varanasi. The hospital provides specialized care across interventional cardiology, joint replacement, neurological sciences, gastroenterology, and renal care. Equipped with modern intensive care units, computerized diagnostics, and modular surgical suites, it serves both local residents and regional referral patients seeking structured private medical care.",
    specialties: [
      "Cardiology & Cath Lab",
      "Orthopedics & Joint Replacement",
      "Neurosurgery & Neurology",
      "Gastroenterology",
      "Critical Care & Pulmonology",
    ],
    keyHighlights: [
      "Modern inpatient infrastructure with dedicated critical care beds",
      "Cath Lab and cardiac diagnostics setup",
      "Cashless hospitalization tie-ups with major TPAs and insurers",
      "Central location adjacent to the Lanka transit hub",
    ],
    image: "/images/hospitals/heritage-hospital.jpg",
    alt: "Heritage Hospital building facade in Lanka Varanasi",
    directionsUrl: "https://maps.google.com/?q=Heritage+Hospital+Lanka+Varanasi",
    sourceReference: "Heritage Hospitals Official Corporate Profile (heritagehospitals.com)",
    lastVerified: "October 2026",
  },
  {
    id: "apex-hospital",
    number: 4,
    name: "Apex Hospital",
    shortName: "Apex Hospital",
    category: "Private Super-Speciality Hospital & Research Centre",
    location: "DLW Hydel Road, Kakarmatta / Varanasi",
    area: "DLW Road / Kakarmatta",
    address: "DLW Hydel Road, Near Apex Circle, Varanasi – 221004, Uttar Pradesh",
    bedCapacity: "200+ Beds",
    emergencyInfo: "24/7 Emergency & Critical Care Department",
    website: "https://apexhospitalvaranasi.com/",
    description:
      "Apex Hospital is a multi-disciplinary super-speciality medical institution located along the DLW Hydel Road corridor in Varanasi. Known for its dedicated oncology department, the hospital provides medical, surgical, and radiation oncology treatments alongside nephrology, neurosciences, and cardiac care. It maintains fully equipped critical care units and modular operation theaters for advanced elective and emergency surgical procedures.",
    specialties: [
      "Oncology (Surgical, Medical & Radiation)",
      "Cardiology & Interventional Care",
      "Nephrology & Dialysis Unit",
      "Neurology & Spine Care",
      "Critical Care Medicine",
    ],
    keyHighlights: [
      "Focused comprehensive cancer care infrastructure",
      "In-house dialysis center and intensive therapy units",
      "Round-the-clock emergency response and ambulance fleet",
      "Diagnostic imaging including CT scan and ultrasound",
    ],
    image: "/images/hospitals/apex-hospital.jpg",
    alt: "Apex Hospital building facade in DLW Hydel Road Varanasi",
    directionsUrl: "https://maps.google.com/?q=Apex+Hospital+DLW+Hydel+Road+Varanasi",
    sourceReference: "Apex Hospital & Research Centre Official Site (apexhospitalvaranasi.com)",
    lastVerified: "October 2026",
  },
  {
    id: "arvachin-hospital",
    number: 5,
    name: "Arvachin Hospital",
    shortName: "Arvachin Hospital",
    category: "Private Multispeciality Hospital",
    location: "Amara Khaira Chak, Bypass NH2, Akhari, Varanasi",
    area: "Akhari / Bypass NH2",
    address: "Amara Khaira Chak, Bypass NH2, Akhari, Varanasi – 221011, Uttar Pradesh",
    bedCapacity: "100+ Beds",
    emergencyInfo: "24/7 Emergency Medical Response & Outpatient Services",
    website: "https://arvachinhospital.com/",
    phone: "+91-9695953111",
    description:
      "Arvachin Hospital is a modern multispeciality medical center situated on the NH2 Bypass near Akhari in Varanasi. The hospital provides diagnostic evaluations, general medicine, laparoscopic surgery, obstetrics and gynaecology, pediatric consultations, and trauma management. With proximity to the Varanasi highway corridor, it caters to surrounding urban and suburban communities requiring accessible inpatient and outpatient healthcare services.",
    specialties: [
      "General Medicine & Family Healthcare",
      "Laparoscopic & General Surgery",
      "Obstetrics & Gynaecological Care",
      "Pediatrics & Child Health",
      "Emergency & Trauma Response",
    ],
    keyHighlights: [
      "Convenient highway-adjacent location on NH2 Akhari Bypass",
      "Ayushman Bharat card acceptance & insurance TPA desk",
      "Diagnostic laboratory and outpatient consultation suites",
      "Flexible payment assistance and streamlined admission workflows",
    ],
    image: "/images/hospitals/arvachin-hospital.png",
    alt: "Arvachin Hospital building facade in Akhari Bypass Varanasi",
    directionsUrl: "https://maps.google.com/?q=Arvachin+Hospital+Akhari+Bypass+Varanasi",
    sourceReference: "Arvachin Hospital Public Healthcare Portal (arvachinhospital.com)",
    lastVerified: "October 2026",
  },
  {
    id: "shubham-hospital",
    number: 6,
    name: "Shubham Hospital",
    shortName: "Shubham Hospital",
    category: "Private Multispeciality Hospital",
    location: "S-8/108-F-5B, Khajuri, Maqbool Alam Road, Varanasi",
    area: "Maqbool Alam Road / Khajuri",
    address: "S-8/108-F-5B, Khajuri, Maqbool Alam Road, Varanasi – 221002, Uttar Pradesh",
    bedCapacity: "120+ Beds",
    emergencyInfo: "24/7 Casualty & Acute Medical Management",
    website: "https://shubhamhospital.com/",
    description:
      "Shubham Hospital is a private multispeciality hospital situated on Maqbool Alam Road in Varanasi. The facility provides general medical management, minimal access laparoscopic surgery, urological treatments, maternity care, and pediatric services. Serving central Varanasi residents, the institution emphasizes personalized doctor consultations, diagnostic support, and standardized surgical recovery care.",
    specialties: [
      "Minimal Access & General Surgery",
      "Urology & Stone Management",
      "Obstetrics & Maternity Services",
      "Orthopedics & Trauma Management",
      "Internal Medicine & Diagnostics",
    ],
    keyHighlights: [
      "Centrally located hospital serving central and northern Varanasi",
      "Dedicated operative theaters for laparoscopic procedures",
      "Comprehensive diagnostic imaging and clinical pathology",
      "Cashless hospitalization tie-ups for insured patients",
    ],
    image: "/images/hospitals/shubham-hospital.jpg",
    alt: "Shubham Hospital building facade on Maqbool Alam Road Varanasi",
    directionsUrl: "https://maps.google.com/?q=Shubham+Hospital+Khajuri+Varanasi",
    sourceReference: "Shubham Hospital Public Healthcare Listing & Institutional Directory",
    lastVerified: "October 2026",
  },
  {
    id: "cygnus-laxmi-hospital",
    number: 7,
    name: "Cygnus Laxmi Hospital",
    shortName: "Ujala Cygnus Laxmi",
    category: "Private Multispeciality Network Hospital",
    location: "Sigra - Maldahiya Road, Varanasi",
    area: "Sigra / Maldahiya",
    address: "Maldahiya - Sigra Road, Near Railway Crossing, Varanasi – 221010, Uttar Pradesh",
    bedCapacity: "100+ Beds",
    emergencyInfo: "24/7 Emergency, Trauma & Critical Care Unit",
    website: "https://ujalacygnus.com/",
    description:
      "Ujala Cygnus Laxmi Hospital (formerly known as Laxmi Hospital) operates under the Ujala Cygnus healthcare network, providing secondary and tertiary multispeciality healthcare in the Sigra-Maldahiya commercial belt of Varanasi. The facility supports clinical cardiology, orthopedics, trauma surgery, respiratory medicine, and critical care, focusing on affordable hospitalization, government scheme coverage, and streamlined emergency admissions.",
    specialties: [
      "Trauma & Emergency Medicine",
      "Critical Care & ICU Management",
      "Orthopedic Surgery & Fracture Care",
      "General Surgery & Laparoscopy",
      "Internal Medicine",
    ],
    keyHighlights: [
      "Part of the multi-city Ujala Cygnus healthcare network",
      "Well-equipped critical care units and trauma resuscitation bay",
      "Acceptance of government health cards including Ayushman PMJAY",
      "Prime location in the central Sigra-Maldahiya transit corridor",
    ],
    image: "/images/hospitals/cygnus-laxmi-hospital.jpg",
    alt: "Ujala Cygnus Laxmi Hospital building in Sigra Maldahiya Varanasi",
    directionsUrl: "https://maps.google.com/?q=Ujala+Cygnus+Laxmi+Hospital+Varanasi",
    sourceReference: "Ujala Cygnus Healthcare Network Directory (ujalacygnus.com)",
    lastVerified: "October 2026",
  },
  {
    id: "georgian-hospital",
    number: 8,
    name: "Georgian Hospital",
    shortName: "Georgian Hospital",
    category: "Private Multispeciality Hospital & Trauma Centre",
    location: "Pandeypur - Azamgarh Road, Varanasi",
    area: "Pandeypur",
    address: "Pandeypur, Near Premchand Nagar, Varanasi – 221002, Uttar Pradesh",
    bedCapacity: "80+ Beds",
    emergencyInfo: "24/7 Trauma Care & Emergency Casualty Department",
    website: "https://georgianhospital.com/",
    description:
      "Georgian Hospital & Research Centre is a multispeciality healthcare facility positioned on the Pandeypur-Azamgarh road in Varanasi. The hospital focuses on trauma and accident management, orthopedic fracture care, general surgical interventions, obstetrics, and acute internal medicine. It offers 24-hour emergency support for patients commuting from northern Varanasi and adjoining district highways.",
    specialties: [
      "Orthopedics, Joint Replacement & Trauma",
      "General & Minimal Access Surgery",
      "Obstetrics & Gynaecological Care",
      "Critical Care & Inpatient Nursing",
      "Diagnostic Laboratory & Pharmacy",
    ],
    keyHighlights: [
      "Dedicated focus on accident response and trauma resuscitation",
      "Modular surgical rooms for elective and emergency procedures",
      "Round-the-clock ambulance and pharmacy services",
      "Accessible location for patients from rural and suburban Varanasi",
    ],
    image: "/images/hospitals/georgian-hospital.webp",
    alt: "Georgian Hospital building facade in Pandeypur Varanasi",
    directionsUrl: "https://maps.google.com/?q=Georgian+Hospital+Pandeypur+Varanasi",
    sourceReference: "Georgian Hospital & Research Centre Official Public Records",
    lastVerified: "October 2026",
  },
  {
    id: "octavia-hospital",
    number: 9,
    name: "Octavia Hospital",
    shortName: "Octaviaa Hospital",
    category: "Private Multispeciality Hospital",
    location: "Airport Road, Harhua / Shivpur, Varanasi",
    area: "Harhua / Shivpur",
    address: "Babatpur Airport Road, Near Harhua, Varanasi – 221105, Uttar Pradesh",
    bedCapacity: "75+ Beds",
    emergencyInfo: "24/7 Emergency Casualty & Ambulance Services",
    website: "https://octaviaahospital.com/",
    description:
      "Octaviaa Multispeciality Hospital is a private healthcare setup situated along the Varanasi-Babatpur Airport Road near Harhua. The hospital offers primary and secondary medical care, including general surgery, internal medicine, pediatric checkups, maternity care, and round-the-clock emergency response. Its highway location provides prompt medical access to airport travelers and expanding residential areas of northwest Varanasi.",
    specialties: [
      "General Medicine & Health Checkups",
      "Laparoscopic & Minor Surgical Care",
      "Pediatrics & Child Care",
      "Orthopedics & Minor Trauma",
      "Casualty & Emergency Medical Care",
    ],
    keyHighlights: [
      "Strategic highway presence on Varanasi Airport Road",
      "Accessible emergency casualty room with on-call doctors",
      "In-house diagnostic tests and round-the-clock pharmacy",
      "Clean inpatient rooms with modern nursing support",
    ],
    image: "/images/hospitals/octavia-hospital.jpg",
    alt: "Octavia Hospital building facade on Airport Road Varanasi",
    directionsUrl: "https://maps.google.com/?q=Octaviaa+Multispeciality+Hospital+Harhua+Varanasi",
    sourceReference: "Octaviaa Hospital Official Public Profile & Health Directory",
    lastVerified: "October 2026",
  },
  {
    id: "peace-point-hospital",
    number: 10,
    name: "Peace Point Hospital",
    shortName: "Peace Point Hospital",
    category: "Private Multispeciality & Mother-Child Care Hospital",
    location: "Naria - Durgakund Road, Near Sankat Mochan, Varanasi",
    area: "Naria / Durgakund",
    address: "B-38/1-K, Near Sankat Mochan Mandir, Naria-Durgakund Road, Varanasi – 221005, Uttar Pradesh",
    bedCapacity: "90+ Beds",
    emergencyInfo: "24/7 Obstetric Emergency & Neonatal ICU Services",
    website: "https://peacepointhospital.com/",
    description:
      "Peace Point Hospital is a multispeciality healthcare facility in south Varanasi with a strong emphasis on maternal health, high-risk obstetrics, and advanced pediatric care. Equipped with a Level-III Neonatal Intensive Care Unit (NICU) and Pediatric ICU (PICU), the hospital caters to complex deliveries, premature infant management, pediatric surgery, and general medical conditions in an accessible residential location.",
    specialties: [
      "Obstetrics & High-Risk Pregnancy Care",
      "Neonatal Intensive Care (Level-III NICU)",
      "Pediatrics & Pediatric Critical Care (PICU)",
      "Infertility & Reproductive Medicine",
      "General Medicine & Adult Healthcare",
    ],
    keyHighlights: [
      "Advanced neonatal and pediatric intensive care infrastructure",
      "Comprehensive mother and child healthcare unit",
      "24/7 emergency delivery and obstetric surgical team",
      "Close proximity to Durgakund, BHU, and south Varanasi neighborhoods",
    ],
    image: "/images/hospitals/peace-point-hospital.jpg",
    alt: "Peace Point Hospital building facade in Naria Durgakund Varanasi",
    directionsUrl: "https://maps.google.com/?q=Peace+Point+Hospital+Naria+Varanasi",
    sourceReference: "Peace Point Hospital Public Directory & Institutional Profile",
    lastVerified: "October 2026",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ALL 25 POPULAR HOSPITAL DEPARTMENTS WITH REAL DOCTORS MAPPING
// ─────────────────────────────────────────────────────────────────────────────

export const POPULAR_HOSPITAL_DEPARTMENTS: DepartmentInfo[] = [
  // ── SUPER SPECIALTIES (11) ──
  {
    id: "cardiology",
    name: "Cardiology",
    slug: "cardiology",
    category: "Super Speciality",
    href: "/departments/cardiology",
    badge: "Super Speciality",
    summary:
      "Comprehensive cardiac care featuring advanced 2D/3D Echocardiography, TMT, Holter monitoring, interventional angiography, angioplasty, and 24/7 cardiac emergency stabilization.",
    doctors: [
      {
        name: "Dr. Manoj Sharma",
        slug: "dr-manoj-sharma",
        designation: "Consultant Non-Invasive Cardiologist",
        qualifications: "MBBS, MD (Physiology), PGDCC",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr-Manoj-Sharma.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 12:00 PM & 4:00 PM – 8:00 PM",
        bio: "Specialist in non-invasive clinical cardiology with extensive experience from premier institutions including Medanta Gurgaon. Expert in 2D/3D Echo, Holter monitoring, and cardiovascular risk evaluation.",
        profileUrl: "/doctors/dr-manoj-sharma",
      },
      {
        name: "Dr. Hari Krishan Srivastava",
        slug: "dr-hari-krishan-srivastava",
        designation: "Consultant Interventional Cardiologist",
        qualifications: "MBBS, MD, DM (Cardiology)",
        experience: "15+ Years",
        image: "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Senior Interventional Cardiologist with 15+ years of clinical excellence in complex coronary angioplasties, pacemaker implantations, and emergency cardiac interventions.",
        profileUrl: "/doctors/dr-hari-krishan-srivastava",
      },
      {
        name: "Dr. Tejas Mahajan",
        slug: "dr-tejas-mahajan",
        designation: "Consultant Cardiologist",
        qualifications: "MBBS, MD, DNB (Cardiology)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_tejas_mahajan.jpg.jpeg",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Cardiology specialist with focused expertise in clinical cardiology, stress echocardiography, heart failure management, and acute coronary syndrome care.",
        profileUrl: "/doctors/dr-tejas-mahajan",
      },
    ],
  },
  {
    id: "ctvs",
    name: "Cardiothoracic & Vascular Surgery (CTVS)",
    slug: "ctvs",
    category: "Super Speciality",
    href: "/departments/ctvs",
    badge: "Super Speciality",
    summary:
      "Advanced surgical care for complex heart, thoracic, and vascular conditions including coronary artery bypass (CABG), valve repairs, aortic procedures, and vascular reconstructive surgeries.",
    doctors: [
      {
        name: "Dr. Harendra Ojha",
        slug: "dr-harendra-ojha",
        designation: "Senior Consultant CTVS Surgeon",
        qualifications: "MBBS, MS, MCh (Cardiothoracic & Vascular Surgery)",
        experience: "12+ Years",
        image: "/images/departments_doctor/dr_harendra_ojha.jpg.jpeg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Accomplished cardiothoracic surgeon experienced in open-heart surgery, bypass procedures, congenital cardiac repairs, and peripheral vascular reconstructions.",
        profileUrl: "/doctors/dr-harendra-ojha",
      },
      {
        name: "Dr. Rahul Dev",
        slug: "dr-rahul-dev",
        designation: "Senior Consultant Cardiac Surgeon",
        qualifications: "MS, MCh (CTVS)",
        experience: "12+ Years",
        image: "/images/departments-images/cardiothoracic_vascular_surgery.jpeg",
        opdTimings: "Mon-Fri: By Appointment",
        bio: "Specialist in advanced adult cardiac surgery, valvular heart interventions, and thoracic surgical oncology.",
        profileUrl: "/doctors",
      },
    ],
  },
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    slug: "neurosurgery",
    category: "Super Speciality",
    href: "/departments/neurosurgery",
    badge: "Super Speciality",
    summary:
      "Modern neurosurgical department managing traumatic head injuries, spine trauma, brain tumors, hydrocephalus, and minimally invasive micro-neurosurgical procedures with high-definition optical magnification.",
    doctors: [
      {
        name: "Dr. Kamlesh Kumar Singh",
        slug: "dr-kamlesh-kumar-singh",
        designation: "Consultant Neurosurgeon",
        qualifications: "MBBS (GMC Bhopal), MS (GMC Patiala), MCh - Neurosurgery (KMC Manipal)",
        experience: "5+ Years",
        image: "/images/departments_doctor/dr._kamlesh_kumar_Singh.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 1:00 PM & 4:00 PM – 7:00 PM",
        bio: "Trained at premier neurosurgical centers (KMC Manipal), specializing in brain tumor excision, cranial trauma management, endoscopic spine surgery, and aneurysm clippings.",
        profileUrl: "/doctors/dr-kamlesh-kumar-singh",
      },
      {
        name: "Dr. Harmohan Sahu",
        slug: "dr-harmohan-sahu",
        designation: "Consultant Neurosurgeon",
        qualifications: "MBBS, MS (General Surgery), MCh (Neurosurgery)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_harmohan_sahu.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 3:00 PM",
        bio: "Expert in neuro-trauma resuscitation, spinal stabilization, decompression surgeries, and peripheral nerve procedures.",
        profileUrl: "/doctors/dr-harmohan-sahu",
      },
    ],
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    slug: "gastroenterology",
    category: "Super Speciality",
    href: "/departments/gastroenterology",
    badge: "Super Speciality",
    summary:
      "Comprehensive medical and surgical gastroenterology services, diagnostic and therapeutic endoscopy, colonoscopy, ERCP, liver disease management, and minimally invasive gastrointestinal surgeries.",
    doctors: [
      {
        name: "Dr. R.K. Singh",
        slug: "dr-rk-singh",
        designation: "Senior Consultant GI Surgeon",
        qualifications: "MBBS, MS (General Surgery), Specialized in GI Surgery",
        experience: "15+ Years",
        image: "/images/departments_doctor/dr-r-k-singh.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 1:00 PM & 5:00 PM – 7:00 PM",
        bio: "Specialist in interventional gastroenterology, hepatobiliary interventions, advanced abdominal surgeries, and therapeutic endoscopic procedures.",
        profileUrl: "/doctors/dr-rk-singh",
      },
      {
        name: "Dr. Anirban De",
        slug: "dr-anirban-de",
        designation: "Consultant Gastroenterologist",
        qualifications: "MBBS, MD (Medicine), DM (Gastroenterology)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_anirban_de.png",
        opdTimings: "Mon-Sat: 11:00 AM – 4:00 PM",
        bio: "Senior medical gastroenterologist handling inflammatory bowel disease, chronic hepatitis, cirrhosis, therapeutic endoscopy, and pancreatic disorders.",
        profileUrl: "/doctors/dr-anirban-de",
      },
      {
        name: "Dr. Mahesh Tiwari",
        slug: "dr-mahesh-tiwari",
        designation: "Consultant Gastroenterologist",
        qualifications: "MBBS, MD, DNB (Gastroenterology)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_mahesh_tiwari.jpg",
        opdTimings: "Mon-Sat: 2:00 PM – 6:00 PM",
        bio: "Expert in gastrointestinal motility disorders, acid-peptic diseases, diagnostic endoscopy, and biliary tract therapeutics.",
        profileUrl: "/doctors/dr-mahesh-tiwari",
      },
    ],
  },
  {
    id: "nephrology",
    name: "Nephrology",
    slug: "nephrology",
    category: "Super Speciality",
    href: "/departments/nephrology",
    badge: "Super Speciality",
    summary:
      "Dedicated renal care unit offering 24/7 hemodialysis, peritoneal dialysis support, acute kidney injury stabilization, chronic kidney disease (CKD) management, and kidney biopsy procedures.",
    doctors: [
      {
        name: "Dr. Harendra Pratap Singh",
        slug: "dr-harendra-pratap-singh",
        designation: "Consultant Nephrologist",
        qualifications: "MBBS, MD (Medicine), DM (Nephrology)",
        experience: "12+ Years",
        image: "/images/departments_doctor/harendra_pratap.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 3:00 PM",
        bio: "Renal medicine expert with deep clinical experience in diabetic nephropathy, hemodialysis protocols, hypertension-induced renal disorders, and pre-transplant workups.",
        profileUrl: "/doctors/dr-harendra-pratap-singh",
      },
    ],
  },
  {
    id: "oncology",
    name: "Oncology",
    slug: "oncology",
    category: "Super Speciality",
    href: "/departments/oncology",
    badge: "Super Speciality",
    summary:
      "Multidisciplinary cancer care wing delivering surgical oncology tumor excisions, targeted chemotherapy, palliative oncology, and early cancer screening programs in collaboration with pathology.",
    doctors: [
      {
        name: "Dr. Ajay Kumar Prajapati",
        slug: "dr-ajay-kumar-prajapati",
        designation: "Consultant Medical Oncologist",
        qualifications: "MBBS, MD (Internal Medicine), DM (Medical Oncology)",
        experience: "9+ Years",
        image: "/images/departments_doctor/dr_ajay_prajapati.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Medical oncologist with expertise in solid tumors, hematological malignancies, systemic chemotherapies, and immunotherapy treatment regimens.",
        profileUrl: "/doctors/dr-ajay-kumar-prajapati",
      },
      {
        name: "Dr. Neha Gupta",
        slug: "dr-neha-gupta",
        designation: "Consultant Oncologist",
        qualifications: "MBBS, MD, DNB (Oncology)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_neha_gupta.png",
        opdTimings: "Mon-Fri: 11:00 AM – 3:00 PM",
        bio: "Specialist in breast, gynaecological, and gastrointestinal cancers, focusing on holistic oncological care and patient counseling.",
        profileUrl: "/doctors/dr-neha-gupta",
      },
    ],
  },
  {
    id: "urology",
    name: "Urology",
    slug: "urology",
    category: "Super Speciality",
    href: "/departments/urology",
    badge: "Super Speciality",
    summary:
      "Advanced urological sciences featuring Holmium laser lithotripsy, PCNL, TURP, endo-urology, female urology, male infertility, and laparoscopic urologic reconstructions.",
    doctors: [
      {
        name: "Dr. Dinesh Singh",
        slug: "dr-dinesh-singh",
        designation: "Senior Consultant Urologist",
        qualifications: "MBBS, MS (General Surgery), MCh (Urology)",
        experience: "15+ Years",
        image: "/images/departments_doctor/dr-dinesh-singh.jpg",
        opdTimings: "Mon-Sat: 9:30 AM – 1:30 PM & 5:00 PM – 7:30 PM",
        bio: "Pioneer in minimally invasive laser kidney stone surgery, PCNL, prostate laser enucleation, laparoscopic urology, and male reproductive health.",
        profileUrl: "/doctors/dr-dinesh-singh",
      },
      {
        name: "Dr. Piyush Kumar Saini",
        slug: "dr-piyush-kumar-saini",
        designation: "Consultant Urologist",
        qualifications: "MBBS, MS, MCh (Urology)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_piyush_saini.jpg",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Urological surgeon specialized in urinary tract reconstructions, endourology, ureteroscopy, and pediatric urological anomalies.",
        profileUrl: "/doctors/dr-piyush-kumar-saini",
      },
    ],
  },
  {
    id: "burns-plastic-surgery",
    name: "Burns & Plastic Surgery",
    slug: "burns-plastic-surgery",
    category: "Super Speciality",
    href: "/departments/burns-plastic-surgery",
    badge: "Super Speciality",
    summary:
      "Specialized reconstructive and aesthetic surgery center managing burn rehabilitation, scar contracture releases, skin grafting, maxillofacial trauma repair, and microvascular plastic surgery.",
    doctors: [
      {
        name: "Dr. A.K. Pradhan",
        slug: "dr-a-k-pradhan",
        designation: "Senior Consultant Plastic Surgeon",
        qualifications: "MBBS, MS, MCh (Plastic & Reconstructive Surgery)",
        experience: "18+ Years",
        image: "/images/departments_doctor/dr_a_k_pradhan.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Senior plastic surgeon with extensive expertise in complex burn contractures, cosmetic reconstructions, hand surgery, and microvascular tissue transfers.",
        profileUrl: "/doctors/dr-a-k-pradhan",
      },
      {
        name: "Dr. Deepak Agrahari",
        slug: "dr-deepak-agrahari",
        designation: "Consultant Plastic Surgeon",
        qualifications: "MBBS, MS, MCh (Plastic Surgery)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_deepak_agrahari.jpg",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Expert in post-traumatic wound coverage, facial cosmetic procedures, cleft lip and palate correction, and laser scar therapies.",
        profileUrl: "/doctors/dr-deepak-agrahari",
      },
      {
        name: "Dr. Sudhir Singh",
        slug: "dr-sudhir-singh",
        designation: "Consultant Plastic Surgeon",
        qualifications: "MBBS, MS, MCh (Plastic Surgery)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_sudhir_singh.jpg",
        opdTimings: "Mon-Sat: 3:00 PM – 7:00 PM",
        bio: "Specializing in acute burn critical management, pediatric plastic surgery, and aesthetic tissue reconstructions.",
        profileUrl: "/doctors/dr-sudhir-singh",
      },
    ],
  },
  {
    id: "interventional-radiology",
    name: "Interventional Radiology",
    slug: "interventional-radiology",
    category: "Super Speciality",
    href: "/departments/interventional-radiology",
    badge: "Super Speciality",
    summary:
      "Cutting-edge image-guided minimally invasive diagnostic and therapeutic procedures, including vascular embolizations, angiography, image-guided biopsies, drainages, and microwave tumor ablation.",
    doctors: [
      {
        name: "Dr. Rohan Kumar Singh",
        slug: "dr-rohan-kumar-singh",
        designation: "Consultant Interventional Radiologist",
        qualifications: "MBBS, MD (Radiodiagnosis), Fellowship in Interventional Radiology",
        experience: "9+ Years",
        image: "/images/departments_doctor/rohan_kr_singh.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 2:00 PM",
        bio: "Specialist in catheter-directed vascular interventions, trans-arterial chemoembolization (TACE), uterine fibroid embolization, and peripheral angioplasty.",
        profileUrl: "/doctors/dr-rohan-kumar-singh",
      },
      {
        name: "Dr. Omkareshwar Pratap Singh",
        slug: "dr-omkareshwar-pratap-singh",
        designation: "Consultant Radiologist",
        qualifications: "MBBS, MD (Radiodiagnosis)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_omkareshwar.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 4:00 PM",
        bio: "Expert in neuro-imaging, high-resolution CT & MRI interpretation, musculoskeletal imaging, and ultrasound-guided interventions.",
        profileUrl: "/doctors/dr-omkareshwar-pratap-singh",
      },
    ],
  },
  {
    id: "pediatric-surgery",
    name: "Pediatric Surgery",
    slug: "pediatric-surgery",
    category: "Super Speciality",
    href: "/departments/pediatric-surgery",
    badge: "Super Speciality",
    summary:
      "Specialized surgical care tailored specifically for newborns, infants, children, and adolescents, handling congenital malformations, pediatric abdominal emergencies, and neonatal surgeries.",
    doctors: [
      {
        name: "Dr. Greeshma Suresh",
        slug: "dr-greeshma-suresh",
        designation: "Consultant Pediatric Surgeon",
        qualifications: "MBBS, MS (General Surgery), MCh (Pediatric Surgery) IMS, BHU",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_greeshma_suresh.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM & 5:00 PM – 7:00 PM",
        bio: "Trained at Institute of Medical Sciences (BHU), specializing in neonatal surgical emergencies, congenital diaphragmatic hernia, anorectal malformations, and pediatric minimally invasive surgery.",
        profileUrl: "/doctors/dr-greeshma-suresh",
      },
    ],
  },
  {
    id: "pediatric-cardiology",
    name: "Pediatric Cardiology",
    slug: "pediatric-cardiology",
    category: "Super Speciality",
    href: "/departments/pediatric-cardiology",
    badge: "Super Speciality",
    summary:
      "Dedicated heart care for newborns, infants, and children managing congenital heart defects (CHD), pediatric murmurs, rheumatic heart disease, and pediatric echocardiography evaluations.",
    doctors: [
      {
        name: "Dr. Rajesh Kumar Singh",
        slug: "dr-rajesh-kumar-singh",
        designation: "Consultant Pediatric Cardiologist",
        qualifications: "MBBS, MD (Pediatrics), Fellowship in Pediatric Cardiology",
        experience: "11+ Years",
        image: "/images/departments_doctor/dr_rajesh_kumar_singh.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Experienced specialist in diagnosing and managing congenital cardiac diseases in infants and children, fetal echocardiography, and non-surgical device closures.",
        profileUrl: "/doctors/dr-rajesh-kumar-singh",
      },
    ],
  },

  // ── SPECIALTIES (14) ──
  {
    id: "general-surgery",
    name: "Laparoscopy & General Surgery",
    slug: "general-surgery",
    category: "Speciality",
    href: "/departments/general-surgery",
    badge: "Speciality",
    summary:
      "High-volume surgical department handling laparoscopic cholecystectomy, hernia repairs, appendectomy, laser proctology (piles, fissure, fistula), abdominal trauma, and emergency surgeries.",
    doctors: [
      {
        name: "Dr. A.K. Kaushik",
        slug: "dr-a-k-kaushik",
        designation: "Founder, Chairman & Senior Consultant Surgeon",
        qualifications: "MBBS, MS (General Surgery)",
        experience: "32+ Years",
        image: "/images/dr_ak_kaushik.png",
        opdTimings: "Mon-Sat: 10:00 AM – 1:00 PM",
        bio: "Visionary surgeon and founder of Popular Hospital. Renowned across Purvanchal for over three decades of clinical surgical mastery, advanced laparoscopy, and trauma management.",
        profileUrl: "/doctors/dr-a-k-kaushik",
      },
      {
        name: "Dr. Abhishek Kumar",
        slug: "dr-abhishek-kumar",
        designation: "Consultant General & Laparoscopic Surgeon",
        qualifications: "MBBS, MS (General Surgery), FIAGES",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_abhishek_kumar.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 12:00 PM & 4:00 PM – 8:00 PM",
        bio: "Fellow in minimal access surgery with extensive experience in single-incision laparoscopic surgery, abdominal wall reconstruction, laser proctology, and trauma resuscitation.",
        profileUrl: "/doctors/dr-abhishek-kumar",
      },
      {
        name: "Dr. Deepankar Mishra",
        slug: "dr-deepankar-mishra",
        designation: "Consultant General Surgeon",
        qualifications: "MBBS, MS (General Surgery)",
        experience: "7+ Years",
        image: "/images/departments-images/laparoscopic.jpeg",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Specialist in emergency abdominal interventions, wound care, soft tissue infections, and surgical day care procedures.",
        profileUrl: "/doctors",
      },
    ],
  },
  {
    id: "gynaecology",
    name: "Obstetrics & Gynaecology",
    slug: "gynaecology",
    category: "Speciality",
    href: "/departments/gynaecology",
    badge: "Speciality",
    summary:
      "Comprehensive women's healthcare providing normal and caesarean deliveries, high-risk pregnancy monitoring, laparoscopic hysterectomy, ovarian cyst removal, and adolescent health consultations.",
    doctors: [
      {
        name: "Dr. Kiran Kaushik",
        slug: "dr-kiran-kaushik",
        designation: "Managing Director & HOD - Obstetrics & Gynaecology",
        qualifications: "MBBS (RIMCH Ranchi - 1991), MD (IMS BHU Varanasi - 1996)",
        experience: "25+ Years",
        image: "/images/departments_doctor/dr_kiran_kaushik.png",
        opdTimings: "Mon-Sat: 9:00 AM – 1:00 PM & 4:00 PM – 7:00 PM",
        bio: "Renowned gynaecologist and Managing Director of Popular Hospital with over 25 years of clinical leadership. Expert in maternal-fetal medicine, high-risk obstetrics, and operative laparoscopy.",
        profileUrl: "/doctors/dr-kiran-kaushik",
      },
      {
        name: "Dr. Priyanka Jaiswal",
        slug: "dr-priyanka-jaiswal",
        designation: "Consultant Obstetrician & Gynaecologist",
        qualifications: "MBBS, MS (Obstetrics & Gynaecology)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_priyanka_jaiswal.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Specialist in prenatal maternal counseling, painless normal deliveries, gynaecological endocrinology, and fertility workups.",
        profileUrl: "/doctors/dr-priyanka-jaiswal",
      },
      {
        name: "Dr. Madhavi Paramar",
        slug: "dr-madhavi-paramar",
        designation: "Consultant Gynaecologist",
        qualifications: "MBBS, MS (Obstetrics & Gynaecology)",
        experience: "9+ Years",
        image: "/images/departments_doctor/madhvi_parmar.jpg",
        opdTimings: "Mon-Sat: 12:00 PM – 4:00 PM",
        bio: "Experienced in managing high-risk antenatal care, cervical cancer screening, colposcopy, and post-menopausal healthcare.",
        profileUrl: "/doctors/dr-madhavi-paramar",
      },
      {
        name: "Dr. Srishti Tanya",
        slug: "dr-srishti-tanya",
        designation: "Consultant Obstetrician & Gynaecologist",
        qualifications: "MBBS, MS (Obstetrics & Gynaecology)",
        experience: "7+ Years",
        image: "/images/departments_doctor/dr._srishti_tanya.jpg",
        opdTimings: "Mon-Sat: 3:00 PM – 7:00 PM",
        bio: "Focused on adolescent gynaecology, menstrual health disorders, ultrasound-guided obstetric monitoring, and preventative women's wellness.",
        profileUrl: "/doctors/dr-srishti-tanya",
      },
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics And Neonatology",
    slug: "pediatrics",
    category: "Speciality",
    href: "/departments/pediatrics",
    badge: "Speciality",
    summary:
      "Advanced newborn and child medical care supported by Level-III Neonatal Intensive Care Unit (NICU), Pediatric ICU (PICU), childhood immunizations, developmental assessments, and acute pediatric care.",
    doctors: [
      {
        name: "Dr. Alok C. Bhardwaj",
        slug: "dr-alok-c-bhardwaj",
        designation: "Senior Consultant Pediatrician & Neonatologist",
        qualifications: "MBBS, MD (Pediatrics) IMS, BHU",
        experience: "16+ Years",
        image: "/images/departments_doctor/dr_alok_bharwaj.jpg",
        opdTimings: "Mon-Sat: 9:30 AM – 1:30 PM",
        bio: "Senior pediatrician trained at IMS BHU with extensive clinical acumen in neonatology, preterm baby care, childhood respiratory illnesses, and critical pediatric resuscitation.",
        profileUrl: "/doctors/dr-alok-c-bhardwaj",
      },
      {
        name: "Dr. Prabhat Kumar",
        slug: "dr-prabhat-kumar",
        designation: "Consultant Pediatrician",
        qualifications: "MBBS, DCH, DNB (Pediatrics)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_prabhat_kumar.jpg",
        opdTimings: "Mon-Sat: 2:00 PM – 6:00 PM",
        bio: "Dedicated child specialist handling infant feeding, growth tracking, childhood asthma, infectious illnesses, and immunization schedules.",
        profileUrl: "/doctors/dr-prabhat-kumar",
      },
    ],
  },
  {
    id: "orthopedics",
    name: "Orthopedics & Joint Replacement",
    slug: "orthopedics",
    category: "Speciality",
    href: "/departments/orthopedics",
    badge: "Speciality",
    summary:
      "Comprehensive musculoskeletal care featuring computer-assisted total knee and hip replacements, arthroscopic sports injury treatments, complex pelvic-acetabular fracture fixations, and spine therapy.",
    doctors: [
      {
        name: "Dr. Md Akhtar Ali Ansari",
        slug: "dr-md-akhtar-ali-ansari",
        designation: "Senior Consultant Orthopedic Surgeon",
        qualifications: "MBBS, MS (Orthopedics) AIIMS New Delhi",
        experience: "14+ Years",
        image: "/images/departments_doctor/dr_ohd_akhtar_ali_ansari.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM & 5:00 PM – 7:30 PM",
        bio: "AIIMS New Delhi alumnus specializing in joint replacement (Total Knee & Hip Arthroplasty), sports arthroscopy (ACL/PCL reconstructions), and polytrauma management.",
        profileUrl: "/doctors/dr-md-akhtar-ali-ansari",
      },
      {
        name: "Dr. Vinit Yadav",
        slug: "dr-vinit-yadav",
        designation: "Consultant Orthopedic Surgeon",
        qualifications: "MBBS, MS (Orthopedics) IMS BHU",
        experience: "9+ Years",
        image: "/images/departments_doctor/vinit_yadav.jpg",
        opdTimings: "Mon-Sat: 11:00 AM – 4:00 PM",
        bio: "Specialist in trauma fracture management, pediatric orthopedics, osteoporotic bone health, and minimally invasive fracture fixations.",
        profileUrl: "/doctors/dr-vinit-yadav",
      },
      {
        name: "Dr. Shashank Krishnan",
        slug: "dr-shashank-krishnan",
        designation: "Consultant Orthopedic Surgeon",
        qualifications: "MBBS, MS (Orthopedics)",
        experience: "8+ Years",
        image: "/images/departments-images/orthopaedic.jpeg",
        opdTimings: "Mon-Sat: 3:00 PM – 7:00 PM",
        bio: "Focused on degenerative joint disorders, spinal disc management, sports rehabilitation, and upper-limb reconstructive surgery.",
        profileUrl: "/doctors",
      },
    ],
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    slug: "general-medicine",
    category: "Speciality",
    href: "/departments/general-medicine",
    badge: "Speciality",
    summary:
      "Primary and internal medicine department managing diabetes, hypertension, infectious diseases (dengue, malaria, typhoid), thyroid disorders, and complex multi-system medical conditions.",
    doctors: [
      {
        name: "Dr. P.K. Tiwari",
        slug: "dr-p-k-tiwari",
        designation: "Senior Consultant Physician",
        qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
        experience: "20+ Years",
        image: "/images/departments_doctor/dr_pk_tiwari.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 1:00 PM",
        bio: "Senior physician with over two decades of clinical expertise in metabolic medicine, geriatric healthcare, chronic fever diagnoses, and critical medical emergencies.",
        profileUrl: "/doctors/dr-p-k-tiwari",
      },
      {
        name: "Dr. Sandesh M. Raykar",
        slug: "dr-sandesh-m-raykar",
        designation: "Consultant Physician",
        qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
        experience: "12+ Years",
        image: "/images/departments_doctor/dr_sandesh_m_raykar.jpg",
        opdTimings: "Mon-Sat: 2:00 PM – 6:00 PM",
        bio: "IMS BHU trained physician specializing in acute respiratory infections, hypertension regulation, diabetes management, and preventive medical health.",
        profileUrl: "/doctors/dr-sandesh-m-raykar",
      },
    ],
  },
  {
    id: "ivf-fertility",
    name: "IVF & Fertility",
    slug: "ivf-fertility",
    category: "Speciality",
    href: "/departments/ivf-fertility",
    badge: "Speciality",
    summary:
      "Advanced reproductive medicine and assisted reproduction services including IUI, IVF, ICSI, fertility workups, ovulation induction, and fertility counseling.",
    doctors: [
      {
        name: "Dr. Akanksha Chaturvedi",
        slug: "dr-akanksha-chaturvedi",
        designation: "Consultant Reproductive Medicine & IVF Specialist",
        qualifications: "MBBS, MS (Obs & Gynae), Fellowship in Reproductive Medicine",
        experience: "9+ Years",
        image: "/images/departments_doctor/dr_akanksha_chaturvedi.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 3:00 PM",
        bio: "Specialist in male and female infertility evaluations, reproductive endocrinology, controlled ovarian stimulation, and assisted conception techniques.",
        profileUrl: "/doctors/dr-akanksha-chaturvedi",
      },
    ],
  },
  {
    id: "ent",
    name: "ENT (Ear, Nose & Throat)",
    slug: "ent",
    category: "Speciality",
    href: "/departments/ent",
    badge: "Speciality",
    summary:
      "Comprehensive otorhinolaryngology care offering micro-ear surgeries (tympanoplasty, mastoidectomy), endoscopic sinus surgery (FESS), tonsillectomy, and voice disorder evaluations.",
    doctors: [
      {
        name: "ENT Department Team",
        slug: "ent-specialist",
        designation: "Specialist ENT Surgical Faculty",
        qualifications: "MBBS, MS (ENT / Otorhinolaryngology)",
        experience: "10+ Years",
        image: "/images/departments-images/ent.jpeg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Experienced otorhinolaryngology faculty providing clinical diagnostic scopes, audiometry evaluation, and endoscopic nasal and microscopic ear surgeries.",
        profileUrl: "/departments/ent",
      },
    ],
  },
  {
    id: "dietetics-nutrition",
    name: "Dietetics & Nutrition",
    slug: "dietetics-nutrition",
    category: "Speciality",
    href: "/departments/dietetics-nutrition",
    badge: "Speciality",
    summary:
      "Clinical nutritional therapy providing personalized diet plans for diabetic patients, renal failure, cardiac rehabilitation, postoperative surgical healing, and weight management.",
    doctors: [
      {
        name: "Dt. Sakshi Pandey",
        slug: "dt-sakshi-pandey",
        designation: "Senior Clinical Dietitian",
        qualifications: "M.Sc (Food & Nutrition), Registered Dietitian",
        experience: "8+ Years",
        image: "/images/departments_doctor/dt_sakshi_pandey.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 3:00 PM",
        bio: "Expert in hospital inpatient therapeutic diets, pediatric nutrition, enteral tube feeding protocols, and chronic disease dietary counseling.",
        profileUrl: "/doctors/dt-sakshi-pandey",
      },
      {
        name: "Dt. Sayeda Eram Fatma",
        slug: "dt-sayeda-eram-fatma",
        designation: "Clinical Dietitian",
        qualifications: "M.Sc (Nutrition & Dietetics)",
        experience: "6+ Years",
        image: "/images/departments_doctor/dt._sayeda_eram_fatma.jpeg",
        opdTimings: "Mon-Sat: 11:00 AM – 4:00 PM",
        bio: "Specializing in diabetic meal planning, prenatal nutrition, renal diets, and lifestyle wellness interventions.",
        profileUrl: "/doctors/dt-sayeda-eram-fatma",
      },
    ],
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    slug: "ophthalmology",
    category: "Speciality",
    href: "/departments/ophthalmology",
    badge: "Speciality",
    summary:
      "Advanced eye care unit offering micro-incision cataract surgery (phacoemulsification), diabetic retinopathy screenings, glaucoma diagnostics, computerized refraction, and ocular surface treatments.",
    doctors: [
      {
        name: "Dr. Gunjan Rana",
        slug: "dr-gunjan-rana",
        designation: "Consultant Eye Surgeon",
        qualifications: "MBBS, MS (Ophthalmology)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_gunjan_rana.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Specialist in phaco cataract surgery with premium IOL implantation, medical retina diagnostics, pterygium excision, and glaucoma medical management.",
        profileUrl: "/doctors/dr-gunjan-rana",
      },
      {
        name: "Dr. Disha Chaudhary",
        slug: "dr-disha-chaudhary",
        designation: "Consultant Ophthalmologist",
        qualifications: "MBBS, MS (Ophthalmology)",
        experience: "7+ Years",
        image: "/images/departments-images/ophthalmology.jpeg",
        opdTimings: "Mon-Sat: 2:00 PM – 5:00 PM",
        bio: "Expert in pediatric vision screening, refractive error correction, corneal surface disorders, and dry eye syndromes.",
        profileUrl: "/doctors",
      },
    ],
  },
  {
    id: "dental",
    name: "Dental",
    slug: "dental",
    category: "Speciality",
    href: "/departments/dental",
    badge: "Speciality",
    summary:
      "Full-scope dentistry providing root canal therapy (RCT), crown and bridge prosthetics, dental implants, surgical tooth extractions, orthodontic smile corrections, and dental hygiene.",
    doctors: [
      {
        name: "Dr. Hena Kauser",
        slug: "dr-hena-kauser",
        designation: "Consultant Dental Surgeon",
        qualifications: "BDS, MDS (Dental Surgery)",
        experience: "9+ Years",
        image: "/images/departments_doctor/dr_heena_kauser.jpg",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM & 4:30 PM – 7:30 PM",
        bio: "Expert in single-sitting root canal procedures, cosmetic teeth restoration, periodontal scaling, and preventive oral health guidance.",
        profileUrl: "/doctors/dr-hena-kauser",
      },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory Medicine",
    slug: "respiratory",
    category: "Speciality",
    href: "/departments/respiratory",
    badge: "Speciality",
    summary:
      "Pulmonary and chest medicine managing chronic obstructive pulmonary disease (COPD), bronchial asthma, tuberculosis, pneumonia, interstitial lung diseases (ILD), and sleep apnea with spirometry.",
    doctors: [
      {
        name: "Dr. K.P. Singh",
        slug: "dr-k-p-singh",
        designation: "Senior Consultant Pulmonologist & Chest Physician",
        qualifications: "MBBS, MD (Respiratory Medicine), Dip. Card, MNCCP, MICS, MERS",
        experience: "22+ Years",
        image: "/images/departments_doctor/dr_k_p_singh.jpg",
        opdTimings: "Mon-Sat: 9:30 AM – 1:30 PM",
        bio: "Eminent chest physician with over two decades of clinical experience in complex respiratory failure, bronchoscopy, allergic airway disorders, and post-COVID pulmonary fibrosis.",
        profileUrl: "/doctors/dr-k-p-singh",
      },
      {
        name: "Dr. Shailendra Shivhare",
        slug: "dr-shailendra-shivhare",
        designation: "Consultant Pulmonologist",
        qualifications: "MBBS, MD (Pulmonary Medicine)",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_sailendra shivhare.jpg",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Expert in critical respiratory care, non-invasive ventilation (BiPAP/CPAP) titration, asthma education, and pleural fluid management.",
        profileUrl: "/doctors/dr-shailendra-shivhare",
      },
      {
        name: "Dr. Vikas Jaiswal",
        slug: "dr-vikas-jaiswal",
        designation: "Consultant Respiratory Physician",
        qualifications: "MBBS, MD (Chest Diseases)",
        experience: "8+ Years",
        image: "/images/departments_doctor/dr_vikas_jaiswal.jpg",
        opdTimings: "Mon-Sat: 3:00 PM – 7:00 PM",
        bio: "Specializing in occupational lung diseases, smoking cessation counseling, sleep-disordered breathing, and pulmonary rehabilitation.",
        profileUrl: "/doctors/dr-vikas-jaiswal",
      },
    ],
  },
  {
    id: "pain-management",
    name: "Pain Medicine",
    slug: "pain-management",
    category: "Speciality",
    href: "/departments/pain-management",
    badge: "Speciality",
    summary:
      "Dedicated interventional pain clinic providing relief for chronic back pain, sciatica, arthritis, neuropathic pain, trigeminal neuralgia, and cancer-related pain via nerve blocks and radiofrequency ablation.",
    doctors: [
      {
        name: "Dr. Rakesh Kumar",
        slug: "dr-rakesh-kumar",
        designation: "Senior Consultant Anesthesiologist & Pain Specialist",
        qualifications: "MBBS, MD (Anaesthesiology), Fellowship in Pain Medicine",
        experience: "15+ Years",
        image: "/images/banners/pain_management_banner.png",
        opdTimings: "Mon-Sat: 11:00 AM – 3:00 PM",
        bio: "Specialist in fluoroscopy-guided epidural steroid injections, facet joint blocks, trigger point therapy, and chronic pain syndrome management.",
        profileUrl: "/departments/pain-management",
      },
    ],
  },
  {
    id: "psychiatry",
    name: "Psychiatry Department",
    slug: "psychiatry",
    category: "Speciality",
    href: "/departments/psychiatry",
    badge: "Speciality",
    summary:
      "Compassionate mental healthcare providing clinical consultations for anxiety disorders, clinical depression, bipolar disorder, obsessive-compulsive disorder (OCD), sleep disturbances, and addiction de-addiction therapy.",
    doctors: [
      {
        name: "Department of Psychiatry Specialist Team",
        slug: "psychiatry-team",
        designation: "Consultant Psychiatrists & Clinical Psychologists",
        qualifications: "MBBS, MD (Psychiatry), DPM",
        experience: "10+ Years",
        image: "/images/banners/psychiatry_banner.png",
        opdTimings: "Mon-Sat: 10:00 AM – 2:00 PM",
        bio: "Providing confidential psychotherapy, psychiatric assessments, psychopharmacological guidance, and behavioral counseling for patients and families.",
        profileUrl: "/departments/psychiatry",
      },
    ],
  },
  {
    id: "diabetic-foot",
    name: "Advanced Diabetic Foot Unit",
    slug: "diabetic-foot",
    category: "Speciality",
    href: "/departments/diabetic-foot",
    badge: "Speciality",
    summary:
      "Specialized multidisciplinary unit dedicated to diabetic foot ulcer healing, peripheral neuropathy screening, vascular perfusion assessment, wound debridement, and limb salvage surgery.",
    doctors: [
      {
        name: "Dr. Abhishek Kumar & Surgical Team",
        slug: "dr-abhishek-kumar",
        designation: "Consultant Surgeon & Diabetic Wound Care Lead",
        qualifications: "MBBS, MS (General Surgery), FIAGES",
        experience: "10+ Years",
        image: "/images/departments_doctor/dr_abhishek_kumar.jpg",
        opdTimings: "Mon-Sat: 9:00 AM – 12:00 PM & 4:00 PM – 8:00 PM",
        bio: "Leading the diabetic foot limb salvage program at Popular Hospital using modern negative pressure wound therapy (NPWT/VAC), vascular revascularization, and specialized diabetic footwear guidance.",
        profileUrl: "/departments/diabetic-foot",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// POPULAR HOSPITAL VERIFIED FACILITIES (SECTION 08)
// ─────────────────────────────────────────────────────────────────────────────

export const POPULAR_FACILITIES: FacilityCard[] = [
  {
    title: "24/7 Emergency & Trauma Centre",
    category: "Critical Care",
    desc: "Immediate stabilization for cardiac emergencies, polytrauma, strokes, and acute medical crises with on-site resuscitation teams and diagnostic support.",
    image: "/images/emergency_trauma.jpg",
    href: "/services/emergency",
    badge: "24/7 Open",
  },
  {
    title: "Round-the-Clock Ambulance Service",
    category: "Emergency Transit",
    desc: "Equipped with advanced life support (ALS) transport, oxygenation, defibrillators, and trained paramedics operating across Varanasi and adjoining districts.",
    image: "/images/ambulance.png",
    href: "/services/ambulance",
    badge: "Rapid Response",
  },
  {
    title: "Advanced Diagnostic Radiology",
    category: "Imaging Services",
    desc: "High-resolution computed tomography (CT scan), digital X-ray, multi-frequency ultrasound, color doppler, and interventional radiology suites.",
    image: "/images/facilities/ir_surgery_(radiology).png",
    href: "/services/radiology",
    badge: "High Precision",
  },
  {
    title: "NABL-Equipped Pathology Laboratory",
    category: "Diagnostic Lab",
    desc: "Fully automated biochemistry, hematology, microbiology, histopathology, and clinical pathology analyzers delivering rapid, validated reports.",
    image: "/images/facilities/08.jpeg",
    href: "/services/pathology",
    badge: "NABL Standards",
  },
  {
    title: "24/7 Licensed Blood Bank",
    category: "Transfusion Medicine",
    desc: "Certified blood storage with component separation (packed red cells, fresh frozen plasma, platelets) ensuring safe, cross-matched transfusion support.",
    image: "/images/facilities/09.jpeg",
    href: "/services/blood-bank",
    badge: "24/7 Stocked",
  },
  {
    title: "Modular Surgical Operation Theatres",
    category: "Surgical Infrastructure",
    desc: "HEPA-filtered laminar airflow OTs equipped with modern anesthesia workstations, laparoscopic towers, C-arm fluoroscopy, and microsurgery setups.",
    image: "/images/facilities/microwave_surgery.png",
    href: "/about/infrastructure-technology",
    badge: "Zero Infection Focus",
  },
  {
    title: "24/7 Hospital Pharmacy",
    category: "In-House Pharmacy",
    desc: "100% genuine pharmaceutical formulations, emergency critical care injectables, and surgical consumables available round the clock.",
    image: "/images/facilities/reception.png",
    href: "/services/pharmacy",
    badge: "100% Genuine",
  },
  {
    title: "Preventive Health Checkup Packages",
    category: "Wellness & Screenings",
    desc: "Comprehensive executive health checkups, cardiac screening packages, diabetic health assessments, and well-woman diagnostic screenings.",
    image: "/images/health_packages.png",
    href: "/services/health-packages",
    badge: "Early Detection",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FREQUENTLY ASKED QUESTIONS (SECTION 12)
// ─────────────────────────────────────────────────────────────────────────────

export const VARANASI_HOSPITAL_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Which hospital should I choose in Varanasi?",
    answer:
      "Selecting the right hospital depends primarily on your specific medical condition, required specialty, doctor expertise, urgency, and budget. For super-specialty interventions such as interventional cardiology, neurosurgery, nephrology with continuous dialysis, and comprehensive private multispeciality care, Popular Hospital on BLW Road Kakarmatta is widely regarded as a premier choice. For highly subsidized government tertiary care, Sir Sunderlal Hospital (BHU) offers extensive clinical departments. Patients are encouraged to evaluate doctor qualifications, emergency readiness, in-house diagnostics, and insurance empanelments before deciding.",
  },
  {
    id: "faq-2",
    question: "What should I check before selecting a multispeciality hospital?",
    answer:
      "Key factors to inspect include: (1) Availability of qualified full-time super-specialists in the needed discipline; (2) 24/7 emergency, ICU, and trauma readiness; (3) In-house diagnostic infrastructure including CT scan, modern pathology, and blood bank; (4) Cashless health insurance and Ayushman Bharat empanelment; (5) Infection control and modular OT standards; and (6) Transparent pricing and patient communication.",
  },
  {
    id: "faq-3",
    question: "Where is Popular Hospital located in Varanasi?",
    answer:
      "Popular Hospital's main super-speciality facility is located at N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi – 221004, Uttar Pradesh, India. The hospital is strategically situated near the Kakarmatta flyover and BLW campus, making it easily accessible from Varanasi Cantt Railway Station (approx. 5 km), Manduadih (Banaras) Railway Station (approx. 1.5 km), and the NH2 bypass.",
  },
  {
    id: "faq-4",
    question: "Which medical departments are available at Popular Hospital?",
    answer:
      "Popular Hospital operates 25 specialized clinical departments: 11 Super Specialties (Cardiology, CTVS, Neurosurgery, Gastroenterology, Nephrology, Oncology, Urology, Burns & Plastic Surgery, Interventional Radiology, Pediatric Surgery, and Pediatric Cardiology) and 14 Specialties (Laparoscopy & General Surgery, Obstetrics & Gynaecology, Pediatrics & Neonatology, Orthopedics & Joint Replacement, General Medicine, IVF & Fertility, ENT, Dietetics & Nutrition, Ophthalmology, Dental, Respiratory Medicine, Pain Medicine, Psychiatry, and an Advanced Diabetic Foot Unit).",
  },
  {
    id: "faq-5",
    question: "Does Popular Hospital provide emergency services?",
    answer:
      "Yes, Popular Hospital operates a round-the-clock (24/7) Emergency & Trauma Care Department equipped with dedicated resuscitation bays, immediate trauma triage, on-call emergency physicians, intensive care units (ICU, CCU, NICU), a 24/7 blood bank, advanced life support ambulances, and emergency surgery capability. Emergency helpline: +91-7800001895 / +91-7800001896.",
  },
  {
    id: "faq-6",
    question: "How can I find a specialist doctor at Popular Hospital?",
    answer:
      "You can browse doctors on this page under the 'Explore Medical Departments & Specialist Doctors' interactive section, or visit the official Popular Hospital doctor directory at https://www.popularhospital.in/doctors. Each doctor profile includes verified medical qualifications, specializations, clinical experience, and OPD consultation schedules.",
  },
  {
    id: "faq-7",
    question: "How can I book an appointment?",
    answer:
      "Patients can book appointments through multiple convenient channels: (1) Online booking portal at https://www.popularhospital.in/book; (2) Calling the hospital appointment desk at +91-7800001895 / +91-7800001896; or (3) Walking into the Outpatient Department (OPD) registration desk at the Kakarmatta campus during operational OPD hours.",
  },
  {
    id: "faq-8",
    question: "What facilities should I compare between hospitals?",
    answer:
      "When comparing hospitals, assess: (1) Total bed capacity and intensive care beds (ICU/CCU/NICU/PICU); (2) Surgical infrastructure such as modular laminar-flow operation theaters; (3) Cardiac catheterization lab (Cath Lab) availability; (4) Diagnostic turnaround times for CT, MRI, and pathology; (5) In-house blood bank licensing; and (6) Cashless treatment desks and patient support services.",
  },
  {
    id: "faq-9",
    question: "How can I verify cashless insurance eligibility?",
    answer:
      "To verify cashless treatment eligibility at Popular Hospital, visit the hospital's dedicated TPA & Insurance Desk at the Kakarmatta main branch or check online at https://www.popularhospital.in/about/cashless-empanelment. You will need your active health insurance e-card or policy document, government-issued photo ID (Aadhaar or PAN), and attending doctor's admission recommendation. Popular Hospital is empanelled with leading private insurers, corporate TPAs, and government healthcare schemes.",
  },
  {
    id: "faq-10",
    question: "Are government and private hospitals both available in Varanasi?",
    answer:
      "Yes. Varanasi features a balanced mix of both healthcare models. Government institutions like Sir Sunderlal Hospital (BHU) provide tertiary teaching facilities at nominal rates, though patient volumes can be extremely high. Private multispeciality and super-speciality hospitals like Popular Hospital offer faster consultation, shorter waiting periods, modern diagnostic and surgical amenities, private patient rooms, and integrated cashless health insurance assistance.",
  },
];
