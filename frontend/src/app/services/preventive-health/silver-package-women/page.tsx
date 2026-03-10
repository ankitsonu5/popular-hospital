import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silver Package Women | Preventive Health Check Up | Popular Hospital',
  description: 'Detailed information and items covered under the Silver Package for Women.',
};

export default function SilverPackageWomenPage() {
  const consultations = [
    'GYNAECOLOGIST', 'GENERAL PHYSICIAN', 'DIETICIAN', 'OPTHALMOLOGIST'
  ];

  const investigations = [
    'MER', 'COMPLETE HAEMOGRAM', 'BLOOD GROUP & Rh typing', 'BLOOD SUGAR FASTING',
    'BLOOD SUGAR PP', 'HBA1C', 'TSH', 'LIPID PROFILE',
    'LIVER FUNCTON TEST', 'KIDNEY FUNCTION TEST', 'URINE ANALYSIS', 'STOOL TEST(ROUTINE AND MICRSCOPIC )',
    'PAP SMEAR', 'USG WHOLE ABDOMEN', 'X RAY CHEST', 'PFT (PULMONARY FUNCTION TEST)', 
    'ECG', 'TMT'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/health_packages.png"
            alt="Silver Package Women"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Silver Package Women
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services/preventive-health" className="hover:text-blue-300 transition-colors">Health Packages</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Silver Package Women</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4 lg:px-8">
          
          {/* Top Card Area */}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10 mb-20">
            
            {/* Package Summary Card */}
            <div className="w-full md:w-[70%] bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex overflow-hidden group">
                <div className="w-[160px] sm:w-[220px] relative bg-[#f5f5f7] flex-shrink-0">
                    <Image
                        src="/images/health-packages/silver_package_women.jpg"
                        alt="Silver Package Women"
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
                <div className="p-10 flex flex-col justify-center flex-1">
                    <span className='text-[#bf4800] text-[12px] font-bold tracking-widest uppercase mb-3'>Recommended: 18-25 Yrs.</span><h2 className='text-[#1d1d1f] font-bold text-xl sm:text-2xl tracking-tight mb-4'>SILVER PACKAGE WOMEN</h2>
                    
                    <div className="text-gray-800 text-[15px] font-bold line-through">
                        Package Price ₹ 13640.00
                    </div>
                    <div className="text-[#1a3a6b] text-[15px] font-bold mt-1">
                        Discount Price ₹ 7499.00
                    </div>
                </div>
            </div>

            {/* Booking Button */}
            <div className="w-full md:w-[25%] flex justify-center md:justify-end">
               <Link href="/book" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0066cc] text-white rounded-full text-[15px] font-bold shadow-md hover:bg-[#0077ed] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 z-20 relative"><span>Buy Now</span><svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></Link>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-[#fbfbfd] p-10 sm:p-14 rounded-[40px] border border-gray-100/50 shadow-sm">
             <div className='mb-10'><h2 className='text-[#1d1d1f] text-2xl font-bold tracking-tight mb-2'>SILVER PACKAGE-WOMEN</h2><div className='w-12 h-1 bg-[#0066cc] rounded-full'></div></div>
             

             {/* Consultations */}
             <div className="mb-8">
                <h4 className="text-[#86868b] text-[14px] font-bold tracking-widest uppercase mb-6 px-2">CONSULTATIONS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {consultations.map((item, id) => (
                        <div key={id} className="bg-white border border-gray-100/80 p-5 rounded-2xl text-[14px] text-[#1d1d1f] font-medium uppercase shadow-sm flex items-center gap-4 group/item hover:border-blue-100 transition-colors"><div className="w-2.5 h-2.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-600 shadow-sm transition-colors"></div>
                           {item}
                        </div>
                    ))}
                </div>
                {/* Centered Pain Specialist */}
                <div className="mt-4">
                     <div className="bg-white border border-gray-100/80 p-5 rounded-2xl text-[14px] text-[#1d1d1f] font-medium uppercase shadow-sm flex items-center gap-4 group/item hover:border-blue-100 transition-colors"><div className="w-2.5 h-2.5 rounded-full bg-blue-400/40 group-hover/item:bg-blue-500 transition-colors"></div>PAIN SPECIALIST</div>
                </div>
             </div>

             {/* Investigations */}
             <div>
                <h4 className="text-[#86868b] text-[14px] font-bold tracking-widest uppercase mb-6 px-2">INVESTIGATIONS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {investigations.map((item, id) => (
                        <div key={id} className="bg-white border border-gray-100/80 p-5 rounded-2xl text-[14px] text-[#1d1d1f] font-medium uppercase shadow-sm flex items-center gap-4 group/item hover:border-blue-100 transition-colors"><div className="w-2.5 h-2.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-600 shadow-sm transition-colors"></div>
                           {item}
                        </div>
                    ))}
                </div>
             </div>
             
          </div>

        </div>
      </section>
    </div>
  );
}
