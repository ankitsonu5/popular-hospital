'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Data ─── */

const doctors = [
  {
    name: 'Dr. Abhishek Kumar',
    qualifications: 'M.B.B.S., MS - General Surgery, FIAGFS',
    designation: 'Consultant (Trauma & Surgery)',
    slug: 'dr-abhishek-kumar',
    image: '/images/departments_doctor/dr-abhishek-kumar.png'
  },
  {
    name: 'Dr. Kamlesh Kumar Singh',
    qualifications: 'MS - General Surgery, MCh - Neurosurgery',
    designation: 'Consultant Neurosurgeon',
    slug: 'dr-kamlesh-kumar-singh',
    image: '/images/departments_doctor/dr._kamlesh_kumar_Singh.jpg'
  }
];

const sections = [
  {
    id: 'department',
    title: 'Department of Emergency & Trauma Care',
    content: (
      <>
        <h3 className="text-xl font-bold mb-3 text-[#0b1c43]">What is Emergency Care?</h3>
        <p className="mb-4 text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Emergency and Trauma Care department of a hospital functions with the intention of providing emergency services to accident and emergency victims 24*7 all around the year. Popular Hospital is the Best Hospital in Varanasi, which has a well equipped emergency and trauma care center led by a specialist team of doctors and nurses who have the proficiency in dealing with overwhelming emergency cases equipment use.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          While addressing injuries as common as cuts and fractures or some of the most life threatening diseases like heart attacks and stroke, Popular Hospital’s Department of Emergency and Trauma Care extends the same medical and psychological support to the patient in need and the concerned family alike. As we realize the importance of round the clock emergency and trauma care, our emergency department remains open round the clock for anyone ranging from infants, kids, young adults and also people of the senior age group. Thus Popular Hospital is the Best Emergency Hospital near me in Varanasi to get any kind of medical attention.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Any trauma related cases require immediate medical intervention but few of them such as severe road traffic accidents (such as vehicle crashes), gunshot wounds, severe falls, and other accidental and purposeful injuries are to be treated almost immediately. If not dealt with on time, these grave injuries could lead to loss of a body part, severe wounds, organ damage. The person may also succumb to these injuries. Hence, there is always an intense need to give immediate treatment with a swift response system at the trauma and emergency care hospital. Popular Hospital, with its team of committed and well qualified doctors are always ready to attend such cases. This makes Popular Hospital the Best Emergency Hospital near me in Varanasi
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Emergency care for individuals is necessary for patients who are battling with the ongoing or subsided trauma of a major accident or threat to life due to fatal diseases. With our team of experienced doctors who are up for extending best possible specialized care, who have suffered serious trauma is a difficult task that calls for several phases and levels of specialized care. So in that case, if you ever look for the Best Emergency Hospital in Varanasi, then PopularHospital is the perfect place where your search gets completed.
        </p>
        <p className="mb-4 text-blue-700 leading-relaxed text-sm lg:text-base font-bold italic text-center py-4 border-y border-blue-50">
          Best 24x7 Emergency Doctor in Varanasi | Best Critical Care Hospital in Varanasi | Best Emergency Care Hospital in Varanasi
        </p>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-black text-[#0b1c43] mb-1">
            24X7 Facilities available at <span className="text-blue-600">Popular</span>
          </h3>
          <div className="w-12 h-1 bg-gray-500 mb-6 rounded-full relative">
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-gray-500 rounded-full -translate-y-1/2 -ml-1"></div>
          </div>

          <h4 className="text-lg font-bold text-blue-700 mb-4">24X7 Fast Ambulance Services</h4>
          <ul className="space-y-3 text-sm lg:text-base text-gray-700 mb-6 text-left">
            {[
              'Dedicated OT for emergency surgery procedures',
              'Pediatrics and Gynecology emergencies',
              'Specialized trained Trauma team of doctors, nurses, para-medical staff, ward boys, etc., equipped to handle any medical and surgical emergency.',
              'Cardiac monitors that track blood pressure, heart rate, and cardiac health',
              'Cath lab, Ultrasound, CT scan, and laboratory services',
              'Wheelchairs, crash carts, mechanical ventilators, multiple-channel monitors, and separate recovery beds.'
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-purple-700 font-bold flex-shrink-0">&gt;</span>
                <span className="font-medium text-left">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 text-sm lg:text-base font-medium text-left">
            If you are searching for the Best 24/7 Emergency Hospital near me, then Popular Hospital is the smartest decision that you could ever take.
          </p>
        </div>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop',
    shape: 'rounded-[100px_40px_100px_40px]'
  },
  {
    id: 'why-popular',
    title: 'Why Popular Hospital for Emergency & Trauma Care?',
    content: (
      <>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify mb-4 font-medium">
          At Popular Hospital, the emergency room is always active and on point with its team of multidisciplinary team of doctors, nurses with emergency and critical care training, and specialists. Once admitted to the emergency care, a team of nurses performs a triage to assess the patient's condition and assign them to a zone based on severity. There is a special area’s arrangement known as the Resuscitation Bay which specifically deals with addressing the patients with life-threatening and time-sensitive disorders like heart attack, stroke, and major accidents. Such issues are undertaken by a straightaway.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Upon the swift transfer of the patient at the designated bay, a team of skilled medical professionals begins their evaluation and stabilization procedures. Popular Hospital’s team is fully capable of scanning the body for interior injuries and diseases using cutting-edge diagnostic tools. It is this approach of relentless service to the patients which makes Popular Hospital one of the Best Emergency Hospital near me.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_100px_40px_100px]'
  },
  {
    id: 'common-traumas',
    title: 'Common Traumatic injuries requiring Emergency Care:',
    content: (
      <>
        <p className="text-gray-700 mb-4 text-sm lg:text-base font-medium">Common injuries and illnesses that are treated in the emergency and trauma center. Some of the most common injuries and illnesses treated include:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm lg:text-base text-gray-700 font-bold">
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
        <p className="text-gray-700 mt-4 text-sm lg:text-base font-medium italic">Our specialist emergency team is available round-the-clock to handle all such conditions.</p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[80px_20px_80px_20px]'
  },
  {
    id: 'trauma-level-1',
    title: 'Types of Trauma Centers:',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm lg:text-base text-justify font-medium">
          Depending on the expertise of staff and the equipment available, there are five levels of the Trauma Center, and they are as follows:
        </p>
        <h4 className="font-bold text-[#0b1c43] text-lg lg:text-xl">Level 1 Trauma Center:</h4>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Elements and services of Level 1 Trauma Center include:</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'For emergency and critical care of trauma victims, highly skilled medical professionals are available in all specialties (available 24 hours).',
            'They offer a thorough examination facility to deal with critical and severe injuries.',
            'They have critical care units, operating rooms, and emergency rooms all equipped with the tools required to deliver comprehensive medical care.',
            'They raise public awareness and educate the communities around them about trauma prevention.',
            'Popular Hospital is the leading search result when you search for a 24/7 emergency hospital near me.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_40px_100px_40px]'
  },
  {
    id: 'trauma-level-2',
    title: '',
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-[#0b1c43] text-lg lg:text-xl">Level 2 Trauma Center:</h4>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Elements and services of Level 2 Trauma Center include:</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'These centers evaluate injuries and start treating patients.',
            'Additionally, they offer 24*7 access to specialists and experts.',
            'After starting definitive care, trauma patients needing advanced care, such as heart surgery or dialysis, are moved to the level one center.',
            'These facilities also strive to provide better emergency trauma care.',
            'Are you getting tired of searching for a hospital near me Varanasi? Worry not!!!! Popular Hospital is there to resolve your every worry and trouble.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[40px_100px_40px_100px]'
  },
  {
    id: 'trauma-level-3',
    title: '',
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-[#0b1c43] text-lg lg:text-xl">Level 3 Trauma Center:</h4>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Elements and services of Level 3 Trauma Center include:</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'Assessing the injured people right away, providing CPR, and stabilizing them.',
            'Offer intensive care and carry out emergency procedures.',
            '24*7 access to specialists and experts.',
            'Transferring stabilized patients to level 1 or level 2 centers, where necessary.',
            'They only have a few facilities;therefore after stabilizing patients in need of advanced care, they send them to level one or two centers.',
            'If your search is Best Emergency Hospital near me, then the result is Popular Hospital.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_40px_100px_40px]'
  },
  {
    id: 'trauma-level-4',
    title: '',
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-[#0b1c43] text-lg lg:text-xl">Level 4 Trauma Center:</h4>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Elements and services of Level 4 Trauma Center include:</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'Essential emergency room amenities',
            'Trauma nurses and doctors are available when the injured person arrives',
            'Surgical and critical care services delivery',
            'Incorporates a thorough program for quality assessment',
            'Involved with prevention efforts'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[40px_100px_40px_100px]'
  },
  {
    id: 'trauma-level-5',
    title: '',
    content: (
      <div className="space-y-4">
        <h4 className="font-bold text-[#0b1c43] text-lg lg:text-xl">Level 5 Trauma Center:</h4>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Elements and services of Level 5 Trauma Center include:</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'Basic emergency room equipment.',
            'Immediate accessibility of nurses and medical personnel upon patient arrival.',
            'If not available 24/7, after-hours protocols are to be followed.',
            'Offer critical care and surgical procedures.',
            'Patients who require more extensive care are transferred to level 1, 2, or 3 centers.',
            'If you are looking for a hospital near me Varanasi, then your search is in the perfect place right now.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_40px_100px_40px]'
  },
  {
    id: 'dos-in-trauma',
    title: "Some Do's in the case of Trauma:",
    content: (
      <div className="space-y-4">
        <p className="text-[#0b1c43] font-bold mb-4 text-sm lg:text-base text-justify">
          The following crucial actions are crucial in cases of severe traumatic injuries:
        </p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'Delivering immediate medical attention at the scene of an accident or injury.',
            'Initial treatment of the severe injuries at the outset',
            'Swift and quick commencement of all relevant medical therapies that are essential for patient survival.',
            'In order to start rapid interventions, it is crucial to quickly diagnose the patient\'s life-threatening issues.',
            'The emergency medical team should exercise caution and wisdom to carefully examine the situation before acting, intervening, and reassessment.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 text-sm lg:text-base font-medium mt-6">
          If you are in need for emergency hospital services, then consider choosing Popular Hospital. We offer the Best Emergency & Trauma Care in Varanasi.
        </p>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_100px_40px_100px]'
  },
  {
    id: 'guidelines',
    title: 'Fundamental Guidelines for Treating Trauma Patients:',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-sm lg:text-base font-medium">Quick action is the first necessary step for emergency care.</p>
        <p className="text-gray-700 text-sm lg:text-base font-medium">Priority should be given to treating severe, life-threatening injuries.</p>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
          {[
            'The procedure should be fast paced and done with precision.',
            'Clinical symptoms must be diagnosed first.',
            'The emergency team must first evaluate the patient, intervene, and then reevaluate.',
            'The emergency team needs to evaluate the patient, act, and then reevaluate.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 text-sm lg:text-base text-justify font-medium mt-6 leading-relaxed">
          If you are searching for best trauma care that delivers in a timely manner and are on the lookout for the hospitals in Varanasi and greater Varanasi, consider choosing Popular Hospital, where you are given the best treatment with the most advanced technology as well as highly experienced surgeons.
        </p>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_40px_100px_40px]'
  },
  {
    id: 'procedures',
    title: 'Procedures for Managing a Trauma Patients:',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          There is a need for methodical strategy for quick and effective handling of trauma situations. If there are numerous accident victims, triage will be performed. It is possible to start a treatment only when the evaluation is done in regards to the patient's airway, breathing, circulation, impairment, and surroundings. In the next step, the patient is taken to a hospital or trauma treatment. After being transported to the trauma center, the injured are thoroughly evaluated along with their medical background. In order to evaluate the patient's condition, he is also continuously observed and examined. Suitable medical procedures and treatments are carried out following the establishment of a conclusive diagnosis.
        </p>
        <h4 className="font-bold text-blue-700 text-base lg:text-lg mt-6 leading-tight">
          The following are some of the crucial actions<br className="hidden lg:block" />
          throughout the entire procedure:
        </h4>
        <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium ml-1">
          {[
            'Quick first aid and fundamental trauma life support.',
            'Advanced trauma lifesaving techniques.',
            'Dispatch to trauma centers.',
            'Complete medical care and attention.'
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-blue-700 font-black flex-shrink-0">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700 text-sm lg:text-base font-medium mt-6 leading-relaxed">
          There may be a plenty of search results providing info on the hospitals in Varanasi, but if you want comprehensive care in the trauma care, Popular Hospital is the medical care facility you should count on.
        </p>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_20px_100px_20px]'
  },
  {
    id: 'first-offered',
    title: 'What kind of Emergency Care is first offered?',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Primary assessment is that form of care extended to the patient refers to the initial, rapid evaluation of the gravely injured at the point of encounter. Acute medical care is started for any significant wounds, fractures, or deep wounds that may be life-threatening.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Keeping the patient's airway patent (open) and maintaining breathing is the primary concern in trauma care. Vital signs and breathing are evaluated for the patient. The patient's airway is secured and breathing support is given if they are unconscious.
        </p>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[40px_100px_100px_100px]'
  },
  {
    id: 'bleeding-control',
    title: 'Bleeding control measures are implemented.',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          The patient's blood pressure and body temperature are normalized with the help of these treatments. When carried out right away, simple techniques like starting a fluid resuscitation, administering oxygen, obtaining IV access, and others can save lives.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          The time needed for definitive treatment and complicated procedures might be created by starting medical care right away.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          If your search for the Best Emergency Hospital near me is worrying you a lot, then give it a full stop by choosing none other than the Popular Hospital.
        </p>
      </div>
    ),
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1200',
    shape: 'rounded-[100px_100px_100px_40px]'
  }
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] font-heading leading-tight uppercase tracking-tight">
        {title} <span className="text-blue-600 font-black">{highlight}</span>
      </h2>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
        <div className="h-[3px] w-16 bg-gradient-to-r from-blue-600 to-transparent" />
      </div>
    </div>
);

/* ─── Main Component ─── */

export default function EmergencyTraumaClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
             src="/images/emergency.png"
            alt="Emergency & Trauma Care"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Emergency & Trauma Care
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Emergency & Trauma Care</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT CONTENT ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, idx) => {
              const showImage = section.id !== 'department';
              const isEven = idx % 2 === 0;
              return (
                <div key={section.id} className={`flex flex-col ${showImage ? (isEven ? 'lg:flex-row' : 'lg:flex-row-reverse') : 'items-center text-center'} gap-12 lg:gap-20`}>
                  <div className={`w-full ${showImage ? 'lg:w-[55%]' : 'w-full'}`}>
                    <SectionHeader title={section.title.split(' ').slice(0, -1).join(' ')} highlight={section.title.split(' ').slice(-1)[0]} />
                    <div className="text-justify">
                      {section.content}
                    </div>
                  </div>
                  
                  {showImage && (
                    <div className="w-full lg:w-[45%] flex justify-center">
                      <div className="relative w-full max-w-[500px]">
                        {/* Decorative Background Blob */}
                        <div className={`absolute -inset-10 bg-blue-50/50 rounded-full blur-[80px] opacity-60 z-0`}></div>
                        
                        {/* Styled Image Container */}
                        <div className={`relative w-full aspect-[4/3] z-10 overflow-hidden shadow-2xl border-4 border-white group ${section.shape}`}>
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
