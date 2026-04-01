"use client";

import Image from "next/image";
import Link from "next/link";
import RadiologyVideoSection from "../../../components/RadiologyVideoSection";
import DoctorSlider from "@/components/DoctorSlider";

const doctors: never[] = []; // No doctors for now

export default function RadiologyPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#004d61] overflow-hidden flex items-center py-10 md:py-12">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2000"
            alt="Radiology Imaging"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B4A] via-[#003B4A]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-200 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm uppercase tracking-widest">
              Department of Radiology
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Advanced <br />
              Diagnostic Imaging
            </h1>
            <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium text-justify">
              State-of-the-art imaging technology provided by expert
              radiologists. We ensure accurate diagnosis for effective treatment
              planning.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 flex items-center gap-2 uppercase text-sm tracking-wide">
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
                Book an Appointment
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cards / Features - Scan Types */}
      <section className="relative z-20 mt-8 md:-mt-16 pb-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "MRI Scan",
                icon: "magnet",
                desc: "Detailed imaging of organs and tissues using magnetic fields.",
              },
              {
                title: "CT Scan",
                icon: "layer-group",
                desc: "Cross-sectional images for precise diagnosis.",
              },
              {
                title: "Ultrasound",
                icon: "wave",
                desc: "High-frequency sound waves for internal body structure imaging.",
              },
              {
                title: "Digital X-Ray",
                icon: "x-ray",
                desc: "Quick and effective imaging for bones and chest.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                  <svg
                    className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        item.icon === "magnet"
                          ? "M13 10V3L4 14h7v7l9-11h-7z"
                          : item.icon === "layer-group"
                            ? "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            : item.icon === "wave"
                              ? "M6 18L18 6M6 6l12 12"
                              : "M12 4v16m8-8H4"
                      }
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Stats Cards - Qualities */}
      <section className="py-12 bg-gray-50/30">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Patient Safety",
                desc: "Lowest radiation dose protocols",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Modern Tech",
                desc: "Latest 3T MRI & 128 Slice CT",
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
              },
              {
                title: "Certified Experts",
                desc: "Board-certified radiologists",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                title: "24/7 Services",
                desc: "Emergency radiology support",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={card.icon}
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm font-bold">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exceptional Care Section with Video */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <span className="text-teal-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                  Patient Centered Care
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-6 relative z-10 leading-tight">
                  Exceptional <br />
                  <span className="text-teal-600">Radiology Care</span> for
                  Patients
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-10 text-base md:text-lg font-bold text-justify">
                Our Department combines personalized care with cutting-edge
                technology. Whether you need a routine X-ray or a complex MRI,
                our team ensures a comfortable, safe, and precise imaging
                experience.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Advanced 3D Mammography",
                  "High-Field Open MRI for claustrophobic patients",
                  "Low-dose CT technology for patient safety",
                  "Same-day appointments for urgent cases",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-800 font-bold text-base md:text-lg"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-[#E85222] text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 uppercase text-sm tracking-widest transform hover:scale-105">
                Meet Our Specialists
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-teal-600/10 rounded-3xl blur-[80px] -z-10 group-hover:bg-teal-600/20 transition-all"></div>
              <RadiologyVideoSection />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Sections - Alternating */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-20">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group border-[12px] border-white">
                <Image
                  src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop"
                  alt="Advanced Technology"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-4xl font-black mb-1 font-heading">3.0T</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                    MRI Precision
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <span className="text-teal-600 font-bold tracking-[0.3em] text-xs uppercase mb-3 block">
                Innovation
              </span>
              <h3 className="text-3xl md:text-4xl font-black font-heading text-gray-900 mb-6 uppercase tracking-tight">
                Advanced Technology
              </h3>
              <p className="text-gray-700 mb-6 text-base md:text-lg font-bold text-justify leading-relaxed">
                We utilize the absolute latest in diagnostic imaging technology.
                Our 3T MRI machines provide clearer images in less time, while
                our advanced PET-CT scanners allow for early detection of
                critical conditions with minimal radiation exposure.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <span className="text-teal-600 font-bold tracking-[0.3em] text-xs uppercase mb-3 block">
                Precision
              </span>
              <h3 className="text-3xl md:text-4xl font-black font-heading text-gray-900 mb-6 uppercase tracking-tight">
                Accurate Radiology Reporting
              </h3>
              <p className="text-gray-700 mb-6 text-base md:text-lg font-bold text-justify leading-relaxed">
                Our radiologists are sub-specialty trained, meaning your
                neuro-scan is read by a neuro-radiologist, and your cardiac scan
                by a cardiac specialist. This expert review ensures the highest
                accuracy for your diagnosis.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group border-[12px] border-white">
                <Image
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop"
                  alt="Radiology Reporting"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-teal-900/60 to-transparent"></div>
                <div className="absolute bottom-8 right-8 text-white text-right">
                  <p className="text-4xl font-black mb-1 font-heading">24/7</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                    Expert Reporting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Slider Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <DoctorSlider doctors={doctors} departmentName="Radiology" />
        </div>
      </section>

      {/* Expertise Grid (Teal Section) */}
      <section className="bg-[#00A99D] py-24 text-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-teal-100 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-6 uppercase tracking-tight">
              World Class Imaging
            </h2>
            <p className="text-teal-50 text-lg opacity-90 font-bold">
              Comprehensive radiology services covering everything from routine
              X-rays to advanced interventional procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {[
              { title: "Neuro Radiology", icon: "brain" },
              { title: "Cardiac Imaging", icon: "heart" },
              { title: "Musculoskeletal", icon: "bone" },
              { title: "Women's Imaging", icon: "female" },
              { title: "Pediatric Radiology", icon: "child" },
              { title: "Interventional", icon: "procedure" },
            ].map((service, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 border-b-2 border-teal-400/30 pb-8 group cursor-pointer hover:border-white transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-teal-600 transition-all shadow-xl group-hover:rotate-6">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        service.icon === "brain"
                          ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          : "M13 10V3L4 14h7v7l9-11h-7z"
                      }
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-black mb-1 group-hover:translate-x-2 transition-transform font-heading uppercase tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-teal-50 text-xs opacity-70 font-bold uppercase tracking-widest">
                    Specialized Service
                  </p>
                </div>
                <svg
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helpline Section */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto w-full max-w-[1366px] px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
              <svg
                className="w-8 h-8"
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
            </div>
            <div>
              <p className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-1">
                Emergency Radiology
              </p>
              <p className="text-2xl font-black font-heading tracking-tight uppercase">
                24/7 Helpline Number
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-3xl md:text-4xl font-black font-heading">
            <a
              href="tel:+917800001895"
              className="hover:text-teal-400 transition-colors tracking-tighter text-[#E85222]"
            >
              +91-7800001895
            </a>
            <span className="opacity-30">/</span>
            <a
              href="tel:+917800001896"
              className="hover:text-teal-400 transition-colors tracking-tighter text-[#E85222]"
            >
              96
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
