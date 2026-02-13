

import Link from 'next/link';

const services = [
  { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", icon: "heart" },
  { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", icon: "brain" },
  { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", icon: "stomach" },
  { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", icon: "kidney" },
  { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", icon: "ribbon" },
  { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", icon: "bladder" },
  { title: "Burns & Plastic", desc: "Reconstructive and cosmetic surgery services.", icon: "burn" },
  { title: "Laparoscopic", desc: "Minimally invasive general surgical procedures.", icon: "scalpel" },
  { title: "Obstetrics", desc: "Care for pregnancy, childbirth, and women's health.", icon: "baby" },
  { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", icon: "child" },
  { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", icon: "bone" },
  { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", icon: "pill" },
  { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", icon: "ear" },
  { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", icon: "eye" },
  { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", icon: "tooth" },
  { title: "Pulmonology", desc: "Respiratory and lung health specialists.", icon: "lungs" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
        {/* Header Section */}
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
            <div className="mx-auto w-full max-w-[1440px]">
                <div className="max-w-3xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block">
                        Our Expertise
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1d1d1f] font-heading tracking-tight mb-6">
                        Specialized Departments.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                        At Popular Hospital, we provide world-class healthcare across a wide range of specialties. Our dedicated teams of doctors and specialists ensure the best possible care for every patient.
                    </p>
                </div>
            </div>
        </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[320px] overflow-hidden"
              >
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Department</span>
                  <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4 font-heading leading-tight max-w-[80%]">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[90%] font-medium">
                    {service.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-end justify-between">
                    <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="ml-auto w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all shadow-lg group-hover:bg-[#0066cc]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
