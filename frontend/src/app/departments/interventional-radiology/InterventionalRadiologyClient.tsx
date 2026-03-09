'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const featureCards = [
  { title: "Daycare Support", icon: "home", desc: "Most procedures completed without hospital admission." },
  { title: "Minimal Scars", icon: "shield", desc: "Minimally invasive approach with no noticeable scars." },
  { title: "Faster Recovery", icon: "bolt", desc: "Quick recovery and minimal hospital stay for patients." },
  { title: "Cost Effective", icon: "plus", desc: "More affordable than traditional surgical procedures." },
];

const departmentOverview = [
  {
    text: "Interventional Radiology (IR) involves radiology and constitutes a super-speciality, which provides minimally invasive, image guided procedures and services, with reliable diagnosis and treatment. These are some of the least invasive techniques in medical practice, offering conclusive diagnostic / or treatment opportunities to the patients."
  },
  {
    text: "A wide range of diseases that may affect almost any part of the human body may be treated through interventional techniques. Through the use of improved technology, the best outcomes can be obtained with minimal risks. The use of image-guided procedures allows diagnosis and treatment of early stage condition with minimal invasion that does not require a surgical operation."
  },
  {
    text: "The majority of the IR processes take place on a day-care admission basis or as outpatients which helps save the hospital stays and the patient to go home earlier. This also minimizes interference with the normal life of the patient and also does not burden his family."
  },
  {
    text: "Consequently, interventional radiology procedures tend to be more cost-effective as compared to numerous other types of treatment methods. They possess less risks, less complications, and provide still great outcome."
  },
  {
    text: "Various other medical fields that interventional radiology collaborates with include Gastroenterology, Gastrointestinal Surgery, Pulmonology, Gynaecology, General Surgery and Vascular Surgery."
  }
];

const radiologistSection = {
  title: "Who is an Interventional Radiologist?",
  text: "An interventional radiologist is a medical doctor who uses imaging guidance and specialised techniques to access internal organs and blood vessels. They can treat many conditions through the skin (percutaneously) that would otherwise require surgery. Using tools such as catheters, balloons, stents, and coils, interventional radiologists can perform a wide range of procedures."
};

const advantagesSection = {
  title: "What are the Advantages of Interventional Radiology?",
  intro: "Interventional radiology offers several advantages compared to traditional invasive methods:",
  items: [
    { title: "Daycare / No admission", desc: "Many procedures can be completed without hospital admission" },
    { title: "No Scars", desc: "As a minimally invasive approach, it leaves no noticeable scars on the skin. Risks are lower, and pain is generally reduced" },
    { title: "Less risk / Less complications", desc: "Less pain, Less bleeding. The procedures usually require only a small incision, often the size of a pen tip." },
    { title: "Faster recovery", desc: "Most treatments can be done on an outpatient or daycare basis, allowing quick recovery and minimal hospital stay" },
    { title: "Minimal requirement of General Anesthesia", desc: "Many procedures can be done under local anesthesia or moderate sedation instead of general anesthesia" },
    { title: "Cost-Effective", desc: "These treatments are typically more affordable than traditional surgical procedures or other alternatives" }
  ]
};

const proceduresSection = {
  title: "Procedures",
  intro: "Interventional radiology includes a variety of procedures that help in both diagnosing and treating medical conditions. At Popular Hospital, the Interventional Radiology Department offers:",
  items: [
    "Interventions in Liver Disorders",
    "Bleeding from Lungs",
    "Uterine Fibroid Embolization (UFE)",
    "Embolization of Gastrointestinal Bleed",
    "Renal Interventions",
    "Graft Surveillance and Hemodialysis Access",
    "Arteriovenous Malformations",
    "Percutaneous Needle Biopsies / FNAC and Catheter Drainages"
  ]
};

/* ─── Doctors Data ─── */
const doctors = [
  {
    name: 'Dr. Manoj Sharma',
    qualifications: 'MBBS, MD- Physiology, PGDCC',
    designation: 'Consultant',
    slug: 'dr-manoj-sharma',
    image: '/images/departments_doctor/dr-Manoj-Sharma.jpg'
  },
  {
    name: 'Dr. Hari Krishan Srivastava',
    qualifications: 'DM - Cardiology',
    designation: 'Consultant',
    slug: 'dr-hari-krishan-srivastava',
    image: '/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg'
  }
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0b1c43] font-heading leading-tight uppercase tracking-wide">
      {title} <span className="text-blue-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ContentBlock = ({ text }: { text: string }) => (
  <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify font-medium mb-6">
    {text}
  </p>
);

