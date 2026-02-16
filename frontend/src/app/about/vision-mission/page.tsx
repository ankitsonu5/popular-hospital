import Image from 'next/image';

export default function VisionMissionPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Services/Hero Banner (Optional) - Keeping it simple white card style as requested */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop"
            alt="Vision Banner"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Our Vision & Mission</h1>
            <p className="mt-4 text-blue-100 max-w-2xl text-lg">
                Guiding principles that drive Popular Hospital towards excellence in healthcare and patient safety.
            </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-[1366px] px-4 py-16 space-y-20">
        
        {/* Section 1: Our Vision */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left: Founder Image */}
                <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/leadership/dr-ak-kaushik.jpg"
                            alt="Dr. A.K. Kaushik - Founder of Popular Hospital"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <p className="text-lg font-bold">Dr. A.K. Kaushik</p>
                            <p className="text-sm opacity-90">Founder Chairman</p>
                        </div>
                    </div>
                </div>

                {/* Right: Vision Text */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">Our Vision</h2>
                    
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        <p className="font-semibold text-gray-800 text-xl border-l-4 border-[#00B4D8] pl-4 italic">
                            Popular Hospital's vision for the next phase of development is to <span className="text-[#0b1c43]">'Touch a Billion Lives'</span>.
                        </p>
                        <p>
                            Popular Hospital was established in 2000 by Dr. Founder Name, renowned as the architect of modern healthcare in the region. As the nation's first corporate hospital, Popular Hospital is acclaimed for pioneering the private healthcare revolution in the country.
                        </p>
                        <p>
                            Popular Hospital has emerged as the foremost integrated healthcare services provider and has a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics and several retail health models.
                        </p>
                        <p>
                            The cornerstones of Popular's legacy are its unstinting focus on clinical excellence, affordable costs, modern technology and forward-looking research & academics. Popular Hospital was among the first few hospitals in the world to leverage technology to facilitate seamless healthcare delivery.
                        </p>
                        <p>
                            Since its inception, Popular Hospital has been honoured by the trust of over 150 million individuals who came from 140 countries. At the core of Popular's patient-centric culture is TLC (Tender Loving Care), the magic that inspires hope amongst its patients.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: Our Mission */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Mission Text */}
                <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">Our Mission</h2>
                    
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        <p className="font-bold text-gray-800">
                            “Our mission is to bring healthcare of International standards within the reach of every individual. We are committed to the achievement and maintenance of excellence in education, research and healthcare for the benefit of humanity”
                        </p>
                        <p>
                            Likewise, envisioned by Dr. Founder Name, the "Healthy Hearts Foundation" endeavours to keep citizens heart-healthy. Popular Hospital has championed numerous social initiatives – to cite a few which assist underprivileged children – SACHi (Save a Child's Heart Initiative) which screens and provides paediatric cardiac care for congenital heart diseases.
                        </p>
                        <p>
                            To introduce population health into the narrative, the Total Health Foundation is piloting a unique model of healthcare. It aims to provide "holistic healthcare" for the entire community starting from birth, through one's journey into childhood, adolescence, adulthood and old age.
                        </p>
                        <p>
                           In a rare honour, the Government has issued a commemorative stamp in recognition of Popular's widespread contributions, the first for a healthcare organization.
                        </p>
                    </div>
                </div>

                {/* Right: Teamwork Image */}
                <div className="lg:col-span-5 relative order-1 lg:order-2">
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=800&auto=format&fit=crop"
                            alt="Teamwork at Popular Hospital"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0b1c43]/10 mix-blend-multiply"></div>
                    </div>
                </div>

             </div>
        </section>
      
      </div>
    </div>
  );
}
