'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SecondOpinionPage() {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* ─── Hero Section ─── */}
            <section className="relative bg-[#0b1c43] text-white min-h-[300px] md:min-h-[400px] flex items-center z-10">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[#0b1c43] z-0" />
                    <Image
                        src="/second-opinion-hero.png"
                        alt="Second Opinion"
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/90 via-[#0b1c43]/60 to-transparent z-10" />
                </div>
                
                <div className="relative z-20 max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-12 w-full py-16">
                     <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 font-heading tracking-tight drop-shadow-2xl text-white">
                            Second Opinion
                        </h1>
                        <nav className="flex items-center text-sm md:text-lg font-bold tracking-widest uppercase">
                            <Link href="/" className="text-gray-300 hover:text-[#E85222] transition-colors">Home</Link>
                            <span className="mx-4 text-[#E85222] font-black">/</span>
                            <span className="text-white">Second Opinion</span>
                        </nav>
                     </div>
                </div>
            </section>

            {/* ─── Main Content Section ─── */}
            <section className="py-20 md:py-32 bg-[#F8FAFC]">
                <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        
                        {/* Left Side: Text Content */}
                        <div className="lg:col-span-7 space-y-10">
                            <div className="relative">
                                {/* Decorative Element */}
                                <div className="absolute -left-4 top-0 w-1 h-24 bg-[#E85222] rounded-full hidden md:block"></div>
                                
                                <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                                    Why <span className="text-[#2E59A8] not-italic">Second Opinion</span> <br />
                                    Is <span className="text-[#2E59A8] not-italic underline decoration-[#E85222] decoration-4 underline-offset-8">Necessary ?</span>
                                </h2>
                                
                                <div className="mt-8 flex items-center gap-3">
                                    <div className="w-16 h-1.5 bg-[#2E59A8] rounded-full"></div>
                                    <div className="w-3 h-3 bg-[#E85222] rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            <div className="space-y-8 text-[#4a5568] text-lg md:text-xl leading-[1.8] font-medium">
                                <p className="relative">
                                    <span className="absolute -left-8 top-0 text-6xl text-gray-200 font-serif leading-none opacity-50 hidden md:block select-none">“</span>
                                    When your diagnosis reveals a serious or life threatening medical condition and your doctors suggest you to go for a serious or risky medical treatment then having a second opinion can verify your diagnosis and seriousness of your medical condition. Also, it will save you from going through a risky medical procedure which might not have been required.
                                </p>
                                <p className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#2E59A8] italic">
                                    You must have a second opinion when you are already pursuing a medical treatment but there is no significant affect on your medical condition then it is a must to opt for <strong className="text-[#0b1c43] font-black not-italic underline decoration-teal-400">A SECOND OPINION</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:col-span-5">
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
                                {/* Form Header Style from Image (Greyish bg area) */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2E59A8] to-[#E85222]"></div>
                                
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-[#0b1c43] mb-2 font-heading">Get Expert Consultation</h3>
                                    <p className="text-gray-500 text-sm">Fill the form below and our specialists will contact you.</p>
                                </div>

                                <form className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="Enter Name" 
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="Enter Contact No" 
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Department</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 font-semibold appearance-none cursor-pointer"
                                            >
                                                <option disabled selected>Select</option>
                                                <option>Neurosurgery</option>
                                                <option>Gastroenterology</option>
                                                <option>Nephrology</option>
                                                <option>Oncology</option>
                                                <option>Urology</option>
                                                <option>Burns & Plastic Surgery</option>
                                                <option>Laparoscopy & General Surgery</option>
                                                <option>Obstetrics & Gynaecology</option>
                                                <option>Pediatrics And Neonatology</option>
                                                <option>Orthopedics & Joint Replacement</option>
                                                <option>General Medicine</option>
                                                <option>ENT</option>
                                                <option>Ophthalmology</option>
                                                <option>Dental</option>
                                                <option>Pulmonology & Chest/Respiratory Medicine Department</option>
                                                <option>Emergency and Trauma Care</option>
                                                <option>Blood Bank</option>
                                                <option>Ambulance</option>
                                                <option>Preventive Health Check Up</option>
                                                <option>Pharmacy</option>
                                                <option>Pathological Services</option>
                                                <option>Radiological Services</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Your Message</label>
                                        <textarea 
                                            placeholder="Write your query here..." 
                                            rows={3}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold resize-none"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full py-5 bg-[#E85222] hover:bg-[#d1451a] text-white font-black rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(232,82,34,0.3)] text-xl uppercase tracking-widest flex items-center justify-center gap-3"
                                    >
                                        <span>SUBMIT</span>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                </form>
                                
                                {/* Decorative soft blob */}
                                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#2E59A8]/5 rounded-full blur-3xl group-hover:bg-[#E85222]/10 transition-colors duration-700"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
