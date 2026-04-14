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
    <section id="our-locations" className="py-24 bg-[#f5f5f7] overflow-hidden">
      <div className="mx-auto max-w-[1440px] min-[1920px]:max-w-[1366px] px-6 sm:px-8 lg:px-12 relative">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-4xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl font-bold text-[#1e3a8a] tracking-tight font-heading leading-tight">
              Our Branches.{" "}
              <span className="text-[#6e6e73]">Always within reach.</span>
            </h2>
            <p className="sm:hidden mt-4 text-gray-500 font-medium text-sm tracking-wide bg-gray-100/50 inline-block px-3 py-1 rounded-full">
              Swipe right to see more locations
            </p>
          </div>

          <div className="hidden sm:flex gap-4 mb-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-[#d2d2d7] hover:bg-[#86868b] text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous locations"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#E85222] hover:bg-[#d1451a] text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next locations"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {branches.map((location) => (
            <div
              key={location.slug}
              className="relative flex-shrink-0 w-[85vw] sm:w-[380px] xl:w-[320px] h-[480px] sm:h-[520px] xl:h-[460px] rounded-[32px] overflow-hidden snap-center group transition-transform duration-500 hover:scale-[1.02] shadow-xl border border-gray-100/10"
            >
              <div className="absolute inset-0 z-20 p-8 xl:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-base xl:text-sm font-semibold tracking-wide uppercase text-[#00B4D8] drop-shadow-sm">
                    {location.city}
                  </span>
                  <h3 className="mt-2 text-3xl xl:text-2xl font-bold leading-tight font-heading text-white drop-shadow-md">
                    {location.name}
                  </h3>
                  <p className="mt-3 text-lg xl:text-base leading-relaxed text-white/80 drop-shadow-sm">
                    {location.address}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/locations/${location.slug || ""}`}
                    className="px-6 py-3 rounded-full font-medium transition-colors bg-white text-black hover:bg-gray-100"
                  >
                    Get Directions
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 z-10 transition-opacity duration-500">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <Image
                src={
                  getImageUrl(location.image_one || "") ||
                  "/about-section-image.png"
                }
                alt={location.name || "Branch"}
                fill
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 85vw, (max-width: 1280px) 380px, 400px"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
