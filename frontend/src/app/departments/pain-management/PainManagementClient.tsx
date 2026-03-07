'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const featureCards = [
  { title: "Nerve Blocks", icon: "bolt", desc: "Instant relief through advanced, precision-guided injections." },
  { title: "Spinal Care", icon: "back", desc: "Treatment for slip discs, sciatica, and lumbar spondylosis." },
  { title: "PRP Therapy", icon: "plus", desc: "Regenerative medicine for joint and musculoskeletal recovery." },
  { title: "Cancer Pain", icon: "shield", desc: "Palliative care and neuroablative procedures for relief." },
];

const medicalContent = [
  {
    title: "What is a Pain Management Clinic?",
    text: "Also called Pain Clinics deal with the management of chronic pain usually not responding to conventional treatment. Patients are managed an Interventional Pain Procedures performed by a doctor who has specialised in Pain Medicine."
  },
  {
    title: "What kind of patient need Pain Clinic?",
    text: "Patient suffering from chronic pain including, Headache, Migraine, Trigeminal Neuralgia, Neck, Shoulder, Backpain (Slip Disc), Knee, urogenital, Myofocial, Complex Regional Pain Syndrome and cancer pain are managed in Pain Management Clinic with Medications and Interventional Pain Procedures."
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
    <h3 className="text-xl md:text-2xl font-bold text-[#334155] mb-4 group-hover:text-orange-600 transition-colors">
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
                <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium text-base md:text-lg">
                    <span className="text-orange-500 mt-1.5 font-bold flex-shrink-0 text-xl leading-none">›</span>
                    <span>{bullet}</span>
                </li>
            ))}
        </ul>
    )}
  </div>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'bolt' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
    {icon === 'back' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
  </svg>
);

/* ─── Page ─── */

export default function PainManagementClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[600px] w-full bg-gradient-to-br from-[#334155] to-[#1e293b] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.1),transparent)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-200 text-sm font-semibold mb-6 border border-orange-400/30 backdrop-blur-sm">
                Pain Management & Palliative Care Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Pain Management <br />
              <span className="text-orange-400">Clinic</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-bold">
                Advanced interventions for chronic pain management. Regain your quality of life with precision-guided treatments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE CARDS (4-col) ═══════ */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-orange-500 hover:border-[#1e293b] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1e293b] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
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
                <SectionHeader title="Pain Clinic" highlight="Overview" />
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

            {/* Right Sidebar - Doctor Card with standard styling */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit py-10">
                <div className="relative pt-6 w-full max-w-sm mx-auto">
                    <Link
                        href="/doctors"
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                    >
                        SCHEDULE AN APPOINTMENT
                    </Link>

                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-0 relative group">
                        <div className="w-full relative overflow-hidden h-[480px]">
                            <div className="w-full h-full p-6 pt-12 flex flex-col items-center">
                                <div className="relative w-full h-[320px] rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                                    <Image
                                        src={doctors[0].image}
                                        alt={doctors[0].name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    />
                                    <Link
                                        href={`/doctors/${doctors[0].slug}`}
                                        className="absolute inset-0 bg-orange-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                                    >
                                        <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-orange-600 transition-all uppercase text-sm">
                                            View Full Profile
                                        </span>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-[#1e293b] mb-1 font-heading uppercase">{doctors[0].name}</h3>
                                    <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doctors[0].qualifications}</p>
                                    <p className="text-orange-600 text-xs mt-3 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 w-full max-w-sm mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h4 className="text-lg font-bold text-[#1e293b] mb-4 uppercase tracking-wider border-b pb-2">Treatment Benefits</h4>
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

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-[#1e293b] border-t border-gray-100 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight italic">
                Pain is Inevitable. <br className="hidden md:block" /> Suffering is Optional.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/doctors"
                className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
              >
                Book Expert Consultation
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-orange-400/50 text-orange-100 hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                 +91-7800001895 / 96
              </a>
            </div>
        </div>
      </section>

    </main>
  );
}
