
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burns & Plastic Surgery | Popular Hospital',
  description: 'Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities.',
};

export default function PlasticSurgeryPage() {
  return (
    <main className="min-h-screen bg-rose-50/50">
      {/* ─── Hero Section (Standardized) ─── */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2000"
                alt="Plastic Surgery Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 text-pink-200 text-sm font-semibold mb-6 border border-pink-400/30 backdrop-blur-sm">
                Department of Plastic Surgery
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Restoring Form & <br/>
                Beauty
              </h1>
              <p className="text-pink-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                From life-saving burn care to aesthetic refinements. Our dual expertise in reconstruction and cosmetic surgery ensures holistic healing and confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Meet Our Surgeons
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: Glassmorphism Service Grid (Modern Theme) ─── */}
      <section className="relative z-20 px-4 mt-10 mb-24">
          <div className="mx-auto w-full max-w-[1366px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Burns */}
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border-t-4 border-orange-500 transition-all duration-300 group">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Burns ICU</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          State-of-the-art isolation units for critical burns, preventing infection and ensuring optimal healing environments.
                      </p>
                  </div>

                  {/* Card 2: Reconstructive (Highlighted) */}
                  <div className="bg-[#0b1c43] p-8 rounded-2xl shadow-xl border-t-4 border-pink-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-pink-500 transition-colors relative z-10">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Reconstructive Surgery</h3>
                      <p className="text-pink-100 leading-relaxed mb-4 relative z-10">
                          Restoring function after trauma, cancer, or congenital defects. Our microsurgeons perform complex tissue transfers.
                      </p>
                      <Link href="#" className="text-pink-400 font-bold flex items-center gap-2 text-sm hover:gap-3 transition-all relative z-10">
                          Explore Repairs <span className="text-lg">→</span>
                      </Link>
                  </div>

                  {/* Card 3: Cosmetic */}
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border-t-4 border-pink-500 transition-all duration-300 group">
                      <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-3">Aesthetic Center</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                          Liposuction, rhinoplasty, tummy tucks, and breast augmentation performed by board-certified aesthetic surgeons.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── Bento Grid: Before & After Focus ─── */}
      <section className="py-16 px-4">
           <div className="mx-auto w-full max-w-[1366px]">
               <div className="flex flex-col md:flex-row gap-8 items-stretch h-full">
                   
                   {/* Large Visual Section */}
                   <div className="md:w-1/2 relative min-h-[500px] rounded-3xl overflow-hidden group">
                        <Image 
                             src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
                            alt="Cosmetic Consultation"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                             <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Real Results</span>
                             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                 Confidence Restored
                             </h2>
                             <p className="text-pink-100 text-lg mb-6 max-w-md">
                                 See the transformative journeys of our patients. From subtle enhancements to life-changing reconstructions.
                             </p>
                             <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors shadow-lg">
                                 View Gallery
                             </button>
                        </div>
                   </div>

                   {/* Right Side Info Grid */}
                   <div className="md:w-1/2 grid grid-rows-2 gap-8">
                        {/* Box 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center relative overflow-hidden">
                             <div className="flex items-start justify-between mb-4 relative z-10">
                                 <div className="p-3 bg-pink-50 rounded-2xl text-pink-500">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                 </div>
                             </div>
                             <h3 className="text-2xl font-bold text-[#0b1c43] mb-2 relative z-10">Non-Surgical Aesthetics</h3>
                             <p className="text-gray-600 relative z-10">Comprehensive range of fillers, Botox, and laser skin treatments for a youthful glow without surgery.</p>
                        </div>

                        {/* Box 2 */}
                        <div className="bg-[#0b1c43] p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-center">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                             <div className="flex items-start justify-between mb-4 relative z-10">
                                 <div className="p-3 bg-white/10 rounded-2xl text-white">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                 </div>
                             </div>
                             <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Trauma Reconstruction</h3>
                             <p className="text-blue-100 relative z-10">Urgent care for facial fractures, hand injuries, and soft tissue loss with 24/7 specialist availability.</p>
                        </div>
                   </div>

               </div>
           </div>
      </section>

      {/* ─── Procedure Tags (Grid Style) ─── */}
      <section className="bg-pink-50/50 py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1366px] px-4 mb-8 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-[0.15em] md:tracking-[0.2em]">Our Expertise</h2>
          </div>
          <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {[
                  "Rhinoplasty", "Liposuction", "Breast Augmentation", "Tummy Tuck",
                  "Burn Debridement", "Skin Grafting", "Cleft Lip Repair", "Hand Surgery", "Facelift", "Botox"
                ].map((item, i) => (
                    <span key={i} className="text-sm md:text-base lg:text-lg font-bold text-[#0b1c43] px-5 md:px-6 lg:px-8 py-3 lg:py-4 bg-white rounded-full shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-300 transition-all cursor-default">
                        {item}
                    </span>
                ))}
            </div>
          </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-[1366px] px-4">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                   
                   <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
                       Revealing the Best You
                   </h2>
                   <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                       Expert care that combines medical precision with artistic vision. Schedule your consultation today.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                       <Link href="/book" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg">
                           Book Appointment
                       </Link>
                       <a href="tel:+917800001895" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all">
                           Call +91-7800001895
                       </a>
                   </div>
              </div>
          </div>
      </section>
    </main>
  );
}
