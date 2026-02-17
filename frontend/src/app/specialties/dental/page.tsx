
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental Care | Popular Hospital',
  description: 'Complete dental care including cosmetic dentistry, root canal, dental implants, orthodontics, and oral surgery at Popular Hospital.',
};

export default function DentalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Same banner style */}
      <section className="relative h-[600px] w-full bg-[#0e7490] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=60&w=1400"
                alt="Dental Care Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0e7490] via-[#0e7490]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-100 text-sm font-semibold mb-6 border border-cyan-400/30 backdrop-blur-sm">
                Advanced Dental Sciences
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Smile with <br/>
                <span className="text-cyan-300">Confidence</span>
              </h1>
              <p className="text-cyan-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                From routine check-ups to complex oral surgeries, our dental specialists deliver pain-free, precision care using the latest technology for a brighter, healthier smile.
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

      {/* Feature Stats Bar */}
      <section className="relative z-20 px-4 mt-8 md:-mt-16 mb-20">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
              {[
                { number: "15K+", label: "Dental Implants", icon: "implant" },
                { number: "98%", label: "Patient Satisfaction", icon: "star" },
                { number: "24/7", label: "Emergency Dental", icon: "clock" },
                { number: "10+", label: "Dental Specialists", icon: "team" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-8 px-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-4 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {stat.icon === 'implant' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />}
                      {stat.icon === 'star' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                      {stat.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {stat.icon === 'team' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                    </svg>
                  </div>
                  <span className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</span>
                  <span className="text-sm text-gray-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase - Bento Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-1 bg-cyan-600 rounded-full"></span>
              <span className="text-cyan-700 font-bold tracking-widest text-sm uppercase">Our Services</span>
              <span className="w-12 h-1 bg-cyan-600 rounded-full"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">Complete Dental Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Dental Implants", desc: "Permanent tooth replacement with titanium implants for a natural feel.", icon: "implant", highlight: true },
              { title: "Root Canal (RCT)", desc: "Painless root canal treatment to save infected teeth.", icon: "tooth" },
              { title: "Cosmetic Dentistry", desc: "Teeth whitening, veneers, and smile makeover procedures.", icon: "sparkle" },
              { title: "Orthodontics", desc: "Braces and aligners for perfectly aligned teeth.", icon: "braces" },
              { title: "Oral Surgery", desc: "Wisdom tooth extraction and jaw surgery.", icon: "surgery" },
              { title: "Kids Dentistry", desc: "Gentle and fun dental care for children and toddlers.", icon: "child", highlight: true },
            ].map((service, idx) => (
              <div key={idx} className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${service.highlight ? 'bg-gradient-to-br from-cyan-600 to-cyan-700 border-cyan-500 text-white shadow-xl shadow-cyan-500/20' : 'bg-white border-gray-100 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg'}`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.highlight ? 'bg-white/20 text-white' : 'bg-cyan-50 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white'} transition-colors`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                      service.icon === 'implant' ? "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" :
                      service.icon === 'tooth' ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" :
                      service.icon === 'sparkle' ? "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" :
                      service.icon === 'braces' ? "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" :
                      service.icon === 'surgery' ? "M12 6v6m0 0v6m0-6h6m-6 0H6" :
                      "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    } />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${service.highlight ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed ${service.highlight ? 'text-cyan-100' : 'text-gray-500'}`}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content + Image Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-1 bg-cyan-600 rounded-full"></span>
                    <span className="text-cyan-700 font-bold tracking-widest text-sm uppercase">Why Choose Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                    Pain-Free, <br/>
                    <span className="text-cyan-700">Precision Dentistry</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   We combine the latest dental technology with gentle care techniques to ensure a comfortable experience. Our clinic features digital X-rays, intra-oral cameras, and laser dentistry for the most accurate diagnoses and treatments.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: "Digital Smile Design", desc: "Preview your smile before treatment begins." },
                        { title: "Laser Dentistry", desc: "Minimally invasive gum and cavity treatments." },
                        { title: "Same-Day Crowns", desc: "CAD/CAM fabricated crowns in a single visit." },
                        { title: "Sedation Dentistry", desc: "Anxiety-free dental experience for all ages." }
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white border border-gray-100 hover:border-cyan-200 transition-colors shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 mb-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h4 className="text-gray-900 font-bold text-base mb-1">{item.title}</h4>
                            <p className="text-gray-500 text-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100 to-transparent rounded-[2rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=60&w=800"
                       alt="Modern Dental Clinic"
                       width={800}
                       height={600}
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       loading="lazy"
                       className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                            <p className="text-white font-medium text-lg min-[1100px]:text-xl leading-relaxed">"State-of-the-art dental care in a comfortable, modern environment."</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-cyan-700 to-cyan-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Perfect Smile Awaits</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto text-lg">
                Whether it's a routine cleaning or a complete smile makeover, our dental experts are here for you.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-white text-cyan-800 px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl">
                    Book Dental Checkup
                </Link>
                <a href="tel:1800123456" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all">
                    Call 1800-123-456
                </a>
            </div>
        </div>
      </section>

    </main>
  );
}
