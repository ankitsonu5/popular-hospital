import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Women\'s Health Special | Popular Hospital',
  description: 'Specialized Women\'s Health care at Popular Hospital. Comprehensive treatments prioritizing the health of women at every stage of life.',
};

const WomensHealthPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-pink-500 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute inset-0 z-0 opacity-85">
          <Image
            src="/images/womens-health-special.png"
            alt="Women's Health background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 via-pink-600/30 to-transparent z-0"></div>
        <div className="container mx-auto max-w-[1366px] relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-black uppercase tracking-widest mb-6">Exclusive Women's Care</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-heading leading-tight italic animate-fade-in-up">
              Women's <span className="text-pink-200 text-outline">Health</span> Special
            </h1>
            <p className="text-xl md:text-2xl text-pink-50 mb-10 leading-relaxed font-medium">
              A dedicated healthcare initiative by Popular Hospital, focusing on the specialized needs of women at every stage of life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#apply" className="px-8 py-4 bg-white text-pink-600 rounded-full font-black hover:bg-pink-50 transition-all shadow-xl uppercase tracking-widest text-sm">
                Apply for Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-[1366px] relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">Specialized <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Care Benefits</span></h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">With the Health Fit Card, we ensure that every woman receives the priority attention and medical support she deserves.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Pregnant Women */}
            <div className="group">
                <div className="bg-white rounded-[4rem] p-12 shadow-[0_30px_60px_-15px_rgba(236,72,153,0.1)] border border-pink-50 hover:border-pink-300 transition-all duration-700 relative overflow-hidden h-full">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-50 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl mb-10 shadow-2xl shadow-pink-200 transform group-hover:rotate-6 transition-transform">🤰</div>
                        <h3 className="text-3xl font-black text-[#0b1c43] mb-8 font-heading italic">For Pregnant Women</h3>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 bg-pink-50/30 p-6 rounded-3xl border border-pink-100/50">
                                <span className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center flex-shrink-0 font-black shadow-lg">01</span>
                                <p className="text-gray-700 font-bold text-lg leading-relaxed">Free first Antenatal Checkup for pregnant women during nine months of pregnancy.</p>
                            </div>
                            <div className="bg-white p-8 rounded-[3rem] border border-pink-100 shadow-inner">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 font-black">02</span>
                                    <h4 className="text-xl font-black text-[#0b1c43]">Free Essential Blood Tests:</h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['Blood Grouping', 'TSH Level', 'Random Blood Sugar', 'Hb Percentage'].map((item) => (
                                        <div key={item} className="flex items-center gap-3 text-gray-600 font-bold bg-slate-50 px-5 py-4 rounded-2xl border border-slate-100 group-hover:border-pink-200 transition-colors">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* For Non-Pregnant Women */}
            <div className="group h-full">
                <div className="bg-white rounded-[4rem] p-12 shadow-[0_30px_60px_-15px_rgba(20,184,166,0.1)] border border-teal-50 hover:border-hospital-teal/30 transition-all duration-700 relative overflow-hidden h-full">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-50 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-hospital-teal to-blue-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl mb-10 shadow-2xl shadow-teal-100 transform group-hover:-rotate-6 transition-transform">👩‍💼</div>
                        <h3 className="text-3xl font-black text-[#0b1c43] mb-2 font-heading italic">For Non-Pregnant Women</h3>
                        <p className="text-hospital-teal text-sm font-black uppercase tracking-[0.2em] mb-10 opacity-80">(Recommended for 35+ Years of Age)</p>
                        <div className="space-y-4">
                            {[
                                { title: "Pap Smear once in a Year", icon: "🔬" },
                                { title: "Colposcopy once in year", icon: "🩺" },
                                { title: "Urine RM Analysis", icon: "🧪" },
                                { title: "Random Blood Sugar", icon: "🩸" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-teal-50/50 hover:border-teal-100 transition-all group/item">
                                    <div className="flex items-center gap-5">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-lg font-bold text-gray-700">{item.title}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-hospital-teal text-white flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center bg-pink-50 rounded-[4rem] p-12 md:p-20 border-2 border-dashed border-pink-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-pink-100 rounded-br-full opacity-50"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] mb-8 font-heading">Secure her health with the <span className="text-pink-500">Health Fit Card</span></h2>
                <p className="text-xl text-gray-600 mb-12 font-medium">Protect the most important women in your life with a Health Fit Card. Apply today for priority and specialized care.</p>
                <Link href="/services/wellness#apply" className="inline-block px-12 py-5 bg-pink-500 text-white rounded-2xl font-black hover:bg-pink-600 transition-all shadow-2xl shadow-pink-200 uppercase tracking-widest">
                    Apply for Health Fit Card
                </Link>
            </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto max-w-[1366px]">
          <p className="text-gray-400 text-sm leading-relaxed text-center max-w-4xl mx-auto italic">
            * Popular Women's Health Special benefits are part of the Health Fit Card membership program. Screening frequency and eligibility are subject to medical evaluation by our certified specialists.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WomensHealthPage;
