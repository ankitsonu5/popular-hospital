"use client";

import Image from "next/image";
import Link from "next/link";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

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
    name: "Dr. Mahesh Tiwari",
    qualifications: "MBBS, MS, MCh (Gastrosurgery)",
    designation: "Consultant GI and HPB Surgeon",
    slug: "dr-mahesh-tiwari",
    image: "/images/departments_doctor/dr_mahesh_tiwari.jpg",
  },
  {
    name: "Dr. Soumyaleen",
    qualifications: "MBBS, MD, DM (Gastroenterology)",
    designation: "Consultant Gastroenterologist",
    slug: "dr-soumyaleen",
    image: "",
  },
  {
    name: "Dr. R.K Singh",
    qualifications: "MBBS, MS, FIAGES, FSG",
    designation: "Consultant Gastrosurgeon",
    slug: "dr-r-k-singh",
    image: "",
  },
];

const facilityIcons = [
  <svg
    key={0}
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>,
  <svg
    key={1}
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>,
  <svg
    key={2}
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>,
  <svg
    key={3}
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  <svg
    key={4}
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
  </svg>,
  <svg
    key={5}
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>,
];

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
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Gastroenterology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Department Intro */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Department of{" "}
                    <span className="text-[#1e3a8a]">Gastroenterology</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
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

              {/* Facilities */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Department Facilities
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                <div className="space-y-4">
                  {facilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center mt-0.5">
                        {facilityIcons[idx]}
                      </div>
                      <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-2">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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

      {/* ═══════ CONDITIONS WE TREAT ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              Conditions We <span className="text-[#1e3a8a]">Treat</span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {conditions.map((item, idx) => (
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
      </section>
    </main>
  );
}
