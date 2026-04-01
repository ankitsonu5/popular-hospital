"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [areVideosVisible, setAreVideosVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Intersection Observer for Lazy Loading Video Thumbnails
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreVideosVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="py-16 sm:py-24 bg-white relative overflow-hidden group/testimonials"
        aria-labelledby="patients-speak"
      >
        {/* Background Decorative Patterns */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
          {/* Top-Left Horizontal Pattern */}
          <div
            className="absolute -top-10 -left-10 w-[600px] h-[400px] opacity-[0.4] transition-transform duration-1000 group-hover/testimonials:scale-105"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 Z' fill='none' stroke='%23bae6fd' stroke-width='1.5'/%3E%3Ccircle cx='50' cy='0' r='3' fill='%237dd3fc'/%3E%3Ccircle cx='150' cy='0' r='3' fill='%237dd3fc'/%3E%3Ccircle cx='0' cy='86.6' r='3' fill='%237dd3fc'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 104px",
            }}
          />
          {/* Right-Side Vertical Pattern (Aligned to the right edge) */}
          <div
            className="absolute top-1/4 -right-12 w-[300px] h-[600px] opacity-[0.5] transition-transform duration-1000 group-hover/testimonials:translate-y-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 Z' fill='none' stroke='%23bae6fd' stroke-width='1.5'/%3E%3Cpath d='M100 0 L100 173.2' stroke='%23e0f2fe' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 86.6px",
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1766px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1c43] font-heading tracking-tight mb-16 inline-flex items-center gap-4">
            Patients <span className="text-[#1e3a8a]">Speak</span>
            <div className="w-12 h-1 bg-[#E85222] rounded-full mt-2" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 h-auto lg:h-[600px] items-stretch">
            {/* Column 1: Far Left (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-one.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5] bg-gray-900"
                aria-label="Play patient testimonial video 1"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/testimonial-one.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-4 h-4 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
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
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/testimonial-two.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() =>
                  setSelectedVideo(
                    "/videos/popular_hospital_happy_pateint_one.mp4",
                  )
                }
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 3"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/popular_hospital_happy_pateint_one.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 3: Center (Tall Featured Card) */}
            <div className="h-[400px] lg:h-full">
              <button
                onClick={() =>
                  setSelectedVideo(
                    "/videos/popular_hospital_happy_pateint_three.mp4",
                  )
                }
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-full bg-[#0b1c43]"
                aria-label="Play featured patient testimonial video"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/popular_hospital_happy_pateint_three.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] group-hover:border-[#E85222] transition-all duration-300 shadow-2xl relative z-10">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 4: Inner Right (Two Stacked Cards) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={() =>
                  setSelectedVideo(
                    "/videos/popular_hospital_happy_pateint_four.mp4",
                  )
                }
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 4"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/popular_hospital_happy_pateint_four.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() =>
                  setSelectedVideo(
                    "/videos/popular_hospital_happy_pateint_five.mp4",
                  )
                }
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2 bg-gray-800"
                aria-label="Play patient testimonial video 5"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/popular_hospital_happy_pateint_five.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-100 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-5 h-5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* Column 5: Far Right (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() =>
                  setSelectedVideo(
                    "/videos/popular_hospital_happy_pateint_two.mp4",
                  )
                }
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5] bg-gray-900"
                aria-label="Play patient testimonial video 6"
              >
                {areVideosVisible && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  >
                    <source
                      src="/videos/popular_hospital_happy_pateint_two.mp4#t=0.1"
                      type="video/mp4"
                    />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all">
                    <svg
                      className="w-4 h-4 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
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
