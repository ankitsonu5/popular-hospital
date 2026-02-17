
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Department of Neurosurgery | Popular Hospital',
  description: 'Advanced neurosurgical care including brain tumor surgery, spine surgery, and stroke management with cutting-edge technology.',
};

export default function NeurosurgeryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=2000"
                alt="Neurosurgery Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
                Department of Neurosurgery
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Advanced Brain & <br/>
                Spine Care
              </h1>
              <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Pioneering neurosurgical interventions with state-of-the-art technology. We specialize in complex brain and spine surgeries, ensuring the best possible neurological outcomes.
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
      <section className="relative z-20 mt-8 md:-mt-16 pb-20 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Brain Tumors", icon: "brain", desc: "Minimally invasive removal of complex tumors." },
              { title: "Spine Surgery", icon: "spine", desc: "Treatment for disc herniation and spinal injuries." },
              { title: "Stroke Care", icon: "activity", desc: "Rapid intervention for ischemic and hemorrhagic strokes." },
              { title: "Epilepsy Surgery", icon: "zap", desc: "Advanced surgical options for seizure control." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0b1c43] transition-colors">
                   <svg className="w-6 h-6 text-[#0b1c43] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'brain' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      )}
                      {item.icon === 'spine' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /> 
                      )}
                      {item.icon === 'activity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      )}
                      {item.icon === 'zap' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

      {/* Feature Section: Technology */}
      <section className="py-20 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="text-[#E85222] font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    ADVANCED TECHNOLOGY
                </span>
                
                <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c43] mb-6 font-heading leading-tight">
                    Precision Meets <br />
                    <span>Expertise</span>
                </h2>

                <h3 className="text-xl font-bold text-[#334155] mb-3">Neuronavigation & Microscope</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-md">
                    We utilize world-class operating microscopes and neuronavigation systems to perform delicate brain surgeries with sub-millimeter accuracy, minimizing risk to healthy tissues.
                </p>

                <div className="space-y-4 mb-4 w-full">
                    {[
                        "Minimally Invasive Spine Surgery",
                        "Endoscopic Brain Surgery",
                        "Deep Brain Stimulation",
                        "Awake Craniotomy"
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
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                        alt="Advanced Neurosurgery Equipment"
                        fill
                        className="object-cover"
                        priority
                    />
                 </div>
            </div>

            {/* Right Column: Features List */}
            <div className="lg:col-span-3 flex flex-col gap-10">
                {[
                    { title: "24/7 Monitoring", icon: "activity", desc: "Round-the-clock neuro-intensive care." },
                    { title: "Expert Team", icon: "users", desc: "Highly experienced neurosurgeons." },
                    { title: "Rehabilitation", icon: "accessibility", desc: "Comprehensive post-op recovery plans." }
                ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-5 group">
                        <div className="w-14 h-14 rounded-full bg-[#0b1c43] flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:bg-[#162c6b] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                  feature.icon === 'activity' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                  feature.icon === 'users' ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" :
                                  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

      {/* Feature Strip: Patient Focus */}
      <section className="py-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                 <div className="md:w-1/2">
                     <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Complete Neurological Care.</h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                         From diagnosis to rehabilitation, we provide holistic care for all neurological conditions. Our multi-disciplinary team works together to create personalized treatment plans for every patient.
                     </p>
                     <Link href="/book" className="text-blue-600 font-bold hover:underline flex items-center gap-2 text-lg">
                         Schedule a Consultation
                         <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                     </Link>
                 </div>
                 <div className="md:w-1/2 relative h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
                        alt="Neurosurgery Team"
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
                   <span className="text-blue-200 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Expertise in Complex Cases</h2>
                   <p className="text-blue-100 text-lg opacity-90">Our department is equipped to handle a wide range of neurological disorders with precision and care.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Traumatic Brain Injury", icon: "activity" },
                       { title: "Spinal Cord Injury", icon: "spine" },
                       { title: "Cerebrovascular Disorders", icon: "brain" },
                       { title: "Pediatric Neurosurgery", icon: "user" },
                       { title: "Peripheral Nerve Surgery", icon: "zap" },
                       { title: "Pituitary Tumors", icon: "scan" },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-blue-400/30 pb-6 group cursor-pointer hover:border-white transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-blue-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-[#0b1c43] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'spine' ? "M4 6h16M4 12h16m-7 6h7" : 
                                         service.icon === 'brain' ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" : 
                                         "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                               <p className="text-blue-100 text-sm opacity-80">Advanced surgical care</p>
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
            Need emergency neuro care? Call our 24/7 helpline
          </p>
          <a
            href="tel:18001234567"
            className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
          >
            1800-123-4567
          </a>
        </div>
      </section>
    </main>
  );
}
