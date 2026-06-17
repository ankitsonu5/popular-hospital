"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const surgicalOncologyServices = [
  "Head and neck",
  "Thoracic oncology",
  "Sarcomas",
  "Gynee oncology",
  "Uro oncology",
  "Sentinel lymph node biopsies",
];

const diagnosticOncologyServices = [
  "CT scan",
  "MRI",
  "Guided",
  "Biopsies",
  "Frozen Section",
  "Biochemical Markers",
  "Pathology",
];

const doctors = [
  {
    name: "Dr. Ajay Kumar Prajapati",
    qualifications: "MBBS, MS, MCh (Surgical Oncology)",
    designation: "Consultant Surgical Oncology",
    slug: "dr-ajay-kumar-prajapati",
    image: "/images/departments_doctor/dr_ajay_prajapati.jpg",
  },
  {
    name: "Dr. Neha Gupta",
    qualifications: "MBBS, MD (Radiotherapy)",
    designation: "Radiologist / Oncologist",
    slug: "dr-neha-gupta",
    image: "/images/departments_doctor/dr_neha_gupta.png",
  },
];

/* ─── Page ─── */

export default function OncologyClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/oncology.png"
            alt="Oncology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre for Comprehensive Cancer Care
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Oncology <br />
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
                department="Oncology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INTRO + DOCTOR SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Department of <span className="text-[#1e3a8a]">Oncology</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-6">
                Oncology: Clinical oncology consists of three primary
                disciplines:
              </p>

              <div className="space-y-6 mt-6">
                <div className="border-l-4 border-blue-600 pl-5 py-1">
                  <h3 className="text-lg font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight">
                    Medical Oncology
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                    Medical Oncology consists of treatment of cancer with
                    medicine including chemotherapy. We offer diagnosis and
                    treatment for solid tumours haematological malignancies
                    found in adult and children.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-5 py-1">
                  <h3 className="text-lg font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight">
                    Surgical Oncology
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                    The surgical aspect of cancer including biopsy, staging and
                    surgical resection of tumours. Right from
                    reconstructive/advanced surgery to minimal access surgery,
                    our highly trained surgical oncologists skilfully perform
                    complex tumour removals.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-5 py-1">
                  <h3 className="text-lg font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight">
                    Radiation Oncology
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                    Radiation Oncology is an advanced branch of modern cancer
                    treatment, which is painless, incision-less and preventive.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Oncology" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SURGICAL ONCOLOGY SERVICES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Specialized Procedures
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Surgical <span className="text-[#1e3a8a]">Oncology</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {surgicalOncologyServices.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-video max-w-2xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/cancer_cells_visualization.png"
                  alt="Surgical Oncology Visualization"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DIAGNOSTIC ONCOLOGY SERVICES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-video max-w-2xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/oncology_diagnostics_realistic.jpeg"
                  alt="Diagnostic Oncology Technology"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Advanced Diagnostics
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Diagnostic <span className="text-[#1e3a8a]">Oncology</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {diagnosticOncologyServices.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
