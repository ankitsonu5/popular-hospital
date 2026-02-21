
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Psychiatry & Mental Health | Popular Hospital',
  description: 'Compassionate mental health care including counseling, de-addiction, stress management, and treatment for psychiatric disorders.',
};

export default function PsychiatryPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#2e1065] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=60&w=1400"
                alt="Psychiatry Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#2e1065] via-[#2e1065]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-violet-500/20 text-violet-200 text-sm font-semibold mb-6 border border-violet-400/30 backdrop-blur-sm">
                Department of Psychiatry
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Healing Minds, <br/>
                <span className="text-violet-400">Restoring Hope</span>
              </h1>
              <p className="text-violet-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                We believe in a holistic approach to mental wellness. Our expert psychiatrists and psychologists provide a safe, confidential space to help you navigate life's challenges.
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
              { title: "Counseling", icon: "chat", desc: "Expert therapy for anxiety & stress." },
              { title: "De-Addiction", icon: "shield", desc: "Substance abuse rehabilitation." },
              { title: "Child Psychiatry", icon: "smile", desc: "Behavioral therapy for children." },
              { title: "Neuro-Psychiatry", icon: "brain", desc: "Brain-behavior relationship care." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-xl border-t-4 border-violet-500 bg-white/90 backdrop-blur-md transition-all duration-300 group relative overflow-hidden hover:bg-[#2e1065]">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-violet-50 text-[#2e1065] group-hover:bg-white/10 group-hover:text-violet-400">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'chat' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      )}
                      {item.icon === 'shield' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
                      )}
                      {item.icon === 'smile' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                       {item.icon === 'brain' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      )}
                   </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2e1065] group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 group-hover:text-violet-100 transition-colors">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-24 h-24 transform rotate-12 text-[#2e1065] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image 
                       src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=60&w=800"
                       alt="Psychiatric Consultation"
                       width={800}
                       height={600}
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       loading="lazy"
                       className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <p className="text-white font-medium text-lg">"Listening without judgment, healing with care."</p>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <span className="text-violet-600 font-bold tracking-widest text-sm uppercase mb-4 block">Comprehensive Mental Health</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2e1065] mb-6 font-heading leading-tight">
                    Understanding Your <br/>
                    <span className="text-violet-500">Inner World</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   Mental health is as important as physical health. Our department offers diagnosis, treatment, and prevention of mental, emotional, and behavioral disorders. We combine medication management with psychotherapy to ensure the best outcomes.
                </p>
                
                <div className="space-y-6">
                    {[
                        { title: "Psychotherapy", desc: "Cognitive Behavioral Therapy (CBT) and counseling." },
                        { title: "De-Addiction Centre", desc: "Alcohol, drug, and tobacco cessation programs." },
                        { title: "Geriatric Psychiatry", desc: "Mental health care for the elderly (Dementia, Alzheimer's)." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0 text-violet-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <h4 className="text-[#2e1065] font-bold text-lg">{item.title}</h4>
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
      <section className="bg-[#2e1065] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-violet-400 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">Expert Psychiatric Care</h2>
                   <p className="text-violet-100 text-lg opacity-90">Compassionate support for a wide range of mental health conditions.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Depression & Anxiety", icon: "cloud", desc: "Mood disorders and panic attacks." },
                       { title: "Schizophrenia", icon: "brain", desc: "Management of psychosis and delusions." },
                       { title: "Bipolar Disorder", icon: "activity", desc: "Mood stabilization and therapy." },
                       { title: "OCD", icon: "refresh", desc: "Obsessive-Compulsive Disorder treatment." },
                       { title: "Sleep Disorders", icon: "moon", desc: "Insomnia and sleep cycle management." },
                       { title: "Stress Management", icon: "sun", desc: "Coping strategies for work-life balance." },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-violet-500/30 pb-6 group cursor-pointer hover:border-violet-400 transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-violet-900/40 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-400 group-hover:text-[#2e1065] transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'cloud' ? "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" : 
                                         service.icon === 'brain' ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" : 
                                         service.icon === 'activity' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                                         service.icon === 'moon' ? "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" :
                                         service.icon === 'refresh' ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" : 
                                         service.icon === 'sun' ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : 
                                         "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform text-white">{service.title}</h4>
                               <p className="text-violet-100 text-sm opacity-70">{service.desc}</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="bg-violet-50 py-16">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#2e1065] mb-6">Mental Wellness Begins Here</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Seeking help is a sign of strength. Our compassionate team is here to support you.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#2e1065] text-white px-8 py-3 rounded-full font-bold hover:bg-[#4c1d95] transition-colors shadow-lg">
                    Book Consultation
                </Link>
                <a href="tel:+917800001895" className="bg-white text-[#2e1065] px-8 py-3 rounded-full font-bold border-2 border-[#2e1065] hover:bg-gray-50 transition-colors">
                    Call +91-7800001895
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
