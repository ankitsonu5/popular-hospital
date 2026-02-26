
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gastroenterology & Hepatology | Popular Hospital',
  description: 'Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment.',
};

export default function GastroenterologyPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* ─── Hero Section (Standardized) ─── */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=2000"
                alt="Gastroenterology Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold mb-6 border border-emerald-400/30 backdrop-blur-sm">
                Centre of Excellence
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Digestive Health & <br/>
                Liver Sciences
              </h1>
              <p className="text-emerald-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Comprehensive care for the entire digestive tract. From advanced endoscopy to complex hepatobiliary surgeries, we ensure holistic wellness for your digestive system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Find a Specialist
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: Modern Overlapping "Glass" Service Grid ─── */}
      <section className="relative z-20 px-4 mt-10 mb-24">
          <div className="mx-auto w-full max-w-[1366px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white/90 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 transition-all duration-300">
                      <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Clinical Gastro</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          Expert diagnosis and treatment for GERD, IBD, IBS, Ulcers, and H. Pylori infections using evidence-based protocols.
                      </p>
                      <Link href="#" className="text-emerald-600 font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all">
                          Read More <span className="text-lg">→</span>
                      </Link>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#0b1c43] p-6 lg:p-8 rounded-2xl shadow-xl border-t-4 border-orange-500">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Liver Clinic</h3>
                      <p className="text-blue-100 leading-relaxed mb-4">
                          Specialized care for Fatty Liver, Hepatitis, Cirrhosis, and Liver Failure. We offer comprehensive pre & post-transplant support.
                      </p>
                      <Link href="#" className="text-orange-400 font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all">
                          Explore Liver Care <span className="text-lg">→</span>
                      </Link>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/90 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 transition-all duration-300">
                      <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Advanced Endoscopy</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          State-of-the-art diagnostic and therapeutic endoscopy, colonoscopy, and ERCPs performed by senior experts.
                      </p>
                      <Link href="#" className="text-emerald-600 font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all">
                          View Procedures <span className="text-lg">→</span>
                      </Link>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── NEW: "Bento" Style Feature Grid ─── */}
      <section className="py-16 px-4">
           <div className="mx-auto w-full max-w-[1366px]">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch h-full">
                   
                   {/* Large Visual Section */}
                    <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden group">
                        <Image 
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                            alt="Advanced OT"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12">
                             <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Technology</span>
                             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                 World-Class Endoscopy Suites
                             </h2>
                             <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-6 max-w-md">
                                 Equipped with high-definition imaging and NBI technology for early cancer detection and precise interventions.
                             </p>
                             <button className="bg-white text-[#0b1c43] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                 Tour Our Facilities
                             </button>
                        </div>
                   </div>

                   {/* Right Side Grid */}
                   <div className="lg:w-1/2 grid grid-rows-2 gap-6 lg:gap-8">
                        {/* Box 1 */}
                        <div className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center">
                             <div className="flex items-start justify-between mb-4">
                                 <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                 </div>
                                 <span className="text-5xl font-bold text-gray-100">01</span>
                             </div>
                             <h3 className="text-xl lg:text-2xl font-bold text-[#0b1c43] mb-2">GI Oncology</h3>
                             <p className="text-gray-600 text-sm lg:text-base">Specialized multidisciplinary care for cancers of the esophagus, stomach, colon, liver, and pancreas.</p>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-[#0b1c43] p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-center">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                             <div className="flex items-start justify-between mb-4 relative z-10">
                                 <div className="p-3 bg-white/10 rounded-2xl text-white">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                 </div>
                                 <span className="text-5xl font-bold text-white/10">02</span>
                             </div>
                             <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 relative z-10">Emergency GI Care</h3>
                             <p className="text-blue-100 relative z-10 text-sm lg:text-base">24/7 management of GI bleeding, acute pancreatitis, and foreign body removal.</p>
                        </div>
                   </div>
               </div>
           </div>
      </section>

      {/* ─── Conditions We Treat ─── */}
      <section className="bg-gray-100 py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1366px] px-4 mb-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-[0.15em] md:tracking-[0.2em]">Common Conditions We Treat</h2>
          </div>
          <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {[
                  "Acid Reflux (GERD)", "Chronic Constipation", "Irritable Bowel Syndrome (IBS)", "Fatty Liver Disease",
                  "Gallstones", "Crohn's Disease", "Ulcerative Colitis", "Pancreatitis", "Hemorrhoids", "Celiac Disease"
                ].map((item, i) => (
                    <span key={i} className="text-sm md:text-base lg:text-lg font-bold text-[#0b1c43] px-5 md:px-6 lg:px-8 py-3 lg:py-4 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-default">
                        {item}
                    </span>
                ))}
            </div>
          </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-[1366px] px-4">
              <div className="bg-[#004d61] rounded-2xl md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                   </div>
                   
                   <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
                       Prioritize Your Gut Health
                   </h2>
                   <p className="text-emerald-50 text-base md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                       Digestive health is the foundation of overall wellness. Schedule a check-up with our leading gastroenterologists today.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                       <Link href="/book" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-900/20">
                           Book an Appointment
                       </Link>
                       <a href="tel:+917800001895" className="bg-transparent border-2 border-emerald-500/50 text-white hover:bg-emerald-900/30 px-8 py-4 rounded-full font-bold text-lg transition-all">
                           Call +91-7800001895
                       </a>
                   </div>
              </div>
          </div>
      </section>
    </main>
  );
}
