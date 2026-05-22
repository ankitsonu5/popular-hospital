"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Wind,
  Microscope,
  ShieldCheck,
  Activity,
  Moon,
  Stethoscope,
  HeartPulse,
  Cigarette,
  Users,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const services = [
  {
    title: "Diagnosis & Treatment",
    icon: Stethoscope,
    content:
      "Our respiratory experts diagnose and manage asthma, COPD, pneumonia, bronchitis, and more through thorough examinations, diagnostic tests, and personalized treatment plans.",
  },
  {
    title: "Pulmonary Function Testing",
    icon: Activity,
    content:
      "Comprehensive pulmonary function tests evaluate lung function, measure capacity, and assess oxygen exchange — helping diagnose conditions and monitor treatment effectiveness.",
  },
  {
    title: "Bronchoscopy",
    icon: Microscope,
    content:
      "Advanced bronchoscopy technology allows us to visualize airways and obtain tissue samples for analysis, guiding diagnosis and treatment decisions for lung diseases.",
  },
  {
    title: "Sleep Disorder Evaluation",
    icon: Moon,
    content:
      "Specialized sleep studies diagnose sleep apnea and related breathing disorders, with management including CPAP therapy, lifestyle modifications, and patient education.",
  },
  {
    title: "Asthma & COPD Management",
    icon: Wind,
    content:
      "Personalized treatment plans including medications, inhaler techniques, lifestyle modifications, and self-management strategies to improve quality of life.",
  },
  {
    title: "Smoking Cessation & Rehabilitation",
    icon: Cigarette,
    content:
      "Specialized cessation programs with counseling, behavioral therapies, and medical interventions. Respiratory rehabilitation programs combine exercise and education to enhance lung capacity.",
  },
];

const scopeOfTreatment = [
  "Asthma & Difficult Asthma",
  "Allergy",
  "COPD (Chronic Obstructive Pulmonary Disease)",
  "ILD (Interstitial Lung Disease) & Rehabilitation",
  "Severe Pneumonia",
  "Complicated Lung Infection",
  "Bronchoscopy — Rigid & Flexible",
  "Thoracoscopy",
  "EBUS",
  "Sleep Medicine",
  "Pleural Catheter",
  "TB / Post TB Sequelae",
  "Respiratory Critical Care",
];

const whyChooseUs = [
  {
    title: "Expert Specialists",
    icon: Users,
    content:
      "Our skilled physicians bring extensive experience ensuring the highest quality respiratory care.",
  },
  {
    title: "Advanced Technology",
    icon: BrainCircuit,
    content:
      "Cutting-edge diagnostic tools for accurate assessments and personalized treatment plans.",
  },
  {
    title: "Patient-Centered Approach",
    icon: HeartPulse,
    content:
      "A compassionate environment where you are heard, understood, and actively involved in decisions.",
  },
  {
    title: "Collaborative Care",
    icon: ShieldCheck,
    content:
      "We work closely with other specialties for comprehensive, integrated respiratory health care.",
  },
  {
    title: "Education & Support",
    icon: Wind,
    content:
      "We empower patients with knowledge and support groups to actively manage their respiratory conditions.",
  },
];

