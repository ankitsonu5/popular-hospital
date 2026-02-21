
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laparoscopy & General Surgery | Popular Hospital',
  description: 'Advanced laparoscopic (keyhole) and general surgical procedures with state-of-the-art technology and expert surgeons.',
};

export default function GeneralSurgeryPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000"
                alt="General Surgery Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold mb-6 border border-emerald-400/30 backdrop-blur-sm">
                Department of General Surgery
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Advanced Laparoscopy & <br/>
                <span className="text-emerald-400">Minimal Access Surgery</span>
              </h1>
              <p className="text-emerald-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Pioneering minimally invasive surgical techniques for faster recovery, less pain, and minimal scarring. From routine procedures to complex abdominal surgeries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Our Surgeons
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
              { title: "Keyhole Surgery", icon: "scope", desc: "Advanced laparoscopic procedures." },
              { title: "Trauma Care", icon: "plus", desc: "24/7 emergency surgical support." },
              { title: "Hernia Center", icon: "shield", desc: "Expert mesh & non-mesh repair." },
              { title: "Laser Proctology", icon: "laser", desc: "Painless treatment for piles & fissures." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 bg-white/90 backdrop-blur-md transition-all duration-300 group relative overflow-hidden hover:bg-[#0b1c43]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-emerald-50 text-[#0b1c43] group-hover:bg-white/10 group-hover:text-emerald-400">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'scope' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      )}
                      {item.icon === 'plus' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                      {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
                      )}
                      {item.icon === 'laser' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0b1c43] group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-24 h-24 transform rotate-12 text-[#0b1c43] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image 
                       src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=1200"
                       alt="Laparoscopic Surgery Team"
                       width={800}
                       height={600}
                       className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium text-lg">"Precision meets care in every procedure."</p>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase mb-4 block">Why Choose Minimally Invasive?</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c43] mb-6 font-heading leading-tight">
                    Smaller Incisions, <br/>
                    <span className="text-emerald-500">Faster Healing</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our General Surgery department specializes in laparoscopic procedures, often called "keyhole surgery." This modern technique allows for major surgeries to be performed through tiny incisions, resulting in significantly less pain, minimal scarring, and a much quicker return to normal life.
                </p>
                
                <div className="space-y-6">
                    {[
                        { title: "Reduced Recovery Time", desc: "Return to your daily routine faster than traditional open surgery." },
                        { title: "Less Post-Op Pain", desc: "Minimal tissue trauma means significantly reduced discomfort." },
                        { title: "Minimal Scarring", desc: "Tiny incisions that heal with barely visible marks." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[#0b1c43] font-bold text-lg">{item.title}</h4>
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
      <section className="bg-[#0b1c43] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Comprehensive Surgical Solutions</h2>
                   <p className="text-emerald-100 text-lg opacity-90">Expert care for a wide range of abdominal and general surgical conditions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Appendicitis", icon: "activity", desc: "Urgent laparoscopic appendectomy." },
                       { title: "Gallbladder Stones", icon: "disc", desc: "Minimally invasive cholecystectomy." },
                       { title: "Hernia Repair", icon: "shield", desc: "Inguinal, umbilical, and hiatal hernias." },
                       { title: "Piles, Fissure, Fistula", icon: "laser", desc: "Advanced laser treatment." },
                       { title: "Thyroid & Parathyroid", icon: "user", desc: "Neck surgeries with cosmetic focus." },
                       { title: "Abdominal Trauma", icon: "plus", desc: "Emergency surgical intervention." },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-emerald-500/30 pb-6 group cursor-pointer hover:border-emerald-400 transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-emerald-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-400 group-hover:text-[#0b1c43] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'disc' ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                         service.icon === 'shield' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" :
                                         service.icon === 'laser' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'user' ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                                         "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform text-white">{service.title}</h4>
                               <p className="text-emerald-100 text-sm opacity-70">{service.desc}</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-16">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#0b1c43] mb-6">Expert Surgical Care, When You Need It</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't delay your treatment. Consult with our expert surgeons for the best outcome.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#0b1c43] text-white px-8 py-3 rounded-full font-bold hover:bg-[#162c6b] transition-colors shadow-lg">
                    Book Consultation
                </Link>
                <a href="tel:+917800001895" className="bg-white text-[#0b1c43] px-8 py-3 rounded-full font-bold border-2 border-[#0b1c43] hover:bg-gray-50 transition-colors">
                    Call +91-7800001895
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
