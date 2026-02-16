import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Media Coverage – Popular Hospital",
  description:
    "Explore media coverage of Popular Hospital featuring newspaper articles, press releases, and media mentions highlighting our achievements, events, and milestones.",
};

/* ───────────────── media coverage data ───────────────── */
export const mediaCoverageItems = [
  {
    slug: "dr-akshat-ini-cet-2025",
    title:
      "Hearty congratulations to Dr. Akshat Kaushik for his outstanding 8th All India Rank in INI-CET 2025",
    excerpt:
      "Dr. Akshat Kaushik, son of Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, has secured an outstanding 8th All India Rank in INI-CET 2025. This remarkable achievement is a proud moment for the entire Popular Hospital family.",
    image: "/about-section-image.png",
    date: "January 15, 2025",
    source: "Dainik Jagran",
  },
  {
    slug: "dr-akshat-good-rank-cet",
    title:
      "Congratulations to Dr. Akshat for securing a good rank in CET",
    excerpt:
      "Dr. Akshat Kaushik has once again made the Popular Hospital family proud by securing an excellent rank in the CET examination. His dedication to academic excellence continues to inspire young medical professionals across the region.",
    image: "/about-section-image.png",
    date: "December 20, 2024",
    source: "Amar Ujala",
  },
  {
    slug: "ivf-news-amar-ujala",
    title: "IVF News In Amar Ujala",
    excerpt:
      "Popular Hospital's IVF department has been featured in Amar Ujala for its cutting-edge fertility treatments and successful outcomes. The hospital has helped numerous couples achieve their dream of parenthood through advanced assisted reproductive technologies.",
    image: "/about-section-image.png",
    date: "November 10, 2024",
    source: "Amar Ujala",
  },
  {
    slug: "dengue-ward-inauguration",
    title: "Popular Hospital inaugurated dengue ward",
    excerpt:
      "In response to the growing dengue cases in the region, Popular Hospital has inaugurated a dedicated dengue ward equipped with specialized monitoring equipment, trained staff, and comprehensive treatment protocols to provide the best care for dengue patients.",
    image: "/about-section-image.png",
    date: "September 4, 2024",
    source: "Amar Ujala",
  },
  {
    slug: "dr-kaushik-felicitated-by-cm",
    title:
      "Dr. A.K. Kaushik, Chairman Popular Group of Hospitals was felicitated by Chief Minister Sh. Yogi Adityanath ji",
    excerpt:
      "Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, was honored and felicitated by the Chief Minister of Uttar Pradesh, Sh. Yogi Adityanath ji, for his outstanding contribution to healthcare services in the region. This recognition highlights the hospital's commitment to quality healthcare.",
    image: "/about-section-image.png",
    date: "August 15, 2024",
    source: "Hindustan",
  },
  {
    slug: "orthopaedics-milestone-press-conference",
    title:
      "Press conference on 29 April 2023 about New Milestone in Orthopaedics Department of Popular Hospital",
    excerpt:
      "Popular Hospital held a press conference to announce a new milestone achieved by the Orthopaedics Department. The department has successfully performed advanced joint replacement surgeries and complex trauma procedures using the latest techniques and technology.",
    image: "/about-section-image.png",
    date: "April 29, 2023",
    source: "Press Conference",
  },
  {
    slug: "successful-knee-transplant",
    title:
      "Successful B/L Knee Transplant of A Couple At Popular Hospital",
    excerpt:
      "In a remarkable medical achievement, Popular Hospital successfully performed bilateral knee transplant surgery on a couple simultaneously. The procedure was carried out by a team of expert orthopedic surgeons, and both patients have recovered well and are now leading active lives.",
    image: "/about-section-image.png",
    date: "March 12, 2023",
    source: "Dainik Jagran",
  },
  {
    slug: "safe-motherhood-day",
    title: "Safe Motherhood Day Celebrations at Popular Hospital Varanasi",
    excerpt:
      "Popular Hospital Varanasi celebrated Safe Motherhood Day with a series of awareness programs, free health checkups for expecting mothers, and educational sessions on maternal health. The event was attended by hundreds of women from the community.",
    image: "/about-section-image.png",
    date: "February 14, 2023",
    source: "Amar Ujala",
  },
];

/* ───────────────── page component ───────────────── */
export default function MediaCoveragePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle Background Image */}
        <Image
          src="/about-section-image.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[#0b1c43]/75" />
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <nav className="mb-6 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Media Coverage</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Media{" "}
            <span className="text-[#00B4D8]">Coverage</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
            Explore our presence in newspapers, media, and press — highlighting milestones, achievements, and healthcare excellence at Popular Hospital.
          </p>
        </div>
      </section>

      {/* ─── Coverage Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {mediaCoverageItems.map((item) => (
            <Link
              key={item.slug}
              href={`/media/coverage/${item.slug}`}
              className="group relative h-full"
            >
              {/* Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-[#1e3a8a]/10 hover:border-[#1e3a8a]/40 h-full flex flex-col">
                {/* Newspaper Clipping Image */}
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#1e3a8a]/0 group-hover:bg-[#1e3a8a]/10 transition-colors duration-300" />
                </div>

                {/* Caption */}
                <div className="p-4 border-l-4 border-[#1e3a8a] flex-1 flex flex-col">
                  {/* Source + Date Row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1e3a8a]/10 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-wider">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {item.source}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-sm font-bold text-[#1e3a8a] leading-snug group-hover:text-[#E85222] transition-colors line-clamp-3 flex-1">
                    {item.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
