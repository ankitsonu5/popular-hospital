import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seoApi";
import { managementTeam, drManujMittalSections, type Block } from "../profileData";
import { CImage, T } from "@/components/content/Editable";

const member = managementTeam[0];

export async function generateMetadata() {
  return generatePageMetadata("/about/management-team/dr-manuj-mittal", {
    title: "Dr. Manuj Mittal | Group Vice Chairman | Popular Hospital",
    description:
      "Dr. Manuj Mittal, Group Vice Chairman of Popular Group of Hospitals, Varanasi — healthcare strategist, institutional transformation leader and healthcare growth architect.",
    alternates: {
      canonical:
        "https://www.popularhospital.in/about/management-team/dr-manuj-mittal",
    },
  });
}

function BlockContent({ block }: { block: Block }) {
  switch (block.type) {
    case "para":
      return (
        <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed text-justify">
          {block.text}
        </p>
      );

    case "bullets":
      return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[14px] xl:text-[14px] text-gray-600 leading-relaxed"
            >
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E85222] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <div className="space-y-4">
          {block.items.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-gray-100 bg-slate-50/60 p-4 md:p-5"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#1e5eb2] text-white font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h4 className="font-bold text-[#0b1c43] font-heading text-[15px] md:text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-[13.5px] md:text-[14px] text-gray-600 leading-relaxed text-justify">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="rounded-2xl bg-gradient-to-r from-[#0b1c43] to-[#1e5eb2] px-5 py-4 md:px-6 md:py-5">
          <p className="text-white font-bold font-heading text-[13.5px] md:text-[15px] leading-relaxed text-center">
            {block.text}
          </p>
        </div>
      );

    case "flow":
      return (
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {block.steps.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1.5 text-[12px] md:text-[12.5px] font-semibold text-[#0b1c43]">
                {step}
              </span>
              {i < block.steps.length - 1 && (
                <span className="text-[#E85222] font-bold text-sm" aria-hidden="true">
                  &rarr;
                </span>
              )}
            </span>
          ))}
        </div>
      );

    case "pills":
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#1e5eb2]/10 border border-[#1e5eb2]/20 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#1e5eb2]"
            >
              {item}
            </span>
          ))}
        </div>
      );

    case "tags":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {block.items.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-gray-100 bg-white shadow-sm px-3.5 py-2.5 text-[13px] font-semibold text-[#0b1c43]"
            >
              {item}
            </span>
          ))}
        </div>
      );

    case "lines":
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-1.5">
          {block.items.map((item) => (
            <span
              key={item}
              className="text-[14px] md:text-[15px] font-bold text-[#0b1c43] font-heading"
            >
              {item}
            </span>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-[#E85222] bg-slate-50 rounded-r-2xl px-5 py-4 md:px-6 md:py-5">
          <p className="text-[15px] md:text-[16px] text-[#0b1c43] italic leading-relaxed font-medium">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );

    default:
      return null;
  }
}

export default function DrManujMittalPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
        <div className="absolute inset-0 z-0">
          <CImage k="about-management-team-dr-manuj-mittal_6ed91b"
            src="/images/banners/about_us_cmd_md.jpg"
            alt="Management Team Banner"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#E85222] font-bold text-xs uppercase tracking-[0.3em] mb-3 block"><T k="about-management-team-dr-manuj-mittal_e5af33" d={"Management Team"} /></span>
          <h1 className="text-3xl md:text-5xl xl:text-4xl font-black font-heading mb-4 text-white uppercase tracking-tight">
            {member.name}
          </h1>
          <div className="w-12 h-1 bg-[#E85222] mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] px-4 py-12 lg:py-20 xl:py-12">
        <Link
          href="/about/management-team"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1e5eb2] hover:text-[#E85222] transition-colors mb-8"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg><T k="about-management-team-dr-manuj-mittal_761116" d={"Back to Management Team"} /></Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Photo & Designations */}
          <div className="lg:col-span-5 mb-10 lg:mb-0">
            <div className="space-y-6 sticky top-24 w-[85%] md:w-3/4 lg:w-[90%] xl:w-[85%] mx-auto">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-slate-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 75vw, 35vw"
                  className="object-cover object-top"
                  priority
                  unoptimized
                />
              </div>
              <div className="bg-[#1e5eb2] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-blue-400/20 shadow-xl text-white">
                <h2 className="text-xl md:text-2xl xl:text-xl font-black font-heading mb-2 uppercase tracking-tight">
                  {member.name}
                </h2>
                <p className="text-yellow-400 font-bold text-xs md:text-[13px] tracking-wide uppercase mb-3 leading-snug">
                  {member.role} &ndash; {member.org}
                </p>
                <ul className="space-y-1.5 text-[10px] md:text-[10.5px] font-normal uppercase opacity-90 leading-[1.35]">
                  {member.positions.slice(1).map((position) => (
                    <li key={position}>{position}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Full Profile */}
          <div className="lg:col-span-7 relative pt-2">
            <div className="mt-2 mb-8 xl:mt-0 text-left">
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic mb-4">
                <span className="block"><T k="about-management-team-dr-manuj-mittal_0a04af" d={"Strategic Transformation"} /></span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]"><T k="about-management-team-dr-manuj-mittal_fc4ae1" d={"& Healthcare Innovation"} /></span>
              </h3>
              <p className="text-[13px] md:text-[13.5px] font-semibold text-gray-500 leading-relaxed">
                {member.tagline}
              </p>
            </div>

            <div className="space-y-10">
              {drManujMittalSections.map((section) => (
                <section key={section.heading}>
                  <h4 className="text-lg md:text-xl xl:text-lg font-black text-[#0b1c43] font-heading uppercase tracking-tight mb-1.5">
                    {section.heading}
                  </h4>
                  <div className="w-10 h-1 bg-[#E85222] rounded-full mb-5" />
                  <div className="space-y-4">
                    {section.blocks.map((block, i) => (
                      <BlockContent key={i} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
