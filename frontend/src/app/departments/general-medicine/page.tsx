
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'General Medicine | Popular Hospital',
  description: 'Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare.',
};

export default function GeneralMedicinePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#1e1b4b] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=2000"
                alt="General Medicine Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#1e1b4b]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-semibold mb-6 border border-indigo-400/30 backdrop-blur-sm">
                Department of General Medicine
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Comprehensive <br/>
                <span className="text-indigo-400">Holistic Care</span>
              </h1>
              <p className="text-indigo-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Your first line of defense health. From diagnosing complex conditions to managing chronic lifestyle diseases, our expert physicians provide complete care for your well-being.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Our Physicians
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
              { title: "Preventive Checkups", icon: "clipboard", desc: "Comprehensive health screening packages." },
              { title: "Chronic Care", icon: "activity", desc: "Expert management of Diabetes & BP." },
              { title: "Infectious Diseases", icon: "shield", desc: "Treatment for viral & bacterial infections." },
              { title: "Geriatric Care", icon: "user", desc: "Specialized care for elderly patients." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-xl border-t-4 border-indigo-500 bg-white/90 backdrop-blur-md transition-all duration-300 group relative overflow-hidden hover:bg-[#1e1b4b]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-indigo-50 text-[#1e1b4b] group-hover:bg-white/10 group-hover:text-indigo-400">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'clipboard' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      )}
                      {item.icon === 'activity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                      {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> 
                      )}
                      {item.icon === 'user' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1e1b4b] group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-indigo-100 transition-colors">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-24 h-24 transform rotate-12 text-[#1e1b4b] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image 
                       src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200"
                       alt="Medical Consultation"
                       width={800}
                       height={600}
                       className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium text-lg">"Listening to your body, healing with expertise."</p>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-4 block">Primary & Specialty Diagnostics</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-6 font-heading leading-tight">
                    Accurate Diagnosis, <br/>
                    <span className="text-indigo-500">Effective Treatment</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Internal Medicine is the backbone of healthcare. Our physicians are trained to handle the broad and comprehensive spectrum of illnesses that affect adults. We focus on evidence-based medicine to promote long-term health and wellness.
                </p>
                
                <div className="space-y-6">
                    {[
                        { title: "Lifestyle Disease Clinic", desc: "Integrated management of Diabetes, Hypertension, and Obesity." },
                        { title: "Advanced Diagnostics", desc: "Rapid and accurate testing for pinpoint diagnosis." },
                        { title: "Pre-operative Clearance", desc: "Ensuring patient fitness before major surgeries." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[#1e1b4b] font-bold text-lg">{item.title}</h4>
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
      <section className="bg-[#1e1b4b] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Expertise in Adult Health</h2>
                   <p className="text-indigo-100 text-lg opacity-90">Specialized management for acute and chronic medical conditions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Diabetes Management", icon: "drop", desc: "Type 1, Type 2, and Gestational Diabetes." },
                       { title: "Hypertension", icon: "activity", desc: "Blood pressure monitoring and control." },
                       { title: "Infectious Diseases", icon: "bug", desc: "Typhoid, Malaria, Dengue, TB, etc." },
                       { title: "Thyroid Disorders", icon: "pulse", desc: "Hypo/Hyperthyroidism management." },
                       { title: "Respiratory Illness", icon: "wind", desc: "Asthma, COPD, and Pneumonia care." },
                       { title: "Gastric Problems", icon: "fire", desc: "Acid reflux, IBS, and gastritis." },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-indigo-500/30 pb-6 group cursor-pointer hover:border-indigo-400 transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-indigo-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-400 group-hover:text-[#1e1b4b] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'drop' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" : 
                                         service.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" : 
                                         service.icon === 'bug' ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : // using warning for bug
                                         service.icon === 'pulse' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" :
                                         service.icon === 'wind' ? "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" : 
                                         service.icon === 'fire' ? "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" :
                                         "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform text-white">{service.title}</h4>
                               <p className="text-indigo-100 text-sm opacity-70">{service.desc}</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-50 py-16">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-6">Partnering in Your Wellness Journey</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Schedule a holistic checkup today and take the first step towards a healthier you.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#1e1b4b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#312e81] transition-colors shadow-lg">
                    Book Consultation
                </Link>
                <a href="tel:+917800001895" className="bg-white text-[#1e1b4b] px-8 py-3 rounded-full font-bold border-2 border-[#1e1b4b] hover:bg-gray-50 transition-colors">
                    Call +91-7800001895
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
