"use client";

import { useState } from "react";
import Image from "next/image";

interface DoctorImageProps {
  src: string;
  alt: string;
}

/**
 * Client component for doctor profile images.
 * - Uses `unoptimized` for /uploads/ paths to prevent Next.js image
 *   optimization from fetching backend images server-side (avoids
 *   "received null" terminal warnings when image file is missing).
 * - Falls back to an SVG placeholder on load error (broken image, 404, etc.)
 */
export default function DoctorImage({ src, alt }: DoctorImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-blue-50">
        <svg
          className="w-32 h-32 text-blue-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover object-top"
      // Skip Next.js image optimization for backend /uploads/ images.
      // Optimization pipeline fetches the image server-side; if the file
      // doesn't exist on the backend it logs "received null" in the terminal.
      unoptimized={src.startsWith("/uploads") || src.startsWith("http")}
      onError={() => setHasError(true)}
    />
  );
}
