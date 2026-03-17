'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

/* ─── Data (exact from original page content) ─── */

const hospitalOptions = [
  'Open Surgery',
  'Endo-Urology: PCNI, URS, URSL, TURP, TUR-BT, RIRS',
  'Andrology',
  'Female Urology',
  'Pediatric Urology',
  'Uro-Oncology',
  'Urology Laparoscopy',
];

const procedures = [
  'Uroflowmetry and Urodynamic - to help in an accurate diagnosis of diseases of the Lower Urinary Track',
  'Flexible Cystoscopy for Diagnostic OPD Cystourethroscopy',
  'Flexible UreterRenoscopy and Laser Lithotripsy/RIRS for treating Kidney Stones without any holes/cuts',
  'Laparoscopic treatment for diseases of the Kidney, Ureter and Bladder including Laparoscopic Uro Oncology and Laparoscopic Reconstructive Urology',
  'Reconstructive Surgeries for complex diseases of the Kidney, Ureter, Bladder and Urethra including Laparoscopic Pyeloplasty, Augmentation Cystoplasty etc.',
  'Female Urology including VVF Repair, TOT/TVT for Stress Urinary Incontinence, recurrent UTI, Urethral Stenosis etc.',
  'Andrology & Male Infertility including Penile Prosthesis, Artificial Urinary Sphincter, Testicular Prosthesis, VVA and VEA etc.',
];

const doctors = [
  {
    name: 'Dr Dinesh Singh',
    qualifications: 'MBBS, MS, MCh (Urology)',
    designation: 'Consultant Urologist',
    slug: 'dr-dinesh-singh',
    image: '',
  },
  {
    name: 'Dr Piyush Saini',
    qualifications: 'MBBS, MS, MCh (Urology)',
    designation: 'Consultant Urologist',
    slug: 'dr-piyush-saini',
    image: '/images/departments-images/dr_piyush_saini.png',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">
      {title}{' '}
      <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function UrologyClient() {

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/urology.png"
            alt="Urology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
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
              Urology
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

      {/* ═══════ CONTENT + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Urology" />

              {/* What is Urology */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">What Is Urology?</h3>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify">
                  Urology is a surgical speciality which deals with diseases of the male and female urinary Tract and of the male reproductive organs. The Department of Urology at Popular Hospital is at the forefront of providing clinical services, innovative treatment strategies. It deals with the disorder of Kidney, Urine bladder, Prostate gland, Testis & penis.
                </p>
              </div>

              {/* What Are Kidney Stones */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">What Are Kidney Stones?</h3>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify mb-4">
                  Kidney stones are small, hard deposits that form inside your kidneys. The stones are made of mineral and acid salts. Kidney stones have many causes and can affect any part of your urinary tract — from your kidneys to your bladder. Often, stones form when the urine becomes concentrated, allowing minerals to crystallize and stick together.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify">
                    <strong className="text-[#0b1c43]">Percutaneous nephrolithotomy:</strong> Percutaneous nephrolithotomy (PCNL) is a minimally-invasive procedure which is done to remove stones from the kidney by a small puncture wound up to about 1 cm through the skin. It is most suitable to remove the stones which are more than 2 cm in size and which are present near the pelvic region.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider doctors={doctors} departmentName="Urology" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ OPTIONS AT POPULAR HOSPITAL ═══════ */}
      <section className="py-14 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">
              Options at <span className="text-blue-600">Popular Hospital</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="h-[2px] w-12 bg-gray-300" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {hospitalOptions.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0b1c43] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-sm leading-snug pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES ═══════ */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-600 font-heading mb-4">
              Our Procedures
            </h2>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="h-[2px] w-16 bg-gray-200" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {procedures.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-md bg-[#0b1c43] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed pt-1 font-medium">
                  {item}
                </p>
              </div>
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
              Take the First Step
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
              Take the First Step Towards Relief
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Don&apos;t let urinary problems affect your quality of life. Our expert urologists are here to help you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg uppercase tracking-wide"
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
