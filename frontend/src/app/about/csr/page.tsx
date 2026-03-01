import Image from 'next/image';

const initiatives = [
  {
    title: "Community Health Camps",
    description: "Bringing quality healthcare to the doorstep of the underserved. We organize regular free medical check-up camps in rural areas, offering consultations, screenings, and basic medication.",
    icon: "🏥"
  },
  {
    title: "Education for All",
    description: "We believe education is the foundation of a healthy society. Our scholarship programs and school adoption initiatives support underprivileged children in pursuing their academic dreams.",
    icon: "📚"
  },
  {
    title: "Green Hospital Initiative",
    description: "Sustainability is at the core of our operations. From solar power generation to rainwater harvesting and zero-waste protocols, we are committed to reducing our environmental footprint.",
    icon: "🌱"
  },
  {
    title: "Disaster Relief & Support",
    description: "In times of crisis, Popular Hospital stands with the community. Our emergency response teams provide immediate medical aid and relief materials during natural disasters and emergencies.",
    icon: "🚑"
  }
];

export default function CSRPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* ─── Hero Section ─── */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center py-12">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
                alt="CSR Banner"
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-4 block drop-shadow-md">Our Impact</span>
            <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tight drop-shadow-md">Social Responsibility</h1>
            <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full mb-6"></div>
            <p className="text-base md:text-lg text-blue-100/70 leading-relaxed max-w-2xl mx-auto font-light">
                Healing beyond the hospital walls. Committed to creating a healthier, more equitable world through dedicated community outreach.
            </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-4 py-16">
        
        {/* Simplified Intro Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1c43] font-heading mb-6 uppercase tracking-tight">Our Commitment to Society</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                    At Popular Hospital, we recognize that our responsibility extends far beyond medical treatments. Accessible healthcare, environmental stewardship, and social upliftment are the pillars of our CSR philosophy.
                </p>
                <p>
                    Through dedicated programs and volunteer efforts by our staff, we strive to make a tangible difference in the lives of the communities we serve.
                </p>
            </div>
        </div>

        {/* Simplified Initiatives Grid - No Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((item, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-hospital-teal transition-all group">
                    <div className="text-4xl mb-6">{item.icon}</div>
                    <h3 className="text-xl font-bold text-[#0b1c43] font-heading mb-3 uppercase tracking-tight transition-colors group-hover:text-hospital-teal">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>

        {/* Simple Footer Note */}
        <div className="mt-20 pt-12 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm italic">
                Touching thousands of lives with compassion, excellence, and modern medical science.
            </p>
        </div>

      </div>
    </div>
  );
}
