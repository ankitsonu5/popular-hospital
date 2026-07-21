"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (exact from original page) ─── */

const burnsCauses = [
  "Hot liquids (scalds)",
  "Hot solids (contact burns)",
  "Flames (flame burns)",
];

const burnsClassifications = [
  "First-degree (superficial) burns: First-degree burns affect only the outer layer of skin, the epidermis",
  "Second-degree (partial thickness) burns",
  "Third-degree (full thickness) burns",
  "Fourth-degree burns: (Extend beneath the subcutaneous tissues)",
  'The size of a burn can be quickly estimated by using the "rule of nines."',
  "During a burn evaluation we examine the wound and figure out an estimated percentage of total body surface area (TBSA) that has been burned.",
  "We at Popular hospital treat burn case having 20% of total body surface area only",
];

const procedures = [
  "Aesthetic plastic surgery",
  "Reconstructive surgery",
  "Craniofacial surgery",
  "Reconstructive microsurgery",
  "Paediatric plastic surgery",
  "Laser surgery",
  "Hand surgery",
  "Lymphatic surgery (Filarial surgery)",
  "Body contouring surgery (LIPOSUCTION)",
  "Breast Reconstruction: Reduction & Augmentation",
  "Genital surgery: Hypospadias, Reconstruction",
  "Peripheral nerve surgery",
  "Burn reconstructive surgery",
  "Sex change surgery",
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function BurnsPlasticSurgeryClient({
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
            src="/images/banners/plastic_surgery.png"
            alt="Burns & Plastic Surgery Banner"
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
              Burns &amp; <br />
              <span className="text-blue-300">Plastic Surgery</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Burns & Plastic Surgery"
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
                  <span className="text-[#1e3a8a]">
                    Burns &amp; Plastic Surgery
                  </span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              {/* Burns */}
              <div>
                <h3 className="text-xl font-bold text-[#0b1c43] mb-3 font-heading uppercase tracking-tight">
                  Burns
                </h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  A burn is an injury to the skin or other organic tissue
                  primarily caused by heat ordue to radiation, radioactivity,
                  electricity, friction or contact with chemicals.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-4">
                  Thermal (heat) burns occur when some or all of the cells in
                  the skin or other tissues are destroyed by:
                </p>

                <div className="space-y-4 mt-6">
                  {burnsCauses.map((item, idx) => (
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

            {/* Right Doctor Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Burns & Plastic Surgery"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CLASSIFICATIONS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Clinical Metrics
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Classifications of{" "}
                  <span className="text-[#1e3a8a]">Burns</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4 mt-6">
                {burnsClassifications.map((item, idx) => (
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
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/AdobeStock_222372294.jpeg"
                  alt="Burns Classification Illustration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PLASTIC SURGERY SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/plastic_surgery.jpg"
                  alt="Plastic Surgery Art & Science"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Art of Restoration
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Plastic <span className="text-[#1e3a8a]">Surgery</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                <p>
                  Plastic surgery is a surgical speciality which involves
                  reconstruction, restoration, or alteration of the human body.
                  Plastic Surgery is the art of treating with aims to improve
                  the appearance of the human body or improve the functioning of
                  a part of the body.
                </p>

                <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/30 rounded-r-xl">
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium italic">
                    At Popular Hospital we have a team of highly qualified and
                    dedicated plastic surgeons to deliver the best care at an
                    affordable price with the proverbial best in latest
                    technology.
                  </p>
                </div>

                <p>
                  We work both independently and in Conjunction with many other
                  Surgical Services including: ENT, General Surgery, Surgical
                  Oncology, Orthopedics, Urology, Gynecology and Neurosurgery
                  for giving comprehensive care to all the patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Advanced Treatments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] font-heading">
              Our <span className="text-[#1e3a8a]">Procedures</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-[#1e3a8a]" />
              <div className="h-[2px] w-12 bg-blue-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    </main>
  );
}
