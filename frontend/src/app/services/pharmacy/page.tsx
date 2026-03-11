import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pharmacy | Popular Hospital',
  description: '100% authentic and genuine medicines available 24/7 under strict quality control to fulfill patient emergency needs.',
};

export default function PharmacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pharmacy.png"
            alt="Pharmacy"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Pharmacy
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Pharmacy</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/40 rounded-l-[10rem] -z-10 hidden lg:block"></div>
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              
              {/* Text Content */}
              <div className="w-full lg:w-3/5 prose prose-lg prose-blue max-w-none">
                 <div className="flex items-center gap-4 mb-8">
                     <span className="w-12 h-1 bg-teal-500 rounded-full inline-block"></span>
                     <h2 className="text-3xl font-black text-[#0b1c43] font-heading m-0 leading-none">Our Commitment</h2>
                 </div>
                 
                 <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                   Popular Hospital Pharmacy is situated in the campus of all the hospitals to facilitate patients fulfilling their emergency needs as well as the medicines as prescribed inside the hospital premises.
                 </p>
                 
                 <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                   In line with rules and regulations and under the strict supervision of authorities and the Drug Controller. We are committed to achieve and maintain excellent standards of pharmaceutical care to deliver the right medicines with best price. We continually seek ways to improve our offering and services, what we deliver to our clients. We believe in providing high quality, authentic and 100% genuine products to our customers. We have highly skilled and qualified employees who regularly perform the quality check.
                 </p>
                 
                 <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                   Our entire inventory is centrally managed by highly skilled workers. These skilled and qualified workers are dedicated to maintain sufficient stock, dispose of any damaged/expired medicines and other inventory control processes. All the medicines and other health care products being sold at Popular Medical Stores are purchased from their authorized companies and its distributors. This rules out spurious, duplicate, and expired drugs completely for safe-guarding the interest and health of customers.
                 </p>
              </div>

              {/* Image & Highlight Graphic */}
              <div className="w-full lg:w-2/5 relative">
                 <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white group">
                    <Image
                       src="https://images.unsplash.com/photo-1576602976047-174e5c2084c6?auto=format&fit=crop&q=80&w=800"
                       alt="Pharmacy Inventory"
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/80 via-transparent to-transparent"></div>
                 </div>

                 {/* Floating Feature cards */}
                 <div className="absolute -bottom-10 -left-6 sm:-left-12 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-teal-50 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <div>
                       <p className="text-[#0b1c43] font-bold text-sm">100% Genuine</p>
                       <p className="text-gray-500 text-xs">Medical Products</p>
                    </div>
                 </div>

                 <div className="absolute top-10 -right-6 sm:-right-8 bg-[#0b1c43] p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-blue-900 border-opacity-50">
                    <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center flex-shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                       <p className="text-white font-bold text-sm">24/7 Support</p>
                       <p className="text-blue-200 text-xs">Emergency Needs</p>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* Trust factors section */}
      <section className="bg-[#f8fafd] py-16 border-t border-gray-100">
         <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { title: "Strict Supervision", desc: "Monitored by authorities and Drug Controller", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                 { title: "Best Price", desc: "Right medicines procured directly from authorized distributors", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                 { title: "Quality Check", desc: "Regular evaluation of stock to discard expired items", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
                 { title: "Safe Inventory", desc: "No spurious or duplicate drugs safeguarding patient health", icon: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" }
               ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                     </div>
                     <h4 className="text-[#0b1c43] font-bold text-lg mb-2">{item.title}</h4>
                     <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
