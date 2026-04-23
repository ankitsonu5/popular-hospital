"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "Preventive Checkups",
    icon: "clipboard",
    desc: "Comprehensive health screening packages for all ages.",
  },
  {
    title: "Chronic Care",
    icon: "activity",
    desc: "Expert management of Diabetes, Hypertension & Obesity.",
  },
  {
    title: "Infectious Diseases",
    icon: "shield",
    desc: "Specialized treatment for viral and bacterial infections.",
  },
  {
    title: "Geriatric Care",
    icon: "user",
    desc: "Compassionate healthcare for our elderly patients.",
  },
];

const medicalServices = [
  {
    title: "Diabetes Mellitus &",
    highlight: "Endocrinology",
    content:
      "The department has experienced consultant who supervises comprehensive assessment of Type I & Type II diabetes patients for micro vascular and macro vascular complications. The work-up includes glycosylated haemoglobin (HbA1c), 24 hour urinary proteins and creatinine clearance, nerve conduction velocities (NCV), echocardiography and carotid intimal thickness. Newer insulin analogues and oral antidiabetics are used with an emphasis on prevention, early detection and control of complications.",
  },
  {
    title: "Rheumatology",
    highlight: "",
    content:
      "The department of Rheumatology & Clinical Immunology runs a rheumatology OPD with advanced laboratory back-up geared to diagnose and treat rheumatological problems such as rheumatoid arthritis, systemic lupus erythematosus, progressive systemic sclerosis, sero negative spondyloarthropathy etc. Joint aspirations and intra articular injections are given on an outpatient basis. A large number of patients are on disease modifying antirheumatic drugs (DMARDS) with good results.",
  },
  {
    title: "HIV &",
    highlight: "AIDS Care",
    content:
      "HIV positive and AIDS patients are treated in the hospital with utmost care and confidentiality. CD4 counts and viral loads are available for diagnosis and managing opportunistic infections. The department is guided by National AIDS Control Organization (NACO) guidelines for antiretroviral therapy and holistic management of patients.",
  },
  {
    title: "Clinical",
    highlight: "Haematology",
    content:
      "The department of haematology is experienced in diagnosing and managing various blood disorders including nutritional and haemolytic anaemias, haemoglobinopathies, and myelodysplastic syndromes. Bone marrow aspirations and biopsies are being routinely carried out at the bed side. Clinical haematology is backed by haematology laboratory.",
  },
  {
    title: "Pulmonology",
    highlight: "",
    content:
      "The department of Pulmonology has a senior pulmonologist with his team. It is equipped with the latest machines to carry out various pulmonary function tests and has expertise in giving respiratory support with different modes and equipment. Fibreoptic bronchoscopy and transbronchial biopsies are also done.",
  },
  {
    title: "Sleep",
    highlight: "Medicine",
    content:
      "The department of Sleep Medicine is equipped with a two-bed sleep centre with a polysomnographic machine. Investigations and management of patients suffering from sleep apnoea syndrome and other sleep disorders are carried out.",
  },
  {
    title: "Oncology",
    highlight: "",
    content:
      "The department of Oncology has an experienced consultant and has a day care centre to give short term chemotherapy. The Oncology department along with department of Surgery, ENT and Gynecology organizes free cancer detection camps in different parts of North India. The Oncology department gives highly specialized chemotherapy for haematology and solid tumors. The department is also undertaking bone marrow transplants.",
  },
  {
    title: "Intensive",
    highlight: "Care",
    content:
      "Since time is crucial for patients with life threatening infections (septicaemia), the department has a back-up of microbiology with its rapid diagnostic culture techniques (BacT/Alert) which help in the management of patients. Sick patients are treated in the ICU where there are critical care specialists (including anesthetists) who coordinate with the medicine department utilizing state of the art equipment such as respirators, cardiac monitors, pulse oximeters and defibrillators. Assessment of patients and their efficient monitoring is done with advanced blood gas analysers.",
  },
  {
    title: "Teaching /",
    highlight: "DNB",
    content:
      "The department runs an active teaching programme for the Diplomate National Board postgraduates. All consultants of the Department of Internal Medicine as well as of allied specialties participate actively in the teaching activities. In the post graduate teaching programme the emphasis is on training in services, besides this, regular clinical demonstrations are conducted. Every week clinical meetings and journal review meetings are held alternately. At a given time, there are six postgraduate students in medicine and there is high success rate in the final Diplomate National Board Examination.",
  },
];

const doctors = [
  {
    name: "Dr. K.P Singh",
    qualifications:
      "MBBS, MD, (Respiratory Medicine) Dip. Card MNCCP, MICS, MICAI, MIES, MERS",
    designation: "Senior Consultant Pulmonologist",
    slug: "dr-kp-singh",
    image: "/images/departments_doctor/dr_k_p_singh.png",
  },
  {
    name: "Dr. P.K Tiwari",
    qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Senior Consultant Physician",
    slug: "dr-pk-tiwari",
    image: "",
  },
  {
    name: "Dr. Sandesh M Raykar",
    qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Consultant Physician",
    slug: "dr-sandesh-m-raykar",
    image: "/images/departments_doctor/dr_sandesh_m_raykar.jpg",
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#1e1b4b] font-heading leading-tight">
      {title} <span className="text-indigo-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-indigo-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

/* ─── Page ─── */

export default function GeneralMedicineClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#1e1b4b] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/general_medicine.png"
            alt="General Medicine Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#1e1b4b]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-semibold mb-6 border border-indigo-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              General <br />
              <span className="text-indigo-400">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="General Medicine"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR (Grid Based like Uploaded Image) ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="General Medicine"
              />
              <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-16 font-medium text-justify">
                <div className="bg-indigo-50/50 p-6 rounded-xl border-l-4 border-indigo-600">
                  <p>
                    The department of Medicine initially covered all specialties
                    till super-specialties like Gastroenterology and Nephrology
                    were created, to which Neurology was added and are now
                    working as full-fledged departments. The department
                    continues to have specialties such as Oncology, Respiratory
                    and Sleep Medicine and Endocrinology. It has consultants who
                    are capable of diagnosing and treating complicated medical
                    problem in the fields of diabetes, rheumatology, clinical
                    haematology, medical oncology, infectious diseases, HIV and
                    AIDS and primary immunological disorders.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Doctor Sidebar ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="General Medicine"
                />
              </div>
            </div>
          </div>

          {/* ── Medical Services Sections ── */}
          <div className="mt-20 space-y-16 border-t border-gray-100 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
              {medicalServices.map((service, idx) => (
                <div key={idx} className="animate-fade-in group">
                  <SectionHeader
                    title={service.title}
                    highlight={service.highlight}
                  />
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-100 rounded-full group-hover:bg-indigo-600 transition-colors" />
                    <p className="text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed text-justify font-medium pl-2">
                      {service.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
