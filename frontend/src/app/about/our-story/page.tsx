import Image from 'next/image';

export const metadata = {
  title: "Our Story & Legacy | Popular Hospital",
  description: "Discover the journey of Popular Hospital from a humble 50-bed facility to a leading multi-specialty healthcare institution in the region.",
};

const milestones = [
  {
    year: "2000",
    title: "The Inception",
    description: "Popular Hospital opened its doors with a modest 50-bed facility, driven by Dr. A.K. Kaushik's vision to make quality healthcare accessible to all in Varanasi. It was a time of limited resources but unlimited passion.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2008",
    title: "Rapid Expansion",
    description: "Recognizing the growing needs of the community, we expanded to 200 beds and introduced our first Intensive Care Unit (ICU) and advanced diagnostic center, setting a new standard for emergency care.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2015",
    title: "Super Specialty Era",
    description: "Marking a new era, Popular Hospital launched specialized departments for Cardiology enabling complex surgeries and treatments closer to home. This reduced the need for patients to travel to metro cities.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2024",
    title: "A Healthcare Leader",
    description: "Today, with over 500 beds, robotic surgery capabilities, and JCI accreditation, Popular Hospital stands as one of the region's most trusted healthcare institutions, touching over 1 million lives annually.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd8189718c?q=80&w=600&auto=format&fit=crop"
  }
];

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
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital History Hero"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/80 via-[#0b1c43]/50 to-[#0b1c43]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E85222]/20 text-[#E85222] border border-[#E85222]/30 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Est. 2000
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading tracking-tight drop-shadow-lg">
            Our Legacy of Care
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
            From a small clinic to a healthcare ecosystem. A journey defined by compassion, innovation, and an unwavering commitment to the community.
          </p>
        </div>
      </section>

      {/* ─── Introduction ─── */}
      <section className="py-20 md:py-28 bg-white" id="introduction">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg z-10">
                <Image
                   src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1000&auto=format&fit=crop"
                   alt="Popular Hospital Early Days"
                   fill
                   className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1c43]/40 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E85222]/10 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-hospital-teal/10 rounded-full blur-3xl -z-0"></div>
              
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                <p className="text-[#0b1c43] font-bold italic font-heading text-lg">
                  "Geography should not determine the quality of healthcare one receives."
                </p>
                <p className="text-gray-500 text-sm mt-2">- Founder's Vision</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0b1c43] font-heading leading-tight">
                From Humble <span className="text-hospital-teal">Beginnings</span>
              </h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6">
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

      {/* ─── Timeline ─── */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
             <span className="text-[#E85222] font-bold uppercase tracking-widest text-sm">Where we came from</span>
             <h2 className="text-4xl font-bold text-[#0b1c43] mt-2 font-heading">Milestones of Excellence</h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300 hidden md:block" />

            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-10 md:gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} group`}>
                  
                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-center md:text-left`}>
                     <div className="inline-block px-4 py-1.5 bg-[#0b1c43] text-white font-bold text-xl rounded-full mb-6 shadow-lg z-20 relative">
                        {milestone.year}
                     </div>
                     <h3 className="text-2xl md:text-3xl font-bold text-[#0b1c43] mb-4 font-heading group-hover:text-[#E85222] transition-colors">{milestone.title}</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">
                        {milestone.description}
                     </p>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#E85222] z-20 hidden md:block group-hover:scale-150 transition-transform duration-300 shadow-[0_0_0_4px_rgba(232,82,34,0.2)]"></div>

                  {/* Image Side */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                     <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500 transform group-hover:-translate-y-2 border-4 border-white">
                        <Image
                           src={milestone.image}
                           alt={milestone.title}
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#0b1c43]/20 group-hover:bg-transparent transition-colors duration-500" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
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
