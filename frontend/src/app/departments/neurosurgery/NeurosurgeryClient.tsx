"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const introParas = [
  "Neurosurgery is a speciality of surgery that involves surgical treatment of the disorders of the brain, spinal cord, and the peripheral nerves. With the advent of microsurgery techniques and ultra-modern technology, neurosurgery has grown from making burr holes in the skull for mere lifesaving in the olden days to the most complex surgical procedures involving the brain, spinal cord, and the nerves.",
  "Neurosurgery is one of the most challenging specialties in the field of medicine, which deals with the diseases of the Brain, Skull, Spinal Cord and Spinal Column as well as the Peripheral Nerves. Advances In Neurosurgical Techniques along with the latest technological innovation in tools and equipments have resulted in excellent treatment outcome. Minimally Invasive and Endoscopic Neurosurgery contributes to a much shorter Hospital stay, better patient comfort while maximising the efficacy of the procedure. With the availability of a qualified and highly experienced team and latest state-of-the-art equipments We are committed to provide excellent results in Neuro surgical Procedures.",
  "The Centre of Neuro and Spine Surgery is well supported by experienced NeurologistAnesthesiolologists, Critical Care Specialists, Radiologists, Pathologists and Rehabilitation therapists.",
  "Popular Hospital is the only centre in this region where endoscopic spine surgery is being done successfully.",
];

const peripheralNerveList = [
  "Peripheral Nerve Injury including Brachial Plexus Injury",
  "Release of Nerve Entrapments",
  "Peripheral Nerve Tumors",
];

const brainSurgeryList = [
  "Head Injury",
  "Stroke with Intracranial Bleeding",
  "Microsurgical Excision of Brain Tumours",
  "Endoscopic Treatment of Hydrocephalus",
  "Clipping of Intracranial Aneurysm and excision of AVM'S",
  "Transsphenoidal Endoscopic/ Microscopic excision Pituitary Tumors",
  "Microvascular decompression for Trigeminal Neuralgia",
];

const spinalSurgeryList = [
  "Spinal Trauma",
  "Microsurgical Excision of Spinal Cord Tumours",
  "Cervical and Lumber Microdiscectomy",
  "Cervical Disc Replacement",
  "Endoscopic Discectomy",
  "Spinal Decompression and Fusion",
  "Minimally Invasive Spinal Surgery for Listhesis",
  "Kyphoplasty and Vertebroplasty",
];

// Doctors data is now fetched from the backend and passed as a prop

/* ─── Components ─── */
const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-[#1e3a8a]">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-[#1e3a8a]" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="group flex min-h-[64px] items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E85222]/30 hover:shadow-md md:text-lg 2xl:text-xl">
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E85222]/10 text-sm font-black text-[#E85222] transition-colors group-hover:bg-[#E85222] group-hover:text-white">
      <Check className="w-4 h-4" />
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function NeurosurgeryClient({ doctors }: { doctors: any[] }) {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/neurosurgery.png"
            alt="Neurosurgery Banner"
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
              Department of Neurosurgery Department — Varanasi
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#E85222]/30 flex items-center gap-2"
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
                Book An Appointment
              </Link>
              <GetCallBackButton
                department="Neurosurgery"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2"
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="pt-16 pb-6 xl:pt-10 2xl:pt-20 2xl:pb-12 bg-gray-50/50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Neurosurgery" />
              <div className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg xl:text-[15px] 2xl:text-xl font-medium text-justify">
                {introParas.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Neurosurgery"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="p-6 sm:p-7 pb-0">
              <SectionHeader title="Service" highlight="Offered:" />
              <p className="rounded-2xl border-l-4 border-[#E85222] px-5 py-4 text-base font-semibold leading-relaxed text-slate-700 md:text-lg 2xl:text-xl">
                We at Popular Hospital successfully provide all Neurosurgical
                solutions under one roof.
              </p>
            </div>

            <div className="p-6 sm:p-7">
              <SectionHeader title="Peripheral Nerve" highlight="Surgery:" />
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {peripheralNerveList.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BRAIN SURGERY SECTION ═══════ */}
      <section className="pt-8 pb-20 xl:pb-12 2xl:pb-24 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[30px] border border-slate-100 bg-[#fbfdff] p-6 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.6)] sm:p-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <SectionHeader title="Brain" highlight="Surgery:" />
              <ul className="mt-6 grid grid-cols-1 gap-4">
                {brainSurgeryList.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#eaf3ff] via-white to-[#fff1eb]" />
                <div className="relative h-full w-full overflow-hidden rounded-[28px] border-4 border-white shadow-2xl">
                  <Image
                    src="/images/departments-images/brain_surgery.jpg"
                    alt="Brain Surgery Technology"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SPINAL SURGERY SECTION ═══════ */}
      <section className="py-20 xl:py-12 2xl:py-24 bg-gray-50 overflow-hidden">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[30px] border border-slate-100 bg-white p-6 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.6)] sm:p-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#fff1eb] via-white to-[#eaf3ff]" />
                <div className="relative h-full w-full overflow-hidden rounded-[28px] border-4 border-white shadow-2xl">
                  <Image
                    src="/images/departments-images/spinal_surgery_realistic.jpeg"
                    alt="Spinal Surgery Model"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Spinal" highlight="Surgery:" />
              <ul className="mt-6 grid grid-cols-1 gap-4">
                {spinalSurgeryList.map((item, idx) => (
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
