"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShieldCheck, Activity, Glasses, Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "General Eye Care",
    icon: Eye,
    desc: "Comprehensive vision checkups for all ages.",
  },
  {
    title: "Surgical Excellence",
    icon: Activity,
    desc: "Stitchless cataract and microsurgeries.",
  },
  {
    title: "Advanced Diagnostics",
    icon: Glasses,
    desc: "Computerised eye testing and imaging.",
  },
  {
    title: "Specialized Clinics",
    icon: ShieldCheck,
    desc: "Pediatric, Glaucoma, and Retina care.",
  },
];

const outpatientProcedures = [
  "Computerised Eye Testing",
  "Treatment for Glaucoma",
  "Diagnostic Services & Eye Examination",
  "Preventive Eye Check up",
  "Computer Vision Syndrome (CVS)",
  "Glaucoma Investigations",
  "Refraction",
  "Colour Vision",
];

const specialisedProgrammes = [
  "Computerised Eye Testing / Preventive Eye Check-up",
  "Glaucoma Clinic",
  "Stitchless Cataract Surgery (Phacoemulsification)",
  "Cornea & External Eye Disease",
  "Paediatric Ophthalmology",
  "Neuro-Ophthalmology",
  "Oculoplasty & Tumours",
];

const doctors = [
  {
    name: "Dr. Disha Chaudhary",
    qualifications: "Consultant Ophthalmologist",
    designation: "Consultant",
    slug: "dr-disha-chaudhary",
    image: "",
  },
  {
    name: "Dr. Gunjan Rana",
    qualifications: "M.B.B.S, MS(Ophthalmology)",
    designation: "Consultant Ophthalmologist",
    slug: "dr-gunjan-rana",
    image: "/images/departments_doctor/dr_gunjan_rana.jpg",
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-[#1e3a8a] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

/* ─── Page ─── */

export default function OphthalmologyClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/ophthalmology_banner.png"
            alt="Ophthalmology Department Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Comprehensive Eye Care
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Restoring Vision, <br />
              <span className="text-blue-300">Enhancing Life</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Ophthalmology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white min-h-[600px]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader title="Department of" highlight="Ophthalmology" />
              <div className="space-y-6 text-gray-700 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed font-medium text-justify">
                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-6 shadow-sm">
                  <p className="font-semibold text-gray-800">
                    The Ophthalmology Department is designed to provide a
                    comprehensive range of medical and surgical eye care to
                    patients of all age groups. Our treatment plans focus on
                    protection, preservation, enhancement, and restoration of
                    vision.
                  </p>
                </div>
                <p>
                  Our department is fully equipped with state-of-the-art
                  diagnostic and therapeutic equipment for managing glaucoma,
                  cataracts, corneal and external diseases, and pediatric
                  ophthalmic disorders. We are committed to providing
                  world-class eye care with advanced diagnostic technology and
                  warm hospitality.
                </p>
              </div>
            </div>

            {/* Right Column (Doctor Sidebar) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Ophthalmology"
                />
              </div>
            </div>
          </div>

          {/* Core Expertise Grid */}
          <div className="mt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                Our Specializations
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Core <span className="text-[#1e3a8a]">Expertise</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1c43] group-hover:text-[#1e3a8a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-600">
                      {item.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Outpatient Procedures Section */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                Diagnostics
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Outpatient <span className="text-[#1e3a8a]">Procedures</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {outpatientProcedures.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-3 group"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-gray-700 font-bold text-xs sm:text-sm leading-snug pt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialised Programmes Section */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left Column (Illustration Image) */}
              <div className="lg:w-4/12 w-full flex justify-center">
                <div className="relative w-full max-w-[280px] h-[320px] lg:h-[380px] rounded-[2rem] overflow-hidden shadow-xl border-6 border-white ring-1 ring-slate-100">
                  <Image
                    src="/images/departments-images/ophthalmology_specialised.jpg"
                    alt="Specialised Eye Care"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-[11px] leading-snug bg-[#0b1c43]/85 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                    <p className="font-bold mb-0.5 text-blue-300 uppercase tracking-widest text-[8.5px]">
                      Specialised Eye Care
                    </p>
                    Comprehensive clinical interventions and micro-surgeries to
                    protect and restore your vision.
                  </div>
                </div>
              </div>

              {/* Right Column (Clinical Offers) */}
              <div className="lg:w-8/12 w-full space-y-6">
                <SectionHeader title="Specialised" highlight="Programmes" />
                <p className="text-gray-600 text-sm md:text-base font-semibold leading-relaxed">
                  Our clinicians perform advanced interventions and specialised
                  therapies for various ophthalmic conditions:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialisedProgrammes.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex items-start gap-3 group"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1e3a8a] font-extrabold text-sm border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 shadow-inner">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 text-xs sm:text-sm font-bold leading-relaxed pt-1.5">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
