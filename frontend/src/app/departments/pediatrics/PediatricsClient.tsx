"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock,
  Stethoscope,
  Baby,
  ShieldCheck,
  Activity,
  HeartPulse,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const introParagraphs = [
  "The Department of Pediatrics and Neonatology promotes the health of children and adolescents with a balanced approach, delivers high quality comprehensive clinical care.",
  "The department has a dedicated team of highly qualified Pediatricians and Neonatologists that take care of all babies' right from their first breath.",
  "We take care of all newborns including very fragile preterm at our state-of-the-art Neonatal Intensive Care unit with utmost commitment. Our NICU is equipped with Ultra-modern warmers, Ventilators, CPAP, LED phototherapies, open care system which is manned by highly trained nursing staff.",
  "Our PICU is also suitably equipped to take care of all Pediatric Intensive Care needs. The hospital is equipped with CT, MRI, etc. facilities for all Imaging needs and is also having excellent Pathology and Microbiology services, excellent support from other specialties like Neurology, Cardiology, Urology, Orthopedics, Surgery etc. which are available round the clock.",
];

const stats = [
  { value: "24×7", label: "Emergency Care", icon: Clock },
  { value: "NICU", label: "State-of-the-Art Unit", icon: Baby },
  { value: "PICU", label: "Intensive Care Unit", icon: Activity },
  { value: "100%", label: "Dedicated Specialists", icon: Stethoscope },
];

const servicesOffered = [
  {
    title: "Outpatient Services",
    desc: "General check-up, well baby clinic, high risk baby clinic and vaccinations",
    icon: Stethoscope,
  },
  {
    title: "Emergency Management",
    desc: "All pediatric and neonatal problems managed round-the-clock",
    icon: Clock,
  },
  {
    title: "PICU Services",
    desc: "Assisted ventilation, management of severe asthma, seizures, shock, etc.",
    icon: Activity,
  },
  {
    title: "Neonatal Resuscitation",
    desc: "Advanced resuscitation support in Labour Room and OT",
    icon: HeartPulse,
  },
  {
    title: "Ventilation & CPAP",
    desc: "Neonatal/Pediatric ventilation, CPAP & oxygen supplementation",
    icon: ShieldCheck,
  },
  {
    title: "Phototherapy",
    desc: "LED phototherapy with modern open care system for jaundice management",
    icon: Baby,
  },
  {
    title: "Exchange Blood Transfusion",
    desc: "Safe and monitored exchange transfusion procedures",
    icon: Activity,
  },
  {
    title: "LISA Technique",
    desc: "Surfactant administration using the modern LISA technique",
    icon: Stethoscope,
  },
  {
    title: "Neonatal Screening",
    desc: "Metabolic & thyroid screening, ROP screening by Ophthalmologist on call",
    icon: ShieldCheck,
  },
  {
    title: "Bedside Diagnostics",
    desc: "Bedside 2D Echo, X-Ray & USG for immediate clinical decisions",
    icon: HeartPulse,
  },
  {
    title: "Neonatal Surgery",
    desc: "Pediatric surgeon on call for all surgical needs",
    icon: Clock,
  },
  {
    title: "Peritoneal Dialysis",
    desc: "Kidney support therapy for critically ill neonates and children",
    icon: Activity,
  },
];

const indoorServices = [
  "Round-the-clock availability of qualified pediatrician on call",
  "Pediatric surgery (pediatric surgeon on call)",
  "Chemotherapy for pediatric cancer patients",
  "Asthma treatment facility",
  "Blood transfusion and chelation facility for thalassemia patients",
  "All common invasive procedures like bone marrow and liver biopsy, thoracocentesis, renal biopsy etc.",
  "Only hospital of eastern Uttar Pradesh having CRRT facility for Pediatric Patients",
  "GI endoscopy for children (in association with department of Gastroenterology)",
  "Bronchoscopy for children (in association with Pulmonologist & Pediatric Surgeon)",
];

const highlights = [
  {
    title: "Latest Technology",
    desc: "Supported by state-of-the-art equipment and experienced specialists",
    icon: Activity,
  },
  {
    title: "Expert Supervision",
    desc: "Direct supervision of Senior Neonatologists and Pediatricians at all times",
    icon: Stethoscope,
  },
  {
    title: "Parent Transparency",
    desc: "Clear communication with parents, with complete transparency & accountability",
    icon: ShieldCheck,
  },
  {
    title: "24×7 Mother Access",
    desc: "Round-the-clock access to newborns for mothers in our NICU",
    icon: Clock,
  },
  {
    title: "Antenatal Clinic",
    desc: "Dedicated clinic for parents to deal with fetal abnormalities detected on USG",
    icon: Baby,
  },
];

