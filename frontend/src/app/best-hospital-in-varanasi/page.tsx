import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  HOSPITALS_LIST,
} from "@/data/varanasiHospitalsData";
import HospitalComparisonTable from "@/components/hospital-guide/HospitalComparisonTable";
import {
  Phone,
  Calendar,
  Compass,
  ArrowRight,
  Building,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  Bed,
  HeartPulse,
  Check,
  Stethoscope,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  FileText,
  BookOpen,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA (PHASE 6 — TECHNICAL SEO)
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Top 10 Hospitals in Varanasi (2026) | Patient Guide",
  description:
    "Compare hospitals in Varanasi by specialties, facilities, emergency services and location. Explore Popular Hospital and other local healthcare options.",
  alternates: {
    canonical: "https://www.popularhospital.in/best-hospital-in-varanasi/",
  },
  openGraph: {
    title: "Top 10 Hospitals in Varanasi (2026) | Patient Guide",
    description:
      "Compare hospitals in Varanasi by specialties, facilities, emergency services and location. Explore Popular Hospital and other local healthcare options.",
    url: "https://www.popularhospital.in/best-hospital-in-varanasi/",
    siteName: "Popular Hospital",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.popularhospital.in/images/branches/varanasi-main/1.webp",
        width: 1200,
        height: 630,
        alt: "Popular Hospital Kakarmatta Varanasi Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 Hospitals in Varanasi (2026) | Patient Guide",
    description:
      "Compare hospitals in Varanasi by specialties, facilities, emergency services and location. Explore Popular Hospital and other local healthcare options.",
    images: ["https://www.popularhospital.in/images/branches/varanasi-main/1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT FAQS & EDITORIAL DATA (TASK 9, 10 & 13)
// ─────────────────────────────────────────────────────────────────────────────

const PATIENT_FAQS = [
  {
    q: "Which is the best hospital in Varanasi?",
    a: "Popular Hospital is a multispeciality healthcare option in Varanasi, offering 450+ beds, specialist departments, advanced diagnostics, and 24/7 emergency care under one roof.",
  },
  {
    q: "Which is one of the best private hospitals in Varanasi?",
    a: "Popular Hospital in Kakarmatta offers modern operation theatres, intensive care units, MRI and CT scan facilities, and specialist medical services for a wide range of healthcare needs.",
  },
  {
    q: "Which hospital in Varanasi offers affordable multispeciality treatment?",
    a: "BHU and other government hospitals provide public healthcare services, while Popular Hospital offers private multispeciality treatment with cashless insurance options for eligible patients. Treatment costs depend on the medical condition and required services.",
  },
  {
    q: "Which hospital in Varanasi offers advanced heart treatment?",
    a: "Popular Hospital's Cardiology Department provides cardiac consultations, Cath Lab services, coronary angiography, angioplasty, and selected advanced cardiac procedures.",
  },
  {
    q: "Which hospital in Varanasi provides 24/7 emergency and ICU services?",
    a: "Popular Hospital offers round-the-clock emergency and trauma care, supported by intensive care facilities, diagnostic services, and specialist medical teams.",
  },
  {
    q: "Where can patients receive brain and spine treatment in Varanasi?",
    a: "Popular Hospital's Neurosurgery Department provides specialist evaluation and treatment for brain, spine, and nerve-related conditions, including selected surgical procedures.",
  },
  {
    q: "Does Popular Hospital accept Ayushman Bharat and cashless health insurance?",
    a: "Popular Hospital reports support for Ayushman Bharat PM-JAY and cashless insurance, subject to current empanelment, patient eligibility, policy coverage, and treatment approval.",
  },
  {
    q: "Why should patients choose Popular Hospital for multispeciality care in Varanasi?",
    a: "Popular Hospital brings together specialist doctors, advanced diagnostic facilities, surgical services, critical care, and follow-up treatment within one hospital campus.",
  },
];

const EDITORIAL_REFERENCES = [
  "Official websites and public portals of featured hospitals in Varanasi",
  "National Health Authority (NHA) & Ayushman Bharat portal",
  "Public healthcare directory listings for Varanasi, Uttar Pradesh",
  "Verified institutional information provided by Popular Hospital",
];

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA (JSON-LD)
// ─────────────────────────────────────────────────────────────────────────────

function generateJsonLd() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // Article & WebPage Schema (Task 13)
      {
        "@type": ["WebPage", "Article"],
        "@id": "https://www.popularhospital.in/best-hospital-in-varanasi/#article",
        url: "https://www.popularhospital.in/best-hospital-in-varanasi/",
        name: "Top 10 Best Hospitals in Varanasi (2026) – Updated List & Complete Guide",
        headline: "Top 10 Best Hospitals in Varanasi (2026) – Updated List & Complete Guide",
        description:
          "Compare hospitals in Varanasi by specialties, facilities, emergency services and location. Explore Popular Hospital and other local healthcare options.",
        datePublished: "2026-01-15T09:00:00+05:30",
        dateModified: "2026-11-01T10:00:00+05:30",
        inLanguage: "en-IN",
        author: {
          "@type": "Organization",
          name: "Popular Hospital Medical Content Team",
          url: "https://www.popularhospital.in/",
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://www.popularhospital.in/#organization",
          name: "Popular Hospital",
          url: "https://www.popularhospital.in/",
          logo: {
            "@type": "ImageObject",
            url: "https://www.popularhospital.in/logo.png",
          },
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.popularhospital.in/#website",
          name: "Popular Hospital",
          url: "https://www.popularhospital.in/",
        },
        breadcrumb: {
          "@id": "https://www.popularhospital.in/best-hospital-in-varanasi/#breadcrumb",
        },
      },
      // FAQPage Schema (Task 13)
      {
        "@type": "FAQPage",
        "@id": "https://www.popularhospital.in/best-hospital-in-varanasi/#faq",
        mainEntity: PATIENT_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.popularhospital.in/best-hospital-in-varanasi/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.popularhospital.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Best Hospital in Varanasi",
            item: "https://www.popularhospital.in/best-hospital-in-varanasi/",
          },
        ],
      },
      // Hospital Entity Schema
      {
        "@type": ["Hospital", "MedicalOrganization"],
        "@id": "https://www.popularhospital.in/#organization",
        name: "Popular Hospital",
        url: "https://www.popularhospital.in/",
        logo: "https://www.popularhospital.in/logo.png",
        image: "https://www.popularhospital.in/images/branches/varanasi-main/1.webp",
        telephone: "+91-7800001895",
        emergencyTelephone: "+91-7800001896",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          postalCode: "221004",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.2917,
          longitude: 82.9739,
        },
        hasMap: "https://maps.google.com/?q=Popular+Hospital+Varanasi+Kakarmatta",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        medicalSpecialty: [
          "Cardiovascular",
          "Neurology",
          "Gastroenterology",
          "Renal",
          "Oncology",
          "Urological",
          "PlasticSurgery",
          "Pediatric",
          "Surgical",
          "Gynecologic",
          "Orthopedic",
        ],
      },
      // ItemList for Top 10 Hospitals in Varanasi
      {
        "@type": "ItemList",
        "@id": "https://www.popularhospital.in/best-hospital-in-varanasi/#hospitallist",
        name: "Top 10 Hospitals in Varanasi (2026)",
        description: "Comparative guide to 10 prominent hospitals in Varanasi.",
        numberOfItems: HOSPITALS_LIST.length,
        itemListElement: HOSPITALS_LIST.map((hosp) => ({
          "@type": "ListItem",
          position: hosp.number,
          item: {
            "@type": "Hospital",
            name: hosp.name,
            url: hosp.website,
            address: hosp.address,
            medicalSpecialty: hosp.specialties,
          },
        })),
      },
    ],
  };

  return JSON.stringify(schemaGraph);
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER LANDING PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BestHospitalInVaranasiPage() {
  const jsonLd = generateJsonLd();
  const popularProfile = HOSPITALS_LIST[0];
  const otherHospitals = HOSPITALS_LIST.slice(1);

  return (
    <>
      {/* Schema.org Structured Data */}
      <Script
        id="best-hospital-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="bg-[#fafafa] text-gray-800 antialiased selection:bg-[#0d9488] selection:text-white">
        {/* ── BREADCRUMB ── */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs text-gray-500 font-medium">
              <Link href="https://www.popularhospital.in/" className="hover:text-[#0d9488] transition">
                Home
              </Link>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-[#1e3a5f] font-bold">Best Hospital in Varanasi (2026)</span>
            </nav>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            TOP 10 BEST HOSPITALS IN VARANASI (2026) — PRIMARY TOP SECTION
        ═════════════════════════════════════════════════════════════════════ */}
        <section
          id="top-hospitals"
          className="pt-10 sm:pt-14 pb-14 sm:pb-20 bg-gradient-to-b from-teal-50/40 via-white to-gray-50/70 border-b border-gray-200 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2 block">
                Healthcare Comparison Guide
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1e3a5f] font-heading tracking-tight mb-4">
                Top 10 Best Hospitals in Varanasi (2026) – Updated List &amp; Complete Guide
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Finding the{" "}
                <Link
                  href="https://www.popularhospital.in/"
                  className="text-[#0d9488] font-bold hover:underline"
                >
                  best hospital in Varanasi
                </Link>{" "}
                starts with understanding your healthcare needs. Explore our updated 2026 guide to the Top 10
                hospitals in Varanasi, featuring Popular Hospital in Kakarmatta alongside other healthcare
                institutions. Compare specialist doctors, medical departments, diagnostic facilities, emergency
                services, and hospital locations to make an informed healthcare decision.
              </p>
            </div>

            {/* Interactive Collapsible Block: How to Choose the Best Hospital in Varanasi */}
            <details className="group max-w-4xl mx-auto mb-12 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-teal-300 open:border-teal-400 open:shadow-md">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none select-none text-[#1e3a5f] hover:text-[#0d9488] transition-colors">
                <h2 className="text-lg sm:text-xl font-bold font-heading">
                  How to Choose the Best Hospital in Varanasi?
                </h2>
                <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-teal-50 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#0d9488]" />
                </span>
              </summary>

              <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-gray-100 space-y-3.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  When searching for the best hospital in Varanasi, patients need more than just a hospital name. They need
                  experienced specialist doctors, reliable diagnostic facilities, timely emergency care, and access to the
                  right treatment for their medical conditions.
                </p>
                <p>
                  Popular Hospital, Varanasi, located in Kakarmatta, is a multispeciality healthcare institution offering a
                  wide range of medical and surgical services. The hospital provides specialized care across departments
                  such as{" "}
                  <Link
                    href="https://www.popularhospital.in/departments/cardiology"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    Cardiology
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.popularhospital.in/departments/neurosurgery"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    Neurosurgery
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.popularhospital.in/departments/gastroenterology"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    Gastroenterology
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.popularhospital.in/departments/orthopedics"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    Orthopedics
                  </Link>
                  , and{" "}
                  <Link
                    href="https://www.popularhospital.in/departments/urology"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    Urology
                  </Link>
                  , supported by diagnostic facilities, emergency care, and hospital-based treatment services.
                </p>
                <p>
                  From specialist consultations and diagnostic evaluations to surgical procedures and ongoing medical
                  support, Popular Hospital serves patients across Varanasi and surrounding regions, providing healthcare
                  services tailored to their individual medical needs.
                </p>
                <p>
                  Choosing the right hospital begins with choosing the right medical expertise. Explore our{" "}
                  <Link
                    href="https://www.popularhospital.in/doctors"
                    className="text-[#0d9488] font-semibold hover:underline"
                  >
                    specialist doctors
                  </Link>
                  , discover our medical departments, or book an appointment at Popular Hospital to take the next step
                  toward appropriate medical care.
                </p>
              </div>
            </details>

            {/* #1 Featured Popular Hospital Card */}
            <div
              id="popular-hospital"
              className="bg-white rounded-3xl border-2 border-teal-200/80 p-5 sm:p-10 shadow-xl relative overflow-hidden mb-12 sm:mb-16 pt-12 sm:pt-10"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#0d9488] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest px-4 sm:px-6 py-1.5 rounded-bl-2xl shadow-xs">
                1. Featured Multispeciality Institution
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Side: Hospital Details */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-extrabold text-xs shadow-xs shrink-0">
                      1
                    </span>
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#1e3a5f] text-white">
                      Established 1992
                    </span>
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-teal-100 text-[#0d9488]">
                      450+ Beds
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1e3a5f] font-heading tracking-tight leading-snug">
                    Popular Hospital, Varanasi – Multispeciality Healthcare at Kakarmatta
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 font-medium">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                      <span>Kakarmatta, B.L.W. Road, Varanasi, Uttar Pradesh – 221004</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                      <a href="tel:+917800001895" className="hover:text-[#0d9488] transition">+91-7800001895</a>
                      <span>/</span>
                      <a href="tel:+917800001896" className="hover:text-[#0d9488] transition">96</a>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Searching for the best hospital in Varanasi? Popular Hospital is a 450-bed multi-super-speciality
                    hospital in Kakarmatta, serving patients from Varanasi and Eastern Uttar Pradesh. It brings specialist
                    consultations, advanced diagnostics, surgical treatment and critical care together at one location.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Why choose Popular Hospital? With{" "}
                    <Link
                      href="https://www.popularhospital.in/services/emergency"
                      className="text-[#0d9488] font-semibold hover:underline"
                    >
                      24/7 emergency and trauma services
                    </Link>
                    , modern operation theatres, dedicated intensive care units and comprehensive diagnostic facilities,
                    patients can access coordinated medical care based on their individual treatment needs.
                  </p>

                  {/* Key Factual Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <span>450-bed Multi-Super-Speciality Hospital</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <Link
                        href="https://www.popularhospital.in/departments"
                        className="text-[#1e3a5f] hover:text-[#0d9488] hover:underline"
                      >
                        25 Clinical Departments
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <span>24/7 Emergency &amp; Trauma Care</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <span>MRI, CT Scan &amp; Automated Pathology</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <span>Modular OTs, ICU, NICU &amp; PICU</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#0d9488] shrink-0" />
                      <span>Cashless Insurance &amp; Ayushman Bharat Support</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Link
                      href="https://www.popularhospital.in/departments"
                      className="px-5 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#0b1c43] text-white text-xs sm:text-sm font-bold transition shadow-sm"
                    >
                      Explore Departments
                    </Link>
                    <Link
                      href="https://www.popularhospital.in/doctors"
                      className="px-5 py-2.5 rounded-xl bg-[#0d9488] hover:bg-teal-700 text-white text-xs sm:text-sm font-bold transition shadow-sm"
                    >
                      Find Doctors
                    </Link>
                    <Link
                      href="https://www.popularhospital.in/book"
                      className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold transition"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>

                {/* Right Side: Authentic Hospital Building Photo */}
                <div className="lg:col-span-5 w-full flex justify-center">
                  <div className="relative w-full h-80 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                    <Image
                      src="/images/branches/varanasi-main/1.webp"
                      alt="Popular Hospital Kakarmatta main building facade Varanasi"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs sm:text-sm font-semibold">
                      Main Campus • B.L.W. Road, Kakarmatta, Varanasi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subhead for remaining 9 hospitals */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2 block">
                Regional Healthcare Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] font-heading tracking-tight">
                Other Hospitals in Varanasi
              </h3>
            </div>

            {/* 9 Hospital Cards — Compact Cards with Verified Details (Task 5) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
              {otherHospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  id={hosp.id}
                  className="bg-white rounded-xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-24 sm:h-28 bg-gray-100 overflow-hidden">
                      <Image
                        src={hosp.image}
                        alt={hosp.alt || hosp.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
                        loading="lazy"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-[#1e3a5f]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-xs">
                        {hosp.number}
                      </div>
                    </div>
                    <div className="p-2 sm:p-2.5 space-y-1">
                      <h4
                        className="text-xs font-bold text-[#1e3a5f] font-heading leading-tight line-clamp-2"
                        title={hosp.name}
                      >
                        {hosp.name}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-medium block truncate">
                        {hosp.area} • {hosp.category}
                      </span>
                      <div className="text-[10px] text-gray-600 line-clamp-1 border-t border-gray-100 pt-1">
                        <span className="font-semibold text-gray-700">Specialties:</span> {hosp.specialties.slice(0, 2).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 07 — HOW TO CHOOSE A HOSPITAL
        ═════════════════════════════════════════════════════════════════════ */}
        <section id="how-to-choose" className="py-10 sm:py-20 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2 block">
                Patient Decision Guide
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a5f] font-heading tracking-tight mb-4">
                How to Choose the Best Hospital in Varanasi for Your Medical Needs
              </h2>
              {/* Answer-first concise paragraph */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                The best hospital in Varanasi for your family depends on clinical need, urgency, doctor expertise,
                in-house emergency capabilities, and financial flexibility rather than a single universal ranking. While
                routine illnesses can be treated at general clinics, complex surgical, cardiac, or neurosurgical
                conditions require fully equipped multispeciality tertiary institutions with continuous ICU backup.
              </p>
            </div>

            {/* 8 Evaluation Pillars (Task 6 Refined Content) - Compact Vertical, Expanded Horizontal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    1
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Qualified Specialist Doctors
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Choose a hospital with qualified doctors experienced in treating your medical condition. Check their specialization, clinical expertise, and consultation availability before making a decision.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-[#1e3a5f] flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    2
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Advanced Medical &amp; Surgical Facilities
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Look for modern operation theatres, appropriate surgical equipment, anesthesia support, and postoperative care. The hospital should have facilities suited to your specific treatment needs.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    3
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    24/7 Emergency &amp; Critical Care
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  A reliable hospital should offer emergency assessment, intensive care facilities, and trained medical teams. Check the availability of ICU support and specialist services for serious conditions.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    4
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Modern Diagnostic &amp; Imaging Services
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Check whether the hospital provides essential laboratory tests, ultrasound, CT scans, MRI, and other diagnostic services. These facilities help doctors investigate medical conditions and plan appropriate treatment.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    5
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Patient Safety &amp; Quality of Care
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Prioritize hospitals that follow infection-prevention practices, informed consent procedures, and established patient safety protocols. Clear communication about treatment benefits and risks is equally important.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    6
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Treatment Costs &amp; Cashless Insurance
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Compare treatment estimates, available insurance options, and potential additional charges. Confirm cashless eligibility, Ayushman Bharat coverage, and required approvals before planned admission.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    7
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Convenient Location &amp; Accessibility
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Consider the hospital&apos;s location, transportation options, emergency access, and convenience for follow-up visits. Easy accessibility can make ongoing treatment and family support more manageable.
                </p>
              </div>

              <div className="py-3 px-3.5 sm:p-5 rounded-2xl border border-gray-200 bg-[#fafafa]">
                <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center font-bold text-xs sm:text-base shrink-0">
                    8
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                    Transparent Treatment &amp; Patient Support
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Choose a hospital that clearly explains your diagnosis, treatment options, expected costs, recovery process, and follow-up care. Good communication helps patients make informed healthcare decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 06 — HOSPITAL COMPARISON TABLE
        ═════════════════════════════════════════════════════════════════════ */}
        <section id="comparison-table" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2 block">
              Side-by-Side Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a5f] font-heading tracking-tight mb-3">
              Compare Hospitals in Varanasi by Type, Specialties &amp; Facilities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Use this comparative table to evaluate hospital ownership models, geographical locations, primary medical
              disciplines, and emergency readiness across 10 institutions in Varanasi.
            </p>
          </div>

          <HospitalComparisonTable />
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            OVERVIEW & LEADERSHIP — JUST ABOVE GOOGLE MAPS
        ═════════════════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-b from-[#f0f9ff]/70 via-white to-[#fafafa] py-10 sm:py-14 border-t border-b border-gray-200/60"
        >
          {/* Subtle background healthcare ambient light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Eyebrow, H2, Copy, CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-teal-50 text-[#0d9488] border border-teal-200/70">
                  <Compass className="w-3.5 h-3.5" />
                  <span>EXPERIENCED GENERAL &amp; LAPAROSCOPIC SURGICAL CARE</span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#1e3a5f] font-heading tracking-tight leading-[1.15]">
                  Best Surgeon in Varanasi – <br className="hidden sm:inline" />
                  <span className="inline-block sm:whitespace-nowrap">Dr. A. K. Kaushik</span>
                </h2>

                {/* Introductory Copy (Doctor Highlight) */}
                <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                  <p>
                    Looking for the{" "}
                    <Link
                      href="https://www.popularhospital.in/doctors/dr-a-k-kaushik"
                      className="text-[#0d9488] font-bold hover:underline"
                    >
                      best surgeon in Varanasi
                    </Link>
                    ? Dr. A. K. Kaushik is a Senior Consultant Surgeon at Popular Hospital with MBBS, MS qualifications and over 28 years of hospital-reported surgical experience.
                  </p>
                  <p>
                    Dr. Kaushik specializes in general and minimally invasive surgical care. Patients seeking the{" "}
                    <Link
                      href="https://www.popularhospital.in/departments/general-surgery"
                      className="text-[#0d9488] font-bold hover:underline"
                    >
                      best laparoscopic surgeon in Varanasi
                    </Link>{" "}
                    can explore gallbladder surgery, hernia repair, appendectomy and other surgical services.
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link
                    href="https://www.popularhospital.in/doctors/dr-a-k-kaushik"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0d9488] hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>View Doctor Profile</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Real Authorized Popular Hospital Doctor Photo */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Decorative Frame */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0d9488]/20 to-[#1e3a5f]/20 rounded-3xl transform rotate-2 scale-95 blur-lg" />

                  <div className="relative bg-white rounded-3xl p-4 sm:p-5 border border-gray-200 shadow-xl overflow-hidden">
                    <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
                      <Image
                        src="/images/dr_ak_kaushik.png"
                        alt="Dr. A.K. Kaushik - Senior Consultant Surgeon and Chairman at Popular Hospital Varanasi"
                        fill
                        priority
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e3a5f] via-[#1e3a5f]/80 to-transparent p-5 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                            Senior Consultant Surgeon
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">Dr. A. K. Kaushik</h3>
                        <p className="text-xs text-gray-200">MBBS, MS (General Surgery)</p>
                        <p className="text-[11px] text-teal-200 mt-1">General, Laparoscopic &amp; Minimally Invasive Surgery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION — PATIENT FAQS (TASK 9)
        ═════════════════════════════════════════════════════════════════════ */}
        <section id="faqs" className="py-14 sm:py-20 bg-[#fafafa] border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] font-heading tracking-tight">
                Frequently Asked Questions About Hospitals in Varanasi
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Common questions about medical specialties, emergency services, doctor appointments, and
                choosing healthcare providers in Varanasi.
              </p>
            </div>

            <div className="space-y-4">
              {PATIENT_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition-all hover:border-teal-200 open:border-teal-300 open:shadow-md"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none text-left font-bold text-[#1e3a5f] text-base sm:text-lg select-none gap-4">
                    <span className="flex items-start gap-3">
                      <span className="text-[#0d9488] font-bold text-sm sm:text-base mt-0.5">
                        Q{idx + 1}.
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-50 group-open:bg-teal-50 group-open:text-[#0d9488] flex items-center justify-center shrink-0 transition-transform group-open:rotate-180">
                      <ChevronDown className="w-4 h-4 text-gray-500 group-open:text-[#0d9488]" />
                    </span>
                  </summary>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-sm sm:text-base text-gray-700 leading-relaxed pl-7">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION — ABOUT THIS HOSPITAL GUIDE (EDITORIAL TRANSPARENCY)
        ═════════════════════════════════════════════ */}
        <section id="editorial-info" className="py-14 sm:py-20 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#fafafa] border border-gray-200 p-6 sm:p-10 lg:p-12 shadow-xs space-y-10">
              {/* 1. Section Header */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] block">
                  EDITORIAL TRANSPARENCY
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a5f] font-heading tracking-tight">
                  About This Hospital Guide
                </h2>
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Editorial Standards &amp; Source Transparency
                </p>
              </div>

              {/* 2. Main Content */}
              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                <p>
                  This 2026 guide is published by Popular Hospital, Varanasi, to help patients and families compare hospitals based on medical specialties, specialist availability, healthcare facilities, emergency services, and accessibility. Information is compiled from publicly available sources to support informed healthcare decisions.
                </p>
                <p>
                  <strong>Editorial Disclosure:</strong> Popular Hospital is included as the publisher&apos;s institution. This guide is intended for patient education and hospital comparison, not as an independently verified ranking of hospital quality, clinical outcomes, or patient satisfaction.
                </p>
              </div>

              {/* 3. Four Information Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Publisher */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Publisher
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1e3a5f]">
                      Popular Hospital, Varanasi
                    </span>
                  </div>
                </div>

                {/* Card 2: Purpose */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1e3a5f] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Purpose
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1e3a5f]">
                      Patient Education &amp; Hospital Comparison
                    </span>
                  </div>
                </div>

                {/* Card 3: Coverage Area */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Coverage Area
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1e3a5f]">
                      Varanasi, Uttar Pradesh, India
                    </span>
                  </div>
                </div>

                {/* Card 4: Data Sources */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-4 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Data Sources
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1e3a5f]">
                      Public Healthcare Records &amp; Hospital Portals
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Hospital Selection Methodology */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 space-y-3.5">
                <h3 className="text-base sm:text-lg font-bold text-[#1e3a5f] font-heading">
                  How This Guide Was Prepared
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Hospitals are included for informational comparison using publicly available details about their
                  medical departments, specialist services, diagnostic and treatment facilities, emergency support,
                  location, and accessibility. Information should be verified directly with the respective hospital
                  before making healthcare decisions.
                </p>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Evaluation Criteria:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Medical Specialties",
                      "Specialist Availability",
                      "Healthcare Facilities",
                      "Emergency Services",
                      "Location & Accessibility",
                    ].map((crit, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#fafafa] border border-gray-200 text-xs font-semibold text-gray-700"
                      >
                        {crit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            SECTION 13 — LOCATION & APPOINTMENT
        ═════════════════════════════════════════════════════════════════════ */}
        <section id="location" className="pt-10 sm:pt-14 pb-28 sm:pb-20 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Side: Address & Details */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0d9488] block">
                  Find Our Main Campus
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f] font-heading tracking-tight">
                  Visit Popular Hospital in Kakarmatta, Varanasi
                </h2>

                <div className="p-5 rounded-2xl bg-[#fafafa] border border-gray-200 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <MapPin className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900">Main Campus Address:</strong>
                      N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi – 221004, Uttar Pradesh, India.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Phone className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900">Official Contact &amp; Appointments:</strong>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                        <a href="tel:+917800001895" className="text-[#0d9488] font-bold hover:underline">
                          +91-7800001895
                        </a>
                        <a href="tel:+917800001896" className="text-[#0d9488] font-bold hover:underline">
                          +91-7800001896
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Clock className="w-5 h-5 text-[#0d9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900">Operational Timings:</strong>
                      Emergency: 24 Hours / 7 Days • OPD: Monday – Saturday (9:00 AM – 8:00 PM)
                    </div>
                  </div>
                </div>

                {/* Regional Branches Reference */}
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Other Popular Hospital Regional Branches:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                    <Link
                      href="https://www.popularhospital.in/branches"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Sigra, Varanasi
                    </Link>
                    <Link
                      href="https://www.popularhospital.in/branches"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Gopiganj, Bhadohi
                    </Link>
                    <Link
                      href="https://www.popularhospital.in/branches"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Mirzapur Branch
                    </Link>
                    <Link
                      href="https://www.popularhospital.in/branches"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Bachhaon Rural Center
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://maps.google.com/?q=Popular+Hospital+Varanasi+Kakarmatta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#1e3a5f] border-2 border-[#1e3a5f] text-xs sm:text-sm font-bold transition shadow-sm"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-4 h-4 text-[#0d9488]" />
                  </a>
                </div>
              </div>

              {/* Right Side: Embedded Map */}
              <div className="lg:col-span-6">
                <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-gray-200 shadow-md">
                  <iframe
                    title="Popular Hospital Varanasi Kakarmatta Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.4870425895786!2d82.96961447605928!3d25.28784347765103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e3230c1e626e5%3A0xe53be0a651f67f2e!2sPopular%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
