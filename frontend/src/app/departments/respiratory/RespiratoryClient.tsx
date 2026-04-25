"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data (Transcribed from Uploaded Image) ─── */

const features = [
  {
    title: "Sleep Lab",
    icon: "activity",
    desc: "Advanced sleep apnea diagnosis and studies.",
  },
  {
    title: "Bronchoscopy",
    icon: "scope",
    desc: "Detailed airway visualization and tissue sampling.",
  },
  {
    title: "ICU Support",
    icon: "shield",
    desc: "Specialized respiratory critical care services.",
  },
  {
    title: "Pulmonary Testing",
    icon: "plus",
    desc: "Comprehensive evaluation of lung function and capacity.",
  },
];

const services = [
  {
    title: "Diagnosis and Treatment:",
    content:
      "Our respiratory experts are skilled in diagnosing and managing various respiratory conditions, including asthma, chronic obstructive pulmonary disease (COPD), pneumonia, bronchitis, and more. Through a combination of thorough examinations, diagnostic tests, and personalized treatment plans, we strive to provide you with the most effective and tailored care.",
  },
  {
    title: "Pulmonary Function Testing:",
    content:
      "We offer a comprehensive range of pulmonary function tests to evaluate lung function, measure lung capacity, and assess the efficiency of oxygen exchange. These tests help in diagnosing respiratory conditions, monitoring disease progression, and evaluating the effectiveness of treatment interventions.",
  },
  {
    title: "Bronchoscopy:",
    content:
      "Our department is equipped with advanced bronchoscopy technology, allowing us to visualize the airways and obtain tissue samples for further analysis. Bronchoscopy is a valuable tool for diagnosing lung diseases, detecting abnormalities, and guiding treatment decisions.",
  },
  {
    title: "Sleep Disorder Evaluation:",
    content:
      "Sleep-related breathing disorders, such as sleep apnea, can have a significant impact on your health and quality of life. Our respiratory specialists can conduct sleep studies and evaluations to diagnose and manage these conditions effectively. We provide comprehensive sleep disorder management, including continuous positive airway pressure (CPAP) therapy, lifestyle modifications, and patient education.",
  },
  {
    title: "Asthma and COPD Management:",
    content:
      "Our team is experienced in managing chronic respiratory conditions like asthma and COPD. We work closely with you to develop personalized treatment plans, including medications, inhaler techniques, lifestyle modifications, and self-management strategies, to help you gain control over your symptoms and improve your quality of life.",
  },
  {
    title: "Smoking Cessation Programs:",
    content:
      "Quitting smoking is one of the most impactful steps you can take to improve your respiratory health. Our respiratory department offers specialized smoking cessation programs to support and guide individuals in their journey towards a smoke-free life. Our team of experts provides counseling, behavioral therapies, and medical interventions to help you quit smoking successfully.",
  },
  {
    title: "Smoking Cessation Programs:",
    content:
      "For patients with chronic respiratory conditions, we offer specialized respiratory rehabilitation programs. These programs combine exercise, education, and emotional support to enhance lung capacity, reduce symptoms, and improve overall physical and mental well-being.",
  },
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
  "Respiratory Critical Care",
];

const whyChooseUs = [
  {
    title: "Expertise:",
    content:
      "Our team of skilled physicians and specialists bring extensive experience and knowledge to the table, ensuring that you receive the highest quality care.",
  },
  {
    title: "Advanced Technology:",
    content:
      "We utilize cutting-edge equipment and diagnostic tools to provide accurate assessments and personalized treatment plans.",
  },
  {
    title: "Patient-Centered Approach:",
    content:
      "Your well-being and satisfaction are our top priorities. We strive to create a compassionate and supportive environment where you feel heard, understood, and actively involved in your treatment decisions.",
  },
  {
    title: "Collaborative Care:",
    content:
      "Our respiratory department works closely with other specialties and departments within the hospital to provide comprehensive and integrated care, ensuring a holistic approach to your respiratory health.",
  },
  {
    title: "Education and Support:",
    content:
      "We believe in empowering our patients with knowledge and support to actively manage their respiratory conditions. Through patient education, support groups, and resources, we equip you with the tools necessary for better self-care.",
  },
];

