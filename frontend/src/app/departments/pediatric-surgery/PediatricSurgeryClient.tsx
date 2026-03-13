'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const doctors = [
  {
    name: 'Dr Alok C Bhardwaj',
    qualifications: 'MBBS, MD (Pediatrics) IMS, BHU',
    designation: 'HEAD, DEPARTMENT OF PEDIATRICS',
    slug: 'dr-alok-c-bhardwaj',
    image: '',
  },
  {
    name: 'Dr Prabhat Kumar',
    qualifications: 'MBBS, DCH, DNB (Pediatrics)',
    designation: 'Consultant Senior Pediatrician',
    slug: 'dr-prabhat-kumar',
    image: '/images/departments_doctor/dr_prabhat_kumar.png',
  },
  {
    name: 'Dr Greeshma Suresh',
    qualifications: 'MBBS, MS, MCh (Pediatric Surgery) IMS, BHU',
    designation: 'Consultant Pediatric Surgeon',
    slug: 'dr-greeshma-suresh',
    image: '',
  },
];

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

export default function PediatricSurgeryClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Banner ─── */}
      <section className="relative py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a4a6b 0%, #2d7a9a 60%, #3aaccc 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 mx-auto max-w-[1366px] px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">Pediatric Surgery</h1>
          <nav className="flex items-center gap-2 text-white/80 text-sm flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>|</span>
            <Link href="/departments" className="hover:text-white transition-colors">Departments</Link>
            <span>|</span>
            <span className="text-white font-semibold">Pediatric Surgery</span>
          </nav>
        </div>
      </section>

      {/* ─── Intro + Doctor Cards Section ─── */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Intro Left */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Pediatric Surgery" />
              <div className="space-y-4 text-gray-700 text-base leading-relaxed text-justify">
                <p>
                  Pediatric Surgery is a specialization in medicine dealing with surgery of infants, children, and adolescents. It covers a large number of health issues that demand surgical operations with treatments being suitably adjusted to the overall anatomy and needs of the young patients. The Pediatric Surgery Department at Popular Hospital is a unit that blends technological superiority, an exceptional aptitude to perform surgery, and a sensitive treatment to provide ample treatment with effective and secure end-results, child-friendly.
                </p>
                <p>
                  The Pediatric surgical care involves several disciplines such as Neuro, Cardiac, Urologic, Orthopedics, and General surgical care. Our experts focus on lowering the level of discomfort, minimising risk and accelerating patient recovery utilising both low invasive and conventional surgical procedures.
                </p>
                <p>
                  A large number of procedures are being carried out on daycare or short-stay basis providing children with quicker entry to home and continuation with normal activities. Such a strategy can alleviate stress on both the family and the child, and high standard of surgical treatment is achieved.
                </p>
              </div>
            </div>

            {/* Right Doctor Card Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative">
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
                                <div className="flex items-center justify-center h-full bg-blue-50">
                                  <svg className="w-24 h-24 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                  </svg>
                                </div>
                              )}
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
                              <h3 className="text-xl font-bold text-[#3d7cc9] mb-1">{doc.name}</h3>
                              <p className="text-gray-600 text-sm font-medium">{doc.qualifications}</p>
                              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {doctors.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide(p => (p === 0 ? doctors.length - 1 : p - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide(p => (p === doctors.length - 1 ? 0 : p + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {doctors.length > 1 && (
                      <div className="flex gap-2.5 mb-8">
                        {doctors.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 border ${
                              currentSlide === idx 
                                ? 'bg-blue-600 border-blue-600 scale-125' 
                                : 'bg-transparent border-gray-400'
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

          {/* ── Moved Sections Below ── */}
          <div className="mt-20 space-y-24">
            
            {/* Knowing Section */}
            <div className="max-w-4xl">
              <SectionHeader title="Knowing a" highlight="Pediatric Surgeon?" />
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                A pediatric surgeon is a uniquely qualified provider whose expertise consists of conducting surgeries that are specific to children. Those caregivers learn the physical or emotional requirements of small patients and collaborate with pediatric anesthesiologists, neurologists, cardiologists, orthopedic surgeons, and urologists to maintain the safest and efficacy procedures.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <SectionHeader title="Pediatric Surgery at" highlight="Popular Hospital" />
                <p className="text-gray-700 text-base mb-4 leading-relaxed font-semibold">At Popular Hospital, pediatric surgery offers several benefits, including:</p>
                <ul className="space-y-3">
                  {[
                    { title: 'Daycare / No admission', desc: 'Many procedures can be completed without hospital admission' },
                    { title: 'Daycare / Minimal Admission', desc: 'Many surgeries allow for same-day discharge' },
                    { title: 'Child-Friendly Environment', desc: 'Care is provided in a setting designed to make children feel safe and comfortable' },
                    { title: 'Minimally Invasive Surgical Methods', desc: 'Since the surgical incisions are small, it reduces pain significantly during and after surgery. This also aids in faster healing' },
                    { title: 'Specialized Pediatric Anesthesia', desc: 'Pediatric Anesthesia is administered carefully with respect to a child\'s age, size, and condition' },
                    { title: 'Reduced Risk and Complications', desc: 'With advanced techniques available at Popular Hospital, the risks are greatly reduced and expert surgeons ensure safer outcomes' },
                    { title: 'Cost-Effective Care', desc: 'Popular Hospital aims at offering top of the notch pediatric healthcare keeping all its services accessible without compromising quality' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">›</span>
                      <p className="text-gray-700 text-base leading-relaxed text-justify">
                        <span className="font-bold text-blue-600 uppercase tracking-tight">{item.title}:</span> {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                  alt="Pediatric Surgery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Specialized Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(0% 0, 90% 0%, 100% 100%, 10% 100%)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800"
                  alt="Specialized Areas"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <SectionHeader title="Specialized Areas of Pediatric Surgery at" highlight="Popular Hospital" />
                <ul className="space-y-4">
                  {[
                    { title: 'Pediatric Neurological Surgery', desc: 'Procedures for congenital brain and spine conditions, hydrocephalus, and other neurological disorders.' },
                    { title: 'Pediatric Urological Surgery', desc: 'Treatment for urinary tract anomalies, undescended testes, and other urological issues.' },
                    { title: 'Pediatric General Surgery', desc: 'Management of abdominal conditions, hernias, tumours, and gastrointestinal issues.' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">›</span>
                      <p className="text-gray-700 text-base leading-relaxed text-justify">
                        <span className="font-bold text-blue-600">{item.title}:</span> {item.desc}
                      </p>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 pt-6 border-t border-gray-100">
                    <span className="text-blue-600 font-bold mt-1">›</span>
                    <p className="text-gray-700 text-base leading-relaxed text-justify">
                      <span className="font-bold text-[#0b1c43]">Conclusion:</span> At Popular Hospital, we understand that surgery of a child is not only a medical condition needing highest amount of medical care but also an emotional one to the entire family. Our Pediatric Surgery Department provides high-quality medical treatment in various fields, and its experienced staff treats each of the patients with care, understanding, and respect. As these parameters are our key offerings, our parents can be assured of the best surgical care to their children.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
