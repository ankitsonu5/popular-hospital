"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const departmentOverview = [
  {
    text: "Interventional Radiology (IR) involves radiology and constitutes a super-speciality, which provides minimally invasive, image guided procedures and services, with reliable diagnosis and treatment. These are some of the least invasive techniques in medical practice, offering conclusive diagnostic / or treatment opportunities to the patients.",
  },
  {
    text: "A wide range of diseases that may affect almost any part of the human body may be treated through interventional techniques. Through the use of improved technology, the best outcomes can be obtained with minimal risks. The use of image-guided procedures allows diagnosis and treatment of early stage condition with minimal invasion that does not require a surgical operation.",
  },
  {
    text: "The majority of the IR processes take place on a day-care admission basis or as outpatients which helps save the hospital stays and the patient to go home earlier. This also minimizes interference with the normal life of the patient and also does not burden his family.",
  },
  {
    text: "Consequently, interventional radiology procedures tend to be more cost-effective as compared to numerous other types of treatment methods. They possess less risks, less complications, and provide still great outcome.",
  },
  {
    text: "Various other medical fields that interventional radiology collaborates with include Gastroenterology, Gastrointestinal Surgery, Pulmonology, Gynaecology, General Surgery and Vascular Surgery.",
  },
];

const radiologistSection = {
  title: "Who is an Interventional Radiologist?",
  text: "An interventional radiologist is a medical doctor who uses imaging guidance and specialised techniques to access internal organs and blood vessels. They can treat many conditions through the skin (percutaneously) that would otherwise require surgery. Using tools such as catheters, balloons, stents, and coils, interventional radiologists can perform a wide range of procedures.",
};

const advantagesSection = {
  title: "What are the Advantages of Interventional Radiology?",
  intro:
    "Interventional radiology offers several advantages compared to traditional invasive methods:",
  items: [
    {
      title: "Daycare / No admission",
      desc: "Many procedures can be completed without hospital admission",
    },
    {
      title: "No Scars",
      desc: "As a minimally invasive approach, it leaves no noticeable scars on the skin. Risks are lower, and pain is generally reduced",
    },
    {
      title: "Less risk / Less complications",
      desc: "Less pain, Less bleeding. The procedures usually require only a small incision, often the size of a pen tip.",
    },
    {
      title: "Faster recovery",
      desc: "Most treatments can be done on an outpatient or daycare basis, allowing quick recovery and minimal hospital stay",
    },
    {
      title: "Minimal requirement of General Anesthesia",
      desc: "Many procedures can be done under local anesthesia or moderate sedation instead of general anesthesia",
    },
    {
      title: "Cost-Effective",
      desc: "These treatments are typically more affordable than traditional surgical procedures or other alternatives",
    },
  ],
};

const proceduresSection = {
  title: "Procedures",
  intro:
    "Interventional radiology includes a variety of procedures that help in both diagnosing and treating medical conditions. At Popular Hospital, the Interventional Radiology Department offers:",
  items: [
    "Interventions in Liver Disorders",
    "Bleeding from Lungs",
    "Uterine Fibroid Embolization (UFE)",
    "Embolization of Gastrointestinal Bleed",
    "Renal Interventions",
    "Graft Surveillance and Hemodialysis Access",
    "Arteriovenous Malformations",
    "Percutaneous Needle Biopsies / FNAC and Catheter Drainages",
  ],
};

/* ─── Main Component ─── */

export default function InterventionalRadiologyClient({ doctors }: { doctors: any[] }) {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
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
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Super-Speciality Care
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Interventional <br />
              <span className="text-blue-300">Radiology</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Interventional Radiology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INTRO + DOCTOR SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Department of <span className="text-[#1e3a8a]">Interventional Radiology</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4">
                {departmentOverview.map((item, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                    {item.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Interventional Radiology" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ RADIOLOGIST SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Specialist Expertise
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Who is an <span className="text-[#1e3a8a]">Interventional Radiologist?</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-6">
                {radiologistSection.text}
              </p>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/radiology.jpeg"
                  alt="Interventional Radiologist at work"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ADVANTAGES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Patient-Centric Benefits
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                What are the <span className="text-[#1e3a8a]">Advantages?</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

            <p className="text-gray-800 text-lg 2xl:text-xl font-bold italic mt-6 leading-relaxed">
              {advantagesSection.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantagesSection.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0b1c43] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-[14px] font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/interventional_radiology.jpg"
                  alt="Interventional Radiology Procedures"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Diagnostic &amp; Therapeutic Range
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Major <span className="text-[#1e3a8a]">Procedures</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <p className="text-gray-800 text-base md:text-lg font-bold italic mb-6 leading-relaxed">
                {proceduresSection.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {proceduresSection.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-[14px] font-medium mt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
