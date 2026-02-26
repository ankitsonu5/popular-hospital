import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency & Trauma Care | Popular Hospital',
  description: '24/7 Emergency and Trauma Care at Popular Hospital. Comprehensive emergency medical services with state-of-the-art infrastructure and highly trained professionals.',
};

const sections = [
  {
    id: 'department',
    title: 'Department of Emergency & Trauma Care',
    content: (
      <>
        <h3 className="text-xl font-bold mb-3 text-teal-700">What is Emergency Care?</h3>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Emergency care involves the medical treatment of acute illnesses or injuries that require immediate attention. It is the frontline of the healthcare system, providing essential care to patients who are at risk of losing their lives or suffering permanent disabilities if not treated promptly.
        </p>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          The emergency and trauma center at Popular Hospital is a state-of-the-art facility equipped to handle any medical emergency. Our team of highly trained professionals is available 24/7 to provide immediate and comprehensive care to patients suffering from acute illnesses, trauma, and other critical conditions.
        </p>
        <h3 className="text-xl font-bold mb-3 text-teal-700 mt-8 pt-6 border-t border-gray-100">24/7 Emergency Care at Popular Hospital</h3>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm lg:text-base">
          <li>State-of-the-art infrastructure</li>
          <li>Highly trained and experienced medical staff</li>
          <li>Advanced life support ambulances</li>
          <li>24/7 availability of specialized doctors</li>
          <li>Comprehensive diagnostic and therapeutic services</li>
        </ul>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Emergency paramedics running with stretcher',
  },
  {
    id: 'why-popular',
    title: 'Why Popular Hospital for Emergency & Trauma Care?',
    content: (
      <>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify mb-4">
          A trauma center is a fully equipped hospital or partially hospital facility that provides comprehensive emergency medical services to patients suffering from traumatic injuries. They are equipped to handle a wide range of emergencies, including but not limited to severe trauma, critical illness, and complex medical conditions. These centers are staffed by specialized healthcare professionals, including trauma surgeons, emergency medicine physicians, and specialized nurses.
        </p>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Popular Hospital stands out by offering advanced life support protocols, streamlined triage processes allowing critical patients immediate access to care, round-the-clock intensive care units, and immediately accessible imaging and blood bank services.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Medical Team ready for trauma',
  },
  {
    id: 'common-traumas',
    title: 'Common traumas & injuries requiring Emergency Care:',
    content: (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-4 text-sm lg:text-base text-gray-600">
        {[
          'Motor vehicle accidents',
          'Severe falls and head injuries',
          'Sports and athletic injuries',
          'Severe burns and scalds',
          'Industrial and workplace accidents',
          'Deep cuts or puncture wounds',
          'Fractures and dislocations',
          'Breathing difficulties',
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Patient transport arriving to hospital',
  },
  {
    id: 'types-of-trauma-centers',
    title: 'Types of Trauma Centers:',
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-sm lg:text-base text-justify">
          The designation of trauma centers is categorized primarily by the level of care and resources available. The most common levels are:
        </p>
        <div>
          <h4 className="font-bold text-[#0b1c43] text-base lg:text-lg">Level I Trauma Center</h4>
          <p className="text-gray-600 text-sm mt-1 text-justify">
            Provides the highest level of surgical care for trauma patients. Has a full range of specialists and equipment available 24/7, serving as a comprehensive regional resource.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[#0b1c43] text-base lg:text-lg">Level II Trauma Center</h4>
          <p className="text-gray-600 text-sm mt-1 text-justify">
            Provides comprehensive trauma care but may not have all the specialized resources of a Level I center outright. Can initiate definitive care for all injured patients.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[#0b1c43] text-base lg:text-lg">Level III & IV Trauma Centers</h4>
          <p className="text-gray-600 text-sm mt-1 text-justify">
            Provides prompt assessment, resuscitation, surgery, intensive care, and stabilization of injured patients, arranging transfer for more severe requirements.
          </p>
        </div>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'People waiting in trauma center',
  },
  {
    id: 'dos-in-trauma',
    title: "Some Do's in the case of Trauma:",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 font-bold mb-4 text-sm lg:text-base text-justify">
          Remembering crucial actions can save a life in a case of trauma. These steps include:
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-3 text-sm lg:text-base ml-1">
          <li><strong>Stay calm:</strong> Ensure the safety of the environment around the injured individual.</li>
          <li><strong>Call for emergency medical assistance</strong> immediately. Provide accurate information about the location and type of injury.</li>
          <li><strong>Do not move the injured person</strong> unless there is an immediate safety threat (e.g., fire, moving traffic). In that case, keep their head and neck stable.</li>
          <li><strong>Apply direct pressure</strong> to any bleeding wounds using a clean cloth or sterile bandage.</li>
          <li>Keep the person warm and wait for professional medical help.</li>
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'First aid being applied',
  },
  {
    id: 'guidelines',
    title: 'Fundamental Guidelines for treating Trauma Patients:',
    content: (
      <ul className="space-y-6 mt-4">
        <li className="flex gap-5">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#0b1c43] flex items-center justify-center font-bold text-sm shadow-sm border border-blue-100">1</span>
          <div>
            <h4 className="font-bold text-gray-800 text-base">Primary Survey (ABCDEs)</h4>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed text-justify">Airway maintenance with cervical spine protection, Breathing and ventilation, Circulation with hemorrhage control, Disability (neurologic evaluation), and Exposure/environmental control.</p>
          </div>
        </li>
        <li className="flex gap-5">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#0b1c43] flex items-center justify-center font-bold text-sm shadow-sm border border-blue-100">2</span>
          <div>
            <h4 className="font-bold text-gray-800 text-base">Resuscitation and stabilization</h4>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed text-justify">Managing shock, life-threatening conditions, bleeding suppression, and administering fluids immediately upon evaluation.</p>
          </div>
        </li>
        <li className="flex gap-5">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#0b1c43] flex items-center justify-center font-bold text-sm shadow-sm border border-blue-100">3</span>
          <div>
            <h4 className="font-bold text-gray-800 text-base">Secondary Survey</h4>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed text-justify">A head-to-toe evaluation, complete history taking, and extensive imaging diagnostics once the patient's vital signs are stabilized.</p>
          </div>
        </li>
      </ul>
    ),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Medical staff following guidelines',
  },
  {
    id: 'procedures',
    title: 'Procedure for Managing a Trauma Patients:',
    content: (
      <>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify mb-4">
          The management of trauma patients requires a swift and coordinated team approach. Upon arrival, the "Golden Hour" protocol is activated. The trauma team conducts rapid triage and prioritization to assess symptom severity and allocate the right specialized resources.
        </p>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Collaboration among multidisciplinary teams—including orthopedics, neurosurgery, anesthesia, and critical care—ensures definitive and comprehensive treatment exactly when needed. This is followed by admission to intensive care, continuous monitoring, and early rehabilitation.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Complex procedures for a patient',
  },
  {
    id: 'first-offered',
    title: 'What kind of Emergency Care is first offered?',
    content: (
      <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        Initial emergency care prioritizes stabilizing the patient's vital functions rapidly before deeper diagnostics. This includes safely clearing the airway, providing oxygen or ventilatory support manually or via machines, and aggressively controlling profuse bleeding using immediate suppression techniques. Intravenous (IV) lines are swiftly established for administering fluids and life-saving medications. Quick pain management and immobilization of potential fractures, particularly suspected spinal injuries, form the core of the very first medical interaction.
      </p>
    ),
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Patient receiving early emergency care',
  },
  {
    id: 'bleeding-control',
    title: 'Bleeding control measures are implemented:',
    content: (
      <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        Controlling catastrophic bleeding is one of the most critical actions in emergency trauma. This involves the application of firm, direct pressure over the injury using sterile pads, the application of medically graded tourniquets for severe limb bleeds, and employing hemostatic dressings (blood-clotting agents). If severe internal bleeding is suspected, immediate rapid fluid or blood transfusion coupled with swift surgical intervention is prioritized above all else.
      </p>
    ),
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Bleeding control and IV applications',
  }
];

export default function EmergencyTraumaPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
            alt="Emergency and Trauma Care"
            fill
            className="object-cover opacity-25 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex mb-6 text-sm text-gray-300 font-medium tracking-wide" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-3 text-gray-500">/</span>
              <span className="hover:text-white transition-colors">Services</span>
              <span className="mx-3 text-gray-500">/</span>
              <span className="text-orange-400">Emergency & Trauma Care</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              Emergency & <span className="text-orange-500">Trauma Care</span>
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl text-blue-100/90 mb-12 font-medium leading-relaxed max-w-2xl">
              24/7 dedicated rapid response team equipped with life-saving technology to handle all medical and surgical emergencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+917800001895" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-3 w-full sm:w-auto text-sm sm:text-base uppercase tracking-wider">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call +91-7800001895
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Zig-Zag Layout based on original design) */}
      <section className="py-24">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={section.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}>
                  
                  {/* Content */}
                  <div className="w-full lg:w-[55%]">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b1c43] mb-5 font-heading leading-tight max-w-2xl capitalize">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {section.content}
                    </div>
                  </div>

                  {/* Image with Unique Blob/Pill Masking to match hospital theme */}
                  <div className="w-full lg:w-[45%] flex justify-center">
                    <div className="relative w-full max-w-[500px]">
                      {/* Decorative Element */}
                      <div className={`absolute -inset-4 bg-gray-50 rounded-full blur-2xl opacity-60 z-0`}></div>
                      
                      {/* Image Container */}
                      <div className={`relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/3] lg:aspect-[4/3] z-10 overflow-hidden shadow-xl border-4 border-white
                          ${isEven ? 'rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[1rem] rounded-bl-[1rem]' : 'rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-[1rem] rounded-br-[1rem]'} 
                        `}>
                        <Image
                          src={section.image}
                          alt={section.imgAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20 px-6 border-t border-gray-200">
        <div className="container mx-auto max-w-[1366px] text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-5 font-heading">Every Minute Counts in an Emergency</h2>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">Fast response and specialized care can save lives. Save our 24/7 dedicated emergency contact number for immediate assistance.</p>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl inline-flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
             <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 animate-[pulse_2s_infinite]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
             </div>
             <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.1em] mb-1">Ambulance & Trauma Care</p>
                <a href="tel:+917800001895" className="text-3xl md:text-5xl font-black text-orange-600 hover:text-orange-700 transition-colors">
                  +91-7800001895
                </a>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
