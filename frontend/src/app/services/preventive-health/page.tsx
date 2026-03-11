import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Packages | Popular Hospital',
  description: 'Comprehensive health check-up packages designed for all age groups and health needs.',
};

const packages = [
  { title: "BRONZE PACKAGE - MEN", age: "Recommended for 18-25 Years", originalPrice: "7270.00", discountPrice: "3999.00", image: "/images/health-packages/bronze_package_men.jpg" },
  { title: "BRONZE PACKAGE - WOMEN", age: "Recommended for 18-25 Years", originalPrice: "8180.00", discountPrice: "4499.00", image: "/images/health-packages/bronze_package_women.jpg" },
  { title: "SILVER PACKAGE - MEN", age: "Recommended for 18-25 Years", originalPrice: "12725.00", discountPrice: "6999.00", image: "/images/health-packages/silver_package_men.jpg" },
  { title: "SILVER PACKAGE - WOMEN", age: "Recommended for 18-25 Years", originalPrice: "13640.00", discountPrice: "7499.00", image: "/images/health-packages/silver_package_women.jpg" },
  { title: "GOLD PACKAGE - MEN", age: "Recommended for 18-25 Years", originalPrice: "19090.00", discountPrice: "10499.00", image: "/images/health-packages/gold_package_men.jpg" },
  { title: "GOLD PACKAGE - WOMEN", age: "Recommended for 18-25 Years", originalPrice: "20900.00", discountPrice: "11499.00", image: "/images/health-packages/gold_package_women.jpg" },
  { title: "DIAMOND PACKAGE - MEN", age: "Recommended for 18-25 Years", originalPrice: "29090.00", discountPrice: "15999.00", image: "/images/health-packages/diamond_package_men.jpg" },
  { title: "DIAMOND PACKAGE - WOMEN", age: "Recommended for 18-25 Years", originalPrice: "30900.00", discountPrice: "16999.00", image: "/images/health-packages/diamond_package_women.jpg" },
  { title: "HEALTHY YOUNG ONES", age: "Recommended for 18-25 Years", originalPrice: "5450.00", discountPrice: "2999.00", image: "/images/health-packages/healthy_young_ones.jpg" },
  { title: "HEALTHY LUNGS HEALTH CHECK-UP", age: "Recommended for 18-25 Years", originalPrice: "5270.00", discountPrice: "2799.00", image: "/images/health-packages/healthy_lungs_health_check-up.jpg" },
  { title: "OBESITY CHECK-UP", age: "Recommended for 18-25 Years", originalPrice: "12500.00", discountPrice: "7499.00", image: "/images/health-packages/obesity_check_up.jpg" },
  { title: "CARDIAC HEALTH PACKAGE", age: "Recommended for 18-25 Years", originalPrice: "10050.00", discountPrice: "5499.00", image: "/images/health-packages/cardiac_health_package.jpg" },
  { title: "BASIC CARDIAC SCREENING PACKAGE", age: "Recommended for 18-25 Years", originalPrice: "6350.00", discountPrice: "3499.00", image: "/images/health-packages/basic_cardiac_screening_package.jpg" },
  { title: "CARDIAC ADVANCED CARE PACKAGE", age: "Recommended for 18-25 Years", originalPrice: "18180.00", discountPrice: "8999.00", image: "/images/health-packages/cardiac_advance_care_package.jpg" },
  { title: "DIABETIC CHECK", age: "Recommended for 18-25 Years", originalPrice: "9090.00", discountPrice: "4999.00", image: "/images/health-packages/diabetic_check.jpg" },
  { title: "DIABETIC CHECK-EXTENDED", age: "Recommended for 18-25 Years", originalPrice: "13650.00", discountPrice: "7499.00", image: "/images/health-packages/diabetic_check_extended.jpg" }
];

export default function PreventiveHealthPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/health-packages/health_packages.jpg"
            alt="Preventive Health"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Health Packages
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Health Packages</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-[1366px] px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading mb-4">Choose Your <span className="text-teal-600">Health Package</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1366px] mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 flex overflow-hidden group relative"
              >
                {/* Left: Image Container */}
                <div className="w-[160px] sm:w-[220px] flex-shrink-0 relative bg-[#f5f5f7] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center p-6 sm:p-8 flex-1 min-w-0">
                  <span className="text-[#bf4800] text-[11px] font-bold tracking-widest uppercase mb-2">
                    {pkg.age} Age Group
                  </span>
                  <h3 className="text-[#1d1d1f] font-bold text-[18px] sm:text-[20px] tracking-tight mb-2 leading-tight">
                    {pkg.title}
                  </h3>
                  
                  <div className="space-y-0.5 mb-6">
                    <div className="text-[#86868b] text-[14px] font-medium">
                      Package Price <span className="line-through">₹ {parseFloat(pkg.originalPrice).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="text-[#1d1d1f] text-[16px] font-bold">
                      Discount Price ₹ {parseFloat(pkg.discountPrice).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/services/preventive-health/${pkg.title.toLowerCase().replace(/\s*-\s*/g, '-').replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-[#0066cc] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#0077ed] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform group-hover:scale-[1.02] active:scale-95 z-20 relative"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Banner */}
      <section className="bg-teal-50 py-16 px-6 border-y border-teal-100">
         <div className="container mx-auto max-w-[1366px] text-center">
             <h3 className="text-2xl lg:text-3xl font-bold text-[#0b1c43] mb-4">Confused about which package to choose?</h3>
             <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Get in touch with our medical executives to guide you for the perfect package customized to your medical history.</p>
             <a href="tel:+917800001895" className="px-8 py-3.5 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg inline-flex items-center gap-2">
                Call for Free Consultation
             </a>
         </div>
      </section>
    </div>
  );
}

