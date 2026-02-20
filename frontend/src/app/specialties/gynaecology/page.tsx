
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obstetrics & Gynaecology | Popular Hospital',
  description: 'Comprehensive women\'s health care including maternity, high-risk pregnancy, infertility treatment, and advanced gynaecological surgeries.',
};

export default function GynaecologyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Kept meaningful but slightly refined overlay if needed, sticking to current structure */}
      <section className="relative h-[600px] w-full bg-[#be185d] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=60&w=1400"
                alt="Obstetrics & Gynaecology Banner"
                fill
                sizes="100vw"
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#be185d] via-[#be185d]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 md:px-8 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 text-pink-100 text-sm font-semibold mb-6 border border-pink-400/30 backdrop-blur-sm">
                Centre of Excellence for Women
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Nurturing Life, <br/>
                <span className="text-pink-300">Empowering You</span>
              </h1>
              <p className="text-pink-50/90 text-base md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                From adolescence to motherhood and beyond, we provide holistic care for every stage of a woman's life. Experience world-class maternity and gynaecological services.
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

      {/* Floating Cards / Features - MODERNIZED */}
      <section className="relative z-20 px-4 mt-10 mb-24">
        <div className="mx-auto w-full max-w-[1366px] px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Maternity Care", icon: "baby", desc: "Compassionate care for mother & baby." },
              { title: "High-Risk Pregnancy", icon: "activity", desc: "Specialized monitoring & management." },
              { title: "Infertility (IVF)", icon: "heart", desc: "Advanced fertility solutions." },
              { title: "Gynae Laparoscopy", icon: "scope", desc: "Minimally invasive surgical care." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-white shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'baby' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      )}
                      {item.icon === 'activity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                      {item.icon === 'heart' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      )}
                       {item.icon === 'scope' && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
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

      {/* Main Content Section - CLEANER & PROFESSIONAL */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
                {/* Abstract geometric background instead of blobs */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 to-transparent rounded-[2rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=60&w=800"
                       alt="Women's Health"
                       width={800}
                       height={600}
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       loading="lazy"
                       className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                            <p className="text-white font-medium text-lg min-[1100px]:text-xl leading-relaxed">"Dedicated to the health and wellness of women at every stage of life."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-1 bg-pink-600 rounded-full"></span>
                    <span className="text-pink-600 font-bold tracking-widest text-sm uppercase">Total Women's Care</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                    Compassionate Care, <br/>
                    <span className="text-pink-600">Clinical Excellence</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                   We offer comprehensive obstetric and gynaecological care, from routine check-ups to complex surgeries. Our team of experienced gynaecologists ensures that you receive the best possible care in a warm and supportive environment, backed by the latest medical technology.
                </p>
                
                <div className="space-y-4">
                    {[
                        { title: "Painless Delivery", desc: "Advanced labor analgesia for a comfortable birthing experience." },
                        { title: "Gynae-Oncology", desc: "Screening and treatment for women's cancers." },
                        { title: "Menopause Clinic", desc: "Managing hormonal changes and post-menopausal health." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-pink-200 transition-colors shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 text-pink-600 mt-1">
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

      {/* Services Grid - DARK PREMIUM THEME */}
      <section className="bg-[#1a1a1a] py-24 text-white relative overflow-hidden">
           {/* Subtle Pattern */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#be185d 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
           
           <div className="mx-auto w-full max-w-[1366px] px-6 md:px-8 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                   <div className="max-w-2xl">
                       <span className="text-pink-400 font-bold tracking-widest text-sm uppercase mb-3 block">Specialized Services</span>
                       <h2 className="text-4xl md:text-5xl font-bold text-white font-heading">Expert Gynaecological Care</h2>
                   </div>
                   <p className="text-gray-400 text-lg max-w-md text-left md:text-right pb-2">
                       Tailored treatments designed for your unique health needs using world-class protocols.
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[
                       { title: "Antenatal Care", icon: "user", desc: "Comprehensive prenatal checkups and fetal monitoring." },
                       { title: "Hysterectomy", icon: "plus", desc: "Minimally invasive removal of the uterus." },
                       { title: "PCOS/PCOD", icon: "refresh", desc: "Hormonal balance and lifestyle management." },
                       { title: "Family Planning", icon: "heart", desc: "Contraception counseling and solutions." },
                       { title: "Urogynaecology", icon: "shield", desc: "Treatment for urinary incontinence and prolapse." },
                       { title: "Breast Clinic", icon: "check", desc: "Screening, mammography, and breast health." },
                   ].map((service, idx) => (
                       <div key={idx} className="group p-8 rounded-2xl bg-[#262626] border border-white/5 hover:border-pink-500/50 hover:bg-[#2a2a2a] transition-all duration-300">
                           <div className="w-12 h-12 rounded-lg bg-[#333] flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white text-pink-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'user' ? "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" : 
                                         service.icon === 'plus' ? "M12 6v6m0 0v6m0-6h6m-6 0H6" : 
                                         service.icon === 'refresh' ? "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" :
                                         service.icon === 'heart' ?  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" :
                                         service.icon === 'shield' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                         "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                     } />
                                </svg>
                           </div>
                           <h4 className="text-xl font-bold mb-3 text-white">{service.title}</h4>
                           <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>
                           <span className="inline-flex items-center text-sm font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                               Learn More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                           </span>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* CTA Section - Clean & Professional */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-6 md:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Health, Our Priority</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
                We are committed to providing the highest standard of care for women. Schedule your consultation today.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/book" className="bg-[#831843] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#500724] transition-colors shadow-xl shadow-pink-900/20">
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
