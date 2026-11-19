"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Calendar,
  Clock,
  Building2,
  User,
  Phone,
  Mail,
  CheckCircle2,
  X,
} from "lucide-react";
import DepartmentGallerySection from "@/components/DepartmentGallerySection";
import DepartmentMedicalExperts from "@/components/DepartmentMedicalExperts";
import { CImage, T } from "@/components/content/Editable";
import CardiologyHero from "./CardiologyHero";
import {
  ConditionsSection,
  DiagnosticsSection,
  VisitUsSection,
  WhyChooseSection,
  SymptomsSection,
  EmergencySection,
  FaqSection,
  PatientJourneySection,
  PreventionSection,
  ProceduresSection,
  WhenToSeeSection,
} from "./CardiologyDetailSections";

/* ─── Data ─── */

const uspItems = [
  {
    title: "Two Modern Cath Labs:-",
    content:
      "The cardiac department of Popular Hospital has two modern cath labs with the latest technology, where we carry out tests and procedures including angiography, radial angioplasty, ablation, IVUS, Rotablation and implantation of temporary/permanent pacemakers and ICDs.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        />
      </svg>
    ),
  },
  {
    title: "IVUS Facility:-",
    content:
      "Only center of eastern U.P. having HD-IVUS facility where we can detect exact amount of plaque its size, Degree of narrowing, restenosis & accurate stent placement.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
        />
      </svg>
    ),
  },
  {
    title: "Dedicated Cardiac Team:-",
    content:
      "Our cardiac department have a team of expert and experienced Consultants with trained nursing staff especially for the cardiac services who are available 24x7 in cardiac care unit.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Non-Invasive cardiology program:-",
    content:
      'Popular hospital believes in saving life as its vision is to "Caring for Your Every Breath", the cardiac department performs all kind of non-invasive Procedure to save patient and give them a healthy and worry free life.',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Round the clock support:-",
    content:
      "Popular Hospital provides 24x7 availability of doctors to support emergency cardiac services.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const treatmentList = [
  "Coronary angiography",
  "Coronary angioplasty & stenting (Radial route)",
  "Peripheral interventions",
  "Pacemaker implantation - Temporary & Permanent (Single chamber, Dual chamber, CRT, AICD, LBBB Pacing).",
  "Valve replacement & structural heart disease treatment",
  "Balloon valvuloplasty",
  "HD IVUS",
  "ROTABLATION",
  "EP study and Radiofrequency ablation",
  "Acute MI interventions",
];

const preventiveList = [
  "ECG",
  "Echocardiography with Doppler",
  "TMT",
  "ABPM",
  "24 hour Holter Monitoring",
  "CT Coronary Angiography",
];

interface DoctorCard {
  id?: string;
  _id?: string;
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
  speciality?: string;
}

/* ─── Page Component ─── */

