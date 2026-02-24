import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ServiceContent {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

const servicesData: Record<string, ServiceContent> = {
  'emergency': {
    title: '24x7 Emergency Services',
    description: 'Equipped to manage all types of Trauma, Medical Queries, or Surgical emergencies.',
    longDescription: 'Popular Hospital provides round-the-clock emergency medical services with a team of highly qualified doctors and paramedics. Our emergency department is equipped with state-of-the-art life-saving equipment and facilities to handle critical cases including trauma, cardiac emergencies, and stroke.',
    features: [
      '24/7 Availability of Trauma Specialists',
      'Advanced Life Support Ambulances',
      'Dedicated Triage Area',
      'Immediate access to diagnostic services',
      'Specialized care for Cardiac & Neurological emergencies'
    ],
    image: '/images/facilities/08.jpeg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  'blood-bank': {
    title: '24x7 Blood Bank Services',
    description: 'Equipped with an ultramodern collection centre and component lab.',
    longDescription: 'Our 24-hour Blood Bank is a vital part of Popular Hospital, ensuring that safe blood and blood components are always available for patients. We follow stringent quality control measures for collection, testing, and storage of blood.',
    features: [
      '24/7 Blood availability',
      'Advanced Component Separation Lab',
      'Single Donor Plateletpheresis (SDP)',
      'AABB and NABH Standard protocols',
      'Strict screening for infections'
    ],
    image: '/images/departments-images/pathology.jpeg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  'ambulance': {
    title: '24x7 Ambulance Services',
    description: 'Advanced life support ambulances and air ambulance connectivity.',
    longDescription: 'Popular Hospital provides a fleet of well-equipped ambulances designed to deliver rapid response for medical emergencies. From basic life support to advanced cardiac care on wheels, we ensure that the patient receives immediate medical attention during transit.',
    features: [
      'Advanced Cardiac Life Support (ACLS)',
      'Basic Life Support (BLS)',
      'Ventilator & Multipara Monitor Support',
      'Trained Doctors & Paramedics on board',
      'Air Ambulance connectivity for long-distance transit'
    ],
    image: '/images/hospital-sample.jpg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
      </svg>
    )
  },
  'diagnostics-and-imaging': {
    title: 'Diagnostics & Imaging',
    description: 'Advanced pathology and imaging services under one roof.',
    longDescription: 'Our diagnostic wing is equipped with cutting-edge medical technology to provide accurate and timely results. From high-end pathology labs to advanced radiology including MRI, CT-Scan, and Ultrasound, we provide comprehensive diagnostic support.',
    features: [
      'Fully Automated Pathology Lab',
      'High-Resolution MRI & CT Scan',
      'Digital X-Ray & Mammography',
      '4D Ultrasound & Color Doppler',
      'Home Sample Collection Service'
    ],
    image: '/images/departments-images/radiology.jpeg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  'icu-service': {
    title: 'Intensive Care Unit (ICU)',
    description: 'Specialized intensive treatment and close monitoring for critical patients.',
    longDescription: 'Popular Hospital features a world-class ICU facility designed to provide critical care to patients with life-threatening conditions. Our units are managed by experienced intensivists and specialized nursing staff 24/7.',
    features: [
      'Round-the-clock Monitoring',
      'Advanced Ventilator Support',
      'Dialysis Support in ICU',
      'Isolation Beds for critical infections',
      '1:1 Nursing care for critical cases'
    ],
    image: '/images/departments-images/neuro-surgery.jpeg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  'pharmacy': {
    title: '24x7 In-House Pharmacy',
    description: 'A fully stocked pharmacy providing genuine medicines around the clock.',
    longDescription: 'Our 24/7 in-house pharmacy ensures that all prescribed medicines and surgical items are readily available to our patients. We prioritize genuine quality and maintain a wide stock of domestic and international life-saving drugs.',
    features: [
      '24/7 Availability',
      'Computerized Billing System',
      'Proper Cold Chain maintenance',
      'Expert Pharmacists for guidance',
      'Genuine & High-quality Stock'
    ],
    image: '/images/facilities/09.jpeg',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.title} | Popular Hospital`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) notFound();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0b1c43] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src={service.image} 
            alt="background" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-8 text-sm text-gray-400 font-medium overflow-x-auto whitespace-nowrap scrollbar-hide" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-hospital-orange">24x7 Services</span>
            <span className="mx-3">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-hospital-orange border border-white/20">
              {service.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mb-4">{service.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{service.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 -mt-10 lg:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Featured Image */}
            <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Detailed Content */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-[#0b1c43] mb-6 font-heading">Overview</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  {service.longDescription}
                </p>
                
                <h3 className="text-2xl font-bold text-[#0b1c43] mb-6 font-heading">Key Features & Specialist Care</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Helpline Section */}
            <div className="bg-gradient-to-br from-hospital-teal to-[#164e63] rounded-3xl p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-heading">Need Urgent Assistance?</h3>
                <p className="text-teal-100">Contact our 24/7 dedicated helpline for immediate support.</p>
              </div>
              <a 
                href="tel:+917800001895" 
                className="flex items-center gap-4 bg-white text-hospital-teal px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.82-6.62-6.65l1.97-1.57c.26-.26.35-.63.24-1.01a17.9 17.9 0 01-.56-3.53.995.995 0 00-1-1H4.05c-.55 0-1.05.52-1.05 1.15 0 9.05 7.6 16.9 16.9 16.9.55 0 1.15-.5 1.15-1.05v-3.95c0-.55-.52-1.05-1.04-1.05z" />
                </svg>
                +91-7800001895
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 sticky top-28">
              <h3 className="text-xl font-bold text-[#0b1c43] mb-6 font-heading border-b border-slate-100 pb-4">Other 24x7 Services</h3>
              <div className="space-y-3">
                {Object.entries(servicesData).map(([sSlug, sContent]) => {
                  const isActive = sSlug === slug;
                  return (
                    <Link 
                      key={sSlug} 
                      href={`/services/${sSlug}`}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all border-2 group ${
                        isActive 
                          ? 'border-[#E85222]/40 bg-white shadow-sm ring-4 ring-[#E85222]/5' 
                          : 'bg-white border-slate-50 hover:border-[#E85222]/20 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive 
                          ? 'bg-[#E85222]/10 text-[#E85222]' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-[#E85222]/5 group-hover:text-[#E85222]'
                      }`}>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {/* @ts-ignore */}
                            {sContent.icon.props.children}
                          </svg>
                        </div>
                      </div>
                      <span className={`text-[15px] leading-tight transition-colors ${
                        isActive ? 'text-[#E85222] font-black' : 'text-slate-700 font-bold group-hover:text-[#E85222]'
                      }`}>
                        {sContent.title}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-10 p-6 bg-hospital-navy rounded-2xl text-white">
                <h4 className="font-bold mb-4">Book an Appointment</h4>
                <p className="text-sm text-slate-300 mb-6">Schedule your visit with our specialists today.</p>
                <Link 
                  href="/book" 
                  className="block text-center bg-hospital-orange py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
