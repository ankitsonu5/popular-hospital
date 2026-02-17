
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orthopedics & Joint Replacement | Popular Hospital',
  description: 'Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology.',
};

export default function OrthopedicsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#0f766e] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=60&w=1400"
                alt="Orthopedics & Joint Replacement Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0f766e] via-[#0f766e]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-100 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm">
                Centre for Bone & Joint Care
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Restoring Mobility, <br/>
                <span className="text-teal-300">Rebuilding Lives</span>
              </h1>
              <p className="text-teal-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                From joint replacements to sports injuries, our expert orthopedic surgeons use advanced techniques to help you move freely and live pain-free.
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
              { title: "Joint Replacement", icon: "joint", desc: "Hip, knee, shoulder replacement surgeries." },
              { title: "Sports Medicine", icon: "activity", desc: "ACL, meniscus, and ligament repairs." },
              { title: "Spine Surgery", icon: "spine", desc: "Advanced spinal fusion & disc treatments." },
              { title: "Trauma Care", icon: "shield", desc: "24/7 emergency fracture management." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-white shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'joint' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      )}
                      {item.icon === 'activity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                      {item.icon === 'spine' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      )}
                       {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-transparent rounded-[2rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=60&w=800"
                       alt="Orthopedic Surgery"
                       width={800}
                       height={600}
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       loading="lazy"
                       className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                            <p className="text-white font-medium text-lg min-[1100px]:text-xl leading-relaxed">"Advanced surgical techniques for faster recovery and better outcomes."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-1 bg-teal-600 rounded-full"></span>
                    <span className="text-teal-600 font-bold tracking-widest text-sm uppercase">Expert Orthopedic Care</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                    Precision Surgery, <br/>
                    <span className="text-teal-600">Personalized Recovery</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Our orthopedic department offers comprehensive care for bones, joints, muscles, and ligaments. From minimally invasive arthroscopy to complex joint replacements, we combine surgical excellence with compassionate rehabilitation support.
                </p>
                
                <div className="space-y-4">
                    {[
                        { title: "Robotic Joint Replacement", desc: "Computer-assisted precision for perfect alignment." },
                        { title: "Arthroscopy Centre", desc: "Minimally invasive keyhole surgery for faster healing." },
                        { title: "Pediatric Orthopedics", desc: "Specialized care for growing bones and deformities." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-teal-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600 mt-1">
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
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f766e 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
           
           <div className="mx-auto w-full max-w-[1366px] px-4 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                   <div className="max-w-2xl">
                       <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-3 block">Specialized Treatments</span>
                       <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">Comprehensive Orthopedic Solutions</h2>
                   </div>
                   <p className="text-gray-400 text-lg max-w-md text-left md:text-right pb-2">
                       State-of-the-art treatments for all musculoskeletal conditions.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                       { title: "Total Knee Replacement", icon: "knee", desc: "Advanced implants for long-lasting mobility." },
                       { title: "Hip Replacement", icon: "hip", desc: "Minimally invasive anterior approach surgery." },
                       { title: "Shoulder Arthroscopy", icon: "shoulder", desc: "Rotator cuff repair and stabilization." },
                       { title: "Spine Fusion", icon: "spine", desc: "Disc replacement and decompression surgery." },
                       { title: "Fracture Fixation", icon: "bone", desc: "Internal and external fixation techniques." },
                       { title: "Hand & Wrist Surgery", icon: "hand", desc: "Carpal tunnel and tendon repair." },
                   ].map((service, idx) => (
                       <div key={idx} className="group p-8 rounded-2xl bg-[#262626] border border-white/5 hover:border-teal-500/50 hover:bg-[#2a2a2a] transition-all duration-300">
                           <div className="w-12 h-12 rounded-lg bg-[#333] flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white text-teal-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'knee' ? "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" : 
                                         service.icon === 'hip' ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                         service.icon === 'shoulder' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'spine' ?  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" :
                                         service.icon === 'bone' ? "M12 6v6m0 0v6m0-6h6m-6 0H6" : 
                                         service.icon === 'hand' ? "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" :
                                         "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                     } />
                                </svg>
                           </div>
                           <h4 className="text-xl font-bold mb-3 text-white">{service.title}</h4>
                           <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                           <span className="inline-flex items-center text-sm font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Back to What You Love</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
                Don't let pain hold you back. Consult our orthopedic experts for a personalized treatment plan.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#0f766e] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#0d5f58] transition-colors shadow-xl shadow-teal-900/20">
                    Book Consultation
                </Link>
                <a href="tel:1800123456" className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                    Call 1800-123-456
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
