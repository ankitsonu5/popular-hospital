"use client";

/**
 * Segment-level error boundary for /doctors/[slug]
 *
 * This catches any unhandled error thrown inside the doctor detail page
 * (e.g. bad API response, unexpected null field from the production DB).
 * It shows a friendly message with retry & navigation options instead of
 * the global "Oops!" error that swallows all context.
 */
import { useEffect } from "react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DoctorPageError({ error, reset }: Props) {
  useEffect(() => {
    // Log to console so server logs / monitoring tools can capture it
    console.error("[DoctorPage error]", error.message, error.digest);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      {/* ── Banner strip ── */}
      <div
        className="w-full py-10 mb-10"
        style={{
          background:
            "linear-gradient(135deg, #1a4a6b 0%, #2d7a9a 60%, #3aaccc 100%)",
        }}
      >
        <h1 className="text-3xl font-bold text-white">Doctor Profile</h1>
      </div>

      <div className="max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[#3b82f6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#0b1c43] mb-2">
          Doctor profile could not be loaded
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          There was a problem fetching this doctor&apos;s details. Please try
          again or search for another doctor.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#3b82f6] hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/doctors"
            className="border border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors"
          >
            Find Another Doctor
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
