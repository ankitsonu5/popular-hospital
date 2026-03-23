"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isFrontVideoVisible, setIsFrontVideoVisible] = useState(false);
  const frontVideoRef = useRef<HTMLDivElement>(null);

  // Added useEffect for ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  // Intersection Observer for Lazy Loading Front Video Thumbnail
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFrontVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    if (frontVideoRef.current) observer.observe(frontVideoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        className="py-16 sm:py-20 bg-white"
        aria-labelledby="patients-speak"
      >
        <div className="mx-auto w-full max-w-[1666px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 font-heading">
            Patients Speak
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 h-auto lg:h-[600px] items-stretch">
            {/* Column 1: Far Left (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-one.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5] bg-gray-900"
                aria-label="Play patient testimonial video 1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 2: Inner Left (Two Stacked Cards) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-two.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 2"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedVideo("/videos/popular_hospital_happy_pateint_one.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 3"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 3: Center (Tall Featured Card) */}
            <div className="h-[400px] lg:h-full" ref={frontVideoRef}>
              <button
                onClick={() => setSelectedVideo("/videos/popular_hospital_happy_pateint_three.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-full bg-[#0b1c43]"
                aria-label="Play featured patient testimonial video"
              >
                {isFrontVideoVisible && (
                  <video 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source src="/videos/popular_hospital_happy_pateint_three.mp4#t=0.1" type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] group-hover:border-[#E85222] transition-all duration-300 shadow-2xl relative z-10">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 4: Inner Right (Two Stacked Cards) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={() => setSelectedVideo("/videos/popular_hospital_happy_pateint_four.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 4"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedVideo("/videos/popular_hospital_happy_pateint_five.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-100 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 5: Far Right (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSelectedVideo("/videos/popular_hospital_happy_pateint_two.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5] bg-gray-900"
                aria-label="Play patient testimonial video 6"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-[#E85222] font-semibold text-xl hover:gap-3 transition-all"
            >
              View All Patient Stories
              <span className="w-8 h-8 rounded-full bg-[#E85222] text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <video
                  src={selectedVideo}
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                ></video>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
