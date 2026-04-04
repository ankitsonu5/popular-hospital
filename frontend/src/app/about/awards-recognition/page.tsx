"use client";

import Image from "next/image";
import { Share2 } from "lucide-react";

const awardsData = [
  {
    year: "2021",
    award: "Exemplary Award",
    conferred: "Hon'ble Governor of Maharashtra",
  },
  {
    year: "2021",
    award: "Bismillah Khan Kashi Ratna Award",
    conferred: "Tourism Department, Govt. of UP",
  },
  {
    year: "2017",
    award: "Sunbeam Achiever Award",
    conferred: "Sunbeam Group of Institutions",
  },
  {
    year: "2016",
    award: "India's Most Prominent Health Care Award",
    conferred: "CNBC TV, UP State",
  },
  {
    year: "2015",
    award: "Kashi Ratna Award",
    conferred: "Kashi Naresh Maharaj Legacy",
  },
  {
    year: "2015",
    award: "World Wide Achievers Award (Best Hospital in UP)",
    conferred: "Ministry of AYUSH, Govt. of India",
  },
];

const strategicValueData = [
  {
    title: "Brand Equity",
    desc: 'The "Dr. A.K. Kaushik" brand ensures immediate patient trust and strong referral linkages.',
  },
  {
    title: "Clinical Leadership",
    desc: "Over 30 years of experience managing large multi-specialty setups.",
  },
  {
    title: "Operational Expertise",
    desc: "Deep understanding of hospital operations, compliance, and workforce management.",
  },
  {
    title: "Regulatory Advantage",
    desc: "Long-standing credibility with government bodies ensures smooth project approvals.",
  },
  {
    title: "High Worth",
    desc: "Dr. A.K. Kaushik is a personality with High Worth \u2013 again a positive influence for a safe investment.",
  },
];

