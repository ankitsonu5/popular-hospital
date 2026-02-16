'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


/* ─── Data ─── */




const treatments = [
  'Trans Radial Angiography & Angioplasty (TRAP)',
  'MICS (Minimally Invasive Cardiac Surgery)',
  'Cardiology: Single Stent CABG',
  'Percutaneous Balloon Mitral Valvotomy (PBMV)',
  'Pacemaker Implantation (PPI)',
  'Automatic Implantable Cardioverter Defibrillator (AICD)',
  'Electro-physiological Study (EPS)',
  'Trans Esophageal Echocardiography (TEE)',
  'Cardiac Resynchronization Therapy (CRT)',
  'Aortic Repair',
];

const ailments = [
  {
    title: 'Coronary Artery Disease',
    items: ['Angina Pectoris', 'Heart Attack', 'Coronary Blockage', 'Chest Pain'],
    color: '#E85222',
  },
  {
    title: 'Heart Valve Disease',
    items: ['Mitral Valve Prolapse', 'Aortic Stenosis', 'Valve Regurgitation', 'Rheumatic Heart Disease'],
    color: '#0b1c43',
  },
  {
    title: 'Heart Rhythm Disorders',
    items: ['Atrial Fibrillation', 'Tachycardia', 'Bradycardia', 'Ventricular Fibrillation'],
    color: '#E85222',
  },
  {
    title: 'Heart Failure',
    items: ['Congestive Heart Failure', 'Cardiomyopathy', 'Left Ventricular Failure', 'Right Heart Failure'],
    color: '#0b1c43',
  },
];

const technologies = [
  {
    title: 'Artis Zeego Endovascular Surgery C-arm',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    desc: 'Advanced imaging for minimally invasive cardiac and vascular procedures.',
  },
  {
    title: '256 Slice CT Scanner',
    image: 'https://images.unsplash.com/photo-1516069677018-378515003435?q=80&w=800&auto=format&fit=crop',
    desc: 'Ultra-fast cardiac CT angiography with lowest radiation dose.',
  },
  {
    title: '3.0 Tesla MRI',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop',
    desc: 'High-resolution cardiac MRI for precise myocardial imaging.',
  },
];

