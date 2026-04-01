"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

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

const doctors = [
  {
    name: "Dt. Sakshi Pandey",
    qualifications: "MSc. (Food Science), CCN, CDE, PGDDN",
    designation: "Dietition And Center Head",
    slug: "dietetics-specialist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800",
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
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#064e3b] font-heading">
      {title} <span className="text-emerald-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-emerald-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-emerald-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

export default function DieteticsNutritionClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#064e3b] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dietetics_nutrition.png"
            alt="Dietetics and Nutrition Center"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-[#064e3b]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold mb-6 border border-emerald-400/30 backdrop-blur-sm">
              Nourishing Health Professionally
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Dietetics & <br />
              <span className="text-emerald-400">Nutrition</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="Dietetics & Nutrition"
              />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  The Dietetics & Nutrition department at Popular Hospital
                  focuses on the prevention and management of diseases through
                  professional nutritional guidance. Our clinical nutritionists
                  work closely with the medical team to provide nutrition
                  therapy for patients across all specialties.
                </p>
                <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-600">
                  <p>
                    We understand that every individual is unique. Our expert
                    dietitians create personalized, evidence-based nutrition
                    plans tailored to your lifestyle, medical history, and
                    health goals, ensuring optimal recovery and long-term
                    wellness.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={feature.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Doctor Card with Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Dietetics & Nutrition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DIET PLANS SECTION ═══════ */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <SectionHeader title="Specialized" highlight="Dietary Plans" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dietPlans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-[#064e3b] mb-6">
                  {plan.title}
                </h3>
                <ul className="space-y-4">
                  {plan.items.map((item, i) => (
                    <ListItem key={i} text={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
