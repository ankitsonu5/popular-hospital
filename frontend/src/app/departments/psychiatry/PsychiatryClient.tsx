"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const featureCards = [
  {
    title: "Individual Therapy",
    icon: "user",
    desc: "Evidence-based CBT, DBT, and psychodynamic therapy.",
  },
  {
    title: "Family Therapy",
    icon: "users",
    desc: "Addressing dynamics and communication for long-term recovery.",
  },
  {
    title: "Expert Evaluation",
    icon: "brain",
    desc: "In-depth psychiatric assessments for accurate diagnoses.",
  },
  {
    title: "Child Psychiatry",
    icon: "child",
    desc: "Specialized care for autism, ADHD, and conduct disorders.",
  },
];

const psychiatryServices = [
  "Schizophrenia",
  "Bipolar disorder",
  "Depression",
  "Obsessive Compulsive Disorder",
  "Personality disorders",
  "Anxiety disorder",
  "Substance abuse disorder",
  "Sexual Disorders",
  "Behavioural Addiction",
  "Disorders in children and adolescents- autism, ADHD, conduct disorder, etc",
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

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-8 2xl:mb-12">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#2e1065] font-heading leading-tight uppercase tracking-wide">
      {title} <span className="text-violet-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-violet-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-violet-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function PsychiatryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
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
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT AREA ═══════ */}
      <section className="py-20 xl:py-12 2xl:py-24 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="mb-12">
                <SectionHeader
                  title="Welcome to the"
                  highlight="Psychiatry Department"
                />
                <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-10 font-medium text-justify">
                  <p>
                    Welcome to the Psychiatry Department at Popular Hospital,
                    Varanasi! Our expert team of psychiatrists and psychologists
                    is devoted to providing comprehensive care for people of all
                    ages. We focus on mental health and are here to assist you
                    in achieving emotional well-being and living a fulfilling
                    life.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Our" highlight="Services" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-8 font-medium text-justify">
                  <p>
                    <span className="font-bold text-[#2e1065]">
                      Psychiatric Evaluation and Diagnosis:
                    </span>{" "}
                    Our psychiatrists perform in-depth evaluations to understand
                    your mental health condition and provide accurate diagnoses.
                    We focus on your unique experiences and concerns to create
                    tailored treatment plans. We provide treatment of
                    psychiatric illnesses like:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    {psychiatryServices.map((item, idx) => (
                      <ListItem key={idx} text={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Individual" highlight="Therapy" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-6 font-medium text-justify">
                  <p>
                    We provide individual therapy using evidence-based
                    approaches such as cognitive-behavioral therapy (CBT),
                    dialectical behavior therapy (DBT), and psychodynamic
                    therapy. We offer a supportive environment to explore
                    emotions, develop coping strategies, and promote personal
                    growth.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Family" highlight="Therapy" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-10 font-medium text-justify">
                  <p>
                    We understand the role of family in the therapeutic process.
                    Our family therapy sessions aim to address dynamics,
                    communication issues, and relationship challenges that
                    affect mental health, enhancing understanding and support
                    for long-term recovery.
                  </p>
                </div>
              </div>

              <div className="bg-violet-50 p-8 2xl:p-12 rounded-2xl border border-violet-100 text-gray-800 text-base md:text-lg 2xl:text-xl leading-relaxed font-bold text-justify">
                <p>
                  At Popular Hospital, our Psychiatry Department is devoted to
                  offering personalized and empathetic care in a welcoming,
                  non-judgmental setting. We strive to support each individual
                  in their journey toward emotional well-being, ensuring they
                  receive the help and hope they need to thrive.
                </p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit py-10">
                <DoctorSlider doctors={doctors} departmentName="Psychiatry" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-[#2e1065] overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-8 font-heading leading-tight">
            Your Path to <br className="hidden md:block" /> Emotional Well-being
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/doctors"
              className="bg-[#E85222] text-white hover:bg-orange-600 px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1 uppercase tracking-wide"
            >
              Connect with Experts
            </Link>
            <a
              href="tel:+917800001895"
              className="bg-transparent border-2 border-violet-400/50 text-violet-100 hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
            >
              +91-7800001895 / 96
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
