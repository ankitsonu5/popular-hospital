"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  Activity, 
  CheckCircle2, 
  Heart
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";
import DepartmentGallerySection from "@/components/DepartmentGallerySection";

/* ─── Data ─── */

const uspList = [
  "Comprehensive diabetic foot ulcer & wound care management",
  "Peripheral vascular assessment (Doppler & ABI evaluations)",
  "Neuropathic foot care & pressure offloading solutions",
  "Negative Pressure Wound Therapy (NPWT / VAC therapy)",
  "Limb salvage treatments & diabetic foot care education",
];

const procedures = [
  "Surgical Wound Debridement",
  "Split Skin Grafting (SSG) for ulcers",
  "Minor Toe Amputation & Digit Preservation",
  "Doppler Ultrasound and circulation mapping",
  "Negative Pressure Wound Therapy (NPWT)",
  "Customized Orthotics & Diabetic Footwear prescription",
];

const doctors = [
  {
    name: "Diabetic Foot Specialist",
    qualifications: "MS (General Surgery / Orthopedics), Fellowship in Wound Care",
    designation: "Consultant Podiatric Surgeon",
    slug: "diabetic-foot-specialist",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800",
  }
];

/* ─── Sub-Components ─── */

const SectionHeader = ({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6">
    {eyebrow && (
      <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-2">
        {eyebrow}
      </span>
    )}
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} {highlight && <span className="text-[#1e3a8a] font-bold">{highlight}</span>}
    </h2>
    <div className="flex items-center gap-2 mt-3">
      <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
      <div className="h-[2px] w-12 bg-blue-100" />
    </div>
  </div>
);

/* ─── Page ─── */

export default function DiabeticFootClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/adv_diabetic_foot_unit.jpg"
            alt="Advanced Diabetic Foot Unit Banner"
            fill
            className="object-cover object-center opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-200 text-xs md:text-sm font-bold mb-6 border border-blue-400/30 backdrop-blur-sm uppercase tracking-wider">
              Department of
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Advanced Diabetic Foot Unit
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Advanced Diabetic Foot Unit"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Introduction & Overview */}
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Overview"
                  title="Complete Diabetic Foot Care with a"
                  highlight="Limb-Saving Approach"
                />

                <div className="relative border-l-4 border-blue-600 pl-6 py-5 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-2xl shadow-sm">
                  <p className="font-semibold text-gray-700 text-[15px] sm:text-base leading-relaxed text-justify">
                    The Advanced Diabetic Foot Unit at Popular Hospital, Varanasi is a dedicated multidisciplinary unit for diabetic foot wounds, ulcers, neuropathy, infection, and circulation-related complications.
                  </p>
                  <p className="font-semibold text-gray-700 text-[15px] sm:text-base leading-relaxed text-justify mt-3">
                    Our care model combines wound management, sugar monitoring, vascular assessment, pressure offloading, and surgical support to prevent complications and accelerate healing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-stretch">
                  {/* Left Column - 3 Mini Cards */}
                  <div className="md:col-span-6 flex flex-col gap-4">
                    {[
                      { label: "Early Detection", desc: "Identifying nerve and blood flow risks early.", icon: Activity },
                      { label: "Wound Healing", desc: "Protocol-led wound care and advanced dressings.", icon: Shield },
                      { label: "Amputation Prevention", desc: "Advanced limb salvage surgical techniques.", icon: Heart },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="group rounded-2xl border border-slate-100 bg-white p-5 hover:bg-slate-50/30 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex-1 flex flex-col justify-center"
                        >
                          <div className="flex items-center gap-4 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-100/60 text-[#1e3a8a] flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                              <Icon className="h-5 w-5" />
                            </div>
                            <p className="text-[14px] font-bold uppercase tracking-wider text-[#0b1c43]">
                              {item.label}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed pl-14">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column - Illustration Card */}
                  <div className="md:col-span-6 flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100/80 transition-all duration-300 h-full p-4 group/img">
                    <div className="relative flex-1 min-h-[220px] w-full rounded-2xl overflow-hidden shadow-sm">
                      <Image
                        src="/images/departments-images/foot_care_with_a_limb.jpg"
                        alt="Diabetic foot care illustration"
                        fill
                        className="object-cover transition-transform duration-700 group-hover/img:scale-103"
                      />
                      {/* Premium Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                        Integrated Care
                      </div>
                    </div>
                    <div className="pt-4 pb-1 px-2 flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] block mb-1">
                        Care Model
                      </span>
                      <h4 className="text-[15px] font-extrabold text-[#0b1c43] leading-snug font-heading">
                        Screening, treatment and prevention in one unit.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar - Doctor Card (4 cols) */}
            <div className="lg:col-span-4 flex justify-center w-full">
              <div className="sticky top-24 w-full">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Advanced Diabetic Foot Unit"
                  preventBackendFetch={true}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ SERVICES & PROCEDURES - side by side ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Specialized Services */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-52 w-full">
                <Image
                  src="/images/departments-images/foot_care_with_a_limb_two.jpg"
                  alt="Specialized Diabetic Foot Services"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    Specialized <span className="text-blue-300">Services:</span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3.5">
                  {uspList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Procedures */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-52 w-full">
                <Image
                  src="/images/departments-images/foot_care_with_a_limb.jpg"
                  alt="Common Procedures"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    Common <span className="text-blue-300">Procedures:</span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3.5">
                  {procedures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <DepartmentGallerySection
        departmentSlug="diabetic-foot"
        departmentName="Advanced Diabetic Foot Unit"
      />
    </main>
  );
}
