import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchCoverage, fetchCoverageItem, getImageUrl } from "@/lib/api";

/* ───────────────── metadata ───────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchCoverageItem(slug);
  if (!item) return { title: "Coverage Not Found" };
  return {
    title: `${item.title} – Media Coverage | Popular Hospital`,
    description: typeof item.content === 'string' ? item.content.substring(0, 160) : 'Media coverage story from Popular Hospital.',
  };
}

/* ───────────────── page component ───────────────── */
export default async function MediaCoverageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await fetchCoverageItem(slug);
  if (!item) notFound();

  // Get related coverage items
  const allCoverage = await fetchCoverage();
  const relatedItems = allCoverage
    .filter((c) => c.slug !== item.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-16 overflow-hidden">
        {/* Subtle Background Image Style matching other media pages */}
        <div className="absolute inset-0">
          <Image
            src="/images/news-sm-inner.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/90 via-[#0b1c43]/40 to-transparent z-10" />
        </div>
        
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 text-center sm:text-left">
          {/* Breadcrumb */}
          <nav className="mb-4 text-[10px] sm:text-xs text-white/60 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/media/coverage"
              className="hover:text-white transition-colors"
            >
              Media Coverage
            </Link>
          </nav>

          {/* Source + Date Row matching News/Blog style */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#00B4D8] text-white text-[10px] font-bold uppercase tracking-wider">
              {item.source}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-xs text-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.date}
            </span>
          </div>

          {/* Title - Compact size */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto sm:mx-0">
            {item.title}
          </h1>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <article className="">
          {/* Rich Text Body */}
          <div className="prose prose-teal prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
            <div dangerouslySetInnerHTML={{ 
              __html: Array.isArray(item.content) ? item.content.join('') : (item.content || '') 
            }} />
          </div>

          {/* ─── Image Gallery ─── */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="not-prose mt-12">
              <h3 className="text-lg font-bold text-[#1e3a8a] mb-6 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-8 h-[2px] bg-[#00B4D8]"></span>
                Gallery Images
              </h3>
              <div
                className={`grid gap-4 ${
                  item.gallery.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {item.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg group border border-gray-100"
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`${item.title} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ─── Actions Strip ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Source:</span>
            <span className="px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-bold">
              {item.source}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {item.date}
            </span>
          </div>
          <Link
            href="/media/coverage"
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
            Back to Media Coverage
          </Link>
        </div>
      </section>

      {/* ─── More Coverage ─── */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-8">
            More Media Coverage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {relatedItems.map((related) => (
              <Link
                key={related.slug}
                href={`/media/coverage/${related.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={getImageUrl(related.image)}
                    alt={related.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/90 text-[#1e3a8a] text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {related.source}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] text-gray-400 font-medium mb-1.5">
                    {related.date}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2 flex-1">
                    {related.title}
                  </h3>
                  <span className="mt-2 pt-2 border-t border-gray-50 inline-flex items-center gap-1 text-[#E85222] font-semibold text-[11px] justify-center sm:justify-start">
                    View Details
                    <svg
                      className="w-3 h-3 transition-transform group-hover:translate-x-1"
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
