"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import DepartmentGallerySection from "@/components/DepartmentGallerySection";

/* ─── Data ─── */

const uspItems = [
  {
    title: "Hi-Tech Cath Lab:-",
    content:
      "Cardiac department of Popular Hospital have a Cath lab equipped with hi-tech equipment where we carry out tests and procedures including ablation, angiogram, angioplasty, IVUS, Rotablation and implantation of pacemakers/icds etc.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    title: "IVUS Facility:-",
    content:
      "Only center of eastern U.P. having HD-IVUS facility where we can detect exact amount of plaque its size, Degree of narrowing, restenosis & accurate stent placement.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
  },
  {
    title: "Dedicated Cardiac Team:-",
    content:
      "Our cardiac department have a team of expert and experienced Consultants with trained nursing staff especially for the cardiac services who are available 24x7 in cardiac care unit.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Non-Invasive cardiology program:-",
    content:
      'Popular hospital believes in saving life as its vision is to "Caring for Your Every Breath", the cardiac department performs all kind of non-invasive Procedure to save patient and give them a healthy and worry free life.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Round the clock support:-",
    content:
      "Popular Hospital provides 24x7 availability of doctors to support emergency cardiac services.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const treatmentList = [
  "Coronary angiography",
  "Coronary angioplasty",
  "Peripheral interventions",
  "Pacemaker implantation (Single chamber, Dual chamber, CRT, AICD, LBBB Pacing).",
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

const doctors = [
  {
    name: "Dr. Tejas Mahajan",
    qualifications: "MBBS, DNB (General Medicine), DrNB (Cardiology)",
    designation: "Consultant Interventional cardiology",
    slug: "dr-tejas-mahajan",
    image: "/images/departments_doctor/dr_tejas_mahajan.jpg.jpeg",
  },
  {
    name: "Dr. Hari Krishan Srivastava",
    qualifications: "M.B.B.S., M.D., DM (Cardiology)",
    designation: "Head, Department of Cardiology",
    slug: "dr-hari-krishan-srivastava",
    image: "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg",
  },
  {
    name: "Dr. Manoj Sharma",
    qualifications: "M.B.B.S., MD, PGDCC (Cardiology)",
    designation: "Department of Cardiology",
    slug: "dr-manoj-sharma",
    image: "/images/departments_doctor/dr_manoj-sharma.jpg",
  },
];

/* ─── Page ─── */

export default function CardiologyPage() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState({ name: "", phone: "" });
  const [callStatus, setCallStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleCallBackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus("loading");
    try {
      const res = await fetch("/api-backend/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callForm.name,
          phone: callForm.phone,
          department: "Cardiology",
        }),
      });
      if (!res.ok) throw new Error();
      setCallStatus("success");
      setCallForm({ name: "", phone: "" });
    } catch {
      setCallStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/cardiology_banner.png"
            alt="Cardiac Care"
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Cardiology
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
              <button
                onClick={() => {
                  setShowCallModal(true);
                  setCallStatus("idle");
                }}
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
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">

              {/* Department Intro */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Department of <span className="text-[#1e3a8a]">Cardiology</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-[17px] 2xl:text-lg font-medium text-justify">
                  <p>
                    Popular Hospital is a Top cardiac hospital of eastern Uttar
                    Pradesh ensuring best treatment for Heart Diseases. The entire
                    cardiology department is the only center in this region to
                    perform all coronary procedures via transradial route. The
                    center is well equipped with state-of-the-art equipment using
                    cutting-edge technology. From high end 2D Echocardiography to
                    the latest Catheterisation laboratory where complex coronary,
                    peripheral and structural interventions are being carried out
                    on a day to day basis using the most modern tools such as
                    Fractional flow Reserve (FFR)/ Rotatory Atherectomy
                    (Roatablation), Intravascular Ultrasound
                    (IVUS)/Electrophysiology.
                  </p>
                  <p>
                    The cardiac department at Popular is an integrated healthcare
                    center with a highly experienced, qualified, and dedicated
                    team of cardiologists who work in complete coordination to
                    provide comprehensive and multidisciplinary care to the
                    patients suffering from heart ailments. At Popular we have
                    pioneered the &apos;Heart Team&apos; approach where all
                    cardiovascular problems are comprehensively evaluated, jointly
                    discussed and individually planned for appropriate indicated
                    therapies.
                  </p>
                </div>
              </div>



            </div>

            {/* Right Sidebar - Doctor Card (4 cols) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider doctors={doctors} departmentName="Cardiology" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USP SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              USP Of Cardiac <span className="text-[#1e3a8a]">Departments</span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

          <div className="grid grid-cols-1 gap-4">
            {uspItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100"
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

      {/* ═══════ WHAT WE TREAT + NON-INVASIVE - side by side ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* What We Treat */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-52 w-full">
                <Image
                  src="/images/departments-images/coronary_angiography.jpeg"
                  alt="Cardiac Treatment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    What we <span className="text-blue-300">treat:</span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {treatmentList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-[15px] font-medium">
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
                <Image
                  src="/images/departments-images/preventive_cardiology.jpeg"
                  alt="Preventive Cardiology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                    Non-invasive and <span className="text-blue-300">preventive Cardiology:</span>
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {preventiveList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 text-[15px] font-medium">
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

      <DepartmentGallerySection
        departmentSlug="cardiology"
        departmentName="Cardiology"
      />

      {/* ═══════ GET A CALL BACK MODAL ═══════ */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#0b1c43] mb-2 font-heading">
              Get a Call Back
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Our team will call you shortly.
            </p>

            {callStatus === "success" ? (
              <div className="text-center py-6">
                <div className="text-green-500 text-5xl mb-3">✓</div>
                <p className="text-gray-700 font-semibold">
                  Thank you! We will call you back soon.
                </p>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="mt-4 bg-[#e11d48] text-white px-6 py-2 rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCallBackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={callForm.name}
                    onChange={(e) =>
                      setCallForm({ ...callForm, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={callForm.phone}
                    onChange={(e) =>
                      setCallForm({ ...callForm, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100 focus:outline-none transition-all"
                  />
                </div>
                {callStatus === "error" && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={callStatus === "loading"}
                  className="w-full bg-[#e11d48] hover:bg-rose-700 disabled:opacity-60 text-white py-3 rounded-full font-semibold transition-all"
                >
                  {callStatus === "loading"
                    ? "Submitting..."
                    : "Request Call Back"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
