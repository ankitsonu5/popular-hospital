'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const featureCards = [
  { title: "Nerve Blocks", icon: "bolt", desc: "Instant relief through advanced, precision-guided injections." },
  { title: "Spinal Care", icon: "back", desc: "Treatment for slip discs, sciatica, and lumbar spondylosis." },
  { title: "PRP Therapy", icon: "plus", desc: "Regenerative medicine for joint and musculoskeletal recovery." },
  { title: "Cancer Pain", icon: "shield", desc: "Palliative care and neuroablative procedures for relief." },
];

const medicalContent = [
  {
    title: "Psychiatry Department",
    text: "Welcome to the Psychiatry Department at Popular Hospital, Varanasi! Our expert team of psychiatrists and psychologists is devoted to providing comprehensive care for people of all ages. We focus on mental health and are here to assist you in achieving emotional well-being and living a fulfilling life."
  },
  {
    title: "Our Services",
    text: "Psychiatric Evaluation and Diagnosis: Our psychiatrists perform in-depth evaluations to understand your mental health condition and provide accurate diagnoses. We focus on your unique experiences and concerns to create tailored treatment plans. We provide treatment of psychiatric illnesses like-"
  },
  {
    title: "What are various treatment offered in Pain Clinic?",
    text: "Various modalities of treatment available in Pain Management Clinic are Interventional Pain procedures, Platelet Rich Plasma Therapy (PRP), Vertebroplasty ,Radio Frequency Lesioning , Percutaneous Balloon Compression for Trigeminal Neuralgia, Epidural infusion pumps ,Percutaneous Lumber Sympathectomy.",
    bullets: [
      "Procedures are percutaneous no incision or cut is required",
      "Absolutely blood less",
      "Usually done under LA.General Anaesthesia not required",
      "No or Minimal Hospital Stay required",
      "Safe, cost effective, possible in poor risk cases"
    ]
  },
  {
    title: "Where are Pain Management services available in India?",
    text: "Pain Management services available only few Medical Colleges, Major Cancer hospital and corporate hospitals. Pain Management Clinic at Popular hospital is the only Pain Clinic in Purvanchal area from corporate hospital with cashless facilities."
  }
];

const trigeminalSection = {
  title: "Trigeminal Neuralgia",
  items: [
    {
      title: "What specialised Procedures performed in Pain Clinic for the management of Trigeminal Neuralgia?",
      text: "RF Lesion of Gasserian Ganglion / Percutaneous Balloon compression are non surgical Interventional Pain Procedures effectively control pain. Video of Varanasi Balloon compression (U Tube)"
    },
    {
      title: "What are common causes of Neck Pain?",
      text: "Myofascial syndrome, Cervical spondylitis, Cervical Disc Prolapse, Ankylosing spondylitis Facet joint arthropathy."
    },
    {
      title: "What are treatment offered for Neck pain in Pain Clinic?",
      text: "Trigger Point Inj. (TPI), Median Nerve RF Neurotomy(MBB), Transforaminal Steroid Neuroplasty, Cervical RF Discectomy."
    },
    {
      title: "Common Causes of LBA",
      bullets: [
        "Mechanical (>70%)",
        "Herniated Disc (4%)",
        "Osteoportio Compression(4%)"
      ]
    },
    {
      title: "What modalities treatment offered in Pain Clinic?",
      text: "Trans Foraminal Steroid Neuroplasty, Percutaneous Discectomy / Disc Fix , RF Discectomy Percutaneous Lumbar Endoscopic Discectomy(PLED), Median Branch RF Neurotomy with Intra articular PRP for Facet Joint Arthropathy, Percutaneous Vertebroplasty for compressed # or Vertibral Metastasis."
    },
    {
      title: "Treatment of OA Knee/Shoulder offered in Pain Clinic",
      text: "Intra Articular PRP, RF Nerotomy Genicular N.(Knee Joint), Supra scapular nerve RF Neurotomy (Shoulder OA)."
    }
  ]
};