const doctors = [
  {
    name: "Dr. K. P. Singh",
    qualifications: "MBBS, MD (Respiratory Medicine), Dip Card",
    designation: "Sr. Consultant Pulmonologist",
    slug: "dr-kp-singh",
    image: "/images/departments_doctor/dr_k_p_singh.jpg",
  },
  {
    name: "Dr. Shailendra Shivhare",
    qualifications: "MBBS, MD (Respiratory Medicine)",
    designation: "Consultant Pulmonologist",
    slug: "dr-shailendra-shivhare",
    image: "/images/departments_doctor/dr_sailendra shivhare.jpg",
  },
  {
    name: "Dr. Vikas Jaiswal",
    qualifications: "MBBS, DTCD, DNB (Respiratory Medicine)",
    designation: "Consultant Pulmonologist",
    slug: "dr-vikas-jaiswal",
    image: "/images/departments_doctor/dr_vikas_jaiswal.jpg",
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading leading-tight uppercase tracking-tight">
      {title} <span className="text-cyan-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-cyan-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-gray-800 mb-3 group text-base md:text-lg 2xl:text-xl font-bold">
    <span className="text-cyan-600 mt-1.5 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0 text-xl leading-none">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

/* ─── Page ─── */

export default function RespiratoryClient() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#164e63] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
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
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-100 text-xs md:text-sm font-bold mb-4 border border-cyan-400/30 backdrop-blur-sm uppercase tracking-wider">
              Centre for Advanced Pulmonology
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-6xl font-bold text-white mb-4 leading-[1.1] font-heading">
              Department of{" "}
              <span className="text-cyan-400">
                Pulmonology & Chest/Respiratory Medicine Department
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-center uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Respiratory Medicine"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO SECTION ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-white min-h screen">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight="Pulmonology & Chest/Respiratory Medicine Department"
              />
              <div className="space-y-6 text-gray-800 text-base md:text-lg xl:text-[15px] 2xl:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  Our Respiratory medicine Department is dedicated to providing
                  exceptional care of chest, lungs, and your Sleep Disorder that
                  helps you to breathe and provide comprehensive treatment for a
                  wide range of respiratory illness such as asthma, Difficult to
                  treat Asthma, COPD(smoking/pollution related damage to lungs),
                  pneumonia(INCLUDING COVID-19), lung cancer, lung fibrosis,
                  sleep apnea, and other respiratory diseases.
                </p>
                <div className="bg-cyan-50/50 p-6 rounded-xl border-l-4 border-cyan-600">
                  <p>
                    We understand the importance of healthy lungs and the impact
                    that respiratory health has on our overall well-being. With
                    our HIGHLY experienced team of respiratory specialists and
                    state-of-the-art facilities, we are committed to helping you
                    breathe easier and live a fulfilling life.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Column (Doctor Slider) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit flex flex-col gap-10">
                <DoctorSlider
                  doctors={doctors}
                  departmentName="Respiratory Medicine"
                />
              </div>
            </div>
          </div>

          {/* ── Services We Offer (Full Width) ── */}
          <div className="mt-24 border-t border-gray-100 pt-24">
            <SectionHeader title="Services" highlight="We Offer:" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-10">
              {services.map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-lg border border-cyan-100">
                    <span className="font-bold text-lg">0{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-[#0b1c43] text-xl block mb-2 uppercase tracking-tight">
                      {item.title}
                    </span>
                    <p className="text-gray-800 text-base md:text-lg 2xl:text-xl leading-relaxed text-justify font-medium">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Scope of Treatment (Full Width with Background) ── */}
          <div className="mt-32 bg-gray-50 -mx-4 px-4 sm:-mx-8 sm:px-8 py-24 rounded-[3rem] border border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
              <SectionHeader title="Scope of" highlight="Treatment" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 mt-10">
                {scopeOfTreatment.map((item, idx) => (
                  <ListItem key={idx} text={item} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Why Choose Us (Full Width with Border) ── */}
          <div className="mt-32 px-6 py-20 rounded-[3rem] border-2 border-cyan-100/50 bg-white shadow-2xl shadow-cyan-900/5">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title="Why Choose Our"
                highlight="Respiratory Department?"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-12">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600 border border-cyan-100 shadow-md group-hover:bg-cyan-600 group-hover:text-white transition-all">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-black text-[#0b1c43] text-xl block mb-3 uppercase tracking-tight">
                        {item.title}
                      </span>
                      <p className="text-gray-800 text-base md:text-lg 2xl:text-xl leading-relaxed text-justify font-medium">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Call to Action ── */}
          <div className="mt-32 space-y-12">
            <div className="space-y-8 text-gray-800 text-lg md:text-xl 2xl:text-2xl leading-relaxed font-bold text-justify max-w-4xl mx-auto text-center">
              <p>
                At our Respiratory Department, patient-centered care is our top
                priority. We strive to create a comfortable and supportive
                environment where you can openly discuss your concerns.
              </p>
            </div>

            <div className="p-10 border border-cyan-600/20 rounded-[3rem] bg-gradient-to-br from-cyan-50/50 to-white shadow-lg max-w-4xl mx-auto">
              <p className="mb-8 text-center text-lg 2xl:text-xl font-medium text-gray-700">
                Take the first step towards better respiratory health today.
                Contact our Respiratory Department to schedule an appointment.
              </p>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-200 to-transparent mx-auto mb-8" />
              <p className="text-center text-[#0b1c43] font-bold text-xl md:text-2xl leading-tight">
                Breathe freely with the Respiratory Department at{" "}
                <span className="text-[#E85222]">Popular Hospital</span>.
              </p>
              <p className="text-center text-cyan-600 font-extrabold text-2xl md:text-3xl mt-6 uppercase tracking-[0.15em]">
                Breathe Easy. Live Fully.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
