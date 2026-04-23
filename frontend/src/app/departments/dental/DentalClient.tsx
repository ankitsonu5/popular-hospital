"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "Painless Procedures",
    icon: "sparkle",
    desc: "Advanced anesthesia and gentle techniques for anxiety-free care.",
  },
  {
    title: "Precision Technology",
    icon: "scope",
    desc: "Digital X-rays and intra-oral cameras for accurate diagnoses.",
  },
  {
    title: "Specialized Care",
    icon: "shield",
    desc: "Expert treatment for complex dental and maxillofacial conditions.",
  },
  {
    title: "Radiological Support",
    icon: "tech",
    desc: "Superior diagnostic amenities including Dentascan and OPG.",
  },
];

const surgeryList = [
  "Ranging from removal of impacted teeth to fixation of facial fractures to Jaw corrective surgeries.",
  "Prosthodontics",
  "Complete rehabilitation of occlusion including maxillofacial Prosthetics.",
  "Orthodontics and Dentofacial Orthopaedics",
  "Alignment of crowded teeth",
  "Pediatric dentistry",
  "Child dentistry is emphasized to condense the incidence of dental ailments in adults.",
  "Periodontics",
  "Services such as to strengthen the Gums, Gingival Flap Surgeries , bone Grafts, Depigmentation, Frenectomy etc",
];

const doctors = [
  {
    name: "Dr. Hena Kauser",
    qualifications: "BDS",
    designation: "Consultant Dentist",
    slug: "dr-hena-kauser",
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
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-cyan-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-cyan-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-cyan-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function DentalClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0e7490] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dental_care_banner.png"
            alt="Dental Care Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e7490] via-[#0e7490]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-100 text-sm font-semibold mb-6 border border-cyan-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Comprehensive <br />
              <span className="text-cyan-300">Dental Care</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Dental"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content (Following Image structure) ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Dental" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-12 font-medium text-justify">
                <div className="bg-cyan-50/50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <p>
                    The department is operational with state of the art dental
                    equipments harmonizing International standards to deliver
                    quality treatment to the patients. This multi sphere dental
                    unit with a high quality, specialized dental care with
                    excellence and comfort soothing atmosphere for patients will
                    offer the full range of services as follows:
                  </p>
                </div>
              </div>

              <div className="mt-12 animate-fade-in">
                <SectionHeader
                  title="Oral and Maxillofacial"
                  highlight="Surgery"
                />
                <div className="flex flex-col gap-1 mt-8">
                  {surgeryList.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mt-10">
                  <p className="text-gray-600 italic font-medium">
                    Craniofacial Surgeries are done in collaboration with
                    department of plastic surgery
                  </p>
                </div>
              </div>

              {/* Radiological Support (Alternating style) */}
              <div className="mt-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-5/12 w-full order-2 lg:order-1">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border-[12px] border-white group">
                      <Image
                        src="/images/departments-images/root-canal-treatment.jpg"
                        alt="Dental Radiology"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="lg:w-7/12 order-1 lg:order-2">
                    <h3 className="text-[#1e1b4b] font-bold text-2xl 2xl:text-3xl mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 2xl:w-12 bg-cyan-600 rounded-full" />
                      DIGITAL RADIOLOGICAL SUPPORT:
                    </h3>
                    <p className="text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed text-justify font-medium mb-6 text-justify">
                      The department is backed by exceptional diagnostic
                      amenities such as a cordless digital Intra oral periapical
                      radiographs. Orthopantomograph and Dentascan thereby
                      ensuring flawless management of dental ailments.
                    </p>
                    <p className="text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed text-justify font-medium text-justify">
                      The department of dentistry at Sahara Hospital practices
                      everything about dentistry under one roof.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column (Doctor Sidebar) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Dental" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
