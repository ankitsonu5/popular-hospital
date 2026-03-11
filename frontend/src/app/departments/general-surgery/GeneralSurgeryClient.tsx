'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (exact from original page) ─── */

const features = [
  { title: 'Keyhole Surgery', icon: 'scope', desc: 'Advanced laparoscopic procedures.' },
  { title: 'Trauma Care', icon: 'plus', desc: '24/7 emergency surgical support.' },
  { title: 'Hernia Center', icon: 'shield', desc: 'Expert mesh & non-mesh repair.' },
  { title: 'Laser Proctology', icon: 'laser', desc: 'Painless treatment for piles & fissures.' },
];

const uspList = [
  'Abdominal surgeries such as gallbladder excision, advanced laparoscopy appendectomy, intestinal surgery (colon/laparoscopic surgery), obstruction & perforation',
  'All kinds of hernias - Treated by both open and laparoscopic surgery, depending on the patient\'s condition. Anorectal diseases - Such as abscesses, fistula, tissue anomalies, prolapse, hydrocele',
  'LASER Surgery for Fistula, Fissure Piles & Pilonidalsinus',
  'Trauma Surgery and care',
  'Stapled Haemorrhoidectomy for piles & prolapse with many benefits to the patient such as minimal blood loss, less pain and early recovery',
  'Tumours Diagnostics and treatment of soft tissues, treatment for cysts and tumours of the salivary glands, thyroid, parathyroid, adrenal, breast, lipoma and tumours of the abdomen',
  'Breast lump and abscess',
  'Benign breast diseases',
  'Diseases of the veins such as varicose veins',
];

const procedures = [
  'Gallstone Disease – Laparoscopic Cholecystectomy',
  'Hernia Laparoscopic/Open Hernia Repair with Mesh',
  'Appendicitis - Laparoscopic Appendectomy',
  'Reflux Disease, Reflux Gastritis, Hiatus Hernia – Laparoscopic Repair',
  'Diagnostic Laparoscopy',
  'Thyroid and Parathyroid Tumour – Thyroidectomy/Parathyroidectomy',
  'Fissure or Anal Pain',
  'Piles Minimally Invasive Surgery/Stapler Surgery for Piles',
  'Rectal Prolapse – Laparoscopic Rectopexy',
  'Liver Abscess',
  'Trauma/Accidental Injury',
  'Acute Intestinal Perforation/Rupture',
  'Acute Intestinal Obstruction',
  'Torsion Testis',
  'Varicocele Surgery (Laparoscopic/Open)',
  'Vasectomy',
];

const doctors = [
  {
    name: 'Dr. Abhishek Kumar',
    qualifications: 'M.B.B.S., MS - General Surgery, FIAGFS',
    designation: 'Consultant',
    slug: 'dr-abhishek-kumar',
    image: '/images/departments_doctor/dr-abhishek-kumar.png',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-blue-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'scope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />}
    {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'laser' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
  </svg>
);

/* ─── Page ─── */

export default function GeneralSurgeryClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[600px] w-full bg-[#0b1c43] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000"
            alt="General Surgery Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of General Surgery
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Advanced Laparoscopy &amp;<br />
              Minimal Access Surgery
            </h1>
            <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium text-justify">
              Pioneering minimally invasive surgical techniques for faster recovery, less pain, and minimal scarring. From routine procedures to complex abdominal surgeries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE CARDS (4-col) ═══════ */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-blue-600 hover:border-[#0b1c43] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b1c43] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of General &amp;" highlight="Laproscopic Surgery" />
              <div className="space-y-4 text-gray-800 text-base md:text-lg font-medium leading-relaxed mb-10 text-justify">
                <p>
                  The Department of General and Laparoscopic Surgery at Popular Hospital is manned 24x7 by an experienced and dedicated team of consultants that aim to provide modern surgical treatment and advice to the patients. The department is committed to the principles and practices of &apos;Safe Surgery Saves Lives&apos; to provide ethical &amp; evidence-based surgical options to the patients.
                </p>
                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-600">
                  <p>
                    Laparoscopic Surgery is a technique wherein surgical procedures like removal of gallbladder can be successfully done with small keyhole incisions in place of opening up of the abdomen with large incision. Carbon dioxide gas is used to inflate the abdomen so as to open up space for putting in instruments and then performing required surgical procedures. Patients are mobilised the same evening and discharged the very next day. The benefits of Laparoscopic surgery are early return to work, less pain, faster recovery &amp; better cosmetics. With a dedicated and experienced team doing evidence-based surgical procedures, the outcomes are excellent. Safety in surgery to reduce or eliminate complications during treatment is the main motto of the consultants.
                  </p>
                </div>
              </div>

              {/* spacing only — USP moved below */}
            </div>

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative">
                    <div className="w-full relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {doctors.map((doc, idx) => (
                          <div key={idx} className="w-full flex-shrink-0 p-6 pt-12 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                              <Image
                                src={doc.image}
                                alt={doc.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <Link
                                href={`/doctors/${doc.slug}`}
                                className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                              >
                                <span className="px-4 py-2 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-colors">
                                  View More Info
                                </span>
                              </Link>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-[#3b82f6] mb-1">{doc.name}</h3>
                              <p className="text-gray-600 text-sm font-medium">{doc.qualifications}</p>
                              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{doc.designation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {doctors.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentSlide(p => (p === 0 ? doctors.length - 1 : p - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentSlide(p => (p === doctors.length - 1 ? 0 : p + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all hover:scale-110"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                    <div className="h-8" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ USP SECTION ═══════ */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: USP List */}
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">What We Offer</span>
              <SectionHeader title="Usp Of General &amp;" highlight="Laproscopic Surgery Department" />
              <ul className="mt-2">
                {uspList.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

            {/* Right: Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: '420px' }}>
              <Image
                src="/images/departments-images/laparoscopic.jpeg"
                alt="Laparoscopic Surgery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ PROCEDURES ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: '440px' }}>
              <Image
                src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&q=80&w=900"
                alt="Procedures"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 via-transparent to-transparent" />
            </div>

            {/* Right: List */}
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Conditions We Treat</span>
              <SectionHeader title="Our" highlight="Procedures" />
              <p className="text-gray-500 text-sm mb-6">
                Comprehensive surgical solutions for a wide range of abdominal and general surgical conditions.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                {procedures.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#0b1c43] rounded-2xl md:rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <span className="inline-block bg-blue-500/20 text-blue-200 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-400/20">
              Expert Surgical Care
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 font-heading">
              Expert Surgical Care, When You Need It
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10 font-medium leading-relaxed">
              Don&apos;t delay your treatment. Consult with our expert surgeons for the best outcome.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg"
              >
                Book Consultation
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-blue-900/30 px-8 py-4 rounded-full font-bold text-base transition-all"
              >
                Call +91-7800001895 / 96
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