const doctors = [
  {
    name: "Dr. K. P. Singh",
    qualifications: "MBBS, MD (Respiratory Medicine), Dip Card",
    designation: "Sr. Consultant Pulmonologist",
    slug: "dr-kp-singh",
    image: "/images/departments_doctor/dr_k_p_singh.jpg",
  },
  {
    name: "Dr. Shailendra Shivhare",
    qualifications: "MBBS, MD (Respiratory Medicine)",
    designation: "Consultant Pulmonologist",
    slug: "dr-shailendra-shivhare",
    image: "/images/departments_doctor/dr_sailendra shivhare.jpg",
  },
  {
    name: "Dr. Vikas Jaiswal",
    qualifications: "MBBS, DTCD, DNB (Respiratory Medicine)",
    designation: "Consultant Pulmonologist",
    slug: "dr-vikas-jaiswal",
    image: "/images/departments_doctor/dr_vikas_jaiswal.jpg",
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
      {title} <span className="text-[#1e3a8a] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-3">
      <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
      <div className="h-[2px] w-12 bg-blue-100" />
    </div>
  </div>
);

/* ─── Page ─── */

export default function RespiratoryClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#164e63] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/respiratory_medicine.png"
            alt="Respiratory Care"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#164e63] via-[#164e63]/90 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-100 text-xs md:text-sm font-bold mb-4 border border-cyan-400/30 backdrop-blur-sm uppercase tracking-wider">
              Centre for Advanced Pulmonology
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-6xl font-bold text-white mb-4 leading-[1.1] font-heading">
              Department of{" "}
              <span className="text-cyan-400">
                Pulmonology &amp; Chest/Respiratory Medicine Department
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center justify-center gap-2 text-center uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Respiratory Medicine"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
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

          {/* ── Intro + Doctor Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <SectionLabel text="About the Department" />
              <SectionHeader title="Pulmonology &" highlight="Respiratory Medicine" />

              <div className="space-y-4 text-gray-700 text-base md:text-[15px] leading-relaxed font-medium">
                <p className="text-justify">
                  Our Respiratory Medicine Department is dedicated to providing exceptional care of chest, lungs, and sleep disorders — helping you breathe and providing comprehensive treatment for a wide range of respiratory illnesses such as asthma, COPD, pneumonia (including COVID-19), lung cancer, lung fibrosis, sleep apnea, and more.
                </p>
                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/60 to-transparent rounded-r-3xl shadow-sm">
                  <p className="font-semibold text-gray-800">
                    With our highly experienced team of respiratory specialists and state-of-the-art facilities, we are committed to helping you breathe easier and live a fulfilling life.
                  </p>
                </div>
              </div>

              {/* Quick highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  "Expert Pulmonologists on team",
                  "Advanced Sleep Lab & Bronchoscopy",
                  "Specialized ICU for respiratory care",
                  "Comprehensive pulmonary testing",
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
                <DoctorSlider doctors={doctors} departmentName="Respiratory Medicine" />
              </div>
            </div>
          </div>

          {/* ── Department Image + Overview ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Image */}
              <div className="lg:w-5/12 w-full flex justify-center">
                <div className="relative w-full max-w-sm h-[340px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white ring-2 ring-blue-100">
                  <Image
                    src="/images/departments-images/pulmonology.jpeg"
                    alt="Pulmonology Department"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0b1c43]/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <p className="text-[8.5px] font-bold text-blue-300 uppercase tracking-widest mb-0.5">Department Overview</p>
                    <p className="text-white text-[11px] leading-snug font-medium">Advanced care for all respiratory and pulmonary conditions.</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-7/12 w-full space-y-6">
                <SectionLabel text="Our Commitment" />
                <SectionHeader title="Patient-Centered" highlight="Respiratory Care" />
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                  At our Respiratory Department, patient-centered care is our top priority. We strive to create a comfortable and supportive environment where you can openly discuss your concerns and receive the highest standard of pulmonary care.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
                  We understand the importance of healthy lungs and the impact that respiratory health has on our overall well-being. Our team is committed to providing you with the most effective and tailored care for every respiratory condition.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/book"
                    className="bg-[#0b1c43] hover:bg-blue-900 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-lg"
                  >
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Services We Offer ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Clinical Services" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Services <span className="text-[#1e3a8a]">We Offer</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <article
                    key={idx}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-100 transition-all duration-300 flex flex-col gap-4 group"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c43] group-hover:text-[#1e3a8a] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-500 flex-1">
                      {item.content}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ── Scope of Treatment — dark blue band ── */}
          <div className="mt-20 rounded-3xl bg-[#0b1c43] px-8 py-14 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="mb-10 text-center space-y-3">
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase block">Conditions Treated</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                  Scope of <span className="text-blue-300">Treatment</span>
                </h2>
                <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {scopeOfTreatment.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-blue-900/40 border border-blue-800/60 rounded-xl px-4 py-3 hover:bg-blue-800/50 hover:border-blue-600/60 transition-all duration-200 group"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 group-hover:text-blue-300" />
                    <span className="text-blue-100 text-xs sm:text-sm font-semibold leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Why Choose Us ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Our Strengths" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Why Choose Our <span className="text-[#1e3a8a]">Respiratory Department</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyChooseUs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-[#0b1c43] font-bold text-sm sm:text-base group-hover:text-[#1e3a8a] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>



        </div>
      </section>
    </main>
  );
}
