
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ENT (Ear, Nose & Throat) | Popular Hospital',
  description: 'Comprehensive ENT care including sinus surgery, cochlear implants, tonsillectomy, voice disorders, and advanced head & neck treatments.',
};

export default function ENTPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#78350f] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=60&w=1400"
                alt="ENT Department Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#78350f] via-[#78350f]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-200 text-sm font-semibold mb-6 border border-amber-400/30 backdrop-blur-sm">
                Department of ENT &amp; Head-Neck Surgery
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Hear Better, <br/>
                <span className="text-amber-300">Breathe Freely</span>
              </h1>
              <p className="text-amber-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Expert care for ear, nose, and throat conditions. Our ENT specialists blend precision diagnostics with advanced surgical techniques for complete relief and recovery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Our Specialists
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
              { title: "Ear Surgery", icon: "ear", desc: "Cochlear implants & hearing restoration." },
              { title: "Sinus Treatment", icon: "nose", desc: "Endoscopic sinus surgery & balloon sinuplasty." },
              { title: "Throat Care", icon: "throat", desc: "Tonsillectomy & voice disorder management." },
              { title: "Head & Neck", icon: "head", desc: "Tumour excision & reconstructive surgery." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-white shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'ear' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      )}
                      {item.icon === 'nose' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      )}
                      {item.icon === 'throat' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      )}
                       {item.icon === 'head' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 to-transparent rounded-[2rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=60&w=800"
                       alt="ENT Specialist Consultation"
                       width={800}
                       height={600}
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       loading="lazy"
                       className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                            <p className="text-white font-medium text-lg min-[1100px]:text-xl leading-relaxed">"Precision diagnostics and gentle care for every ear, nose & throat concern."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-1 bg-amber-600 rounded-full"></span>
                    <span className="text-amber-700 font-bold tracking-widest text-sm uppercase">Complete ENT Solutions</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                    Advanced Care for <br/>
                    <span className="text-amber-700">Ear, Nose & Throat</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Our ENT department is equipped with the latest diagnostic tools, including audiometry, impedance testing, and video endoscopy. We treat conditions ranging from common infections to complex surgical cases, ensuring the best outcomes with minimal discomfort.
                </p>
                
                <div className="space-y-4">
                    {[
                        { title: "Cochlear Implant Programme", desc: "Restoring hearing for children and adults with advanced implants." },
                        { title: "Microear Surgery", desc: "Precision surgery for chronic ear infections and hearing loss." },
                        { title: "Snoring & Sleep Apnea", desc: "Diagnosis and surgical correction for obstructive sleep apnea." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-amber-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600 mt-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg mb-1">{item.title}</h4>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid - Dark Premium Theme */}
      <section className="bg-[#1a1a1a] py-24 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#78350f 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
           
           <div className="mx-auto w-full max-w-[1366px] px-4 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                   <div className="max-w-2xl">
                       <span className="text-amber-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                       <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">Expert ENT Treatments</h2>
                   </div>
                   <p className="text-gray-400 text-lg max-w-md text-left md:text-right pb-2">
                       From routine care to complex surgeries, we cover the full spectrum of ENT disorders.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                       { title: "Chronic Sinusitis", icon: "nose", desc: "Endoscopic sinus surgery and medical management." },
                       { title: "Hearing Loss", icon: "ear", desc: "Audiometry, hearing aids, and cochlear implants." },
                       { title: "Tonsils & Adenoids", icon: "throat", desc: "Surgical removal for recurrent infections." },
                       { title: "Vertigo & Dizziness", icon: "spin", desc: "Vestibular testing and balance disorder treatment." },
                       { title: "Thyroid Nodules", icon: "neck", desc: "Fine needle aspiration and thyroid surgery." },
                       { title: "Allergic Rhinitis", icon: "allergy", desc: "Allergy testing and immunotherapy." },
                   ].map((service, idx) => (
                       <div key={idx} className="group p-8 rounded-2xl bg-[#262626] border border-white/5 hover:border-amber-500/50 hover:bg-[#2a2a2a] transition-all duration-300">
                           <div className="w-12 h-12 rounded-lg bg-[#333] flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white text-amber-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'nose' ? "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" : 
                                         service.icon === 'ear' ? "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" : 
                                         service.icon === 'throat' ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" :
                                         service.icon === 'spin' ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" :
                                         service.icon === 'neck' ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" : 
                                         "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                     } />
                                </svg>
                           </div>
                           <h4 className="text-xl font-bold mb-3 text-white">{service.title}</h4>
                           <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                           <span className="inline-flex items-center text-sm font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                               Learn More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                           </span>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Don't Ignore the Signs</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
                Persistent ear pain, nasal congestion, or throat discomfort? Consult our ENT experts for a thorough evaluation.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#78350f] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#60280b] transition-colors shadow-xl shadow-amber-900/20">
                    Book Consultation
                </Link>
                <a href="tel:+917800001895" className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                    Call +91-7800001895
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
