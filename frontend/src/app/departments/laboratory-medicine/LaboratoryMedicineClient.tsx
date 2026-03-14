'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const doctors = [
  {
    name: 'Dr. Diagnostic Expert',
    qualifications: 'MBBS, MD (Pathology)',
    designation: 'Head, Department of Laboratory Medicine',
    slug: 'laboratory-specialist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ef197ec2?auto=format&fit=crop&q=80&w=800',
  },
];

const features = [
  { 
    title: 'Clinical Biochemistry', 
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    desc: 'Analysis of body fluids for diagnostic and therapeutic purposes.' 
  },
  { 
    title: 'Haematology', 
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    desc: 'Study of blood, blood-forming organs, and blood diseases.' 
  },
  { 
    title: 'Microbiology', 
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    desc: 'Identification of microorganisms causing infectious diseases.' 
  },
  { 
    title: 'Immunology', 
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    desc: 'Specialized testing for immune system disorders.' 
  },
];

/* ─── Sub-Components ─── */

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
  </svg>
);

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

export default function LaboratoryMedicineClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/laboratory_medicine.png"
            alt="Laboratory Medicine Research"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-6 border border-blue-400/30 backdrop-blur-md uppercase tracking-widest">
              Centre of Diagnostic Excellence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] font-heading tracking-tight">
              Laboratory <br />
              <span className="text-blue-400">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link href="/doctors" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-900/40 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Book a Test
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 group">
                Download Reports
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT DEPARTMENT + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Advancing Healthcare Through" highlight="Pure Science" />
              <div className="space-y-4 text-gray-800 text-base md:text-lg font-medium leading-relaxed mb-10 text-justify">
                <p>
                  At Popular Hospital, our Laboratory Medicine department is more than just a testing facility. It is a hub of clinical excellence where state-of-the-art technology meets seasoned expertise.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p>
                    We are committed to providing the highest standards of diagnostic accuracy. Our laboratory is operational 24/7, supporting the emergency and indoor departments with rapid turnaround times for critical pathology and biochemistry results.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 w-full border-t border-gray-100 pt-10">
                 <div>
                    <p className="text-4xl font-black text-blue-600 mb-1">NABL</p>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Accredited Quality</p>
                 </div>
                 <div>
                    <p className="text-4xl font-black text-blue-600 mb-1">100%</p>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Automated Processing</p>
                 </div>
              </div>
            </div>

            {/* ── Right Doctor Card (General Surgery Style) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                        <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                          <Image
                            src={doctors[0].image}
                            alt={doctors[0].name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <Link
                            href={`/doctors/${doctors[0].slug}`}
                            className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                          >
                            <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors uppercase text-sm">
                              View More Info
                            </span>
                          </Link>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-[#3b82f6] mb-1">{doctors[0].name}</h3>
                          <p className="text-gray-600 text-sm font-medium leading-tight">{doctors[0].qualifications}</p>
                          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-8" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════ TEST CATEGORIES ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] mb-4 font-heading">Complete Test Range</h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Pathology', items: ['Histopathology', 'Cytopathology', 'FNAC Services'] },
              { title: 'Biochemistry', items: ['Electrolytes', 'Toxicology', 'Enzyme Analysis'] },
              { title: 'Genetics', items: ['Molecular Testing', 'Karyotyping', 'DNA Analysis'] }
            ].map((box, i) => (
              <div key={i} className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-2xl font-black text-[#0b1c43] mb-6 font-heading">{box.title}</h4>
                <ul className="space-y-4">
                  {box.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-700 font-bold group pointer-events-none">
                       <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                       </span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
