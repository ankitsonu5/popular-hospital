
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Respiratory Medicine | Popular Hospital',
  description: 'Specialized lung care including treatment for Asthma, COPD, Lung Cancer, Tuberculosis, and Sleep Apnea. Expert Pulmonologists & Critical Care.',
};

export default function RespiratoryMedicinePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#164e63] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2000"
                alt="Respiratory Medicine Banner"
                fill
                className="object-cover opacity-50 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#164e63] via-[#164e63]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-200 text-sm font-semibold mb-6 border border-cyan-400/30 backdrop-blur-sm">
                Department of Respiratory Medicine
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Breathe Easy, <br/>
                <span className="text-cyan-400">Live Better</span>
              </h1>
              <p className="text-cyan-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Comprehensive pulmonary care for all respiratory conditions. From advanced diagnostics to critical care, we are committed to improving your lung health and quality of life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Our Pulmonologists
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Floating Cards / Features */}
      <section className="relative z-20 px-4 mt-10 mb-24">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Sleep Lab", icon: "activity", desc: "Advanced sleep apnea diagnosis." },
              { title: "Bronchoscopy", icon: "scope", desc: "For detailed lung examination." },
              { title: "ICU Support", icon: "shield", desc: "Specialized respiratory critical care." },
              { title: "Lung Cancer", icon: "plus", desc: "Comprehensive oncology care." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-xl border-t-4 border-cyan-500 bg-white/90 backdrop-blur-md transition-all duration-300 group relative overflow-hidden hover:bg-[#164e63]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-cyan-50 text-[#164e63] group-hover:bg-white/10 group-hover:text-cyan-400">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'activity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      )}
                      {item.icon === 'scope' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      )}
                      {item.icon === 'plus' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                      {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#164e63] group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-cyan-100 transition-colors">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-24 h-24 transform rotate-12 text-[#164e63] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-[#fafafa] overflow-hidden">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image 
                       src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200"
                       alt="Pulmonary Care"
                       width={800}
                       height={600}
                       className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium text-lg">"Advanced care for healthy lungs."</p>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-4 block">World-Class Respiratory Care</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#164e63] mb-6 font-heading leading-tight">
                   Clearer Lungs, <br/>
                    <span className="text-cyan-500">Fuller Life</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Our Department of Respiratory Medicine specializes in the diagnosis and management of diseases affecting the lungs and respiratory tract. With state-of-the-art diagnostic facilities and a dedicated critical care team, we provide holistic care for acute and chronic respiratory conditions.
                </p>
                
                <div className="space-y-6">
                    {[
                        { title: "Modern PFT Lab", desc: "Complete Pulmonary Function Testing for accurate assessment." },
                        { title: "Interstitial Lung Disease", desc: "Specialized clinic for managing fibrosis and scarring." },
                        { title: "Allergy & Immunology", desc: "Comprehensive testing and immunotherapy." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[#164e63] font-bold text-lg">{item.title}</h4>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#164e63] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Expert Pulmonary Solutions</h2>
                   <p className="text-cyan-100 text-lg opacity-90">Specialized treatment plans for a wide range of respiratory disorders.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Asthma & COPD", icon: "wind", desc: "Inhaler technique & long-term management." },
                       { title: "Tuberculosis (TB)", icon: "shield", desc: "DOTS therapy and drug-resistant TB care." },
                       { title: "Pneumonia", icon: "activity", desc: "Acute care for lung infections." },
                       { title: "Sleep Apnea", icon: "moon", desc: "Sleep studies and CPAP/BiPAP titration." },
                       { title: "Lung Cancer", icon: "plus", desc: "Early detection and multidisciplinary care." },
                       { title: "Pleural Effusion", icon: "drop", desc: "Thoracocentesis and drainage procedures." },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-cyan-500/30 pb-6 group cursor-pointer hover:border-cyan-400 transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-cyan-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400 group-hover:text-[#164e63] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'wind' ? "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" : 
                                         service.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" : 
                                         service.icon === 'shield' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" :
                                         service.icon === 'moon' ? "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" :
                                         service.icon === 'drop' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" : 
                                         "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform text-white">{service.title}</h4>
                               <p className="text-cyan-100 text-sm opacity-70">{service.desc}</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-50 py-16">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#164e63] mb-6">Breathe Freely Again</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't let respiratory issues hold you back. Consult our lung specialists today.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#164e63] text-white px-8 py-3 rounded-full font-bold hover:bg-[#155e75] transition-colors shadow-lg">
                    Book Consultation
                </Link>
                <a href="tel:1800123456" className="bg-white text-[#164e63] px-8 py-3 rounded-full font-bold border-2 border-[#164e63] hover:bg-gray-50 transition-colors">
                    Call 1800-123-456
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
