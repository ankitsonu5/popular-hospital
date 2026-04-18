"use client";

import Image from "next/image";
import Link from "next/link";

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-blue-600">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-blue-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

export default function PediatricCardiologyClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/cardiology_banner.png"
            alt="Pediatric Cardiology"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl xl:max-w-[1280px] 2xl:max-w-7xl px-6 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              Department of
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading">
              Pediatric Cardiology
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book An Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Section ─── */}
      <section className="py-16 xl:py-10 2xl:py-20">
        <div className="mx-auto w-full max-w-5xl xl:max-w-[1280px] 2xl:max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Content Left */}
            <div className="lg:col-span-8 space-y-8 text-gray-700">
              <div>
                <h2 className="text-2xl 2xl:text-3xl font-bold text-[#0b1c43] mb-4">
                  Purvanchal’s First Full-time Pediatric Cardiologist & Intensivist
                </h2>
                <div className="space-y-4 text-base 2xl:text-lg leading-relaxed text-justify">
                  <p>
                    At Popular Hospital, Varanasi, our Pediatric Cardiology Department is dedicated to providing advanced, compassionate, and child-friendly care to Fragile hearts of Neonatal/pediatric patients.
                  </p>
                  <p>
                    The department is led by Dr Rajesh Kumar Singh, the first full-time pediatric cardiologist and Intensivist in Purvanchal, bringing specialised cardiac care closer to families in Eastern Uttar Pradesh and nearby regions.
                  </p>
                  <p>
                    With a focus on early diagnosis, accurate treatment, and long-term follow-up, we ensure that infants, children, and adolescents receive world-class cardiac care under one roof.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeader title="Meet Our Specialist -" highlight="Dr Rajesh Kumar Singh" />
                <p className="font-bold text-blue-600 uppercase tracking-wide mb-4 text-sm 2xl:text-base">
                  Pediatric Cardiologist and Intensivist
                </p>
                <p className="text-base 2xl:text-lg leading-relaxed text-justify">
                  Dr Rajesh Kumar Singh is a highly respected name in pediatric cardiology and is known for pioneering specialised heart care for children in Purvanchal. His vast experience, combined with a child-centric approach, ensures accurate diagnosis and effective treatment even in complex heart conditions.
                </p>
              </div>

              <div>
                <h3 className="text-xl 2xl:text-2xl font-bold text-[#0b1c43] mb-4">
                  Why parents trust Dr Rajesh Kumar Singh:
                </h3>
                <ul className="space-y-3">
                  {[
                    "First full-time Pediatric Cardiologist and Intensivist in Purvanchal",
                    "Extensive experience in congenital and acquired heart diseases",
                    "Gentle, child-friendly approach with easy accessibility",
                    "Expertise in advanced pediatric cardiac diagnostics",
                    "Trusted by pediatricians and families across Eastern UP",
                    "Successfully running the first of its kind pediatric cardiac intensive care unit in Purvanchal and adjoining areas.",
                    "Bringing advanced care in Varanasi, which was available in Tier 1 or metro cities",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">›</span>
                      <p className="text-base 2xl:text-lg leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Doctor Card - Hardcoded */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm relative pt-6">
                {/* Schedule Button */}
                <Link
                  href="/book?doctor=dr-rajesh-kumar-singh"
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap uppercase"
                >
                  SCHEDULE AN APPOINTMENT
                </Link>

                <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center max-w-sm mx-auto">
                  <div className="w-full p-6 pt-12 flex flex-col items-center">
                    {/* Doctor Image */}
                    <div className="relative w-64 h-80 rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                      <Image
                        src="/images/departments_doctor/dr-rajesh-kumar-singh.jpg"
                        alt="Dr Rajesh Kumar Singh"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        onError={undefined}
                      />
                      <Link
                        href="/doctors/dr-rajesh-kumar-singh"
                        className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                      >
                        <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-all uppercase text-sm">
                          View Full Profile
                        </span>
                      </Link>
                    </div>

                    {/* Doctor Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-[#3b82f6] mb-1 font-heading">
                        Dr Rajesh Kumar Singh
                      </h3>
                      <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">
                        MBBS, MD (Pediatrics), FNB (Pediatric Cardiology)
                      </p>
                      <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-[0.2em] font-black">
                        DEPARTMENT OF PEDIATRIC CARDIOLOGY
                      </p>
                    </div>
                  </div>
                  <div className="h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 xl:mt-24 space-y-16 xl:space-y-20">
              <div>
                <SectionHeader title="Pediatric Heart Conditions" highlight="We Treat" />
                <p className="mb-4 text-base xl:text-[15px] 2xl:text-lg">Our department specialises in diagnosing and managing a wide range of heart conditions in children, including:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
                  {/* CHD */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-3 xl:gap-4 mb-4 xl:mb-5">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 xl:w-6 xl:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                      </div>
                      <h4 className="font-bold text-[#0b1c43] text-[17px] xl:text-[18px] leading-snug">Congenital Heart Diseases (CHD)</h4>
                    </div>
                    <ul className="space-y-2.5 xl:space-y-3 mt-auto">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Acyanotic heart disease (ASD, VSD, PDA, etc.)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className="text-gray-700 font-medium">Cyanotic heart disease (TOF, TGA, DORV, etc.)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Acquired Heart Disease */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-3 xl:gap-4 mb-4 xl:mb-5">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl bg-[#fff2ed] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 xl:w-6 xl:h-6 text-[#E85222]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.01.707.293l5.414 5.414a1 1.01.293.707V19a2 2 2 0 01-2 2z"></path></svg>
                      </div>
                      <h4 className="font-bold text-[#0b1c43] text-[17px] xl:text-[18px] leading-snug">Acquired heart disease</h4>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 xl:gap-3 mt-auto">
                      {["Kawasaki disease", "Myocarditis", "RHD", "Infective Endocarditis"].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#fff2ed] flex items-center justify-center text-[#E85222]">
                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                          </div>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cardiac Rhythm Disorder */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-3 xl:gap-4 mb-2 xl:mb-3">
                      <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 xl:w-5 xl:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <h4 className="font-bold text-[#0b1c43] text-[16px] xl:text-[17px]">Cardiac Rhythm Disorder</h4>
                    </div>
                    <p className="text-gray-600 pl-12 xl:pl-14 text-[14px] xl:text-[15px] font-medium">Tachycardia, Bradycardia</p>
                  </div>

                  {/* Heart failure in infants */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-row items-center gap-3 xl:gap-4 hover:translate-y-[-4px] transition-all duration-300">
                    <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 xl:w-5 xl:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <h4 className="font-bold text-[#0b1c43] text-[16px] xl:text-[17px]">Heart failure in infants and children</h4>
                  </div>

                  {/* Cardiomyopathy */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-row items-center gap-3 xl:gap-4 hover:translate-y-[-4px] transition-all duration-300">
                    <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 xl:w-5 xl:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h4 className="font-bold text-[#0b1c43] text-[16px] xl:text-[17px]">Cardiomyopathy</h4>
                  </div>

                  {/* Abnormal Blood Pressure */}
                  <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 flex flex-row items-center gap-3 xl:gap-4 hover:translate-y-[-4px] transition-all duration-300">
                    <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 xl:w-5 xl:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <h4 className="font-bold text-[#0b1c43] text-[16px] xl:text-[17px]">Abnormal blood pressure (High/Low BP)</h4>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeader title="When should you meet a" highlight="pediatric cardiologist?" />
                <p className="mb-5 font-semibold text-[17px] xl:text-[18px] text-[#0b1c43]">If your child is suffering from:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-5">
                  {[
                    "Easy Fatiguability, Edema over limbs",
                    "Chest pain, breathlessness, and poor growth",
                    "Frequent chest infections",
                    "Excessive sweating specially during feeding",
                    "Bluish discolouration of lips and extremities",
                    "Syncope / Fainting spells",
                    "Palpitation (Excessive awareness of heart beats)",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-4 xl:p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 xl:w-5 xl:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      </div>
                      <p className="text-[15px] xl:text-[16px] text-gray-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader title="Pediatric Cardiac Services" highlight="available at Popular Hospital" />
                <p className="mb-4 text-base xl:text-[15px] 2xl:text-lg">We provide comprehensive pediatric cardiology services using modern technology and evidence based treatment protocols:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Neonatal and Pediatric Echocardiography (ECHO)",
                    "Neonatal and Pediatric ECG",
                    "Non-invasive cardiac evaluations",
                    "Dedicated Pediatric Cardiac Intensive Care Unit",
                    "Pre and post-surgical cardiac assessment",
                    "Long-term follow-up and cardiac care",
                    "Parental counselling and guidance",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border-l-4 border-blue-600">
                      <p className="text-base xl:text-[15px] 2xl:text-lg font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionHeader title="Why Choose Popular Hospital" highlight="for Pediatric Cardiology?" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[
                    "Experienced Pediatric Cardiologist and Intensivist - Dr Rajesh Kumar Singh",
                    "Dedicated Pediatric Cardiac Care Unit with facilities for Intensive care (One of its kind in the whole of Purvanchal and adjoining areas)",
                    "Advanced diagnostic facilities",
                    "Child-friendly environment",
                    "Ethical, transparent & patient-focused care",
                    "Trusted hospital in Varanasi",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      </div>
                      <p className="text-base xl:text-[15px] 2xl:text-lg font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-600 italic border-l-4 border-gray-200 pl-4">
                  We understand that a child’s heart condition can be emotionally challenging for families. Our expert team ensures clarity, compassion, and continuous support at every step of the treatment journey.
                </p>
              </div>


          </div>
        </div>
      </section>
    </main>
  );
}