export default function CardiologyPage({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO (enquiry form + doctor search) ═══════ */}
      <CardiologyHero />

      {/* ═══════ MEDICAL EXPERTS HORIZONTAL CAROUSEL (DIRECTLY UNDER BANNER) ═══════ */}
      <DepartmentMedicalExperts
        doctors={doctors}
        specialitySlug="cardiology"
        fourPerView
      />

      {/* ═══════ DEPARTMENT INTRO SECTION ═══════ */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                <T k="departments-cardiology_4c5284_2" d={"Department of"} />{" "}
                <span className="text-[#1e3a8a]">
                  <T k="departments-cardiology_eb6663" d={"Cardiology"} />
                </span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-[17px] 2xl:text-lg font-medium text-left md:text-justify">
              <p className="font-semibold text-[#0b1c43] bg-blue-50 p-4 md:p-5 rounded-xl border border-blue-100/60 mb-6 text-left shadow-sm">
                <T
                  k="departments-cardiology_eb7346"
                  d={"Popular Hospital is widely recognized as the "}
                />
                <strong>
                  <T
                    k="departments-cardiology_464ff9"
                    d={"best Cardiology hospital in Varanasi"}
                  />
                </strong>
                <T
                  k="departments-cardiology_4d7c26"
                  d={
                    ". We are committed to delivering world-class healthcare and advanced medical facilities to patients across "
                  }
                />
                <strong>
                  <T k="departments-cardiology_200859" d={"Purvanchal"} />
                </strong>
                <T k="departments-cardiology_4f4133" d={" and "} />
                <strong>
                  <T k="departments-cardiology_81b1a8" d={"Uttar Pradesh"} />
                </strong>
                .
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-3 space-y-4">
              <p>
                <T
                  k="departments-cardiology_9cd602"
                  d={
                    "Popular Hospital is a Top cardiac hospital of eastern Uttar Pradesh ensuring best treatment for Heart Diseases. The entire cardiology department is the only center in this region to perform all coronary procedures via transradial route. The center is well equipped with state-of-the-art equipment using cutting-edge technology. From high end 2D Echocardiography to the latest Catheterisation laboratory where complex coronary, peripheral and structural interventions are being carried out on a day to day basis using the most modern tools such as Fractional flow Reserve (FFR)/ Rotatory Atherectomy (Roatablation), Intravascular Ultrasound (IVUS)/Electrophysiology."
                  }
                />
              </p>
              <p>
                <T
                  k="departments-cardiology_397504"
                  d={
                    "The cardiac department at Popular is an integrated healthcare center with a highly experienced, qualified, and dedicated team of cardiologists who work in complete coordination to provide comprehensive and multidisciplinary care to the patients suffering from heart ailments. At Popular we have pioneered the 'Heart Team' approach where all cardiovascular problems are comprehensively evaluated, jointly discussed and individually planned for appropriate indicated therapies."
                  }
                />
              </p>
                </div>

                {/* Intro image with floating highlight badges */}
                <div className="lg:col-span-2 relative pb-6 lg:pb-0">
                  <div className="absolute -top-4 -right-4 w-full h-full rounded-[2rem] bg-gradient-to-br from-[#E85222]/20 to-[#1e3a8a]/20 hidden sm:block" />
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/15">
                    <CImage
                      k="departments-cardiology_intro_img"
                      src="/images/departments-images/cardiology.jpeg"
                      alt="Cardiologist listening to a patient's heartbeat at Popular Hospital"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover object-center -scale-x-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-white font-bold text-lg leading-snug font-heading">
                        Caring for Your Every Heartbeat
                      </p>
                      <p className="text-white/80 text-xs mt-1">
                        Heart Team approach for every patient
                      </p>
                    </div>
                  </div>
                  <div className="absolute -left-3 sm:-left-6 top-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 text-left">
                    <span className="w-10 h-10 rounded-xl bg-[#E85222] text-white flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block text-[#0b1c43] font-bold text-sm leading-tight">
                        24x7
                      </span>
                      <span className="block text-gray-500 text-xs font-medium">
                        Cardiac Emergency
                      </span>
                    </span>
                  </div>
                  <div className="absolute -right-2 sm:-right-5 bottom-20 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 text-left">
                    <span className="w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block text-[#0b1c43] font-bold text-sm leading-tight">
                        2 Cath Labs
                      </span>
                      <span className="block text-gray-500 text-xs font-medium">
                        Latest Technology
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USP SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              <T k="departments-cardiology_81cd88" d={"USP Of Cardiac "} />
              <span className="text-[#1e3a8a]">
                <T k="departments-cardiology_0c727f" d={"Departments"} />
              </span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

          <div className="grid grid-cols-1 gap-4">
            {uspItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center shadow-sm shadow-blue-200">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-900 leading-relaxed text-base md:text-[15px] 2xl:text-base font-medium">
                    <span className="font-bold text-[#0b1c43]">
                      {item.title}
                    </span>{" "}
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TREATMENT JOURNEY ═══════ */}
      <PatientJourneySection />

      {/* ═══════ WHAT WE TREAT + NON-INVASIVE - side by side ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What We Treat */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-52 w-full">
                <CImage
                  k="departments-cardiology_a1795d"
                  src="/images/departments-images/coronary_angiography.jpeg"
                  alt="Cardiac Treatment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    <T k="departments-cardiology_c57d28" d={"What we "} />
                    <span className="text-blue-300">
                      <T k="departments-cardiology_9feaed" d={"treat:"} />
                    </span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {treatmentList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 text-[15px] font-medium"
                    >
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Non-Invasive */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-52 w-full">
                <CImage
                  k="departments-cardiology_858763"
                  src="/images/departments-images/preventive_cardiology.jpeg"
                  alt="Preventive Cardiology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    <T
                      k="departments-cardiology_4cb38f"
                      d={"Non-invasive and"}
                    />{" "}
                    <span className="text-blue-300">
                      <T
                        k="departments-cardiology_91a964"
                        d={"preventive Cardiology:"}
                      />
                    </span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {preventiveList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 text-[15px] font-medium"
                    >
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DETAILED CARDIOLOGY INFORMATION ═══════ */}
      <SymptomsSection />
      <ConditionsSection />
      <DiagnosticsSection />
      <ProceduresSection />
      <EmergencySection />
      <WhenToSeeSection />
      <WhyChooseSection />
      <PreventionSection />
      <FaqSection />
      <VisitUsSection />

      {/* ═══════ GALLERY ═══════ */}
      <DepartmentGallerySection
        departmentSlug="cardiology"
        departmentName="Cardiology"
      />

    </main>
  );
}
