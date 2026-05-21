"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  FlaskConical,
  Zap,
  Brain,
  Bone,
  CheckCircle2,
  ArrowRight,
  Phone,
  HelpCircle,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const introFaqs = [
  {
    title: "What Is a Pain Management Clinic?",
    icon: HelpCircle,
    text: "Also called Pain Clinics, these deal with the management of chronic pain usually not responding to conventional treatment. Patients are managed through Interventional Pain Procedures performed by a doctor who has specialised in Pain Medicine.",
  },
  {
    title: "What kind of patient needs a Pain Clinic?",
    icon: Stethoscope,
    text: "Patients suffering from chronic pain including Headache, Migraine, Trigeminal Neuralgia, Neck, Shoulder, Back Pain (Slip Disc), Knee, urogenital, Myofacial, Complex Regional Pain Syndrome and cancer pain are managed in Pain Management Clinic with Medications and Interventional Pain Procedures.",
  },
  {
    title: "What treatments are offered in Pain Clinic?",
    icon: Activity,
    text: "Various modalities of treatment available include Interventional Pain Procedures, Platelet Rich Plasma Therapy (PRP), Vertebroplasty, Radio Frequency Lesioning, Percutaneous Balloon Compression for Trigeminal Neuralgia, Epidural Infusion Pumps, Percutaneous Lumbar Sympathectomy, Percutaneous Discectomy (Disc-Fix), and PLED.",
  },
  {
    title: "Where are Pain Management services available in India?",
    icon: ShieldCheck,
    text: "Pain Management services are available only in a few Medical Colleges, Major Cancer Hospitals and corporate hospitals. Pain Management Clinic at Popular Hospital is the only Pain Clinic in Purvanchal area from a corporate hospital with cashless facilities.",
  },
];

const trigeminalFaqs = [
  {
    title: "Specialised Procedures for Trigeminal Neuralgia",
    text: "RF Lesion of Gasserian Ganglion / Percutaneous Balloon Compression are non-surgical Interventional Pain Procedures that effectively control pain.",
  },
  {
    title: "Common Causes of Neck Pain",
    text: "Myofacial syndrome, Cervical spondylitis, Cervical Disc Prolapse, Ankylosing spondylitis, Facet joint arthropathy.",
  },
  {
    title: "Treatment for Neck Pain",
    text: "Trigger Point Injection (TPI), Median Nerve RF Neurotomy (MBB), Transforaminal Steroid Neuroplasty, Cervical RF Discectomy.",
  },
  {
    title: "Common Causes of Lower Back Pain (LBA)",
    bullets: [
      "Mechanical (>70%)",
      "Herniated Disc (4%)",
      "Osteoporotic Compression (4%)",
    ],
  },
  {
    title: "Treatment Modalities for LBA",
    text: "Transforaminal Steroid Neuroplasty, Percutaneous Discectomy / Disc Fix, RF Discectomy, Percutaneous Lumbar Endoscopic Discectomy (PLED), Median Branch RF Neurotomy with Intra-articular PRP for Facet Joint Arthropathy, Percutaneous Vertebroplasty for compressed fracture or Vertebral Metastasis.",
  },
  {
    title: "Treatment for OA Knee / Shoulder",
    text: "Intra-Articular PRP, RF Neurotomy Genicular Nerve (Knee Joint), Suprascapular Nerve RF Neurotomy (Shoulder OA).",
  },
];

