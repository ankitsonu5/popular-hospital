import Image from 'next/image';

const leaders = [
  {
    name: "Dr. A.K. Kaushik",
    role: "Founder & Chairman",
    image: "/images/leadership/dr-ak-kaushik.jpg",
    bio: "A visionary leader with over 40 years of experience in healthcare. Dr. Kaushik established Popular Hospital with the dream of providing world-class medical care to the community."
  },
  {
    name: "Ms. Sarah Johnson",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Ms. Johnson brings dynamic leadership and strategic insight, steering the hospital towards new heights of operational excellence and patient satisfaction."
  },
  {
    name: "Dr. Robert Chen",
    role: "Medical Director",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
    bio: "Renowned for his clinical acumen, Dr. Chen oversees the medical standards and quality assurance protocols, ensuring every patient receives the best care."
  },
  {
    name: "Mr. David Smith",
    role: "Chief Executive Officer (CEO)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    bio: "With a strong background in hospital administration, Mr. Smith focuses on innovation, growth, and building a compassionate organizational culture."
  }
];

export default function LeadershipPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop"
            alt="Leadership Banner"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Leadership Team</h1>
            <p className="mt-4 text-blue-100 max-w-2xl text-lg">
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
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <p className="text-white text-sm line-clamp-3">
                                {leader.bio}
                            </p>
                        </div>
                    </div>
                    <div className="p-6 text-center relative bg-white">
                        {/* Name & Role */}
                        <h3 className="text-xl font-bold text-[#0b1c43] mb-1 font-heading group-hover:text-[#00B4D8] transition-colors">{leader.name}</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{leader.role}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
