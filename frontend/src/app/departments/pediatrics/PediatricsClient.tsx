'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from previous turn + General Surgery Theme) ─── */

const introParagraphs = [
  "The Department of Pediatrics and Neonatology promotes the health of children and adolescents with a balanced approach, delivers high quality comprehensive clinical care.",
  "The department has a dedicated team of highly qualified Pediatricians and Neonatologists that take care of all babies' right from their first breath.",
  "We take care of all newborns including very fragile preterm at our state-of-the-art Neonatal Intensive Care unit with utmost commitment. Our NICU is equipped with Ultra-modern warmers, Ventilators, CPAP, LED phototherapies, open care system which is manned by highly trained nursing staff.",
  "Our PICU is also suitably equipped to take care of all Pediatric Intensive Care needs. The hospital is equipped with CT, MRI, etc. facilities for all Imaging needs and is also having excellent Pathology and Microbiology services, excellent support from other specialties like Neurology, Cardiology, Urology, Orthopedics, Surgery etc. which are available round the clock.",
];

const servicesOffered = [
  "Outpatient Services including general check-up, well baby clinic, high risk baby clinic and vaccinations",
  "Emergency Management of all pediatric and neonatal problems, round-the-clock",
  "PICU Services including assisted ventilation, management of severe asthma, seizures, shock, etc.",
  "Neonatal resuscitation in LR and OT",
  "Neonatal/Pediatrics ventilation, CPAP & oz supplementation",
  "Phototherapy",
  "Exchange Blood Transfusion",
  "Surfactant administration-including modern LISA technique",
  "Neonatal metabolic & thyroid screening",
  "Neonatal ROP Screening (by Ophthalmologist on call)",
  "Bedside 2D Echo X-Ray & USG",
  "Neonatal surgery (pediatric surgeon on call)",
  "Peritoneal dialysis",
];

const indoorServices = [
  "Round-the-clock availability of qualified pediatrician on call",
  "Pediatric surgery (pediatric surgeon on call)",
  "Chemotherapy for pediatric cancer patients",
  "Asthma treatment facility",
  "Blood transfusion and chelation facility for thalassemia patients",
  "All common invasive procedures like bone marrow and liver biopsy, thoracocentesis, renal biopsy etc.",
  "Only hospital of eastern Uttar Pradesh having CRRT facility for Pediatric Patients",
  "GI endoscopy for children (in association with department of Gastroenterology)",
  "Bronchoscopy for children (in association with Pulmonologist & Pediatric Surgeon)",
];

const highlights = [
  "Supported by latest technology & experienced specialists",
  "Direct supervision of Senior Neonatologists and Pediatricians",
  "Clear communication with parents, with complete transparency & accountability",
  "24x7 access to newborns for mothers",
  "Antenatal clinic for parents to deal with fetal abnormalities detected on USG",
];

const doctors = [
  {
    name: 'Dr. Alok C Bhardwaj',
    qualifications: 'MBBS (IMS, BHU, Varanasi - 1987), MD - Paediatrician (IMS, BHU, Varanasi - 1991)',
    designation: 'Medical Director',
    slug: 'dr-alok-c-bhardwaj',
    image: '', // Image path if available later
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

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'baby' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
    {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
  </svg>
);

/* ─── Page ─── */

export default function PediatricsClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pediatrics.png"
            alt="Pediatrics Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Pediatrics & Neonatology
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#e11d48] hover:bg-rose-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-rose-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book An Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
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
              <SectionHeader title="Department of" highlight="Pediatrics And Neonatology" />
              <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed mb-12 text-justify">
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
                                <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider font-bold">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Arrows — only if > 1 doctor */}
                    {doctors.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === 0 ? doctors.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide(prev => (prev === doctors.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Pagination Dots */}
                    {doctors.length > 1 && (
                      <div className="flex gap-3 mb-8">
                        {doctors.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border ${
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
        </div>
      </section>

      {/* ═══════ SERVICE OFFERED SECTION ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* List Left */}
            <div className="lg:col-span-7">
              <SectionHeader title="Service" highlight="Offered:" />
              <ul className="space-y-2 mt-4">
                {servicesOffered.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
            {/* Image Right (Blob Shape) */}
            <div className="lg:col-span-5 h-[500px] relative">
               <div className="absolute inset-0 bg-blue-50  opacity-50" />
               <div className="w-full h-full relative overflow-hidden border-4 border-white shadow rounded-xl">
                  <Image 
                    src="/images/departments-images/Pediatrics Service.jpg"
                    alt="Pediatrics Service"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PEDIATRIC INDOOR SERVICES ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Left (Blob Shape) */}
            <div className="lg:col-span-6 h-[550px] relative order-2 lg:order-1">
               <div className="absolute inset-0 bg-blue-50 rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[70%_30%_30%_70%/_50%_60%_40%_50%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/pediatric_opd_realistic.png"
                    alt="Indoor Services"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
            {/* List Right */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SectionHeader title="Pediatric Indoor" highlight="Services" />
              <ul className="space-y-3 mt-4">
                {indoorServices.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HIGHLIGHTS SECTION ═══════ */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* List Left */}
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold text-[#3b82f6] font-heading mb-6">Highlights</h2>
              <ul className="space-y-4">
                {highlights.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>
            {/* Image Right (Blob Shape) */}
            <div className="lg:col-span-6 h-[400px] relative">
               <div className="absolute inset-0 bg-blue-50 rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] opacity-50" />
               <div className="w-full h-full relative overflow-hidden rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] border-4 border-white shadow-2xl">
                  <Image 
                    src="/images/departments-images/neonatology.jpeg"
                    alt="Pediatrics Highlights"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}


