"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (exact from original page) ─── */

const uspList = [
  "Abdominal surgeries such as gallbladder excision, advanced laparoscopy appendectomy, intestinal surgery (colon/laparoscopic surgery), obstruction & perforation",
  "All kinds of hernias - Treated by both open and laparoscopic surgery, depending on the patient's condition. Anorectal diseases - Such as abscesses, fistula, tissue anomalies, prolapse, hydrocele",
  "LASER Surgery for Fistula, Fissure Piles & Pilonidalsinus",
  "Trauma Surgery and care",
  "Stapled Haemorrhoidectomy for piles & prolapse with many benefits to the patient such as minimal blood loss, less pain and early recovery",
  "Tumours Diagnostics and treatment of soft tissues, treatment for cysts and tumours of the salivary glands, thyroid, parathyroid, adrenal, breast, lipoma and tumours of the abdomen",
  "Breast lump and abscess",
  "Benign breast diseases",
  "Diseases of the veins such as varicose veins",
];

const procedures = [
  "Gallstone Disease – Laparoscopic Cholecystectomy",
  "Hernia Laparoscopic/Open Hernia Repair with Mesh",
  "Appendicitis - Laparoscopic Appendectomy",
  "Reflux Disease, Reflux Gastritis, Hiatus Hernia – Laparoscopic Repair",
  "Diagnostic Laparoscopy",
  "Thyroid and Parathyroid Tumour – Thyroidectomy/Parathyroidectomy",
  "Fissure or Anal Pain",
  "Piles Minimally Invasive Surgery/Stapler Surgery for Piles",
  "Rectal Prolapse – Laparoscopic Rectopexy",
  "Liver Abscess",
  "Trauma/Accidental Injury",
  "Acute Intestinal Perforation/Rupture",
  "Acute Intestinal Obstruction",
  "Torsion Testis",
  "Varicocele Surgery (Laparoscopic/Open)",
  "Vasectomy",
];

const doctors = [
  {
    name: "Dr. A.K Kaushik",
    qualifications: "MBBS, MS (General Surgery) IMS, BHU",
    designation: "Head, Department of General Surgery",
    slug: "dr-a-k-kaushik",
    image: "/images/departments_doctor/dr_ak_kaushik.jpg",
  },
  {
    name: "Dr. Abhishek Kumar",
    qualifications: "M.B.B.S, M.S. - General Surgery, FIAGES",
    designation: "Consultant Surgeon",
    slug: "dr-abhishek-kumar",
    image: "/images/departments_doctor/dr_abhishek_kumar.jpg",
  },
];

/* ─── Page ─── */

export default function GeneralSurgeryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/genral_surgery.png"
            alt="General Surgery Banner"
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
              Laparoscopy &amp; <br />
              <span className="text-blue-300">General Surgery</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="General Surgery"
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
                  Department of General &amp;{" "}
                  <span className="text-[#1e3a8a]">Laparoscopic Surgery</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />

              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  The Department of General and Laparoscopic Surgery at Popular Hospital is manned 24x7 by an experienced
                  and dedicated team of consultants that aim to provide modern surgical treatment and advice to the patients.
                  The department is committed to the principles and practices of &apos;Safe Surgery Saves Lives&apos; to
                  provide ethical &amp; evidence-based surgical options to the patients.
                </p>

                <div className="border-l-4 border-blue-600 pl-5 py-3 bg-blue-50/30 rounded-r-2xl">
                  <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                    Laparoscopic Surgery is a technique wherein surgical procedures like removal of gallbladder can be
                    successfully done with small keyhole incisions in place of opening up of the abdomen with large
                    incision. Carbon dioxide gas is used to inflate the abdomen so as to open up space for putting in
                    instruments and then performing required surgical procedures. Patients are mobilised the same evening
                    and discharged the very next day. The benefits of Laparoscopic surgery are early return to work, less
                    pain, faster recovery &amp; better cosmetics. With a dedicated and experienced team doing
                    evidence-based surgical procedures, the outcomes are excellent. Safety in surgery to reduce or
                    eliminate complications during treatment is the main motto of the consultants.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Doctor Slider */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Laparoscopy & General Surgery"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ USP SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-stretch">

            {/* Left — Tall Image */}
            <div className="lg:col-span-2 relative w-full max-w-[340px] h-[340px] md:h-[400px] lg:h-[450px] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group lg:self-center">
              <Image
                src="/images/departments-images/laparoscopic.jpeg"
                alt="Laparoscopic Surgery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0b1c43] text-xs font-bold px-4 py-2 rounded-full shadow">
                  Advanced Laparoscopic Care
                </span>
              </div>
            </div>

            {/* Right — Numbered USP List */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Why Us
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  USP of General &amp;{" "}
                  <span className="text-[#1e3a8a]">Laparoscopic Surgery Dept.</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-8" />

              <div className="space-y-5">
                {uspList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm shadow-blue-200">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES SECTION ═══════ */}
      <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-stretch">

            {/* Left — Procedures List */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase mb-3 block">
                Diagnostic &amp; Procedural Care
              </span>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
                  Our <span className="text-[#1e3a8a]">Procedures</span>
                </h2>
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-4" />
              <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium mb-8">
                Comprehensive surgical solutions for a wide range of abdominal and general surgical conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {procedures.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 border-l-4 border-blue-100 hover:border-blue-500 pl-4 py-1.5 transition-colors duration-200"
                  >
                    <p className="text-gray-700 leading-relaxed text-sm md:text-[14px] font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Tall Image */}
            <div className="lg:col-span-2 relative w-full max-w-[340px] h-[340px] md:h-[400px] lg:h-[450px] mx-auto lg:ml-auto lg:mr-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 group order-first lg:order-last lg:self-center">
              <Image
                src="/images/departments-images/general_surgery.png"
                alt="General Surgery Procedures"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-[#0b1c43] text-xs font-bold px-4 py-2 rounded-full shadow">
                  Expert Surgical Outcomes
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
