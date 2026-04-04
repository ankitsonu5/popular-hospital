"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "Ear Surgery",
    icon: "ear",
    desc: "Advanced microsurgery for hearing restoration.",
  },
  {
    title: "Sinus Treatment",
    icon: "nose",
    desc: "Endoscopic sinus surgery & balloon sinuplasty.",
  },
  {
    title: "Throat Care",
    icon: "throat",
    desc: "Expert management of voice & swallowing disorders.",
  },
  {
    title: "Head & Neck",
    icon: "head",
    desc: "Specialized care for tumors and reconstructions.",
  },
];

const introList = [
  "Hearing and deafness, deviated septum, rhinitis, ringing sensations in ears, sinusitis, nasal obstruction, sinus headaches and migraines, and various cancerous conditions.",
  "Problems related to the throat including sore throat, throat tumors, gastroesophageal reflux disease (GERD), hoarseness, infections, and vocal cord and airway disorders.",
  "Defects at the time of birth, ear infection, developmental delays, airway problems, tonsil and adenoid infection.",
  "Facial plastic surgeries such as cleft palates, ear deformities trauma reconstruction.",
  "The department has a full time team of doctors who provide all services like Routine OPD, Emergency services,ENT surgeries and is supported by the latest modular operation theatres and diagnostic facilities to ensure that patients get the appropriate and quality treatment.",
];

const commonDiseases = [
  "Hearing Defects Ear Infections",
  "Ear Drum perforations",
  "Throat Infections",
  "Tonsil infection",
  "Nasal Polyps",
  "Nasal bleeding / Nasal Allergy and infections",
];

const whatWeOffer = [
  "Prescription of hearing aids",
  "Tympanoplasty / for ear drum perforations",
  "Tonsillectomy / Removal of tonsil",
  "Polypectomy / Removal of Nasal Polyps",
  "Adenotonsillectomy",
  "Mastoidectomy",
  "Septoplasty",
  "CSF Rhinorrhoea repair",
  "Foreign body removal",
];

const doctors = [
  {
    name: "Dr Anshuman Singh",
    qualifications: "M.B.B.S., MS - Otorhinolaryngology",
    designation: "Consultant ENT Surgeon",
    slug: "dr-anshuman-singh",
    image: "", // Placeholder as per backend and uploaded image
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
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#1e1b4b] font-heading leading-tight">
      {title} <span className="text-amber-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-amber-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-amber-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function ENTClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#1e1b4b] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/ent_banner.png"
            alt="ENT Department Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#1e1b4b]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-100 text-sm font-semibold mb-6 border border-amber-400/30 backdrop-blur-sm">
              Centre for ENT & Head-Neck Surgery
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Precision Care for <br />
              <span className="text-amber-400">Ear, Nose & Throat</span>
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

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR (Text Focus) ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="ENT" />
              <p className="text-base md:text-lg xl:text-[15px] 2xl:text-lg font-medium text-gray-800 leading-relaxed text-justify">
                The Department of ENT provides a wide range of surgical as well
                as medical services for the disorders related to ear, nose &
                throat. The highly skilled team of ENT specialists uses the
                latest equipments and technologies to perform endoscopic nasal
                surgeries, ear and all types of routine & complex treatments.
              </p>

              <div className="mt-8">
                <h3 className="text-[#1e1b4b] font-bold text-xl mb-4 italic uppercase tracking-tight">
                  Few of them are listed below:
                </h3>
                <ul className="space-y-4">
                  {introList.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right Doctor Sidebar ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="ENT" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COMMON DISEASES SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-24 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <SectionHeader
                title="Common Diseases and"
                highlight="Conditions:"
              />
              <div className="flex flex-col gap-1 mt-8">
                {commonDiseases.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </div>
            </div>
            <div className="md:col-span-5 relative h-[450px] w-full group">
              <div className="absolute inset-0 bg-amber-50 rounded-2xl opacity-50 transition-transform group-hover:scale-105 duration-700" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform group-hover:scale-[1.02] duration-500">
                <Image
                  src="/images/departments-images/ent_diseases.png"
                  alt="Common Diseases"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT WE OFFER SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-24 bg-gray-50/30">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative h-[500px] w-full group order-2 md:order-1">
              <div className="absolute inset-0 bg-amber-50 rounded-2xl opacity-50 transition-transform group-hover:scale-105 duration-700" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform group-hover:scale-[1.02] duration-500">
                <Image
                  src="/images/departments-images/ent_treatment.png"
                  alt="What we offer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <SectionHeader title="What we" highlight="offer:" />
              <div className="flex flex-col gap-1 mt-8">
                {whatWeOffer.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