const doctors = [
  {
    name: "Dr. Alok C. Bhardwaj",
    qualifications: "MBBS, MD (Pediatrics) IMS, BHU",
    designation: "HEAD, DEPARTMENT OF PEDIATRICS",
    slug: "dr-alok-c-bhardwaj",
    image: "/images/departments_doctor/alok_c_bharwaj.jpg",
  },
  {
    name: "Dr. Prabhat Kumar",
    qualifications: "MBBS, DCH, DNB (Pediatrics)",
    designation: "Consultant Senior Pediatrician",
    slug: "dr-prabhat-kumar",
    image: "/images/departments_doctor/dr_prabhat_kumar.jpg",
  },
];

/* ─── Page ─── */

export default function PediatricsClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO  (unchanged layout, matching colors)
      ══════════════════════════════════════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/neonatology_banner.png"
            alt="Pediatrics Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre of Pediatrics & Neonatology
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Pediatrics &amp;
              <br />
              <span className="text-blue-300">Neonatology</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Pediatrics & Neonatology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTRO + DOCTOR SLIDER
      ══════════════════════════════════════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase">
                  Introduction
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-10 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                    Department of{" "}
                    <span className="text-[#1e3a8a]">
                      Pediatrics &amp; Neonatology
                    </span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  {introParagraphs[0]}
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  {introParagraphs[1]}
                </p>

                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-8 shadow-sm">
                  <span className="absolute -top-3 -left-3 text-blue-200 text-6xl font-serif pointer-events-none">
                    “
                  </span>
                  <p className="text-gray-700 leading-relaxed text-[15px] font-semibold italic relative z-10">
                    {introParagraphs[2]}
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  {introParagraphs[3]}
                </p>
              </div>
            </div>

            {/* Right Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Pediatrics & Neonatology"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section className="bg-[#0b1c43] py-16 border-t border-blue-900/60 relative overflow-hidden">
        {/* Decorative glow elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center gap-3 py-6 px-4 border border-blue-800/60 bg-blue-950/40 rounded-3xl hover:bg-blue-900/40 hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                  {value}
                </span>
                <span className="text-blue-300 text-xs font-bold tracking-wider uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES OFFERED
      ══════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              What We Offer
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-3xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Services <span className="text-[#1e3a8a]">Offered</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesOffered.map(({ title, desc, icon: Icon }, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50/85 text-[#1e3a8a] flex items-center justify-center border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-[#0b1c43] text-sm group-hover:text-[#1e3a8a] transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-semibold">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INDOOR SERVICES (INPATIENT CARE)
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#0b1c43] border-t border-blue-900/60 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left – Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[340px] h-[340px] md:h-[400px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10 hover:border-white/20 transition-all duration-500 group lg:self-center">
                <Image
                  src="/images/departments-images/pediatric_opd_realistic.png"
                  alt="Pediatric Indoor Services"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-[#0b1c43] text-xs font-extrabold px-4 py-2 rounded-full shadow border border-blue-100">
                    State-of-the-Art Pediatric Care
                  </span>
                </div>
              </div>
            </div>

            {/* Right – List */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">
                Inpatient Care
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1.5 h-8 rounded-full bg-blue-400 inline-block" />
                <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight">
                  Pediatric Indoor{" "}
                  <span className="text-blue-400">Services</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-700 to-transparent mb-8" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {indoorServices.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-blue-100 leading-relaxed text-sm font-semibold group-hover:text-white transition-colors duration-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HIGHLIGHTS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Why Choose Us
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-3xl font-extrabold text-[#0b1c43] font-heading tracking-tight animate-fade-in">
                Department <span className="text-[#1e3a8a]">Highlights</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left – Highlight Cards */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              {highlights.map(({ title, desc, icon: Icon }, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[#0b1c43] text-sm">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-semibold">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right – Image */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] h-[340px] md:h-[400px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-100 hover:border-blue-100 transition-colors duration-500 group lg:self-center">
                <Image
                  src="/images/departments-images/neonatology.jpeg"
                  alt="Pediatrics Highlights"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-[#0b1c43] text-xs font-extrabold px-4 py-2 rounded-full shadow border border-blue-100">
                    24/7 Neonatologist Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
