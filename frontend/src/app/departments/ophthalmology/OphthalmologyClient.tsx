'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  { title: "General Eye Care", icon: "eye", desc: "Comprehensive vision checkups for all ages." },
  { title: "Surgical Excellence", icon: "surgery", desc: "Stitchless cataract and microsurgeries." },
  { title: "Advanced Diagnostics", icon: "tech", desc: "Computerised eye testing and imaging." },
  { title: "Specialized Clinics", icon: "specialist", desc: "Pediatric, Glaucoma, and Retina care." },
];

const outpatientProcedures = [
  "Computerised Eye Testing",
  "Treatment for Glaucoma",
  "Diagnostic Services & Eye Examination",
  "Preventive Eye Check up",
  "Computer Vision Syndrome (CVS)",
  "Glaucoma Investigations",
  "Refraction",
  "Colour Vision"
];

const specialisedProgrammes = [
  "Computerised Eye Testing/ Preventive Eye Check-",
  "Glaucoma Clinic",
  "Stitchless Cataract Surgery (Phacoemulsification)",
  "Glaucoma",
  "Cornea & External Eye Disease",
  "Paediatric Ophthalmology",
  "Neuro-Ophthalmology",
  "Oculoplasty & Tumours"
];

const doctors = [
  {
    name: 'Dr. Eye Specialist',
    qualifications: 'M.B.B.S., MS (Ophthalmology)',
    designation: 'Senior Consultant',
    slug: 'ophthalmology-consultant',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#1e1b4b] font-heading leading-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'eye' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
    {icon === 'surgery' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m6-6L5 5" />}
    {icon === 'tech' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
    {icon === 'specialist' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
  </svg>
);

/* ─── Page ─── */

export default function OphthalmologyClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[500px] w-full bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
            alt="Ophthalmology Department Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Centre for Ophthalmology
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Dedicated to <br />
              <span className="text-blue-400">Your Vision Health</span>
            </h1>
            <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
              Comprehensive eye care services ranging from basic screening to complex surgical procedures.
            </p>
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

      {/* ═══════ FEATURE CARDS (4-col) ═══════ */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-blue-600 hover:border-[#0f172a] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <div className="mb-12">
                <SectionHeader title="Department of" highlight="Ophthalmology" />
              </div>

              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed font-medium text-justify">
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p>
                    The Ophthalmology Department is designed to provide a comprehensive range of medical and surgical eye care to the patients of all age groups. Our treatment plans are designed for the protection, preservation, enhancement and restoration of vision for any age groups.
                  </p>
                </div>
                <p>
                  Our ophthalmology department is fully equipped with state-of-the-art diagnostic and therapeutic equipments for treating glaucoma, cataracts, corneal and external diseases, pediatric ophthalmic diseases and disorders. We are committed to provide world class eye care services with the best equipments available with warm hospitality at an affordable price.
                </p>
              </div>
                
              <div className="mt-24">
                <div className="mb-8">
                  <h3 className="text-[#1e1b4b] font-bold text-2xl mb-2 flex items-center gap-2">
                    <span className="w-8 h-1 bg-blue-600 rounded-full" />
                    Out Patient Procedures:
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-8 ml-10">Advanced diagnostic services for precision eye care</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 group/list">
                  {outpatientProcedures.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f172a] transition-colors shadow-blue-600/20 shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium text-sm leading-snug pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-32">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                  <div className="lg:w-7/12">
                    <h3 className="text-[#1e1b4b] font-bold text-2xl mb-10 flex items-center gap-2">
                      <span className="w-8 h-1 bg-blue-600 rounded-full" />
                      Specialised Programmes:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {specialisedProgrammes.map((item, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex items-start gap-4 group">
                          <div className="w-9 h-9 rounded-lg bg-[#0f172a] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm group-hover:bg-blue-600 transition-colors shadow-lg">
                            {idx + 1}
                          </div>
                          <p className="text-gray-800 font-medium text-sm leading-relaxed pt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-5/12 w-full">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] border-[12px] border-white group">
                      <Image 
                        src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800"
                        alt="Specialised Eye Care"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column (Doctor Sidebar) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
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
                              className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-blue-700 mb-1 font-heading">{doctors[0].name}</h3>
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
      <section className="py-24 bg-[#0f172a] border-t border-gray-100 mt-20">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
              World-Class Eye Care <br className="hidden md:block" /> at Popular Hospital
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
              Take the first step towards better vision. Schedule a comprehensive eye exam with our expert team today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/doctors"
                className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
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
