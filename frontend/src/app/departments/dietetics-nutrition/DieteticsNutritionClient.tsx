'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  { 
    title: 'Weight Management', 
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    desc: 'Scientific approach to sustainable weight loss and healthy weight gain.'
  },
  { 
    title: 'Clinical Nutrition', 
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    desc: 'Specialized medical nutrition therapy for various clinical conditions.' 
  },
  { 
    title: 'Diabetes Diet', 
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    desc: 'Personalized meal planning for blood sugar control and management.' 
  },
  { 
    title: 'Child Nutrition', 
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    desc: 'Healthy eating patterns for proper growth and development in children.' 
  },
];

const dietPlans = [
  { 
    title: 'Therapeutic Diets', 
    items: ['Renal Care Diet', 'Cardiac Health Diet', 'Post-Surgery Recovery', 'Gastrointestinal Support'] 
  },
  { 
    title: 'Wellness Programs', 
    items: ['Antenatal Nutrition', 'Elderly Care Diet', 'Sports Nutrition', 'General Fitness Plan'] 
  },
  { 
    title: 'Specialized Plans', 
    items: ['Gluten-Free Diet', 'Ketogenic (Medically Supervised)', 'High Protein Diet', 'Low Sodium Diet'] 
  }
];

const doctors = [
  {
    name: 'Mrs. Nutrition Specialist',
    qualifications: 'MSc. (Food & Nutrition), RD',
    designation: 'Sr. Clinical Dietitian',
    slug: 'dietetics-specialist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#064e3b] font-heading">
      {title} <span className="text-emerald-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-emerald-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-emerald-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

export default function DieteticsNutritionClient() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[450px] w-full bg-[#064e3b] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/dietetics_nutrition.png"
            alt="Dietetics and Nutrition Center"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-[#064e3b]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold mb-6 border border-emerald-400/30 backdrop-blur-sm">
              Nourishing Health Professionally
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Dietetics & <br />
              <span className="text-emerald-400">Nutrition</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Dietetics & Nutrition" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  The Dietetics & Nutrition department at Popular Hospital focuses on the prevention and management of diseases through professional nutritional guidance. Our clinical nutritionists work closely with the medical team to provide nutrition therapy for patients across all specialties.
                </p>
                <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-600">
                  <p>
                    We understand that every individual is unique. Our expert dietitians create personalized, evidence-based nutrition plans tailored to your lifestyle, medical history, and health goals, ensuring optimal recovery and long-term wellness.
                  </p>
                </div>
                <p>
                  "Let food be thy medicine and medicine be thy food." This philosophy drives our approach to health, emphasizing the power of balanced nutrition in restoring vital health and increasing the quality of life.
                </p>
              </div>

              <SectionHeader title="Our" highlight="Core Highlights" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  { title: "Personalized Assessment", desc: "Detailed analysis of current diet and health markers." },
                  { title: "Clinical Support", desc: "Specialized diets for renal, cardiac, and diabetic patients." },
                  { title: "Lifestyle Coaching", desc: "Focus on sustainable healthy eating habits." },
                  { title: "Wellness Training", desc: "Nutritional education for preventive care." }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30 group hover:border-emerald-300 transition-colors">
                    <h4 className="font-bold text-[#064e3b] mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Doctor Card (4 cols) with Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  {/* Floating Appointment Button */}
                  <Link 
                    href="/doctors" 
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>
                  
                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                              <Image
                                src={doc.image}
                                alt={doc.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <Link 
                                href={`/doctors/${doc.slug}`} 
                                className="absolute inset-0 bg-emerald-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                              >
                                <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-emerald-600 transition-all uppercase text-sm">
                                  View Full Profile
                                </span>
                              </Link>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-emerald-600 mb-1 font-heading">{doc.name}</h3>
                              <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doc.qualifications}</p>
                              <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ DIET CATEGORIES ═══════ */}
      <section className="py-24 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center mb-16">
          <SectionHeader title="Our Nutritional" highlight="Services" />
          <p className="text-gray-500 max-w-2xl mx-auto -mt-4">Comprehensive nutrition plans tailored for medical needs and wellness goals.</p>
        </div>

        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dietPlans.map((box, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <h4 className="text-2xl font-bold text-[#064e3b] mb-6 font-heading group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{box.title}</h4>
                <ul className="space-y-4">
                  {box.items.map((item, j) => (
                    <ListItem key={j} text={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#064e3b] rounded-2xl md:rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            
            <div className="relative z-10">
              <span className="inline-block bg-emerald-500/20 text-emerald-100 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-emerald-400/20 uppercase tracking-widest">
                Partner in your wellness journey
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Listening to Your Body <br className="hidden md:block" /> Nourishing with Expertise
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                <Link
                  href="/doctors"
                  className="bg-emerald-600 text-white hover:bg-emerald-500 px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+917800001895"
                  className="bg-transparent border-2 border-emerald-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  +91-7800001895 / 96
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
