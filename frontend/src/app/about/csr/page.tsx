"use client";

import Image from "next/image";
import Link from "next/link";

const outreachPrograms = [
  {
    title: "Free Medical Camps",
    desc: "Every year, we organize free medical camps in underserved areas to provide access to essential healthcare services, including consultations, diagnostics, and preventive treatments. These camps offer a lifeline to those who may otherwise not have access to quality healthcare.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Health Education & Awareness",
    desc: "We partner with local schools, NGOs, and communities to educate people on various health topics, including hygiene, nutrition, mental health, and the importance of early disease detection. We aim to reduce health risks and empower individuals.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Support for Vulnerable Groups",
    desc: "Dedicated to supporting the elderly, children, and low-income families with specialized health services and resources. Our hospital provides free treatment and medication for those who cannot afford care, ensuring everyone has an opportunity for a healthy life.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Blood Donation Drives",
    desc: "Regular blood donation drives are held at the hospital, encouraging individuals to donate blood and save lives. We are proud to support national blood banks and ensure that there is a constant supply of life-saving blood for those in need.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Environmental Initiatives",
    desc: "Our hospital follows eco-friendly practices, such as waste management, water conservation, and the use of renewable energy sources to minimize our environmental footprint and promote sustainability for a better future.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
  },
];

const stats = [
  { label: "Individuals Served", value: "5,000+", icon: "👤" },
  { label: "Children Educated", value: "10,000+", icon: "🎓" },
  { label: "Free Surgeries", value: "500+", icon: "🏥" },
  { label: "Waste Recycled", value: "100+ Tons", icon: "♻️" },
];

export default function CSRPage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[180px] md:min-h-[220px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="CSR Banner"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <div className="animate-fade-in-up max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-3xl font-bold text-white mb-6 leading-tight font-heading">
              Social <br />
              <span className="text-blue-400">Responsibility</span>
            </h1>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
