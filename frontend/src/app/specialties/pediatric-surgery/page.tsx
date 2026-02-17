
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pediatric Surgery | Popular Hospital',
  description: 'Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care.',
};

export default function PediatricSurgeryPage() {
  return (
    <main className="min-h-screen bg-sky-50/50">
      {/* ─── Hero Section (Standardized) ─── */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=2000"
                alt="Pediatric Surgery Banner"
                fill
                className="object-cover opacity-30 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-yellow-400/20 text-yellow-200 text-sm font-semibold mb-6 border border-yellow-400/30 backdrop-blur-sm">
                Department of Pediatric Surgery
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Little Heroes, <br/>
                Expert Care
              </h1>
              <p className="text-yellow-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Surgical excellence tailored for neonates, infants, and adolescents. We combine advanced surgical skills with a gentle, child-friendly approach to ensure the best outcomes for your little ones.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book Appointment
                </Link>
                <Link href="/doctors" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Meet Our Team
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── NEW: "Playful" Intro Layout ─── */}
      <section className="relative z-20 px-4 mt-8 md:-mt-20 mb-20">
          <div className="mx-auto w-full max-w-[1366px]">
              <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border-b-8 border-yellow-400">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                      <div className="md:w-1/2">
                          <span className="text-sky-500 font-bold uppercase tracking-widest text-sm mb-3 block">Why Choose Us?</span>
                          <h2 className="text-3xl md:text-5xl font-bold text-[#0b1c43] mb-6 font-heading">
                              Treated like Family, <br />
                              <span className="text-yellow-500">Cared like our own.</span>
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed mb-8">
                              Children are not just small adults; their medical needs are different. Our team specializes in minimally invasive laparoscopic surgeries for children, which means smaller scars, less pain, and faster return to playing.
                          </p>
                          
                          <div className="flex gap-6">
                              <div className="flex flex-col items-center p-4 bg-sky-50 rounded-2xl w-32 text-center">
                                  <span className="text-3xl mb-2">👶</span>
                                  <span className="font-bold text-[#0b1c43] text-sm">Newborn Safe</span>
                              </div>
                              <div className="flex flex-col items-center p-4 bg-pink-50 rounded-2xl w-32 text-center">
                                  <span className="text-3xl mb-2">🧸</span>
                                  <span className="font-bold text-[#0b1c43] text-sm">Child Friendly</span>
                              </div>
                              <div className="flex flex-col items-center p-4 bg-green-50 rounded-2xl w-32 text-center">
                                  <span className="text-3xl mb-2">⚡</span>
                                  <span className="font-bold text-[#0b1c43] text-sm">Rapid Recovery</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="md:w-1/2 relative">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl -z-10"></div>
                           <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-200 rounded-full blur-3xl -z-10"></div>
                           <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-video transform rotate-2 hover:rotate-0 transition-transform duration-500">
                               <Image 
                                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
                                  alt="Pediatric Surgeon"
                                  fill
                                  className="object-cover"
                               />
                               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                                   <span className="flex items-center gap-2 text-sm font-bold text-[#0b1c43]">
                                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                       24/7 NICU Support
                                   </span>
                               </div>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ─── "Bubbles" Service Section (New Style) ─── */}
      <section className="py-20 bg-gradient-to-b from-sky-50/50 to-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading mb-4">What We Treat</h2>
                   <p className="text-gray-500 max-w-2xl mx-auto">Specialized treatments for common and complex childhood conditions.</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                   {[
                       { title: "Hernia Repair", icon: "🩹", color: "bg-blue-100" },
                       { title: "Appendicitis", icon: "💊", color: "bg-red-100" },
                       { title: "Undescended Testis", icon: "⚕️", color: "bg-purple-100" },
                       { title: "Congenital Defects", icon: "🧬", color: "bg-green-100" },
                       { title: "Hypospadias", icon: "💧", color: "bg-yellow-100" },
                       { title: "Cysts & Tumors", icon: "🔬", color: "bg-orange-100" },
                       { title: "Bowel Surgery", icon: "🍏", color: "bg-pink-100" },
                       { title: "Trauma Care", icon: "🚑", color: "bg-indigo-100" },
                   ].map((item, idx) => (
                       <div key={idx} className="flex flex-col items-center group cursor-pointer">
                           <div className={`w-32 h-32 ${item.color} rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md border-4 border-white`}>
                               {item.icon}
                           </div>
                           <h4 className="text-lg font-bold text-[#0b1c43] text-center">{item.title}</h4>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      {/* ─── Parent's Guide Timeline (New Style) ─── */}
      <section className="py-20 bg-white">
          <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="bg-[#0b1c43] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                   
                   <div className="relative z-10 text-center mb-12">
                       <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Your Journey With Us</h2>
                       <p className="text-blue-200">We make the surgical process simple and stress-free for parents.</p>
                   </div>

                   <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                       {/* Step 1 */}
                       <div className="bg-white/10 backdrop-blur p-8 rounded-3xl border border-white/20 relative">
                           <div className="absolute -top-6 left-8 bg-sky-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#0b1c43]">1</div>
                           <h3 className="text-xl font-bold mb-3 mt-4">Consultation</h3>
                           <p className="text-blue-100 text-sm">Meet our gentle surgeons. We explain the procedure in simple terms and answer all your worries.</p>
                       </div>
                       
                       {/* Step 2 */}
                       <div className="bg-white/10 backdrop-blur p-8 rounded-3xl border border-white/20 relative">
                           <div className="absolute -top-6 left-8 bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#0b1c43]">2</div>
                           <h3 className="text-xl font-bold mb-3 mt-4">The Surgery</h3>
                           <p className="text-blue-100 text-sm">Performed in child-friendly OTs with specialized pediatric anesthesia for painless sleep.</p>
                       </div>

                       {/* Step 3 */}
                       <div className="bg-white/10 backdrop-blur p-8 rounded-3xl border border-white/20 relative">
                           <div className="absolute -top-6 left-8 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#0b1c43]">3</div>
                           <h3 className="text-xl font-bold mb-3 mt-4">Happy Recovery</h3>
                           <p className="text-blue-100 text-sm">Our nursing staff helps with feeding and pain management until you are ready to go home safely.</p>
                       </div>
                   </div>
               </div>
          </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="py-20 bg-sky-50">
          <div className="mx-auto w-full max-w-4xl px-4 text-center">
               <h2 className="text-3xl md:text-5xl font-bold text-[#0b1c43] mb-8 font-heading">
                   Ready to help your child smile again?
               </h2>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Link href="/book" className="bg-yellow-400 hover:bg-yellow-500 text-[#0b1c43] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-yellow-400/20 transform hover:-translate-y-1">
                       Book an Appointment
                   </Link>
                   <a href="tel:18001234567" className="bg-white border-2 border-[#0b1c43] text-[#0b1c43] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                       Call for Advice
                   </a>
               </div>
          </div>
      </section>
    </main>
  );
}
