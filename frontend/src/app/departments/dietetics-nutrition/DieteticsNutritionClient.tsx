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
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#064e3b] font-heading">
      {title} <span className="text-emerald-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-emerald-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg 2xl:text-xl font-medium">
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
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#064e3b] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
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

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold mb-6 border border-emerald-400/30 backdrop-blur-sm">
              Nourishing Health Professionally
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
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

      {/* ═══════ CONTENT SECTION (Only Doctor Appointment) ═══════ */}
      <section className="py-16 xl:py-20 bg-white min-h-[600px]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Empty Left Column to maintain position */}
            <div className="hidden lg:block lg:col-span-8"></div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Dietetics & Nutrition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
