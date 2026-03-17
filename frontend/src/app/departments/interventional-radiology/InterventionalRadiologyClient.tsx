'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

/* ─── Data (Transcribed from Uploaded Image) ─── */

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
    name: 'Dr Rohan Kumar Singh',
    qualifications: 'MBBS, MD (Radiodiagnosis), FIVIR',
    designation: 'Consultant Interventional Radiologist',
    slug: 'dr-rohan-kumar-singh',
    image: ''
  },
  {
    name: 'Dr Omkareshwar Pratap Singh',
    qualifications: 'MBBS, DNB (Radiodiagnosis)',
    designation: 'Consultant Radiologist',
    slug: 'dr-omkareshwar-pratap-singh',
    image: ''
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

/* ─── Main Component ─── */

export default function InterventionalRadiologyClient() {

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[450px] w-full bg-gradient-to-br from-[#0b1c43] to-[#042d55] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/radiology_banner.png"
            alt="Interventional Radiology Hero"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
                Super-Speciality Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Interventional <br />
              <span className="text-blue-400">Radiology</span>  
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
                    <div className="w-full md:w-1/3 relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                        <Image 
                            src="/images/departments-images/radiology.jpeg"
                            alt="Radiologist at work"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

            {/* Right Sidebar - Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
               <div className="sticky top-24 w-full h-fit space-y-8">
                  <DoctorSlider doctors={doctors} departmentName="Interventional Radiology" />

                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl max-w-sm mx-auto shadow-inner">
                     <h4 className="text-lg font-bold text-[#0b1c43] mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">Quick Info</h4>
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

      {/* ═══════ MAJOR PROCEDURES ═══════ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="mx-auto w-full max-w-[1366px] px-6 relative z-10">
          <div className="mb-12">
             <h2 className="text-3xl font-bold text-[#0b1c43] font-heading leading-tight uppercase tracking-wide">
                MAJOR <span className="text-blue-600 font-bold">PROCEDURES</span>
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div className="h-[2px] w-12 bg-gray-300" />
              </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image with custom transparent blob feel */}
            <div className="w-full lg:w-[50%] relative aspect-[4/3] group flex justify-center">
              <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/images/departments-images/radiology_scan.png"
                  alt="Procedures"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-800 text-base md:text-lg mb-10 font-bold text-justify leading-relaxed italic">
                {proceduresSection.intro}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {proceduresSection.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="text-blue-600 font-bold mt-1.5 transition-transform group-hover:translate-x-1">›</span>
                    <span className="text-gray-700 text-base leading-relaxed font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
