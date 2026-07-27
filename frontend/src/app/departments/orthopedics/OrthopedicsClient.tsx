"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Bone,
  Zap,
  ShieldCheck,
  Activity,
  Clock,
  Award,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const introParagraphs = [
  "The Orthopedics and Joint Replacement department provides comprehensive care in the field of Orthopedics by experienced and highly skilled surgeons backed by highly advanced and the world-class technology and post-operative physical rehabilitation by Physiotherapists.",
  "The Joint Replacement Centre chooses Minimally Invasive Surgical Techniques (MIS), Navigation Technology and High Quality Prosthesis to provide quick functional recovery and a shorter hospital stay. For early Osteoarthritis patients, the center provides Unicondylar (Partial Knee Replacement) for a pain free life.",
  "For Arthroscopy and Sports Injury we are well equipped with the latest Arthroscopic system and instruments to provide treatment for all common sports related injuries like ACL Tear, PCL Tear, Meniscal injury, Chondral Damage, Recurrent Patellar Dislocation, Recurrent Shoulder Dislocation, Rotator Cuff Injury, Slap Lesion and Shoulder Impingement.",
  "Our Trauma Center provides a multidisciplinary treatment involving General Surgeons, Neurosurgeons, Chest Physicians, Intensivists, Plastic Surgeons, In-House Blood Bank and state-of-the-art ICU care to treat cases of Poly Trauma.",
];

const stats = [
  { value: "MIS", label: "Minimally Invasive Techniques", icon: Zap },
  { value: "Nav", label: "Navigation Technology", icon: Activity },
  { value: "24×7", label: "Trauma Care", icon: Clock },
  { value: "6+", label: "Specialty Sub-Divisions", icon: Award },
];

const treatmentCategories = [
  {
    id: "replacement",
    title: "Joint Replacement",
    tag: "Surgical",
    image: "/images/departments-images/orthopedics.jpg",
    services: [
      "Total Knee Replacement",
      "Partial (Unicondylar) Knee Replacement",
      "Total Hip Replacement",
      "Revision Hip and Knee Replacement",
      "Total Elbow Replacement",
      "Total Shoulder Replacement",
    ],
  },
  {
    id: "arthroscopy",
    title: "Arthroscopy & Sports Injury",
    tag: "Sports Medicine",
    image: "/images/departments-images/advance_orthopedics.jpg",
    services: [
      "ACL/PCL Reconstruction",
      "Meniscal Repair",
      "Chondroplasty",
      "Rotator Cuff Repair",
      "SLAP Tear Repair",
      "Sub Acromial Decompression",
    ],
  },
  {
    id: "limb",
    title: "Limb Reconstruction",
    tag: "Reconstructive",
    image: "/images/departments-images/orthopaedic.jpeg",
    services: [
      "Ilizarov",
      "Rail Fixation",
      "Tendon Transfer",
      "Deformity Correction",
      "SLAP Tear Repair",
      "Sub Acromial Decompression",
    ],
  },
  {
    id: "trauma",
    title: "Trauma Care",
    tag: "Emergency",
    image: "/images/departments-images/trauma_ortho.webp",
    services: [
      "Minimally Invasive Techniques for Plating",
      "Multidisciplinary Treatment of Polytrauma",
    ],
  },
  {
    id: "pediatric",
    title: "Pediatric Orthopedics",
    tag: "Pediatric",
    image: "/images/departments-images/pediatric_orthopedics.jpg",
    services: [
      "CTEV (Club Foot)",
      "CDH (Congenital Dislocation Hip)",
      "Polydactyly correction",
      "Genu Varum / Valgus correction",
      "Cubitus-Varus / Valgus correction",
    ],
  },
  {
    id: "spine",
    title: "Spine Surgeries",
    tag: "Spine",
    image: "/images/departments-images/spine-surgery.jpg",
    services: [
      "Endoscopic Discectomy / Decompression",
      "Scoliosis(Deformity) correction",
      "Occipitocervical Fixation",
      "Anterior Cervical Discectomy and Fusion(ACDF)",
      "Anterior Cervical Corpectomy and Fixation(ACCF)",
      "Cervical Disc Replacement(CDR)",
      "Cervical Laminectomy and Lateral Mass Fixation",
      "MIS - TLIF(Minimally Invasive - TLIF)",
      "TLIF(Transforaminal Lumbar Interbody Fusion)"
    ],
  },
];

