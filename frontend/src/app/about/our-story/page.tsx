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
      <section className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center pt-32 pb-16 md:py-24">
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
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E85222]/20 text-[#E85222] border border-[#E85222]/30 text-[10px] md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 backdrop-blur-sm">
            Est. 1994
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-heading tracking-tight drop-shadow-lg">
            Our Legacy of Care
          </h1>
          <p className="text-sm md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-light">
            POPULAR HOSPITAL(a Unit of POPULAR MEDICARE LTD), one of Varanasi&apos;s best Multi Super Speciality Hospital that redefines standards of excellence in healthcare delivery by bringing together the best of infrastructure, technology, training, education and medical intelligentsia.
          </p>
        </div>
      </section>

      {/* ─── Timeline & Narrative Combined Section (50-50 Split) ─── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Side: Transformation History Image (50%) */}
            <div className="relative order-2 lg:order-1">
               <div className="w-full relative rounded-2xl shadow-sm border border-gray-100 bg-white group overflow-hidden">
                  <div className="relative w-full h-full p-4 md:p-8">
                    <Image 
                      src="/images/about_popular/transformation-history.jpg" 
                      alt="The Transformation-History of Popular Hospital" 
                      width={1000} 
                      height={700} 
                      className="w-full h-auto object-contain transform transition-transform duration-700"
                      priority
                    />
                  </div>
               </div>
            </div>

            {/* Right Side: Narrative (50%) */}
            <div className="relative order-1 lg:order-2">
               {/* Content Card */}
               <div className="bg-white p-6 md:p-10 rounded-2xl relative z-10">
                 
                 {/* Top Accent Line */}
                 <div className="w-16 h-1 bg-gradient-to-r from-[#E85222] to-[#fd7e56] rounded-full mb-8"></div>
                 
                  <div className="space-y-6 text-[#4a5568] text-[16px] md:text-[18px] leading-relaxed font-medium">
                    <p className="text-justify md:text-left">
                      <span className="text-[#0b1c43] font-bold">POPULAR HOSPITAL</span> is a 450 bedded Multi Super Speciality Hospital in Varanasi providing all kinds of Medical, Surgical & Diagnostic services to the patients of Eastern UP, Bihar, Jharkhand, Chhattisgarh and MP for more than 32+ years. We provide best services in one roof like Cardiology, Nephrology, Medicine, General Surgery, Neurology, Obs & Gynecology, Urology, Oncology, Pediatric, Orthopedic, ENT, Dental department.
                    </p>
                    <p className="text-justify md:text-left">
                      We are having ultramodern facilities of Cath Lab, ICU, CCU, MICU, SICU, NICU, PICU, Deluxe Room, Private Room, and General Ward etc. In Diagnostics we have well equipped Pathology lab, CT-Scan, MRI, Mammography Machine, Digital X-ray, USG, TMT, Colour Doppler, 2D Echo, DSC, STRESS ECHO, PFT, ECG and EEG.
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
               POPULAR HOSPITAL (a Unit of POPULAR MEDICARE LTD), one of Varanasi's best Multi Super Speciality Hospital that redefines standards of excellence in healthcare delivery by bringing together the best of infrastructure, technology, training, education and medical intelligentsia.
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

  const progress = stat.value > 0 ? count / stat.value : 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div ref={countRef} className="flex flex-col items-center group">
      <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mb-6 transition-all duration-700">
        {/* SVG Progress Circle */}
        <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
          {/* Track Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#E85222"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 150ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            strokeLinecap="round"
          />
        </svg>

        <div className="text-4xl md:text-5xl lg:text-5xl font-bold font-heading z-10 text-[#E85222] transition-transform duration-300">
          {count}{stat.suffix}
        </div>
      </div>
      <div className="text-xs md:text-sm text-gray-300 font-bold tracking-wider uppercase text-center max-w-[160px] leading-tight group-hover:text-white transition-colors duration-300">
        {stat.label}
      </div>
    </div>
  );
}
