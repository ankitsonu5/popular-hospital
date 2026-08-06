"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

const features = [
  {
    title: "Weight Management",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    desc: "Scientific approach to sustainable weight loss and healthy weight gain.",
  },
  {
    title: "Clinical Nutrition",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    desc: "Specialized medical nutrition therapy for various clinical conditions.",
  },
  {
    title: "Diabetes Diet",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    desc: "Personalized meal planning for blood sugar control and management.",
  },
  {
    title: "Child Nutrition",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    desc: "Healthy eating patterns for proper growth and development in children.",
  },
];

const dietPlans = [
  {
    title: "Therapeutic Diets",
    items: [
      "Renal Care Diet",
      "Cardiac Health Diet",
      "Post-Surgery Recovery",
      "Gastrointestinal Support",
    ],
  },
  {
    title: "Wellness Programs",
    items: [
      "Antenatal Nutrition",
      "Elderly Care Diet",
      "Sports Nutrition",
      "General Fitness Plan",
    ],
  },
  {
    title: "Specialized Plans",
    items: [
      "Gluten-Free Diet",
      "Ketogenic (Medically Supervised)",
      "High Protein Diet",
      "Low Sodium Diet",
    ],
  },
];

/* ─── Components ─── */

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

export default function DieteticsNutritionClient({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dietetics_nutrition.jpg"
            alt="Dietetics and Nutrition Center"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Nourishing Health Professionally
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Department of Dietetics & Nutrition — Varanasi
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Dietetics & Nutrition"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white min-h-[600px]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Content Left */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader
                title="Comprehensive"
                highlight="Dietetics & Nutrition"
              />
              <div className="space-y-6 text-gray-700 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed font-medium text-justify">
                <p className="font-semibold text-[#0b1c43] bg-blue-50 p-4 md:p-5 rounded-xl border border-blue-100/60 mb-6 text-left shadow-sm">
                  Popular Hospital is widely recognized as the <strong>best Dietetics & Nutrition hospital in Varanasi</strong>. We are committed to delivering world-class healthcare and advanced medical facilities to patients across <strong>Purvanchal</strong> and <strong>Uttar Pradesh</strong>.
                </p>
                <p>
                  At Popular Hospital, Varanasi, our Department of Dietetics and
                  Nutrition is dedicated to improving overall health and
                  accelerating recovery through personalized, science-based
                  nutritional strategies. We believe that proper nutrition is a
                  cornerstone of medical treatment and disease prevention,
                  playing a crucial role in healing and maintaining a high
                  quality of life.
                </p>
                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-6 shadow-sm">
                  <p className="font-semibold text-gray-800">
                    Led by Dt. Sakshi Pandey, an expert in Food Science and
                    Clinical Nutrition, our department offers comprehensive
                    dietary management customized to each patient’s unique
                    medical history, lifestyle, and health goals.
                  </p>
                </div>
                <p>
                  Our services are backed by a complete dietary mapping
                  protocol, continuous medical checks, and targeted lifestyle
                  modifications. From managing medical conditions to therapeutic
                  diets, we help you formulate sustainable, realistic dietary
                  changes.
                </p>
              </div>
            </div>

            {/* Content Right (DoctorSlider) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Dietetics & Nutrition"
                  preventBackendFetch={true}
                />
              </div>
            </div>
          </div>

          {/* Specialized Services */}
          <div className="mt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                Our Specialities
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Nutrition <span className="text-[#1e3a8a]">Services</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-col hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 xl:gap-4 mb-4 xl:mb-5">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 shadow-inner">
                      <svg
                        className="w-5 h-5 xl:w-6 xl:h-6 text-[#1e3a8a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={feature.icon}
                        ></path>
                      </svg>
                    </div>
                    <h4 className="font-bold text-[#0b1c43] text-[17px] xl:text-[18px] leading-snug">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-[15px] xl:text-[16px] text-gray-600 font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Diet Plans Grid */}
          <div className="mt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                Structure
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Dietary <span className="text-[#1e3a8a]">Care Plans</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dietPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group"
                >
                  <h4 className="font-bold text-blue-700 text-[16px] xl:text-[17px] mb-4 border-b border-slate-50 pb-2">
                    {plan.title}
                  </h4>
                  <ul className="space-y-3">
                    {plan.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1e3a8a] border border-blue-100 shadow-inner">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-[14px] xl:text-[15px] text-gray-700 font-bold leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Our Nutrition <span className="text-[#1e3a8a]">Advantages</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>

            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                "Highly qualified and experienced dietitians",
                "Evidence-based customized meal plans",
                "Continuous monitoring and follow-up support",
                "Holistic approach integrating lifestyle modifications",
                "Coordination with your primary healthcare providers",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1e3a8a] border border-blue-100 shadow-inner">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm md:text-base font-bold text-gray-700 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
