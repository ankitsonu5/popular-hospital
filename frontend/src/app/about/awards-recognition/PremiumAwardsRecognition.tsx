"use client";

import { useState } from "react";
import {
  GraduationCap,
  Handshake,
  Share2,
  Stethoscope,
  Trophy,
} from "lucide-react";
import { CImage, T } from "@/components/content/Editable";
import AwardsProfileHero from "./AwardsProfileHero";

const awardsData = [
  { year: "2021", award: "Exemplary Award", conferred: "Hon'ble Governor of Maharashtra" },
  { year: "2021", award: "Bismillah Khan Kashi Ratna Award", conferred: "Tourism Department, Govt. of UP" },
  { year: "2017", award: "Sunbeam Achiever Award", conferred: "Sunbeam Group of Institutions" },
  { year: "2016", award: "India's Most Prominent Health Care Award", conferred: "CNBC TV, UP State" },
  { year: "2015", award: "Kashi Ratna Award", conferred: "Kashi Naresh Maharaj Legacy" },
  { year: "2015", award: "World Wide Achievers Award (Best Hospital in UP)", conferred: "Ministry of AYUSH, Govt. of India" },
];

const strategicValueData = [
  { title: "Brand Equity", desc: 'The "Dr. A.K. Kaushik" brand ensures immediate patient trust and strong referral linkages.' },
  { title: "Clinical Leadership", desc: "Over 30 years of experience managing large multi-specialty setups." },
  { title: "Operational Expertise", desc: "Deep understanding of hospital operations, compliance, and workforce management." },
  { title: "Regulatory Advantage", desc: "Long-standing credibility with government bodies ensures smooth project approvals." },
  { title: "High Worth", desc: "Dr. A.K. Kaushik is a personality with High Worth – again a positive influence for a safe investment." },
];

const strategicPalette = [
  { background: "#dbeafe", color: "#0b1c43" },
  { background: "#284a91", color: "#ffffff" },
  { background: "#0d9488", color: "#ffffff" },
  { background: "#0b1c43", color: "#ffffff" },
  { background: "#E85222", color: "#ffffff" },
];

const profilePoints = [
  { label: "QUALIFICATIONS", val: "MBBS, MS (General Surgery) IMS-BHU", icon: GraduationCap, accent: "#2563eb", surface: "#eff6ff" },
  { label: "SPECIALIZATION", val: "General, Laparoscopic, and Laser Surgery", icon: Stethoscope, accent: "#0d9488", surface: "#f0fdfa" },
  { label: "AFFILIATIONS", val: "AMASI, IAGES, Hernia Society of India", icon: Handshake, accent: "#7c3aed", surface: "#f5f3ff" },
  { label: "KEY AWARDS", val: "Kashi Ratna, CNBC Healthcare, Sunbeam", icon: Trophy, accent: "#d97706", surface: "#fffbeb" },
];

