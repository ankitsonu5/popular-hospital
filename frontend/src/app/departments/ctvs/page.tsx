
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CTVS Department | Popular Hospital',
  description: 'Specialized Cardiothoracic & Vascular Surgery (CTVS) including Bypass (CABG), Valve Replacement, and Aortic Surgery.',
};

export default function CTVSPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=2000"
                alt="Heart Surgery Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 text-rose-200 text-sm font-semibold mb-6 border border-rose-400/30 backdrop-blur-sm">
                Department of CTVS
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Heart & Vascular <br/>
                Excellence
              </h1>
              <p className="text-rose-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Pioneering complex cardiac and vascular procedures. From Beating Heart Bypass (CABG) to advanced aortic interventions, we ensure the highest standards of surgical care.
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

         {/* Feature Section: Technology */}
      <section className="py-20 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="text-[#E85222] font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    SURGICAL EXCELLENCE
                </span>
                
                <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c43] mb-6 font-heading leading-tight">
                    Heart Surgery <br />
                    <span>Redefined</span>
                </h2>

                <h3 className="text-xl font-bold text-[#334155] mb-3">Modular Cardiac OTs</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-md">
                    Our dedicated Cardiothoracic Operation Theatres are fitted with advanced heart-lung machines, IABP support, and laminar airflow systems to ensure 100% sterility and safety.
                </p>

                <div className="space-y-4 mb-4 w-full">
                    {[
                        "Minimally Invasive Cardiac Surgery (MICS)",
                        "Video-Assisted Thoracic Surgery (VATS)",
                        "Endovascular Aortic Repair (EVAR)",
                        "ECMO Life Support"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                             <div className="w-5 h-5 rounded-full border-2 border-[#E85222] flex items-center justify-center text-[#E85222]">
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                             </div>
                             <span className="text-gray-600 font-medium text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Column: Image */}
            <div className="lg:col-span-4 relative flex justify-center py-10">
                <div className="relative w-full aspect-[3/4] max-w-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
                        alt="Cardiac Surgery Team"
                        fill
                        className="object-cover"
                    />
                 </div>
            </div>

            {/* Right Column: Features List */}
            <div className="lg:col-span-3 flex flex-col gap-10">
                {[
                    { title: "Rapid Recovery", icon: "activity", desc: "Advanced protocols for faster healing." },
                    { title: "24/7 Cardiac ICU", icon: "monitor", desc: "1:1 Nursing for post-op care." },
                    { title: "Rehabilitation", icon: "heart", desc: "Structured cardiac rehab plans." }
                ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-5 group">
                        <div className="w-14 h-14 rounded-full bg-[#0b1c43] flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:bg-[#162c6b] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                  feature.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" : 
                                  feature.icon === 'monitor' ? "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" :
                                  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              } />
                            </svg>
                        </div>
                        <div className="pt-1">
                            <h4 className="text-[#0b1c43] font-bold text-lg mb-2">{feature.title}</h4>
                            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                                {feature.desc}
                            </p>
                            <div className="h-px bg-gray-200/60 w-full mt-5"></div>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
      </section>

      {/* Floating Cards / Features */}
      <section className="relative z-20 mt-8 md:-mt-16 pb-20 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bypass Surgery", icon: "heart-pulse", desc: "Total Arterial & Beating Heart CABG." },
              { title: "Valve Repair", icon: "valve", desc: "Mitral & Aortic Valve replacement/repair." },
              { title: "Vascular Surgery", icon: "flow", desc: "Treatment for varicose veins & DVT." },
              { title: "Thoracic Surgery", icon: "lung", desc: "Complex lung and chest wall procedures." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0b1c43] transition-colors">
                   <svg className="w-6 h-6 text-[#0b1c43] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'heart-pulse' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      )}
                      {item.icon === 'valve' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                      )}
                      {item.icon === 'flow' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                      {item.icon === 'lung' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* Feature Strip: Patient Focus */}
      <section className="py-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                 <div className="md:w-1/2">
                     <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Expertise You Can Trust.</h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                         Heart surgery is a major life event. Our experienced surgeons and compassionate care team are with you every step of the way, from diagnosis to full recovery.
                     </p>
                     <Link href="/book" className="text-rose-600 font-bold hover:underline flex items-center gap-2 text-lg">
                         Consult our Experts
                         <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                     </Link>
                 </div>
                 <div className="md:w-1/2 relative h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
                        alt="Doctor Patient Care"
                        fill
                        className="object-cover"
                      />
                 </div>
            </div>
        </div>
      </section>

      {/* Services/Conditions Grid */}
      <section className="bg-[#0b1c43] py-24 text-white mt-10">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-rose-200 font-bold tracking-widest text-sm uppercase mb-3 block">Procedures & Treatments</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Complete Cardiac Care</h2>
                   <p className="text-rose-100 text-lg opacity-90">State-of-the-art treatments for complex heart and lung conditions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Coronary Artery Disease", icon: "heart" },
                       { title: "Heart Valve Defects", icon: "valve" },
                       { title: "Aortic Aneurysm", icon: "flow" },
                       { title: "Congenital Heart Defects", icon: "baby" },
                       { title: "Lung Tumors", icon: "lung" },
                       { title: "Peripheral Vascular Disease", icon: "pulse" },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-rose-400/30 pb-6 group cursor-pointer hover:border-white transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-rose-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#0b1c43] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'heart' ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" :
                                         service.icon === 'valve' ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                         service.icon === 'flow' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'baby' ? "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147l.088-.416c.1-.408.204-.775.323-1.118C5.64 4.093 6.776 3 8.35 3h7.3c1.574 0 2.71 1.093 3.364 2.319.119.343.223.71.323 1.118l.088.416c.376 1.297.576 2.69.576 4.147 0 1.564.36 3.045 1 4.364" :
                                         service.icon === 'lung' ? "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" :
                                         "M13 10V3L4 14h7v7l9-11h-7z"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                               <p className="text-rose-100 text-sm opacity-80">Advanced surgical treatment</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      <section className="bg-[#EFF6FF] py-12">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-4 max-w-[1366px] mx-auto">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to speak to a heart specialist? Call our 24/7 helpline
          </p>
          <a
            href="tel:+917800001895"
            className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
          >
            +91-7800001895
          </a>
        </div>
      </section>
    </main>
  );
}
