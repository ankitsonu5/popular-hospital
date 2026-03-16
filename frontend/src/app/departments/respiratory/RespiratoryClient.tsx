'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  { title: "Sleep Lab", icon: "activity", desc: "Advanced sleep apnea diagnosis and studies." },
  { title: "Bronchoscopy", icon: "scope", desc: "Detailed airway visualization and tissue sampling." },
  { title: "ICU Support", icon: "shield", desc: "Specialized respiratory critical care services." },
  { title: "Pulmonary Testing", icon: "plus", desc: "Comprehensive evaluation of lung function and capacity." },
];

const services = [
  {
    title: "Diagnosis and Treatment:",
    content: "Our respiratory experts are skilled in diagnosing and managing various respiratory conditions, including asthma, chronic obstructive pulmonary disease (COPD), pneumonia, bronchitis, and more. Through a combination of thorough examinations, diagnostic tests, and personalized treatment plans, we strive to provide you with the most effective and tailored care."
  },
  {
    title: "Pulmonary Function Testing:",
    content: "We offer a comprehensive range of pulmonary function tests to evaluate lung function, measure lung capacity, and assess the efficiency of oxygen exchange. These tests help in diagnosing respiratory conditions, monitoring disease progression, and evaluating the effectiveness of treatment interventions."
  },
  {
    title: "Bronchoscopy:",
    content: "Our department is equipped with advanced bronchoscopy technology, allowing us to visualize the airways and obtain tissue samples for further analysis. Bronchoscopy is a valuable tool for diagnosing lung diseases, detecting abnormalities, and guiding treatment decisions."
  },
  {
    title: "Sleep Disorder Evaluation:",
    content: "Sleep-related breathing disorders, such as sleep apnea, can have a significant impact on your health and quality of life. Our respiratory specialists can conduct sleep studies and evaluations to diagnose and manage these conditions effectively. We provide comprehensive sleep disorder management, including continuous positive airway pressure (CPAP) therapy, lifestyle modifications, and patient education."
  },
  {
    title: "Asthma and COPD Management:",
    content: "Our team is experienced in managing chronic respiratory conditions like asthma and COPD. We work closely with you to develop personalized treatment plans, including medications, inhaler techniques, lifestyle modifications, and self-management strategies, to help you gain control over your symptoms and improve your quality of life."
  },
  {
    title: "Smoking Cessation Programs:",
    content: "Quitting smoking is one of the most impactful steps you can take to improve your respiratory health. Our respiratory department offers specialized smoking cessation programs to support and guide individuals in their journey towards a smoke-free life. Our team of experts provides counseling, behavioral therapies, and medical interventions to help you quit smoking successfully."
  },
  {
    title: "Smoking Cessation Programs:", // Second occurrence in image is actually about Rehab
    content: "For patients with chronic respiratory conditions, we offer specialized respiratory rehabilitation programs. These programs combine exercise, education, and emotional support to enhance lung capacity, reduce symptoms, and improve overall physical and mental well-being."
  }
];

const scopeOfTreatment = [
  "Asthma & Difficult Asthma",
  "Allergy",
  "COPD(CHRONIC OBSTRUCTIVE PULMONARY DISEASE)",
  "ILD (Interstitial Lung Disease) & Rehabilitation",
  "Sever Pneumonia",
  "Complicated Lung Infection",
  "Bronchoscopy - Rigid & Flexible",
  "Thoracoscopy",
  "EBUS",
  "Sleep Medicine",
  "PLEUral catheter",
  "TB/ Post TB Sequelae",
  "Respiratory Critical Care"
];

const whyChooseUs = [
  {
    title: "Expertise:",
    content: "Our team of skilled physicians and specialists bring extensive experience and knowledge to the table, ensuring that you receive the highest quality care."
  },
  {
    title: "Advanced Technology:",
    content: "We utilize cutting-edge equipment and diagnostic tools to provide accurate assessments and personalized treatment plans."
  },
  {
    title: "Patient-Centered Approach:",
    content: "Your well-being and satisfaction are our top priorities. We strive to create a compassionate and supportive environment where you feel heard, understood, and actively involved in your treatment decisions."
  },
  {
    title: "Collaborative Care:",
    content: "Our respiratory department works closely with other specialties and departments within the hospital to provide comprehensive and integrated care, ensuring a holistic approach to your respiratory health."
  },
  {
    title: "Education and Support:",
    content: "We believe in empowering our patients with knowledge and support to actively manage their respiratory conditions. Through patient education, support groups, and resources, we equip you with the tools necessary for better self-care."
  }
];

