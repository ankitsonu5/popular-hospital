"use client";

import Image from "next/image";
import Link from "next/link";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

const doctors: never[] = [];

const highlights = [
  {
    title: "Fertility Evaluation",
    desc: "Complete assessment for both partners including history, hormone profile, ultrasound and semen analysis.",
  },
  {
    title: "Ovulation Support",
    desc: "Cycle tracking, ovulation induction and timed treatment planning for couples trying to conceive.",
  },
  {
    title: "IUI & IVF Guidance",
    desc: "Personalized counselling and treatment planning for assisted reproductive options as clinically needed.",
  },
  {
    title: "Pregnancy Support",
    desc: "Early pregnancy monitoring, high-risk screening and coordinated care with obstetrics specialists.",
  },
];

const services = [
  "Female and male infertility evaluation",
  "Hormonal assessment and ovarian reserve testing",
  "Follicular monitoring and ovulation induction",
  "Semen analysis and male fertility counselling",
  "IUI treatment counselling and preparation",
  "IVF / ICSI counselling and cycle coordination",
  "PCOS-related fertility management",
  "Recurrent pregnancy loss evaluation",
  "Fertility preservation counselling",
  "Preconception health optimisation",
  "Early pregnancy monitoring",
  "Lifestyle and nutrition guidance for fertility",
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
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#7c1745] font-heading leading-tight">
      {title} <span className="text-[#E85222]">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-[#E85222]" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 text-sm sm:text-base xl:text-[15px] 2xl:text-lg font-medium leading-relaxed">
    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[#E85222]">
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
    <span>{text}</span>
  </li>
);

export default function IvfFertilityClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#7c1745] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/laboratory_medicine.png"
            alt="IVF and Fertility Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c1745] via-[#7c1745]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-rose-100 text-sm font-semibold mb-6 border border-white/20 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              IVF & <br />
              <span className="text-rose-200">Fertility</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
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

      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <SectionHeader title="Compassionate" highlight="Fertility Care" />
              <div className="space-y-5 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed font-medium text-justify">
                <p>
                  The IVF & Fertility department at Popular Hospital is designed
                  to support couples with clear evaluation, evidence-based
                  treatment planning and compassionate reproductive care. Our
                  approach focuses on understanding the cause of infertility and
                  choosing the right step at the right time.
                </p>
                <div className="bg-rose-50 p-6 rounded-xl border-l-4 border-[#E85222]">
                  <p>
                    From ovulation issues, PCOS and recurrent pregnancy loss to
                    male-factor infertility and assisted reproduction counselling,
                    patients receive private, structured and coordinated care.
                  </p>
                </div>
                <p>
                  Every fertility journey is personal. Our team emphasizes
                  counselling, transparent communication and regular monitoring so
                  couples feel supported throughout evaluation and treatment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="IVF & Fertility" />
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-[#E85222]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.3 12.3l7.4 7.4 8-16" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#7c1745] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-10 2xl:py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative w-full min-h-[320px] sm:min-h-[420px] rounded-[2rem] overflow-hidden shadow-xl">
                <Image
                  src="/images/departments-images/obstetrics_care.jpg"
                  alt="IVF and fertility care"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7c1745]/50 to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeader title="Our Fertility" highlight="Services" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {services.map((item) => (
                  <CheckItem key={item} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <SectionHeader title="Treatment" highlight="Journey" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {careSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-xl bg-[#7c1745] text-white p-6 shadow-md"
              >
                <p className="text-3xl font-black text-rose-200 mb-5">
                  {item.step}
                </p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-rose-50">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
