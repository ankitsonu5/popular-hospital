'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  { title: "Preventive Checkups", icon: "clipboard", desc: "Comprehensive health screening packages for all ages." },
  { title: "Chronic Care", icon: "activity", desc: "Expert management of Diabetes, Hypertension & Obesity." },
  { title: "Infectious Diseases", icon: "shield", desc: "Specialized treatment for viral and bacterial infections." },
  { title: "Geriatric Care", icon: "user", desc: "Compassionate healthcare for our elderly patients." },
];

const medicalServices = [
  {
    title: "Diabetes Mellitus &",
    highlight: "Endocrinology",
    content: "The department has experienced consultant who supervises comprehensive assessment of Type I & Type II diabetes patients for micro vascular and macro vascular complications. The work-up includes glycosylated haemoglobin (HbA1c), 24 hour urinary proteins and creatinine clearance, nerve conduction velocities (NCV), echocardiography and carotid intimal thickness. Newer insulin analogues and oral antidiabetics are used with an emphasis on prevention, early detection and control of complications.",
  },
  {
    title: "Rheumatology",
    highlight: "",
    content: "The department of Rheumatology & Clinical Immunology runs a rheumatology OPD with advanced laboratory back-up geared to diagnose and treat rheumatological problems such as rheumatoid arthritis, systemic lupus erythematosus, progressive systemic sclerosis, sero negative spondyloarthropathy etc. Joint aspirations and intra articular injections are given on an outpatient basis. A large number of patients are on disease modifying antirheumatic drugs (DMARDS) with good results.",
  },
  {
    title: "HIV &",
    highlight: "AIDS Care",
    content: "HIV positive and AIDS patients are treated in the hospital with utmost care and confidentiality. CD4 counts and viral loads are available for diagnosis and managing opportunistic infections. The department is guided by National AIDS Control Organization (NACO) guidelines for antiretroviral therapy and holistic management of patients.",
  },
  {
      title: "Clinical",
      highlight: "Haematology",
      content: "The department of haematology is experienced in diagnosing and managing various blood disorders including nutritional and haemolytic anaemias, haemoglobinopathies, and myelodysplastic syndromes. Bone marrow aspirations and biopsies are being routinely carried out at the bed side. Clinical haematology is backed by haematology laboratory.",
  },
  {
    title: "Pulmonology",
    highlight: "",
    content: "The department of Pulmonology has a senior pulmonologist with his team. It is equipped with the latest machines to carry out various pulmonary function tests and has expertise in giving respiratory support with different modes and equipment. Fibreoptic bronchoscopy and transbronchial biopsies are also done.",
  },
  {
    title: "Sleep",
    highlight: "Medicine",
    content: "The department of Sleep Medicine is equipped with a two-bed sleep centre with a polysomnographic machine. Investigations and management of patients suffering from sleep apnoea syndrome and other sleep disorders are carried out.",
  },
  {
    title: "Oncology",
    highlight: "",
    content: "The department of Oncology has an experienced consultant and has a day care centre to give short term chemotherapy. The Oncology department along with department of Surgery, ENT and Gynecology organizes free cancer detection camps in different parts of North India. The Oncology department gives highly specialized chemotherapy for haematology and solid tumors. The department is also undertaking bone marrow transplants.",
  },
  {
    title: "Intensive",
    highlight: "Care",
    content: "Since time is crucial for patients with life threatening infections (septicaemia), the department has a back-up of microbiology with its rapid diagnostic culture techniques (BacT/Alert) which help in the management of patients. Sick patients are treated in the ICU where there are critical care specialists (including anesthetists) who coordinate with the medicine department utilizing state of the art equipment such as respirators, cardiac monitors, pulse oximeters and defibrillators. Assessment of patients and their efficient monitoring is done with advanced blood gas analysers.",
  },
  {
    title: "Teaching /",
    highlight: "DNB",
    content: "The department runs an active teaching programme for the Diplomate National Board postgraduates. All consultants of the Department of Internal Medicine as well as of allied specialties participate actively in the teaching activities. In the post graduate teaching programme the emphasis is on training in services, besides this, regular clinical demonstrations are conducted. Every week clinical meetings and journal review meetings are held alternately. At a given time, there are six postgraduate students in medicine and there is high success rate in the final Diplomate National Board Examination.",
  }
];

const doctors = [
  {
    name: 'Dr. Medicine Specialist',
    qualifications: 'MBBS, MD (General Medicine)',
    designation: 'Sr. Consultant',
    slug: 'dr-medicine-specialist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#1e1b4b] font-heading leading-tight">
      {title} <span className="text-indigo-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-indigo-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'clipboard' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
    {icon === 'activity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
    {icon === 'user' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
  </svg>
);

/* ─── Page ─── */

export default function GeneralMedicineClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#1e1b4b] overflow-hidden">
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
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-semibold mb-6 border border-indigo-400/30 backdrop-blur-sm">
                Department of General Medicine
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Internal Medicine <br />
              <span className="text-indigo-400">& Diagnostics</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR (Grid Based like Uploaded Image) ═══════ */}
      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="General Medicine" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-16 font-medium text-justify">
                <div className="bg-indigo-50/50 p-6 rounded-xl border-l-4 border-indigo-600">
                  <p>
                    The department of Medicine initially covered all specialties till super-specialties like Gastroenterology and Nephrology were created, to which Neurology was added and are now working as full-fledged departments. The department continues to have specialties such as Oncology, Respiratory and Sleep Medicine and Endocrinology. It has consultants who are capable of diagnosing and treating complicated medical problem in the fields of diabetes, rheumatology, clinical haematology, medical oncology, infectious diseases, HIV and AIDS and primary immunological disorders.
                  </p>
                </div>
              </div>

              {/* Loop through transcribed sections from the image */}
              <div className="space-y-16">
                {medicalServices.map((service, idx) => (
                  <div key={idx} className="animate-fade-in group">
                    <SectionHeader title={service.title} highlight={service.highlight} />
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify font-medium">
                      {service.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Doctor Sidebar ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden h-[480px]">
                      <div className="w-full h-full p-6 pt-12 flex flex-col items-center">
                        <div className="relative w-full h-[320px] rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                            <Image
                              src={doctors[0].image}
                              alt={doctors[0].name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                            />
                             <Link
                              href={`/doctors/${doctors[0].slug}`}
                              className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-indigo-600 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-indigo-700 mb-1 font-heading">{doctors[0].name}</h3>
                            <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doctors[0].qualifications}</p>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#1e1b4b] rounded-2xl md:rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 20 50 20 100 100 Z" fill="white" />
                </svg>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block bg-indigo-500/20 text-indigo-100 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-indigo-400/20 uppercase tracking-widest">
                Partner in your medical journey
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Listening to Your Body <br className="hidden md:block" /> Healing with Expertise
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                <Link
                  href="/doctors"
                  className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+917800001895"
                  className="bg-transparent border-2 border-indigo-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  +91-7800001895 / 96
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}


