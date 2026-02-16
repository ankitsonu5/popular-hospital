

import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", image: "/images/departments-images/cardiology.jpeg" },
  { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", image: "/images/departments-images/neuro-surgery.jpeg" },
  { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", image: "/images/departments-images/gastroenterology.jpeg" },
  { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", image: "/images/departments-images/AdobeStock_1010757604.jpeg" },
  { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", image: "/images/departments-images/oncology.jpeg" },
  { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", image: "/images/departments-images/urology.jpeg" },
  { title: "Burns & Plastic", desc: "Reconstructive and cosmetic surgery services.", image: "/images/departments-images/AdobeStock_222372294.jpeg" },
  { title: "Laparoscopic", desc: "Minimally invasive general surgical procedures.", image: "/images/departments-images/laparoscopic.jpeg" },
  { title: "Obstetrics", desc: "Care for pregnancy, childbirth, and women's health.", image: "/images/hospital-sample.jpg" },
  { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", image: "/images/departments-images/paediatrics.jpeg" },
  { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", image: "/images/departments-images/orthopaedic.jpeg" },
  { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", image: "/images/departments-images/general-medicine.jpeg" },
  { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", image: "/images/departments-images/ent.jpeg" },
  { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", image: "/images/departments-images/ophthalmology.jpeg" },
  { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", image: "/images/departments-images/dental-care.jpeg" },
  { title: "Pulmonology", desc: "Respiratory and lung health specialists.", image: "/images/departments-images/pulmonology.jpeg" },
  { title: "Pathology", desc: "Advanced diagnostic laboratory services.", image: "/images/departments-images/pathology.jpeg" },
  { title: "Radiology", desc: "Advanced imaging services including X-ray, MRI, and CT Scan.", image: "/images/departments-images/radiology.jpeg" },
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1e3a8a] font-heading tracking-tight mb-6">
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
                      href={service.title === 'Pathology' ? '/specialties/pathology' : service.title === 'Radiology' ? '/specialties/radiology' : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
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
