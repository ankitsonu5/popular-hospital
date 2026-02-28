import Image from 'next/image';

export const metadata = {
  title: "Our Story & Legacy | Popular Hospital",
  description: "Discover the journey of Popular Hospital from a humble 50-bed facility to a leading multi-specialty healthcare institution in the region.",
};


const stats = [
  { label: "Years of Service", value: "25+" },
  { label: "Patients Treated", value: "2M+" },
  { label: "Expert Doctors", value: "150+" },
  { label: "Specialties", value: "30+" },
];

export default function OurStoryPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital History Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/60 via-[#0b1c43]/40 to-[#0b1c43]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E85222]/20 text-[#E85222] border border-[#E85222]/30 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Est. 1994
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight drop-shadow-lg">
            Our Legacy of Care
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
            From a small clinic to a healthcare ecosystem. A journey defined by compassion, innovation, and an unwavering commitment to the community.
          </p>
        </div>
      </section>

      {/* ─── Introduction ─── */}
      <section className="py-20 md:py-28 bg-white overflow-hidden" id="introduction">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8 text-center sm:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c43] font-heading leading-tight">
                From Humble <span className="text-hospital-teal">Beginnings</span>
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                <p>
                  The story of Popular Hospital is not just about buildings and medical equipment; it is a story of purpose. Established at the turn of the millennium, it began with a simple yet powerful belief: that world-class healthcare should be accessible to everyone, regardless of their location.
                </p>
                <p>
                  What started as a modest 50-bed facility has blossomed into a quaternary care institution, transforming the medical landscape of Varanasi and its surrounding regions. We faced challenges, embraced technology, and expanded our horizons, but our core mission remained unchanged – <strong>to put the patient first.</strong>
                </p>
                <p>
                  Today, we are more than just a hospital; we are a center of hope and healing, bridging the gap between advanced medical science and compassionate care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Legacy Timeline ─── */}
      <section className="py-16 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0b1c43] font-heading tracking-tight mb-6">
              Our Milestones
            </h2>
            <div className="w-24 md:w-32 h-1.5 md:h-2 bg-[#E85222] rounded-full mx-auto mb-6"></div>
          </div>

          <div className="relative pb-10 md:pb-24 mt-10">
             {/* Main Vertical Line */}
             <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 md:-translate-x-1/2 z-0 rounded-full"></div>

             <div className="space-y-24 md:space-y-40 relative z-10 w-full">
                
                {/* 1994 */}
                <div className="relative flex flex-col md:flex-row items-center w-full group pt-4 md:pt-0">
                   {/* Center Year Marker */}
                   <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col md:items-center top-0 md:top-1/2 md:-translate-y-1/2 z-20 w-[46px] md:w-auto">
                      <div className="w-5 h-5 md:w-8 md:h-8 bg-[#E85222] rounded-full ring-8 md:ring-[12px] ring-white shadow-xl group-hover:scale-125 transition-transform duration-500 mx-auto md:mb-4"></div>
                      <h3 className="text-4xl md:text-6xl font-black text-[#0b1c43] tracking-tighter bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl absolute left-12 top-[-16px] md:static md:bg-transparent md:px-6 md:py-0 shadow-sm md:shadow-none whitespace-nowrap">1994</h3>
                   </div>

                   {/* Content Container */}
                   <div className="w-full pl-24 sm:pl-28 md:pl-0 flex flex-col md:flex-row items-center gap-8 md:gap-0 mt-8 md:mt-0">
                       <div className="w-full md:w-1/2 flex flex-col md:items-end md:pr-16 lg:pr-24">
                          <div className="w-full max-w-full md:max-w-[500px] relative mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 flex items-center justify-center bg-gray-50">
                             <Image src="/legacy/legacy-one.png" alt="1994 Timeline" width={600} height={600} className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700" unoptimized />
                          </div>
                          <div className="w-full md:max-w-[500px] text-left md:text-right">
                             <p className="text-[#E85222] text-sm md:text-lg font-black uppercase tracking-[0.2em]">Early Foundation</p>
                          </div>
                       </div>
                       
                       <div className="w-full md:w-1/2 md:pl-16 lg:pl-24">
                          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-100/60 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start">
                                 <span className="text-hospital-teal text-2xl md:text-4xl font-black font-mono mt-0 shrink-0 w-12 md:w-16">01.</span>
                                 <span className="text-gray-700 text-lg md:text-2xl leading-relaxed font-semibold">
                                    A small dream: safe childbirth & ethical surgery
                                 </span>
                              </div>
                          </div>
                       </div>
                   </div>
                </div>

                {/* 2000s */}
                <div className="relative flex flex-col md:flex-row items-center w-full group pt-4 md:pt-0">
                   {/* Center Year Marker */}
                   <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col md:items-center top-0 md:top-1/2 md:-translate-y-1/2 z-20 w-[46px] md:w-auto">
                      <div className="w-5 h-5 md:w-8 md:h-8 bg-[#E85222] rounded-full ring-8 md:ring-[12px] ring-white shadow-xl group-hover:scale-125 transition-transform duration-500 mx-auto md:mb-4"></div>
                      <h3 className="text-4xl md:text-6xl font-black text-[#0b1c43] tracking-tighter bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl absolute left-12 top-[-16px] md:static md:bg-transparent md:px-6 md:py-0 shadow-sm md:shadow-none whitespace-nowrap">2000s</h3>
                   </div>

                   {/* Content Container */}
                   <div className="w-full pl-24 sm:pl-28 md:pl-0 flex flex-col md:flex-row items-center gap-8 md:gap-0 mt-8 md:mt-0">
                       {/* Keep Image Left for visual consistency or alternate. Visual consistency is good here. */}
                       <div className="w-full md:w-1/2 flex flex-col md:items-end md:pr-16 lg:pr-24">
                          <div className="w-full max-w-full md:max-w-[500px] relative mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 flex items-center justify-center bg-gray-50">
                             <Image src="/legacy/legacy-two.png" alt="2000s Timeline" width={600} height={600} className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700" unoptimized />
                          </div>
                          <div className="w-full md:max-w-[500px] text-left md:text-right">
                             <p className="text-[#E85222] text-sm md:text-lg font-black uppercase tracking-[0.2em]">Growth & Expansion</p>
                          </div>
                       </div>
                       
                       <div className="w-full md:w-1/2 md:pl-16 lg:pl-24">
                          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-100/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-6 md:gap-8">
                              <div className="flex items-start">
                                 <span className="text-hospital-teal text-2xl md:text-4xl font-black font-mono mt-0 shrink-0 w-12 md:w-16">01.</span>
                                 <span className="text-gray-700 text-lg md:text-2xl leading-relaxed font-semibold">
                                    Rise of NICU, ICU, advanced gynecology
                                 </span>
                              </div>
                              <div className="flex items-start">
                                 <span className="text-hospital-teal text-2xl md:text-4xl font-black font-mono mt-0 shrink-0 w-12 md:w-16">02.</span>
                                 <span className="text-gray-700 text-lg md:text-2xl leading-relaxed font-semibold">
                                    2010s – Robotics, IVF, Ortho, Cosmetic added
                                 </span>
                              </div>
                          </div>
                       </div>
                   </div>
                </div>

                {/* Today */}
                <div className="relative flex flex-col md:flex-row items-center w-full group pt-4 md:pt-0">
                   {/* Center Year Marker */}
                   <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col md:items-center top-0 md:top-1/2 md:-translate-y-1/2 z-20 w-[46px] md:w-auto">
                      <div className="w-5 h-5 md:w-8 md:h-8 bg-[#E85222] rounded-full ring-8 md:ring-[12px] ring-white shadow-xl group-hover:scale-125 transition-transform duration-500 mx-auto md:mb-4"></div>
                      <h3 className="text-4xl md:text-6xl font-black text-[#0b1c43] tracking-tighter bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl absolute left-12 top-[-16px] md:static md:bg-transparent md:px-6 md:py-0 shadow-sm md:shadow-none whitespace-nowrap">Today</h3>
                   </div>

                   {/* Content Container */}
                   <div className="w-full pl-24 sm:pl-28 md:pl-0 flex flex-col md:flex-row items-center gap-8 md:gap-0 mt-8 md:mt-0">
                       <div className="w-full md:w-1/2 flex flex-col md:items-end md:pr-16 lg:pr-24">
                          <div className="w-full max-w-full md:max-w-[500px] relative mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 flex items-center justify-center bg-gray-50">
                             <Image src="/legacy/legacy-three.jpg" alt="Today Timeline" width={600} height={600} className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700" unoptimized />
                          </div>
                          <div className="w-full md:max-w-[500px] text-left md:text-right">
                             <p className="text-[#E85222] text-sm md:text-lg font-black uppercase tracking-[0.2em]">Modern Healthcare</p>
                          </div>
                       </div>
                       
                       <div className="w-full md:w-1/2 md:pl-16 lg:pl-24">
                          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-100/60 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start">
                                 <span className="text-hospital-teal text-2xl md:text-4xl font-black font-mono mt-0 shrink-0 w-12 md:w-16">01.</span>
                                 <span className="text-gray-700 text-lg md:text-2xl leading-relaxed font-semibold">
                                    A trusted healing destination for thousands
                                 </span>
                              </div>
                          </div>
                       </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="py-16 bg-[#0b1c43] text-white">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E85222] mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── Philosophy/CTA ─── */}
      <section className="py-24 bg-white">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] mb-8 font-heading">
               The Journey Continues
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
               While we are proud of our history, our eyes are firmly set on the future. We continue to invest in the latest technology, recruit the best minds, and expand our reach, because for us, healthcare is not a business—it’s a calling.
            </p>
            <div className="w-24 h-1 bg-[#E85222] mx-auto rounded-full"></div>
         </div>
      </section>

    </div>
  );
}
