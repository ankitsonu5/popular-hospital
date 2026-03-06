import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Packages | Popular Hospital',
  description: 'Comprehensive health check-up packages designed for all age groups and health needs.',
};

const packages = [
  { title: "BRONZE PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "7270.00", discountPrice: "3999.00", image: "/images/health-packages/bronze_package_men.jpg" },
  { title: "BRONZE PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "8180.00", discountPrice: "4499.00", image: "/images/health-packages/bronze_package_women.jpg" },
  { title: "SILVER PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "12725.00", discountPrice: "6999.00", image: "/images/health-packages/silver_package_men.jpg" },
  { title: "SILVER PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "13640.00", discountPrice: "7499.00", image: "/images/health-packages/silver_package_women.jpg" },
  { title: "GOLD PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "19090.00", discountPrice: "10499.00", image: "/images/health-packages/gold_package_men.jpg" },
  { title: "GOLD PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "20900.00", discountPrice: "11499.00", image: "/images/health-packages/gold_package_women.jpg" },
  { title: "DIAMOND PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "29090.00", discountPrice: "15999.00", image: "/images/health-packages/diamond_package_men.jpg" },
  { title: "DIAMOND PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "30900.00", discountPrice: "16999.00", image: "/images/health-packages/diamond_package_women.jpg" },
  { title: "HEALTHY YOUNG ONES", age: "5-18 Yrs.", originalPrice: "5450.00", discountPrice: "2999.00", image: "/images/health-packages/healthy_young_ones.jpg" },
  { title: "HEALTHY LUNGS HEALTH CHECK-UP", age: "18-65 Yrs.", originalPrice: "5270.00", discountPrice: "2799.00", image: "/images/health-packages/healthy_lungs_health_check-up.jpg" },
  { title: "OBESITY CHECK-UP", age: "18-65 Yrs.", originalPrice: "12500.00", discountPrice: "7499.00", image: "/images/health-packages/obesity_check_up.jpg" },
  { title: "CARDIAC HEALTH PACKAGE", age: "18-65 Yrs.", originalPrice: "10050.00", discountPrice: "5499.00", image: "/images/health-packages/cardiac_health_package.jpg" },
  { title: "BASIC CARDIAC SCREENING PACKAGE", age: "18-65 Yrs.", originalPrice: "6350.00", discountPrice: "3499.00", image: "/images/health-packages/basic_cardiac_screening_package.jpg" },
  { title: "CARDIAC ADVANCED CARE PACKAGE", age: "18-65 Yrs.", originalPrice: "18180.00", discountPrice: "8999.00", image: "/images/health-packages/cardiac_advance_care_package.jpg" },
  { title: "DIABETIC CHECK", age: "18-65 Yrs.", originalPrice: "9090.00", discountPrice: "4999.00", image: "/images/health-packages/diabetic_check.jpg" },
  { title: "DIABETIC CHECK-EXTENDED", age: "18-65 Yrs.", originalPrice: "13650.00", discountPrice: "7499.00", image: "/images/health-packages/diabetic_check_extended.jpg" }
];

export default function PreventiveHealthPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/health_packages.png"
            alt="Health Packages"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/30 text-white"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <nav className="flex mb-4 text-sm text-white/80 font-medium tracking-wide" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2 text-white/60">/</span>
              <span className="text-white">Health Packages</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-heading tracking-tight leading-tight">
              Health Packages
            </h1>
            <p className="text-lg text-blue-50 max-w-xl mb-8 font-light leading-relaxed">
              Prioritize your health with our comprehensive and affordable health screening packages tailored for individuals of all ages. Prevention is better than cure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+917800001895" className="px-8 py-3.5 bg-white text-[#0b1c43] rounded-full font-bold hover:bg-teal-50 hover:text-teal-700 transition-all shadow-lg flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-[1366px] px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading mb-4">Choose Your <span className="text-teal-600">Health Package</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Explore carefully curated medical test packages offering huge discounts over individual test prices. Take control of your well-being today!</p>
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
                      MRP <span className="line-through">₹ {parseFloat(pkg.originalPrice).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="text-[#1d1d1f] text-[16px] font-bold">
                      Offer Price ₹ {parseFloat(pkg.discountPrice).toLocaleString("en-IN")}
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
