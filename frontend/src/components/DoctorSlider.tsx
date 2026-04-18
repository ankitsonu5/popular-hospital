"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Doctor {
  name: string;
  qualifications?: string;
  qualification?: string;
  designation?: string | { _id: string; name: string };
  slug: string;
  image?: string;
  image_url?: string;
}

export default function DoctorSlider({
  doctors,
  departmentName,
}: {
  doctors: Doctor[];
  departmentName: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (doctors.length <= 1 || !isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === doctors.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [doctors.length, isAutoPlaying]);

  const handleManualSlide = (index: number | ((prev: number) => number)) => {
    setIsAutoPlaying(false);
    if (typeof index === "function") {
      setCurrentSlide(index);
    } else {
      setCurrentSlide(index);
    }
  };

  if (!doctors || doctors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border border-gray-100 p-12 text-center max-w-sm mx-auto">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <p className="text-gray-500 font-bold text-lg">
          Information Not Available
        </p>
        <p className="text-gray-400 text-sm mt-1">
          We are currently updating our doctor profiles for this department.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pt-6">
      {/* Floating Appointment Button */}
      <Link
        href="/doctors"
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
      >
        SCHEDULE AN APPOINTMENT
      </Link>

      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
        <div className="w-full relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {doctors.map((doc, idx) => (
              <div
                key={idx}
                className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center"
              >
                <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                  {doc.image || doc.image_url ? (
                    <Image
                      src={doc.image || doc.image_url || ""}
                      alt={doc.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                      <svg
                        className="w-24 h-24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                  >
                    <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-all uppercase text-sm">
                      View Full Profile
                    </span>
                  </Link>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#3b82f6] mb-1 font-heading">
                    {doc.name}
                  </h3>
                  <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">
                    {doc.qualifications || doc.qualification}
                  </p>
                  <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-[0.2em] font-black">
                    DEPARTMENT OF {departmentName.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Only if > 1) */}
        {doctors.length > 1 && (
          <>
            <button
              onClick={() =>
                handleManualSlide((prev) =>
                  prev === 0 ? doctors.length - 1 : prev - 1,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
              aria-label="Previous doctor"
            >
              <svg
                className="w-6 h-6"
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
            <button
              onClick={() =>
                handleManualSlide((prev) =>
                  prev === doctors.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
              aria-label="Next doctor"
            >
              <svg
                className="w-6 h-6"
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

            {/* Pagination Dots */}
            <div className="flex gap-3 mb-8">
              {doctors.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 border ${
                    currentSlide === idx
                      ? "bg-[#3b82f6] border-[#3b82f6] scale-125"
                      : "bg-transparent border-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
        <div className="h-4" />
      </div>
    </div>
  );
}
