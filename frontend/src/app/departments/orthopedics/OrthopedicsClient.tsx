'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Image) ─── */

const introParagraphs = [
  "The Orthopedics and Joint Replacement department provides comprehensive care in the field of Orthopedics by experienced and highly skilled surgeons backed by highly advanced and the world-class technology and post-operative physical rehabilitation by Physiotherapists.",
  "The Joint Replacement Centre chooses Minimally Invasive Surgical Techniques (MIS), Navigation Technology and High Quality Prosthesis to provide quick functional recovery and a shorter hospital stay. For early Osteoarthritis patients, the center provides Unicondylar (Partial Knee Replacement) for a pain free life.",
  "For Arthroscopy and Sports Injury we are well equipped with the latest Arthroscopic system and instruments to provide treatment for all common sports related injuries like ACL Tear, PCL Tear, Meniscal injury, Chondral Damage, Recurrent Patellar Dislocation, Recurrent Shoulder Dislocation, Rotator Cuff Injury, Slap Lesion and Shoulder Impingement. Our doctors are supported by expert team of physiotherapists for speedy recovery and provide rehabilitation to bring the patient to a pre injury level and start sports activity quickly.",
  "Our Trauma Center provides a multidisciplinary treatment involving General Surgeons, Neurosurgeons, Chest Physicians, Intensivists, Plastic Surgeons, In-House Blood Bank and state-of-the-art ICU care to treat cases of Poly Trauma.",
];

const replacementServices = [
  "Total Knee Replacement",
  "Partial (Unicondylar) Knee Replacement",
  "Total Hip Replacement",
  "Revision Hip and Knee Replacement",
  "Total Elbow Replacement",
  "Total Shoulder Replacement",
];

const arthroscopyServices = [
  "ACL/PCL Reconstruction",
  "Meniscal Repair",
  "Chondroplasty",
  "Rotator Cuff Repair",
  "SLAP Tear Repair",
  "Sub Acromial Decompression",
];

const limbReconstruction = [
  "Ilizarov",
  "Rail Fixation",
  "Tendon Transfer",
  "Deformity Correction",
  "SLAP Tear Repair",
  "Sub Acromial Decompression",
];

const traumaServices = [
  "Minimally Invasive Techniques for Plating",
  "Multidisciplinary Treatment of Polytrauma",
];

const pediatricOrthopedics = [
  "CTEV (Club Foot)",
  "CDH (Congenital Dislocation Hip)",
  "Polydactyly correction",
  "Genu Varum/ Valgus col-md-12 correction",
  "Cubitus-Varus/Valgus col-md-12 correction",
];

const spineSurgeries = [
  "Microscopic Discectomy",
  "Spinal Fixation",
  "Lumbar Canal Stenosis Decompression",
  "Correction of Spondylolisthesis",
  "Kyphoplasty",
];

