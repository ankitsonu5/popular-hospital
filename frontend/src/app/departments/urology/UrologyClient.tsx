"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const hospitalOptions = [
  "Open Surgery",
  "Endo-Urology: PCNI, URS, URSL, TURP, TUR-BT, RIRS",
  "Andrology",
  "Female Urology",
  "Pediatric Urology",
  "Uro-Oncology",
  "Urology Laparoscopy",
];

const procedures = [
  "Uroflowmetry and Urodynamic - to help in an accurate diagnosis of diseases of the Lower Urinary Track",
  "Flexible Cystoscopy for Diagnostic OPD Cystourethroscopy",
  "Flexible UreterRenoscopy and Laser Lithotripsy/RIRS for treating Kidney Stones without any holes/cuts",
  "Laparoscopic treatment for diseases of the Kidney, Ureter and Bladder including Laparoscopic Uro Oncology and Laparoscopic Reconstructive Urology",
  "Reconstructive Surgeries for complex diseases of the Kidney, Ureter, Bladder and Urethra including Laparoscopic Pyeloplasty, Augmentation Cystoplasty etc.",
  "Female Urology including VVF Repair, TOT/TVT for Stress Urinary Incontinence, recurrent UTI, Urethral Stenosis etc.",
  "Andrology & Male Infertility including Penile Prosthesis, Artificial Urinary Sphincter, Testicular Prosthesis, VVA and VEA etc.",
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function UrologyClient({
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
            src="/images/banners/urology.png"
            alt="Urology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Department of Urology
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Urology <br />
              <span className="text-blue-300">Excellence</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Urology"
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
                  Department of <span className="text-[#1e3a8a]">Urology</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              {/* What is Urology */}
              <div>
                <h3 className="text-xl font-bold text-[#0b1c43] mb-3 font-heading uppercase tracking-tight">
                  What Is Urology?
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  Urology is a surgical speciality which deals with diseases of
                  the male and female urinary Tract and of the male reproductive
                  organs. The Department of Urology at Popular Hospital is at
                  the forefront of providing clinical services, innovative
                  treatment strategies. It deals with the disorder of Kidney,
                  Urine bladder, Prostate gland, Testis &amp; penis.
                </p>
              </div>

              {/* What Are Kidney Stones */}
              <div>
                <h3 className="text-xl font-bold text-[#0b1c43] mb-3 font-heading uppercase tracking-tight">
                  What Are Kidney Stones?
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-6">
                  Kidney stones are small, hard deposits that form inside your
                  kidneys. The stones are made of mineral and acid salts. Kidney
                  stones have many causes and can affect any part of your
                  urinary tract — from your kidneys to your bladder. Often,
                  stones form when the urine becomes concentrated, allowing
                  minerals to crystallize and stick together.
                </p>

                <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/30 rounded-r-xl">
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium italic">
                    <strong className="text-[#0b1c43] font-bold not-italic">
                      Percutaneous nephrolithotomy:
                    </strong>{" "}
                    Percutaneous nephrolithotomy (PCNL) is a minimally-invasive
                    procedure which is done to remove stones from the kidney by
                    a small puncture wound up to about 1 cm through the skin. It
                    is most suitable to remove the stones which are more than 2
                    cm in size and which are present near the pelvic region.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Urology"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOSPITAL OPTIONS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Surgical Specialties
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Options at{" "}
                  <span className="text-[#1e3a8a]">Popular Hospital</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4 mt-6">
                {hospitalOptions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/urology.webp"
                  alt="Urological Care Illustration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/urology_two.webp"
                  alt="Urology Diagnostics"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Diagnostic &amp; Procedural Care
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Our <span className="text-[#1e3a8a]">Procedures</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4 mt-6">
                {procedures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