const whyUs = [
  {
    icon: Zap,
    title: "Minimally Invasive Surgery",
    desc: "MIS techniques for faster recovery, less pain and shorter hospital stay",
  },
  {
    icon: Activity,
    title: "Navigation Technology",
    desc: "Advanced navigation for precise implant placement and better outcomes",
  },
  {
    icon: ShieldCheck,
    title: "High Quality Prosthesis",
    desc: "World-class implants ensuring long-lasting functional recovery",
  },
  {
    icon: Clock,
    title: "24×7 Trauma Support",
    desc: "Round-the-clock multidisciplinary team for emergency polytrauma cases",
  },
  {
    icon: Bone,
    title: "Expert Physiotherapy",
    desc: "Dedicated physiotherapists for post-operative rehabilitation",
  },
  {
    icon: Award,
    title: "Experienced Surgeons",
    desc: "Highly skilled orthopedic surgeons backed by world-class technology",
  },
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function OrthopedicsClient({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO  (unchanged)
      ══════════════════════════════════════ */}
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
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Orthopedics & Joint Replacement"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INTRO + DOCTOR SLIDER  (unchanged)
      ══════════════════════════════════════ */}
      <section className="py-12 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Department of{" "}
                  <span className="text-[#1e3a8a]">
                    Orthopedics , Joint Replacement and Spine Surgery
                  </span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
              <div className="space-y-5 text-gray-700 text-base md:text-[15px] font-medium leading-relaxed">
                <p>{introParagraphs[0]}</p>
                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-blue-50/40 rounded-r-2xl">
                  <p>{introParagraphs[1]}</p>
                </div>
                <p>{introParagraphs[2]}</p>
                <p>{introParagraphs[3]}</p>
              </div>
            </div>
            {/* Right Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full h-fit sticky top-24">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Orthopedics & Joint Replacement"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section className="bg-[#0b1c43] py-10 border-t border-blue-900">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-2 py-4 px-2 border border-blue-800/50 rounded-2xl hover:bg-blue-900/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold text-white font-heading">
                  {value}
                </span>
                <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TREATMENT SPECIALTIES  –  card grid
      ══════════════════════════════════════ */}
      <section className="py-16 xl:py-14 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          {/* Heading */}
          <div className="mb-10">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Our Specialties
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Treatment <span className="text-[#1e3a8a]">Categories</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent" />
          </div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex flex-col"
              >
                {/* Card Image */}
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 to-transparent" />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 bg-[#1e3a8a] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {cat.tag}
                  </span>
                  {/* Title overlay */}
                  <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-base leading-tight font-heading">
                    {cat.title}
                  </h3>
                </div>

                {/* Services list */}
                <div className="p-5 flex-1 flex flex-col gap-2">
                  {cat.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-md bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-100">
                        <Check className="w-3 h-3" />
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed font-medium">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US  –  white theme feature grid
      ══════════════════════════════════════ */}
      <section className="py-16 xl:py-14 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          {/* Heading */}
          <div className="mb-10">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Why Choose Us
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Our <span className="text-[#1e3a8a]">Strengths</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left – Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map(({ icon: Icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-blue-50/50 hover:border-blue-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center mb-3 shadow-lg shadow-blue-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[#0b1c43] font-bold text-sm mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right – Image */}
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-md border-8 border-slate-100">
              <Image
                src="/images/departments-images/orthopedics.jpg"
                alt="Orthopedics Expertise"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
