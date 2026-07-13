"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ClipboardCheck,
  Activity,
  Shield,
  Users,
  Stethoscope,
  Droplet,
  Wind,
  Moon,
  Dna,
  HeartPulse,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const featuresList = [
  {
    title: "Preventive Checkups",
    icon: ClipboardCheck,
    desc: "Comprehensive health screening packages for all ages.",
  },
  {
    title: "Chronic Care",
    icon: Activity,
    desc: "Expert management of Diabetes, Hypertension & Obesity.",
  },
  {
    title: "Infectious Diseases",
    icon: Shield,
    desc: "Specialized treatment for viral and bacterial infections.",
  },
  {
    title: "Geriatric Care",
    icon: Users,
    desc: "Compassionate healthcare for our elderly patients.",
  },
];

const medicalServices = [
  {
    id: "diabetes",
    title: "Diabetes Mellitus & Endocrinology",
    shortTitle: "Diabetes & Endocrinology",
    icon: Activity,
    content:
      "The department has experienced consultants who supervise comprehensive assessment of Type I & Type II diabetes patients for microvascular and macrovascular complications. The work-up includes glycosylated haemoglobin (HbA1c), 24-hour urinary proteins and creatinine clearance, nerve conduction velocities (NCV), echocardiography, and carotid intimal thickness. Newer insulin analogues and oral antidiabetics are used with an emphasis on prevention, early detection, and control of complications.",
  },
  {
    id: "rheumatology",
    title: "Rheumatology & Joint Immunology",
    shortTitle: "Rheumatology",
    icon: Stethoscope,
    content:
      "The department of Rheumatology & Clinical Immunology runs a rheumatology OPD with advanced laboratory back-up geared to diagnose and treat rheumatological problems such as rheumatoid arthritis, systemic lupus erythematosus, progressive systemic sclerosis, sero-negative spondyloarthropathy etc. Joint aspirations and intra-articular injections are given on an outpatient basis. A large number of patients are on disease-modifying antirheumatic drugs (DMARDs) with good results.",
  },
  {
    id: "hiv-aids",
    title: "HIV & AIDS Confidential Care",
    shortTitle: "HIV & AIDS Care",
    icon: Shield,
    content:
      "HIV positive and AIDS patients are treated in the hospital with utmost care and confidentiality. CD4 counts and viral loads are available for diagnosis and managing opportunistic infections. The department is guided by National AIDS Control Organization (NACO) guidelines for antiretroviral therapy and holistic management of patients.",
  },
  {
    id: "haematology",
    title: "Clinical Haematology Laboratory",
    shortTitle: "Clinical Haematology",
    icon: Droplet,
    content:
      "The department of haematology is experienced in diagnosing and managing various blood disorders including nutritional and haemolytic anaemias, haemoglobinopathies, and myelodysplastic syndromes. Bone marrow aspirations and biopsies are being routinely carried out at the bedside. Clinical haematology is backed by a fully equipped haematology laboratory.",
  },
  {
    id: "pulmonology",
    title: "Pulmonology & Chest Care",
    shortTitle: "Pulmonology",
    icon: Wind,
    content:
      "The department of Pulmonology has a senior pulmonologist with his team. It is equipped with the latest machines to carry out various pulmonary function tests and has expertise in giving respiratory support with different modes and equipment. Fibreoptic bronchoscopy and transbronchial biopsies are also done routinely.",
  },
  {
    id: "sleep-medicine",
    title: "Sleep Medicine Centre",
    shortTitle: "Sleep Medicine",
    icon: Moon,
    content:
      "The department of Sleep Medicine is equipped with a two-bed sleep centre with a polysomnographic machine. Investigations and management of patients suffering from sleep apnoea syndrome and other sleep disorders are carried out by our sleep specialists.",
  },
  {
    id: "oncology",
    title: "Medical Oncology & Chemotherapy",
    shortTitle: "Oncology",
    icon: Dna,
    content:
      "The department of Oncology has an experienced consultant and has a day care centre to give short term chemotherapy. The Oncology department along with department of Surgery, ENT and Gynecology organizes free cancer detection camps in different parts of North India. The Oncology department gives highly specialized chemotherapy for haematology and solid tumors. The department is also undertaking bone marrow transplants.",
  },
  {
    id: "intensive-care",
    title: "Intensive Care & Critical Support",
    shortTitle: "Intensive Care",
    icon: HeartPulse,
    content:
      "Since time is crucial for patients with life threatening infections (septicaemia), the department has a back-up of microbiology with its rapid diagnostic culture techniques (BacT/Alert) which help in the management of patients. Sick patients are treated in the ICU where there are critical care specialists (including anesthetists) who coordinate with the medicine department utilizing state of the art equipment such as respirators, cardiac monitors, pulse oximeters and defibrillators. Assessment of patients and their efficient monitoring is done with advanced blood gas analysers.",
  },
  {
    id: "teaching-dnb",
    title: "Teaching & DNB Programmes",
    shortTitle: "Teaching / DNB",
    icon: GraduationCap,
    content:
      "The department runs an active teaching programme for the Diplomate National Board postgraduates. All consultants of the Department of Internal Medicine as well as of allied specialties participate actively in the teaching activities. In the post graduate teaching programme the emphasis is on training in services, besides this, regular clinical demonstrations are conducted. Every week clinical meetings and journal review meetings are held alternately. At a given time, there are six postgraduate students in medicine and there is high success rate in the final Diplomate National Board Examination.",
  },
];

