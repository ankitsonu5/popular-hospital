"use client";

import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans">  
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10 md:py-12 mt-[110px] md:mt-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about_popular/banner-our-legacy.webp"
            alt="About Us Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/60 via-[#0b1c43]/40 to-[#0b1c43]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-heading tracking-tight drop-shadow-lg uppercase">
            About Us
          </h1>
        </div>
      </section>

      <div className="py-24 sm:py-32">
        <div className="container mx-auto px-6 max-w-[1366px]">
          {/* Top Section with Text & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side: Headings */}
            <div className="flex flex-col justify-center">
              <h2 className="flex items-center text-2xl sm:text-3xl font-black text-[#1e3a8a] mb-6 uppercase tracking-wider font-heading">
                <span className="mr-3 text-3xl">🏥</span> 
                WELCOME TO POPULAR HOSPITAL
              </h2>
              <p className="text-gray-900 font-bold italic text-lg sm:text-xl md:text-2xl leading-relaxed font-heading">
                POPULAR HOSPITAL<span className="font-semibold italic">(a Unit of POPULAR MEDICARE LTD)</span>, 
                one of Varanasi's best Multi Super Speciality Hospital that redefines standards of excellence in healthcare 
                delivery by bringing together the best of infrastructure, technology, training, education and medical intelligentsia.
              </p>
            </div>

            {/* Right Side: Actual Image */}
            <div className="relative w-full aspect-[4/3] lg:aspect-video rounded-tl-[3rem] rounded-br-[3rem] border-4 border-white shadow-xl bg-gray-200 overflow-hidden flex items-center justify-center">
              <Image 
                src="/images/branches/varanasi-main/1.webp" 
                alt="Popular Hospital" 
                fill 
                className="object-cover" 
              /> 
            </div>
          </div>

          {/* Bottom Section: Paragraphs */}
          <div className="space-y-6 max-w-5xl text-gray-600 text-[15px] sm:text-[17px] leading-relaxed font-medium">
            <p>
              POPULAR HOSPITAL is a 450 bedded Super Speciality Hospital in Varanasi providing all kinds of Medical, Surgical &amp; Diagnostic services to the patients of Eastern UP, Bihar, Jharkhand, Chhattisgarh and MP for more than 31 years. We provide best services in one roof like Cardiology, Nephrology, Medicine, General Surgery, Neurology, Obs &amp; Gynecology, Urology, Oncology, Pediatric, Orthopedic, ENT, Dental department.
            </p>
            <p>
              We are having ultramodern facilities of Cath Lab, ICU, CCU, MICU, SICU, NICU, PICU, Deluxe Room, Private Room, and General Ward etc. In Diagnostics we have well equipped Pathology lab, CT-Scan, MRI, Mammography Machine, Digital X-ray, USG, TMT, Colour Doppler, 2D Echo, DSC, STRESS ECHO, PFT, ECG and EEG.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