const doctors = [
  {
    name: 'Dr. K. P. Singh',
    qualifications: 'MBBS, MD (Respiratory Medicine), Dip Card',
    designation: 'Sr. Consultant',
    slug: 'dr-k-p-singh',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-cyan-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-cyan-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg font-medium">
    <span className="text-cyan-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'activity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
    {icon === 'scope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />}
    {icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
    {icon === 'plus' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
  </svg>
);

/* ─── Page ─── */

export default function RespiratoryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[500px] md:h-[450px] w-full bg-[#164e63] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/respiratory_medicine.png"
            alt="Respiratory Care"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#164e63] via-[#164e63]/90 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-cyan-500/20 text-cyan-100 text-xs md:text-sm font-bold mb-6 border border-cyan-400/30 backdrop-blur-sm uppercase tracking-wider">
                Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-heading">
                T.B & <br className="hidden md:block" />
                Respiratory Medicine
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

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Pulmonology & Chest/Respiratory Medicine Department" />
              <div className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and your Sleep Disorder that helps you to breathe and provide comprehensive treatment for a wide range of respiratory illness such as asthma, Difficult to treat Asthma, COPD(smoking/pollution related damage to lungs), pneumonia(INCLUDING COVID-19), lung cancer, lung fibrosis, sleep apnea, and other respiratory diseases.
                </p>
                <p>
                  We understand the importance of healthy lungs and the impact that respiratory health has on our overall well-being. With our HIGHLY experienced team of respiratory specialists and state-of-the-art facilities, we are committed to helping you breathe easier and live a fulfilling life.
                </p>
              </div>

              <div className="mt-12">
                <SectionHeader title="Services" highlight="We Offer:" />
                <div className="space-y-8 mt-8">
                  {services.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-cyan-700 font-bold text-sm">›</span>
                         </div>
                         <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify font-medium">
                            <span className="font-bold text-[#0b1c43]">{item.title}</span> {item.content}
                         </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20">
                <SectionHeader title="Scope of" highlight="Treatment" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-8">
                  {scopeOfTreatment.map((item, idx) => (
                    <ListItem key={idx} text={item} />
                  ))}
                </div>
              </div>

              <div className="mt-20 text-gray-800 text-base md:text-lg leading-relaxed font-medium text-justify bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <p>
                    At our Respiratory Department, patient-centered care is our top priority. We strive to create a comfortable and supportive environment where you can openly discuss your concerns, receive personalized attention, and actively participate in your treatment decisions. Our team of compassionate respiratory specialists is dedicated to delivering the highest standard of care while ensuring your comfort and well-being throughout your healthcare journey.
                </p>
              </div>

              <div className="mt-20">
                <SectionHeader title="Why Choose Our" highlight="Respiratory Department?" />
                <div className="space-y-8 mt-8">
                  {whyChooseUs.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <p className="text-gray-800 text-base md:text-lg leading-relaxed text-justify font-medium pt-1">
                            <span className="font-bold text-[#0b1c43] block mb-1">{item.title}</span> {item.content}
                         </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 space-y-8 text-gray-800 text-base md:text-lg leading-relaxed font-medium text-justify">
                <p>
                    We invite you to Popular Hospital for more information about our services, our team of experts, and patient resources. If you have any questions or would like to schedule an appointment, please don’t hesitate to contact us. Breathe easier and experience the difference at our Respiratory Department – where your respiratory health is our utmost concern.
                </p>
                <div className="bg-[#164e63] p-10 rounded-2xl text-white">
                    <p className="font-bold mb-6">
                        Take the first step towards better respiratory health today. Contact our Respiratory Department to schedule an appointment or to learn more about our services. Our dedicated team is here to help you breathe easier and live a healthier, more fulfilling life.
                    </p>
                    <div className="flex flex-col gap-2 border-t border-white/20 pt-6">
                        <p className="text-cyan-300 font-bold tracking-wider">Breathe freely with the Respiratory Department at Popular Hospital.</p>
                        <p className="text-2xl font-bold">Breathe Easy. Live Fully.</p>
                    </div>
                </div>
              </div>

            </div>

            {/* ── Right Column (Doctor Sidebar) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#E85222] hover:bg-[#d1451a] text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>

                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
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
                              className="absolute inset-0 bg-cyan-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-cyan-600 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-[#164e63] mb-1 font-heading">{doctors[0].name}</h3>
                            <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doctors[0].qualifications}</p>
                            <p className="text-cyan-700 text-xs mt-2 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ FINAL CALL TO ACTION ═══════ */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4 text-center">
            <h2 className="text-3xl font-bold text-[#164e63] mb-8">Ready to breathe easier?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/doctors"
                className="bg-[#E85222] text-white hover:bg-[#d1451a] px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
              >
                Book Your Consultation
              </Link>
              <a
                href="tel:+917800001895"
                className="bg-white border-2 border-[#164e63] text-[#164e63] hover:bg-gray-100 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                  Call +91-7800001895 / 96
              </a>
            </div>
        </div>
      </section>

    </main>
  );
}


