"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import BlogSidebar, { BlogSearchWidget } from "./BlogSidebar";
import { allCategories } from "./data";

interface NewsItem {
  id?: number;
  _id?: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
  author?: string;
  category?: string;
}

interface CategoryMetric {
  _id: string;
  count: number;
  latestTitle: string;
}

export default function BlogClientLayout({
  articles,
  metrics = [],
}: {
  articles: NewsItem[];
  metrics?: CategoryMetric[];
}) {
  // Left Side Pagination (6 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const maxPages = Math.ceil((articles?.length || 0) / itemsPerPage);
  const displayedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Sliding window pagination logic (always show up to 5 pages if possible)
  // Calculate pagination sliding window. Always display at least 5 elements (e.g. 1 to 5)
  // If the total number of maxPages is small, we still render 5 blocks.
  // Any page num > maxPages is rendered in a visually disabled/empty state.
  const maxVisiblePages = 5;
  let startPad = currentPage - Math.floor(maxVisiblePages / 2);

  if (startPad < 1) {
    startPad = 1;
  } else if (
    startPad + maxVisiblePages - 1 >
    Math.max(maxPages, maxVisiblePages)
  ) {
    startPad = Math.max(
      1,
      Math.max(maxPages, maxVisiblePages) - maxVisiblePages + 1,
    );
  }

  const paginationPages = Array.from(
    { length: maxVisiblePages },
    (_, i) => startPad + i,
  );

  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((c) => c - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#f0f7ff] min-h-screen">
      {/* ─── Compact Hero Section (Matching News Page style) ─── */}
      <section className="relative bg-[#0b1c43] py-8 sm:py-10 lg:py-12 overflow-hidden mb-10">
        {/* Background Image - Matching News Page */}
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

        <div className="relative z-20 mx-auto max-w-[1366px] px-6 lg:px-12">
          <nav
            className="mb-4 text-xs sm:text-sm text-white/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Popular Hospital <span className="text-[#00B4D8]">Health Blog</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Insightful articles, health maintenance tips, and latest medical
            breakthroughs delivered by our expert medical team.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1366px] px-6 lg:px-12 pb-20">
        {/* Mobile Search Widget - Only shown on mobile at the top */}
        <div className="lg:hidden w-full mb-8">
          <BlogSearchWidget />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="w-full lg:w-[70%] space-y-12">
            {displayedArticles.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row group border border-slate-100"
              >
                {/* Image Container */}
                <div className="md:w-[48%] relative aspect-[3/2] overflow-hidden shrink-0">
                  <Image
                    src={getImageUrl(post.image) || "/about-section-image.png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={articles.indexOf(post) < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a3a5c]/40 to-transparent z-10 opacity-60"></div>
                  {post.category && (
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
                      <span className="bg-[#E85222] text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="md:w-[52%] p-6 md:p-8 flex flex-col justify-center">
                  <div>
                    <div className="flex items-center gap-4 text-gray-400 text-xs md:text-sm mb-3 font-medium flex-wrap">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <svg
                          className="w-4 h-4 text-[#E85222]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <svg
                          className="w-4 h-4 text-[#E85222]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {post.author || "Hospital Admin"}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-[#1a3a5c] mb-3 leading-tight group-hover:text-[#E85222] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div
                      className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(post.excerpt)
                          ? post.excerpt.join(" ")
                          : post.excerpt || "",
                      }}
                    />
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#E85222] font-black uppercase tracking-widest text-xs md:text-sm group/btn mt-auto"
                  >
                    Read Full Story
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}

            {articles.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-slate-100">
                <p className="text-gray-500 font-medium text-lg">
                  No blog articles available at the moment.
                </p>
              </div>
            )}

            {/* Pagination Component */}
            <div className="flex items-center justify-center gap-3 pt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${currentPage === 1 ? "bg-white border-slate-200 text-gray-300 cursor-not-allowed" : "bg-white border-slate-200 text-[#1a3a5c] hover:bg-[#E85222] hover:text-white"}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {paginationPages.map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (num <= maxPages) {
                      setCurrentPage(num);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  disabled={num > maxPages}
                  className={`min-w-12 h-12 px-2 rounded-2xl font-black transition-all flex items-center justify-center 
                      ${
                        num === currentPage
                          ? "bg-[#1a3a5c] text-white shadow-lg"
                          : num > maxPages
                            ? "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed hidden sm:flex"
                            : "bg-white text-[#1a3a5c] border border-slate-200 hover:border-[#1a3a5c]"
                      }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === maxPages}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${currentPage === maxPages ? "bg-white border-slate-200 text-gray-300 cursor-not-allowed" : "bg-white border-slate-200 text-[#1a3a5c] hover:bg-[#E85222] hover:text-white"}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <BlogSidebar
            allArticles={articles}
            allCategories={allCategories}
            metrics={metrics}
          />
        </div>
      </div>
    </div>
  );
}
