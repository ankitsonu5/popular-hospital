import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silver Package Men | Preventive Health Check Up | Popular Hospital',
  description: 'Detailed information and items covered under the Silver Package for Men.',
};

export default function SilverPackageMenPage() {
  const consultations = [
    'CARDIOLOGIST', 'DENTAL', 'DIETICIAN', 'ENT',
    'GENERAL PHYSICIAN', 'GENERAL SURGEON', 'OPHTHALMOLOGIST', 'PAIN SPECIALIST'
  ];

  const investigations = [
    'MER', 'COMPLETE HAEMOGRAM', 'BLOOD GROUP & Rh typing', 'BLOOD SUGAR FASTING',
    'BLOOD SUGAR PP', 'HBA1C', 'TSH', 'LIPID PROFILE',
    'LIVER FUNCTION TEST', 'KIDNEY FUNCTION TEST', 'SERUM CALCIUM TOTAL', 'VITAMIN D3',
    'URINE ANALYSIS', 'STOOL TEST(ROUTINE AND MICRSCOPIC )', 'PSA TOTAL', 'USG WHOLE ABDOMEN',
    'X RAY CHEST PA VIEW', 'PFT (PULMONARY FUNCTION TEST)', 'ECG', 'TMT'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#578191]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/health-packages-hero-v2.png"
            alt="Health Packages Background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#578191]/90 to-[#578191]/60"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-2">
            Health Packages
          </h1>
          <nav className="flex text-sm text-white/80 font-medium tracking-wide" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/60">|</span>
            <Link href="/services/preventive-health" className="hover:text-white transition-colors">Health Packages</Link>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-5xl px-4 lg:px-8">
          
          {/* Top Card Area */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12">
            
            {/* Package Summary Card */}
            <div className="w-full md:w-2/3 bg-[#f8f9fa] rounded-lg shadow-md border border-gray-100 flex overflow-hidden">
                <div className="w-[180px] sm:w-[220px] relative bg-[#e7e7e7] flex-shrink-0">
                    <Image
                        src="/images/health-packages/silver_package_men.jpg"
                        alt="Silver Package Men"
                        fill
                        className="object-cover object-top"
                    />
                </div>
                <div className="p-6 flex flex-col justify-center bg-[#f8f9fa] flex-1">
                    <h2 className="text-[#1a3a6b] font-bold text-lg uppercase tracking-wide mb-1">
                      SILVER PACKAGE MEN
                    </h2>
                    <p className="text-gray-600 text-[13px] mb-3">
                      Recommended for age group 18-65 Yrs.
                    </p>
                    <div className="text-gray-800 text-[15px] font-bold">
                        Package Price ₹ 12725.00
                    </div>
                    <div className="text-[#1a3a6b] text-[15px] font-bold mt-1">
                        Discount Price ₹ 6999.00
                    </div>
                </div>
            </div>

            {/* Booking Button */}
            <div className="w-full md:w-1/3 flex justify-end">
               <a href="/book" className="w-full md:w-auto px-10 py-3 bg-[#3361a8] text-white text-sm font-bold tracking-wider hover:bg-[#204684] transition-colors rounded uppercase text-center focus:ring-4 focus:ring-blue-300">
                  Booking Now
               </a>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-[#f5f5f5] p-6 sm:p-10 rounded-lg">
             <h2 className="text-[#1e293b] text-xl font-bold uppercase mb-4 tracking-wide">
                SILVER PACKAGE-MEN
             </h2>
             <h3 className="text-[#3361a8] font-bold uppercase mb-6 tracking-wide text-[15px]">
                ITEM NAME
             </h3>

             {/* Consultations */}
             <div className="mb-8">
                <h4 className="text-gray-800 text-[13px] font-extrabold uppercase mb-3">
                   CONSULTATIONS
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
                    {consultations.map((item, id) => (
                        <div key={id} className="bg-[#f9fafb] flex items-center justify-center p-3 text-center text-[11px] md:text-[13px] text-gray-700 font-medium uppercase hover:bg-white transition-colors h-14">
                           {item}
                        </div>
                    ))}
                </div>
             </div>

             {/* Investigations */}
             <div>
                <h4 className="text-gray-800 text-[13px] font-extrabold uppercase mb-3">
                   INVESTIGATION
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
                    {investigations.map((item, id) => (
                        <div key={id} className="bg-[#f9fafb] flex items-center justify-center p-3 text-center text-[10px] md:text-xs text-gray-700 font-medium uppercase hover:bg-white transition-colors h-14">
                           {item}
                        </div>
                    ))}
                </div>
                {/* Last odd item - 2D ECHO - center aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-200 border-x border-b border-gray-200">
                     <div className="hidden lg:block bg-transparent"></div>
                     <div className="bg-[#f9fafb] flex items-center justify-center p-3 text-center text-[10px] md:text-xs text-gray-700 font-medium uppercase hover:bg-white transition-colors h-14 col-span-1 border-x border-gray-200">
                        2D ECHO (ONLY SCREENING)
                     </div>
                     <div className="hidden lg:block bg-transparent"></div>
                </div>
             </div>
             
          </div>

        </div>
      </section>
    </div>
  );
}
