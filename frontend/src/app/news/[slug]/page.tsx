import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";


import { fetchNews, fetchNewsItem } from "@/lib/api";


/* ───────────────── static params ───────────────── */
export async function generateStaticParams() {
  const newsList = await fetchNews().catch(() => []);
  return newsList.map((a) => ({ slug: a.slug }));
}

/* ───────────────── metadata ───────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchNewsItem(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} - Popular Hospital News`,
    description: article.excerpt,
  };
}


/* ───────────────── page component ───────────────── */
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchNewsItem(slug);
  if (!article) notFound();

  // Get related articles (other articles excluding current)
  const allNews = await fetchNews().catch(() => []);
  const relatedArticles = allNews
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);


  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle Background Image */}
        <Image
          src={article.image ? (article.image.startsWith('/uploads') ? `http://localhost:5100${article.image}` : article.image) : "/about-section-image.png"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-[#0b1c43]/70" />
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav
            className="mb-6 text-sm text-white/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/media/news"
              className="hover:text-white transition-colors"
            >
              News
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">
              {article.title}
            </span>
          </nav>

          {/* Date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <svg
                className="w-4 h-4"
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
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">

        {/* Article Body */}
        <article className="max-w-none">
          <div className="relative text-gray-700 text-base sm:text-lg leading-relaxed">
            {/* Featured Image Floated Left */}
            <div className="float-left w-full sm:w-[500px] mr-10 mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
              <div className="relative h-[300px] sm:h-[400px]">
                <Image
                  src={article.image ? (article.image.startsWith('/uploads') ? `http://localhost:5100${article.image}` : article.image) : "/about-section-image.png"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Content Text - Naturally wraps around the floated image */}
            {(article.content || []).map((paragraph, index) => (
              <p
                key={index}
                className="mb-8 text-gray-700 font-normal leading-[1.8] text-justify hyphens-auto"
              >
                {paragraph}
              </p>
            ))}

            {/* Clear the float */}
            <div className="clear-both" />
          </div>
        </article>



        {/* ─── Share & Actions Strip ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {article.author && (
              <>
                <span className="text-sm font-medium text-gray-500">Source:</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                  {article.author}
                </span>
              </>
            )}
          </div>
          <Link
            href="/media/news"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e3a8a] text-white text-sm font-semibold hover:bg-[#15307a] transition-colors shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All News
          </Link>
        </div>
      </section>

      {/* ─── Related Articles ─── */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/news/${related.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={related.image ? (related.image.startsWith('/uploads') ? `http://localhost:5100${related.image}` : related.image) : "/about-section-image.png"}
                    alt={related.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Badge removed */}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-2">
                    {related.date}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[#E85222] font-semibold text-sm">
                    Read More
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
