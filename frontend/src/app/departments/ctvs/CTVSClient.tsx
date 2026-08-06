"use client";

import Image from "next/image";
import Link from "next/link";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const procedureList = [
  "Coronary Artery Bypass Graft (CABG)",
  "Hypertrophic Cardiomyopathy surgery",
  "Pacemaker Implantation",
  "Beating Heart Bypass Surgery",
  "Minimally Invasive Bypass Surgery / Key Hole Bypass Surgery",
  "Valve Replacement, Single or Double",
  "Combined CABG and Valve Replacements",
  "Repair of Congenital Heart Defects",
  "Conventional Bypass Heart Surgery On Pump",
  "Pericardiectomy",
  "Peripheral Vascular Surgery",
  "Surgery of Aortic Aneurysm and Dissection",
  "Heart Transplant",
  "LVAD Implantation",
];

const technologyList = [
  "Cath Lab",
  "Rotablator",
  "Intravascular Ultrasound Imaging (IVUS)",
  "Fractional Flow Reserve (FFR) measurement Echocardiography (ECG)",
  "Treadmill Machine (TMT) Holter Machines",
];

const services = [
  {
    title: "Diagnosis and Evaluation:",
    content:
      "Our experienced team utilizes state-of-the-art diagnostic tools and techniques to accurately assess and diagnose various cardiovascular and thoracic conditions. We employ advanced imaging technologies, such as CT scans, MRIs, and echocardiography, to obtain detailed information about the patient's condition, enabling us to make informed decisions about the most appropriate treatment strategies.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Surgical Procedures:",
    content:
      "Our CTVS Department offers a wide range of surgical procedures to address cardiovascular and thoracic disorders. Our skilled surgeons are trained in advanced techniques and utilize the latest surgical technologies to perform procedures such as coronary artery bypass grafting (CABG), heart valve repair/replacement, lung cancer resection, vascular reconstructions, and more. We prioritize minimally invasive approaches whenever possible to minimize discomfort, speed up recovery, and optimize patient outcomes.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  {
    title: "Multidisciplinary Care:",
    content:
      "Collaboration is a cornerstone of our CTVS Department. Our surgeons work closely with a multidisciplinary team of specialists, including cardiologists, anesthesiologists, intensivists, and other healthcare professionals. This collaborative approach ensures that patients receive comprehensive, well-rounded care throughout their treatment journey.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Postoperative Care and Rehabilitation:",
    content:
      "Our commitment to our patients extends beyond the operating room. We provide attentive postoperative care and support to ensure a smooth recovery. Our dedicated nursing staff and rehabilitation specialists work closely with patients to facilitate their healing process and optimize their long-term outcomes.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Patient Education and Support:",
    content:
      "We believe that informed patients are empowered patients. That's why we prioritize patient education and provide resources to help individuals understand their conditions, treatment options, and the recovery process. Our team is always available to answer questions and address concerns, ensuring that patients and their families feel supported and well-informed at every step.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

const whyChooseUs = [
  "Highly skilled surgeons with expertise in complex cardiovascular and thoracic procedures.",
  "Access to cutting-edge diagnostic and surgical technologies.",
  "Personalized and patient-centered approach to care.",
  "Collaborative and multidisciplinary team for comprehensive treatment.",
  "Emphasis on minimally invasive techniques to optimize patient outcomes.",
  "Comprehensive postoperative care and rehabilitation services.",
  "Commitment to patient education and support.",
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function CTVSClient({ doctors }: { doctors: DoctorCard[] }) {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/cardiothoracic_banner.png"
            alt="Heart and Vascular Care"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-rose-500/20 text-rose-100 text-xs md:text-sm font-bold mb-6 border border-rose-400/30 backdrop-blur-sm uppercase tracking-wider">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-[1.1] font-heading">
              Department of CTVS Department — Varanasi
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center justify-center gap-2 text-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book An Appointment
              </Link>
              <GetCallBackButton
                department="Cardiothoracic & Vascular Surgery (CTVS)"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Department Intro */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Department of{" "}
                    <span className="text-[#1e3a8a]">
                      Cardiothoracic & Vascular Surgery (CTVS)
                    </span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-[17px] 2xl:text-lg font-medium text-left">
                <p className="font-semibold text-[#0b1c43] bg-blue-50 p-4 md:p-5 rounded-xl border border-blue-100/60 mb-6 text-left shadow-sm">
                  Popular Hospital is widely recognized as the <strong>best CTVS Department hospital in Varanasi</strong>. We are committed to delivering world-class healthcare and advanced medical facilities to patients across <strong>Purvanchal</strong> and <strong>Uttar Pradesh</strong>.
                </p>
                  <p>
                    Welcome to the Cardiothoracic and Vascular Surgery (CTVS)
                    Department at Popular Hospital. We are proud to offer
                    exceptional care in the field of cardiovascular and thoracic
                    surgery. Our department comprises a team of highly skilled
                    surgeons, dedicated nurses, and specialized support staff
                    who work together to provide comprehensive and cutting-edge
                    treatment options for patients with heart, lung, chest, and
                    vascular conditions.
                  </p>
                  <p>
                    Cardiothoracic and Vascular Surgery (CTVS) is a specialized
                    branch of surgery that focuses on the surgical treatment of
                    diseases and conditions affecting the heart, lungs, chest,
                    and blood vessels. It encompasses a wide range of procedures
                    designed to address cardiovascular and thoracic disorders,
                    including coronary artery bypass grafting, heart valve
                    repair/replacement, lung cancer resection, and vascular
                    reconstructions, among others.
                  </p>
                  <p>
                    At Popular Hospital, we understand that cardiovascular and
                    thoracic disorders can have a significant impact on the
                    lives of our patients. That&apos;s why our CTVS Department
                    is committed to delivering the highest quality of care with
                    a patient-centered approach. We strive to provide
                    personalized treatment plans that are tailored to each
                    individual&apos;s unique needs, ensuring the best possible
                    outcomes.
                  </p>
                </div>
              </div>

              {/* Technology */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                    Advanced Diagnostics & Technology —{" "}
                    <span className="text-[#1e3a8a]">
                      Our Tools for Treatment
                    </span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
                <ul className="space-y-3">
                  {technologyList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 text-[15px] font-medium"
                    >
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar - Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="CTVS"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              Procedures
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {procedureList.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-700 text-[15px] font-medium p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════ OUR SERVICES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              Our <span className="text-[#1e3a8a]">Services:</span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />

          <div className="space-y-6 mb-10">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1e3a8a] text-white flex items-center justify-center mt-0.5">
                  {service.icon}
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  <span className="font-bold text-[#0b1c43]">
                    {service.title}
                  </span>{" "}
                  {service.content}
                </p>
              </div>
            ))}
          </div>

          {/* Centered smaller image */}
          <div className="relative mx-auto max-w-2xl aspect-[16/10] rounded-3xl overflow-hidden border border-slate-100 shadow-md">
            <Image
              src="/images/departments-images/cardiothoracic_vascular_surgery.jpeg"
              alt="CTVS Procedures"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              Why <span className="text-[#1e3a8a]">Choose us:</span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whyChooseUs.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-700 text-[15px] font-medium"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] inline-block" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════ CTVS SURGEONS ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              CTVS{" "}
              <span className="text-[#1e3a8a]">
                Surgeons at Popular Hospital
              </span>
            </h2>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/departments-images/ctvs_technology.jpeg"
                  alt="CTVS Technology"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/30 to-transparent" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                CTVS surgeons are highly trained specialists who possess
                extensive knowledge of cardiovascular and thoracic anatomy and
                are skilled in performing complex surgical procedures. They work
                closely with a multidisciplinary team, including cardiologists,
                anesthesiologists, intensivists, and other healthcare
                professionals, to provide comprehensive care to patients with
                cardiovascular and thoracic conditions.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                We are dedicated to providing compassionate and exceptional care
                to our patients, and we strive to be at the forefront of
                advancements in cardiovascular and thoracic surgery. If you or a
                loved one is in need of specialized care for a heart, lung,
                chest, or vascular condition, we invite you to contact our
                Cardiothoracic and Vascular Surgery Department at Popular
                Hospital. Our team is ready to guide you through your treatment
                journey and help you achieve the best possible outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
