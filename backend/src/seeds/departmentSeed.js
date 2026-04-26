/**
 * Department Seed Script
 * Run: node src/seeds/departmentSeed.js
 * Force-updates all department content to match static pages exactly.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import Speciality from "../models/Speciality.js";

const departments = [
  // ─── SUPER SPECIALTIES ───────────────────────────────────────────
  {
    name: "Cardiology",
    slug: "cardiology",
    department_display_name: "Cardiology",
    category: "super_specialty",
    banner_image: "/images/banners/cardiology_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Popular Hospital is a Top cardiac hospital of eastern Uttar Pradesh ensuring best treatment for Heart Diseases. The entire cardiology department is the only center in this region to perform all coronary procedures via transradial route. The center is well equipped with state-of-the-art equipment using cutting-edge technology. From high end 2D Echocardiography to the latest Catheterisation laboratory where complex coronary, peripheral and structural interventions are being carried out on a day to day basis using the most modern tools such as Fractional flow Reserve (FFR)/ Rotatory Atherectomy (Roatablation), Intravascular Ultrasound (IVUS)/Electrophysiology.",
    usp_items: [
      {
        title: "Hi-Tech Cath Lab:-",
        content:
          "Cardiac department of Popular Hospital have a Cath lab equipped with hi-tech equipment where we carry out tests and procedures including ablation, angiogram, angioplasty, IVUS, Rotablation and implantation of pacemakers/icds etc.",
      },
      {
        title: "IVUS Facility:-",
        content:
          "Only center of eastern U.P. having HD-IVUS facility where we can detect exact amount of plaque its size, Degree of narrowing, restenosis & accurate stent placement.",
      },
      {
        title: "Dedicated Cardiac Team:-",
        content:
          "Our cardiac department have a team of expert and experienced Consultants with trained nursing staff especially for the cardiac services who are available 24x7 in cardiac care unit.",
      },
      {
        title: "Non-Invasive cardiology program:-",
        content:
          "Popular hospital believes in saving life as its vision is to \"Caring for Your Every Breath\", the cardiac department performs all kind of non-invasive Procedure to save patient and give them a healthy and worry free life.",
      },
      {
        title: "Round the clock support:-",
        content:
          "Popular Hospital provides 24x7 availability of doctors to support emergency cardiac services.",
      },
    ],
    lists: [
      {
        title: "Interventional",
        highlight: "Cardiology Procedures:",
        items: [
          "Coronary angiography",
          "Coronary angioplasty",
          "Peripheral interventions",
          "Pacemaker implantation (Single chamber, Dual chamber, CRT, AICD, LBBB Pacing).",
          "Balloon valvuloplasty",
          "HD IVUS",
          "ROTABLATION",
          "EP study and Radiofrequency ablation",
          "Acute MI interventions",
        ],
        image: "/images/departments-images/coronary_angiography.jpeg",
        layout: "image-right",
      },
      {
        title: "Non-Invasive & Preventive",
        highlight: "Cardiology:",
        items: [
          "ECG",
          "Echocardiography with Doppler",
          "TMT",
          "ABPM",
          "24 hour Holter Monitoring",
          "CT Coronary Angiography",
        ],
        image: "/images/departments-images/preventive_cardiology.jpeg",
        layout: "image-left",
      },
    ],
    meta_title: "Cardiology Department | Popular Hospital Varanasi",
    meta_description:
      "Best cardiac care in eastern UP. Advanced Cath Lab, IVUS facility, 24x7 cardiac support.",
    sortIndex: 1,
  },
  {
    name: "Cardiothoracic & Vascular Surgery (CTVS)",
    slug: "ctvs",
    department_display_name: "Cardiothoracic & Vascular Surgery (CTVS)",
    category: "super_specialty",
    banner_image: "/images/banners/cardiothoracic_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Cardiothoracic and Vascular Surgery (CTVS) is a specialized branch of surgery that focuses on the surgical treatment of diseases and conditions affecting the heart, lungs, chest, and blood vessels. Our expert team of CTVS surgeons uses the latest techniques including minimally invasive procedures to provide the best outcomes for patients.",
    usp_items: [],
    lists: [
      {
        title: "Cardiac",
        highlight: "Procedures:",
        items: [
          "Coronary Artery Bypass Graft (CABG)",
          "Hypertrophic Cardiomyopathy surgery",
          "Pacemaker Implantation",
          "Beating Heart Bypass Surgery",
          "Minimally Invasive Bypass Surgery / Key Hole Bypass Surgery",
          "Valve Replacement, Single or Double",
          "Combined CABG and Valve Replacements",
          "Repair of Congenital Heart Defects",
          "Conventional Bypass Heart Surgery On Pump",
          "Pericardiectomy",
          "Peripheral Vascular Surgery",
          "Surgery of Aortic Aneurysm and Dissection",
          "Heart Transplant",
          "LVAD Implantation",
        ],
        layout: "default",
      },
      {
        title: "Technology &",
        highlight: "Equipment:",
        items: [
          "Cath Lab",
          "Rotablator",
          "Intravascular Ultrasound Imaging (IVUS)",
          "Fractional Flow Reserve (FFR) measurement Echocardiography (ECG)",
          "Treadmill Machine (TMT) Holter Machines",
        ],
        layout: "default",
      },
      {
        title: "Why Choose",
        highlight: "Popular Hospital for CTVS?",
        items: [
          "Expert CTVS surgeons with decades of experience",
          "State-of-the-art operation theatres with advanced cardiac bypass equipment",
          "24x7 cardiac ICU with trained intensivists and nursing staff",
          "Minimally invasive and robotic-assisted surgical options",
          "Comprehensive pre and post-operative care",
          "Dedicated cardiac rehabilitation program",
        ],
        image: "/images/departments-images/ctvs_technology.jpeg",
        layout: "image-left",
      },
    ],
    meta_title: "CTVS Department | Popular Hospital Varanasi",
    meta_description:
      "Expert Cardiothoracic and Vascular Surgery including CABG, valve replacement, and minimally invasive heart surgery.",
    sortIndex: 2,
  },
  {
    name: "Neurosurgery",
    slug: "neurosurgery",
    department_display_name: "Neurosurgery",
    category: "super_specialty",
    banner_image: "/images/banners/neurosurgery.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Neurosurgery is a speciality of surgery that involves surgical treatment of the disorders of the brain, spinal cord, and the peripheral nerves. With the advent of microsurgery techniques and ultra-modern technology, neurosurgery has grown from making burr holes in the skull for mere lifesaving in the olden days to the most complex surgical procedures involving the brain, spinal cord, and the nerves.\n\nNeurosurgery is one of the most challenging specialties in the field of medicine, which deals with the diseases of the Brain, Skull, Spinal Cord and Spinal Column as well as the Peripheral Nerves. Advances In Neurosurgical Techniques along with the latest technological innovation in tools and equipments have resulted in excellent treatment outcome. Minimally Invasive and Endoscopic Neurosurgery contributes to a much shorter Hospital stay, better patient comfort while maximising the efficacy of the procedure.\n\nPopular Hospital is the only centre in this region where endoscopic spine surgery is being done successfully.",
    usp_items: [],
    lists: [
      {
        title: "Peripheral Nerve",
        highlight: "Surgery:",
        items: [
          "Peripheral Nerve Injury including Brachial Plexus Injury",
          "Release of Nerve Entrapments",
          "Peripheral Nerve Tumors",
        ],
        layout: "default",
      },
      {
        title: "Brain",
        highlight: "Surgery:",
        items: [
          "Head Injury",
          "Stroke with Intracranial Bleeding",
          "Microsurgical Excision of Brain Tumours",
          "Endoscopic Treatment of Hydrocephalus",
          "Clipping of Intracranial Aneurysm and excision of AVM'S",
          "Transsphenoidal Endoscopic/ Microscopic excision Pituitary Tumors",
          "Microvascular decompression for Trigeminal Neuralgia",
        ],
        image: "/images/departments-images/brain_surgery.jpeg",
        layout: "image-right",
      },
      {
        title: "Spinal",
        highlight: "Surgery:",
        items: [
          "Spinal Trauma",
          "Microsurgical Excision of Spinal Cord Tumours",
          "Cervical and Lumber Microdiscectomy",
          "Cervical Disc Replacement",
          "Endoscopic Discectomy",
          "Spinal Decompression and Fusion",
          "Minimally Invasive Spinal Surgery for Listhesis",
          "Kyphoplasty and Vertebroplasty",
        ],
        image: "/images/departments-images/spinal_surgery_realistic.jpeg",
        layout: "image-left",
      },
    ],
    meta_title: "Neurosurgery Department | Popular Hospital Varanasi",
    meta_description:
      "Advanced brain and spine surgery. Only center in eastern UP for endoscopic spine surgery.",
    sortIndex: 3,
  },
  {
    name: "Gastroenterology",
    slug: "gastroenterology",
    department_display_name: "Gastroenterology",
    category: "super_specialty",
    banner_image: "/images/banners/gastroenterology.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "The Dept. of Gastroenterology and liver services has the input of the best medical and surgical gastroenterologists. Interventional Endoscopy relating to the biliary tract and management of complications of portal hypertension. We provide comprehensive care for all digestive disorders using state-of-the-art endoscopic equipment.",
    usp_items: [],
    lists: [
      {
        title: "Endoscopic & GI",
        highlight: "Facilities:",
        items: [
          "Upper & Lower GI Endoscopy",
          "Colonoscopy",
          "Gastroscopy",
          "B.D Stone (ERCP)",
          "Oesophageal & Rectal Dilation",
          "Biliary Stenting, Oesophageal Stenting",
          "Acid Reflux (GERD)",
          "Chronic Constipation",
          "Irritable Bowel Syndrome (IBS)",
          "Fatty Liver Disease",
          "Gallstones",
          "Crohn's Disease",
          "Ulcerative Colitis",
          "Pancreatitis",
          "Hemorrhoids",
          "Celiac Disease",
          "Hepatitis B & C",
          "Cirrhosis of Liver",
        ],
        layout: "two-col",
      },
    ],
    meta_title: "Gastroenterology Department | Popular Hospital Varanasi",
    meta_description:
      "Expert gastroenterology care including advanced endoscopy, liver disease management, and GI surgery.",
    sortIndex: 4,
  },
  {
    name: "Nephrology",
    slug: "nephrology",
    department_display_name: "Nephrology",
    category: "super_specialty",
    banner_image: "/images/banners/nephrology.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Nephrology is a medical super speciality that deals with the functioning of diseases related to the kidney. Kidneys are the sophisticated filtering units of the body. The department provides comprehensive care for all kidney diseases including dialysis, kidney transplant workup, and post-transplant care.",
    usp_items: [],
    lists: [
      {
        title: "Warning",
        highlight: "Symptoms:",
        items: [
          "Increased blood pressure",
          "Swelling of lower limbs & around eyes",
          "Decreased haemoglobin",
          "Reduced urine output",
          "Nausea & Vomiting",
        ],
        layout: "default",
      },
      {
        title: "Renal Diseases",
        highlight: "Treated:",
        items: [
          "Acute (sudden onset) renal diseases",
          "Chronic (slow ongoing decline in renal function) renal diseases",
          "Renal damage due to high blood pressure, diabetes, infections",
          "Blood in the urine (hematuria)",
          "Protein loss in the urine (proteinuria)",
          "Electrolyte or acid-base imbalance",
          "Chronic and recurrent urinary tract infection",
          "Hereditary renal disorders",
          "Renovascular Diseases",
          "Pre Transplant workup & Post Transplant care",
        ],
        layout: "default",
      },
    ],
    meta_title: "Nephrology Department | Popular Hospital Varanasi",
    meta_description:
      "Expert kidney care including dialysis, transplant workup, and management of chronic kidney disease.",
    sortIndex: 5,
  },
  {
    name: "Oncology",
    slug: "oncology",
    department_display_name: "Oncology",
    category: "super_specialty",
    banner_image: "/images/banners/oncology.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Oncology: Clinical oncology consists of three primary disciplines: Medical Oncology, Surgical Oncology, and Radiation Oncology. Our comprehensive cancer care program brings together expert oncologists, surgeons, and support staff to provide world-class cancer treatment.",
    usp_items: [],
    lists: [
      {
        title: "Surgical Oncology",
        highlight: "Services:",
        items: [
          "Head and neck",
          "Thoracic oncology",
          "Sarcomas",
          "Gynaec oncology",
          "Uro oncology",
          "Sentinel lymph node biopsies",
        ],
        image: "/images/departments-images/surgical_oncology.jpeg",
        layout: "image-right",
      },
      {
        title: "Diagnostic Oncology",
        highlight: "Services:",
        items: [
          "CT scan",
          "MRI",
          "Guided Biopsies",
          "Frozen Section",
          "Biochemical Markers",
          "Pathology",
        ],
        image: "/images/departments-images/diagnostic_oncology.jpeg",
        layout: "image-left",
      },
    ],
    meta_title: "Oncology Department | Popular Hospital Varanasi",
    meta_description:
      "Comprehensive cancer care including surgical, medical, and radiation oncology services.",
    sortIndex: 6,
  },
  {
    name: "Urology",
    slug: "urology",
    department_display_name: "Urology",
    category: "super_specialty",
    banner_image: "/images/banners/urology.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Urology is a surgical speciality which deals with diseases of the male and female urinary tract and of the male reproductive organs. Our expert urologists offer a complete range of urological services from minimally invasive procedures to complex reconstructive surgeries.",
    usp_items: [],
    lists: [
      {
        title: "Urological",
        highlight: "Options:",
        items: [
          "Open Surgery",
          "Endo-Urology: PCNI, URS, URSL, TURP, TUR-BT, RIRS",
          "Andrology",
          "Female Urology",
          "Pediatric Urology",
          "Uro-Oncology",
          "Urology Laparoscopy",
        ],
        image: "/images/departments-images/urology.webp",
        layout: "image-right",
      },
      {
        title: "Advanced",
        highlight: "Procedures:",
        items: [
          "Uroflowmetry and Urodynamic study",
          "Flexible Cystoscopy for Diagnostic OPD Cystourethroscopy",
          "Flexible UreterRenoscopy and Laser Lithotripsy/RIRS for Kidney Stones",
          "Laparoscopic treatment for diseases of Kidney, Ureter and Bladder",
          "Reconstructive Surgeries including Laparoscopic Pyeloplasty",
          "Female Urology including VVF Repair, TOT/TVT for Stress Urinary Incontinence",
          "Andrology & Male Infertility including Penile Prosthesis",
        ],
        image: "/images/departments-images/urology_two.webp",
        layout: "image-left",
      },
    ],
    meta_title: "Urology Department | Popular Hospital Varanasi",
    meta_description:
      "Expert urological care including minimally invasive kidney stone treatment, laparoscopic urology, and andrology.",
    sortIndex: 7,
  },
  {
    name: "Burns & Plastic Surgery",
    slug: "burns-plastic-surgery",
    department_display_name: "Burns & Plastic Surgery",
    category: "super_specialty",
    banner_image: "/images/banners/plastic_surgery.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Plastic surgery is a surgical speciality which involves reconstruction, restoration, or alteration of the human body. The Burns & Plastic Surgery department at Popular Hospital provides comprehensive care for burn victims and offers a wide range of reconstructive and aesthetic procedures.",
    usp_items: [],
    lists: [
      {
        title: "Burns",
        highlight: "Classifications & Care:",
        items: [
          "First-degree (superficial) burns - affect only the outer layer of skin",
          "Second-degree (partial thickness) burns",
          "Third-degree (full thickness) burns",
          "Fourth-degree burns (extend beneath the subcutaneous tissues)",
          "We treat burn cases with up to 20% of total body surface area",
        ],
        image: "/images/departments-images/AdobeStock_222372294.jpeg",
        layout: "image-right",
      },
      {
        title: "Plastic Surgery",
        highlight: "Services:",
        items: [
          "Aesthetic plastic surgery",
          "Reconstructive surgery",
          "Craniofacial surgery",
          "Reconstructive microsurgery",
          "Paediatric plastic surgery",
          "Laser surgery",
          "Hand surgery",
          "Lymphatic surgery (Filarial surgery)",
          "Body contouring surgery (LIPOSUCTION)",
          "Breast Reconstruction: Reduction & Augmentation",
          "Genital surgery: Hypospadias, Reconstruction",
          "Peripheral nerve surgery",
          "Burn reconstructive surgery",
          "Sex change surgery",
        ],
        image: "/images/departments-images/plastic_surgery.png",
        layout: "image-left",
      },
      {
        title: "All",
        highlight: "Procedures:",
        items: [
          "Skin Grafting",
          "Flap Surgery",
          "Wound Care & Dressings",
          "Scar Revision",
          "Keloid Treatment",
          "Rhinoplasty (Nose Reshaping)",
          "Blepharoplasty (Eyelid Surgery)",
          "Facelift",
          "Otoplasty (Ear Correction)",
          "Abdominoplasty (Tummy Tuck)",
          "Gynecomastia Surgery",
          "Hair Transplant",
          "Cleft Lip & Palate Repair",
          "Syndactyly Correction",
          "Microsurgical Replantation",
        ],
        layout: "two-col",
      },
    ],
    meta_title: "Burns & Plastic Surgery | Popular Hospital Varanasi",
    meta_description:
      "Expert burns management and plastic surgery including reconstructive, aesthetic, and craniofacial procedures.",
    sortIndex: 8,
  },
  {
    name: "Interventional Radiology",
    slug: "interventional-radiology",
    department_display_name: "Interventional Radiology",
    category: "super_specialty",
    banner_image: "/images/banners/radiology_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Super-Speciality Care",
    description:
      "Interventional Radiology (IR) involves radiology and constitutes a super-speciality, which provides minimally invasive, image guided procedures and services, with reliable diagnosis and treatment. A wide range of diseases that may affect almost any part of the human body may be treated through interventional techniques. The majority of the IR processes take place on a day-care admission basis or as outpatients which helps save hospital stays.",
    usp_items: [
      {
        title: "Daycare / No admission",
        content: "Many procedures can be completed without hospital admission",
      },
      {
        title: "No Scars",
        content:
          "As a minimally invasive approach, it leaves no noticeable scars on the skin. Risks are lower, and pain is generally reduced",
      },
      {
        title: "Less risk / Less complications",
        content:
          "Less pain, Less bleeding. The procedures usually require only a small incision, often the size of a pen tip.",
      },
      {
        title: "Faster recovery",
        content:
          "Most treatments can be done on an outpatient or daycare basis, allowing quick recovery and minimal hospital stay",
      },
      {
        title: "Minimal requirement of General Anesthesia",
        content:
          "Many procedures can be done under local anesthesia or moderate sedation instead of general anesthesia",
      },
      {
        title: "Cost-Effective",
        content:
          "These treatments are typically more affordable than traditional surgical procedures or other alternatives",
      },
    ],
    lists: [
      {
        title: "Who is an Interventional",
        highlight: "Radiologist?",
        items: [
          "An Interventional Radiologist is a physician who uses minimally invasive, image-guided procedures to diagnose and treat disease in nearly every organ system",
          "They use X-ray, MRI, ultrasound, CT, and other imaging to guide their work",
          "Procedures are performed through tiny incisions rather than large surgical cuts",
          "They treat conditions that once required open surgery with much shorter recovery times",
          "Working closely with your primary doctors, they provide a team-based approach to your care",
        ],
        image: "/images/departments-images/radiology.jpeg",
        layout: "image-right",
      },
      {
        title: "Key",
        highlight: "Advantages:",
        items: [
          "Daycare / No admission required for many procedures",
          "No Scars - minimally invasive approach",
          "Less risk and fewer complications than open surgery",
          "Less pain and less bleeding",
          "Faster recovery - outpatient or daycare basis",
          "Minimal requirement of General Anesthesia",
          "Cost-Effective compared to traditional surgery",
          "Image-guided precision for accurate treatment",
          "Suitable for patients who are not candidates for open surgery",
          "Treats conditions across nearly every organ system",
        ],
        layout: "two-col",
      },
      {
        title: "Major Interventional Radiology",
        highlight: "Procedures:",
        items: [
          "Interventions in Liver Disorders",
          "Bleeding from Lungs",
          "Uterine Fibroid Embolization (UFE)",
          "Embolization of Gastrointestinal Bleed",
          "Renal Interventions",
          "Graft Surveillance and Hemodialysis Access",
          "Arteriovenous Malformations",
          "Percutaneous Needle Biopsies / FNAC and Catheter Drainages",
        ],
        image: "/images/departments-images/radiology_scan.png",
        layout: "image-right",
      },
    ],
    meta_title: "Interventional Radiology | Popular Hospital Varanasi",
    meta_description:
      "Minimally invasive image-guided procedures. No scars, faster recovery, cost-effective treatment.",
    sortIndex: 9,
  },
  {
    name: "Pediatric Surgery",
    slug: "pediatric-surgery",
    department_display_name: "Pediatric Surgery",
    category: "super_specialty",
    banner_image: "/images/banners/pediatric_surgery.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "Pediatric Surgery is a specialization in medicine dealing with surgery of infants, children, and adolescents. Our pediatric surgeons are specially trained to handle the unique surgical needs of children, from newborns to teenagers, with the utmost care and precision.",
    usp_items: [],
    lists: [
      {
        title: "Benefits of Pediatric",
        highlight: "Surgery at Popular Hospital:",
        items: [
          "Specially trained pediatric surgeons with expertise in neonatal and childhood conditions",
          "Child-friendly environment designed to reduce anxiety and fear",
          "Minimally invasive laparoscopic techniques for faster recovery",
          "State-of-the-art pediatric OT and ICU facilities",
          "24x7 pediatric surgical emergency services",
          "Dedicated neonatal surgery unit for critical newborns",
          "Comprehensive pre and post-operative pediatric care",
        ],
        image: "/images/departments-images/pediatric_surgery.png",
        layout: "image-right",
      },
      {
        title: "Specialized Surgical",
        highlight: "Areas:",
        items: [
          "Neonatal Surgery - surgical conditions of newborns",
          "Congenital anomaly corrections",
          "Pediatric urology - undescended testis, hypospadias, vesicoureteric reflux",
          "Pediatric oncology surgery",
          "Laparoscopic surgery for appendicitis, pyloric stenosis, intussusception",
          "Thoracic surgery including tracheo-oesophageal fistula repair",
          "Anorectal malformations - Hirschsprung's disease, imperforate anus",
          "Trauma surgery for pediatric injuries",
        ],
        image: "/images/departments-images/pediatric_surgery.avif",
        layout: "image-left",
      },
    ],
    meta_title: "Pediatric Surgery | Popular Hospital Varanasi",
    meta_description:
      "Expert surgical care for children including neonatal surgery, minimally invasive procedures, and trauma care.",
    sortIndex: 10,
  },
  {
    name: "Pediatric Cardiology",
    slug: "pediatric-cardiology",
    department_display_name: "Pediatric Cardiology",
    category: "super_specialty",
    banner_image: "/images/banners/cardiology_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "At Popular Hospital, Varanasi, our Pediatric Cardiology Department is dedicated to providing advanced, compassionate, and child-friendly care to fragile hearts of Neonatal/pediatric patients. Our expert pediatric cardiologists use the latest diagnostic and interventional techniques for the best outcomes.",
    usp_items: [],
    lists: [
      {
        title: "Heart Conditions",
        highlight: "We Treat:",
        items: [
          "Ventricular Septal Defect (VSD)",
          "Atrial Septal Defect (ASD)",
          "Patent Ductus Arteriosus (PDA)",
          "Tetralogy of Fallot (TOF)",
          "Transposition of Great Arteries (TGA)",
          "Pulmonary Stenosis",
          "Aortic Stenosis",
          "Coarctation of Aorta",
          "Ebstein's Anomaly",
          "Arrhythmias in Children",
          "Heart Failure in Children",
          "Kawasaki Disease",
          "Rheumatic Heart Disease",
        ],
        layout: "two-col",
      },
      {
        title: "Cardiac",
        highlight: "Services:",
        items: [
          "Fetal Echocardiography",
          "2D Echocardiography with Colour Doppler",
          "Holter Monitoring",
          "Device Closure of ASD, VSD, PDA",
          "Balloon Valvuloplasty",
          "Pediatric Cardiac Catheterization",
          "Electrophysiology study",
          "Pacemaker implantation in children",
        ],
        layout: "default",
      },
      {
        title: "When to See a",
        highlight: "Pediatric Cardiologist:",
        items: [
          "Heart murmur detected by pediatrician",
          "Cyanosis (bluish discolouration) of lips or fingertips",
          "Rapid breathing or difficulty in breathing",
          "Poor feeding and failure to thrive in newborns",
          "Frequent fainting or loss of consciousness",
          "Chest pain or palpitations in children",
          "Family history of congenital heart disease",
          "Abnormal ECG or chest X-ray",
        ],
        layout: "default",
      },
    ],
    meta_title: "Pediatric Cardiology | Popular Hospital Varanasi",
    meta_description:
      "Specialized cardiac care for children and newborns. Expert pediatric cardiologists and intensivists.",
    sortIndex: 11,
  },

  // ─── SPECIALTIES ─────────────────────────────────────────────────
  {
    name: "Laparoscopy & General Surgery",
    slug: "general-surgery",
    department_display_name: "Laparoscopy & General Surgery",
    category: "specialty",
    banner_image: "/images/banners/genral_surgery.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "The Department of General and Laparoscopic Surgery at Popular Hospital is manned 24x7 by an experienced and dedicated team of consultants. We are specialists in all aspects of general and laparoscopic surgery, with expertise in hernia repair, gallbladder surgery, colorectal surgery, and laser proctology.",
    usp_items: [],
    lists: [
      {
        title: "Surgical",
        highlight: "Services:",
        items: [
          "Abdominal surgeries such as gallbladder excision, advanced laparoscopy appendectomy, intestinal surgery",
          "All kinds of hernias - treated by both open and laparoscopic surgery",
          "LASER Surgery for Fistula, Fissure, Piles & Pilonidal Sinus",
          "Trauma Surgery and care",
          "Stapled Haemorrhoidectomy for piles & prolapse",
          "Tumours - diagnostics and treatment of soft tissues, thyroid, parathyroid, adrenal, breast",
          "Breast lump and abscess",
          "Diseases of the veins such as varicose veins",
        ],
        image: "/images/departments-images/laparoscopic.jpeg",
        layout: "image-left",
      },
      {
        title: "Laparoscopic",
        highlight: "Procedures:",
        items: [
          "Gallstone Disease – Laparoscopic Cholecystectomy",
          "Hernia Laparoscopic/Open Hernia Repair with Mesh",
          "Appendicitis - Laparoscopic Appendectomy",
          "Reflux Disease, Hiatus Hernia – Laparoscopic Repair",
          "Diagnostic Laparoscopy",
          "Thyroid and Parathyroid Tumour – Thyroidectomy/Parathyroidectomy",
          "Piles - Minimally Invasive Surgery/Stapler Surgery",
          "Rectal Prolapse – Laparoscopic Rectopexy",
          "Varicocele Surgery (Laparoscopic/Open)",
          "Vasectomy",
        ],
        image: "/images/departments-images/general_surgery.png",
        layout: "image-right",
      },
    ],
    meta_title: "General Surgery | Popular Hospital Varanasi",
    meta_description:
      "Expert laparoscopic and general surgery including hernia, gallbladder, colorectal, and laser proctology.",
    sortIndex: 12,
  },
  {
    name: "Obstetrics & Gynaecology",
    slug: "gynaecology",
    department_display_name: "Obstetrics & Gynaecology",
    category: "specialty",
    banner_image: "/images/banners/obstetrics_banner.png",
    banner_color: "#831843",
    banner_subtitle: "Centre of Excellence for Women",
    description:
      "The Obstetrics and Gynaecology Department of Popular Hospital offers world level women health care services. We provide comprehensive care from antenatal checkups to high-risk pregnancy management, painless delivery, and advanced gynaecological surgeries.",
    usp_items: [],
    lists: [
      {
        title: "Our",
        highlight: "Facilities:",
        items: [
          "State-of-the-art Labour Room with painless delivery facility",
          "Well-equipped Operation Theatre for obstetric & gynaec surgeries",
          "High-dependency maternity unit for high-risk pregnancies",
          "Advanced diagnostic facilities including colposcopy and hysteroscopy",
          "Dedicated NICU support for premature and sick newborns",
          "24x7 emergency obstetric care",
        ],
        image: "/images/departments-images/obstetrics_facility.jpeg",
        layout: "image-right",
      },
      {
        title: "Obstetric",
        highlight: "Services:",
        items: [
          "Antenatal care",
          "24 hours labour room service",
          "Caesarean Section",
          "Caesarean hysterectomy",
          "Surgery for rupture uterus",
          "Internal Iliac ligation for postpartum haemorrhage",
          "High risk obstetrics",
          "Management of obstetric emergencies including ectopic pregnancy",
        ],
        image: "/images/departments-images/obstetrics.jpeg",
        layout: "image-left",
      },
      {
        title: "Gynaecological",
        highlight: "Services:",
        items: [
          "Family Planning",
          "High Risk Pregnancy",
          "Antenatal & Postnatal Check-ups",
          "Painless Delivery (Normal / Caesarean)",
          "Advanced diagnostic and operative minimal invasive surgeries",
          "All kinds of Gynaecological procedures & surgeries including ovarian cystectomy/hysterectomy",
          "Pap smear/ Colposcopy/ Cervical biopsy/ endometrial biopsy/ Hysteroscopy/ Mammography",
        ],
        image: "/images/departments-images/gynaecology.jpeg",
        layout: "image-right",
      },
    ],
    meta_title: "Obstetrics & Gynaecology | Popular Hospital Varanasi",
    meta_description:
      "Expert women's healthcare including high-risk pregnancy, painless delivery, and advanced gynaecological surgery.",
    sortIndex: 13,
  },
  {
    name: "Pediatrics And Neonatology",
    slug: "pediatrics",
    department_display_name: "Pediatrics And Neonatology",
    category: "specialty",
    banner_image: "/images/banners/neonatology_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Department of",
    description:
      "The Department of Pediatrics and Neonatology promotes the health of children and adolescents with a balanced approach, delivers high quality comprehensive clinical care. The department has a dedicated team of highly qualified Pediatricians and Neonatologists that take care of all babies right from their first breath. We take care of all newborns including very fragile preterm at our state-of-the-art Neonatal Intensive Care unit with utmost commitment.",
    usp_items: [],
    lists: [
      {
        title: "Services",
        highlight: "Offered:",
        items: [
          "Outpatient Services including general check-up, well baby clinic, high risk baby clinic and vaccinations",
          "Emergency Management of all pediatric and neonatal problems, round-the-clock",
          "PICU Services including assisted ventilation, management of severe asthma, seizures, shock",
          "Neonatal resuscitation in LR and OT",
          "Neonatal/Pediatric ventilation, CPAP & oxygen supplementation",
          "Phototherapy & Exchange Blood Transfusion",
          "Surfactant administration including modern LISA technique",
          "Neonatal metabolic & thyroid screening",
          "Peritoneal dialysis",
        ],
        image: "/images/departments-images/pediatrics_nicu.jpeg",
        layout: "image-right",
      },
      {
        title: "Indoor",
        highlight: "Services:",
        items: [
          "Round-the-clock availability of qualified pediatrician on call",
          "Chemotherapy for pediatric cancer patients",
          "Asthma treatment facility",
          "Blood transfusion and chelation facility for thalassemia patients",
          "Only hospital of eastern UP having CRRT facility for Pediatric Patients",
          "GI endoscopy for children",
          "Bronchoscopy for children",
        ],
        image: "/images/departments-images/pediatrics_indoor.jpeg",
        layout: "image-left",
      },
      {
        title: "Department",
        highlight: "Highlights:",
        items: [
          "Only hospital in eastern UP with CRRT (Continuous Renal Replacement Therapy) for pediatric patients",
          "State-of-the-art Level III NICU for premature and critically ill newborns",
          "High Frequency Oscillatory Ventilation (HFOV) available",
          "Dedicated PICU with advanced monitoring",
          "Pediatric endoscopy and bronchoscopy services",
          "Comprehensive vaccination and well-baby services",
          "Expert team of DM Neonatology & Pediatrics faculty",
        ],
        image: "/images/departments-images/pediatrics_highlights.jpeg",
        layout: "image-right",
      },
    ],
    meta_title: "Pediatrics & Neonatology | Popular Hospital Varanasi",
    meta_description:
      "Comprehensive care for children and newborns. Only hospital in eastern UP with CRRT facility for pediatric patients.",
    sortIndex: 14,
  },
  {
    name: "Orthopedics & Joint Replacement",
    slug: "orthopedics",
    department_display_name: "Orthopedics & Joint Replacement",
    category: "specialty",
    banner_image: "/images/banners/orthopedics_banner.png",
    banner_color: "#0b1c43",
    banner_subtitle: "Centre for Bone & Joint Care",
    description:
      "The Orthopedics and Joint Replacement department provides comprehensive care in the field of Orthopedics by experienced and highly skilled surgeons. We specialize in joint replacement surgery, arthroscopy, sports medicine, and spine surgery using the latest minimally invasive techniques.",
    usp_items: [],
    lists: [
      {
        title: "Joint Replacement",
        highlight: "Services:",
        items: [
          "Total Knee Replacement",
          "Partial (Unicondylar) Knee Replacement",
          "Total Hip Replacement",
          "Revision Hip and Knee Replacement",
          "Total Elbow Replacement",
          "Total Shoulder Replacement",
        ],
        layout: "default",
      },
      {
        title: "Arthroscopy &",
        highlight: "Sports Medicine:",
        items: [
          "ACL/PCL Reconstruction",
          "Meniscal Repair",
          "Chondroplasty",
          "Rotator Cuff Repair",
          "SLAP Tear Repair",
          "Sub Acromial Decompression",
        ],
        layout: "default",
      },
      {
        title: "Spine",
        highlight: "Surgeries:",
        items: [
          "Microscopic Discectomy",
          "Spinal Fixation",
          "Lumbar Canal Stenosis Decompression",
          "Correction of Spondylolisthesis",
          "Kyphoplasty",
        ],
        layout: "default",
      },
    ],
    meta_title: "Orthopedics & Joint Replacement | Popular Hospital Varanasi",
    meta_description:
      "Expert orthopedic care including joint replacement, arthroscopy, sports medicine, and spine surgery.",
    sortIndex: 15,
  },
  {
    name: "General Medicine",
    slug: "general-medicine",
    department_display_name: "General Medicine",
    category: "specialty",
    banner_image: "/images/banners/general_medicine.png",
    banner_color: "#1e1b4b",
    banner_subtitle: "Department of",
    description:
      "The department of Medicine initially covered all specialties till super-specialties like Gastroenterology and Nephrology were created. Our experienced physicians provide comprehensive internal medicine care, managing complex medical conditions with a patient-centered approach.",
    usp_items: [],
    lists: [
      {
        title: "Medical",
        highlight: "Services:",
        items: [
          "Diabetes & Endocrinology - management of diabetes mellitus, thyroid disorders, hormonal conditions",
          "Rheumatology - arthritis, autoimmune diseases, connective tissue disorders",
          "HIV Medicine - comprehensive HIV/AIDS care and management",
          "Haematology - blood disorders including anaemia, thalassemia, coagulation disorders",
          "Pulmonology - respiratory diseases, asthma, COPD, interstitial lung diseases",
          "Sleep Medicine - sleep apnoea, insomnia, narcolepsy",
          "Medical Oncology - chemotherapy and supportive cancer care",
          "Intensive Care - critical care medicine and ICU management",
          "Teaching & DNB - academic and post-graduate medical training",
        ],
        layout: "two-col",
      },
    ],
    meta_title: "General Medicine | Popular Hospital Varanasi",
    meta_description:
      "Expert internal medicine and general physician services for all age groups.",
    sortIndex: 16,
  },
  {
    name: "ENT",
    slug: "ent",
    department_display_name: "ENT",
    category: "specialty",
    banner_image: "/images/banners/ent_banner.png",
    banner_color: "#1e1b4b",
    banner_subtitle: "Centre for ENT & Head-Neck Surgery",
    description:
      "The Department of ENT provides a wide range of surgical as well as medical services for the disorders related to ear, nose & throat. The highly skilled team of ENT specialists uses the latest equipments and technologies to perform endoscopic nasal surgeries, ear and all types of routine & complex treatments.",
    usp_items: [],
    lists: [
      {
        title: "Common Diseases and",
        highlight: "Conditions:",
        items: [
          "Hearing Defects Ear Infections",
          "Ear Drum perforations",
          "Throat Infections",
          "Tonsil infection",
          "Nasal Polyps",
          "Nasal bleeding / Nasal Allergy and infections",
        ],
        image: "/images/departments-images/ent_diseases.png",
        layout: "image-right",
      },
      {
        title: "What we",
        highlight: "offer:",
        items: [
          "Prescription of hearing aids",
          "Tympanoplasty / for ear drum perforations",
          "Tonsillectomy / Removal of tonsil",
          "Polypectomy / Removal of Nasal Polyps",
          "Adenotonsillectomy",
          "Mastoidectomy",
          "Septoplasty",
          "CSF Rhinorrhoea repair",
          "Foreign body removal",
        ],
        image: "/images/departments-images/ent_treatment.png",
        layout: "image-left",
      },
    ],
    meta_title: "ENT Department | Popular Hospital Varanasi",
    meta_description:
      "Expert ear, nose, and throat care including endoscopic sinus surgery, tonsillectomy, and hearing restoration.",
    sortIndex: 17,
  },
  {
    name: "Dietetics & Nutrition",
    slug: "dietetics-nutrition",
    department_display_name: "Dietetics & Nutrition",
    category: "specialty",
    banner_image: "/images/banners/dietetics_nutrition.png",
    banner_color: "#064e3b",
    banner_subtitle: "Nourishing Health Professionally",
    description:
      "At Popular Hospital, Varanasi, our Department of Dietetics and Nutrition is dedicated to improving overall health and accelerating recovery through personalized, science-based nutritional strategies. We believe that proper nutrition is a cornerstone of medical treatment and disease prevention, playing a crucial role in healing and maintaining a high quality of life.\n\nLed by Dt. Sakshi Pandey, an expert in Food Science and Clinical Nutrition, our department offers comprehensive dietary management customized to each patient's unique medical history, lifestyle, and health goals. From weight management to complex therapeutic diets, we provide evidence-based guidance to help you make sustainable and healthy food choices.",
    usp_items: [],
    lists: [
      {
        title: "Therapeutic",
        highlight: "Diets:",
        items: [
          "Renal Care Diet",
          "Cardiac Health Diet",
          "Post-Surgery Recovery",
          "Gastrointestinal Support",
        ],
        layout: "default",
      },
      {
        title: "Wellness",
        highlight: "Programs:",
        items: [
          "Antenatal Nutrition",
          "Elderly Care Diet",
          "Sports Nutrition",
          "General Fitness Plan",
        ],
        layout: "default",
      },
      {
        title: "Specialized",
        highlight: "Plans:",
        items: [
          "Gluten-Free Diet",
          "Ketogenic (Medically Supervised)",
          "High Protein Diet",
          "Low Sodium Diet",
        ],
        layout: "default",
      },
    ],
    meta_title: "Dietetics & Nutrition | Popular Hospital Varanasi",
    meta_description:
      "Personalized dietary counseling and clinical nutrition therapy for all health conditions.",
    sortIndex: 18,
  },
  {
    name: "Ophthalmology",
    slug: "ophthalmology",
    department_display_name: "Ophthalmology",
    category: "specialty",
    banner_image: "/images/banners/ophthalmology_banner.png",
    banner_color: "#0f172a",
    banner_subtitle: "Department of",
    description:
      "The Ophthalmology Department is designed to provide a comprehensive range of medical and surgical eye care to the patients of all age groups. Our expert ophthalmologists use the latest technology for diagnosis and treatment of all eye conditions.",
    usp_items: [],
    lists: [
      {
        title: "Outpatient",
        highlight: "Procedures:",
        items: [
          "Computerised Eye Testing",
          "Treatment for Glaucoma",
          "Diagnostic Services & Eye Examination",
          "Preventive Eye Check up",
          "Computer Vision Syndrome (CVS)",
          "Glaucoma Investigations",
          "Refraction",
          "Colour Vision",
        ],
        layout: "two-col",
      },
      {
        title: "Specialised",
        highlight: "Programmes:",
        items: [
          "Computerised Eye Testing / Preventive Eye Check-up",
          "Glaucoma Clinic",
          "Stitchless Cataract Surgery (Phacoemulsification)",
          "Cornea & External Eye Disease",
          "Paediatric Ophthalmology",
          "Neuro-Ophthalmology",
          "Oculoplasty & Tumours",
        ],
        image: "/images/departments-images/ophthalmology_advance.jpg",
        layout: "image-right",
      },
    ],
    meta_title: "Ophthalmology Department | Popular Hospital Varanasi",
    meta_description:
      "Comprehensive eye care including cataract surgery, glaucoma treatment, and paediatric ophthalmology.",
    sortIndex: 19,
  },
  {
    name: "Dental",
    slug: "dental",
    department_display_name: "Dental",
    category: "specialty",
    banner_image: "/images/banners/dental_care_banner.png",
    banner_color: "#0e7490",
    banner_subtitle: "Department of",
    description:
      "The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. This multi sphere dental unit with a high quality, specialized dental care with excellence and comfort soothing atmosphere for patients will offer the full range of services as follows:",
    usp_items: [],
    lists: [
      {
        title: "Oral and Maxillofacial",
        highlight: "Surgery:",
        items: [
          "Ranging from removal of impacted teeth to fixation of facial fractures to Jaw corrective surgeries.",
          "Prosthodontics",
          "Complete rehabilitation of occlusion including maxillofacial Prosthetics.",
          "Orthodontics and Dentofacial Orthopaedics",
          "Alignment of crowded teeth",
          "Pediatric dentistry",
          "Child dentistry is emphasized to condense the incidence of dental ailments in adults.",
          "Periodontics",
          "Services such as to strengthen the Gums, Gingival Flap Surgeries, bone Grafts, Depigmentation, Frenectomy etc",
        ],
        layout: "default",
      },
      {
        title: "Digital Radiological",
        highlight: "Support:",
        items: [
          "Cordless Digital Intra Oral Periapical Radiographs",
          "Orthopantomograph (OPG) for full mouth panoramic X-ray",
          "Dentascan for 3D imaging of the jaws and teeth",
          "Craniofacial Surgeries done in collaboration with department of plastic surgery",
        ],
        image: "/images/departments-images/root-canal-treatment.jpg",
        layout: "image-left",
      },
    ],
    meta_title: "Dental Department | Popular Hospital Varanasi",
    meta_description:
      "Comprehensive dental care including oral surgery, orthodontics, prosthodontics, and paediatric dentistry.",
    sortIndex: 20,
  },
  {
    name: "Respiratory Medicine",
    slug: "respiratory",
    department_display_name: "Respiratory Medicine",
    category: "specialty",
    banner_image: "/images/banners/respiratory_medicine.png",
    banner_color: "#164e63",
    banner_subtitle: "Centre for Advanced Pulmonology",
    description:
      "Our Respiratory Medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Our expert pulmonologists use the latest diagnostic and therapeutic techniques to manage all respiratory conditions.",
    usp_items: [],
    lists: [
      {
        title: "Scope of",
        highlight: "Treatment:",
        items: [
          "Asthma & Difficult Asthma",
          "Allergy",
          "COPD (Chronic Obstructive Pulmonary Disease)",
          "ILD (Interstitial Lung Disease) & Rehabilitation",
          "Severe Pneumonia",
          "Complicated Lung Infection",
          "Bronchoscopy - Rigid & Flexible",
          "Thoracoscopy",
          "EBUS",
          "Sleep Medicine",
          "Pleural Catheter",
          "TB / Post TB Sequelae",
          "Respiratory Critical Care",
        ],
        layout: "two-col",
      },
      {
        title: "Why Choose Popular Hospital",
        highlight: "for Respiratory Care?",
        items: [
          "Expert team of DM Pulmonology qualified specialists",
          "Advanced bronchoscopy suite including EBUS and Cryobiopsy",
          "State-of-the-art Sleep Lab for diagnosis of sleep disorders",
          "Interventional pulmonology procedures",
          "Dedicated respiratory ICU with advanced ventilators",
          "Comprehensive pulmonary function testing (PFT) lab",
          "Multidisciplinary approach for ILD and complex lung diseases",
        ],
        layout: "default",
      },
    ],
    meta_title: "Respiratory Medicine | Popular Hospital Varanasi",
    meta_description:
      "Expert pulmonology care including asthma, COPD, sleep disorders, and interventional bronchoscopy.",
    sortIndex: 21,
  },
  {
    name: "Pain Medicine",
    slug: "pain-management",
    department_display_name: "Pain Medicine",
    category: "specialty",
    banner_image: "/images/banners/pain_management_banner.png",
    banner_color: "#334155",
    banner_subtitle: "Department of",
    description:
      "Pain Management services available only in few Medical Colleges, Major Cancer hospitals and corporate hospitals. Popular Hospital is proud to offer this specialized service, providing relief from chronic and acute pain conditions using the latest interventional techniques.",
    usp_items: [],
    lists: [
      {
        title: "Conditions",
        highlight: "We Treat:",
        items: [
          "Trigeminal Neuralgia - severe facial pain",
          "Cancer Pain - palliative pain relief",
          "Back Pain - chronic lower back and neck pain",
          "Neuropathic Pain - nerve damage related pain",
          "Arthritis Pain - joint and musculoskeletal pain",
          "Post-surgical pain management",
          "Headache and migraine management",
          "Complex Regional Pain Syndrome (CRPS)",
          "Fibromyalgia",
          "Phantom Limb Pain",
        ],
        layout: "two-col",
      },
      {
        title: "Interventional Pain",
        highlight: "Procedures:",
        items: [
          "Platelet Rich Plasma (PRP) Therapy",
          "Nerve Blocks - epidural, facet, peripheral",
          "Radiofrequency Ablation (RFA)",
          "Spinal Cord Stimulation",
          "Intrathecal Drug Delivery System",
          "Trigger Point Injections",
          "Joint Injections",
          "Ganglion Impar Block for pelvic pain",
          "Celiac Plexus Block for cancer pain",
          "Botulinum Toxin Injections",
        ],
        layout: "default",
      },
    ],
    meta_title: "Pain Medicine | Popular Hospital Varanasi",
    meta_description:
      "Expert pain management using interventional techniques for chronic and acute pain conditions.",
    sortIndex: 22,
  },
  {
    name: "Psychiatry Department",
    slug: "psychiatry",
    department_display_name: "Psychiatry Department",
    category: "specialty",
    banner_image: "/images/banners/psychiatry_banner.png",
    banner_color: "#2e1065",
    banner_subtitle: "Compassionate Mental Healthcare",
    description:
      "Welcome to the Psychiatry Department at Popular Hospital, Varanasi! Our expert team of psychiatrists and psychologists is devoted to providing comprehensive mental health care with compassion and dignity.",
    usp_items: [],
    lists: [
      {
        title: "Conditions",
        highlight: "Treated:",
        items: [
          "Schizophrenia",
          "Bipolar disorder",
          "Depression",
          "Obsessive Compulsive Disorder",
          "Personality disorders",
          "Anxiety disorder",
          "Substance abuse disorder",
          "Sexual Disorders",
          "Behavioural Addiction",
          "Disorders in children and adolescents - autism, ADHD, conduct disorder, etc.",
        ],
        layout: "two-col",
      },
      {
        title: "Therapy",
        highlight: "Services:",
        items: [
          "Individual Psychotherapy",
          "Cognitive Behaviour Therapy (CBT)",
          "Family Therapy",
          "Group Therapy",
          "De-addiction and Rehabilitation services",
          "Child & Adolescent Psychiatry",
          "Geriatric Psychiatry",
          "Electroconvulsive Therapy (ECT)",
        ],
        layout: "default",
      },
    ],
    meta_title: "Psychiatry Department | Popular Hospital Varanasi",
    meta_description:
      "Comprehensive mental health care including treatment for depression, anxiety, schizophrenia, and addiction.",
    sortIndex: 23,
  },
];

async function seed() {
  await mongoose.connect(
    process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/popular-hospital",
  );
  console.log("✅ Connected to MongoDB");

  let created = 0;
  let updated = 0;

  for (const dept of departments) {
    const existing = await Speciality.findOne({ slug: dept.slug });
    if (existing) {
      await Speciality.updateOne(
        { slug: dept.slug },
        {
          $set: {
            category: dept.category,
            banner_image: dept.banner_image,
            banner_color: dept.banner_color,
            banner_subtitle: dept.banner_subtitle,
            description: dept.description,
            usp_items: dept.usp_items,
            lists: dept.lists,
            meta_title: dept.meta_title,
            meta_description: dept.meta_description,
            sortIndex: dept.sortIndex,
            department_display_name: dept.department_display_name,
          },
        },
      );
      console.log(`  ↺ Updated: ${dept.name}`);
      updated++;
    } else {
      await Speciality.create(dept);
      console.log(`  ✚ Created: ${dept.name}`);
      created++;
    }
  }

  console.log(`\n🎉 Seed complete! Created: ${created}, Updated: ${updated}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