const prpSection = {
  title: "Platelet Rich Therapy(PRP) Therapy",
  items: [
    {
      title: "What is PRP Therapy & How it is useful in Pain Management?",
      text: "Regenerative Medicine is one of the recently developed branch of Medicine focusing on regeneration of tissues using homologous Platelet Rich Plasma (PRP) rich in growth hormone or stem cell in degenerative diseases like Osteo arthritis, Facet joint arthropathy, Degenerative vertebral disc, Acute Ligament tear, Rheumatoid arthritis, shoulder dislocation, Avascular Necrosis (AVN) head of Femur/humerus. A significant increase in size of cartilage as evidence by Ultrasound measurement is seen. Intra articular PRP Therapy is performed under C-arm under sterile condition in OT."
    },
    {
      title: "How frequently IA PRP therapy is required?",
      text: "IA PRP therapy is for three times at an interval of one month and after one year."
    },
    {
      title: "What is the cost of PRP therapy?",
      text: "The cost of IA PRP Therapy approx. 20-25K per joint. PRP is very cost effective alternative of Joint Replacement."
    },
    {
      title: "What is Radiofrequency Neurotomy Genicular Nerves?",
      text: "RF Neurotomy is required in patient with advanced OA Knee(Gr.3/4) with PRP therapy. RF Neurotomy relives pain while PRP helps in regeneration of cartilage especially in poor risk patients."
    },
    {
      title: "Alternative to Knee Replacement Surgery?",
      text: "Yes, PRP with RF Neurotomy could be an alternative to Knee Replacement in selective patients."
    },
    {
      title: "Common causes of Urogenital pain",
      bullets: [
        "Female: Vaginal pain syndrome, vulvar pain syndrome, vulvar pain syndrome; Ca Cervix",
        "Male: Prostatedynia"
      ]
    },
    {
      title: "What Treatment Offered in Pain Clinic?",
      text: "Superior Hypogastric Plexus Neurolytic block/RF lesion, Ganglion Impar Neurolytic /RF Lesion."
    }
  ]
};

const cancerSection = [
  {
    title: "How the cancer pain is managed in Pain Clinic?",
    text: "In Pain Clinic cancer pain is managed with Morphine tab., Fentanyl Patch, Neuroablative procedures, Epidural infusion pumps, Vertebroplasty."
  },
  {
    title: "Where cancer pain control facilities are available in India?",
    text: "Facilities for cancer pain management is available in Major cancer hospitals, Medical colleges and in few corporate hospitals as in Popular hospital, Kakarmatta,Varanasi hospital, under the supervision of Prof.V.Rastogi, Ex-Head, Pain and Palliative care, Institute of Medical Sciences, BHU."
  }
];

const doctors = [
  {
    name: 'Prof. V. Rastogi',
    qualifications: 'MBBS, MD (Anesthesiology & Pain Medicine)',
    designation: 'Sr. Consultant & Head - Pain Medicine',
    slug: 'prof-v-rastogi',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] font-heading leading-tight uppercase tracking-wide">
      {title} <span className="text-orange-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-orange-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ContentBlock = ({ title, text, bullets }: { title: string; text?: string; bullets?: string[] }) => (
  <div className="mb-10 group">
    <h3 className="text-xl md:text-2xl font-bold text-[#334155] mb-4 group-hover:text-orange-600 transition-colors uppercase tracking-tight leading-tight">
        {title}
    </h3>
    {text && (
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify font-medium mb-4">
            {text}
        </p>
    )}
    {bullets && (
        <ul className="space-y-3 pl-2">
            {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 font-bold text-base md:text-lg">
                    <span className="text-orange-500 mt-1.5 font-bold flex-shrink-0 text-xl leading-none">›</span>
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
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-gradient-to-br from-[#334155] to-[#1e293b] overflow-hidden flex items-center py-10 md:py-12">
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
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-200 text-sm font-semibold mb-6 border border-orange-400/30 backdrop-blur-sm tracking-wide">
                Specialized Care
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Critical Care & <br />
              <span className="text-orange-400"> Pain Medicine</span>
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
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Content */}
            <div className="lg:col-span-8">
              
              <div className="mb-16">
                {medicalContent.map((item, idx) => (
                    <ContentBlock key={idx} title={item.title} text={item.text} bullets={item.bullets} />
                ))}
              </div>

              <div className="mb-16">
                <SectionHeader title="Trigeminal" highlight="Neuralgia" />
                {trigeminalSection.items.map((item, idx) => (
                    <ContentBlock key={idx} title={item.title} text={item.text} bullets={item.bullets} />
                ))}
              </div>

              <div className="mb-16">
                <SectionHeader title="PRP" highlight="Therapy" />
                {prpSection.items.map((item, idx) => (
                    <ContentBlock key={idx} title={item.title} text={item.text} bullets={item.bullets} />
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
                <DoctorSlider doctors={doctors} departmentName="Pain Medicine" />

                <div className="w-full max-w-sm mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner">
                    <h4 className="text-lg font-bold text-[#1e293b] mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">Treatment Benefits</h4>
                    <ul className="space-y-4">
                        {[
                            "Percutaneous - No incisions",
                            "Absolutely bloodless",
                            "Local Anaesthesia based",
                            "Minimal hospital stay",
                            "Safe and cost effective"
                        ].map((b, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
