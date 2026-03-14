'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data ─── */

const procedureList = [
  'Coronary Artery Bypass Graft (CABG)',
  'Hypertrophic Cardiomyopathy surgery',
  'Pacemaker Implantation',
  'Beating Heart Bypass Surgery',
  'Minimally Invasive Bypass Surgery / Key Hole Bypass Surgery',
  'Valve Replacement, Single or Double',
  'Combined CABG and Valve Replacements',
  'Repair of Congenital Heart Defects',
  'Conventional Bypass Heart Surgery On Pump',
  'Pericardiectomy',
  'Peripheral Vascular Surgery',
  'Surgery of Aortic Aneurysm and Dissection',
  'Heart Transplant',
  'LVAD Implantation'
];

const technologyList = [
  'Cath Lab',
  'Rotablator',
  'Intravascular Ultrasound Imaging (IVUS)',
  'Fractional Flow Reserve (FFR) measurement Echocardiography (ECG)',
  'Treadmill Machine (TMT) Holter Machines'
];

const services = [
  {
    title: 'Diagnosis and Evaluation:',
    content: 'Our experienced team utilizes state-of-the-art diagnostic tools and techniques to accurately assess and diagnose various cardiovascular and thoracic conditions. We employ advanced imaging technologies, such as CT scans, MRIs, and echocardiography, to obtain detailed information about the patient’s condition, enabling us to make informed decisions about the most appropriate treatment strategies.'
  },
  {
    title: 'Surgical Procedures:',
    content: 'Our CTVS Department offers a wide range of surgical procedures to address cardiovascular and thoracic disorders. Our skilled surgeons are trained in advanced techniques and utilize the latest surgical technologies to perform procedures such as coronary artery bypass grafting (CABG), heart valve repair/replacement, lung cancer resection, vascular reconstructions, and more. We prioritize minimally invasive approaches whenever possible to minimize discomfort, speed up recovery, and optimize patient outcomes.'
  },
  {
    title: 'Multidisciplinary Care:',
    content: 'Collaboration is a cornerstone of our CTVS Department. Our surgeons work closely with a multidisciplinary team of specialists, including cardiologists, anesthesiologists, intensivists, and other healthcare professionals. This collaborative approach ensures that patients receive comprehensive, well-rounded care throughout their treatment journey.'
  },
  {
    title: 'Postoperative Care and Rehabilitation:',
    content: 'Our commitment to our patients extends beyond the operating room. We provide attentive postoperative care and support to ensure a smooth recovery. Our dedicated nursing staff and rehabilitation specialists work closely with patients to facilitate their healing process and optimize their long-term outcomes.'
  },
  {
    title: 'Patient Education and Support:',
    content: 'We believe that informed patients are empowered patients. That’s why we prioritize patient education and provide resources to help individuals understand their conditions, treatment options, and the recovery process. Our team is always available to answer questions and address concerns, ensuring that patients and their families feel supported and well-informed at every step.'
  }
];

const whyChooseUs = [
  'Highly skilled surgeons with expertise in complex cardiovascular and thoracic procedures.',
  'Access to cutting-edge diagnostic and surgical technologies.',
  'Personalized and patient-centered approach to care.',
  'Collaborative and multidisciplinary team for comprehensive treatment.',
  'Emphasis on minimally invasive techniques to optimize patient outcomes.',
  'Comprehensive postoperative care and rehabilitation services.',
  'Commitment to patient education and support.'
];

const doctors = [
  {
    name: 'Dr. Rahul Dev',
    qualifications: 'MS, MCh (CTVS)',
    designation: 'Senior Consultant',
    slug: 'dr-rahul-dev',
    image: '/images/departments-images/'
  },
  {
    name: 'Dr. Shalini Singh',
    qualifications: 'MS, MCh (Thoracic Surgery)',
    designation: 'Consultant',
    slug: 'dr-shalini-singh',
    image: '/images/departments-images/'
  }
];

