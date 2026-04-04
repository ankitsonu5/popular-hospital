import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchCoverage } from "@/lib/api";
import MediaCoverageClient from "./MediaCoverageClient";

export const metadata: Metadata = {
  title: "Media Coverage – Popular Hospital",
  description:
    "Explore media coverage of Popular Hospital featuring newspaper articles, press releases, and media mentions highlighting our achievements, events, and milestones.",
};

/* ───────────────── page component ───────────────── */
export default async function MediaCoveragePage() {
  const mediaCoverageItems = await fetchCoverage();

  // Convert API data to match ComponentCoverageItem if needed, although they match mostly
  const formattedItems = mediaCoverageItems.map(item => ({
    slug: item.slug || "",
    title: item.title,
    image: item.image,
    date: item.date,
    source: item.source,
  }));

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
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
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
            Media <span className="text-[#00B4D8]">Coverage</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
            Explore our presence in newspapers, media, and press — highlighting
            milestones, achievements, and healthcare excellence at Popular
            Hospital.
          </p>
        </div>
      </section>

      {/* ─── Coverage Grid (Client with Lightbox) ─── */}
      <MediaCoverageClient items={formattedItems} />
    </main>
  );
}
