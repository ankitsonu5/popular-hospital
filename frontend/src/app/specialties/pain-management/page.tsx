
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pain Management Clinic | Popular Hospital',
  description: 'Advanced pain management solutions including nerve blocks, spinal injections, physiotherapy, and minimally invasive treatments for chronic and acute pain.',
};

export default function PainManagementPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#334155] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=60&w=1400"
                alt="Pain Management Clinic Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#334155] via-[#334155]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-slate-400/20 text-slate-200 text-sm font-semibold mb-6 border border-slate-400/30 backdrop-blur-sm">
                Pain Management Clinic
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Live Beyond <br/>
                <span className="text-orange-300">Pain</span>
              </h1>
              <p className="text-slate-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Don't let chronic pain define your life. Our specialists use cutting-edge, minimally invasive techniques to diagnose and treat pain at its source, helping you regain mobility and quality of life.
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

      {/* Horizontal Icon Strip */}
      <section className="relative z-20 px-4 mt-8 md:-mt-14 mb-16">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Nerve Blocks", icon: "M13 10V3L4 14h7v7l9-11h-7z", stat: "Instant Relief" },
                { title: "Spinal Injections", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", stat: "Precision Guided" },
                { title: "Physiotherapy", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", stat: "Rehab Programs" },
                { title: "Cancer Pain", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", stat: "Palliative Care" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 lg:p-8 group hover:bg-slate-50 transition-colors border-b sm:border-r lg:border-b-0 border-gray-100 last:border-0 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#334155] to-slate-600 flex items-center justify-center text-orange-300 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide">{item.stat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Treat - 3-Step Process */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                <span className="text-orange-600 font-bold tracking-widest text-sm uppercase">Our Approach</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                Your Path to <br/>
                <span className="text-[#334155]">Pain-Free Living</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                We follow a structured, evidence-based approach to understand, diagnose, and treat your pain effectively.
              </p>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Comprehensive Assessment", desc: "Detailed history, physical examination, and advanced imaging to identify the root cause of pain." },
                  { step: "02", title: "Personalized Treatment Plan", desc: "A multi-modal plan combining injections, medication, physiotherapy, and lifestyle changes." },
                  { step: "03", title: "Ongoing Recovery Support", desc: "Regular follow-ups, rehab guidance, and pain management adjustments for long-term relief." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#334155] to-slate-600 flex items-center justify-center text-orange-300 font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-slate-200 rounded-full blur-3xl opacity-40"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                   src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=60&w=800"
                   alt="Pain Management Treatment"
                   width={800}
                   height={600}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   loading="lazy"
                   className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#334155]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0 shadow-xl">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">95% Success Rate</p>
                      <p className="text-white/70 text-sm">In pain reduction within first 3 sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Conditions Grid - Left-Bordered Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-3 block">Conditions We Treat</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">Specialized Pain Solutions</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">From everyday aches to complex chronic conditions — we've got you covered.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Lower Back Pain", desc: "Disc prolapse, sciatica, and lumbar spondylosis treatment.", color: "border-l-orange-500", iconColor: "text-orange-500", bgColor: "bg-orange-50" },
              { title: "Joint Pain", desc: "Knee, hip, and shoulder pain management without surgery.", color: "border-l-slate-600", iconColor: "text-slate-600", bgColor: "bg-slate-50" },
              { title: "Migraine & Headache", desc: "Trigger point injections and preventive therapy.", color: "border-l-amber-500", iconColor: "text-amber-500", bgColor: "bg-amber-50" },
              { title: "Neuropathic Pain", desc: "Diabetic neuropathy and post-herpetic neuralgia care.", color: "border-l-orange-500", iconColor: "text-orange-500", bgColor: "bg-orange-50" },
              { title: "Fibromyalgia", desc: "Multi-modal approach for widespread musculoskeletal pain.", color: "border-l-slate-600", iconColor: "text-slate-600", bgColor: "bg-slate-50" },
              { title: "Sports Injuries", desc: "PRP therapy and regenerative medicine for athletes.", color: "border-l-amber-500", iconColor: "text-amber-500", bgColor: "bg-amber-50" },
            ].map((service, idx) => (
              <div key={idx} className={`group bg-white rounded-xl border-l-4 ${service.color} p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-11 h-11 rounded-lg ${service.bgColor} flex items-center justify-center mb-5 ${service.iconColor} group-hover:scale-110 transition-transform`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center text-sm font-semibold text-[#334155] group-hover:text-orange-600 transition-colors">
                  Know More <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient */}
      <section className="bg-gradient-to-br from-[#334155] to-slate-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="mx-auto w-full max-w-[1366px] px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-slate-200 text-sm font-medium">Same-Day Consultations Available</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Take the First Step Towards<br/> <span className="text-orange-300">Pain-Free Living</span></h2>
            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                Our pain specialists will create a customized treatment plan to help you get back to the life you love. No more waiting — relief starts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/book" className="bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#d1451a] transition-colors shadow-xl shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Book Consultation
                </Link>
                <a href="tel:1800123456" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call 1800-123-456
                </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
