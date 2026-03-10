import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", image: "/images/departments-images/cardiology.jpeg", href: "/departments/cardiology" },
  { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", image: "/images/departments-images/neuro-surgery.jpeg", href: "/departments/neurosurgery" },
  { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", image: "/images/departments-images/gastroenterology.jpeg", href: "/departments/gastroenterology" },
  { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", image: "/images/departments-images/AdobeStock_1010757604.jpeg", href: "/departments/nephrology" },
  { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", image: "/images/departments-images/oncology.jpeg", href: "/departments/oncology" },
  { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", image: "/images/departments-images/urology.jpeg", href: "/departments/urology" },
  { title: "Burns & Plastic Surgery", desc: "Reconstructive and cosmetic surgery services.", image: "/images/departments-images/AdobeStock_222372294.jpeg", href: "/departments/burns-plastic-surgery" },
  { title: "Laparoscopic Surgery", desc: "Minimally invasive general surgical procedures.", image: "/images/departments-images/laparoscopic.jpeg", href: "/departments/general-surgery" },
  { title: "Obstetrics and Gynecology", desc: "Care for pregnancy, childbirth, and women's health.", image: "/images/hospital-sample.jpg", href: "/departments/gynaecology" },
  { title: "Paediatrics and Neonatology", desc: "Medical care for infants, children, and adolescents.", image: "/images/departments-images/paediatrics.jpeg", href: "/departments/pediatrics" },
  { title: "Orthopaedic & Joint Replacement", desc: "Treatment for bones, joints, ligaments, and nerves.", image: "/images/departments-images/orthopaedic.jpeg", href: "/departments/orthopedics" },
  { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", image: "/images/departments-images/general-medicine.jpeg", href: "/departments/general-medicine" },
  { title: "Department of ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", image: "/images/departments-images/ent.jpeg", href: "/departments/ent" },
  { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", image: "/images/departments-images/ophthalmology.jpeg", href: "/departments/ophthalmology" },
  { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", image: "/images/departments-images/dental-care.jpeg", href: "/departments/dental" },
  { title: "Pulmonology & Chest/Respiratory Medicine", desc: "Respiratory and lung health specialists.", image: "/images/departments-images/pulmonology.jpeg", href: "/departments/respiratory" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[250px] md:h-[300px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/department_banner.jpg"
            alt="Our Departments"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Our Departments
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Departments</span>
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
