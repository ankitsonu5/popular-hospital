"use client";

import Image from "next/image";
import Link from "next/link";
import DoctorSlider from "@/components/DoctorSlider";

const doctors: never[] = []; // No doctors for now

export default function PathologyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#004d61] overflow-hidden flex items-center py-10 md:py-12">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
            alt="Laboratory Research"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B4A] via-[#003B4A]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-200 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm uppercase tracking-widest">
              Department of Pathology
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Laboratory & <br />
              Medical Research
            </h1>
            <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
              Advanced diagnostic solutions powered by cutting-edge technology
              and expert pathologists. We deliver precise results for better
              patient outcomes.
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
                Book a Test
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

      {/* Floating Cards / Features */}
      <section className="relative z-20 mt-8 md:-mt-16 pb-20 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Biochemistry",
                icon: "test-tube",
                desc: "Chemical processes within living organisms.",
              },
              {
                title: "Haematology",
                icon: "microscope",
                desc: "Study of blood and blood disorders.",
              },
              {
                title: "Microbiology",
                icon: "virus",
                desc: "Study of microscopic organisms.",
              },
              {
                title: "Clinical Pathology",
                icon: "dna",
                desc: "Diagnosis of disease using lab analysis.",
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
                        item.icon === "test-tube"
                          ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          : item.icon === "microscope"
                            ? "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            : item.icon === "virus"
                              ? "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              : "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      }
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiment With Best Lab Product Section */}
      <section className="py-20 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text Content (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="text-teal-600 font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                BETTER FOR YOU
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-[#004d61] mb-6 font-heading leading-tight uppercase tracking-tight">
                Experiment With <br />
                <span>Best Lab Product</span>
              </h2>

              <h3 className="text-xl font-bold text-[#334155] mb-3 uppercase tracking-wide">
                Basic Health Check-up
              </h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-md font-medium">
                Our laboratory offers comprehensive health check-up packages
                designed for early detection and prevention.
              </p>

              <div className="space-y-4 mb-4 w-full">
                {[
                  "Complete Blood Count",
                  "Blood Sugar-Fasting",
                  "Post Prandial Sugar",
                  "Liver Function Test",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-teal-50 border-2 border-teal-500 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all">
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
                    </div>
                    <span className="text-gray-700 font-bold text-sm tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column: Image (4 cols) */}
            <div className="lg:col-span-4 relative flex justify-center py-10">
              <div className="relative w-full aspect-[3/4] max-w-[400px]">
                <Image
                  src="/images/microscope.png"
                  alt="Best Lab Product Microscope"
                  fill
                  className="object-contain z-10 drop-shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
              </div>
            </div>

            {/* Right Column: Features List (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-10">
              {[
                { title: "Report Efficiency", icon: "user" },
                { title: "Complete Cases", icon: "flask" },
                { title: "Our Equipment", icon: "microscope" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#004d61] flex items-center justify-center flex-shrink-0 text-white shadow-lg group-hover:bg-teal-600 group-hover:rotate-6 transition-all">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={
                          feature.icon === "user"
                            ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            : feature.icon === "flask"
                              ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                              : "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[#004d61] font-bold text-lg mb-1 font-heading uppercase tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] font-medium">
                      Delivering accurate results with maximum efficiency and
                      precision.
                    </p>
                    <div className="h-px bg-gray-100 w-full mt-5 group-hover:bg-teal-500 transition-colors"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Slider Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <DoctorSlider doctors={doctors} departmentName="Pathology" />
        </div>
      </section>

      {/* Services Grid (Teal Section) */}
      <section className="bg-[#00A99D] py-24 text-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-teal-200 font-bold tracking-widest text-sm uppercase mb-3 block">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6 uppercase tracking-tight">
              High Quality Test Services
            </h2>
            <p className="text-teal-100 text-lg opacity-90 font-medium">
              Comprehensive diagnostic services covering everything from routine
              blood work to advanced genetic testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { title: "Diagnostic Testing", icon: "flask" },
              { title: "Food Sensitivity", icon: "apple" },
              { title: "Naturopathic Testing", icon: "leaf" },
              { title: "Biochemistry Tests", icon: "atom" },
              { title: "Chemical Research", icon: "beaker" },
              { title: "Genetic Testing", icon: "dna" },
            ].map((service, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 border-b border-teal-400/30 pb-6 group cursor-pointer hover:border-white transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-teal-600 transition-all shadow-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={
                        service.icon === "flask"
                          ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          : service.icon === "apple"
                            ? "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            : service.icon === "leaf"
                              ? "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              : "M13 10V3L4 14h7v7l9-11h-7z"
                      }
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform font-heading uppercase tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-teal-100 text-sm opacity-80 font-bold">
                    Advanced comprehensive analysis
                  </p>
                </div>
                <svg
                  className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.3}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
