import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambulance Services | Popular Hospital",
  description:
    "24 hrs Ambulance pickup service available all the way from anywhere in Varanasi ensuring fast and prompt transport to our Emergency Team.",
};

const sections = [
  {
    id: "department",
    title: "Department of Ambulance",
    content: (
      <>
        <div className="flex justify-end mb-4 absolute top-0 right-0 p-4 pt-0">
          <div className="bg-[#1a3a6b] text-white text-xs lg:text-sm font-semibold px-4 py-2 rounded-bl-xl shadow-md hidden lg:inline-block">
            For Ambulance Service in Varanasi, Call at +91-9519999280
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-blue-800">
          Meet the World's Best Doctors or Consultant
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          There is a always a significant, ongoing need for blood and blood
          products. Because there is no substitute for human blood, the
          generosity of blood donors helps to ensure that we maintain an
          adequate supply for our patients. Giving just one pint of your blood
          can help save the lives of three patients, and the entire process of
          blood donation only takes about an hour.
        </p>

        <h3 className="text-xl font-bold mb-3 text-blue-800 mt-6 md:mt-8">
          Also you may need the ambulance in Varanasi. Will the ambulance travel
          all the way from popular hospital to such distant places?
        </h3>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          A lot of time will be lost. Then... With Popular Hospital it is
          different. The nearest Ambulance available in your locality will be
          rushed to your place, wherever you are to bring your patient directly
          to Popular Hospital in the shortest possible time. And while the
          patient is on the way the Emergency Team at Popular Hospital will make
          ready the ICU Bed, O.T. etc. So that little time is lost reaches
          Popular Hospital. No other hospital in Varanasi offers 24 hrs.
          Ambulance pickup service, not even during daytime.
        </p>
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1587556930799-8daca6a1bb5d?auto=format&fit=crop&q=80&w=1200",
    imgAlt: "Ambulance driving fast",
  },
  {
    id: "best-hospitals",
    title: "Why patients like popular hospital?",
    subtitle: "Rated as one of Varanasi's best",
    subtitleColorHighlight: "hospitals:",
    content: (
      <ul className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        <li className="flex gap-4">
          <span className="text-blue-500 font-bold mt-1">›</span>
          <span>
            For excellence in quality of routine and super specialty pathology
            testing Popular Hospital Pathology lab has also received the
            prestigious accreditation from the National Accreditation Board for
            Laboratories (NABL). In Eastern India only Popular Hospital
            pathology lab has in-house facilities to perform super specialty
            pathology tests like PCR, Flow Cytometry, etc. This benefits Popular
            Hospitals patients tremendously and there is practically no waiting
            time for getting test results when compared to other hospitals in
            Varanasi who have to send these tests to Mumbai or Delhi and wait
            for 3 / 4 days for got test results. Thus there is no delay in
            diagnosis and therefore, prompt and accurate treatment for Popular
            Hospital's patients.
          </span>
        </li>
      </ul>
    ),
    image: "/images/departments-images/emergency_services.webp",
    imgAlt: "Medical team treating patient inside ambulance",
  },
  {
    id: "safest-hospital",
    title: "",
    subtitle: "Safest Hospital for ",
    subtitleColorHighlight: "Any Operation:",
    content: (
      <ul className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        <li className="flex gap-4">
          <span className="text-blue-500 font-bold mt-1">›</span>
          <span>
            2 of the major fears any surgeon has before any operation is that of
            OT infection and cardiac. heart complications during or after the
            operation. If OT infections occur or the patient develops cardiac
            problems even the best surgeon cannot help you. Popular Hospital is
            the only hospital in Varanasi having STEEL OPERATION THEATERS (Steel
            OTs) which drastically reduces chances of OT infection. After the
            surgery the patient is under the best care of doctors and nurses in
            the post-operative phase at Popular Hospital.
          </span>
        </li>
      </ul>
    ),
    image: "/images/departments-images/safest_hospital.jpg",
    imgAlt: "Medical staff helping patient to ambulance",
  },
  {
    id: "specialists-round-clock",
    title: "",
    subtitle: "Specialist Doctors' Round ",
    subtitleColorHighlight: "the Clock",
    content: (
      <ul className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        <li className="flex gap-4">
          <span className="text-blue-500 font-bold mt-1">›</span>
          <span>
            With 28 medical departments having in-house specialist doctors any
            problem during your stay at Popular Hospital can be handled by this
            specialist doctors' team 24 hours. You may be admitted for a
            particular surgery but in the event there are some problems which a
            specialist needs doctor of another department it is available
            immediately in-house at Popular Hospital. This facility is often not
            available at other renowned hospitals.
          </span>
        </li>
      </ul>
    ),
    image: "/images/departments-images/ambulance_doctor.png",
    imgAlt: "Doctor standing in front of ambulance",
  },
];

export default function AmbulancePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[400px] md:h-[400px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/ambulance.png"
            alt="Ambulance Services"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              Ambulance
            </h1>
            <nav
              className="flex items-center text-sm md:text-lg text-white/90 font-bold"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Home
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <Link
                href="/services"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Services
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <span className="text-white uppercase tracking-wider">
                Ambulance
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content (Zig-Zag Layout) */}
      <section className="py-24">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, idx) => {
              const showImage = section.id !== "department";
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={section.id}
                  className={`flex flex-col ${showImage ? (isEven ? "lg:flex-row" : "lg:flex-row-reverse") : "items-start text-left"} gap-12 lg:gap-20`}
                >
                  {/* Content */}
                  <div
                    className={`w-full ${showImage ? "lg:w-[55%]" : "w-full"}`}
                  >
                    {section.subtitle ? (
                      <>
                        <h2 className="text-lg lg:text-xl font-bold text-[#284a91] mb-1 lg:mb-2 font-heading tracking-wide uppercase">
                          {section.title}
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                          <h3 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight capitalize">
                            {section.subtitle}{" "}
                            <span className="text-blue-800">
                              {section.subtitleColorHighlight}
                            </span>
                          </h3>
                          <div className="flex-1 h-px bg-gray-200 mt-2"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-8">
                          <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight capitalize">
                            Department of{" "}
                            <span className="text-blue-800">Ambulance</span>
                          </h2>
                          <div className="flex items-center gap-2 mt-4">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <div className="h-[2px] w-24 bg-gradient-to-r from-blue-600 to-transparent" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="prose prose-lg max-w-none text-gray-700">
                      {section.content}
                    </div>
                  </div>

                  {/* Image with Pill Masking */}
                  {showImage && (
                    <div className="w-full lg:w-[45%] flex justify-center">
                      <div className="relative w-full max-w-[500px]">
                        {/* Decorative Element */}
                        <div
                          className={`absolute -inset-4 bg-blue-50/50 rounded-full blur-2xl opacity-60 z-0`}
                        ></div>

                        {/* Image Container */}
                        <div
                          className={`relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/3] lg:aspect-[4/3] z-10 overflow-hidden shadow-xl border-4 border-white
                          ${isEven ? "rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[1rem] rounded-bl-[1rem]" : "rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-[1rem] rounded-br-[1rem]"} 
                        `}
                        >
                          <Image
                            src={section.image}
                            alt={section.imgAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <section className="bg-[#1a3a6b] py-12 px-6 border-t border-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto max-w-[1366px] text-center relative z-10">
          <h2 className="text-xl lg:text-3xl font-black text-white mb-3 font-heading drop-shadow-md">
            Need an Ambulance Now?
          </h2>
          <p className="text-blue-100 mb-6 text-sm lg:text-base max-w-2xl mx-auto">
            We guarantee the shortest possible response time in Varanasi. Call
            our 24/7 emergency dispatch line directly.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl inline-flex flex-col sm:flex-row items-center gap-4 border border-white/20">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white text-blue-800 rounded-full flex items-center justify-center flex-shrink-0 animate-[pulse_2s_infinite] shadow-lg">
              <svg
                className="w-7 h-7 md:w-8 md:h-8"
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
            <div className="text-center sm:text-left">
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-[0.1em] mb-1">
                24/7 Ambulance Dispatch
              </p>
              <a
                href="tel:+919519999280"
                className="text-2xl md:text-4xl font-black text-white hover:text-blue-100 transition-colors drop-shadow-sm"
              >
                +91-9519999280
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
