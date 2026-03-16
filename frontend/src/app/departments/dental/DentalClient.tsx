'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  { title: "Painless Procedures", icon: "sparkle", desc: "Advanced anesthesia and gentle techniques for anxiety-free care." },
  { title: "Precision Technology", icon: "scope", desc: "Digital X-rays and intra-oral cameras for accurate diagnoses." },
  { title: "Specialized Care", icon: "shield", desc: "Expert treatment for complex dental and maxillofacial conditions." },
  { title: "Radiological Support", icon: "tech", desc: "Superior diagnostic amenities including Dentascan and OPG." },
];

const surgeryList = [
  "Ranging from removal of impacted teeth to fixation of facial fractures to Jaw corrective surgeries.",
  "Prosthodontics",
  "Complete rehabilitation of occlusion including maxillofacial Prosthetics.",
  "Orthodontics and Dentofacial Orthopaedics",
  "Alignment of crowded teeth",
  "Pediatric dentistry",
  "Child dentistry is emphasized to condense the incidence of dental ailments in adults.",
  "Periodontics",
  "Services such as to strengthen the Gums, Gingival Flap Surgeries , bone Grafts, Depigmentation, Frenectomy etc"
];

const doctors = [
  {
    name: 'Dr. Dental Specialist',
    qualifications: 'BDS, MDS (Oral & Maxillofacial Surgery)',
    designation: 'Senior Consultant',
    slug: 'dental-specialist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-cyan-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-cyan-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg font-medium">
    <span className="text-cyan-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'sparkle' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
    {icon === 'scope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'tech' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
  </svg>
);

/* ─── Page ─── */

export default function DentalClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0e7490] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dental_care_banner.png"
            alt="Dental Care Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e7490] via-[#0e7490]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-100 text-sm font-semibold mb-6 border border-cyan-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Comprehensive <br />
              <span className="text-cyan-300">Dental Care</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
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

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Dental" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <div className="bg-cyan-50/50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <p>
                    The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. This multi sphere dental unit with a high quality, specialized dental care with excellence and comfort soothing atmosphere for patients will offer the full range of services as follows:
                  </p>
                </div>
              </div>

              <div className="mt-12 animate-fade-in">
                <SectionHeader title="Oral and Maxillofacial" highlight="Surgery" />
                <div className="flex flex-col gap-1 mt-8">
                  {surgeryList.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mt-10">
                    <p className="text-gray-600 italic font-medium">Craniofacial Surgeries are done in collaboration with department of plastic surgery</p>
                </div>
              </div>

              {/* Radiological Support (Alternating style) */}
              <div className="mt-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-5/12 w-full order-2 lg:order-1">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-[12px] border-white group">
                      <Image 
                        src="/images/departments-images/root-canal-treatment.jpg"
                        alt="Dental Radiology"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="lg:w-7/12 order-1 lg:order-2">
                    <h3 className="text-[#1e1b4b] font-bold text-2xl mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 bg-cyan-600 rounded-full" />
                      DIGITAL RADIOLOGICAL SUPPORT:
                    </h3>
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify font-medium mb-6">
                        The department is backed by exceptional diagnostic amenities such as a cordless digital Intra oral periapical radiographs. Orthopantomograph and Dentascan thereby ensuring flawless management of dental ailments.
                    </p>
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify font-medium">
                        The department of dentistry at Sahara Hospital practices everything about dentistry under one roof.
                    </p>
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
                              className="absolute inset-0 bg-cyan-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-cyan-600 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-cyan-700 mb-1 font-heading">{doctors[0].name}</h3>
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
      <section className="py-24 bg-[#0e7490] border-t border-gray-100 mt-20">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Your Smile, Our Priority
            </h2>
            <p className="text-cyan-50 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                Take the first step towards a healthier, brighter smile. Consult our dental experts today and experience pain-free precision dentistry.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/doctors"
                className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
              >
                Book Dental Checkup
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-cyan-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                 +91-7800001895 / 96
              </a>
            </div>
        </div>
      </section>

    </main>
  );
}

