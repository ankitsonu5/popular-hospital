import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", image: "/images/departments-images/cardiology.jpeg", href: "/specialties/cardiology" },
  { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", image: "/images/departments-images/neuro-surgery.jpeg", href: "/specialties/neurosurgery" },
  { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", image: "/images/departments-images/gastroenterology.jpeg", href: "/specialties/gastroenterology" },
  { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", image: "/images/departments-images/AdobeStock_1010757604.jpeg", href: "/specialties/nephrology" },
  { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", image: "/images/departments-images/oncology.jpeg", href: "/specialties/oncology" },
  { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", image: "/images/departments-images/urology.jpeg", href: "/specialties/urology" },
  { title: "Burns & Plastic", desc: "Reconstructive and cosmetic surgery services.", image: "/images/departments-images/AdobeStock_222372294.jpeg", href: "/specialties/burns-plastic-surgery" },
  { title: "Laparoscopic", desc: "Minimally invasive general surgical procedures.", image: "/images/departments-images/laparoscopic.jpeg", href: "/specialties/general-surgery" },
  { title: "Obstetrics", desc: "Care for pregnancy, childbirth, and women's health.", image: "/images/hospital-sample.jpg", href: "/specialties/gynaecology" },
  { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", image: "/images/departments-images/paediatrics.jpeg", href: "/specialties/pediatrics" },
  { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", image: "/images/departments-images/orthopaedic.jpeg", href: "/specialties/orthopedics" },
  { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", image: "/images/departments-images/general-medicine.jpeg", href: "/specialties/general-medicine" },
  { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", image: "/images/departments-images/ent.jpeg", href: "/specialties/ent" },
  { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", image: "/images/departments-images/ophthalmology.jpeg", href: "/specialties/ophthalmology" },
  { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", image: "/images/departments-images/dental-care.jpeg", href: "/specialties/dental" },
  { title: "Pulmonology", desc: "Respiratory and lung health specialists.", image: "/images/departments-images/pulmonology.jpeg", href: "/specialties/respiratory" },
  { title: "Pathology", desc: "Advanced diagnostic laboratory services.", image: "/images/departments-images/pathology.jpeg", href: "/specialties/pathology" },
  { title: "Radiology", desc: "Advanced imaging services including X-ray, MRI, and CT Scan.", image: "/images/departments-images/radiology.jpeg", href: "/specialties/radiology" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
            alt="Our Services"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Our Services
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Services</span>
            </nav>
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
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full h-48 relative flex-shrink-0 bg-gray-100">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Department
                    </span>
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 font-heading leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-3">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <Link
                      href={service.href}
                      className="w-10 h-10 rounded-full bg-[#E85222] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all shadow-lg group-hover:bg-[#d14011]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
