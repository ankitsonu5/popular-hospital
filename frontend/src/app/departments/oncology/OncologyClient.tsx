'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

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
    name: 'Dr Ajay Kumar Prajapati',
    qualifications: 'MBBS, MS, MCh (Surgical Oncology)',
    designation: 'Consultant Surgical Oncology',
    slug: 'dr-ajay-kumar-prajapati',
    image: '',
  },
  {
    name: 'Dr Neha Gupta',
    qualifications: 'MBBS, MD (Radiotherapy)',
    designation: 'Consultant Radiation Oncology',
    slug: 'dr-neha-gupta',
    image: '/images/departments_doctor/dr_neha_gupta.png',
  },
];

/* ─── Sub-Components ─── */

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

export default function OncologyClient() {

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/oncology.png"
            alt="Oncology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Comprehensive Cancer Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Oncology <br />
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
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading uppercase tracking-tight">Medical Oncology</h3>
                    <p className="text-gray-600 text-justify">Medical Oncology consists of treatment of cancer with medicine including chemotherapy. We offer diagnosis and treatment for solid tumours haematological malignancies found in adult and children.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading uppercase tracking-tight">Surgical Oncology</h3>
                    <p className="text-gray-600 text-justify">The surgical aspect of cancer including biopsy, staging and surgical resection of tumours. Right from reconstructive/advanced surgery to minimal access surgery, our highly trained surgical oncologists skilfully perform complex tumour removals.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-l-4 border-blue-600 shadow-sm transition-all hover:shadow-md">
                    <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading uppercase tracking-tight">Radiation Oncology</h3>
                    <p className="text-gray-600 text-justify">Radiation Oncology is an advanced branch of modern cancer treatment, which is painless, incision-less and preventive.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Doctor Card (Sticky) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Oncology" />
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
                    src="/images/departments-images/oncology_diagnostics_realistic.jpeg"
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
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0b1c43 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center relative z-10">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <span className="inline-block bg-blue-500/20 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-400/20 uppercase tracking-widest">
              Hope Starts Here
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading leading-tight">
              Early Diagnosis <br className="hidden md:block" /> Saves Lives
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Early diagnosis is the key to cure. If you notice any unusual symptoms, consult our specialists immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 mt-10">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-xl transform hover:-translate-y-1 uppercase tracking-wide"
              >
                Book Consultation
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-blue-900/30 px-8 py-4 rounded-full font-bold text-base transition-all"
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
