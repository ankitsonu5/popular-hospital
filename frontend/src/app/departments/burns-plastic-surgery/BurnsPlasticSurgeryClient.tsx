"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data (exact from original page) ─── */

const burnsCauses = [
  "Hot liquids (scalds)",
  "Hot solids (contact burns)",
  "Flames (flame burns)",
];

const burnsClassifications = [
  "First-degree (superficial) burns: First-degree burns affect only the outer layer of skin, the epidermis",
  "Second-degree (partial thickness) burns",
  "Third-degree (full thickness) burns",
  "Fourth-degree burns: (Extend beneath the subcutaneous tissues)",
  'The size of a burn can be quickly estimated by using the "rule of nines."',
  "During a burn evaluation we examine the wound and figure out an estimated percentage of total body surface area (TBSA) that has been burned.",
  "We at Popular hospital treat burn case having 20% of total body surface area only",
];

const procedures = [
  "Aesthetic plastic surgery",
  "Reconstructive surgery",
  "Craniofacial surgery",
  "Reconstructive microsurgery",
  "Paediatric plastic surgery",
  "Laser surgery",
  "Hand surgery",
  "Lymphatic surgery (Filarial surgery)",
  "Body contouring surgery (LIPOSUCTION)",
  "Breast Reconstruction: Reduction & Augmentation",
  "Genital surgery: Hypospadias, Reconstruction",
  "Peripheral nerve surgery",
  "Burn reconstructive surgery",
  "Sex change surgery",
];

const doctors = [
  {
    name: "Dr A.K Pradhan",
    qualifications: "MBBS, MS, MCh (Plastic Surgery)",
    designation: "Consultant Plastic Surgeon",
    slug: "dr-ak-pradhan",
    image: "",
  },
  {
    name: "Dr Sudhir Singh",
    qualifications: "MBBS, MS, MCh (Plastic Surgery)",
    designation: "Consultant Plastic Surgeon",
    slug: "dr-sudhir-singh",
    image: "",
  },
  {
    name: "Dr Deepak Agrahari",
    qualifications: "MBBS, MS, MCh (Plastic Surgery)",
    designation: "Consultant Plastic Surgeon",
    slug: "dr-deepak-agrahari",
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
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function BurnsPlasticSurgeryClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/plastic_surgery.png"
            alt="Burns & Plastic Surgery Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Burns &amp; Plastic Surgery
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-gray-50/50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of Burns &amp;"
                highlight="Plastic Surgery"
              />

              {/* Burns */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Burns</h3>
                <div className="text-gray-800 leading-relaxed text-base md:text-lg xl:text-[15px] 2xl:text-lg font-medium text-justify space-y-4">
                  <p>
                    A burn is an injury to the skin or other organic tissue
                    primarily caused by heat ordue to radiation, radioactivity,
                    electricity, friction or contact with chemicals.
                  </p>
                  <p>
                    Thermal (heat) burns occur when some or all of the cells in
                    the skin or other tissues are destroyed by:
                  </p>
                </div>
                <ul className="mt-4">
                  {burnsCauses.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Burns & Plastic Surgery"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 space-y-24">
            {/* Classifications Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader title="Classifications of" highlight="Burns" />
                <ul className="space-y-3">
                  {burnsClassifications.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
              <div
                className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="/images/departments-images/AdobeStock_222372294.jpeg"
                  alt="Burns Classification"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Plastic Surgery Detailed Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="order-2 md:order-1 relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(0% 0, 90% 0%, 100% 100%, 10% 100%)",
                }}
              >
                <Image
                  src="/images/departments-images/plastic_surgery.png"
                  alt="Plastic Surgery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <SectionHeader title="Plastic" highlight="Surgery" />
                <div className="space-y-4 text-gray-700 text-base xl:text-[15px] 2xl:text-lg leading-relaxed text-justify">
                  <p>
                    Plastic surgery is a surgical speciality which involves
                    reconstruction, restoration, or alteration of the human
                    body. Plastic Surgery is the art of treating with aims to
                    improve the appearance of the human body or improve the
                    functioning of a part of the body.
                  </p>
                  <div className="bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-600">
                    <p className="font-semibold text-blue-900 italic text-base 2xl:text-lg">
                      At Popular Hospital we have a team of highly qualified and
                      dedicated plastic surgeons to deliver the best care at an
                      affordable price with the proverbial best in latest
                      technology.
                    </p>
                  </div>
                  <p className="text-base 2xl:text-lg">
                    We work both independently and in Conjunction with many
                    other Surgical Services including: ENT, General Surgery,
                    Surgical Oncology, Orthopedics, Urology, Gynecology and
                    Neurosurgery for giving comprehensive care to all the
                    patients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-24 bg-[#0b1c43]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="text-center mb-12">
            <span className="text-blue-300 font-bold tracking-widest text-xs uppercase mb-3 block">
              Advanced Treatments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
              Our <span className="text-blue-400">Procedures</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="h-[2px] w-12 bg-blue-400/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-4 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300 group flex items-center gap-4"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0 group-hover:bg-white group-hover:shadow-[0_0_8px_2px_rgba(96,165,250,0.6)] transition-all duration-300" />
                <p className="text-blue-50 font-medium text-sm 2xl:text-base leading-snug group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
