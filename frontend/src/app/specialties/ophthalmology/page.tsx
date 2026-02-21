
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ophthalmology | Popular Hospital',
  description: 'Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract, LASIK, Glaucoma, and Retina treatments.',
};

export default function OphthalmologyPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
                alt="Ophthalmology Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
                Department of Ophthalmology
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Crystal Clear <br/>
                <span className="text-blue-400">Vision for Life</span>
              </h1>
              <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                We combine cutting-edge technology with expert care to protect and restore your vision. Offering precise diagnostics and advanced surgical solutions for all eye conditions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Our Eye Specialists
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
              { title: "Cataract Surgery", icon: "eye", desc: "Advanced phacoemulsification with IOL." },
              { title: "LASIK & ReLEx SMILE", icon: "laser", desc: "Specs removal with precision laser." },
              { title: "Glaucoma Clinic", icon: "shield", desc: "Early detection and pressure management." },
              { title: "Retina Services", icon: "grid", desc: "Dabetic Retinopathy & ARMD care." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-xl border-t-4 border-blue-500 bg-white/90 backdrop-blur-md transition-all duration-300 group relative overflow-hidden hover:bg-[#0f172a]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-blue-50 text-[#0f172a] group-hover:bg-white/10 group-hover:text-blue-400">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'eye' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                      {item.icon === 'eye' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                      {item.icon === 'laser' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                      {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
                      )}
                      {item.icon === 'grid' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0f172a] group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-blue-100 transition-colors">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-24 h-24 transform rotate-12 text-[#0f172a] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image 
                       src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200"
                       alt="Advanced Eye Care"
                       width={800}
                       height={600}
                       className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium text-lg">"Your vision is our priority."</p>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">State-of-the-Art Diagnostics</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 font-heading leading-tight">
                    Seeing the World <br/>
                    <span className="text-blue-500">More Clearly</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Our Ophthalmology department is equipped with world-class microsurgical equipment and advanced lasers. We specialize in treating complex eye disorders with precision, ensuring the best possible visual outcomes for our patients.
                </p>
                
                <div className="space-y-6">
                    {[
                        { title: "Computerized Eye Testing", desc: "Automated refractometers for accurate prescription." },
                        { title: "Phacoemulsification System", desc: "Micro-incision cataract surgery with quick recovery." },
                        { title: "Zeiss Microscope & Laser", desc: "For delicate retinal and corneal procedures." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[#0f172a] font-bold text-lg">{item.title}</h4>
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
      <section className="bg-[#0f172a] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Expert Eye Treatments</h2>
                   <p className="text-blue-100 text-lg opacity-90">Specialized care for a wide range of ocular conditions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Cataract (Motiyabind)", icon: "eye", desc: "Painless, stitchless surgery." },
                       { title: "Dry Eye Syndrome", icon: "drop", desc: "Computer vision syndrome treatment." },
                       { title: "Glaucoma (Kala Motia)", icon: "shield", desc: "Pressure control to prevent blindness." },
                       { title: "Refractive Errors", icon: "glasses", desc: "Myopia, Hypermetropia correction." },
                       { title: "Diabetic Retinopathy", icon: "grid", desc: "Laser and injection therapy." },
                       { title: "Squint & Lazy Eye", icon: "arrow", desc: "Correction for alignment issues." },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-blue-500/30 pb-6 group cursor-pointer hover:border-blue-400 transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-blue-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-400 group-hover:text-[#0f172a] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'eye' ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : 
                                         service.icon === 'eye' && idx === 0 ? "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : // Need full eye
                                         service.icon === 'drop' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" : 
                                         service.icon === 'shield' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" :
                                         service.icon === 'glasses' ? "M12 14l9-5-9-5-9 5 9 5z" : // Placeholder, using generic shape or specialized
                                         service.icon === 'glasses' ? "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" : // too complex
                                         service.icon === 'grid' ? "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" :
                                         service.icon === 'arrow' ? "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" :
                                         "M15 12a3 3 0 11-6 0 3 3 0 016 0z" // Default eye pup
                                     } />
                                     {service.icon === 'eye' || idx === 0 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> : null}
                                     {service.icon === 'glasses' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />: null} 
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform text-white">{service.title}</h4>
                               <p className="text-blue-100 text-sm opacity-70">{service.desc}</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-6">World-Class Eye Care at Your Service</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Protect your precious sight. Schedule a comprehensive eye examination today.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#0f172a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1e293b] transition-colors shadow-lg">
                    Book Consultation
                </Link>
                <a href="tel:+917800001895" className="bg-white text-[#0f172a] px-8 py-3 rounded-full font-bold border-2 border-[#0f172a] hover:bg-gray-50 transition-colors">
                    Call +91-7800001895
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
