import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Latest News & Updates - Popular Hospital",
  description:
    "Stay updated with the latest news, health articles, medical breakthroughs, and updates from Popular Hospital. Read expert health tips and hospital announcements.",
};

import { fetchNews, getImageUrl } from "@/lib/api";

/* ───────────────── page component ───────────────── */
export default async function NewsPage() {
  const newsArticles = await fetchNews();

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-8 sm:py-10 lg:py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/news-sm-inner.jpg"
            alt="Latest News"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/90 via-[#0b1c43]/40 to-transparent z-10" />
        </div>

        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <nav
            className="mb-4 text-xs sm:text-sm text-white/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Latest News & Updates</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Latest News <span className="text-[#00B4D8]">& Updates</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Stay informed with the latest health news, articles, expert tips,
            and announcements from Popular Hospital.
          </p>
        </div>
      </section>

      {/* ─── News Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                <Image
                  src={getImageUrl(article.image) || "/about-section-image.png"}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge removed */}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-gray-400 font-medium">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1e3a8a] transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/media/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-[#E85222] font-semibold hover:text-[#d1451a] transition-colors text-sm group/link"
                >
                  <span>Read More</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
