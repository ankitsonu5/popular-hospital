'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data ─── */

const surgicalOncologyServices = [
  'Head and neck',
  'Thoracic oncology',
  'Sarcomas',
  'Gynee oncology',
  'Uro oncology',
  'Sentinel lymph node biopsies',
];

const diagnosticOncologyServices = [
  'CT scan',
  'MRI',
  'Guided',
  'Biopsies',
  'Frozen Section',
  'Biochemical Markers',
  'Pathology',
];

const doctors = [
  {
    name: 'Dr. Oncologist',
    qualifications: 'MBBS, MD, DM (Oncology)',
    designation: 'Consultant Oncologist',
    slug: 'dr-oncologist',
    image: '/images/departments-images/dr-oncologist.png',
  },
];

/* ─── Sub-Components ─── */

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

export default function OncologyClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000"
            alt="Oncology Banner"
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
              Oncology
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

      {/* ═══════ INTRO + DOCTOR SECTION ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Oncology" />
              <div className="text-gray-700 space-y-6 mb-10 leading-relaxed text-[1.05rem] text-justify font-medium">
                <p>Oncology: Clinical oncology consists of three primary disciplines:</p>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading">Medical Oncology</h3>
                    <p className="text-gray-600">Medical Oncology consists of treatment of cancer with medicine including chemotherapy. We offer diagnosis and treatment for solid tumours haematological malignancies found in adult and children.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading">Surgical Oncology</h3>
                    <p className="text-gray-600">The surgical aspect of cancer including biopsy, staging and surgical resection of tumours. Right from reconstructive/advanced surgery to minimal access surgery, our highly trained surgical oncologists skilfully perform complex tumour removals.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading">Radiation Oncology</h3>
                    <p className="text-gray-600">Radiation Oncology is an advanced branch of modern cancer treatment, which is painless, incision-less and preventive.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Doctor Card (Sticky) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  <Link 
                    href="/doctors" 
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>
                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                              <Image src={doc.image} alt={doc.name} fill className="object-cover transition-transform duration-500 group-hover/img:scale-105" />
                              <Link href={`/doctors/${doc.slug}`} className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors">View More Info</span>
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
                    <div className="h-8" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ FULL-WIDTH SERVICES SECTION ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="space-y-32">
            
            {/* Surgical Oncology Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Specialized Procedures</span>
                <SectionHeader title="Surgical" highlight="Oncology" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-8">
                  {surgicalOncologyServices.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
                <div className="relative w-full aspect-video max-w-2xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group">
                  <Image
                    src="/images/departments-images/cancer_cells_visualization.png"
                    alt="Surgical Oncology Visualization"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Diagnostic Oncology Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="mb-12 lg:mb-0 relative">
                <div className="relative w-full aspect-video max-w-2xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group">
                  <Image
                    src="/images/departments-images/oncology_diagnostics_realistic.png"
                    alt="Diagnostic Oncology Technology"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
              <div>
                <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Advanced Diagnostics</span>
                <SectionHeader title="Diagnostic" highlight="Oncology" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-8">
                  {diagnosticOncologyServices.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <span className="inline-block bg-blue-500/20 text-blue-200 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-400/20">
              Hope Starts Here
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
              Early Diagnosis Saves Lives
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Early diagnosis is the key to cure. If you notice any unusual symptoms, consult our specialists immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg"
              >
                Book Consultation
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
