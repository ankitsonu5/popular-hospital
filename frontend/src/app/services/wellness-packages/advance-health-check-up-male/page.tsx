import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advance Health Check Up (Male) | Wellness Packages | Popular Hospital',
  description: 'Detailed information and items covered under the Advance Health Check Up (Male).',
};

export default function PackagePage() {
  const investigations = [
    'CBC', 'Blood Group', 'Serum Creatinine', 'Lipid Profile', 'Blood Sugar Fasting', 'Urine Routine and Microscopy', 'Serum Uric Acid', 'TSH', 'SGPT', 'SGOT', 'X-Ray Chest', 'ECG', 'Physician Consultation', 'Dietician Consultation'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ------- HERO ------- */}
      <section className="relative h-[250px] md:h-[300px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Advance Health Check Up (Male)
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services/wellness-packages" className="hover:text-blue-300 transition-colors">Wellness Packages</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Advance Health Check Up (Male)</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-5xl px-4 lg:px-8">
          
          {/* Top Card Area */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
            <div className="w-full md:w-[70%] bg-white rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex overflow-hidden group">
                <div className="w-[160px] sm:w-[220px] relative bg-[#f5f5f7] flex-shrink-0">
                    <Image
                        src="/images/wellness_packages/silver-men.jpg"
                        alt="Advance Health Check Up (Male)"
                        fill
                        className="object-cover transition-transform duration-700"
                    />
                </div>
                <div className="p-10 flex flex-col justify-center flex-1">
                    <h2 className='text-[#1d1d1f] font-bold text-xl sm:text-2xl tracking-tight mb-4 uppercase'>Advance Health Check Up (Male)</h2>
                    <div className="text-gray-800 text-[15px] font-bold line-through">
                        Package Price ₹ 4700
                    </div>
                    <div className="text-[#1a3a6b] text-2xl font-black mt-1">
                        Now at ₹ 2499/-
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[25%] flex justify-center md:justify-end">
               <Link href="/book" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E85222] text-white rounded-full text-[15px] font-bold shadow-md hover:bg-[#d1451a] transition-all duration-300 transform hover:scale-[1.02] active:scale-95">
                 <span>Book Now</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
               </Link>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-[#fbfbfd] p-10 sm:p-14 rounded-[40px] border border-gray-100/50 shadow-sm">
             <div className='mb-10'>
               <h2 className='text-[#1d1d1f] text-2xl font-bold tracking-tight mb-2 uppercase'>PACKAGE INCLUDES</h2>
               <div className='w-12 h-1 bg-[#E85222] rounded-full'></div>
             </div>

             <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {investigations.map((item, id) => (
                        <div key={id} className="bg-white border border-gray-100/80 p-5 rounded-2xl text-[14px] text-[#1d1d1f] font-medium uppercase shadow-sm flex items-center gap-4 group/item hover:border-orange-100 transition-colors">
                           <div className="w-2.5 h-2.5 rounded-full bg-orange-500/40 group-hover/item:bg-orange-600 transition-colors"></div>
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
