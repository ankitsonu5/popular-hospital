import Image from 'next/image';

export const metadata = {
  title: "Our Vision & Mission | Popular Hospital",
  description: "Guiding principles that drive Popular Hospital towards excellence in healthcare and patient safety.",
};

export default function VisionMissionPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ─── Clean Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Vision Banner"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00B4D8]"></div>
            <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">Our Foundation</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight leading-tight">
            Vision & Mission
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Guiding principles that drive Popular Hospital towards excellence in healthcare and patient safety.
          </p>
        </div>
      </section>

      {/* ─── Vision Section ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/images/leadership/dr-ak-kaushik.jpg"
                  alt="Dr. A.K. Kaushik - Founder of Popular Hospital"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg">Dr. A.K. Kaushik</p>
                  <p className="text-white/80 text-sm">Founder Chairman</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-[#00B4D8] font-bold text-sm uppercase tracking-widest">Our Vision</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
                Touch Thousands of Lives
              </h2>
              <div className="mt-2 w-16 h-1 bg-[#E85222] rounded-full"></div>

              <div className="mt-8 space-y-5 text-gray-600 text-base leading-relaxed">
                <p className="text-lg text-[#0b1c43] font-medium border-l-4 border-[#00B4D8] pl-5 italic">
                  Popular Hospital's vision for the next phase of development is to 'Touch Thousands of Lives'.
                </p>
                <p>
                  Popular Hospital was established in 2000 by Dr. A.K. Kaushik, renowned as the architect of modern healthcare in the region. As the region's pioneering super-specialty hospital, Popular Hospital is acclaimed for leading the healthcare revolution.
                </p>
                <p>
                  Popular Hospital has emerged as the foremost integrated healthcare services provider with a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics.
                </p>
                <p>
                  The cornerstones of Popular's legacy are its focus on clinical excellence, affordable costs, modern technology and forward-looking research & academics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission Section ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content */}
            <div className="order-2 lg:order-1">
              <span className="text-[#E85222] font-bold text-sm uppercase tracking-widest">Our Mission</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
                Healthcare Within Everyone's Reach
              </h2>
              <div className="mt-2 w-16 h-1 bg-[#00B4D8] rounded-full"></div>

              <div className="mt-8 space-y-5 text-gray-600 text-base leading-relaxed">
                <p className="text-lg text-[#0b1c43] font-medium border-l-4 border-[#E85222] pl-5 italic">
                  "Our mission is to bring healthcare of International standards within the reach of every individual."
                </p>
                <p>
                  We are committed to the achievement and maintenance of excellence in education, research and healthcare for the benefit of humanity.
                </p>
                <p>
                  Popular Hospital has championed numerous social initiatives to assist the community. Our foundation endeavours to keep citizens healthy through preventive care, early screening, and accessible treatment programs.
                </p>
                <p>
                  We aim to provide holistic healthcare for the entire community — starting from birth, through childhood, adolescence, adulthood and old age — ensuring quality care at every stage of life.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop"
                  alt="Our Mission - Healthcare Excellence"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values Strip ─── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading mb-16">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Compassion", desc: "Treating every patient with empathy, dignity, and genuine care.", icon: "❤️" },
              { title: "Excellence", desc: "Maintaining the highest standards in clinical quality and safety.", icon: "⭐" },
              { title: "Integrity", desc: "Upholding ethical practices and transparency in all we do.", icon: "🤝" },
              { title: "Innovation", desc: "Embracing modern technology to deliver better patient outcomes.", icon: "💡" },
            ].map((value, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h4 className="text-[#0b1c43] font-bold text-xl mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
