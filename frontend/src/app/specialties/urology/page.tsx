
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Department of Urology | Popular Hospital',
  description: 'Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility.',
};

export default function UrologyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ─── Hero Section (Standardized) ─── */}
      <section className="relative min-h-[600px] md:h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=2000"
                alt="Urology Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 sm:px-6 h-full flex flex-col justify-center pt-14 pb-7 md:py-0">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-200 text-sm font-semibold mb-6 border border-indigo-400/30 backdrop-blur-sm">
                Department of Urology
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Advanced Urology & <br/>
                Andrology Care
              </h1>
              <p className="text-indigo-100/90 text-base md:text-xl max-w-2xl mb-8 md:mb-10 leading-relaxed font-medium">
                Comprehensive solutions for kidney stones, prostate health, and urinary tract disorders. We offer minimally invasive laser treatments and robotic surgery for faster recovery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Find a Urologist
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: Key Stats / Intro Section (Different Style) ─── */}
      <section className="relative z-20 mt-8 md:-mt-10 px-4 mb-20">
          <div className="mx-auto w-full max-w-[1366px]">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-b-4 border-indigo-600 flex flex-col md:flex-row gap-12 items-center">
                  <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold text-[#0b1c43] mb-4">Why choose Popular Urology?</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                          Our Urology department is a center of excellence dedicated to the diagnosis and treatment of urinary tract disorders in men and women, and the male reproductive system. We pride ourselves on offering the latest in <strong>Laser Lithotripsy</strong> and <strong>Laparoscopic Uro-surgery</strong>.
                      </p>
                      <ul className="space-y-3">
                          {[
                              "Painless Laser Stone Removal",
                              "Advanced Prostate Care",
                              "Male Infertility Solutions",
                              "Pediatric Urology Experts"
                          ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="md:w-1/2 w-full">
                       {/* Stats Grid */}
                       <div className="grid grid-cols-2 gap-4">
                           <div className="bg-indigo-50 p-6 rounded-xl text-center">
                               <span className="block text-4xl font-bold text-indigo-600 mb-1">5k+</span>
                               <span className="text-sm text-gray-600 font-medium">Stone Surgeries</span>
                           </div>
                           <div className="bg-blue-50 p-6 rounded-xl text-center">
                               <span className="block text-4xl font-bold text-blue-600 mb-1">98%</span>
                               <span className="text-sm text-gray-600 font-medium">Success Rate</span>
                           </div>
                           <div className="bg-orange-50 p-6 rounded-xl text-center">
                               <span className="block text-4xl font-bold text-orange-600 mb-1">24/7</span>
                               <span className="text-sm text-gray-600 font-medium">Emergency Care</span>
                           </div>
                           <div className="bg-green-50 p-6 rounded-xl text-center">
                               <span className="block text-4xl font-bold text-green-600 mb-1">15+</span>
                               <span className="text-sm text-gray-600 font-medium">Years Experience</span>
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── NEW: Split Services Section (Different Style) ─── */}
      <section className="py-16 bg-white">
          <div className="mx-auto w-full max-w-[1366px] px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">Focused Care Areas</h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Specific treatments tailored to gender and age-specific urological needs.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Men's Health Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0b1c43] text-white min-h-[400px] flex flex-col justify-end p-8 md:p-12">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity">
                          <Image 
                             src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                             alt="Men's Health"
                             fill
                             className="object-cover"
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43] via-[#0b1c43]/60 to-transparent"></div>
                      
                      <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">Men's Urology</h3>
                          <p className="text-blue-100 mb-6 max-w-md">Specialized care for prostate enlargement (BPH), prostate cancer screening, erectile dysfunction, and male infertility.</p>
                          <ul className="mb-6 space-y-2 text-sm text-blue-200">
                              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Laser Prostate Surgery (HoLEP)</li>
                              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Andrology Services</li>
                          </ul>
                          <button className="text-white font-bold underline decoration-blue-400 hover:decoration-white transition-all">Learn More</button>
                      </div>
                  </div>

                  {/* Women's Health Card */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#E85222] text-white min-h-[400px] flex flex-col justify-end p-8 md:p-12">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity">
                           <Image 
                             src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
                             alt="Women's Health"
                             fill
                             className="object-cover"
                          />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#9c300f] via-[#c24119]/60 to-transparent"></div>
                      
                      <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">Women's Urology</h3>
                          <p className="text-orange-100 mb-6 max-w-md">Compassionate treatment for urinary incontinence, recurrent UTIs, pelvic organ prolapse, and bladder health.</p>
                          <ul className="mb-6 space-y-2 text-sm text-orange-200">
                              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>Stress Incontinence TVT/TOT</li>
                              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>UTI Management</li>
                          </ul>
                          <button className="text-white font-bold underline decoration-orange-300 hover:decoration-white transition-all">Learn More</button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── Technology: Alternating Strips ─── */}
      <section className="py-20 bg-gray-50">
          <div className="mx-auto w-full max-w-[1366px] px-4">
               {/* Feature 1 */}
               <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20">
                   <div className="md:w-1/2">
                       <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-4 border-white">
                           <Image 
                               src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                               alt="Lithotripsy"
                               fill
                               className="object-cover"
                           />
                       </div>
                   </div>
                   <div className="md:w-1/2">
                       <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2 block">Kidney Stone Treatment</span>
                       <h3 className="text-3xl font-bold text-[#0b1c43] mb-4">Extra-Corporeal Shock Wave Lithotripsy (ESWL)</h3>
                       <p className="text-gray-600 leading-relaxed mb-6">
                           Break kidney stones without surgery using sound waves. Our advanced ESWL unit allows for non-invasive treatment of kidney stones, meaning no cuts, no pain, and same-day discharge.
                       </p>
                       <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                           {["Non-invasive", "No Anesthesia", "High Success Rate", "Day Care Procedure"].map(t => (
                               <li key={t} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                   <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                   {t}
                               </li>
                           ))}
                       </ul>
                   </div>
               </div>

               {/* Feature 2 */}
               <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
                   <div className="md:w-1/2">
                       <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border-4 border-white">
                           <Image 
                               src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&q=80&w=800"
                               alt="Microscopic Surgery"
                               fill
                               className="object-cover"
                           />
                       </div>
                   </div>
                   <div className="md:w-1/2">
                       <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-2 block">Surgical Precision</span>
                       <h3 className="text-3xl font-bold text-[#0b1c43] mb-4">Minimally Invasive Uro-Surgery</h3>
                       <p className="text-gray-600 leading-relaxed mb-6">
                           Using keyhole incisions for major urological procedures. Benefits include minimal blood loss, reduced pain, shorter hospital stay, and faster return to normal activities.
                       </p>
                       <Link href="/book" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                           Consult a Surgeon
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                       </Link>
                   </div>
               </div>
          </div>
      </section>

      {/* ─── Call to Action (Blue Bar) ─── */}
      <section className="bg-[#0b1c43] py-16 text-white">
          <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Take the First Step Towards Relief</h2>
               <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
                   Don't let urinary problems affect your quality of life. Our expert urologists are here to help you.
               </p>
               <div className="flex justify-center gap-4">
                   <a href="tel:18001234567" className="bg-white text-[#0b1c43] px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-colors">
                       Call 1800-123-4567
                   </a>
                   <Link href="/book" className="bg-transparent border border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                       Book Online
                   </Link>
               </div>
          </div>
      </section>
    </main>
  );
}
