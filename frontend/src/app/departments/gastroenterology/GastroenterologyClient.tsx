"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data ─── */

const facilities = [
  "Upper & Lower GI Endoscopy",
  "Colonoscopy",
  "Gastroscopy",
  "B.D Stone(ERCP)",
  "Oesophageal & Rectal Dilation",
  "Biliary Stenting, Oesophageal Stenting",
];

const conditions = [
  "Acid Reflux (GERD)",
  "Chronic Constipation",
  "Irritable Bowel Syndrome (IBS)",
  "Fatty Liver Disease",
  "Gallstones",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Pancreatitis",
  "Hemorrhoids",
  "Celiac Disease",
  "Hepatitis B & C",
  "Cirrhosis of Liver",
];

const doctors = [
  {
    name: "Dr. Anirban De",
    qualifications: "MBBS, MD, DM (Gastroenterology)",
    designation: "Consultant Gastroenterologist",
    slug: "dr-anirban-de",
    image: "/images/departments_doctor/dr_anirban_de.png",
  },
  {
    name: "Dr. R.K Singh",
    qualifications: "MBBS, MS, FIAGES, FSG",
    designation: "Consultant Gastrosurgeon",
    slug: "dr-r-k-singh",
    image: "",
  },
  {
    name: "Dr. Mahesh Tiwari",
    qualifications: "MBBS, MS, MCh (Gastrosurgery)",
    designation: "Consultant GI and HPB Surgeon",
    slug: "dr-mahesh-tiwari",
    image: "/images/departments_doctor/dr_mahesh_tiwari.png",
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
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function GastroenterologyClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/gastroenterology.png"
            alt="Gastroenterology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Digestive & Liver Diseases
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Gastroenterology <br className="hidden md:block" />
              <span className="text-blue-300">Excellence</span>
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
      <section className="py-16 xl:py-10 2xl:py-20 bg-gray-50/50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="Gastroenterology"
              />
              <div className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg xl:text-[15px] 2xl:text-xl font-medium text-justify">
                <p>
                  The Dept. of Gastroenterology and liver services has the input
                  of the best medical and surgical gastroenterologists.
                  Interventional Endoscopy relating to the biliary tract and
                  management of complications of portal hypertension. In
                  addition to Oesophageal and Rectal dilation, Colonic
                  Polypectomics and the placement of feeding gastrostomies,
                  Oesophageal stents continues to expand and comprises a greater
                  percentage of the total endoscopy work of the department.
                </p>
              </div>

              <SectionHeader
                title="The department offers the following"
                highlight="facilities:"
              />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 mb-8">
                {facilities.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            {/* Right Sidebar - Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Gastroenterology"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
