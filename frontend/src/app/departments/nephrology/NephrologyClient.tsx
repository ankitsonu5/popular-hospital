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

const renalCategories = [
  {
    id: "signs-symptoms",
    title: "Sign & Symptoms Of Kidney Diseases:",
    image: "/images/departments-images/nephrologist_img_one.jpg",
    services: symptoms,
  },
  {
    id: "renal-management",
    title:
      "The Department Professionals Are Capable Of Diligently Evaluating And Managing All Types Of Renal Diseases Like:",
    image: "/images/departments-images/nephrologist_img_two.webp",
    services: [
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
    ],
  },
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
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function NephrologyClient() {
  const [selectedCategory, setSelectedCategory] = useState(renalCategories[0]);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
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

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Kidney Care & Dialysis
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
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
      <section className="py-12 xl:py-8 2xl:py-16">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content Area */}
            <div className="lg:col-span-8">
              {/* Intro Paragraph */}
              <div className="prose prose-blue max-w-none text-gray-700 mb-16 xl:mb-10 2xl:mb-16 leading-relaxed text-lg font-medium xl:text-[15px] 2xl:text-lg">
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

              {/* Department Description Block - Screenshot 1 Style */}
              <div className="text-gray-700 leading-relaxed text-lg font-medium xl:text-[15px] 2xl:text-lg text-justify mb-24 xl:mb-12 2xl:mb-20 border-t border-gray-100 pt-16 xl:pt-10 2xl:pt-16">
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
        </div>
      </section>

      {/* ═══════ INTERACTIVE RENAL CARE SECTION ═══════ */}
      <div className="mt-24 pt-20 xl:mt-12 xl:pt-12 2xl:mt-24 2xl:pt-20 border-t border-gray-100 bg-[#fafafa] -mx-4 px-4 pb-20 xl:pb-12 2xl:pb-20 overflow-hidden">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 md:px-8 lg:px-4">
          {/* Main Heading */}
          <div className="text-center mb-20 max-w-5xl 2xl:max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#333] mb-8 font-heading leading-tight italic">
              &quot;Comprehensive Kidney Care & Professional Excellence&quot;
            </h2>
            <div className="w-24 h-1 bg-[#E85222] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            {/* Left Sidebar (Categories) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="flex flex-col border-t border-gray-200">
                {renalCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between py-5 px-4 border-b border-gray-200 transition-all duration-300 group ${
                      selectedCategory.id === cat.id
                        ? "text-[#E85222] font-bold bg-white shadow-sm"
                        : "text-gray-700 hover:text-[#E85222] hover:bg-gray-50 font-medium"
                    }`}
                  >
                    <span className="text-left text-lg leading-snug">
                      {cat.title}
                    </span>
                    <span
                      className={`transition-transform duration-300 ${
                        selectedCategory.id === cat.id
                          ? "translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Circular Image */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 mb-10 lg:mb-0">
              <div className="relative group">
                <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-gray-300 animate-[spin_20s_linear_infinite] group-hover:border-[#E85222]/50 transition-colors" />
                <div className="absolute inset-[-10px] rounded-full border border-gray-200" />
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image
                    key={selectedCategory.id}
                    src={selectedCategory.image}
                    alt="Kidney Care Illustration"
                    fill
                    className="object-cover transition-opacity duration-500 animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-4 order-3">
              <div className="animate-fade-in pl-4 lg:pl-10 text-justify">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[2px] bg-[#E85222]" />
                  <h3 className="text-xl font-bold text-[#333] italic">
                    {selectedCategory.id === "signs-symptoms"
                      ? "Health Indicators"
                      : "Clinical Management"}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {selectedCategory.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E85222] flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="text-gray-700 text-lg leading-relaxed font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
