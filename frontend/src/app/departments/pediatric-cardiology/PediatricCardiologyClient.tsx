"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, AlertCircle, Heart } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const trustFactors = [
  "First full-time Pediatric Cardiologist and Intensivist in Purvanchal",
  "Extensive experience in congenital and acquired heart diseases",
  "Gentle, child-friendly approach with easy accessibility",
  "Expertise in advanced pediatric cardiac diagnostics",
  "Trusted by pediatricians and families across Eastern UP",
  "Successfully running the first of its kind pediatric cardiac intensive care unit in Purvanchal and adjoining areas.",
  "Bringing advanced care in Varanasi, which was available in Tier 1 or metro cities",
];

const chdConditions = [
  "Acyanotic heart disease (ASD, VSD, PDA, etc.)",
  "Cyanotic heart disease (TOF, TGA, DORV, etc.)",
];

const acquiredConditions = [
  "Kawasaki disease",
  "Myocarditis",
  "RHD",
  "Infective Endocarditis",
];

const symptoms = [
  "Easy Fatiguability, Edema over limbs",
  "Chest pain, breathlessness, and poor growth",
  "Frequent chest infections",
  "Excessive sweating specially during feeding",
  "Bluish discolouration of lips and extremities",
  "Syncope / Fainting spells",
  "Palpitation (Excessive awareness of heart beats)",
];

const services = [
  "Neonatal and Pediatric Echocardiography (ECHO)",
  "Neonatal and Pediatric ECG",
  "Non-invasive cardiac evaluations",
  "Dedicated Pediatric Cardiac Intensive Care Unit",
  "Pre and post-surgical cardiac assessment",
  "Long-term follow-up and cardiac care",
  "Parental counselling and guidance",
];

const whyChooseUs = [
  "Experienced Pediatric Cardiologist and Intensivist - Dr Rajesh Kumar Singh",
  "Dedicated Pediatric Cardiac Care Unit with facilities for Intensive care (One of its kind in the whole of Purvanchal and adjoining areas)",
  "Advanced diagnostic facilities",
  "Child-friendly environment",
  "Ethical, transparent & patient-focused care",
  "Trusted hospital in Varanasi",
];

interface DoctorCard {
  name: string;
  qualifications: string;
  designation?: string;
  slug: string;
  image: string;
}

/* ─── Page ─── */

export default function PediatricCardiologyClient({
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
            src="/images/banners/cardiology_banner.png"
            alt="Pediatric Cardiology Banner"
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
              Pediatric <br />
              <span className="text-blue-300">Cardiology</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Pediatric Cardiology"
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
                  Popular Hospital's{" "}
                  <span className="text-[#1e3a8a]">
                    Pediatric Cardiologist & Intensivist
                  </span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  At Popular Hospital, Varanasi, our Pediatric Cardiology
                  Department is dedicated to providing advanced, compassionate,
                  and child-friendly care to Fragile hearts of
                  Neonatal/pediatric patients.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  The department is led by Dr Rajesh Kumar Singh, the first
                  full-time pediatric cardiologist and Intensivist in
                  Purvanchal, bringing specialised cardiac care closer to
                  families in Eastern Uttar Pradesh and nearby regions.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  With a focus on early diagnosis, accurate treatment, and
                  long-term follow-up, we ensure that infants, children, and
                  adolescents receive world-class cardiac care under one roof.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  Dr Rajesh Kumar Singh is a highly respected name in pediatric
                  cardiology and is known for pioneering specialised heart care
                  for children in Purvanchal. His vast experience, combined with
                  a child-centric approach, ensures accurate diagnosis and
                  effective treatment even in complex heart conditions.
                </p>
              </div>
            </div>

            {/* Right Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Pediatric Cardiology"
                  preventBackendFetch
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TRUST FACTORS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Pioneering Care
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Why parents trust{" "}
                  <span className="text-[#1e3a8a]">Popular Hospital</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mt-6 mb-3 block">
                Pediatric Cardiologist and Intensivist
              </span>

              <div className="space-y-4">
                {trustFactors.map((item, idx) => (
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
                  src="/images/departments-images/cardiology.jpeg"
                  alt="Pediatric Cardiology Diagnostic Care"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HEART CONDITIONS SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Clinical Specialities
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Pediatric Heart Conditions{" "}
                <span className="text-[#1e3a8a]">We Treat</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

            <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-6">
              Our department specialises in diagnosing and managing a wide range
              of heart conditions in children, including:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Congenital Heart Diseases */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100 shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0b1c43] text-lg leading-snug">
                  Congenital Heart Diseases (CHD)
                </h4>
              </div>
              <div className="space-y-4 mt-auto">
                {chdConditions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquired Heart Diseases */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm flex flex-col hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shrink-0">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
                <h4 className="font-bold text-[#0b1c43] text-lg leading-snug">
                  Acquired Heart Diseases
                </h4>
              </div>
              <div className="space-y-3 mt-auto">
                {acquiredConditions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Rhythm & Pressure Disorders */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0b1c43] text-base mb-1">
                      Cardiac Rhythm Disorder
                    </h5>
                    <p className="text-gray-700 text-sm font-medium">
                      Tachycardia, Bradycardia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0b1c43] text-base mb-1">
                      Heart Failure
                    </h5>
                    <p className="text-gray-700 text-sm font-medium">
                      In infants and children
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0b1c43] text-base mb-1">
                      Cardiomyopathy & Blood Pressure
                    </h5>
                    <p className="text-gray-700 text-sm font-medium">
                      Abnormal blood pressure (High/Low BP)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SYMPTOMS/WHEN TO MEET SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-12 lg:mb-0 relative">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-50 transition-colors duration-500 group">
                <Image
                  src="/images/departments-images/cardiac_treatment.jpeg"
                  alt="When to meet a pediatric cardiologist"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div>
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Critical Indicators
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  When should you meet a{" "}
                  <span className="text-[#1e3a8a]">
                    pediatric cardiologist?
                  </span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <p className="text-gray-800 text-lg font-bold mt-6 mb-4">
                If your child is suffering from:
              </p>

              <div className="space-y-4">
                {symptoms.map((item, idx) => (
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

      {/* ═══════ SERVICES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Advanced Solutions
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Pediatric Cardiac Services{" "}
                <span className="text-[#1e3a8a]">at Popular Hospital</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

            <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mt-6">
              We provide comprehensive pediatric cardiology services using
              modern technology and evidence based treatment protocols:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-bold">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
              Our Value Proposition
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                Why Choose{" "}
                <span className="text-[#1e3a8a]">Popular Hospital?</span>
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center mt-0.5 border border-blue-200">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-[14px] font-bold">
                  {item}
                </p>
              </div>
            ))}
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
                In Support of Families
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-[16px] font-medium italic">
                We understand that a child’s heart condition can be emotionally
                challenging for families. Our expert team ensures clarity,
                compassion, and continuous support at every step of the
                treatment journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