const prpFaqs = [
  {
    title: "What is PRP Therapy?",
    text: "Regenerative Medicine focuses on regeneration of tissues using Platelet Rich Plasma (PRP) rich in growth hormone in degenerative diseases like Osteoarthritis, Facet joint arthropathy, Degenerative vertebral disc, Acute Ligament tear, Rheumatoid arthritis, Shoulder dislocation, and Avascular Necrosis (AVN).",
  },
  {
    title: "How frequently is IA PRP therapy required?",
    text: "IA PRP therapy is required three times at an interval of one month and then after one year.",
  },
  {
    title: "What is the cost of PRP therapy?",
    text: "The cost of IA PRP Therapy is approximately ₹20–25K per joint. PRP is a very cost-effective alternative to Joint Replacement.",
  },
  {
    title: "What is Radiofrequency Neurotomy for Genicular Nerves?",
    text: "RF Neurotomy is required in patients with advanced OA Knee (Grade 3/4) with PRP therapy. RF Neurotomy relieves pain while PRP helps in regeneration of cartilage, especially in poor-risk patients.",
  },
  {
    title: "Is PRP/RF Neurotomy an alternative to Knee Replacement?",
    text: "Yes, PRP with RF Neurotomy could be an alternative to Knee Replacement in selective patients.",
  },
  {
    title: "Common Causes of Urogenital Pain",
    text: "Female: Vaginal pain syndrome, Vulvar pain syndrome, Ca Cervix.\nMale: Prostatedynia.",
  },
  {
    title: "Treatment for Urogenital Pain",
    text: "Superior Hypogastric Plexus Neurolytic block / RF lesion, Ganglion Impar Neurolytic / RF Lesion.",
  },
];

const cancerFaqs = [
  {
    title: "How is cancer pain managed in Pain Clinic?",
    text: "Cancer pain is managed with Morphine tablets, Fentanyl Patch, Neuroablative procedures, Epidural infusion pumps, and Vertebroplasty.",
  },
  {
    title: "Where are cancer pain control facilities available in India?",
    text: "Facilities for cancer pain management are available in Major cancer hospitals, Medical Colleges and in few corporate hospitals — including Popular Hospital, Kakarmatta, Varanasi, under the supervision of Prof V Rastogi, Ex-Head, Pain and Palliative Care, Institute of Medical Sciences, BHU.",
  },
];

const features = [
  { title: "Interventional Pain Procedures", icon: Zap },
  { title: "PRP Therapy", icon: FlaskConical },
  { title: "Nerve RF Neurotomy", icon: Brain },
  { title: "Vertebroplasty", icon: Bone },
  { title: "Sleep & Cancer Pain", icon: HeartPulse },
  { title: "Specialized ICU Support", icon: Activity },
];

