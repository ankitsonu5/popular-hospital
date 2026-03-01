'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function OurStoryPage() {
  const stats = [
    { label: "Years of Service", value: 32, suffix: "+" },
    { label: "Patients Treated", value: 2, suffix: "M+" },
    { label: "Expert Doctors", value: 50, suffix: "+" },
    { label: "Specialties", value: 30, suffix: "+" },
  ];
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about_popular/banner-our-legacy.webp"
            alt="Hospital History Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/60 via-[#0b1c43]/40 to-[#0b1c43]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E85222]/20 text-[#E85222] border border-[#E85222]/30 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Est. 1994
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight drop-shadow-lg">
            Our Legacy of Care
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
            From a small clinic to a healthcare ecosystem. A journey defined by compassion, innovation, and an unwavering commitment to the community.
          </p>
        </div>
      </section>


      
      {/* ─── Legacy Timeline (Horizontal) ─── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b1c43] font-heading tracking-tight mb-6">
              Our Milestones
            </h2>
            <div className="w-24 md:w-32 h-1.5 md:h-2 bg-[#E85222] rounded-full mx-auto mb-6"></div>
          </div>

          <div className="relative mt-8">
             {/* Main Horizontal Line (Desktop only) */}
             <div className="hidden md:block absolute top-[210px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 z-0"></div>
             
             {/* Mobile Vertical Line */}
             <div className="md:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-gray-100 z-0"></div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10 w-full max-w-5xl mx-auto px-4 md:px-0">
                
                {/* 1994 */}
                <div className="relative flex flex-col items-center group">
                   {/* Image Top */}
                   <div className="w-full max-w-[260px] h-[180px] relative mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-[#f8fafc] flex items-center justify-center p-3">
                      <Image src="/legacy/legacy-one.png" alt="1994 Timeline" fill className="object-contain p-4 transform group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm">
                         <p className="text-[#E85222] text-[10px] font-bold uppercase tracking-widest">Early Foundation</p>
                      </div>
                   </div>

                   {/* Center Node & Year */}
                   <div className="flex flex-col items-center relative">
                      {/* Orange Dot */}
                      <div className="w-4 h-4 bg-[#E85222] rounded-full ring-[8px] ring-white shadow-sm z-20 group-hover:scale-150 transition-transform duration-300 relative"></div>
                      {/* Year */}
                      <h3 className="mt-4 text-2xl md:text-3xl font-black text-[#0b1c43] tracking-tighter bg-white px-2">1994</h3>
                   </div>

                   {/* Content Bottom */}
                   <div className="mt-5 bg-gray-50 p-6 rounded-2xl border border-gray-100/60 shadow-sm transition-all duration-300 w-full text-left min-h-[120px] flex flex-col justify-center gap-3">
                      <div className="flex items-start gap-2">
                          <span className="text-[#E85222] font-black text-sm">01.</span>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">Early Foundation: Safe childbirth & ethical surgery</span>
                      </div>
                      <div className="flex items-start gap-2">
                          <span className="text-[#E85222] font-black text-sm">02.</span>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">Rise of NICU, ICU, advanced gynecology</span>
                      </div>
                      <div className="flex items-start gap-2">
                          <span className="text-[#E85222] font-black text-sm">03.</span>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">2010s – Robotics, IVF, Ortho, Cosmetic</span>
                      </div>
                   </div>
                </div>

                {/* Today */}
                <div className="relative flex flex-col items-center group">
                   {/* Image Top */}
                   <div className="w-full max-w-[260px] h-[180px] relative mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-gray-100 bg-[#f8fafc] flex items-center justify-center p-3">
                      <Image src="/legacy/legacy-three.jpg" alt="Today Timeline" fill className="object-contain p-4 transform group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm">
                         <p className="text-[#E85222] text-[10px] font-bold uppercase tracking-widest">Modern Healthcare</p>
                      </div>
                   </div>

                   {/* Center Node & Year */}
                   <div className="flex flex-col items-center relative">
                      {/* Orange Dot */}
                      <div className="w-4 h-4 bg-[#E85222] rounded-full ring-[8px] ring-white shadow-sm z-20 group-hover:scale-150 transition-transform duration-300 relative"></div>
                      {/* Year */}
                      <h3 className="mt-4 text-2xl md:text-3xl font-black text-[#0b1c43] tracking-tighter bg-white px-2">Today</h3>
                   </div>

                   {/* Content Bottom */}
                   <div className="mt-5 bg-gray-50 p-5 rounded-2xl border border-gray-100/60 shadow-sm transition-all duration-300 w-full text-center min-h-[100px] flex items-center justify-center">
                      <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                         A trusted healing destination for thousands
                      </p>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section (Animated on Scroll) ─── */}
      <section className="py-16 bg-[#0b1c43] text-white">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <StatCounter key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>


      {/* ─── Philosophy/CTA ─── */}
      <section className="py-24 bg-white">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] mb-8 font-heading">
               The Journey Continues
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
               While we are proud of our history, our eyes are firmly set on the future. We continue to invest in the latest technology, recruit the best minds, and expand our reach, because for us, healthcare is not a business—it’s a calling.
            </p>
            <div className="w-24 h-1 bg-[#E85222] mx-auto rounded-full"></div>
         </div>
      </section>

    </div>
  );
}

// Subcomponent to handle the counting animation when scrolled into view
function StatCounter({ stat }: { stat: { label: string; value: number; suffix: string } }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect after first trigger to run animation only once
          if (countRef.current) observer.unobserve(countRef.current);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = countRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000; // 2 seconds animation
    const targetValue = stat.value;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const nextCount = Math.min(
        Math.floor((progress / duration) * targetValue),
        targetValue
      );
      
      setCount(nextCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, stat.value]);

  return (
    <div ref={countRef} className="text-center group">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E85222] mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm md:text-base text-gray-300 font-medium tracking-wider uppercase">
        {stat.label}
      </div>
    </div>
  );
}
