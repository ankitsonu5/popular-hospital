"use client";

import Image from "next/image";
import Link from "next/link";
import { Ear, Wind, Volume2, Activity, Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "Ear Surgery",
    icon: Ear,
    desc: "Advanced microsurgery, tympanoplasty, and hearing restoration treatments.",
  },
  {
    title: "Sinus Treatment",
    icon: Wind,
    desc: "Endoscopic sinus surgeries, allergy management, and nasal obstruction corrections.",
  },
  {
    title: "Throat Care",
    icon: Volume2,
    desc: "Expert care for tonsils, voice disorders, swallowing difficulties, and airway issues.",
  },
  {
    title: "Head & Neck Surgery",
    icon: Activity,
    desc: "Specialized diagnostics and surgical procedures for head and neck tumors.",
  },
];

const commonDiseases = [
  "Hearing Defects & Ear Infections",
  "Ear Drum Perforations",
  "Throat Infections",
  "Tonsil Infection",
  "Nasal Polyps",
  "Nasal Bleeding / Allergy & Infections",
];

const whatWeOffer = [
  "Prescription of hearing aids",
  "Tympanoplasty (Eardrum repair)",
  "Tonsillectomy (Tonsil removal)",
  "Polypectomy (Nasal polyp removal)",
  "Adenotonsillectomy",
  "Mastoidectomy",
  "Septoplasty (Septum correction)",
  "CSF Rhinorrhoea repair",
  "Foreign body removal",
];

const doctors = [
  {
    name: "Dr. Anshuman Singh",
    qualifications: "M.B.B.S., MS - Otorhinolaryngology",
    designation: "Consultant ENT Surgeon",
    slug: "dr-anshuman-singh",
    image: "",
  },
  {
    name: "Dr. Sandeep Dubey",
    qualifications: "M.B.B.S., MS - Otorhinolaryngology",
    designation: "Consultant ENT Surgeon",
    slug: "dr-sandeep-dubey",
    image: "",
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

const CheckItem = ({ text }: { text: string }) => (
  <div className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex items-start gap-3">
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1e3a8a] border border-blue-100 shadow-inner">
      <Check className="h-3.5 w-3.5" />
    </span>
    <span className="text-gray-700 text-xs sm:text-sm font-bold leading-relaxed">
      {text}
    </span>
  </div>
);

/* ─── Page ─── */

export default function ENTClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/ent_banner.png"
            alt="ENT Department Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for ENT & Head-Neck Surgery
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Precision Care for <br />
              <span className="text-blue-300">Ear, Nose & Throat</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="ENT"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Description */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader title="Department of" highlight="ENT" />
              <div className="space-y-6 text-gray-700 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed font-medium text-justify">
                <p>
                  The Department of ENT at Popular Hospital provides a wide
                  range of surgical as well as medical services for the
                  disorders related to ear, nose & throat. The highly skilled
                  team of ENT specialists uses the latest equipments and
                  technologies to perform endoscopic nasal surgeries, ear
                  surgeries, and all types of routine & complex treatments.
                </p>
                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-6 shadow-sm">
                  <p className="font-semibold text-gray-800">
                    Supported by the latest modular operation theatres and
                    advanced diagnostic facilities, our department ensures
                    patients receive prompt, appropriate, and quality medical
                    care.
                  </p>
                </div>
                <p>
                  Our team specializes in treating pediatric ENT defects, voice
                  and airway disorders, sinus conditions, and head & neck
                  cancers with high precision and clinical excellence.
                </p>
              </div>
            </div>

            {/* Right Doctor Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="ENT" />
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
        </div>
      </section>

      {/* ═══════ COMMON DISEASES SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left list of diseases */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader title="Common Diseases &" highlight="Conditions" />
              <p className="text-gray-650 text-sm md:text-base font-semibold leading-relaxed">
                We provide complete diagnostics and treatment plans for a broad
                range of ear, nose, and throat conditions:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDiseases.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100/50 rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:border-blue-100 hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1e3a8a] border border-blue-100 shadow-inner">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
                    </span>
                    <span className="text-gray-700 text-sm font-bold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right illustration image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[340px] h-[400px] lg:h-[460px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-150">
                <Image
                  src="/images/departments-images/ent_diseases.png"
                  alt="ENT Diseases"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-semibold leading-relaxed bg-[#0b1c43]/80 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="font-bold mb-1 text-blue-300 uppercase tracking-widest text-[9.5px]">
                    Clinical Diagnosis
                  </p>
                  Comprehensive screening and diagnostics to identify airway,
                  hearing, or throat complications early.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT WE OFFER SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left illustration image */}
            <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[340px] h-[400px] lg:h-[460px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-150">
                <Image
                  src="/images/departments-images/ent_treatment.png"
                  alt="ENT Treatments"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-semibold leading-relaxed bg-[#0b1c43]/80 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="font-bold mb-1 text-blue-300 uppercase tracking-widest text-[9.5px]">
                    Expert Therapeutics
                  </p>
                  Modern microsurgical and medical interventions to restore
                  vital sensory functions.
                </div>
              </div>
            </div>

            {/* Right clinical offers */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              <SectionHeader
                title="Advanced Clinical"
                highlight="Treatments & Services"
              />
              <p className="text-gray-655 text-sm md:text-base font-semibold leading-relaxed">
                Our specialists offer a range of advanced therapeutic
                interventions and restorative surgical procedures:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whatWeOffer.map((item, idx) => (
                  <CheckItem key={idx} text={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
