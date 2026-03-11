'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data ─── */

const facilities = [
  'Upper & Lower GI Endoscopy',
  'Colonoscopy',
  'Gastroscopy',
  'B.D.Stone(FRCP)',
  'Oesophagea & Rectal Dilation',
  'Biliary Stenting, Oesophageal Stenting',
  'ERCP (Endoscopic Retrograde Cholangiopancreatography)',
  'Interventional Endoscopy',
  'Liver Biopsy & Management',
  'Portal Hypertension Management',
  'GI Cancer Diagnosis & Treatment',
  'Pancreatic Disease Management'
];

const conditions = [
  'Acid Reflux (GERD)',
  'Chronic Constipation',
  'Irritable Bowel Syndrome (IBS)',
  'Fatty Liver Disease',
  'Gallstones',
  "Crohn's Disease",
  'Ulcerative Colitis',
  'Pancreatitis',
  'Hemorrhoids',
  'Celiac Disease',
  'Hepatitis B & C',
  'Cirrhosis of Liver',
];

const doctors = [
  {
    name: 'Dr. R.K. Singh',
    qualifications: 'M.B.B.S, MS (Gastro Surgery)',
    designation: 'Consultant',
    slug: 'dr-rk-singh',
    image: '/images/departments-images/dr-rk-singh-gastro.png',
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

export default function GastroenterologyClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=2000"
            alt="Gastroenterology Banner"
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
              Digestive Health &<br />
              Liver Sciences
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

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Gastroenterology" />
              <div className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg font-medium text-justify">
                <p>
                  The Dept. of Gastroenterology and liver services has the input of the best medical and surgical gastroenterologists. Interventional Endoscopy relating to the biliary tract and management of complications of portal hypertension. In addition to Oesophageal and Rectal dilation, Colonic Polypectomics and the placement of feeding gastrostomies, Oesophageal stents continues to expand and comprises a greater percentage of the total endoscopy work of the department.
                </p>
              </div>

              <SectionHeader title="The department offers the following" highlight="facilities:" />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 mb-8">
                {facilities.map((item, idx) => (
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

                    {/* Arrows — only if > 1 doctor */}
                    {doctors.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === 0 ? doctors.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === doctors.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Pagination Dots */}
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

      {/* ═══════ CONDITIONS WE TREAT ═══════ */}
      <section className="bg-gray-100 py-14">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">What We Treat</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">Common Conditions We <span className="text-blue-600">Treat</span></h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="h-[2px] w-12 bg-gray-300" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {conditions.map((item, i) => (
              <span
                key={i}
                className="text-sm md:text-base font-semibold text-[#0b1c43] px-5 md:px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all cursor-default"
              >
                {item}
              </span>
            ))}
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
              Take Action Today
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
              Prioritize Your Gut Health
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Digestive health is the foundation of overall wellness. Schedule a check-up with our leading gastroenterologists today.
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
                Call +91-7800001895
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
