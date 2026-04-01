import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmacy | Popular Hospital",
  description:
    "100% authentic and genuine medicines available 24/7 under strict quality control to fulfill patient emergency needs.",
};

export default function PharmacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[400px] md:h-[400px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pharmacy.png"
            alt="Pharmacy"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              Pharmacy
            </h1>
            <nav
              className="flex items-center text-sm md:text-lg text-white/90 font-bold"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Home
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <Link
                href="/services"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Services
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <span className="text-white uppercase tracking-wider">
                Pharmacy
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
          <div className="max-w-none">
            {/* Text Content */}
            <div className="prose prose-lg prose-blue max-w-none">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-1 bg-teal-500 rounded-full inline-block"></span>
                <h2 className="text-3xl font-black text-[#0b1c43] font-heading m-0 leading-none">
                  Our Commitment
                </h2>
              </div>

              <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                Popular Hospital Pharmacy is situated in the campus of all the
                hospitals to facilitate patients fulfilling their emergency
                needs as well as the medicines as prescribed inside the hospital
                premises.
              </p>

              <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                In line with rules and regulations and under the strict
                supervision of authorities and the Drug Controller. We are
                committed to achieve and maintain excellent standards of
                pharmaceutical care to deliver the right medicines with best
                price. We continually seek ways to improve our offering and
                services, what we deliver to our clients. We believe in
                providing high quality, authentic and 100% genuine products to
                our customers. We have highly skilled and qualified employees
                who regularly perform the quality check.
              </p>

              <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                Our entire inventory is centrally managed by highly skilled
                workers. These skilled and qualified workers are dedicated to
                maintain sufficient stock, dispose of any damaged/expired
                medicines and other inventory control processes. All the
                medicines and other health care products being sold at Popular
                Medical Stores are purchased from their authorized companies and
                its distributors. This rules out spurious, duplicate, and
                expired drugs completely for safe-guarding the interest and
                health of customers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
