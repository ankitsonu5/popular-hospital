'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

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

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading uppercase tracking-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
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
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/laboratory_medicine.png"
            alt="Laboratory Medicine Research"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-6 border border-blue-400/30 backdrop-blur-md uppercase tracking-widest">
              Centre of Diagnostic Excellence
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] font-heading tracking-tight">
              Laboratory <br />
              <span className="text-blue-400">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/doctors" className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Book a Test
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 group uppercase text-sm tracking-wide">
                Download Reports
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT DEPARTMENT + DOCTOR SIDEBAR ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Advancing Healthcare Through" highlight="Pure Science" />
              <div className="space-y-4 text-gray-800 text-base md:text-lg font-medium leading-relaxed mb-10 text-justify">
                <p>
                  At Popular Hospital, our Laboratory Medicine department is more than just a testing facility. It is a hub of clinical excellence where state-of-the-art technology meets seasoned expertise.
                </p>
                <div className="bg-blue-50/50 p-8 rounded-2xl border-l-4 border-blue-600 shadow-sm font-bold italic">
                  <p>
                    &quot;We are committed to providing the highest standards of diagnostic accuracy. Our laboratory is operational 24/7, supporting the emergency and indoor departments with rapid turnaround times for critical pathology and biochemistry results.&quot;
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 w-full border-t border-gray-100 pt-12">
                 <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner group hover:bg-white hover:shadow-md transition-all">
                    <p className="text-5xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">NABL</p>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">Accredited Quality</p>
                 </div>
                 <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner group hover:bg-white hover:shadow-md transition-all">
                    <p className="text-5xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">100%</p>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">Automated Systems</p>
                 </div>
              </div>
            </div>

            {/* ── Right Doctor Slider ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit flex flex-col gap-10">
                <DoctorSlider doctors={doctors} departmentName="Laboratory Medicine" />
                
                <div className="bg-[#0b1c43] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16" />
                    <svg className="w-12 h-12 text-blue-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    <h4 className="text-xl font-bold mb-4">Precision Diagnostic Reports</h4>
                    <p className="text-blue-200 text-sm mb-6 leading-relaxed">Available online for your convenience. Secure, accurate, and fast.</p>
                    <Link href="/reports" className="bg-white text-[#0b1c43] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-blue-50 transition-all">
                        Access Now
                    </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════ TEST CATEGORIES ═══════ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        <div className="mx-auto w-full max-w-[1366px] px-6 text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Excellence in Diagnostics</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] mb-4 font-heading uppercase tracking-tight">Complete Test Range</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Clinical Pathology', items: ['Histopathology', 'Cytopathology', 'FNAC Services'] },
              { title: 'Biochemistry', items: ['Electrolytes', 'Toxicology', 'Enzyme Analysis'] },
              { title: 'Genetic Testing', items: ['Molecular Testing', 'Karyotyping', 'DNA Analysis'] }
            ].map((box, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="text-2xl font-black text-[#0b1c43] mb-6 font-heading uppercase tracking-tight">{box.title}</h4>
                <ul className="space-y-4">
                  {box.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-700 font-bold group/item">
                       <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] group-hover/item:scale-110 transition-transform">
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
