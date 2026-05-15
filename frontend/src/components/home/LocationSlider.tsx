"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { getImageUrl, type Branch } from "@/lib/api";

export default function LocationSlider({ branches }: { branches: Branch[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approximate card width + gap
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="our-locations" className="bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1440px] min-[1920px]:max-w-[1366px] px-4 sm:px-6 lg:px-12">
        <div className="mb-8 text-center">
          <h2 className="font-jakarta text-3xl font-black leading-tight tracking-normal text-[#1e3a8a] sm:text-4xl lg:text-5xl">
            Our Branches.{" "}
            <span className="text-[#6e6e73]">Always within reach.</span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-white px-5 py-6 sm:px-7 lg:min-h-[320px] lg:px-9 lg:py-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-full rounded-lg bg-gradient-to-r from-[#203f7d] via-[#284a91] to-[#284a91] lg:w-[43%]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[300px_1fr] xl:grid-cols-[330px_1fr]">
            <div className="flex flex-col justify-center text-white">
              <h3 className="font-jakarta text-2xl font-black leading-tight sm:text-3xl">
                Our Hospital Network
              </h3>
              <p className="mt-4 max-w-[310px] text-sm font-semibold leading-6 text-white/88 sm:text-base">
                Popular Hospital brings trusted healthcare closer with connected
                branches for OPD, diagnostics, emergency support, and specialist
                care.
              </p>
              <Link
                href="/our-locations"
                className="group mt-6 inline-flex h-14 w-full max-w-[290px] items-center justify-between overflow-hidden rounded bg-[#E85222] pl-6 font-jakarta text-sm font-black text-white shadow-[0_10px_24px_rgba(232,82,34,0.28)] transition hover:bg-[#d8471e] sm:text-base"
              >
                Find Hospital Near You
                <span className="ml-4 flex h-full w-[52px] shrink-0 items-center justify-center bg-[#f05a28] text-white transition group-hover:bg-[#E85222]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="relative min-w-0">
              <div className="mb-4 hidden justify-end gap-4 pr-2 sm:flex">
                <button
                  onClick={() => scroll("left")}
                  className="text-[#E85222] transition hover:text-[#c9441c]"
                  aria-label="Previous locations"
                >
                  <svg
                    className="h-9 w-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6-6-6 6 6 6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="text-[#E85222] transition hover:text-[#c9441c]"
                  aria-label="Next locations"
                >
                  <svg
                    className="h-9 w-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </button>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth lg:-mr-12"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {branches.map((location) => (
                  <article
                    key={location.slug}
                    className="flex h-[276px] w-[76vw] max-w-[250px] flex-shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] snap-center sm:w-[250px]"
                  >
                    <div className="relative h-[145px] overflow-hidden bg-slate-100">
                      <Image
                        src={
                          getImageUrl(location.image_one || "") ||
                          "/about-section-image.png"
                        }
                        alt={location.name || "Branch"}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="250px"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-3.5 py-3">
                      <h3 className="font-jakarta text-[15px] font-black leading-snug text-[#4a4a4a] line-clamp-2">
                        {location.name}
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500 line-clamp-1">
                        {location.city || location.address}
                      </p>

                      <Link
                        href={`/locations/${location.slug || ""}`}
                        className="mt-auto inline-flex h-9 items-center justify-center rounded bg-[#0b467d] px-3 font-jakarta text-xs font-black text-white transition hover:bg-[#083c72]"
                      >
                        Get Direction
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-4 text-center text-xs font-bold text-white/70 sm:hidden">
                Swipe right to see more locations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
