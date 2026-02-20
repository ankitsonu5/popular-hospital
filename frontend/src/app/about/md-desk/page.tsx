import Image from 'next/image';

const mdData = {
  name: "Dr. Kiran Kaushik",
  role: "MANAGING DIRECTOR",
  qualifications: "POPULAR GROUP OF HOSPITALS & ACADEMICS",
  subtitle: "MBBS, MD (OBS & GYNAE), MS-BHU",
  extra: "SR. OBS., GYNAE. & FERTILITY EXPERT",
  image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop",
  message: [
    "As the Managing Director, I am committed to fostering an environment where clinical excellence meets compassionate care. Our focus is on advancing women's health and fertility services by integrating the latest medical breakthroughs with a personalized touch.",
    "We believe in the power of education and research to transform healthcare delivery. Popular Group's academic wings are designed to nurture the next generation of medical professionals who value integrity and patient well-being above all.",
    "Our mission is to ensure that every individual who walks through our doors receives international standard care. We are continuously expanding our reach and capabilities to serve the community better every day."
  ]
};

export const metadata = {
  title: "From MD's Desk | Popular Hospital",
  description: "A message from our Managing Director, Dr. Kiran Kaushik, on her vision for excellence in healthcare.",
};

export default function MDDeskPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white py-12 md:py-16">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Perspective</span>
          <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tight">From MD's Desk</h1>
          <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: MD Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src={mdData.image}
                  alt={mdData.name}
                  fill
                  className="object-cover"
                  priority
                />
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-2xl font-black text-[#0b1c43] font-heading mb-1 uppercase tracking-tight">
                  {mdData.name}
                </h2>
                <p className="text-hospital-orange font-bold text-xs tracking-widest uppercase mb-6">{mdData.role}</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5 text-hospital-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v6m0 0l4-2m-4 2l-4-2" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Qualifications</p>
                      <p className="text-xs font-bold text-gray-700 uppercase leading-tight mt-1">{mdData.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5 text-hospital-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Responsibility</p>
                      <p className="text-xs font-bold text-gray-700 uppercase leading-tight mt-1">{mdData.qualifications}</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Right: Message Area */}
          <div className="lg:col-span-7 flex flex-col pt-4">
             <div className="bg-white p-2 md:p-4 relative">
                <div className="absolute top-0 left-0 w-16 h-1 bg-hospital-teal rounded-full"></div>
                <div className="mt-8 space-y-8">
                  {mdData.message.map((para, i) => (
                    <p key={i} className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-16 pt-12 border-t border-gray-100 italic text-gray-400 text-lg">
                Touching thousands of lives with compassion, excellence, and modern medical science.
                </div>

                <div className="mt-12 group">
                   <span className="text-hospital-teal font-signature text-3xl mb-2 italic block">Kiran Kaushik</span>
                   <div className="w-20 h-0.5 bg-gray-100 group-hover:bg-hospital-teal transition-all duration-500 mb-2"></div>
                   <p className="text-sm font-black text-[#0b1c43] uppercase tracking-widest">{mdData.name}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-wider">Managing Director</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
