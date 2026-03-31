"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data ─── */

const symptoms = [
  "Increased blood pressure",
  "Swelling of lower limbs & around eyes",
  "Decreased haemoglobin",
  "Reduced urine output",
  "Nausea & Vomiting",
];

const renalDiseases = [
  "Acute (sudden onset) renal diseases",
  "Chronic (slow ongoing decline in renal function) renal diseases",
  "Renal damage due to high blood pressure, diabetes, infections, tubulointerstitial disorders, glomerular diseases",
  "Blood in the urine (hematuria)",
  "Protein loss in the urine (proteinuria)",
  "Electrolyte or acid-base imbalance",
  "Chronic and recurrent urinary tract infection",
  "Hereditary renal disorders",
  "Renovascular Diseases",
  "Pre Transplant workup & Post Transplant care",
];

const conditions = [
  "Chronic Kidney Disease",
  "Diabetic Nephropathy",
  "Glomerulonephritis",
  "Hypertensive Nephropathy",
  "Kidney Stones (Nephrolithiasis)",
  "Acute Kidney Injury",
  "Urinary Tract Infections",
  "Electrolyte Disorders",
  "Polycystic Kidney Disease",
  "Renovascular Disease",
  "Renal Failure",
  "Pre & Post Transplant Care",
];

const doctors = [
  {
    name: "Dr Harendra Pratap Singh",
    qualifications: "MBBS, MD, DM (Nephrology)",
    designation: "Consultant Nephrologist",
    slug: "dr-harendra-pratap-singh",
    image: "/images/departments_doctor/dr_harendra_pratap_singh.png",
  },
];

/* ─── Components ─── */

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function NephrologyClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/nephrology.png"
            alt="Nephrology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Kidney Care & Dialysis
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Nephrology <br />
              <span className="text-blue-300">Excellence</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <section className="py-12">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content Area */}
            <div className="lg:col-span-8">
              {/* Intro Paragraph */}
              <div className="prose prose-blue max-w-none text-gray-700 mb-16 leading-relaxed text-lg font-medium">
                <p>
                  Nephrology is a medical super speciality that deals with the
                  functioning of diseases related to the kidney. Kidneys are the
                  sophisticated filtering units of the body. On average, the
                  kidneys of a healthy adult process about 180 litres of blood
                  daily to dispose of the extra water and waste material in the
                  form of urine. Any alteration or dysfunction in the anatomy or
                  the physiology of the kidney can cause acute or chronic renal
                  (kidney) diseases which can seriously affect the functioning
                  of the entire body.
                </p>
              </div>

              {/* Signs & Symptoms Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20 animate-fade-in">
                <div className="md:col-span-7 lg:col-span-6">
                  <h2 className="text-3xl font-bold text-[#0b1c43] mb-8 font-heading leading-tight">
                    Sign & Symptoms Of <br />
                    Kidney <span className="text-blue-600">Diseases:</span>
                  </h2>
                  <div className="flex items-center gap-2 -mt-6 mb-8">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <div className="h-[2px] w-12 bg-gray-300" />
                  </div>
                  <ul className="space-y-4">
                    {symptoms.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-800 text-lg font-medium group"
                      >
                        <span className="text-blue-600 font-bold text-xl group-hover:translate-x-1 transition-transform">
                          ›
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-5 lg:col-span-6 relative flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden shadow-2xl rounded-[40%_60%_60%_40%/60%_40%_40%_60%] transition-all duration-500 hover:scale-105">
                    <Image
                      src="/images/departments-images/nephrologist_img_one.jpg"
                      alt="Kidney Symptoms Illustration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Department Description Block - Screenshot 1 Style */}
              <div className="text-gray-700 leading-relaxed text-lg font-medium text-justify mb-24 border-t border-gray-100 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                  {/* Left Column */}
                  <div>
                    <p>
                      Nephrology department is a state-of-the-art setup geared
                      to manage any form of Nephrological Emergency. It has
                      facilities to treat cases with Acute Kidney Failure,
                      Chronic Kidney Failure, Renal Hypertension, General
                      Nephrology & Dialysis. For Critical Care Nephrology, we
                      have facilities of &quot;Slow Low-Efficiency Dialysis
                      (SLED)&quot;, &quot;Continuous Renal Replacement
                      Therapy&quot; (CRRT) and &quot;Plasmapheresis&quot;.
                      Dialysis centre is ultramodern with 08 Dialysis Stations
                      with separate set up for Hepatitis C. The Dialysis Centre
                      is functional round the clock and is manned by very
                      experienced dialysis staff.
                    </p>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-6 text-gray-800">
                    <p>
                      Popular hospital is the only Hospital in the eastern up to
                      have facility of &apos;Continuous Renal Replacement
                      Therapy&apos; (CRRT) for children & adult dialysis.
                      Peritoneal dialysis (Acute PD &CAPD)
                    </p>
                    <p>
                      The Centre has excellent backup support of Urology,
                      Pathology, Radiology and Intensivists. It runs daily
                      OPD&apos;s with lot of focus on Preventive Nephrology. The
                      Nephrology Department follows International guidelines.
                    </p>
                    <p>
                      Our nephrologists strive to deliver the best possible care
                      to patients suffering from acute or chronic kidney
                      diseases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Doctor Divider */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-[#0b1c43] mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                  Our Specialists
                </h3>
                <DoctorSlider doctors={doctors} departmentName="Nephrology" />
              </div>
            </div>
          </div>

          {/* Professionals Section - Moved out of sidebar container for 1366px optimization */}
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center animate-fade-in pb-20">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold text-[#0b1c43] mb-12 font-heading leading-tight">
                  The Department Professionals Are Capable Of Diligently
                  Evaluating And Managing All Types Of Renal Diseases Like:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {renalDiseases.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 text-[#1a2b4b] text-base font-semibold group"
                    >
                      <span className="text-blue-500 font-bold text-xl leading-none mt-1 group-hover:translate-x-1 transition-transform shrink-0">
                        ›
                      </span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-[550px] aspect-[1/1.1] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[40%_60%_70%_30%/40%_40%_60%_60%] transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/departments-images/nephrologist_img_two.webp"
                    alt="Kidney Procedure Illustration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
