"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (exact from original page) ─── */

const features = [
  {
    title: "Keyhole Surgery",
    icon: "scope",
    desc: "Advanced laparoscopic procedures.",
  },
  {
    title: "Trauma Care",
    icon: "plus",
    desc: "24/7 emergency surgical support.",
  },
  {
    title: "Hernia Center",
    icon: "shield",
    desc: "Expert mesh & non-mesh repair.",
  },
  {
    title: "Laser Proctology",
    icon: "laser",
    desc: "Painless treatment for piles & fissures.",
  },
];

const uspList = [
  "Abdominal surgeries such as gallbladder excision, advanced laparoscopy appendectomy, intestinal surgery (colon/laparoscopic surgery), obstruction & perforation",
  "All kinds of hernias - Treated by both open and laparoscopic surgery, depending on the patient's condition. Anorectal diseases - Such as abscesses, fistula, tissue anomalies, prolapse, hydrocele",
  "LASER Surgery for Fistula, Fissure Piles & Pilonidalsinus",
  "Trauma Surgery and care",
  "Stapled Haemorrhoidectomy for piles & prolapse with many benefits to the patient such as minimal blood loss, less pain and early recovery",
  "Tumours Diagnostics and treatment of soft tissues, treatment for cysts and tumours of the salivary glands, thyroid, parathyroid, adrenal, breast, lipoma and tumours of the abdomen",
  "Breast lump and abscess",
  "Benign breast diseases",
  "Diseases of the veins such as varicose veins",
];

const procedures = [
  "Gallstone Disease – Laparoscopic Cholecystectomy",
  "Hernia Laparoscopic/Open Hernia Repair with Mesh",
  "Appendicitis - Laparoscopic Appendectomy",
  "Reflux Disease, Reflux Gastritis, Hiatus Hernia – Laparoscopic Repair",
  "Diagnostic Laparoscopy",
  "Thyroid and Parathyroid Tumour – Thyroidectomy/Parathyroidectomy",
  "Fissure or Anal Pain",
  "Piles Minimally Invasive Surgery/Stapler Surgery for Piles",
  "Rectal Prolapse – Laparoscopic Rectopexy",
  "Liver Abscess",
  "Trauma/Accidental Injury",
  "Acute Intestinal Perforation/Rupture",
  "Acute Intestinal Obstruction",
  "Torsion Testis",
  "Varicocele Surgery (Laparoscopic/Open)",
  "Vasectomy",
];

const doctors = [
  {
    name: "Dr. A.K Kaushik",
    qualifications: "MBBS, MS (General Surgery) IMS, BHU",
    designation: "Head, Department of General Surgery",
    slug: "dr-ak-kaushik",
    image: "/images/departments_doctor/dr_ak_kaushik.png",
  },
  {
    name: "Dr. R.K Singh",
    qualifications: "MBBS, MS, FIAGES, FSG",
    designation: "Consultant Surgeon",
    slug: "dr-rk-singh",
    image: "",
  },
  {
    name: "Dr. Abhishek",
    qualifications: "M.B.B.S, M.S. - General Surgery, FIAGES",
    designation: "Consultant Surgeon",
    slug: "dr-abhishek",
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

export default function GeneralSurgeryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/genral_surgery.png"
            alt="General Surgery Banner"
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Laparoscopy & General Surgery
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="General Surgery"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of General &amp;"
                highlight="Laproscopic Surgery"
              />
              <div className="space-y-4 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg font-medium leading-relaxed mb-10 text-justify">
                <p>
                  The Department of General and Laparoscopic Surgery at Popular
                  Hospital is manned 24x7 by an experienced and dedicated team
                  of consultants that aim to provide modern surgical treatment
                  and advice to the patients. The department is committed to the
                  principles and practices of &apos;Safe Surgery Saves
                  Lives&apos; to provide ethical &amp; evidence-based surgical
                  options to the patients.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p>
                    Laparoscopic Surgery is a technique wherein surgical
                    procedures like removal of gallbladder can be successfully
                    done with small keyhole incisions in place of opening up of
                    the abdomen with large incision. Carbon dioxide gas is used
                    to inflate the abdomen so as to open up space for putting in
                    instruments and then performing required surgical
                    procedures. Patients are mobilised the same evening and
                    discharged the very next day. The benefits of Laparoscopic
                    surgery are early return to work, less pain, faster recovery
                    &amp; better cosmetics. With a dedicated and experienced
                    team doing evidence-based surgical procedures, the outcomes
                    are excellent. Safety in surgery to reduce or eliminate
                    complications during treatment is the main motto of the
                    consultants.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Laparoscopy & General Surgery"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USP SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image */}
            <div className="lg:col-span-5 relative w-full h-[400px] 2xl:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/departments-images/laparoscopic.jpeg"
                alt="Laparoscopic Surgery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
            </div>

            {/* Right: USP List */}
            <div className="lg:col-span-7">
              <SectionHeader
                title="Usp Of General &amp;"
                highlight="Laproscopic Surgery Department"
              />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6">
                {uspList.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image */}
            <div className="lg:col-span-5 relative w-full h-[400px] 2xl:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/departments-images/general_surgery.png"
                alt="General Surgery Procedures"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
            </div>

            {/* Right: List */}
            <div className="lg:col-span-7">
              <SectionHeader title="Our" highlight="Procedures" />
              <p className="text-gray-500 text-sm 2xl:text-base mb-8">
                Comprehensive surgical solutions for a wide range of abdominal
                and general surgical conditions.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {procedures.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
