import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preventive Health Check Up | Popular Hospital',
  description: 'Comprehensive health check-up packages designed for all age groups and health needs.',
};

const packages = [
  { title: "BRONZE PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "7270.00", discountPrice: "3999.00", image: "https://images.unsplash.com/photo-1534030638531-df2cfbdc37e5?w=500&auto=format&fit=crop&q=60" },
  { title: "BRONZE PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "8180.00", discountPrice: "4499.00", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60" },
  { title: "SILVER PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "12725.00", discountPrice: "6999.00", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60" },
  { title: "SILVER PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "13640.00", discountPrice: "7499.00", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" },
  { title: "GOLD PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "19090.00", discountPrice: "10499.00", image: "https://images.unsplash.com/photo-1555617781-ebd4795329ce?w=500&auto=format&fit=crop&q=60" },
  { title: "GOLD PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "20900.00", discountPrice: "11499.00", image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=500&auto=format&fit=crop&q=60" },
  { title: "DIAMOND PACKAGE - MEN", age: "18-65 Yrs.", originalPrice: "29090.00", discountPrice: "15999.00", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60" },
  { title: "DIAMOND PACKAGE - WOMEN", age: "18-65 Yrs.", originalPrice: "30900.00", discountPrice: "16999.00", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60" },
  { title: "HEALTHY YOUNG ONES", age: "5-18 Yrs.", originalPrice: "5450.00", discountPrice: "2999.00", image: "https://images.unsplash.com/photo-1557002666-acda6a77d544?w=500&auto=format&fit=crop&q=60" },
  { title: "HEALTHY LUNGS HEALTH CHECK-UP", age: "18-65 Yrs.", originalPrice: "5270.00", discountPrice: "2799.00", image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500&auto=format&fit=crop&q=60" },
  { title: "OBESITY CHECK-UP", age: "18-65 Yrs.", originalPrice: "12500.00", discountPrice: "7499.00", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60" },
  { title: "CARDIAC HEALTH PACKAGE", age: "18-65 Yrs.", originalPrice: "10050.00", discountPrice: "5499.00", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60" },
  { title: "BASIC CARDIAC SCREENING PACKAGE", age: "18-65 Yrs.", originalPrice: "6350.00", discountPrice: "3499.00", image: "https://images.unsplash.com/photo-1551076805-e18690c5e561?w=500&auto=format&fit=crop&q=60" },
  { title: "CARDIAC ADVANCED CARE PACKAGE", age: "18-65 Yrs.", originalPrice: "18180.00", discountPrice: "8999.00", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&auto=format&fit=crop&q=60" },
  { title: "DIABETIC CHECK", age: "18-65 Yrs.", originalPrice: "9090.00", discountPrice: "4999.00", image: "https://images.unsplash.com/photo-1579306194872-6edca24a520e?w=500&auto=format&fit=crop&q=60" },
  { title: "DIABETIC CHECK-EXTENDED", age: "18-65 Yrs.", originalPrice: "13650.00", discountPrice: "7499.00", image: "https://images.unsplash.com/photo-1618251216669-e0d08a0d9b54?w=500&auto=format&fit=crop&q=60" }
];

export default function PreventiveHealthPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#0b1c43] to-[#122e66]">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/clean-texturing.png')] mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 w-full text-center md:text-left">
            <nav className="flex mb-4 text-sm text-blue-200 font-medium tracking-wide justify-center md:justify-start" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2 text-blue-400">/</span>
              <span className="hover:text-white transition-colors">Services</span>
              <span className="mx-2 text-blue-400">/</span>
              <span className="text-teal-400">Preventive Health</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight leading-tight">
              Preventive Health <br /> <span className="text-teal-400">Check-up Packages</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto md:mx-0 mb-8 font-light">
              Prioritize your health with our comprehensive and affordable health screening packages tailored for individuals of all ages. Prevention is better than cure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="tel:+917800001895" className="px-8 py-3.5 bg-white text-[#0b1c43] rounded-full font-bold hover:bg-teal-50 hover:text-teal-700 transition-all shadow-lg flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Book Appointment
              </a>
            </div>
          </div>
          <div className="flex-1 hidden md:flex items-center justify-center relative">
            <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-8 border-white/10 shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1542868727-b5cc8571ded9?auto=format&fit=crop&q=80&w=800"
                    alt="Preventive Health"
                    fill
                    className="object-cover"
                />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1366px] mx-auto">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[32px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group relative w-full overflow-hidden"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] sm:aspect-square relative mb-8 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Hover Overlay with Book Now button */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-[#1d1d1f] px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Book Now
                        </span>
                    </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-[#bf4800] text-[12px] font-bold tracking-tight mb-2 uppercase">
                    Recommended: {pkg.age}
                  </span>
                  
                  <h3 className="text-[#1d1d1f] font-semibold text-[17px] sm:text-[19px] tracking-tight leading-snug mb-6">
                    {pkg.title}
                  </h3>

                  <div className="mt-auto border-t border-gray-50 pt-4">
                      <div className="text-[#1d1d1f] text-[15px] sm:text-[16px] font-medium tracking-tight mb-1">
                          After Discount: ₹ {parseInt(pkg.discountPrice).toFixed(2)}
                      </div>
                      <div className="text-[#86868b] text-[13px] font-medium tracking-tight">
                          Package Price: <span className="line-through">₹ {parseInt(pkg.originalPrice).toFixed(2)}</span>
                      </div>
                  </div>
                </div>

                {/* Make entire card clickable */}
                <Link 
                  href={`/services/preventive-health/${pkg.title.toLowerCase().replace(/\s*-\s*/g, '-').replace(/\s+/g, '-')}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View details for ${pkg.title}`}
                />
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
