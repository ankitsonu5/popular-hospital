'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const featureCards = [
  { title: "Individual Therapy", icon: "user", desc: "Evidence-based CBT, DBT, and psychodynamic therapy." },
  { title: "Family Therapy", icon: "users", desc: "Addressing dynamics and communication for long-term recovery." },
  { title: "Expert Evaluation", icon: "brain", desc: "In-depth psychiatric assessments for accurate diagnoses." },
  { title: "Child Psychiatry", icon: "child", desc: "Specialized care for autism, ADHD, and conduct disorders." },
];

const psychiatryServices = [
  "Schizophrenia",
  "Bipolar disorder",
  "Depression",
  "Obsessive Compulsive Disorder",
  "Personality disorders",
  "Anxiety disorder",
  "Substance abuse disorder",
  "Sexual Disorders",
  "Behavioural Addiction",
  "Disorders in children and adolescents- autism, ADHD, conduct disorder, etc"
];

const doctors = [
  {
    name: 'Psychiatry Specialist',
    qualifications: 'MD (Psychiatry), DPM',
    designation: 'Senior Consultant',
    slug: 'psychiatry-specialist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#2e1065] font-heading leading-tight uppercase tracking-wide">
      {title} <span className="text-violet-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-violet-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-700 mb-3 group text-base md:text-lg font-medium">
    <span className="text-violet-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'user' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
    {icon === 'users' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
    {icon === 'brain' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
    {icon === 'child' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
  </svg>
);

/* ─── Page ─── */

export default function PsychiatryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[500px] md:h-[450px] w-full bg-gradient-to-br from-[#2e1065] to-[#4c1d95] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.15),transparent)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-violet-500/20 text-violet-200 text-xs md:text-sm font-bold mb-6 border border-violet-400/30 backdrop-blur-sm uppercase tracking-wider">
                Compassionate Mental Healthcare
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-heading">
                Psychiatry <br className="hidden md:block" />
              <span className="text-violet-300">Department</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-[#d1451a] text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-950/20 flex items-center justify-center gap-2 text-center"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT AREA ═══════ */}
      <section className="py-20 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Content */}
            <div className="lg:col-span-8">
              
              <div className="mb-12">
                <SectionHeader title="Welcome to the" highlight="Psychiatry Department" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-10 font-medium text-justify">
                    <p>
                        Welcome to the Psychiatry Department at Popular Hospital, Varanasi! Our expert team of psychiatrists and psychologists is devoted to providing comprehensive care for people of all ages. We focus on mental health and are here to assist you in achieving emotional well-being and living a fulfilling life.
                    </p>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Our" highlight="Services" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-8 font-medium text-justify">
                    <p>
                        <span className="font-bold text-[#2e1065]">Psychiatric Evaluation and Diagnosis:</span> Our psychiatrists perform in-depth evaluations to understand your mental health condition and provide accurate diagnoses. We focus on your unique experiences and concerns to create tailored treatment plans. We provide treatment of psychiatric illnesses like:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                        {psychiatryServices.map((item, idx) => (
                            <ListItem key={idx} text={item} />
                        ))}
                    </ul>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Individual" highlight="Therapy" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-6 font-medium text-justify">
                    <p>
                        We provide individual therapy using evidence-based approaches such as cognitive-behavioral therapy (CBT), dialectical behavior therapy (DBT), and psychodynamic therapy. We offer a supportive environment to explore emotions, develop coping strategies, and promote personal growth.
                    </p>
                </div>
              </div>

              <div className="mb-16">
                <SectionHeader title="Family" highlight="Therapy" />
                <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-10 font-medium text-justify">
                    <p>
                        We understand the role of family in the therapeutic process. Our family therapy sessions aim to address dynamics, communication issues, and relationship challenges that affect mental health, enhancing understanding and support for long-term recovery.
                    </p>
                </div>
              </div>

              <div className="bg-violet-50 p-8 rounded-2xl border border-violet-100 text-gray-800 text-base md:text-lg leading-relaxed font-bold text-justify">
                <p>
                    At Popular Hospital, our Psychiatry Department is devoted to offering personalized and empathetic care in a welcoming, non-judgmental setting. We strive to support each individual in their journey toward emotional well-being, ensuring they receive the help and hope they need to thrive.
                </p>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit py-10">
                <div className="relative pt-6 w-full max-w-sm mx-auto">
                    <Link
                        href="/doctors"
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                    >
                        SCHEDULE AN APPOINTMENT
                    </Link>

                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-0 relative group">
                        <div className="w-full relative overflow-hidden h-[480px]">
                            <div className="w-full h-full p-6 pt-12 flex flex-col items-center">
                                <div className="relative w-full h-[320px] rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                                    <Image
                                        src={doctors[0].image}
                                        alt={doctors[0].name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    />
                                    <Link
                                        href={`/doctors/${doctors[0].slug}`}
                                        className="absolute inset-0 bg-violet-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                                    >
                                        <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-violet-600 transition-all uppercase text-sm">
                                            View Full Profile
                                        </span>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-[#2e1065] mb-1 font-heading uppercase tracking-tight">{doctors[0].name}</h3>
                                    <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doctors[0].qualifications}</p>
                                    <p className="text-violet-600 text-xs mt-3 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 w-full max-w-sm mx-auto bg-violet-50/50 p-8 rounded-2xl border border-violet-100">
                    <h4 className="text-lg font-bold text-[#2e1065] mb-6 uppercase tracking-wider border-b border-violet-200 pb-2">Care Highlights</h4>
                    <ul className="space-y-4">
                        {[
                            "Empathetic & Caring Environment",
                            "Multidisciplinary Team Approach",
                            "Personalized Treatment Plans",
                            "Supportive & Non-Judgmental",
                            "Evidence-Based Therapies"
                        ].map((b, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                                <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-[#2e1065] overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Your Path to <br className="hidden md:block" /> Emotional Well-being
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/doctors"
                className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
              >
                Connect with Experts
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-transparent border-2 border-violet-400/50 text-violet-100 hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                 +91-7800001895 / 96
              </a>
            </div>
        </div>
      </section>

    </main>
  );
}


