"use client";
import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-24 sm:py-32">
      <div className="container mx-auto px-6 max-w-[1366px]">
        {/* Top Section with Text & Image Placeholder */}
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

          {/* Right Side: Image Placeholder */}
          <div className="relative w-full aspect-[4/3] lg:aspect-video rounded-tl-[3rem] rounded-br-[3rem] border-4 border-white shadow-xl bg-gray-200 overflow-hidden flex items-center justify-center">
             {/* Placeholder UI */}
             <div className="text-center text-gray-400">
               <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <p className="font-semibold px-4 text-sm md:text-base">User: Please insert your image here</p>
               <p className="text-xs mt-1">Example: src="/images/your-image.jpg"</p>
             </div>
             
             {/* Optional: Actual Next.js Image Component commented out ready for use */}
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
  );
}
