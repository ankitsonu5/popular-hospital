"use client";

import Image from "next/image";
import Link from "next/link";
import GetCallBackButton from "@/components/GetCallBackButton";

const features = [
  {
    title: "Advanced Wound Care",
    desc: "Protocol-led dressing, infection control, NPWT and ulcer monitoring for faster healing.",
    icon: "shield",
  },
  {
    title: "Vascular Assessment",
    desc: "Doppler, ABI and circulation evaluation to detect blocked vessels early.",
    icon: "pulse",
  },
  {
    title: "Limb Salvage Focus",
    desc: "Debridement, reconstruction and pressure offloading planned to avoid major amputation.",
    icon: "plus",
  },
  {
    title: "Team-Based Care",
    desc: "Diabetes, vascular, orthopedic, wound-care and rehabilitation inputs in one workflow.",
    icon: "team",
  },
];

const warningSymptoms = [
  "Non-healing wound or ulcer on feet",
  "Burning, numbness or tingling sensation",
  "Blackening, swelling or pus discharge",
  "Pain or cramping in the legs or feet",
  "Change in skin colour of feet",
  "Swelling or deformity in toes",
];

const uspList = [
  "Non-healing diabetic ulcer treatment with advanced wound care protocols",
  "Peripheral Arterial Disease (PAD) assessment using Doppler and ABI testing",
  "Neuropathic foot care with pressure offloading and custom orthotic solutions",
  "Charcot foot diagnosis, casting and surgical stabilization",
  "Surgical debridement, skin grafting and flap reconstruction",
  "Negative Pressure Wound Therapy (NPWT / VAC therapy)",
  "Maggot Debridement Therapy for infected chronic wounds",
  "Limb salvage procedures to prevent major amputation",
  "Regular HbA1c monitoring and blood glucose management coordination",
  "Diabetic footwear prescription and patient education programs",
];

const procedures = [
  "Wound Debridement (Surgical / Enzymatic)",
  "Skin Grafting for Diabetic Ulcers",
  "Revascularization / Peripheral Angioplasty",
  "Minor Toe Amputations (Digit Preservation)",
  "Tendon Lengthening / Achilles Correction",
  "Negative Pressure Wound Therapy (NPWT)",
  "Maggot Debridement Therapy",
  "Charcot Foot Stabilization and Casting",
  "Orthotic and Diabetic Footwear Prescription",
  "Nerve Conduction Study (NCS)",
  "Doppler Ultrasound and ABI Evaluation",
  "Split Skin Grafting (SSG)",
];

const carePathway = [
  {
    step: "01",
    title: "Foot Risk Screening",
    desc: "Wound depth, infection status, sensation and circulation are checked first.",
  },
  {
    step: "02",
    title: "Diabetes and Blood Flow Control",
    desc: "Sugar control, vascular status and infection markers guide the care plan.",
  },
  {
    step: "03",
    title: "Wound Closure Plan",
    desc: "Dressing, debridement, offloading, grafting or reconstruction is selected as needed.",
  },
  {
    step: "04",
    title: "Follow-Up and Prevention",
    desc: "Footwear advice, home care education and repeat monitoring reduce recurrence.",
  },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case "shield":
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.62-4.02A11.96 11.96 0 0112 2.94a11.96 11.96 0 01-8.62 3.04A12.02 12.02 0 003 9c0 5.59 3.82 10.29 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.04-.13-2.05-.38-3.02z" />
        </svg>
      );
    case "pulse":
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3-7 4 14 3-7h4" />
        </svg>
      );
    case "plus":
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.28-.36-1.86M7 20H2v-2a3 3 0 015.36-1.86M7 20v-2c0-.66.13-1.28.36-1.86m0 0a5 5 0 019.28 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
  }
};

const SectionHeader = ({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
}) => (
  <div className="mb-7">
    <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-blue-600">
      {eyebrow}
    </p>
    <h2 className="font-heading text-2xl font-bold leading-tight text-[#0b1c43] sm:text-3xl lg:text-4xl">
      {title} {highlight && <span className="text-blue-600">{highlight}</span>}
    </h2>
    <div className="mt-4 h-1 w-16 rounded-full bg-[#E85222]" />
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex gap-3 text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
      </svg>
    </span>
    <span>{text}</span>
  </li>
);

export default function DiabeticFootClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/adv_diabetic_foot_unit.jpg"
            alt="Advanced Diabetic Foot Unit Banner"
            fill
            className="object-cover object-center opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Advanced Diabetic Foot Unit
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Advanced Diabetic Foot Unit"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Overview"
              title="Complete diabetic foot care with a"
              highlight="limb-saving approach"
            />
            <div className="space-y-5 text-base font-medium leading-relaxed text-gray-700 sm:text-lg lg:text-[17px]">
              <p>
                The Advanced Diabetic Foot Unit at Popular Hospital, Varanasi is a
                dedicated multidisciplinary unit for diabetic foot wounds, ulcers,
                neuropathy, infection and circulation-related complications.
              </p>
              <p>
                The care model combines wound management, blood sugar coordination,
                vascular assessment, pressure offloading and surgical support so that
                every stage of diabetic foot disease is handled in a planned way.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Early detection", "Wound healing", "Amputation prevention"].map((item) => (
                <div key={item} className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-4">
                  <p className="text-sm font-black uppercase tracking-wide text-blue-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[420px]">
              <Image
                src="/images/departments-images/foot_care_with_a_limb.jpg"
                alt="Diabetic foot care consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Integrated Care
                </p>
                <p className="mt-2 text-2xl font-bold leading-tight">
                  Screening, treatment and prevention in one unit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeader
            eyebrow="Care Pillars"
            title="Designed for high-risk diabetic"
            highlight="foot conditions"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0b1c43] text-white">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0b1c43]">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-gray-600">
                  {feature.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Warning Signs"
              title="When should you"
              highlight="visit urgently?"
            />
            <p className="text-base font-medium leading-relaxed text-gray-700">
              If you have diabetes and notice any of these symptoms, a foot
              specialist review should not be delayed.
            </p>
            <div className="mt-7 rounded-xl border-l-4 border-[#E85222] bg-orange-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-[#0b1c43]">
                High-risk signs
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">
                Blackening, pus discharge, fever, spreading redness, severe pain or
                loss of sensation need prompt evaluation.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {warningSymptoms.map((symptom) => (
                <li
                  key={symptom}
                  className="flex min-h-[76px] items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                  <span className="font-semibold leading-relaxed text-red-900">
                    {symptom}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1c43] px-4 py-12 text-white sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">
              Treatment Pathway
            </p>
            <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              A clear care journey from screening to prevention.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {carePathway.map((item) => (
              <article key={item.step} className="rounded-xl border border-white/10 bg-white/[0.08] p-5">
                <p className="mb-5 text-3xl font-black text-blue-200">{item.step}</p>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-blue-50">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative min-h-[300px] overflow-hidden rounded-2xl shadow-xl sm:min-h-[420px]">
              <Image
                src="/images/departments-images/foot_care_with_a_limb_two.jpg"
                alt="Diabetic foot procedures"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/50 to-transparent" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Services"
              title="Specialized care available"
              highlight="in the unit"
            />
            <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {uspList.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Procedures"
              title="Surgical and non-surgical"
              highlight="treatment options"
            />
            <p className="max-w-2xl text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
              Treatment is selected based on wound severity, infection,
              circulation, pressure points and diabetes control.
            </p>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((procedure) => (
              <div
                key={procedure}
                className="rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm"
              >
                <p className="font-semibold leading-snug text-[#0b1c43]">
                  {procedure}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
