import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wellness Packages | Popular Hospital',
  description: 'Comprehensive wellness check-up packages designed for all age groups and health needs.',
};

const packages = [
  { title: "Primary Health Check Up (Male)", price: "999", originalPrice: "1570", slug: "primary-health-check-up-male" },
  { title: "Primary Health Check Up (Female)", price: "999", originalPrice: "1570", slug: "primary-health-check-up-female" },
  { title: "Executive Health Check Up (Male)", price: "1999", originalPrice: "3090", slug: "executive-health-check-up-male" },
  { title: "Executive Health Check Up (Female)", price: "1999", originalPrice: "3090", slug: "executive-health-check-up-female" },
  { title: "Advance Health Check Up (Male)", price: "2499", originalPrice: "4700", slug: "advance-health-check-up-male" },
  { title: "Advance Health Check Up (Female)", price: "2499", originalPrice: "5000", slug: "advance-health-check-up-female" },
  { title: "Child Health Check UP (10-18 Yrs)", price: "2499", originalPrice: "4790", slug: "child-health-check-up" },
  { title: "Well Woman Executive Health Checkup", price: "2999", originalPrice: "7870", slug: "well-woman-executive-health-checkup" },
  { title: "Healthy Heart Checkup", price: "4999", originalPrice: "9160", slug: "healthy-heart-checkup" },
  { title: "Annual Health Check Up (Male)", price: "5999", originalPrice: "10930", slug: "annual-health-check-up-male" },
  { title: "Annual Health Check Up (Female)", price: "5999", originalPrice: "10930", slug: "annual-health-check-up-female" },
  { title: "Comprehensive Health Check Up (Male & Female)", price: "9999", originalPrice: "17320", slug: "comprehensive-health-check-up-male-female" },
  { title: "Comprehensive Health Check Up (Female)", price: "10999", originalPrice: "18820", slug: "comprehensive-health-check-up-female" },
  { title: "Cardiac Screening 1", price: "499", originalPrice: "1700", slug: "cardiac-screening-1" },
  { title: "Cardiac Screening 2", price: "999", originalPrice: "3399", slug: "cardiac-screening-2" },
  { title: "Cardiac Active Package", price: "1999", originalPrice: "5999", slug: "cardiac-active-package" }
];

export default function PreventiveHealthPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[250px] md:h-[300px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/health-packages/health_packages.jpg"
            alt="Wellness Packages"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/15" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Wellness Packages
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Wellness Packages</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Informational Section (Translated from Image) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-[1366px] px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left: Why check-up is important */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] leading-tight mb-4">
                   Why is a <span className="text-[#0066cc]">Regular Wellness Check-up</span> Important for Good Health?
                </h2>
                <div className="w-16 h-1 bg-[#0066cc] rounded-full"></div>
              </div>

              <div className="space-y-6">
                 {[
                   "In today's fast-paced world, it has become essential to monitor your health regularly.",
                   "People often ignore their health until they fall ill and it starts negatively impacting their daily lives.",
                   "However, regular wellness check-ups enable a person to lead a healthy, fit, and active life."
                 ].map((text, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center font-bold text-sm group-hover:bg-[#0066cc] group-hover:text-white transition-colors duration-300">
                        {i+1}
                      </div>
                      <p className="text-gray-600 leading-relaxed font-medium pt-1 italic">{text}</p>
                   </div>
                 ))}
              </div>
            </div>

            {/* Right: Who needs it */}
            <div className="bg-gray-50/50 rounded-[40px] p-8 lg:p-10 border border-gray-100">
              <h2 className="text-2xl font-black text-[#0b1c43] mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Who Needs a Wellness Package?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {[
                  "Individuals with Obesity",
                  "Tobacco chewers",
                  "Frequent smokers or heavy drinkers",
                  "High-stress jobs / Family history of Diabetes",
                  "Low exercise tolerance",
                  "Excessive weight gain or loss",
                  "Constant indigestion / Digestive issues",
                  "Swelling in abdomen, hands, or feet",
                  "Blood in urine, stool, or while coughing"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                    <span className="text-gray-700 text-[14px] font-semibold leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-gray-50/30">
        <div className="container mx-auto max-w-[1366px] px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading mb-4">Choose Your <span className="text-[#0066cc]">Wellness Package</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1366px] mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-[32px] p-1.5 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] transition-all duration-500 h-full flex"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5 bg-white p-6 sm:p-7 rounded-[26px] w-full min-h-[190px]">
                  {/* Left: Content Area */}
                  <div className="flex flex-col items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-[#0E948B] rounded-[18px] flex items-center justify-center text-white mb-1 shadow-md shadow-teal-600/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black tracking-widest uppercase rounded-full mb-2">
                        Popular Package
                      </span>
                      <h3 className="text-[#0066cc] font-bold text-lg sm:text-xl tracking-tight leading-tight max-w-[280px]">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Pricing & Action Section */}
                  <div className="flex flex-col items-center sm:items-end justify-between self-stretch gap-4 border-l-0 sm:border-l border-gray-100/60 sm:pl-8">
                    <div className="text-center sm:text-right">
                      <div className="text-[#86868b] text-[14px] font-medium mb-0.5">
                        Package Price <span className="line-through ml-1">₹{parseFloat(pkg.originalPrice).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="text-[#D35400] text-[11px] font-black uppercase tracking-wider mb-0.5">Discount Price</div>
                      <div className="text-[#1d1d1f] text-2xl sm:text-3xl font-black tracking-tight">
                        ₹{pkg.price}/-
                      </div>
                    </div>

                    <Link
                      href={`/services/wellness-packages/${pkg.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0066cc] text-white rounded-xl text-[14px] font-bold shadow-md shadow-blue-600/10 hover:bg-[#0055aa] hover:shadow-blue-600/20 transition-all duration-300 active:scale-95 whitespace-nowrap"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      {/* Wellness Program Light Blue Section with Dot Pattern */}
      <section className="bg-blue-50 py-12 px-6 relative overflow-hidden border-t border-blue-100">
        {/* Dot Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0066cc 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        ></div>

        <div className="container mx-auto max-w-[1366px] text-center relative z-10">
          <h2 className="text-[#0066cc] text-2xl md:text-3xl font-black uppercase tracking-widest mb-4">
            Wellness Program
          </h2>
          
          <p className="text-gray-700 text-base md:text-xl font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
            Early identification and correction of risk factors to ensure good health.
          </p>

          <div className="space-y-5">
            <h3 className="text-gray-500 text-sm md:text-lg font-bold uppercase tracking-widest">
              Contact for Appointment
            </h3>
            
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Phone Numbers */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white shadow-sm rounded-full flex items-center justify-center border border-blue-100">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-[#0066cc]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                    </svg>
                  </div>
                  <div className="text-[#1d1d1f] text-2xl md:text-4xl font-black tracking-tight">
                    <a href="tel:+917800001895" className="hover:text-[#0066cc] transition-colors">7800001895</a> / <a href="tel:+917800001896" className="hover:text-[#0066cc] transition-colors">96</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center p-1.5 border border-green-100">
                    <Image src="/images/whatsapp_icon.png" alt="WhatsApp" width={24} height={24} className="md:w-6 md:h-6" />
                  </div>
                  <div className="text-[#1d1d1f] text-2xl md:text-4xl font-black tracking-tight">
                    <a href="tel:+917311111352" className="hover:text-green-600 transition-colors">7311111352</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


