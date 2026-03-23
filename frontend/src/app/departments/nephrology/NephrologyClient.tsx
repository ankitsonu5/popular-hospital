'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

/* ─── Data ─── */

const symptoms = [
  'Increased blood pressure',
  'Swelling of lower limbs & around eyes',
  'Decreased haemoglobin',
  'Reduced urine output',
  'Nausea & Vomiting',
];

const renalDiseases = [
  'Acute (sudden onset) renal diseases',
  'Chronic (slow ongoing decline in renal function) renal diseases',
  'Renal damage due to high blood pressure, diabetes, infections, tubulointerstitial disorders, glomerular diseases',
  'Blood in the urine (hematuria)',
  'Protein loss in the urine (proteinuria)',
  'Electrolyte or acid-base imbalance',
  'Chronic and recurrent urinary tract infection',
  'Hereditary renal disorders',
  'Renovascular Diseases',
  'Pre Transplant workup & Post Transplant care',
];

const conditions = [
  'Chronic Kidney Disease',
  'Diabetic Nephropathy',
  'Glomerulonephritis',
  'Hypertensive Nephropathy',
  'Kidney Stones (Nephrolithiasis)',
  'Acute Kidney Injury',
  'Urinary Tract Infections',
  'Electrolyte Disorders',
  'Polycystic Kidney Disease',
  'Renovascular Disease',
  'Renal Failure',
  'Pre & Post Transplant Care',
];

const doctors = [
  {
    name: 'Dr Harendra Pratap Singh',
    qualifications: 'MBBS, MD, DM (Nephrology)',
    designation: 'Consultant Nephrologist',
    slug: 'dr-harendra-pratap-singh',
    image: '/images/departments_doctor/dr_harendra_pratap_singh.png',
  },
];

/* ─── Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
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
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function NephrologyClient() {

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

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

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Nephrology" />
              <div className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg font-medium text-justify">
                <p>
                  Nephrology is a medical super speciality that deals with the functioning of diseases related to the kidney. Kidneys are the sophisticated filtering units of the body. On average, the kidneys of a healthy adult process about 180 litres of blood daily to dispose of the extra water and waste material in the form of urine. Any alteration or dysfunction in the anatomy or the physiology of the kidney can cause acute or chronic renal (kidney) diseases which can seriously affect the functioning of the entire body.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600 my-8">
                    <p>
                    Nephrology department is a state-of-the-art setup geared to manage any form of Nephrological Emergency. It has facilities to treat cases with Acute Kidney Failure, Chronic Kidney Failure, Renal Hypertension, General Nephrology & Dialysis. For Critical Care Nephrology, we have facilities of &quot;Slow Low-Efficiency Dialysis (SLED)&quot;, &quot;Continuous Renal Replacement Therapy&quot; (CRRT) and &quot;Plasmapheresis&quot;. Dialysis centre is ultramodern with 08 Dialysis Stations with separate set up for Hepatitis C. The Dialysis Centre is functional round the clock and is manned by very experienced dialysis staff.
                    </p>
                </div>
                <p>
                  Popular hospital is the only Hospital in the eastern up to have facility of “Continuous Renal Replacement Therapy&quot; (CRRT) for children &amp; adult dialysis. Peritoneal dialysis (Acute PD &amp;CAPD). The Centre has excellent backup support of Urology, Pathology, Radiology and Intensivits. It runs daily OPD&apos;s with lot of focus on Preventive Nephrology. The Nephrology Department follows International guidelines. Our nephrologists strive to deliver the best possible care to patients suffering from acute or chronic kidney diseases.
                </p>
              </div>

              {/* Signs & Symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <SectionHeader title="Sign & Symptoms Of Kidney" highlight="Diseases:" />
                  <ul className="mt-2">
                    {symptoms.map((item, idx) => (
                      <ListItem key={idx} text={item} />
                    ))}
                  </ul>
                </div> 
                <div className="relative h-64 md:h-[300px] rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/images/departments-images/kidney.jpeg"
                    alt="Kidney Disease"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Renal Diseases */}
              <div className="mt-16">
                  <SectionHeader title="Specialized Care for" highlight="Renal Diseases" />
                  <p className="text-gray-600 italic font-medium mb-6">Evaluating And Managing All Types Of Renal Diseases Like:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-2 mb-8">
                    {renalDiseases.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                    ))}
                  </ul>
              </div>
            </div>

            {/* Right Sidebar - Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Nephrology" />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <span className="inline-block bg-blue-500/20 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-400/20 uppercase tracking-widest">
              Available 24/7 for Emergencies
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading leading-tight">
              Your Kidney Health <br className="hidden md:block" /> is Our Priority
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Our nephrology team is available round the clock for dialysis sessions and kidney emergencies. Book a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 mt-10">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-xl transform hover:-translate-y-1 uppercase tracking-wide"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                +91-7800001895 / 96
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