export default function PremiumAwardsRecognitionPage() {
  const [activeStrategic, setActiveStrategic] = useState<number | null>(1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "The Face: Dr. A.K. Kaushik - A Healthcare ICON",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f6fb] text-[#0b1c43]">
      <AwardsProfileHero onShare={handleShare} />
      {false && (
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#0b1c43",
          backgroundImage: "linear-gradient(118deg, #06132f 0%, #0b1c43 48%, #1e3a8a 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <CImage
            k="about-awards-recognition_b6eb4f"
            src="/images/banners/about_us_reward.jpg"
            alt="Awards and recognition banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(6,19,47,0.98) 0%, rgba(11,28,67,0.9) 52%, rgba(30,58,138,0.72) 100%)" }}
        />
        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -left-16 top-32 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#E85222]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-12 px-5 pb-20 pt-14 sm:px-8 md:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="max-w-2xl text-white">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-14 bg-[#E85222]" />
              <span className="h-2 w-2 rotate-45 bg-[#E85222]" />
            </div>
            <h1 className="font-heading text-3xl font-black uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[58px]">
              <T k="about-awards-recognition_eebffa" d={"The Face: Dr. A.K. Kaushik - A Healthcare"} />{" "}
              <span className="block text-[#4dd7e8] sm:mt-2">
                <T k="about-awards-recognition_b319fc" d={"ICON"} />
              </span>
            </h1>
            <button
              onClick={handleShare}
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15"
            >
              <Share2 className="h-4 w-4 text-[#4dd7e8] transition group-hover:scale-110" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em]">
                <T k="about-awards-recognition_5f83e2" d={"Share Profile"} />
              </span>
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-white/10 sm:-inset-5" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6">
              <div className="grid items-center gap-6 sm:grid-cols-[210px_1fr]">
                <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-white/95 sm:min-h-[340px]">
                  <CImage
                    k="about-awards-recognition_a8776d"
                    src="/images/dr_ak_kaushik.png"
                    alt="Dr. A.K. Kaushik"
                    fill
                    className="object-contain object-bottom px-3 pt-5"
                    priority
                  />
                </div>
                <div className="px-2 pb-3 text-white sm:px-0 sm:pb-0">
                  <div className="mb-5 inline-flex rounded-xl bg-white px-4 py-2 shadow-sm">
                    <CImage
                      k="about-awards-recognition_5c6ca6"
                      src="/logo.png"
                      alt="Popular Hospital"
                      width={120}
                      height={30}
                      className="h-auto w-[108px] object-contain"
                    />
                  </div>
                  <h2 className="font-heading text-3xl font-black leading-none tracking-tight sm:text-[34px]">
                    <T k="about-awards-recognition_cf7a53" d={"Dr. A.K. Kaushik"} />
                  </h2>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
                    <T k="about-awards-recognition_da7b25" d={"Chairman & Managing Director"} />
                  </p>
                  <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4dd7e8]" />
                      <p className="text-sm font-semibold leading-relaxed text-white/85">
                        <T k="about-awards-recognition_d242bb" d={"General, Laparoscopic, & Minimal Invasive Surgeon"} />
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#4dd7e8]" />
                      <p className="text-sm font-semibold leading-relaxed text-white/85">
                        <T k="about-awards-recognition_8d3559" d={"MBBS, MS (General Surgery) IMS-BHU"} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-3">
                {["POPULAR GROUP OF HOSPITALS", "POPULAR INSTITUTE OF MEDICAL FOUNDATION", "NIRAAMAYA DIAGNOSTICS"].map((item) => (
                  <p key={item} className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-[8px] font-black uppercase leading-relaxed tracking-[0.13em] text-white/60">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#E85222]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <div className="mx-auto w-full max-w-[1280px] space-y-16 px-5 py-16 sm:px-8 md:space-y-20 md:py-20 lg:px-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-8 w-1.5 rounded-full bg-[#E85222]" />
                <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-[#0b1c43] sm:text-3xl">
                  <T k="about-awards-recognition_61613c" d={"Profile Summary"} />
                </h2>
              </div>
              <div
                className="relative overflow-hidden rounded-[1.5rem] p-7 text-white sm:p-9"
                style={{ backgroundColor: "#0b1c43", backgroundImage: "linear-gradient(145deg, #0b1c43 0%, #1e3a8a 100%)" }}
              >
                <span aria-hidden="true" className="absolute -right-1 -top-12 font-serif text-[170px] leading-none text-white/[0.06]">“</span>
                <p className="relative z-10 font-jakarta text-base font-medium italic leading-8 text-white/85 sm:text-lg">
                  <T k="about-awards-recognition_a3605a" d={'"The single greatest asset and the primary de-risking factor of this investment is the promoter himself,"'} />{" "}
                  <span className="font-extrabold not-italic text-white underline decoration-[#E85222] decoration-2 underline-offset-4">
                    <T k="about-awards-recognition_cf7a53_2" d={"Dr. A.K. Kaushik"} />
                  </span>
                  <T k="about-awards-recognition_a2aae5" d={'. He is a pioneer in General, Laparoscopic, Laser & Minimal Invasive Surgery in the region."'} />
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {profilePoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.label} className="group rounded-[1.4rem] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)] sm:p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: point.surface, color: point.accent }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{point.label}</h3>
                    <p className="mt-2 font-jakarta text-sm font-extrabold leading-relaxed text-slate-800 sm:text-[15px]">{point.val}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-9 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E85222] text-white shadow-[0_10px_25px_rgba(232,82,34,0.24)]">
              <Trophy className="h-5 w-5" />
            </span>
            <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-[#0b1c43] sm:text-3xl">
              <T k="about-awards-recognition_4cba49" d={"Awards Timeline"} />
            </h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_22px_65px_rgba(15,23,42,0.07)]">
            <div className="hidden grid-cols-[130px_1fr_0.8fr] border-b border-slate-200 bg-slate-50/90 px-11 py-4 lg:grid">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <T k="about-awards-recognition_879e32" d={"Year"} />
              </p>
              <p className="pl-14 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <T k="about-awards-recognition_2a2df4" d={"Award Name"} />
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <T k="about-awards-recognition_720d4c" d={"Conferred By"} />
              </p>
            </div>
            {awardsData.map((row) => (
              <article key={`${row.year}-${row.award}`} className="group relative grid gap-5 border-b border-slate-100 px-6 py-7 transition hover:bg-[#f8fafc] last:border-b-0 sm:grid-cols-[110px_1fr] sm:px-9 lg:grid-cols-[130px_1fr_0.8fr] lg:items-center lg:px-11">
                <div className="relative z-10">
                  <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-black text-[#1e3a8a]">{row.year}</span>
                </div>
                <div className="relative z-10 flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4ef] text-[#E85222] transition group-hover:bg-[#E85222] group-hover:text-white">
                    <Trophy className="h-4 w-4" />
                  </span>
                  <p className="font-jakarta text-[15px] font-extrabold leading-relaxed text-slate-800 sm:text-base">{row.award}</p>
                </div>
                <p className="pl-14 font-jakarta text-sm font-medium leading-relaxed text-slate-500 sm:col-start-2 lg:col-start-auto lg:pl-0">
                  <span className="lg:hidden">
                    <T k="about-awards-recognition_e389a3" d={"Conferred by: "} />
                  </span>
                  {row.conferred}
                </p>
                <span className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-y scale-y-0 bg-[#E85222] transition-transform duration-300 group-hover:scale-y-100" />
              </article>
            ))}
            <div
              className="grid gap-4 px-6 py-7 text-white sm:grid-cols-[150px_1fr] sm:items-center sm:px-9 lg:px-11"
              style={{ backgroundColor: "#0b1c43", backgroundImage: "linear-gradient(90deg, #0b1c43 0%, #1e3a8a 100%)" }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9a73]">
                <T k="about-awards-recognition_3d33e3" d={"Special Honor"} />
              </p>
              <p className="font-jakarta text-sm font-black leading-relaxed sm:text-base">
                <span className="mr-2 text-[#E85222]">★</span>
                <T k="about-awards-recognition_672513" d={"Honored by Hon'ble Chief Minister of Uttar Pradesh, Shri Yogi Adityanath Ji"} />
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white px-6 py-9 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:py-5">
              <div className="mb-7 flex items-center">
                <span className="relative z-10 h-5 w-5 rounded-full bg-[#050505] sm:h-6 sm:w-6" />
                <span className="-ml-1 h-5 w-5 rounded-full bg-[#a7adb1] sm:h-6 sm:w-6" />
              </div>
              <h2 className="max-w-[420px] font-jakarta text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#050505] sm:text-6xl lg:text-[68px]">
                <T k="about-awards-recognition_7e2742" d={"Strategic Value"} />
              </h2>
            </div>

            <div className="space-y-2.5">
              {strategicValueData.map((item, index) => {
                const isOpen = activeStrategic === index;
                const palette = strategicPalette[index];

                return (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-[1.15rem] transition-all duration-300"
                    style={{
                      backgroundColor: palette.background,
                      color: palette.color,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStrategic(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex min-h-[72px] w-full items-center justify-between gap-5 px-5 py-4 text-left sm:min-h-[82px] sm:px-7"
                    >
                      <h3 className="font-jakarta text-lg font-black leading-tight tracking-[-0.025em] sm:text-2xl">
                        {item.title}
                      </h3>
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xl font-medium leading-none text-[#071632] shadow-sm sm:h-8 sm:w-8"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl px-5 pb-7 text-sm font-semibold leading-7 opacity-80 sm:px-7 sm:pb-8 sm:text-[15px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