const ListItem = ({ text, boldTitle, desc }: { text?: string; boldTitle?: string; desc?: string }) => (
  <li className="flex items-start gap-3 text-gray-700 font-medium text-base md:text-lg mb-4">
    <span className="text-blue-500 mt-1.5 font-bold flex-shrink-0 text-xl leading-none">›</span>
    <div className="text-justify">
      {boldTitle && <span className="font-bold text-[#0b1c43]">{boldTitle}: </span>}
      <span>{text || desc}</span>
    </div>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'bolt' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
    {icon === 'home' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
  </svg>
);

/* ─── Main Component ─── */

export default function InterventionalRadiologyClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[550px] w-full bg-gradient-to-br from-[#0b1c43] to-[#042d55] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
            alt="Interventional Radiology Hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),transparent)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
                Super-Speciality Care
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Interventional <br />
              <span className="text-blue-400">Radiology</span>
            </h1>
            <p className="text-blue-50 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-bold text-justify">
                Minimally invasive, image-guided procedures for reliable diagnosis and precise treatment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE CARDS ═══════ */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-blue-600 hover:border-[#0b1c43] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b1c43] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT AREA ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Content */}
            <div className="lg:col-span-8">
              
              {/* Department of IR */}
              <div className="mb-16">
                <SectionHeader title="Department of" highlight="Interventional Radiology" />
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                    <div className="flex-1">
                        {departmentOverview.slice(0, 3).map((item, idx) => (
                            <ContentBlock key={idx} text={item.text} />
                        ))}
                    </div>
                </div>
                {departmentOverview.slice(3).map((item, idx) => (
                    <ContentBlock key={idx} text={item.text} />
                ))}
              </div>

              {/* Who is an Radiologist */}
              <div className="mb-16">
                <SectionHeader title="Who is an" highlight="Interventional Radiologist?" />
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <ContentBlock text={radiologistSection.text} />
                    </div>
                    <div className="w-full md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                        <Image 
                            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2664&auto=format&fit=crop"
                            alt="Radiologist at work"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
              </div>

              {/* Advantages section */}
              <div className="mb-16">
                <SectionHeader title="What are the" highlight="Advantages?" />
                <p className="text-gray-800 text-lg mb-8 font-bold italic text-justify">{advantagesSection.intro}</p>
                <ul className="grid grid-cols-1 gap-1">
                    {advantagesSection.items.map((item, idx) => (
                        <ListItem key={idx} boldTitle={item.title} desc={item.desc} />
                    ))}
                </ul>
              </div>

            </div>

            {/* Right Sidebar - Appointment Card & Help */}
            <div className="lg:col-span-4 flex justify-center">
               <div className="sticky top-24 w-full space-y-8">
                  <div className="relative pt-6 max-w-sm mx-auto w-full">
                      {/* Floating Appointment Button */}
                      <Link 
                        href="/doctors" 
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
                      >
                        SCHEDULE AN APPOINTMENT
                      </Link>
                      
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col items-center p-0 relative group overflow-hidden">
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
                                    <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors uppercase text-xs">
                                      View More Info
                                    </span>
                                  </Link>
                                </div>
                                <div className="text-center">
                                  <h3 className="text-xl font-bold text-blue-600 mb-1 font-heading">{doc.name}</h3>
                                  <p className="text-gray-600 text-sm font-semibold">{doc.qualifications}</p>
                                  <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">{doc.designation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button 
                          onClick={() => setCurrentSlide((prev) => (prev === 0 ? doctors.length - 1 : prev - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-lg text-blue-600 z-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous doctor"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setCurrentSlide((prev) => (prev === doctors.length - 1 ? 0 : prev + 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full shadow-lg text-blue-600 z-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next doctor"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {/* Pagination Dots */}
                        <div className="flex gap-2.5 mb-8">
                          {doctors.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSlide(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 border ${
                                currentSlide === idx 
                                  ? 'bg-blue-600 border-blue-600 scale-125' 
                                  : 'bg-transparent border-gray-300'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl max-w-sm mx-auto">
                     <h4 className="text-lg font-bold text-[#0b1c43] mb-4 uppercase tracking-wider border-b pb-2">Quick Info</h4>
                     <ul className="space-y-4">
                        {[
                          "Board-certified Radiologists",
                          "Expert Image Interpretation",
                          "Collaborative Multi-speciality Care",
                          "Advanced Imaging Technology"
                        ].map((info, idx) => (
                           <li key={idx} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              {info}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ MAJOR PROCEDURES (Full 1366px Width) ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <SectionHeader title="Major" highlight="Procedures" />
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop"
                alt="Procedures"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-lg md:text-xl mb-8 font-bold text-justify leading-relaxed">
                {proceduresSection.intro}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                {proceduresSection.items.map((item, idx) => (
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