'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Recovered from Previous State) ─── */

const features = [
  { title: "Joint Replacement", icon: "joint", desc: "Hip, knee, shoulder replacement surgeries." },
  { title: "Sports Medicine", icon: "activity", desc: "ACL, meniscus, and ligament repairs." },
  { title: "Spine Surgery", icon: "spine", desc: "Advanced spinal fusion & disc treatments." },
  { title: "Trauma Care", icon: "shield", desc: "24/7 emergency fracture management." },
];

const specializedServices = [
  "Total Knee Replacement",
  "Hip Replacement",
  "Shoulder Arthroscopy",
  "Spine Fusion",
  "Fracture Fixation",
  "Hand & Wrist Surgery",
];

const coreHighlights = [
  { title: "Robotic Joint Replacement", desc: "Computer-assisted precision for perfect alignment." },
  { title: "Arthroscopy Centre", desc: "Minimally invasive keyhole surgery for faster healing." },
  { title: "Pediatric Orthopedics", desc: "Specialized care for growing bones and deformities." }
];

const doctors = [
  {
    name: 'Dr. Orthopedic Specialist',
    qualifications: 'MBBS, MS (Ortho), Fellowship in Joint Replacement',
    designation: 'Sr. Consultant & Surgeon',
    slug: 'dr-ortho-specialist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-[#0f766e] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-[#0f766e]" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-[#0f766e] mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'joint' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
    {icon === 'activity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
    {icon === 'spine' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
  </svg>
);

/* ─── Page ─── */

export default function OrthopedicsClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[600px] w-full bg-[#0f766e] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2000"
            alt="Orthopedics Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f766e] via-[#0f766e]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-100 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm">
              Centre for Bone & Joint Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Restoring Mobility, <br />
              <span className="text-teal-300">Rebuilding Lives</span>
            </h1>
            <p className="text-teal-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium text-justify">
                From joint replacements to sports injuries, our expert orthopedic surgeons use advanced techniques to help you move freely and live pain-free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2"
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

      {/* ═══════ FEATURE CARDS (4-col) ═══════ */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-[#0f766e] hover:border-[#0b1c43] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#0f766e] group-hover:bg-[#0f766e] group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b1c43] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Expert" highlight="Orthopedic Care" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  Our orthopedic department offers comprehensive care for bones, joints, muscles, and ligaments. From minimally invasive arthroscopy to complex joint replacements, we combine surgical excellence with compassionate rehabilitation support.
                </p>
                <div className="bg-teal-50/50 p-6 rounded-xl border-l-4 border-teal-600">
                  <p>
                    We are dedicated to providing precision surgery and personalized recovery plans to ensure every patient returns to their active lifestyle with confidence and minimal discomfort.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#0f766e] hover:bg-teal-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
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
                              className="absolute inset-0 bg-[#0f766e]/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-[#0f766e] transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-[#0f766e] mb-1 font-heading">{doctors[0].name}</h3>
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

      {/* ═══════ SPECIALIZED TREATMENTS (Full Width 1366px) ═══════ */}
      <section className="py-24 md:py-32 bg-white border-t border-gray-100 mt-16">
        <div className="mx-auto w-full max-w-[1366px] px-4">
             {/* Section: Service Offered */}
             <div className="mb-32">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                      <div>
                          <span className="text-[#0f766e] font-bold tracking-widest text-xs uppercase mb-3 block">Specialized Treatments</span>
                          <SectionHeader title="Comprehensive" highlight="Solutions" />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {specializedServices.map((item, idx) => (
                              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-lg bg-[#0f766e] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b1c43] transition-colors">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <p className="text-gray-700 font-medium text-sm leading-snug pt-1">{item}</p>
                              </div>
                            ))}
                          </div>
                      </div>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: '480px' }}>
                          <Image
                            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
                            alt="Orthopedic Care Center"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
                      </div>
                  </div>
             </div>

             {/* Highlights (Alternating) */}
             <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group order-2 lg:order-1" style={{ minHeight: '480px' }}>
                        <Image
                          src="https://images.unsplash.com/photo-1579389083395-4507e9f4c171?auto=format&fit=crop&q=80&w=800"
                          alt="Advanced Orthopedics"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
                    </div>
                    <div className="order-1 lg:order-2">
                        <SectionHeader title="Our" highlight="Key Highlights" />
                        <div className="grid grid-cols-1 gap-4 mt-8">
                            {coreHighlights.map((item, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 flex items-start gap-4 group">
                                <div className="w-9 h-9 rounded-lg bg-[#0f766e] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm group-hover:bg-[#0b1c43] transition-colors">
                                {idx + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0b1c43] text-base">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                  </div>
             </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block bg-teal-500/20 text-teal-100 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-teal-400/20 uppercase tracking-widest">
                Comprehensive Bone & Joint Care
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                 Get Back to What You <br className="hidden md:block" /> Love Today
              </h2>
              <p className="text-teal-100 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium text-justify md:text-center">
                Don't let pain hold you back. Consult our orthopedic experts for a personalized treatment plan and move freely again.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/doctors"
                  className="bg-[#E85222] text-white hover:bg-orange-600 px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+917800001895"
                  className="bg-transparent border-2 border-teal-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
