"use client";

import Image from "next/image";
import Link from "next/link";

const doctors = [
  {
    name: "Dr Greeshma Suresh",
    qualifications: "MBBS, MS, MCh (Pediatric Surgery) IMS, BHU",
    designation: "Consultant Pediatric Surgeon",
    slug: "dr-greeshma-suresh",
    image: "/images/departments_doctor/dr_greeshma.jpeg",
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
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

export default function PediatricSurgeryClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pediatric_surgery.png"
            alt="Pediatric Surgery"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Pediatric Surgery
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book An Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Intro + Doctor Cards Section ─── */}
      <section className="py-16 xl:py-10 2xl:py-20 text-justify">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Intro Left */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="Pediatric Surgery"
              />
              <div className="space-y-4 text-gray-700 text-base leading-relaxed xl:text-[15px] 2xl:text-lg text-justify">
                <p>
                  Pediatric Surgery is a specialization in medicine dealing with
                  surgery of infants, children, and adolescents. It covers a
                  large number of health issues that demand surgical operations
                  with treatments being suitably adjusted to the overall anatomy
                  and needs of the young patients. The Pediatric Surgery
                  Department at Popular Hospital is a unit that blends
                  technological superiority, an exceptional aptitude to perform
                  surgery, and a sensitive treatment to provide ample treatment
                  with effective and secure end-results, child-friendly.
                </p>
                <p>
                  The Pediatric surgical care involves several disciplines such
                  as Neuro, Cardiac, Urologic, Orthopedics, and General surgical
                  care. Our experts focus on lowering the level of discomfort,
                  minimising risk and accelerating patient recovery utilising
                  both low invasive and conventional surgical procedures.
                </p>
                <p>
                  A large number of procedures are being carried out on daycare
                  or short-stay basis providing children with quicker entry to
                  home and continuation with normal activities. Such a strategy
                  can alleviate stress on both the family and the child, and
                  high standard of surgical treatment is achieved.
                </p>
              </div>
            </div>

            {/* Right Doctor Card (Static - Only one doctor) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full pt-6">
                {/* Floating Appointment Button */}
                <div className="relative max-w-sm mx-auto">
                  <Link
                    href="/doctors"
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 relative group">
                    <div className="w-full p-6 pt-12 flex flex-col items-center">
                      <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                        {doctors[0].image ? (
                          <Image
                            src={doctors[0].image}
                            alt={doctors[0].name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                            <svg
                              className="w-24 h-24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                          </div>
                        )}
                        {/* Hover Overlay */}
                        <Link
                          href={`/doctors/${doctors[0].slug}`}
                          className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                        >
                          <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-all uppercase text-sm">
                            View Full Profile
                          </span>
                        </Link>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-[#3b82f6] mb-1 font-heading">
                          {doctors[0].name}
                        </h3>
                        <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4 text-center">
                          {doctors[0].qualifications}
                        </p>
                        <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-[0.2em] font-black">
                          DEPARTMENT OF PEDIATRIC SURGERY
                        </p>
                      </div>
                    </div>
                    <div className="h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Moved Sections Below ── */}
          <div className="mt-20 space-y-24">
            {/* Knowing Section */}
            <div className="max-w-4xl">
              <SectionHeader title="Knowing a" highlight="Pediatric Surgeon?" />
              <p className="text-gray-700 text-base 2xl:text-lg leading-relaxed text-justify font-medium">
                A pediatric surgeon is a uniquely qualified provider whose
                expertise consists of conducting surgeries that are specific to
                children. Those caregivers learn the physical or emotional
                requirements of small patients and collaborate with pediatric
                anesthesiologists, neurologists, cardiologists, orthopedic
                surgeons, and urologists to maintain the safest and efficacy
                procedures.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <SectionHeader
                  title="Pediatric Surgery at"
                  highlight="Popular Hospital"
                />
                <p className="text-gray-700 text-base 2xl:text-lg mb-4 leading-relaxed font-semibold">
                  At Popular Hospital, pediatric surgery offers several
                  benefits, including:
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Daycare / No admission",
                      desc: "Many procedures can be completed without hospital admission",
                    },
                    {
                      title: "Daycare / Minimal Admission",
                      desc: "Many surgeries allow for same-day discharge",
                    },
                    {
                      title: "Child-Friendly Environment",
                      desc: "Care is provided in a setting designed to make children feel safe and comfortable",
                    },
                    {
                      title: "Minimally Invasive Surgical Methods",
                      desc: "Since the surgical incisions are small, it reduces pain significantly during and after surgery. This also aids in faster healing",
                    },
                    {
                      title: "Specialized Pediatric Anesthesia",
                      desc: "Pediatric Anesthesia is administered carefully with respect to a child's age, size, and condition",
                    },
                    {
                      title: "Reduced Risk and Complications",
                      desc: "With advanced techniques available at Popular Hospital, the risks are greatly reduced and expert surgeons ensure safer outcomes",
                    },
                    {
                      title: "Cost-Effective Care",
                      desc: "Popular Hospital aims at offering top of the notch pediatric healthcare keeping all its services accessible without compromising quality",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">›</span>
                      <p className="text-gray-700 text-base 2xl:text-lg leading-relaxed text-justify font-medium">
                        <span className="font-bold text-blue-600 uppercase tracking-tight">
                          {item.title}:
                        </span>{" "}
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/departments-images/pediatric_surgery.png"
                  alt="Pediatric Surgery"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Specialized Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(0% 0, 90% 0%, 100% 100%, 10% 100%)",
                }}
              >
                <Image
                  src="/images/departments-images/pediatric_surgery.avif"
                  alt="Specialized Areas"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <SectionHeader
                  title="Specialized Areas of Pediatric Surgery at"
                  highlight="Popular Hospital"
                />
                <ul className="space-y-4">
                  {[
                    {
                      title: "Pediatric Neurological Surgery",
                      desc: "Procedures for congenital brain and spine conditions, hydrocephalus, and other neurological disorders.",
                    },
                    {
                      title: "Pediatric Urological Surgery",
                      desc: "Treatment for urinary tract anomalies, undescended testes, and other urological issues.",
                    },
                    {
                      title: "Pediatric General Surgery",
                      desc: "Management of abdominal conditions, hernias, tumours, and gastrointestinal issues.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">›</span>
                      <p className="text-gray-700 text-base 2xl:text-lg leading-relaxed text-justify font-medium">
                        <span className="font-bold text-blue-600">
                          {item.title}:
                        </span>{" "}
                        {item.desc}
                      </p>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 pt-6 border-t border-gray-100">
                    <span className="text-blue-600 font-bold mt-1">›</span>
                    <p className="text-gray-700 text-base 2xl:text-lg leading-relaxed text-justify font-medium">
                      <span className="font-bold text-[#0b1c43]">
                        Conclusion:
                      </span>{" "}
                      At Popular Hospital, we understand that surgery of a child
                      is not only a medical condition needing highest amount of
                      medical care but also an emotional one to the entire
                      family. Our Pediatric Surgery Department provides
                      high-quality medical treatment in various fields, and its
                      experienced staff treats each of the patients with care,
                      understanding, and respect. As these parameters are our
                      key offerings, our parents can be assured of the best
                      surgical care to their children.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
