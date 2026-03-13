'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function NephrologyClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
            alt="Nephrology Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Nephrology
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
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
                <p>
                  Nephrology department is a state-of-the-art setup geared to manage any form of Nephrological Emergency. It has facilities to treat cases with Acute Kidney Failure, Chronic Kidney Failure, Renal Hypertension, General Nephrology & Dialysis. For Critical Care Nephrology, we have facilities of "Slow Low-Efficiency Dialysis (SLED)", "Continuous Renal Replacement Therapy" (CRRT) and "Plasmapheresis". Dialysis centre is ultramodern with 08 Dialysis Stations with separate set up for Hepatitis C. The Dialysis Centre is functional round the clock and is manned by very experienced dialysis staff.
                </p>
                <p>
                  Popular hospital is the only Hospital in the eastern up to have facility of “Continuous Renal Replacement Therapy" (CRRT) for children & adult dialysis. Peritoneal dialysis (Acute PD &CAPD)

The Centre has excellent backup support of Urology, Pathology, Radiology and Intensivits. It runs daily OPD's with lot of focus on Preventive Nephrology. The Nephrology Department follows International guidelines.

Our nephrologists strive to deliver the best possible care to patients suffering from acute or chronic kidney diseases.
                </p>
              </div>

              {/* Signs & Symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div>
                  <SectionHeader title="Sign & Symptoms Of Kidney" highlight="Diseases:" />
                  <ul className="mt-2">
                    {symptoms.map((item, idx) => (
                      <ListItem key={idx} text={item} />
                    ))}
                  </ul>
                </div> 
                <div className="relative h-56 md:h-auto rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/departments-images/kidney.jpeg"
                    alt="Kidney Disease"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Renal Diseases */}
              <SectionHeader title="The Department Professionals Are Capable Of Diligently Evaluating And Managing All Types Of" highlight="Renal Diseases Like" />
              <ul className="grid grid-cols-1 gap-x-8 mt-2 mb-8">
                {renalDiseases.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            {/* Right Sidebar - Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  {/* Floating Appointment Button */}
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                              <Image
                                src={doc.image}
                                alt={doc.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              {/* Hover Overlay */}
                              <Link
                                href={`/doctors/${doc.slug}`}
                                className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                              >
                                <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors">
                                  View More Info
                                </span>
                              </Link>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-[#3b82f6] mb-1">{doc.name}</h3>
                              <p className="text-gray-600 text-sm font-medium">{doc.qualifications}</p>
                              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {doctors.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === 0 ? doctors.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === doctors.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {doctors.length > 1 && (
                      <div className="flex gap-3 mb-8">
                        {doctors.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${
                              currentSlide === idx
                                ? 'bg-[#3b82f6] border-[#3b82f6] scale-125'
                                : 'bg-transparent border-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <div className="h-8" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <span className="inline-block bg-blue-500/20 text-blue-200 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-400/20">
              Need Dialysis? We&apos;re Available 24/7
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
              Your Kidney Health Matters
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Our nephrology team is available round the clock for dialysis sessions and kidney emergencies. Book a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg"
              >
                Book an Appointment
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-blue-900/30 px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                Call +91-7800001895 / 96
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}


