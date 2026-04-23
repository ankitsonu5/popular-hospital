"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Image) ─── */

interface ContentItem {
  title: string;
  text?: string;
  bullets?: string[];
}

const introSections: ContentItem[] = [
  {
    title: "What Is a Pain Management Clinic?",
    text: "Also called Pain Clinics deal with the management of chronic pain usually not responding to conventional treatment. Patients are managed an Interventional Pain Procedures performed by a doctor who has specialised in Pain Medicine.",
  },
  {
    title: "What kind of patient need Pain Clinic?",
    text: "Patient suffering from chronic pain including, Headache, Migraine, Trigeminal Neuralgia, Neck, Shoulder, Backpain (Slip Disc), Knee, urogenital, Myofacial, Complex Regional Pain Syndrome and cancer pain are managed in Pain Management Clinic with Medications and Interventional Pain Procedures.",
  },
  {
    title: "What are various treatment offered in Pain Clinic?",
    text: "Various modalities of treatment available in Pain Management Clinic are Interventional Pain procedures, Platelet Rich Plasma Therapy (PRP), Vertebroplasty ,Radio Frequency Lesioning , Percutaneous Balloon Compression for Trigeminal Neuralgia, Epidural Infusion pumps ,Percutaneous Lumbar Sympathectomy, Percutaneous Discectomy(Disc-Fix), PLED.",
  },
  {
    title: "Where are Pain Management services available in India?",
    text: "Pain Management services available only few Medical Colleges, Major Cancer hospital and corporate hospitals. Pain Management Clinic at Popular hospital is the only Pain Clinic in Purvanchal area from corporate hospital with cashless facilities.",
  },
];

const trigeminalSection: ContentItem[] = [
  {
    title:
      "What specialised Procedures performed in Pain Clinic for the management of Trigeminal Neuralgia?",
    text: "RF Lesion of Gasserian Ganglion / Percutaneous Balloon compression are non surgical Interventional Pain Procedures effectively control pain. Video of Varanasi Balloon compression (U Tube)",
  },
  {
    title: "What are common causes of Neck Pain?",
    text: "Myofacial syndrome, Cervical spondylitis, Cervical Disc Prolapse, Ankylosing spondylitis ,Facet joint arthropathy.",
  },
  {
    title: "What are treatment offered for Neck pain in Pain Clinic?",
    text: "Trigger Point Inj. (TPI), Median Nerve RF Neurotomy(MBB), Transforaminal Steroid Neuroplasty, Cervical RF Discectomy.",
  },
  {
    title: "What are common causes of LBA?",
    bullets: [
      "Mechanical (>70%)",
      "Mechanical (>70%)",
      "Herniated Disc (4%)",
      "Osteoportio Compression(4%)",
    ],
  },
  {
    title: "What modalities treatment offered in Pain Clinic?",
    text: "Trans Foraminal Steroid Neuroplasty, Percutaneous Discectomy / Disc Fix , RF Discectomy ,Percutaneous Lumbar Endoscopic Discectomy(PLED), Median Branch RF Neurotomy with Intra articular PRP for Facet Joint Arthropathy, Percutaneous Vertebroplasty for compressed # or Vertibral Metastasis.",
  },
  {
    title:
      "What kind of the treatment of OA Knee/Shoulder offered in Pain Clinic?",
    text: "Intra Articular PRP, RF Nerotomy Genicular N (Knee Joint), Supra scapular nerve RF Neurotomy (Shoulder OA).",
  },
];

const prpSection: ContentItem[] = [
  {
    title:
      "Platelet Rich Therapy(PRP) Therapy What is PRP Therapy? How it is useful in Pain Management?",
    text: "Regenerative Medicine is one of the recently developed branch of Medicine focusing on regeneration of tissues using homologous Platelet Rich Plasma (PRP) rich in growth hormone or stem cell in degenerative diseases like Osteo arthritis, Facet joint arthropathy, Degenerative vertebral disc, Acute Ligament tear, Rheumatoid arthritis, shoulder dislocation, Avascular Necrosis (AVN) head of Femur/humerus. A significant increase in size of cartilage as evidence by Ultrasound measurement is seen. Intra articular PRP Therapy is performed under C-arm under sterile condition in OT.",
  },
  {
    title: "How frequently IA PRP therapy is required?",
    text: "IA PRP therapy is for three times at an interval of one month and after one year.",
  },
  {
    title: "What is the cost of PRP therapy?",
    text: "The cost of IA PRP Therapy approx. 20-25K per joint. PRP is very cost effective alternative of Joint Replacement.",
  },
  {
    title: "What is Radiofrequency Neurotomy Genicular Nerves?",
    text: "RF Neurotomy is required in patient with advanced OA Knee(Gr.3/4) with PRP therapy. RF Neurotomy relives pain while PRP helps in regeneration of cartilage especially in poor risk patients.",
  },
  {
    title:
      "Could PRP/RF Neurotomy is an alternative to Knee Replacement Surgery?",
    text: "Yes, PRP with RF Neurotomy could be an alternative to Knee Replacement in selective patients.",
  },
  {
    title: "What are the common causes of Urogenital pain ?",
    text: "Female: Vaginal pain syndrome, vulvar pain syndrome, vulvar pain syndrome; Ca Cervix\nMale: Prostatedynia",
  },
  {
    title: "What Treatment Offered in Pain Clinic?",
    text: "Superior Hypogastric Plexus Neurolytic block/RF lesion, Ganglion Impar Neurolytic /RF Lesion",
  },
];

