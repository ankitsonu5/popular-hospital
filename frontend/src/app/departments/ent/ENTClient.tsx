'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  { title: "Ear Surgery", icon: "ear", desc: "Advanced microsurgery for hearing restoration." },
  { title: "Sinus Treatment", icon: "nose", desc: "Endoscopic sinus surgery & balloon sinuplasty." },
  { title: "Throat Care", icon: "throat", desc: "Expert management of voice & swallowing disorders." },
  { title: "Head & Neck", icon: "head", desc: "Specialized care for tumors and reconstructions." },
];

const introList = [
  "Hearing and deafness, deviated septum, rhinitis, ringing sensations in ears, sinusitis, nasal obstruction, sinus headaches and migraines, and various cancerous conditions.",
  "Problems related to the throat including sore throat, throat tumors, gastroesophageal reflux disease (GERD), hoarseness, infections, and vocal cord and airway disorders.",
  "Defects at the time of birth, ear infection, developmental delays, airway problems, tonsil and adenoid infection.",
  "Facial plastic surgeries such as cleft palates, ear deformities trauma reconstruction.",
  "Full time team of doctors providing Routine OPD, Emergency services, and ENT surgeries supported by latest modular OTs."
];

const commonDiseases = [
  "Hearing Defects Ear Infections",
  "Ear Drum perforations",
  "Throat Infections",
  "Tonsil infection",
  "Nasal Polyps",
  "Nasal bleeding / Nasal Allergy and infections"
];

const whatWeOffer = [
  "Prescription of hearing aids",
  "Tympanoplasty / for ear drum perforations",
  "Tonsillectomy / Removal of tonsil",
  "Polypectomy / Removal of Nasal Polyps",
  "Adenotonsillectomy",
  "Mastoidectomy",
  "Septoplasty",
  "CSF Rhinorrhoea repair",
  "Foreign body removal"
];

const doctors = [
  {
    name: 'Dr. Anshuman Singh',
    qualifications: 'M.B.B.S., MS',
    designation: 'Consultant',
    slug: 'dr-anshuman-singh',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#1e1b4b] font-heading leading-tight">
      {title} <span className="text-amber-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-amber-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg font-medium">
    <span className="text-amber-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'ear' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />}
    {icon === 'nose' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />}
    {icon === 'throat' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />}
    {icon === 'head' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
  </svg>
);

/* ─── Page ─── */

export default function ENTClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#1e1b4b] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559170624-946772719586?auto=format&fit=crop&q=80&w=2000"
            alt="ENT Department Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#1e1b4b]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-100 text-sm font-semibold mb-6 border border-amber-400/30 backdrop-blur-sm">
              Centre for ENT & Head-Neck Surgery
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Precision Care for <br />
              <span className="text-amber-400">Ear, Nose & Throat</span>
            </h1>
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
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-amber-600 hover:border-[#1e1b4b] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1e1b4b] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR (Text Focus) ═══════ */}
      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="ENT" />
                <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed text-justify">
                    The Department of ENT provides a wide range of surgical as well as medical services for the disorders related to ear, nose & throat. The highly skilled team of ENT specialists uses the latest equipments and technologies to perform endoscopic nasal surgeries, ear and all types of routine & complex treatments.
                </p>
                
                <div className="mt-8">
                    <h3 className="text-[#1e1b4b] font-bold text-xl mb-4 italic">Few of them are listed below:</h3>
                    <ul className="space-y-4">
                        {introList.map((item, idx) => (
                            <ListItem key={idx} text={item} />
                        ))}
                    </ul>
                </div>

                <div className="mt-16 animate-fade-in">
                    <SectionHeader title="Common Diseases and" highlight="Conditions:" />
                    <div className="flex flex-col gap-1 mt-8">
                        {commonDiseases.map((item, idx) => (
                            <ListItem key={idx} text={item} />
                        ))}
                    </div>
                </div>

                <div className="mt-16 animate-fade-in">
                    <SectionHeader title="What we" highlight="offer:" />
                    <div className="flex flex-col gap-1 mt-8">
                        {whatWeOffer.map((item, idx) => (
                            <ListItem key={idx} text={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right Doctor Sidebar ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
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
                              className="absolute inset-0 bg-amber-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-amber-600 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-amber-700 mb-1 font-heading">{doctors[0].name}</h3>
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
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#1e1b4b] rounded-2xl md:rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 20 50 20 100 100 Z" fill="white" />
                </svg>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block bg-amber-500/20 text-amber-100 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-amber-400/20 uppercase tracking-widest">
                Comprehensive ENT Healthcare
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Quality Treatment for Your <br className="hidden md:block" /> Precious Senses
              </h2>
              <p className="text-amber-100 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                Our team of specialists is dedicated to providing you with the best medical and surgical ENT solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                <Link
                  href="/doctors"
                  className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+917800001895"
                  className="bg-transparent border-2 border-amber-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
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


