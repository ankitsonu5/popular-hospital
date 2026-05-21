"use client";

import Image from "next/image";
import Link from "next/link";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";
import { AlertTriangle, CheckCircle, ShieldCheck, Activity } from "lucide-react";

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
    name: "Dr. Harendra Pratap Singh",
    qualifications: "MBBS, MD, DM (Nephrology)",
    designation: "Consultant Nephrologist",
    slug: "dr-harendra-pratap-singh",
    image: "/images/departments_doctor/harendra_pratap.jpg",
  },
];

/* ─── Components ─── */

export default function NephrologyClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Nephrology <br />
              <span className="text-blue-300">Excellence</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Nephrology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">

              {/* Department Intro */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Department of <span className="text-[#1e3a8a]">Nephrology</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-6">
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

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-6">
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

                <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/30 rounded-r-xl mb-6">
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium italic">
                    Popular hospital is the only Hospital in the eastern up to
                    have facility of &apos;Continuous Renal Replacement
                    Therapy&apos; (CRRT) for children &amp; adult dialysis.
                    Peritoneal dialysis (Acute PD &amp; CAPD)
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-6">
                  The Centre has excellent backup support of Urology,
                  Pathology, Radiology and Intensivists. It runs daily
                  OPD&apos;s with lot of focus on Preventive Nephrology. The
                  Nephrology Department follows International guidelines.
                </p>

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  Our nephrologists strive to deliver the best possible care
                  to patients suffering from acute or chronic kidney
                  diseases.
                </p>
              </div>

            </div>

            {/* Right Sidebar - Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Nephrology"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SYMPTOMS & CLINICAL FOCUS SECTION (FULL WIDTH) ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Sign & Symptoms */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Sign &amp; Symptoms of <span className="text-[#1e3a8a]">Kidney Diseases</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
              <div className="space-y-4">
                {symptoms.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center mt-0.5">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-2">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluating & Managing Renal Diseases */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Evaluating &amp; Managing <span className="text-[#1e3a8a]">Renal Diseases</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
              <div className="space-y-4">
                {renalDiseases.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-2">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ CONDITIONS WE TREAT ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              Conditions We <span className="text-[#1e3a8a]">Treat</span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {conditions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 text-[15px] font-medium">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
