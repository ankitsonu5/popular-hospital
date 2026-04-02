"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data (exact from original page content) ─── */

const hospitalOptions = [
  "Open Surgery",
  "Endo-Urology: PCNI, URS, URSL, TURP, TUR-BT, RIRS",
  "Andrology",
  "Female Urology",
  "Pediatric Urology",
  "Uro-Oncology",
  "Urology Laparoscopy",
];

const procedures = [
  "Uroflowmetry and Urodynamic - to help in an accurate diagnosis of diseases of the Lower Urinary Track",
  "Flexible Cystoscopy for Diagnostic OPD Cystourethroscopy",
  "Flexible UreterRenoscopy and Laser Lithotripsy/RIRS for treating Kidney Stones without any holes/cuts",
  "Laparoscopic treatment for diseases of the Kidney, Ureter and Bladder including Laparoscopic Uro Oncology and Laparoscopic Reconstructive Urology",
  "Reconstructive Surgeries for complex diseases of the Kidney, Ureter, Bladder and Urethra including Laparoscopic Pyeloplasty, Augmentation Cystoplasty etc.",
  "Female Urology including VVF Repair, TOT/TVT for Stress Urinary Incontinence, recurrent UTI, Urethral Stenosis etc.",
  "Andrology & Male Infertility including Penile Prosthesis, Artificial Urinary Sphincter, Testicular Prosthesis, VVA and VEA etc.",
];

const urologyCategories = [
  {
    id: "hospital-options",
    title: "Options at Popular Hospital",
    image: "/images/departments-images/urology.webp",
    services: hospitalOptions,
  },
  {
    id: "our-procedures",
    title: "Our Procedures",
    image: "/images/departments-images/urology_two.webp",
    services: procedures,
  },
];

const doctors = [
  {
    name: "Dr Dinesh Singh",
    qualifications: "MBBS, MS, MCh (Urology)",
    designation: "Consultant Urologist",
    slug: "dr-dinesh-singh",
    image: "/images/departments_doctor/dr-dinesh-singh.jpg",
  },
  {
    name: "Dr Piyush Saini",
    qualifications: "MBBS, MS, MCh (Urology)",
    designation: "Consultant Urologist",
    slug: "dr-piyush-saini",
    image: "/images/departments_doctor/dr_piyush_saini.png",
  },
  {
    name: "Dr. Shasank shekhar Tripathi",
    qualifications: "MBBS, MS, MCh (Urology)",
    designation: "Consultant Urologist",
    slug: "dr-shasank-shekhar-tripathi",
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
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function UrologyClient() {
  const [selectedCategory, setSelectedCategory] = useState(urologyCategories[0]);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/urology.png"
            alt="Urology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Urology
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

      {/* ═══════ CONTENT + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Urology" />

              {/* What is Urology */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  What Is Urology?
                </h3>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify">
                  Urology is a surgical speciality which deals with diseases of
                  the male and female urinary Tract and of the male reproductive
                  organs. The Department of Urology at Popular Hospital is at
                  the forefront of providing clinical services, innovative
                  treatment strategies. It deals with the disorder of Kidney,
                  Urine bladder, Prostate gland, Testis & penis.
                </p>
              </div>

              {/* What Are Kidney Stones */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  What Are Kidney Stones?
                </h3>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify mb-4">
                  Kidney stones are small, hard deposits that form inside your
                  kidneys. The stones are made of mineral and acid salts. Kidney
                  stones have many causes and can affect any part of your
                  urinary tract — from your kidneys to your bladder. Often,
                  stones form when the urine becomes concentrated, allowing
                  minerals to crystallize and stick together.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium text-justify">
                    <strong className="text-[#0b1c43]">
                      Percutaneous nephrolithotomy:
                    </strong>{" "}
                    Percutaneous nephrolithotomy (PCNL) is a minimally-invasive
                    procedure which is done to remove stones from the kidney by
                    a small puncture wound up to about 1 cm through the skin. It
                    is most suitable to remove the stones which are more than 2
                    cm in size and which are present near the pelvic region.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider doctors={doctors} departmentName="Urology" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════ INTERACTIVE UROLOGICAL CARE SECTION ═══════ */}
      <div className="mt-24 pt-20 border-t border-gray-100 bg-[#fafafa] -mx-4 px-4 pb-20 overflow-hidden">
        <div className="mx-auto w-full max-w-[1366px] px-6 md:px-8 lg:px-4">
          {/* Main Heading */}
          <div className="text-center mb-20 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#333] mb-8 font-heading leading-tight italic">
              &quot;Advanced Urological Services & Clinical Excellence&quot;
            </h2>
            <div className="w-24 h-1 bg-[#E85222] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            {/* Left Sidebar (Categories) */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="flex flex-col border-t border-gray-200">
                {urologyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between py-6 px-5 border-b border-gray-200 transition-all duration-300 group ${
                      selectedCategory.id === cat.id
                        ? "text-[#E85222] font-bold bg-white shadow-sm"
                        : "text-gray-700 hover:text-[#E85222] hover:bg-gray-50 font-medium"
                    }`}
                  >
                    <span className="text-left text-xl leading-snug">{cat.title}</span>
                    <span
                      className={`transition-transform duration-300 ${
                        selectedCategory.id === cat.id
                          ? "translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Circular Image */}
            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 mb-10 lg:mb-0">
              <div className="relative group">
                <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-gray-300 animate-[spin_20s_linear_infinite] group-hover:border-[#E85222]/50 transition-colors" />
                <div className="absolute inset-[-10px] rounded-full border border-gray-200" />
                <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image
                    key={selectedCategory.id}
                    src={selectedCategory.image}
                    alt="Urological Care Illustration"
                    fill
                    className="object-cover transition-opacity duration-500 animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-4 order-3">
              <div className="animate-fade-in pl-4 lg:pl-10 text-justify">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[2px] bg-[#E85222]" />
                  <h3 className="text-xl font-bold text-[#333] italic">
                    {selectedCategory.id === "hospital-options" ? "Surgical Specialties" : "Diagnostic & Procedural Care"}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {selectedCategory.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E85222] flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