const doctors = [
  {
    name: "Dr. P.K Tiwari",
    qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Senior Consultant Physician",
    slug: "dr-p-k-tiwari",
    image: "/images/departments_doctor/dr_pk_tiwari.jpg",
  },
  {
    name: "Dr. Sandesh M Raykar",
    qualifications: "MBBS, MD (Internal Medicine) IMS, BHU",
    designation: "Consultant Physician",
    slug: "dr-sandesh-m-raykar",
    image: "/images/departments_doctor/dr_sandesh_m_raykar.jpg",
  },
];

/* ─── Page ─── */

export default function GeneralMedicineClient() {
  const [activeTab, setActiveTab] = useState("diabetes");

  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO (UNCHANGED LAYOUT) ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/general_medicine.png"
            alt="General Medicine Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre of Internal Medicine
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              General
              <br />
              <span className="text-blue-300">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
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

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase">
                  Introduction
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-10 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                    Department of{" "}
                    <span className="text-[#1e3a8a]">General Medicine</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="space-y-6">
                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-8 shadow-sm">
                  <span className="absolute -top-3 -left-3 text-blue-200 text-6xl font-serif pointer-events-none">
                    “
                  </span>
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15.5px] font-semibold italic relative z-10">
                    The department of Medicine initially covered all specialties
                    till super-specialties like Gastroenterology and Nephrology
                    were created, to which Neurology was added and are now
                    working as full-fledged departments.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium text-justify">
                  The department continues to have specialties such as Oncology,
                  Respiratory and Sleep Medicine and Endocrinology. It has
                  consultants who are capable of diagnosing and treating
                  complicated medical problems in the fields of diabetes,
                  rheumatology, clinical haematology, medical oncology,
                  infectious diseases, HIV and AIDS and primary immunological
                  disorders.
                </p>
              </div>
            </div>

            {/* Right Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="General Medicine"
                  exactMatchOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FLOATING FEATURES STRIP ═══════ */}
      <section className="bg-[#0b1c43] py-16 border-t border-blue-900/60 relative overflow-hidden">
        {/* Glow elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresList.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col gap-3 p-6 border border-blue-800/60 bg-blue-950/40 rounded-3xl hover:bg-blue-900/40 hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-extrabold text-sm group-hover:text-blue-300 transition-colors duration-250 mt-1">
                    {feat.title}
                  </h3>
                  <p className="text-blue-200 text-xs font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ MEDICAL SERVICES (INTERACTIVE TABS SYSTEM) ═══════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          {/* Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
              Areas of Care
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
              Medical <span className="text-[#1e3a8a]">Specialties</span>
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-indigo-650 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left — Navigation Buttons */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none sticky top-24">
              {medicalServices.map((service) => {
                const Icon = service.icon;
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 border text-left whitespace-nowrap lg:whitespace-normal w-fit lg:w-full ${
                      isActive
                        ? "bg-[#1e3a8a] text-white border-transparent shadow-lg shadow-blue-500/20 scale-[1.01]"
                        : "bg-white hover:bg-slate-50 text-gray-700 border-slate-200 hover:border-blue-200"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                        isActive
                          ? "bg-white/20 text-white border-transparent"
                          : "bg-blue-50 text-[#1e3a8a] border-blue-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{service.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Right — Active Service Card */}
            <div className="lg:col-span-8">
              {medicalServices.map((service) => {
                if (service.id !== activeTab) return null;
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-xl transition-all duration-500 min-h-[360px] flex flex-col justify-between animate-fade-in"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100 shadow-inner">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-blue-500 text-xs font-bold uppercase tracking-wider block">
                            Specialty Service
                          </span>
                          <h3 className="text-xl md:text-2xl font-extrabold text-[#0b1c43] tracking-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-650 leading-relaxed text-sm md:text-base font-semibold text-justify">
                        {service.content}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                          Supervised Clinical Care
                        </span>
                      </div>
                      <Link
                        href="/book"
                        className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a] hover:text-[#0b1c43] transition-colors"
                      >
                        <span>Schedule a Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