const doctors = [
  {
    name: "Dr. Alisha Raj",
    qualifications: "MBBS, MD (Anaesthesia), PDCC",
    designation: "Consultant Pain Management",
    slug: "dr-alisha-raj",
    image: "",
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

const SectionLabel = ({ text }: { text: string }) => (
  <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3">
    {text}
  </span>
);

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-[#1e3a8a] font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-3">
      <span className="w-1.5 h-8 rounded-full bg-[#1e3a8a] inline-block" />
      <div className="h-[2px] w-12 bg-blue-100" />
    </div>
  </div>
);

const FaqBlock = ({
  title,
  text,
  bullets,
  icon: Icon,
}: {
  title: string;
  text?: string;
  bullets?: string[];
  icon?: React.ElementType;
}) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
    <div className="flex items-start gap-4">
      {Icon && (
        <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100 flex items-center justify-center group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 mt-0.5">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div className="flex-1 space-y-2">
        <h3 className="text-[#0b1c43] font-bold text-sm sm:text-base group-hover:text-[#1e3a8a] transition-colors leading-snug">
          {title}
        </h3>
        {text && (
          <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
            {text}
          </p>
        )}
        {bullets && (
          <ul className="space-y-1.5 pt-1">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-500 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

/* ─── Page ─── */

export default function PainManagementClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-gradient-to-br from-[#334155] to-[#1e293b] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pain_management_banner.png"
            alt="Pain Management Banner"
            fill
            className="object-cover object-center opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-[#0b1c43]/80" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Specialized Care
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Pain <span className="text-blue-400">Medicine</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#d04420] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Pain Medicine"
                className="bg-transparent hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white min-h-[600px]">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">

          {/* Intro + Doctor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <SectionLabel text="About the Department" />
              <SectionHeader title="Pain" highlight="Medicine Clinic" />
              <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/60 to-transparent rounded-r-3xl shadow-sm">
                <p className="font-semibold text-gray-700 text-base md:text-[15px] leading-relaxed">
                  The Pain Management Clinic at Popular Hospital is the only dedicated Pain Clinic in the Purvanchal area from a corporate hospital, offering cashless facilities. Our specialists treat chronic pain conditions unresponsive to conventional treatment through advanced Interventional Pain Procedures.
                </p>
              </div>

              {/* Key features strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex items-center gap-2.5 bg-blue-50/50 rounded-xl px-3 py-2.5 border border-blue-100/60">
                      <Icon className="h-4 w-4 text-[#1e3a8a] shrink-0" />
                      <span className="text-gray-700 text-[11px] sm:text-xs font-semibold leading-snug">{f.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doctor Sidebar — same style as Cardiology */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider doctors={doctors} departmentName="Pain Medicine" />
              </div>
            </div>
          </div>

          {/* ── About & FAQ Cards ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Frequently Asked Questions" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                About <span className="text-[#1e3a8a]">Pain Management</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {introFaqs.map((item, idx) => (
                <FaqBlock key={idx} title={item.title} text={item.text} icon={item.icon} />
              ))}
            </div>
          </div>

          {/* ── Trigeminal Neuralgia — dark blue band ── */}
          <div className="mt-20 rounded-3xl bg-[#0b1c43] px-8 py-14 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="mb-10 text-center space-y-3">
                <span className="text-blue-400 font-bold tracking-widest text-xs uppercase block">Interventional Neurology</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight">
                  Trigeminal <span className="text-blue-300">Neuralgia & Neck / Back Pain</span>
                </h2>
                <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trigeminalFaqs.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-900/40 border border-blue-800/60 rounded-2xl p-5 hover:bg-blue-800/50 hover:border-blue-600/60 transition-all duration-200 group space-y-2"
                  >
                    <h3 className="text-white font-bold text-sm sm:text-base leading-snug group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    {item.text && (
                      <p className="text-blue-100/70 text-xs sm:text-sm font-medium leading-relaxed">
                        {item.text}
                      </p>
                    )}
                    {item.bullets && (
                      <ul className="space-y-1.5 pt-1">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-blue-200/80 text-xs sm:text-sm font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PRP Therapy Section ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Regenerative Medicine" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Platelet Rich Plasma <span className="text-[#1e3a8a]">(PRP) Therapy</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prpFaqs.map((item, idx) => (
                <FaqBlock key={idx} title={item.title} text={item.text} icon={FlaskConical} />
              ))}
            </div>
          </div>

          {/* ── Cancer Pain Section ── */}
          <div className="mt-20 border-t border-slate-100 pt-20">
            <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
              <SectionLabel text="Palliative Care" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                Cancer <span className="text-[#1e3a8a]">Pain Management</span>
              </h2>
              <div className="h-[2px] w-24 bg-blue-500 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cancerFaqs.map((item, idx) => (
                <FaqBlock key={idx} title={item.title} text={item.text} icon={HeartPulse} />
              ))}
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className="mt-20 rounded-3xl overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#0b1c43] to-[#1e3a8a] px-8 py-14 text-center">
              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">
                  Expert Pain Relief at Popular Hospital
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading leading-tight">
                  Live Pain-Free with the{" "}
                  <span className="text-[#E85222]">Pain Management Clinic</span> at Popular Hospital.
                </h2>
                <p className="text-blue-100/70 text-sm md:text-base font-medium leading-relaxed">
                  Advanced interventional procedures for chronic pain — cashless facilities available. Our team of Pain Medicine specialists is here to help you reclaim your life.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <Link
                    href="/book"
                    className="bg-[#E85222] hover:bg-[#d04420] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-xs tracking-widest"
                  >
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </Link>
                  <GetCallBackButton
                    department="Pain Management"
                    className="bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-xs tracking-widest"
                  >
                    <Phone className="h-4 w-4" /> Get a Call Back
                  </GetCallBackButton>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