const cancerSection: ContentItem[] = [
  {
    title: "How the cancer pain is managed in Pain Clinic?",
    text: "In Pain Clinic cancer pain is managed with Morphine tab., Fentanyl Patch, Neuroablative procedures, Epidural infusion pumps, Vertebroplasty.",
  },
  {
    title: "Where cancer pain control facilities are available in India?",
    text: "Facilities for cancer pain management is available in Major cancer hospitals, Medical colleges and in few corporate hospitals as in Popular hospital, Kakarmatta,Varanasi hospital, under the supervision of Prof V Rastogi, Ex-Head, Pain and Palliative care, Institute of Medical Sciences, BHU.",
  },
];

const doctors = [
  {
    name: "Dr. Alisha Raj",
    qualifications: "MBBS, MD (Anaesthesia), PDCC",
    designation: "Consultant Pain Management",
    slug: "dr-alisha-raj",
    image: "", // Placeholder as per backend and uploaded image
  },
  {
    name: "Dr. Rahul Singh",
    qualifications: "MBBS, MD (Anaesthesia), PDCC",
    designation: "Consultant Pain Management",
    slug: "dr-rahul-singh",
    image: "",
  },
  {
    name: "Dr. Sumit Vishwakarma",
    qualifications: "MBBS, MD (Anaesthesia) IMS, BHU",
    designation: "Consultant Pain Management",
    slug: "dr-sumit-vishwakarma",
    image: "",
  },
  {
    name: "Dr. Vikas Mishra",
    qualifications: "MBBS, MD (Anaesthesia)",
    designation: "Consultant Pain Management",
    slug: "dr-vikas-mishra",
    image: "",
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-8 2xl:mb-12 flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#1e293b] font-heading leading-tight uppercase tracking-wide flex items-center gap-4">
      {title} <span className="text-[#3b82f6] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-4 w-full">
      <div className="h-[1px] flex-grow bg-gray-300" />
      <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
      <div className="h-[1px] flex-grow bg-gray-300" />
    </div>
  </div>
);

const ContentBlock = ({
  title,
  text,
  bullets,
}: {
  title: string;
  text?: string;
  bullets?: string[];
}) => (
  <div className="mb-10 2xl:mb-14 group">
    <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#3b82f6] mb-4 group-hover:text-blue-700 transition-colors tracking-tight leading-tight">
      {title}
    </h3>
    {text && (
      <p className="text-gray-700 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed text-justify font-medium mb-4 whitespace-pre-line">
        {text}
      </p>
    )}
    {bullets && (
      <ul className="space-y-3 pl-2">
        {bullets.map((bullet, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-gray-700 font-medium text-base md:text-lg 2xl:text-xl"
          >
            <span className="text-gray-900 mt-1.5 font-bold flex-shrink-0 text-xl 2xl:text-2xl leading-none">
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ─── Page ─── */

export default function PainManagementClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-gradient-to-br from-[#334155] to-[#1e293b] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pain_management_banner.png"
            alt="Pain Management Banner"
            fill
            className="object-cover object-center opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#334155] via-[#334155]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Specialized Care
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Pain <span className="text-blue-400">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#3b82f6] hover:bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Pain Management"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT AREA ═══════ */}
      <section className="py-20 xl:py-12 2xl:py-24 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="mb-16">
                {introSections.map((item, idx) => (
                  <ContentBlock
                    key={idx}
                    title={item.title}
                    text={item.text}
                    bullets={item.bullets}
                  />
                ))}
              </div>

              <div className="mb-16">
                <SectionHeader title="Trigeminal" highlight="Neuralgia" />
                {trigeminalSection.map((item, idx) => (
                  <ContentBlock
                    key={idx}
                    title={item.title}
                    text={item.text}
                    bullets={item.bullets}
                  />
                ))}
              </div>

              <div className="mb-16">
                <SectionHeader
                  title="Platelet Rich"
                  highlight="Therapy(PRP) Therapy"
                />
                {prpSection.map((item, idx) => (
                  <ContentBlock
                    key={idx}
                    title={item.title}
                    text={item.text}
                    bullets={item.bullets}
                  />
                ))}
              </div>

              <div className="mb-0">
                <SectionHeader title="Cancer" highlight="Pain Syndrome" />
                {cancerSection.map((item, idx) => (
                  <ContentBlock key={idx} title={item.title} text={item.text} />
                ))}
              </div>
            </div>

            {/* Right Sidebar - Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit flex flex-col gap-10">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Pain Medicine"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
