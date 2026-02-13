import Image from 'next/image';

const awards = [
  {
    title: "Best Multi-Specialty Hospital - North India",
    organization: "Times Health Icons",
    year: "2024",
    description: "Recognized for outstanding clinical outcomes, advanced infrastructure, and patient satisfaction rates.",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Excellence in Patient Safety",
    organization: "National Quality Council",
    year: "2023",
    description: "Awarded for maintaining distinctively high standards of hygiene and infection control protocols.",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Green Hospital Award",
    organization: "Environmental Health Association",
    year: "2022",
    description: "Honored for sustainable practices, including solar energy adoption and waste management efficiency.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Best Cardiology Department",
    organization: "Global Healthcare Summit",
    year: "2021",
    description: "Acknowledging our pioneering work in non-invasive cardiac procedures and emergency response times.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=600&auto=format&fit=crop"
  }
];

export default function AwardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1600&auto=format&fit=crop"
            alt="Awards Banner"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Awards & Recognition</h1>
            <p className="mt-4 text-blue-100 max-w-2xl text-lg">
                Celebrating our commitment to excellence and the trust you place in us.
            </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#0b1c43] mb-4 font-heading">A Legacy of Excellence</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
                Over the years, Popular Hospital has been consistently recognized by national and international bodies for its medical expertise, state-of-the-art facilities, and contribution to the community.
            </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row h-full">
                    {/* Image Side */}
                    <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden group">
                        <Image
                            src={award.image}
                            alt={award.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-[#00B4D8] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                            {award.year}
                        </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                        <div className="mb-2">
                             <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{award.organization}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#0b1c43] mb-3 font-heading leading-tight group-hover:text-[#00B4D8] transition-colors">
                            {award.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {award.description}
                        </p>
                       
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
