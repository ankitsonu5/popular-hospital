"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";

/* ─── Data (Transcribed from Image) ─── */

const introParagraphs = [
  "The Orthopedics and Joint Replacement department provides comprehensive care in the field of Orthopedics by experienced and highly skilled surgeons backed by highly advanced and the world-class technology and post-operative physical rehabilitation by Physiotherapists.",
  "The Joint Replacement Centre chooses Minimally Invasive Surgical Techniques (MIS), Navigation Technology and High Quality Prosthesis to provide quick functional recovery and a shorter hospital stay. For early Osteoarthritis patients, the center provides Unicondylar (Partial Knee Replacement) for a pain free life.",
  "For Arthroscopy and Sports Injury we are well equipped with the latest Arthroscopic system and instruments to provide treatment for all common sports related injuries like ACL Tear, PCL Tear, Meniscal injury, Chondral Damage, Recurrent Patellar Dislocation, Recurrent Shoulder Dislocation, Rotator Cuff Injury, Slap Lesion and Shoulder Impingement. Our doctors are supported by expert team of physiotherapists for speedy recovery and provide rehabilitation to bring the patient to a pre injury level and start sports activity quickly.",
  "Our Trauma Center provides a multidisciplinary treatment involving General Surgeons, Neurosurgeons, Chest Physicians, Intensivists, Plastic Surgeons, In-House Blood Bank and state-of-the-art ICU care to treat cases of Poly Trauma.",
];

const replacementServices = [
  "Total Knee Replacement",
  "Partial (Unicondylar) Knee Replacement",
  "Total Hip Replacement",
  "Revision Hip and Knee Replacement",
  "Total Elbow Replacement",
  "Total Shoulder Replacement",
];

const arthroscopyServices = [
  "ACL/PCL Reconstruction",
  "Meniscal Repair",
  "Chondroplasty",
  "Rotator Cuff Repair",
  "SLAP Tear Repair",
  "Sub Acromial Decompression",
];

const limbReconstruction = [
  "Ilizarov",
  "Rail Fixation",
  "Tendon Transfer",
  "Deformity Correction",
  "SLAP Tear Repair",
  "Sub Acromial Decompression",
];

const traumaServices = [
  "Minimally Invasive Techniques for Plating",
  "Multidisciplinary Treatment of Polytrauma",
];

const pediatricOrthopedics = [
  "CTEV (Club Foot)",
  "CDH (Congenital Dislocation Hip)",
  "Polydactyly correction",
  "Genu Varum/ Valgus col-md-12 correction",
  "Cubitus-Varus/Valgus col-md-12 correction",
];

const spineSurgeries = [
  "Microscopic Discectomy",
  "Spinal Fixation",
  "Lumbar Canal Stenosis Decompression",
  "Correction of Spondylolisthesis",
  "Kyphoplasty",
];

const treatmentCategories = [
  {
    id: "replacement",
    title: "Replacement Services",
    image: "/images/departments-images/orthopedics.jpg",
    services: replacementServices,
  },
  {
    id: "arthroscopy",
    title: "Arthroscopy & Sports Injury",
    image: "/images/departments-images/advance_orthopedics.jpg",
    services: arthroscopyServices,
  },
  {
    id: "limb",
    title: "Limb Reconstruction",
    image: "/images/departments-images/orthopaedic.jpeg",
    services: limbReconstruction,
  },
  {
    id: "trauma",
    title: "Trauma",
    image: "/images/departments-images/trauma_ortho.webp",
    services: traumaServices,
  },
  {
    id: "pediatric",
    title: "Pediatric Orthopedics",
    image: "/images/departments-images/pediatric_orthopedics.jpg",
    services: pediatricOrthopedics,
  },
  {
    id: "spine",
    title: "Spine surgeries",
    image: "/images/departments-images/spine-surgery.jpg",
    services: spineSurgeries,
  },
];

const doctors = [
  {
    name: "Dr Md Akhtar Ali Ansari",
    qualifications: "MBBS, MS (Orthopedics) AIIMS, New Delhi",
    designation:
      "Specialist in Joint Replacement, Arthroscopy, Spine Surgery & Trauma Care",
    slug: "dr-md-akhtar-ali-ansari",
    image: "/images/departments_doctor/dr_ohd_akhtar_ali_ansari.jpg",
  },
  {
    name: "Dr Vinit Yadav",
    qualifications: "MBBS, MS (Orthopedics) IMS, BHU",
    designation: "Consultant Orthopedic Surgeon",
    slug: "dr-vinit-yadav",
    image: "/images/departments_doctor/dr_vinit_yadav.jpg",
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
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function OrthopedicsClient() {
  const [selectedCategory, setSelectedCategory] = useState(
    treatmentCategories[0]
  );

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/orthopedics_banner.png"
            alt="Orthopedics Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 border border-white/30 backdrop-blur-sm uppercase tracking-wider">
              Centre for Bone & Joint Care
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Restoring Mobility, <br />
              <span className="text-blue-100">Rebuilding Lives</span>
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

      {/* ═══════ TOP SECTION: INTRO + DOCTOR ═══════ */}
      <section className="py-12 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="Orthopedics & Joint Replacement"
              />
              <div className="space-y-6 text-gray-700 text-sm md:text-[15px] xl:text-[14px] 2xl:text-lg leading-relaxed mb-12 text-justify font-medium">
                {introParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Doctor Column (Sidebar style inside central row) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full h-fit sticky top-24">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Orthopedics & Joint Replacement"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TREATMENTS INTERACTIVE SECTION ═══════ */}
      <section className="py-20 xl:py-12 2xl:py-24 bg-[#fafafa] overflow-hidden">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#333] mb-4 font-heading">
              Treatments
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="flex flex-col border-t border-gray-200">
                {treatmentCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between py-5 px-4 border-b border-gray-200 transition-all duration-300 group ${
                      selectedCategory.id === cat.id
                        ? "text-[#E85222] font-bold bg-white shadow-sm"
                        : "text-gray-700 hover:text-[#E85222] hover:bg-gray-50 font-medium"
                    }`}
                  >
                    <span className="text-left text-lg 2xl:text-xl">{cat.title}</span>
                    <span
                      className={`transition-transform duration-300 ${
                        selectedCategory.id === cat.id
                          ? "translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 mb-10 lg:mb-0">
              <div className="relative group">
                {/* Decorative Dashed Rings */}
                <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-gray-300 animate-[spin_20s_linear_infinite] group-hover:border-[#E85222]/50 transition-colors" />
                <div className="absolute inset-[-10px] rounded-full border border-gray-200" />
                
                {/* Main Circular Image */}
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] 2xl:w-[500px] 2xl:h-[500px] rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <Image
                    key={selectedCategory.id}
                    src={selectedCategory.image}
                    alt={selectedCategory.title}
                    fill
                    className="object-cover transition-opacity duration-500 animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-4 order-3">
              <div className="animate-fade-in pl-4 lg:pl-10 2xl:pl-16">
                <h3 className="text-2xl 2xl:text-4xl font-bold text-[#333] mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#E85222]" />
                  {selectedCategory.title}
                </h3>
                <ul className="space-y-4">
                  {selectedCategory.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E85222] flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="text-gray-700 text-lg 2xl:text-2xl leading-relaxed font-medium">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