const doctors = [
  {
    name: 'Dr. Mohd Akhtar Ali Ansari',
    qualifications: 'MBBS (Gauhati Medical College), MS Orthopaedics (AIIMS, New Delhi)',
    designation: 'Specialist in Joint Replacement, Arthroscopy, Spine Surgery & Trauma Care',
    slug: 'dr-mohd-akhtar-ali-ansari',
    image: '', // Image path if available
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function OrthopedicsClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/orthopedics_banner.png"
            alt="Orthopedics Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 border border-white/30 backdrop-blur-sm uppercase tracking-wider">
              Centre for Bone & Joint Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Restoring Mobility, <br />
              <span className="text-blue-100">Rebuilding Lives</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TOP SECTION: INTRO + DOCTOR ═══════ */}
      <section className="py-12 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Orthopedics & Joint Replacement" />
              <div className="space-y-6 text-gray-700 text-sm md:text-[15px] leading-relaxed mb-12 text-justify font-medium">
                {introParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-sm font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                                {doc.image ? (
                                  <Image
                                    src={doc.image}
                                    alt={doc.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                  </div>
                                )}
                                 <Link
                                  href={`/doctors/${doc.slug}`}
                                  className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                                >
                                  <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors uppercase text-sm">
                                    View More Info
                                  </span>
                                </Link>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-[#3b82f6] mb-1 font-heading">{doc.name}</h3>
                                <p className="text-gray-600 text-sm font-medium">{doc.qualifications}</p>
                                <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider font-bold">{doc.designation}</p>
                                <p className="text-gray-400 text-[10px] mt-1 uppercase font-bold">Medical Director</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Navigation Dots */}
                    {doctors.length >= 1 && (
                      <div className="flex gap-3 mb-8">
                        {doctors.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 border ${
                              currentSlide === idx ? 'bg-blue-600 border-blue-600 scale-125' : 'border border-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <div className="h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ REPLACEMENT SERVICES ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* List Left */}
            <div className="lg:col-span-7">
              <SectionHeader title="Replacement" highlight="Services:" />
              <ul className="space-y-1 mt-4">
                {replacementServices.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
            {/* Image Right (Blob Shape) */}
            <div className="lg:col-span-5 h-[400px] relative">
               <div className="absolute inset-0 bg-blue-50 rounded-[40%_60%_70%_30%/_50%_40%_60%_50%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[40%_60%_70%_30%/_50%_40%_60%_50%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/orthopedics.jpg"
                    alt="Orthopedic Replacement"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ARTHROSCOPY & SPORTS INJURY ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Left (Blob Shape) */}
            <div className="lg:col-span-6 h-[400px] relative order-2 lg:order-1">
               <div className="absolute inset-0 bg-blue-50 rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/advance_orthopedics.jpg"
                    alt="Arthroscopy"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
            {/* List Right */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SectionHeader title="Arthroscopy &" highlight="Sports Injury" />
              <ul className="space-y-1 mt-4">
                {arthroscopyServices.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LIMB RECONSTRUCTION ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* List Left */}
            <div className="lg:col-span-7">
              <SectionHeader title="Limb" highlight="Reconstruction:" />
              <ul className="space-y-1 mt-4">
                {limbReconstruction.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
            {/* Image Right (Blob Shape) */}
            <div className="lg:col-span-5 h-[400px] relative">
               <div className="absolute inset-0 bg-blue-50 rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/orthopaedic.jpeg"
                    alt="Limb Reconstruction"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TRAUMA ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Left (Blob Shape) */}
            <div className="lg:col-span-6 h-[400px] relative order-2 lg:order-1">
               <div className="absolute inset-0 bg-blue-50 rounded-[40%_60%_70%_30%/_50%_40%_60%_50%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[40%_60%_70%_30%/_50%_40%_60%_50%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/trauma_ortho.webp"
                    alt="Trauma Care"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
            {/* List Right */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SectionHeader title="Trauma:" highlight="" />
              <ul className="space-y-1 mt-4">
                {traumaServices.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PEDIATRIC ORTHOPEDICS ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* List Left */}
            <div className="lg:col-span-7">
              <SectionHeader title="Pediatric" highlight="Orthopedics:" />
              <ul className="space-y-1 mt-4">
                {pediatricOrthopedics.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
            {/* Image Right (Blob Shape) */}
            <div className="lg:col-span-5 h-[400px] relative">
               <div className="absolute inset-0 bg-blue-50 rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/pediatric_orthopedics.jpg"
                    alt="Pediatric Orthopedics"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SPINE SURGERIES ═══════ */}
      <section className="py-16 bg-white border-b border-gray-100 mb-20">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Left (Blob Shape) */}
            <div className="lg:col-span-6 h-[400px] relative order-2 lg:order-1">
               <div className="absolute inset-0 bg-blue-50 rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/spine-surgery.jpg"
                    alt="Spine Surgeries"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
            {/* List Right */}
            <div className="lg:col-span-6 order-1 lg:order-2">
               <SectionHeader title="Spine" highlight="surgeries:" />
              <ul className="space-y-1 mt-4">
                {spineSurgeries.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
