import Image from 'next/image';

const leaders = [
  {
    name: "Dr. A.K. Kaushik",
    role: "Founder & Chairman",
    image: "/images/leadership/dr-ak-kaushik.jpg",
    bio: "A visionary leader with over 40 years of experience in healthcare. Dr. Kaushik established Popular Hospital with the dream of providing world-class medical care to the community."
  },
  {
    name: "Dr. Kiran Kaushik",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1000&auto=format&fit=crop",
    bio: "Dr. Kiran Kaushik brings clinical excellence and strategic leadership, focusing on advancing healthcare standards and academic growth."
  }
];

export default function LeadershipPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop"
                alt="Leadership Banner"
                fill
                className="object-cover opacity-20 mix-blend-overlay"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/80 via-[#0b1c43]/50 to-[#0b1c43]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">Leadership Team</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto font-light">
                Meet the visionaries guiding Popular Hospital towards a healthier future.
            </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-[#0b1c43] mb-4 font-heading">Guiding with Purpose</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
                Our leadership team comprises distinguished professionals from medical and management backgrounds, united by a common commitment to clinical excellence and patient-centric care.
            </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 text-center relative bg-white">
                        {/* Name & Role */}
                        <h3 className="text-xl font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight">{leader.name}</h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{leader.role}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
