"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clipboard,
  Calendar,
  HeartPulse,
  Heart,
  ArrowRight,
} from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

// Edit these doctor details here when you are ready.
const doctors = [
  {
    name: "Dr. Priyanka Jaiswal",
    qualifications: "MBBS, MS (OBGY)",
    designation: "Consultant Gynaecologist",
    slug: "dr-priyanka-jaiswal",
    image: "/images/departments_doctor/dr_priyanka_jaiswal.jpg",
  },
  {
    name: "Dr. Akanksha Chaturvedi",
    qualifications: "MBBS, MS (Obs & Gynae)",
    designation: "IVF & Fertility Specialist",
    slug: "dr-akanksha-chaturvedi",
    image: "/images/departments_doctor/dr_akanksha_chaturvedi.jpg",
  },
  {
    name: "Dr. Srishti Tanya",
    qualifications: "M.B.B.S., MS",
    designation: "Consultant Gynaecologist",
    slug: "dr-srishti-tanya",
    image: "/images/departments_doctor/dr._srishti_tanya.jpg",
  },
];

const highlights = [
  {
    title: "Fertility Evaluation",
    icon: Clipboard,
    desc: "Complete assessment for both partners including history, hormone profile, ultrasound and semen analysis.",
  },
  {
    title: "Ovulation Support",
    icon: Calendar,
    desc: "Cycle tracking, ovulation induction and timed treatment planning for couples trying to conceive.",
  },
  {
    title: "IUI & IVF Guidance",
    icon: HeartPulse,
    desc: "Personalized counselling and treatment planning for assisted reproductive options as clinically needed.",
  },
  {
    title: "Pregnancy Support",
    icon: Heart,
    desc: "Early pregnancy monitoring, high-risk screening and coordinated care with obstetrics specialists.",
  },
];

const servicesCategories = [
  {
    title: "Diagnostics & Evaluations",
    icon: Clipboard,
    description:
      "Comprehensive assessment protocols to identify barriers to conception.",
    items: [
      "Female and male infertility evaluation",
      "Hormonal assessment and ovarian reserve testing",
      "Semen analysis and male fertility counselling",
    ],
  },
  {
    title: "Ovulation & Hormonal Support",
    icon: Calendar,
    description:
      "Careful monitoring and cycle tracking to optimize ovulation windows.",
    items: [
      "Follicular monitoring and ovulation induction",
      "PCOS-related fertility management",
      "Preconception health optimisation",
    ],
  },
  {
    title: "Assisted Reproduction Guidance",
    icon: HeartPulse,
    description:
      "Guidance and coordination for advanced therapeutic reproductive cycles.",
    items: [
      "IUI treatment counselling and preparation",
      "IVF / ICSI counselling and cycle coordination",
      "Fertility preservation counselling",
    ],
  },
  {
    title: "Pregnancy & Restorative Care",
    icon: Heart,
    description:
      "Ongoing clinical support and screening to promote healthy outcomes.",
    items: [
      "Recurrent pregnancy loss evaluation",
      "Early pregnancy monitoring",
      "Lifestyle and nutrition guidance for fertility",
    ],
  },
];

const careSteps = [
  {
    step: "01",
    title: "Detailed Consultation",
    desc: "The couple's history, previous reports and treatment goals are reviewed with privacy and care.",
  },
  {
    step: "02",
    title: "Targeted Testing",
    desc: "Tests are selected to identify ovulation, tubal, uterine, hormonal or male-factor causes.",
  },
  {
    step: "03",
    title: "Personalized Plan",
    desc: "A practical care plan is created, from natural cycle support to assisted reproduction options.",
  },
  {
    step: "04",
    title: "Ongoing Monitoring",
    desc: "Cycles, response and early pregnancy progress are monitored closely for safer outcomes.",
  },
];

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-violet-950 font-heading leading-tight">
      {title} <span className="text-pink-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <span className="w-1.5 h-8 rounded-full bg-pink-600 inline-block" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:violet-100 transition-all duration-300 flex items-start gap-3">
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700 border border-violet-100 shadow-inner">
      <Check className="h-3.5 w-3.5" />
    </span>
    <span className="text-gray-700 text-xs sm:text-sm font-bold leading-relaxed">
      {text}
    </span>
  </div>
);

