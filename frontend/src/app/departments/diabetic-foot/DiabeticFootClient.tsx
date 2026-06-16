"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Activity,
  CheckCircle2,
  Heart,
  Zap,
  Sparkles,
  Award,
  Stethoscope,
  ChevronRight,
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
    qualifications:
      "MS (General Surgery / Orthopedics), Fellowship in Wound Care",
    designation: "Consultant Podiatric Surgeon",
    slug: "diabetic-foot-specialist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800",
  },
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
      {title}{" "}
      {highlight && (
        <span className="text-[#1e3a8a] font-bold">{highlight}</span>
      )}
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
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction & Overview */}
              <div className="space-y-8">
                <SectionHeader
                  eyebrow="Overview"
                  title="Complete Diabetic Foot Care with a"
                  highlight="Limb-Saving Approach"
                />

                <div className="relative border-l-4 border-[#1e3a8a] pl-6 py-6 bg-gradient-to-r from-blue-50/30 via-white to-transparent rounded-r-3xl border-t border-b border-r border-slate-100 shadow-[0_4px_30px_rgba(30,58,138,0.02)]">
                  <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-blue-50/50 flex items-center justify-center text-[#1e3a8a]/10 pointer-events-none">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <p className="font-bold text-slate-700 text-[15px] sm:text-base leading-relaxed text-justify">
                    The Advanced Diabetic Foot Unit at Popular Hospital,
                    Varanasi is a dedicated multidisciplinary unit for diabetic
                    foot wounds, ulcers, neuropathy, infection, and
                    circulation-related complications.
                  </p>
                  <p className="font-semibold text-slate-500 text-[14px] sm:text-[15px] leading-relaxed text-justify mt-3">
                    Our care model combines wound management, sugar monitoring,
                    vascular assessment, pressure offloading, and surgical
                    support to prevent complications and accelerate healing.
                  </p>
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

          {/* Interactive Stats Grid & Mini Cards Section (Full Width, directly below Doctor Card) */}
          <div className="mt-16 space-y-8">
            {/* Interactive Stats Grid (4 columns) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: "95%+",
                  label: "Limb Salvage",
                  color: "from-blue-600 to-indigo-600",
                  desc: "Highest success in preventing amputation",
                },
                {
                  value: "3x",
                  label: "Faster Healing",
                  color: "from-[#E85222] to-orange-500",
                  desc: "With specialized NPWT & VAC therapies",
                },
                {
                  value: "24/7",
                  label: "Trauma Care",
                  color: "from-teal-600 to-emerald-500",
                  desc: "Immediate podiatric emergency support",
                },
                {
                  value: "100%",
                  label: "Integrated",
                  color: "from-purple-600 to-pink-600",
                  desc: "Multidisciplinary specialist coordination",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50/60 via-white to-white p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(30,58,138,0.05)] hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 group"
                >
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-blue-500/5 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                  <span
                    className={`block text-2xl md:text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </span>
                  <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mt-2 mb-1">
                    {stat.label}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mini Cards - 3 columns full-width */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Early Detection",
                  desc: "Identifying nerve and blood flow risks early.",
                  icon: Activity,
                  bg: "from-blue-500/5 to-indigo-500/5",
                  border: "hover:border-blue-200/80 hover:shadow-blue-500/5",
                  text: "text-blue-600",
                  iconBg:
                    "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                },
                {
                  label: "Wound Healing",
                  desc: "Protocol-led wound care and advanced dressings.",
                  icon: Shield,
                  bg: "from-teal-500/5 to-emerald-500/5",
                  border: "hover:border-teal-200/80 hover:shadow-teal-500/5",
                  text: "text-teal-600",
                  iconBg:
                    "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
                },
                {
                  label: "Amputation Prevention",
                  desc: "Advanced limb salvage surgical techniques.",
                  icon: Heart,
                  bg: "from-[#E85222]/5 to-orange-500/5",
                  border:
                    "hover:border-orange-200/80 hover:shadow-orange-500/5",
                  text: "text-[#E85222]",
                  iconBg:
                    "bg-orange-50 text-[#E85222] group-hover:bg-[#E85222] group-hover:text-white",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/30 p-5 ${item.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />
                    <div className="relative z-10 flex items-center gap-3 mb-2">
                      <div
                        className={`h-10 w-10 rounded-xl ${item.iconBg} border border-slate-100 text-[#1e3a8a] flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-[13px] font-extrabold uppercase tracking-wider text-slate-800">
                        {item.label}
                      </p>
                    </div>
                    <p className="relative z-10 text-xs text-slate-500 font-semibold leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Width Foot Care Feature Card */}
          <div className="w-full mt-16 group/img">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image in premium container */}
              <div className="md:col-span-5 relative h-[360px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/images/departments-images/diabitic_foot_care.jpg"
                  alt="Diabetic foot care illustration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                />
                {/* Premium Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#1e3a8a] to-blue-700 text-white text-[9px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                  Integrated Care
                </div>
              </div>

              {/* Right Column: Elegant content */}
              <div className="md:col-span-7 space-y-4 md:pl-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Care Model
                </span>
                <h4 className="text-xl md:text-2xl font-extrabold text-[#0b1c43] leading-snug font-heading">
                  Screening, treatment and prevention in one unit.
                </h4>
                <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed text-justify">
                  Our integrated care model ensures that every diabetic foot
                  complication is caught early and managed by a
                  multidisciplinary team. By bringing together diagnostics,
                  advanced wound care therapies, pressure-offloading solutions,
                  and specialized clinical expertise, we provide a unified path
                  to healing and prevent serious complications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES & PROCEDURES - side by side ═══════ */}
      <section className="py-20 xl:py-16 bg-gradient-to-b from-slate-50/50 to-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-550/10 border border-blue-100 text-[#1e3a8a] text-xs font-bold mb-3 uppercase tracking-wider">
              Clinical Offerings
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading">
              Specialized Care &{" "}
              <span className="text-[#1e3a8a]">Advanced Procedures</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed">
              We offer comprehensive screening, state-of-the-art therapies, and
              expert surgical interventions to ensure the best patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Specialized Services */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-blue-100/50 transition-all duration-500 flex flex-col h-full group">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src="/images/departments-images/foot_care_with_a_limb_two.jpg"
                  alt="Specialized Diabetic Foot Services"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <span className="inline-block px-2.5 py-1 rounded bg-blue-500/20 text-blue-200 text-[10px] font-extrabold uppercase tracking-widest mb-2 border border-blue-400/20 backdrop-blur-sm">
                    Patient Care
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Specialized <span className="text-blue-300">Services</span>
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {uspList.map((item, idx) => {
                    const serviceIcons = [Shield, Activity, Heart, Zap, Award];
                    const ServiceIcon = serviceIcons[idx % serviceIcons.length];

                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
                      >
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center text-[#1e3a8a] shadow-sm">
                          <ServiceIcon className="w-5 h-5" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-slate-800 text-[14px] font-bold leading-normal">
                            {item}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Common Procedures */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.06)] hover:border-orange-100/50 transition-all duration-500 flex flex-col h-full group">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src="/images/departments-images/diabitic_wound_care.jpg"
                  alt="Common Procedures"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#E85222]/20 text-orange-200 text-[10px] font-extrabold uppercase tracking-widest mb-2 border border-orange-400/20 backdrop-blur-sm">
                    Clinical Precision
                  </span>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Common <span className="text-orange-300">Procedures</span>
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {procedures.map((item, idx) => {
                    const procedureIcons = [
                      Stethoscope,
                      Sparkles,
                      Shield,
                      Activity,
                      Zap,
                      Heart,
                    ];
                    const ProcedureIcon =
                      procedureIcons[idx % procedureIcons.length];

                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
                      >
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E85222] shadow-sm">
                          <ProcedureIcon className="w-5 h-5" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-slate-800 text-[14px] font-bold leading-normal">
                            {item}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
