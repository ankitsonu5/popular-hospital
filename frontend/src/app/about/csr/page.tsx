import Image from 'next/image';

const initiatives = [
  {
    title: "Community Health Camps",
    description: "Bringing quality healthcare to the doorstep of the underserved. We organize regular free medical check-up camps in rural areas, offering consultations, screenings, and basic medication.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Education for All",
    description: "We believe education is the foundation of a healthy society. Our scholarship programs and school adoption initiatives support underprivileged children in pursuing their academic dreams.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Green Hospital Initiative",
    description: "Sustainability is at the core of our operations. From solar power generation to rainwater harvesting and zero-waste protocols, we are committed to reducing our environmental footprint.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Disaster Relief & Support",
    description: "In times of crisis, Popular Hospital stands with the community. Our emergency response teams provide immediate medical aid and relief materials during natural disasters and emergencies.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop"
  }
];

export default function CSRPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
            alt="CSR Banner"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Corporate Social Responsibility</h1>
            <p className="mt-4 text-blue-100 max-w-2xl text-lg">
                Healing beyond the hospital walls. Committed to creating a healthier, more equitable world.
            </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
             <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
                    alt="Community Outreach"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">Our Commitment to Society</h2>
                <div className="prose prose-lg text-gray-600">
                    <p>
                        At Popular Hospital, we recognize that our responsibility extends far beyond medical treatments. accessible healthcare, environmental stewardship, and social upliftment are the pillars of our CSR philosophy.
                    </p>
                    <p>
                        Through dedicated programs and volunteer efforts by our staff, we strive to make a tangible difference in the lives of the communities we serve, ensuring that progress touches everyone.
                    </p>
                </div>
            </div>
        </div>

        {/* Initiatives Grid (Alternating) */}
        <div className="space-y-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">Key Initiatives</h2>
                <div className="w-24 h-1 bg-[#00B4D8] mx-auto mt-4 rounded-full"></div>
            </div>

            {initiatives.map((item, index) => (
                <div key={index} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                             <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#0b1c43]/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#0b1c43] font-heading">{item.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {item.description}
                        </p>
                        <button className="text-[#00B4D8] font-semibold hover:text-[#0b1c43] transition-colors flex items-center gap-2 group-hover:gap-3">
                            Learn More <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Call to Action */}


      </div>
    </div>
  );
}
