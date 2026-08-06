"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (exact from original page) ─── */

const benefits = [
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
];

const specializedAreas = [
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
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function PediatricSurgeryClient({
  doctors,
}: {
  doctors: DoctorCard[];
}) {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/pediatric_surgery.png"
            alt="Pediatric Surgery Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Department of
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Department of Pediatric Surgery — Varanasi
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Pediatric Surgery"
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
                  Department of{" "}
                  <span className="text-[#1e3a8a]">Pediatric Surgery</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4">
                <p className="font-semibold text-[#0b1c43] bg-blue-50 p-4 md:p-5 rounded-xl border border-blue-100/60 mb-6 text-left shadow-sm">
                  Popular Hospital is widely recognized as the <strong>best Pediatric Surgery hospital in Varanasi</strong>. We are committed to delivering world-class healthcare and advanced medical facilities to patients across <strong>Purvanchal</strong> and <strong>Uttar Pradesh</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
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
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  The Pediatric surgical care involves several disciplines such
                  as Neuro, Cardiac, Urologic, Orthopedics, and General surgical
                  care. Our experts focus on lowering the level of discomfort,
                  minimising risk and accelerating patient recovery utilising
                  both low invasive and conventional surgical procedures.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  A large number of procedures are being carried out on daycare
                  or short-stay basis providing children with quicker entry to
                  home and continuation with normal activities. Such a strategy
                  can alleviate stress on both the family and the child, and
                  high standard of surgical treatment is achieved.
                </p>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Pediatric Surgery"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ KNOWING SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Specialist Care
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Knowing a{" "}
                  <span className="text-[#1e3a8a]">Pediatric Surgeon</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-6">
                A pediatric surgeon is a uniquely qualified provider whose
                expertise consists of conducting surgeries that are specific to
                children. Those caregivers learn the physical or emotional
                requirements of small patients and collaborate with pediatric
                anesthesiologists, neurologists, cardiologists, orthopedic
                surgeons, and urologists to maintain the safest and efficacy
                procedures.
              </p>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/pediatric_surgery.avif"
                  alt="Knowing a Pediatric Surgeon Illustration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BENEFITS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Patient-Centric Benefits
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Pediatric Surgery at{" "}
                <span className="text-[#1e3a8a]">Popular Hospital</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

            <p className="text-gray-800 text-lg font-bold mt-6 leading-relaxed">
              At Popular Hospital, pediatric surgery offers several benefits,
              including:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((item, idx) => (
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

      {/* ═══════ SPECIALIZED AREAS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/pediatric_surgery.png"
                  alt="Specialized Areas of Pediatric Surgery"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Surgical Specializations
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Specialized <span className="text-[#1e3a8a]">Areas</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-6">
                {specializedAreas.map((item, idx) => (
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
          </div>
        </div>
      </section>

      {/* ═══════ CONCLUSION SECTION ═══════ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="bg-blue-50/30 p-8 md:p-12 rounded-[2.5rem] border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#0b1c43] mb-4 font-heading uppercase tracking-wider">
                In Conclusion
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-[16px] font-medium italic">
                At Popular Hospital, we understand that surgery of a child is
                not only a medical condition needing highest amount of medical
                care but also an emotional one to the entire family. Our
                Pediatric Surgery Department provides high-quality medical
                treatment in various fields, and its experienced staff treats
                each of the patients with care, understanding, and respect. As
                these parameters are our key offerings, our parents can be
                assured of the best surgical care to their children.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
