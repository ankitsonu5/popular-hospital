import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Our Facilities | Popular Hospital',
  description: 'Discover our state-of-the-art facilities including advanced ICUs, modular Operation Theatres, 24/7 Emergency unit, and comprehensive diagnostic services.',
};

const facilities = [
  {
    category: "Surgical Excellence",
    items: [
      {
        title: "Robotic Surgery (Ortho)",
        description: "Cutting-edge robotic surgical systems for minimally invasive procedures, ensuring greater precision, smaller incisions, and faster recovery times.",
        image: "/images/facilities/6.jpeg"
      },
      {
        title: "Microwave Surgery",
        description: "Advanced microwave ablation techniques providing minimally invasive treatment options with remarkable precision and faster recovery.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "IR Surgery (Radiology)",
        description: "Interventional Radiology procedures utilizing advanced real-time image guidance for targeted, minimally invasive surgical interventions.",
        image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Cosmetic Gynecology Surgery",
        description: "Specialized aesthetic and functional procedures performed by expert surgeons using the latest medical technologies in a safe environment.",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    category: "Critical Care",
    items: [
      {
        title: "Emergency & Trauma Center",
        description: "A 24/7 operational unit with rapid response teams, advanced life support ambulances, and immediate access to operation theatres and diagnostics.",
        image: "/images/facilities/08.jpeg"
      },
      {
        title: "Advanced ICUs",
        description: "Our Intensive Care Units are equipped with the latest ventilatory support, cardiac monitoring systems, and dedicated 1:1 nursing care for critical patients.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "NICU & PICU",
        description: "Specialized Neonatal and Pediatric Intensive Care Units designed to provide the highest level of care for newborns and children with critical health conditions.",
        image: "/images/facilities/7.jpeg"
      }
    ]
  },
  
  {
    category: "Infra",
    items: [
      {
        title: "Advanced Imaging Center",
        description: "Comprehensive diagnostic services including multiple slice CT Scanners, 1.5 Tesla MRI, Digital X-Ray, and 4D Ultrasound for accurate diagnosis.",
        image: "/images/facilities/4.jpeg"
      },
      {
        title: "24/7 Pathology Lab",
        description: "A fully automated laboratory providing a wide range of hematological, biochemical, and microbiological tests with quick turnaround times.",
        image: "/images/facilities/3.jpeg"
      },
      {
        title: "Pharmacy",
        description: "Well-stocked 24/7 in-house pharmacy ensuring easy availability of all prescribed medicines and surgical consumables.",
        image: "/images/facilities/09.jpeg"
      },
      {
        title: "Modular OT",
        description: "State-of-the-art modular operation theatres with HEPA filters and laminar airflow to ensure a sterile environment.",
        image: "/images/facilities/5.jpeg"
      },
      {
        title: "Lounge",
        description: "Comfortable and relaxing lounge areas designed for the comfort of patients and their families.",
        image: "https://images.unsplash.com/photo-1519494086427-04663e26f1fa?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Canteen",
        description: "Hygienic and nutritious food options available round the clock for patients, attendants, and staff.",
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Reception",
        description: "A welcoming reception area with streamlined admission and query handling processes.",
        image: "https://images.unsplash.com/photo-1538100958184-4869502ab3ad?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Rooms",
        description: "A range of accommodation options from General Wards to Private Suites with patient-centric amenities.",
        image: "/images/facilities/2.jpeg"
      },
      {
        title: "Waiting Area",
        description: "Spacious and comfortable waiting zones equipped with essential amenities for a pleasant experience.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

export default function FacilitiesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* ─── Hero Section ─── */}
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Facilities Banner"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/90 via-[#0b1c43]/60 to-[#0b1c43]/90" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">Explore Our Facilities</h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto font-light">
            Experience world-class healthcare infrastructure designed for safety, precision, and patient comfort.
          </p>
        </div>
      </div>

      {/* ─── Intro Section ─── */}
      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-[#0b1c43] mb-4 font-heading">Infrastructure for Excellence</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At Popular Hospital, we believe that advanced technology and modern infrastructure are the backbones of superior healthcare. Our 300+ bedded facility is designed to support complex medical procedures and ensure the highest standards of safety and hygiene.
          </p>
        </div>

        {/* ─── Facilities Sections ─── */}
        <div className="space-y-20">
          {facilities.map((section, idx) => (
            <div key={section.category} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-gray-200 flex-1"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0b1c43] font-heading">{section.category}</h3>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-[#0b1c43] mb-3 group-hover:text-[#00B4D8] transition-colors font-heading">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Call to Action ─── */}
        <div className="mt-24 bg-[#0b1c43] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Need Immediate Assistance?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Our emergency facilities are open 24/7. Contact us for ambulance services or urgent medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+917800001895" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E85222] text-white rounded-full font-semibold hover:bg-[#d1451a] transition-colors shadow-lg">
                Call Emergency
              </a>
              <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#0b1c43] rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
