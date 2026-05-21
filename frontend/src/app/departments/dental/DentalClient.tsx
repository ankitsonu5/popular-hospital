"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  ShieldCheck,
  Layers,
  Activity,
  Smile,
  RefreshCw,
  Heart,
  Info,
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "10K+", label: "Patients Treated" },
  { value: "5", label: "Specialties" },
  { value: "100%", label: "Digital Imaging" },
];

const features = [
  {
    title: "Painless Procedures",
    icon: Sparkles,
    desc: "Advanced anesthesia and gentle techniques for anxiety-free, comfortable dental care.",
  },
  {
    title: "Precision Technology",
    icon: Camera,
    desc: "Digital X-rays and intra-oral cameras for accurate, real-time diagnoses.",
  },
  {
    title: "Specialized Care",
    icon: ShieldCheck,
    desc: "Expert treatment for complex dental and maxillofacial conditions.",
  },
  {
    title: "Radiological Support",
    icon: Layers,
    desc: "Superior diagnostic amenities including Dentascan, OPG, and periapical X-rays.",
  },
];

const specialties = [
  {
    title: "Oral & Maxillofacial Surgery",
    desc: "Removal of impacted teeth, fixation of facial fractures to jaw corrective surgeries.",
    icon: Activity,
  },
  {
    title: "Prosthodontics",
    desc: "Complete rehabilitation of occlusion including maxillofacial Prosthetics.",
    icon: RefreshCw,
  },
  {
    title: "Orthodontics & Dentofacial Orthopaedics",
    desc: "Alignment of crowded teeth and correction of jaw discrepancies.",
    icon: Smile,
  },
  {
    title: "Pediatric Dentistry",
    desc: "Child dentistry emphasised to reduce the incidence of dental ailments in adults.",
    icon: Heart,
  },
  {
    title: "Periodontics",
    desc: "Gum strengthening, Gingival Flap Surgeries, Bone Grafts, Depigmentation, Frenectomy.",
    icon: ShieldCheck,
  },
];

const radiologyFeatures = [
  "Cordless Digital Intra-oral Periapical Radiographs",
  "Orthopantomograph (OPG)",
  "Dentascan for precise implant planning",
  "Same-day digital reports",
];

const doctors = [
  {
    name: "Dr. Hena Kauser",
    qualifications: "BDS, MPH",
    designation: "Consultant Dentist",
    slug: "dr-hena-kauser",
    image: "/images/departments_doctor/dr_heena_kauser.jpg",
  },
];

/* ─── Sub-Components ─── */

const SectionLabel = ({ text }: { text: string }) => (
  <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3">
    {text}
  </span>
);

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title}{" "}
      <span className="text-[#1e3a8a] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-3">
      <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
      <div className="h-[2px] w-12 bg-blue-100" />
    </div>
  </div>
);

/* ─── Page ─── */

export default function DentalClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dental_care_banner.png"
            alt="Dental Care Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Comprehensive <br />
              <span className="text-blue-300">Dental Care</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Dental"
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

          {/* Intro + Doctor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionLabel text="About the Department" />
              <SectionHeader title="Department of" highlight="Dental" />
              <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/60 to-transparent rounded-r-3xl shadow-sm">
                <p className="font-semibold text-gray-700 text-base md:text-[15px] leading-relaxed">
                  The department is operational with state-of-the-art dental equipment harmonizing international standards to deliver quality treatment to patients. This multi-sphere dental unit offers a high-quality, specialized dental care experience with excellence, comfort, and a soothing atmosphere — offering a full range of dental services under one roof.
                </p>
              </div>

              {/* Quick highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "International-standard equipment",
                  "Pain-free treatment protocols",
                  "Advanced digital diagnostics",
                  "All specialties under one roof",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-blue-50/50 rounded-xl px-4 py-3 border border-blue-100/60">
                    <CheckCircle2 className="h-4 w-4 text-[#1e3a8a] shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Dental" />
              </div>
            </div>
          </div>

          {/* ── Why Choose Us — full-width deep blue band ── */}
          <div className="mt-20 rounded-3xl bg-[#0b1c43] px-8 py-14 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase block mb-2">Core Advantages</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                  Why Choose Our <span className="text-blue-300">Dental Care</span>
                </h2>
                <div className="h-[2px] w-24 bg-blue-500 mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-blue-800/60 bg-blue-900/40 backdrop-blur-sm p-6 hover:bg-blue-800/50 hover:border-blue-600/60 transition-all duration-300 flex flex-col gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-[#1e3a8a]/20 text-blue-300 flex items-center justify-center border border-blue-500/30 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium leading-relaxed text-blue-200/70">
                        {item.desc}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Oral & Dental Specialties ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <SectionLabel text="Clinical Programmes" />
                <SectionHeader title="Oral & Dental" highlight="Specialties" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed md:max-w-xs md:text-right">
                Advanced interventions across all major dental disciplines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {specialties.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          0{idx + 1}
                        </span>
                      </div>
                      <h4 className="text-[#0b1c43] font-bold text-sm sm:text-[15px] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 mt-7 flex items-start gap-3">
              <Info className="h-5 w-5 text-[#1e3a8a] shrink-0 mt-0.5" />
              <p className="text-gray-600 text-xs sm:text-sm font-semibold italic leading-relaxed">
                Craniofacial Surgeries are performed in close collaboration with the Department of Plastic Surgery.
              </p>
            </div>
          </div>

          {/* ── Digital Radiological Support ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <SectionLabel text="Diagnostic Infrastructure" />
              <SectionHeader title="Digital Radiological" highlight="Support" />

              <p className="text-gray-700 text-base leading-relaxed font-semibold">
                The department is backed by exceptional diagnostic amenities — including cordless digital Intra-oral periapical radiographs, Orthopantomograph (OPG), and Dentascan — ensuring flawless management of even the most complex dental conditions.
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                The Department of Dentistry at Popular Hospital practices everything about dentistry under one roof, delivering international-standard care in a comfortable, sterile, and pain-free environment.
              </p>

              {/* Feature checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {radiologyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 bg-blue-50/50 rounded-xl px-4 py-3 border border-blue-100/60">
                    <CheckCircle2 className="h-4 w-4 text-[#1e3a8a] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs sm:text-sm font-semibold leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