/* ─── Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function CTVSClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[500px] md:h-[450px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/cardiothoracic_banner.png"
            alt="Heart and Vascular Care"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-rose-500/20 text-rose-100 text-xs md:text-sm font-bold mb-6 border border-rose-400/30 backdrop-blur-sm uppercase tracking-wider">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-heading">
             Cardiothoracic & <br className="hidden md:block" />
              Vascular Surgery
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/doctors"
                className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 text-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book An Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Cardiothoracic & Vascular Surgery (CTVS)" />
              <div className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg font-medium text-justify">
                <p>
                  Welcome to the Cardiothoracic and Vascular Surgery (CTVS) Department at Popular Hospital. We are proud to offer exceptional care in the field of cardiovascular and thoracic surgery. Our department comprises a team of highly skilled surgeons, dedicated nurses, and specialized support staff who work together to provide comprehensive and cutting-edge treatment options for patients with heart, lung, chest, and vascular conditions.
                </p>
                <p>
                  Cardiothoracic and Vascular Surgery (CTVS) is a specialized branch of surgery that focuses on the surgical treatment of diseases and conditions affecting the heart, lungs, chest, and blood vessels. It encompasses a wide range of procedures designed to address cardiovascular and thoracic disorders, including coronary artery bypass grafting, heart valve repair/replacement, lung cancer resection, and vascular reconstructions, among others.
                </p>
                <p>
                  At Popular Hospital, we understand that cardiovascular and thoracic disorders can have a significant impact on the lives of our patients. That’s why our CTVS Department is committed to delivering the highest quality of care with a patient-centered approach. We strive to provide personalized treatment plans that are tailored to each individual’s unique needs, ensuring the best possible outcomes.
                </p>
              </div>

              <SectionHeader title="Procedures" highlight="" />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-12">
                {procedureList.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>

              <SectionHeader title="Advanced Diagnostics & Technology -" highlight="Our Tools for Treatment" />
              <ul className="space-y-3 mb-12">
                {technologyList.map((item, idx) => (
                   <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            {/* Right Sidebar - Doctor Card with Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  {/* Floating Appointment Button */}
                  <Link 
                    href="/doctors" 
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>
                  
                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                              <Image
                                src={doc.image}
                                alt={doc.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              {/* Hover Overlay */}
                              <Link 
                                href={`/doctors/${doc.slug}`} 
                                className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                              >
                                <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors">
                                  View More Info
                                </span>
                              </Link>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-[#3b82f6] mb-1">{doc.name}</h3>
                              <p className="text-gray-600 text-sm font-medium">{doc.qualifications}</p>
                              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? doctors.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev === doctors.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex gap-3 mb-8">
                      {doctors.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${
                            currentSlide === idx 
                              ? 'bg-[#3b82f6] border-[#3b82f6] scale-125' 
                              : 'bg-transparent border-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ OUR SERVICES SECTION ═══════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1">
              <SectionHeader title="Our" highlight="Services:" />
              <div className="space-y-6 mt-6">
                {services.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 font-bold">›</span>
                    <p className="text-gray-800 leading-relaxed text-base md:text-lg font-medium">
                      <span className="font-bold text-[#0b1c43]">{service.title}</span> {service.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-rose-50 rounded-3xl" />
                <div className="relative h-full w-full overflow-hidden shadow-lg rounded-3xl border-4 border-white">
                  <Image
                    src="/images/departments-images/cardiothoracic_vascular_surgery.jpeg"
                    alt="CTVS Procedures"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US SECTION ═══════ */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-center">
            
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl" />
                <div className="relative h-full w-full overflow-hidden shadow-lg rounded-3xl border-4 border-white">
                  <Image
                    src="/images/departments-images/ctvs_technology.jpeg"
                    alt="CTVS Technology"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <SectionHeader title="Why" highlight="Choose us:" />
              <ul className="grid grid-cols-1 gap-x-8 mt-6">
                {whyChooseUs.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ SURGEONS SECTION ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <SectionHeader title="CTVS" highlight="Surgeons at Popular Hospital" />
           <div className="prose prose-blue max-w-none text-gray-800 space-y-4 leading-relaxed text-base md:text-lg font-medium text-justify">
                <p>
                  CTVS surgeons are highly trained specialists who possess extensive knowledge of cardiovascular and thoracic anatomy and are skilled in performing complex surgical procedures. They work closely with a multidisciplinary team, including cardiologists, anesthesiologists, intensivists, and other healthcare professionals, to provide comprehensive care to patients with cardiovascular and thoracic conditions.
                </p>
                <p>
                  We are dedicated to providing compassionate and exceptional care to our patients, and we strive to be at the forefront of advancements in cardiovascular and thoracic surgery. If you or a loved one is in need of specialized care for a heart, lung, chest, or vascular condition, we invite you to contact our Cardiothoracic and Vascular Surgery Department at Popular Hospital. Our team is ready to guide you through your treatment journey and help you achieve the best possible outcomes.
                </p>
           </div>
        </div>
      </section>

    </main>
  );
}


