import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seoApi";
import { managementTeam } from "./profileData";

export async function generateMetadata() {
  return generatePageMetadata("/about/management-team", {
    title: "Management Team | Popular Hospital",
    description:
      "Meet the management team driving strategic transformation, operational excellence and growth at Popular Group of Hospitals, Varanasi.",
    alternates: {
      canonical: "https://www.popularhospital.in/about/management-team",
    },
  });
}

export default function ManagementTeamPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/about_us_cmd_md.jpg"
            alt="Management Team Banner"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#E85222] font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
            Leadership &amp; Growth
          </span>
          <h1 className="text-3xl md:text-5xl xl:text-4xl font-black font-heading mb-4 text-white uppercase tracking-tight">
            Management Team
          </h1>
          <div className="w-12 h-1 bg-[#E85222] mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] px-4 py-16 lg:py-24 xl:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-[#0b1c43] mb-4 font-heading xl:text-2xl 2xl:text-4xl">
            Leading with Strategy
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg xl:text-[15px] 2xl:text-xl">
            Our management team brings together healthcare strategy, operational
            discipline and technology leadership to build institutions that serve
            patients better, for generations.
          </p>
        </div>

        {/* Profile Thumbnails */}
        <div className="flex flex-wrap justify-center gap-8">
          {managementTeam.map((member) => (
            <Link
              key={member.slug}
              href={`/about/management-team/${member.slug}`}
              className="group w-full sm:w-[320px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E85222]/30 transition-all duration-300 flex flex-col p-4 pb-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85222]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  unoptimized
                />
              </div>
              <div className="py-5 text-center flex-1 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight xl:text-lg 2xl:text-2xl">
                  {member.name}
                </h3>
                <p className="text-[#E85222] font-semibold text-xs uppercase tracking-wide mb-1">
                  {member.role}
                </p>
                <p className="text-gray-500 text-[11px] uppercase tracking-wide mb-4">
                  {member.org}
                </p>
                <span className="inline-flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#1e5eb2] group-hover:text-[#E85222] transition-colors">
                  View Full Profile
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
