"use client";

import Image from "next/image";
import Link from "next/link";
import {
  User,
  Users,
  Brain,
  Baby,
  CheckCircle2,
  ArrowRight,
  Phone,
  HeartHandshake,
  Sparkles,
  Shield,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const featureCards = [
  {
    title: "Individual Therapy",
    icon: User,
    desc: "Evidence-based CBT, DBT, and psychodynamic therapy in a safe, supportive environment.",
  },
  {
    title: "Family Therapy",
    icon: Users,
    desc: "Addressing dynamics and communication for long-term mental health recovery.",
  },
  {
    title: "Expert Evaluation",
    icon: Brain,
    desc: "In-depth psychiatric assessments for accurate diagnoses and tailored treatment plans.",
  },
  {
    title: "Child Psychiatry",
    icon: Baby,
    desc: "Specialized care for autism, ADHD, conduct disorders, and adolescent mental health.",
  },
];

const psychiatryServices = [
  "Schizophrenia",
  "Bipolar Disorder",
  "Depression",
  "Obsessive Compulsive Disorder",
  "Personality Disorders",
  "Anxiety Disorder",
  "Substance Abuse Disorder",
  "Sexual Disorders",
  "Behavioural Addiction",
  "Disorders in Children & Adolescents (Autism, ADHD, Conduct Disorder, etc.)",
];

const whyChoose = [
  {
    icon: HeartHandshake,
    title: "Compassionate Care",
    desc: "We provide empathetic, non-judgmental care in a welcoming environment for every patient.",
  },
  {
    icon: Brain,
    title: "Expert Psychiatrists",
    desc: "Our dedicated team of psychiatrists and psychologists brings extensive experience across all mental health conditions.",
  },
  {
    icon: Sparkles,
    title: "Holistic Approach",
    desc: "We combine medication management, therapy, and lifestyle support for comprehensive mental wellness.",
  },
  {
    icon: Shield,
    title: "All Ages Covered",
    desc: "From children and adolescents to adults and elderly — we provide specialized care for every age group.",
  },
];

const doctors = [
  {
    name: "Psychiatry Specialist",
    qualifications: "MD (Psychiatry), DPM",
    designation: "Senior Consultant",
    slug: "psychiatry-specialist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800",
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

export default function PsychiatryClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] w-full bg-gradient-to-br from-[#2e1065] to-[#4c1d95] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <Image
            src="/images/banners/psychiatry_banner.png"
            alt="Psychiatry Department Banner"
            fill
            className="object-cover object-center opacity-40 mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-violet-500/20 text-violet-200 text-xs md:text-sm font-bold mb-6 border border-violet-400/30 backdrop-blur-sm uppercase tracking-wider">
              Compassionate Mental Healthcare
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-[1.1] font-heading">
              Psychiatry <br className="hidden md:block" />
              <span className="text-violet-300">Department</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Psychiatry"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white min-h-[600px]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">

          {/* ── Intro + Doctor Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <SectionLabel text="About the Department" />
              <SectionHeader title="Welcome to the" highlight="Psychiatry Department" />

              <div className="relative border-l-4 border-blue-600 pl-6 py-5 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-2xl shadow-sm">
                <p className="font-semibold text-gray-700 text-[15px] sm:text-base leading-relaxed text-justify">
                  Welcome to the Psychiatry Department at Popular Hospital, Varanasi! Our expert team of psychiatrists and psychologists is devoted to providing comprehensive care for people of all ages. We focus on mental health and are here to assist you in achieving emotional well-being and living a fulfilling life.
                </p>
              </div>

              {/* Feature Cards — 4 quick highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                {featureCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-gray-900 font-bold text-[15px] group-hover:text-[#1e3a8a] transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doctor Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider doctors={doctors} departmentName="Psychiatry" />
              </div>
            </div>
          </div>

          {/* ── Our Services — Conditions Treated ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Psychiatric Evaluation & Diagnosis" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Clinical <span className="text-[#1e3a8a]">Services</span> & Conditions Treated
              </h2>
              <div className="h-[2px] w-24 bg-[#1e3a8a] mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Card: Graphic/Illustration */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src="/images/departments-images/psychiatry_img.jpg"
                    alt="Mental Wellness & Psychiatric Care"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-[#0b1c43]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">Comprehensive Assessment</span>
                    <h3 className="text-white text-xl font-bold font-heading mt-1">Holistic Diagnosis</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-center">
                  <p className="text-gray-600 text-sm sm:text-[15px] font-medium leading-relaxed text-justify">
                    Our psychiatrists perform in-depth evaluations to understand your mental health condition and provide accurate, tailored treatment plans.
                  </p>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-50 text-[#1e3a8a] flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Evidence-Based Treatment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: Conditions List */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-[#0b1c43] font-bold text-xl mb-6 font-heading">
                    Specialized Treatment For:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {psychiatryServices.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 hover:translate-x-1 transition-all duration-200 group"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#1e3a8a] shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs sm:text-sm font-semibold leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Individual Therapy + Family Therapy ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Clinical Interventions" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Therapeutic <span className="text-[#1e3a8a]">Programs</span>
              </h2>
              <div className="h-[2px] w-24 bg-[#1e3a8a] mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Individual Therapy */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#1e3a8a] border border-blue-100 flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[#0b1c43] font-bold text-xl md:text-2xl font-heading group-hover:text-[#1e3a8a] transition-colors">
                      Individual Therapy
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify font-medium">
                      We provide individual therapy using evidence-based approaches such as cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and psychodynamic therapy. We offer a supportive, confidential environment to explore emotions, develop coping strategies, and promote personal growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Family Therapy */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#1e3a8a] border border-blue-100 flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[#0b1c43] font-bold text-xl md:text-2xl font-heading group-hover:text-[#1e3a8a] transition-colors">
                      Family Therapy
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify font-medium">
                      We understand the vital role of family in the therapeutic process. Our family therapy sessions aim to address family dynamics, communication issues, and relationship challenges that affect mental health, enhancing understanding and creating a strong support network for long-term recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Why Choose Us — dark blue band ── */}
          <div className="mt-20 rounded-3xl bg-[#0b1c43] px-8 py-14 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="mb-10 text-center space-y-3">
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase block">Our Commitment</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                  Why Choose Our <span className="text-blue-300">Psychiatry Department</span>
                </h2>
                <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChoose.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 bg-blue-900/40 border border-blue-800/60 rounded-2xl p-5 hover:bg-blue-800/50 hover:border-blue-600/60 transition-all duration-200 group"
                    >
                      <div className="h-11 w-11 shrink-0 rounded-xl bg-[#1e3a8a]/20 text-blue-300 border border-blue-500/30 flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-white font-bold text-sm sm:text-base group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-blue-100/70 text-xs sm:text-sm font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


        </div>
      </section>
    </main>
  );
}
