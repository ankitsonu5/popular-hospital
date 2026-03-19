import Image from 'next/image';

const leaders = [
  {
    name: "Dr. A.K. Kaushik",
    role: "Founder & Chairman",
    image: "/images/dr_ak_kaushik.png",
    bio: "A visionary leader with over 40 years of experience in healthcare. Dr. Kaushik established Popular Hospital with the dream of providing world-class medical care to the community."
  },
  {
    name: "Dr. Kiran Kaushik",
    role: "Managing Director",
    image: "/images/leadership/kiran.png",
    bio: "Dr. Kiran Kaushik brings clinical excellence and strategic leadership, focusing on advancing healthcare standards and academic growth."
  }
];

export default function LeadershipPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center py-12">
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/about_popular/leadership.png"
                alt="Leadership Banner"
                fill
                className="object-cover opacity-50"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/60 via-[#0b1c43]/40 to-[#0b1c43]" />
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
               Our leadership team includes experienced experts from both medical and management fields, all working together with a shared focus on providing high-quality treatment and putting patients first.
            </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="p-6 text-center relative bg-white flex-1 flex flex-col justify-end">
                        {/* Name & Role */}
                        <h3 className="text-xl font-bold text-[#0b1c43] mb-1 font-heading uppercase tracking-tight">{leader.name}</h3>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{leader.role}</p>
                    </div>
                </div>
            ))}

            {/* Quote Box */}
            <div className="lg:col-span-2 bg-[#0b1c43] rounded-2xl overflow-hidden shadow-sm relative flex flex-col items-center justify-center p-12 text-center h-[100%] aspect-[auto] lg:aspect-[auto] md:col-span-2 mt-8 md:mt-0">
                {/* Large Background Quote Mark */}
                <span className="absolute -top-6 -left-2 text-[200px] text-white/5 font-serif leading-none select-none">"</span>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="w-16 h-1 bg-[#E85222] rounded-full mb-8"></div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading mb-6">
                        "Our every employee is a leader of our hospital."
                    </h2>
                    <p className="text-blue-200 text-sm tracking-[0.2em] uppercase font-bold">
                        - The Popular Hospital Philosophy
                    </p>
                </div>
                
                {/* Decorative Pattern */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-[#E85222]/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
        </div>

      </div>
    </div>
  );
}