export default function IvfFertilityClient() {
  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-violet-950 overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/laboratory_medicine.png"
            alt="IVF and Fertility Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-violet-950/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 text-pink-200 text-sm font-semibold mb-6 border border-pink-400/30 backdrop-blur-sm tracking-wide">
              Department of
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              IVF & <br />
              <span className="text-pink-300">Fertility</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-pink-600/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="IVF & Fertility"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INTRO + SINGLE DOCTOR CARD ═══════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Description */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader title="Compassionate" highlight="Fertility Care" />
              <div className="space-y-6 text-gray-700 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed font-medium text-justify">
                <p>
                  The IVF & Fertility department at Popular Hospital is designed
                  to support couples with clear evaluation, evidence-based
                  treatment planning and compassionate reproductive care. Our
                  approach focuses on understanding the cause of infertility and
                  choosing the right step at the right time.
                </p>
                <div className="relative border-l-4 border-pink-500 pl-6 py-4 bg-gradient-to-r from-pink-50/40 to-pink-50/10 rounded-r-3xl my-6 shadow-sm">
                  <p className="font-semibold text-gray-800">
                    From ovulation issues, PCOS and recurrent pregnancy loss to
                    male-factor infertility and assisted reproduction
                    counselling, patients receive private, structured and
                    coordinated care.
                  </p>
                </div>
                <p>
                  Every fertility journey is personal. Our team emphasizes
                  counselling, transparent communication and regular monitoring
                  so couples feel supported throughout evaluation and treatment.
                </p>
              </div>
            </div>

            {/* Right Single Doctor Card Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="IVF & Fertility"
                  preventBackendFetch={true}
                />
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-violet-950 group-hover:text-violet-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES SECTION WITH IMAGE ═══════ */}
      <section className="py-20 xl:py-16 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Illustration Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[340px] h-[400px] lg:h-[460px] lg:self-center rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-150">
                <Image
                  src="/images/departments-images/obstetrics_care.jpg"
                  alt="IVF and fertility care"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-semibold leading-relaxed bg-violet-950/80 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <p className="font-bold mb-1 text-pink-300 uppercase tracking-widest text-[9.5px]">
                    Quality Standards
                  </p>
                  Patient-first approach with top clinical success rates and
                  safety protocols.
                </div>
              </div>
            </div>

            {/* Right bullet check list */}
            <div className="lg:col-span-8 space-y-6">
              <SectionHeader title="Our Fertility" highlight="Services" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {servicesCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.title}
                      className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-violet-950 group-hover:text-violet-700 transition-colors">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {cat.description}
                      </p>
                      <ul className="space-y-2 mt-2 pt-3 border-t border-slate-50">
                        {cat.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs text-gray-700 font-bold leading-relaxed"
                          >
                            <Check className="h-3.5 w-3.5 text-pink-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TREATMENT JOURNEY SECTION ═══════ */}
      <section className="py-20 xl:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-pink-600 font-bold tracking-widest text-xs uppercase block">
              Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-violet-950 font-heading tracking-tight">
              Treatment <span className="text-pink-600">Journey</span>
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {careSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-3xl bg-violet-950 text-white p-6 shadow-lg hover:bg-violet-900 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-violet-800/50 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <p className="text-3xl font-black text-pink-300 mb-4 font-heading leading-none">
                    {item.step}
                  </p>
                  <h3 className="font-bold text-lg mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed text-violet-100">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-violet-800/40 flex justify-end">
                  <ArrowRight className="w-4 h-4 text-pink-300" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
