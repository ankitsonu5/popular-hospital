"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { fetchBranches, type Branch, getImageUrl } from "@/lib/api";

export default function OurLocationsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
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

  const branches = [
    {
      name: 'Popular Hospital – Main Branch',
      slug: 'varanasi-main',
      city: 'Varanasi',
      address: 'N-10 / 60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh, India',
      image_one: '/images/branches/varanasi-main/1.webp',
    },
    {
      name: 'City Hospital – Sigra',
      slug: 'varanasi-city-centre',
      city: 'Varanasi',
      address: 'Chandrika Nagar Colony, Sigra, Varanasi, Uttar Pradesh, India',
      image_one: '/images/branches/varanasi-sigra/1.webp',
    },
    {
      name: 'Popular Hospital – Mirzapur',
      slug: 'mirzapur',
      city: 'Mirzapur',
      address: 'Near Natwan Police Chowki, Jangi Road, Mirzapur, Uttar Pradesh, India',
      image_one: '/images/branches/mirzapur/1.webp',
    },
    {
      name: 'Popular Hospital – Bachhaon',
      slug: 'bachhaon',
      city: 'Bachhaon',
      address: 'Chunar Road, Bachhaon, Varanasi, Uttar Pradesh, India',
      image_one: '/images/branches/bachhaon/1.webp',
    },
    {
      name: 'Popular Hospital – Gopiganj',
      slug: 'gopiganj',
      city: 'Gopiganj',
      address: 'G.T. Road, Parao, Near Indus Ind Bank, Gopiganj, Uttar Pradesh, India',
      image_one: '/images/branches/gopiganj/1.webp',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Header Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block">
              Discover Our Network
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1e3a8a] font-heading tracking-tight mb-6">
              Our Locations.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              Find a Popular Hospital branch near you. We are always within reach, providing world-class healthcare, expert doctors, and modern infrastructure across multiple locations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Locations Slider Section */}
      <section id="our-locations" className="py-20 overflow-hidden min-h-[calc(100vh-80px)]">
        <div className="mx-auto max-w-[1666px] px-6 sm:px-8 lg:px-12 relative">
          
          <div className="mb-12 flex items-end justify-end">
            {/* Navigation Buttons */}
            <div className="hidden sm:flex gap-4 mb-2">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full bg-[#d2d2d7] hover:bg-[#86868b] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous locations"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-[#E85222] hover:bg-[#d1451a] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next locations"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {branches.map((location, index) => (
              <div
                key={location.slug}
                className="relative flex-shrink-0 w-[85vw] sm:w-[380px] h-[480px] sm:h-[520px] rounded-[32px] overflow-hidden snap-center group transition-transform duration-500 hover:scale-[1.02] shadow-xl border border-gray-100/10"
              >
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-base font-semibold tracking-wide uppercase text-[#00B4D8] drop-shadow-sm">
                      {location.city}
                    </span>
                    <h3 className="mt-2 text-3xl font-bold leading-tight font-heading text-white drop-shadow-md">
                      {location.name}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-white/80 drop-shadow-sm">
                      {location.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/locations/${location.slug}`}
                      className="px-6 py-3 rounded-full font-medium transition-colors bg-white text-black hover:bg-gray-100"
                    >
                      Get Directions
                    </Link>
                  </div>
                </div>

                {/* Background Image with Focused Gradient Overlay */}
                <div className="absolute inset-0 z-10 transition-opacity duration-500">
                  {/* Overall light tint to reduce harshness */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* Subtle top-down gradient for text protection */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
                  
                  {/* Subtle bottom-up gradient for button protection */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <Image
                  src={location.image_one || '/about-section-image.png'}
                  alt={location.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 85vw, (max-width: 1280px) 380px, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