const subSpecializations = [
  { name: 'Preventive Cardiology', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { name: 'Interventional Cardiology', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { name: 'Heart Transplant', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Paediatric Cardiology', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

/* ─── Page ─── */

export default function CardiologyPage() {
  const [showAllTreatments, setShowAllTreatments] = useState(false);
  const visibleTreatments = showAllTreatments ? treatments : treatments.slice(0, 6);

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════ HERO SECTION (matches Radiology / Pathology) ═══════ */}
      <section className="relative h-[600px] w-full bg-[#004d61] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2000&auto=format&fit=crop"
            alt="Cardiac Care"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B4A] via-[#003B4A]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-200 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm">
              Department of Cardiology
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              World-Class <br />
              Cardiac Care
            </h1>
            <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
              Comprehensive evaluation of heart conditions with India&apos;s premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book an Appointment
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

      {/* Floating Feature Cards */}
      <section className="relative z-20 -mt-16 pb-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Angioplasty & Stenting', desc: 'Minimally invasive procedures to open blocked arteries.' },
              { title: 'Bypass Surgery', desc: 'Advanced CABG surgery for complex coronary artery disease.' },
              { title: 'Electrophysiology', desc: 'Diagnosis and treatment of heart rhythm disorders.' },
              { title: 'Cardiac Rehab', desc: 'Comprehensive rehabilitation for full recovery.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                  <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                      idx === 0 ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" :
                      idx === 1 ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" :
                      idx === 2 ? "M13 10V3L4 14h7v7l9-11h-7z" :
                      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    } />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Stats Cards */}
      <section className="py-12 bg-gray-50/30">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Expert Cardiologists', desc: 'Team of 20+ senior specialists', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { title: 'Modern Cath Lab', desc: 'Latest Bi-plane Cath Lab facility', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
              { title: 'High Success Rate', desc: '98.5% success in cardiac procedures', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: '24/7 Emergency', desc: 'Round-the-clock cardiac emergency', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100/80 hover:border-teal-100 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ YOUR HEART IS UNDER EXPERT HANDS ═══════ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#e8f4f8] via-[#dceef5] to-[#cde6f0]">
        <div className="mx-auto w-full max-w-[1366px] px-4 py-16 md:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

            {/* Left Content */}
            <div className="w-full lg:w-1/2 relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold font-heading leading-tight mb-8">
                <span className="text-[#E85222]">Your Heart</span>
                <br />
                <span className="text-[#0b1c43]">is Under Expert Hands</span>
              </h2>

              <ul className="space-y-4 mb-10">
                {[
                  'Hypertension',
                  'Chest Pain',
                  'Heart Failure',
                  'Angiography',
                  'Angioplasty',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <span className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[#E85222] flex-shrink-0 group-hover:border-l-[#0b1c43] transition-colors" />
                    <span className="text-[#0b1c43] font-semibold text-lg md:text-xl">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 text-base mb-6">
                Consult our experienced
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-3 bg-[#E85222] hover:bg-[#d04a1d] text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#E85222]/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Cardiologist
              </Link>
            </div>

            {/* Right - Heart Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[350px] md:min-h-[450px]">
              {/* Decorative glow behind heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-[#E85222]/10 via-red-200/20 to-transparent blur-2xl" />
              </div>

              <div className="relative w-[300px] h-[340px] md:w-[400px] md:h-[440px] lg:w-[480px] lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2670&auto=format&fit=crop"
                  alt="Heart Care - Expert Cardiology"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute top-6 right-4 md:top-10 md:right-8 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[#0b1c43] font-bold text-sm">24/7 Available</span>
                </div>
              </div>

              {/* Stats badge */}
              <div className="absolute bottom-6 left-0 md:bottom-10 md:left-4 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
                <p className="text-[#E85222] font-bold text-2xl">10,000+</p>
                <p className="text-gray-500 text-xs font-medium">Successful Procedures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* ═══════ TREATMENTS SECTION ═══════ */}
      <section id="treatments" className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0b1c43] mb-4">Treatments</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From open-heart to micro-invasive cardiac care for leading heart health
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Treatment List */}
            <div className="w-full lg:w-1/2">
              <ul className="space-y-3">
                {visibleTreatments.map((treatment, i) => (
                  <li key={i} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-[#E85222]/30 hover:shadow-md transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-full bg-[#E85222]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E85222] transition-colors">
                      <svg className="w-4 h-4 text-[#E85222] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{treatment}</span>
                  </li>
                ))}
              </ul>
              {treatments.length > 6 && (
                <button
                  onClick={() => setShowAllTreatments(!showAllTreatments)}
                  className="mt-4 inline-flex items-center gap-2 text-[#E85222] font-semibold text-sm hover:gap-3 transition-all"
                >
                  {showAllTreatments ? 'Show Less' : 'Show All Treatments'}
                  <svg className={`w-4 h-4 transition-transform ${showAllTreatments ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Treatment Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
                  alt="Cardiac Treatment"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-medium opacity-90">
                    Using cutting-edge technology for precise cardiac interventions and minimally invasive procedures to ensure faster recovery and better outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ AILMENTS SECTION ═══════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0b1c43] mb-4">Ailments</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Team approach and compassionate care for various heart conditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ailments.map((ailment, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div
                  className="px-5 py-4"
                  style={{ backgroundColor: ailment.color }}
                >
                  <h3 className="text-white font-bold font-heading text-lg">{ailment.title}</h3>
                </div>
                {/* Items */}
                <div className="bg-white p-5">
                  <ul className="space-y-3">
                    {ailment.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: ailment.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TECHNOLOGY SECTION ═══════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0b1c43] mb-4">Technology</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Popular Hospital is equipped with sophisticated medical equipment including
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#0b1c43] font-heading mb-2 group-hover:text-[#E85222] transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SUB-SPECIALIZATION SECTION ═══════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0b1c43] mb-4">
              Know More About Our Sub-Specialization
            </h2>
            <div className="w-20 h-1 bg-[#E85222] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subSpecializations.map((spec, i) => (
              <div
                key={i}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E85222]/10 flex items-center justify-center group-hover:bg-[#E85222] transition-colors">
                  <svg className="w-7 h-7 text-[#E85222] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={spec.icon} />
                  </svg>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-[#0b1c43] font-heading">{spec.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="bg-[#EFF6FF] py-12">
        <div className="mx-auto w-full max-w-[1366px] px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to talk to us? Call our Cardiology helpline 24/7
          </p>
          <a
            href="tel:18001234567"
            className="text-2xl font-bold text-[#E85222] underline hover:no-underline transition-colors"
          >
            1800-123-4567
          </a>
        </div>
      </section>
    </main>
  );
}
