
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oncology (Cancer Care) | Popular Hospital',
  description: 'Comprehensive cancer care centre offering Medical, Surgical, and Radiation Oncology. Expert Tumor Board and dedicated chemotherapy day care.',
};

export default function OncologyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ─── Hero Section (Standardized) ─── */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000"
                alt="Oncology Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-200 text-sm font-semibold mb-6 border border-purple-400/30 backdrop-blur-sm">
                Centre of Excellence
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Comprehensive <br/>
                Cancer Care
              </h1>
              <p className="text-purple-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Fighting cancer with compassion and cutting-edge science. Our multidisciplinary Tumor Board ensures personalized treatment plans for every patient, from diagnosis to survivorship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Meet Our Oncologists
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: Modern Pillars of Oncology (Glassmorphism) ─── */}
      <section className="relative z-20 px-4 mt-10 mb-24">
          <div className="mx-auto w-full max-w-[1366px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Medical Oncology */}
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border-t-4 border-purple-500 transition-all duration-300 group">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Medical Oncology</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          Customized chemotherapy, immunotherapy, and targeted therapy treatments administered in our dedicated day-care chemotherapy suites.
                      </p>
                  </div>

                  {/* Surgical Oncology (Highlighted) */}
                  <div className="bg-[#0b1c43] p-8 rounded-2xl shadow-xl border-t-4 border-orange-500 group">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-orange-500 transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Surgical Oncology</h3>
                      <p className="text-purple-100 leading-relaxed mb-4">
                          Organ-preserving surgeries for complex tumors. Our surgeons specialize in minimally invasive and robotic procedures for faster recovery.
                      </p>
                      <Link href="#" className="text-orange-400 font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all">
                          View Procedures <span className="text-lg">→</span>
                      </Link>
                  </div>

                  {/* Prevention & Screening */}
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border-t-4 border-purple-500 transition-all duration-300 group">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Screening & Prevention</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          Early detection saves lives. Comprehensive screening packages for breast, cervix, prostate, and colon cancers.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── Bento Grid: Multidisciplinary Care ─── */}
      <section className="py-16 px-4">
           <div className="mx-auto w-full max-w-[1366px]">
               <div className="flex flex-col md:flex-row gap-8 items-stretch h-full">
                   
                   {/* Left Side Info Grid */}
                   <div className="md:w-1/2 grid grid-rows-2 gap-8">
                        {/* Tumor Board Box */}
                        <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center">
                             <div className="flex items-start justify-between mb-4">
                                 <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                 </div>
                             </div>
                             <h3 className="text-2xl font-bold text-[#0b1c43] mb-2">Multidisciplinary Tumor Board</h3>
                             <p className="text-gray-600">Every case is discussed by a team of medical, surgical, and radiation oncologists to decide the best treatment path.</p>
                        </div>

                        {/* Technology Box */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center">
                             <div className="flex items-start justify-between mb-4">
                                 <div className="p-3 bg-orange-50 rounded-2xl text-orange-500">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                 </div>
                             </div>
                             <h3 className="text-2xl font-bold text-[#0b1c43] mb-2">Advanced Therapeutics</h3>
                             <p className="text-gray-600">Access to the latest in specialized chemo ports, biological therapies, and hormone treatments.</p>
                        </div>
                   </div>

                   {/* Large Visual Section (Right) */}
                   <div className="md:w-1/2 relative min-h-[500px] rounded-3xl overflow-hidden group">
                        <Image 
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                            alt="Oncology Team"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                             <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Care & Compassion</span>
                             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                 You Are Not Alone
                             </h2>
                             <p className="text-purple-100 text-lg mb-6 max-w-md">
                                 Our dedicated oncology nurses, dieticians, and counselors provide 360-degree support throughout your journey.
                             </p>
                        </div>
                   </div>

               </div>
           </div>
      </section>

      {/* ─── Specific Cancers We Treat ─── */}
      <section className="bg-[#0b1c43] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-purple-300 font-bold tracking-widest text-sm uppercase mb-3 block">Our Expertise</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Specialized Cancer Clinics</h2>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   {[
                       "Breast Cancer", "Lung Cancer", "Colorectal Cancer", "Prostate Cancer",
                       "Oral & Head Neck", "Ovarian/Cervical", "Blood Cancer", "Stomach Cancer"
                   ].map((cancer, idx) => (
                       <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 group cursor-pointer text-center">
                           <div className="w-10 h-10 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white text-white group-hover:text-purple-600">
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </div>
                           <h4 className="text-lg font-bold">{cancer}</h4>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-[1366px] px-4">
              <div className="bg-gradient-to-r from-purple-900 to-[#0b1c43] rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                   
                   <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
                       Hope Starts Here
                   </h2>
                   <p className="text-purple-100 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                       Early diagnosis is the key to cure. If you notice any unusual symptoms, consult our specialists immediately.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                       <Link href="/book" className="bg-white text-[#0b1c43] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg">
                           Book Consultation
                       </Link>
                   </div>
              </div>
          </div>
      </section>
    </main>
  );
}