export default function AwardsRecognitionPage() {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "The Face: Dr. A.K. Kaushik - A Healthcare ICON",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ─── Simple & Clean Hero Section ─── */}
      <div className="bg-[#0b1c43] text-white py-8 md:py-10 xl:py-6 relative overflow-hidden min-h-[150px] md:min-h-[200px] xl:min-h-[150px] flex flex-col justify-center">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl xl:max-w-6xl min-[1920px]:max-w-[1366px] px-6 sm:px-12 text-center">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-2xl font-black font-heading tracking-tight leading-tight mb-6 text-white drop-shadow-md uppercase">
            The Face: Dr. A.K. Kaushik - A Healthcare{" "}
            <span className="text-[#00B4D8]">ICON</span>
          </h1>
          <div className="w-24 h-1 bg-hospital-orange rounded-full mx-auto mb-8"></div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 backdrop-blur-md group hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            <Share2 className="w-4 h-4 text-[#00B4D8] group-hover:animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Share Profile
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl xl:max-w-6xl min-[1920px]:max-w-[1366px] px-4 sm:px-12 py-10 md:py-16 xl:py-12 space-y-16">
        {/* Main Card Wrapper Section as per Image */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 p-8 md:p-14 mb-20 relative overflow-hidden">
          {/* Subtle Accent Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Section: Specialized Inner Doctor Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md h-full">
                <div className="flex flex-col gap-8">
                  {/* Doctor Info Section with Photo-Logo-Name Balance */}
                  <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8 lg:gap-6 items-center md:items-start lg:items-center">
                    {/* Photo in refined container */}
                    <div className="relative w-48 h-56 md:w-56 md:h-64 lg:w-full lg:h-[320px] overflow-hidden rounded-2xl border border-gray-50 flex-shrink-0 bg-slate-50/50">
                      <Image
                        src="/images/dr_ak_kaushik.png"
                        alt="Dr. A.K. Kaushik"
                        fill
                        className="object-contain p-2"
                        priority
                      />
                    </div>

                    <div className="flex-1 text-center md:text-left lg:text-center w-full">
                      {/* Logo positioned at top-right of text area as in image */}
                      <div className="flex justify-center md:justify-end lg:justify-center mb-6">
                        <Image
                          src="/logo.png"
                          alt="Popular Hospital"
                          width={120}
                          height={30}
                          className="object-contain"
                        />
                      </div>

                      <h2 className="text-4xl md:text-5xl lg:text-3xl font-black text-[#0b1c43] mb-1 font-heading tracking-tight leading-none">
                        Dr. A.K. Kaushik
                      </h2>
                      <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] mb-8 lg:mb-10 block">
                        Chairman & Managing Director
                      </p>

                      {/* Teal Dot Bullet List as in Image */}
                      <div className="space-y-6 text-left inline-block w-full">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-hospital-teal shrink-0 border-2 border-hospital-teal/20"></div>
                          <p className="text-[15px] md:text-base lg:text-sm font-semibold text-slate-700 leading-snug">
                            General, Laparoscopic, & Minimal Invasive Surgeon
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-hospital-teal shrink-0 border-2 border-hospital-teal/20"></div>
                          <p className="text-[15px] md:text-base lg:text-sm font-semibold text-slate-700 leading-snug">
                            MBBS, MS (General Surgery) IMS-BHU
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Divider Line */}
                  <div className="w-full h-px bg-gray-100 my-2"></div>

                  {/* Footer Group List Styling */}
                  <div className="flex flex-col gap-2.5 px-2">
                    {["POPULAR GROUP OF HOSPITALS", "POPULAR INSTITUTE OF MEDICAL FOUNDATION", "NIRAAMAYA DIAGNOSTICS"].map((item, idx) => (
                      <p key={idx} className="text-[10px] md:text-xs lg:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Strategic Profile Summary & Grid */}
            <div className="lg:col-span-7 flex flex-col pt-4">
              <h2 className="text-3xl font-black text-blue-500 font-heading mb-10 tracking-tight uppercase leading-none">
                Profile Summary
              </h2>

              <div className="text-slate-600 font-medium text-lg md:text-xl lg:text-[15px] leading-relaxed mb-12 italic border-l-4 border-blue-100 pl-6 py-2">
                <p>
                  &quot;The single greatest asset and the primary de-risking factor of this investment is the promoter himself, 
                  <span className="font-bold text-slate-900 not-italic ml-1">Dr. A.K. Kaushik</span>. 
                  He is a pioneer in General, Laparoscopic, Laser & Minimal Invasive Surgery in the region.&quot;
                </p>
              </div>

              {/* Info Grid of Boxes with borders as per reference image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4">
                {[
                  { label: "QUALIFICATIONS", val: "MBBS, MS (General Surgery) IMS-BHU" },
                  { label: "SPECIALIZATION", val: "General, Laparoscopic, and Laser Surgery" },
                  { label: "AFFILIATIONS", val: "AMASI, IAGES, Hernia Society of India" },
                  { label: "KEY AWARDS", val: "Kashi Ratna, CNBC Healthcare, Sunbeam" },
                ].map((point, i) => (
                  <div key={i} className="p-6 md:p-5 bg-slate-50/30 rounded-2xl border border-slate-100 transition-colors hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-100 group">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2 group-hover:text-blue-400 transition-colors">
                      {point.label}
                    </h4>
                    <p className="text-slate-800 font-bold text-base md:text-sm leading-tight">
                      {point.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Awards Table (Properly Mobile Responsive) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#4285f4] font-heading uppercase tracking-tight">
            Awards Timeline
          </h2>

          <div className="border border-black rounded-lg overflow-hidden">
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black bg-gray-50">
                    <th className="px-6 py-4 font-bold border-r border-black">
                      Year
                    </th>
                    <th className="px-6 py-4 font-bold border-r border-black">
                      Award Name
                    </th>
                    <th className="px-6 py-4 font-bold">Conferred By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {awardsData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-black last:border-0"
                    >
                      <td className="px-6 py-4 border-r border-black font-bold">
                        {row.year}
                      </td>
                      <td className="px-6 py-4 border-r border-black">
                        {row.award}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {row.conferred}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td className="px-6 py-8 border-r border-black font-bold">
                      Honored by
                    </td>
                    <td className="px-6 py-8 font-bold text-lg" colSpan={2}>
                      Hon&apos;ble Chief Minister of Uttar Pradesh, Shri Yogi
                      Adityanath Ji
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout for Table */}
            <div className="md:hidden divide-y divide-black">
              {awardsData.map((row, idx) => (
                <div key={idx} className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#4285f4] text-white px-2 py-0.5 rounded text-xs font-bold">
                      {row.year}
                    </span>
                    <p className="font-bold text-gray-900 text-sm">
                      {row.award}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Conferred by: {row.conferred}
                  </p>
                </div>
              ))}
              <div className="p-5 bg-gray-100 space-y-1">
                <p className="text-[10px] font-black text-[#4285f4] uppercase tracking-widest">
                  Honored by
                </p>
                <p className="font-bold text-gray-900 leading-tight">
                  Hon&apos;ble Chief Minister of Uttar Pradesh, Shri Yogi
                  Adityanath Ji
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Strategic Value */}
        <div className="space-y-8 pb-10">
          <h2 className="text-2xl font-bold text-[#4285f4] font-heading uppercase tracking-tight">
            Strategic Value
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicValueData.map((item, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <h3 className="text-lg font-bold text-[#0b1c43] mb-3 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
