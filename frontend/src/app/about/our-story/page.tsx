import Image from 'next/image';

export default function OurStoryPage() {
  const milestones = [
    {
      year: "2000",
      title: "The Inception",
      description: "Popular Hospital opened its doors with a modest 50-bed facility, driven by Dr. Founder Name's vision to make quality healthcare accessible to all in Varanasi.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop"
    },
    {
      year: "2008",
      title: "Rapid Expansion",
      description: "Recognizing the growing needs of the community, we expanded to 200 beds and introduced our first Intensive Care Unit (ICU) and advanced diagnostic center.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop"
    },
    {
      year: "2015",
      title: "Super Specialty Era",
      description: "Marking a new era, Popular Hospital launched specialized departments for Cardiology enabling complex surgeries and treatments closer to home.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=600&auto=format&fit=crop"
    },
    {
      year: "2024",
      title: "A Healthcare Leader",
      description: "Today, with over 500 beds, robotic surgery capabilities, and JCI accreditation, Popular Hospital stands as one of the region's most trusted healthcare institutions.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1587351021759-3e566b9af923?q=80&w=1600&auto=format&fit=crop"
            alt="Our Story Banner"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Our Story</h1>
            <p className="mt-4 text-blue-100 max-w-2xl text-lg">
                A journey of compassion, innovation, and unwavering commitment to healing, spanning over two decades.
            </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        
        {/* Introduction */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">From Humble Beginnings</h2>
                    <div className="prose prose-lg text-gray-600">
                        <p>
                            The story of Popular Hospital is not just about buildings and medical equipment; it is a story of purpose. Established in 2000, it began with a simple belief: that geography should not determine the quality of healthcare one receives.
                        </p>
                        <p>
                            What started as a small clinic has blossomed into a multi-specialty quaternary care hospital, transforming the medical landscape of the region. Through challenges and triumphs, our core mission has remained unchanged – to put the patient first.
                        </p>
                    </div>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1000&auto=format&fit=crop"
                        alt="Popular Hospital Early Days"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
            <h2 className="text-3xl font-bold text-[#0b1c43] text-center mb-16 font-heading">Milestones of Excellence</h2>
            
            {/* Center Line (Hidden on mobile) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block rounded-full"></div>

            <div className="space-y-12 md:space-y-0">
                {milestones.map((milestone, index) => (
                    <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Content Side */}
                        <div className="flex-1 w-full">
                            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                {/* Mobile Connect Line */}
                                <div className="hidden md:block absolute top-1/2 w-8 h-1 bg-gray-200 -mt-0.5 z-0"
                                     style={{ [index % 2 === 0 ? 'right' : 'left']: '-2rem' }}></div>
                                
                                <span className="inline-block px-3 py-1 bg-[#00B4D8]/10 text-[#0096B4] font-bold rounded-full mb-3 text-sm">
                                    {milestone.year}
                                </span>
                                <h3 className="text-xl font-bold text-[#0b1c43] mb-2">{milestone.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        </div>

                        {/* Dot on Timeline */}
                        <div className="relative z-10 w-4 h-4 rounded-full bg-[#0b1c43] border-4 border-white shadow-md hidden md:block"></div>

                        {/* Image Side */}
                        <div className="flex-1 w-full hidden md:block">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md group">
                                <Image
                                    src={milestone.image}
                                    alt={milestone.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0b1c43]/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
