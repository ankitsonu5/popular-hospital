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
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-12 text-center">
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

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-12 py-10 md:py-16 xl:py-12 space-y-16">
        {/* Section 1: Profile Card (Simple Square Layout) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <div className="w-full lg:w-[45%]">
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Simple Square Photo */}
                <div className="relative w-48 h-56 md:w-56 md:h-64 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                  <Image
                    src="/images/dr_ak_kaushik.png"
                    alt="Dr. A.K. Kaushik"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex-1 text-center md:text-left pt-2">
                  <Image
                    src="/logo.png"
                    alt="Popular Hospital"
                    width={130}
                    height={35}
                    className="mb-6 object-contain mx-auto md:mx-0"
                  />
                  <h2 className="text-3xl font-bold text-[#0b1c43] mb-1">
                    Dr. A.K. Kaushik
                  </h2>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-6">
                    Chairman & Managing Director
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-hospital-teal shrink-0"></div>
                      <p className="text-sm font-medium text-gray-700 leading-tight">
                        General, Laparoscopic, & Minimal Invasive Surgeon
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-hospital-teal shrink-0"></div>
                      <p className="text-sm font-medium text-gray-700 leading-tight">
                        MBBS, MS (General Surgery) IMS-BHU
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-1.5">
                    {[
                      "Popular Group of Hospitals",
                      "Popular Institute of Medical Foundation",
                      "Niraamaya Diagnostics",
                    ].map((item, idx) => (
                      <p
                        key={idx}
                        className="text-xs font-bold text-gray-500 uppercase tracking-tight"
                      >
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#4285f4] font-heading mb-6 uppercase tracking-tight">
                Profile Summary
              </h2>

              <div className="text-gray-700 text-lg md:text-xl xl:text-[15px] leading-relaxed mb-8">
                <p>
                  &quot;The single greatest asset and the primary de-risking
                  factor of this investment is the promoter himself,{" "}
                  <span className="font-bold text-[#0b1c43]">
                    Dr. A.K. Kaushik
                  </span>
                  . He is a pioneer in General, Laparoscopic, Laser & Minimal
                  Invasive Surgery in the region.&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Qualifications",
                    val: "MBBS, MS (General Surgery) IMS-BHU",
                  },
                  {
                    label: "Specialization",
                    val: "General, Laparoscopic, and Laser Surgery",
                  },
                  {
                    label: "Affiliations",
                    val: "AMASI, IAGES, Hernia Society of India",
                  },
                  {
                    label: "Key Awards",
                    val: "Kashi Ratna, CNBC Healthcare, Sunbeam",
                  },
                ].map((point, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {point.label}
                    </h4>
                    <p className="text-gray-800 font-bold text-sm leading-tight">
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
