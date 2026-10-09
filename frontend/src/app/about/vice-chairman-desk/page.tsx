import Image from "next/image";
import { generatePageMetadata } from "@/lib/seoApi";
import { CImage, T } from "@/components/content/Editable";

export async function generateMetadata() {
  return generatePageMetadata("/about/vice-chairman-desk", {
    title: "From Vice Chairman's Desk | Popular Hospital",
    description:
      "A message from our Vice Chairman, Dr. Mohit Kaushik, on surgical innovation and healthcare leadership.",
    alternates: {
      canonical: "https://www.popularhospital.in/about/vice-chairman-desk",
    },
  });
}

export default function ViceChairmanDeskPage() {
  return (
    <>
      <div className="bg-white min-h-screen pb-20">
        {/* Hero Header */}
        <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
          <div className="absolute inset-0 z-0">
            <CImage
              k="about-vice-chairman-desk_banner"
              src="/images/banners/about_us_cmd_md.jpg"
              alt="Vice Chairman Desk Banner"
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
              <T k="about-vice-chairman-desk_foundation" d={"Leadership"} />
            </span>
            <h1 className="text-3xl md:text-5xl xl:text-2xl font-black font-heading mb-3 text-white uppercase tracking-tight">
              <T k="about-vice-chairman-desk_heading" d={"From Vice Chairman's Desk"} />
            </h1>
            <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] px-4 py-12 lg:py-16 xl:py-10">
          <div className="bg-white relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Info & Photo */}
              <div className="lg:col-span-5 mb-10 lg:mb-0">
                <div className="space-y-6 mt-4 lg:mt-6 w-[85%] md:w-3/4 lg:w-[90%] xl:w-[85%] mx-auto">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white p-3 pt-6">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-gray-50">
                      <CImage k="about-vice-chairman-desk_6e8882"
                        src="/images/departments_doctor/dr_mohit_kaushik.png"
                        alt="Dr. Mohit Kaushik"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                  <div className="bg-[#1e5eb2] p-8 rounded-3xl border border-blue-400/20 shadow-xl text-white">
                    <h2 className="text-2xl md:text-3xl xl:text-xl font-black font-heading mb-2 uppercase tracking-tight"><T k="about-vice-chairman-desk_d63a14" d={"Dr. Mohit Kaushik"} /></h2>
                    <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 leading-tight"><T k="about-vice-chairman-desk_9be727" d={"VICE CHAIRMAN"} /></p>

                    <div className="space-y-1 text-xs md:text-sm font-medium uppercase opacity-90 leading-snug">
                      <p><T k="about-vice-chairman-desk_03cfd8" d={"MBBS - IMS, BHU"} /></p>
                      <p><T k="about-vice-chairman-desk_7d2330" d={"MS (General Surgery) - AIIMS New Delhi"} /></p>
                      <p className="pt-2 text-yellow-100 italic"><T k="about-vice-chairman-desk_e20756" d={"3 YEARS Renal-transplant exposure"} /></p>
                    </div>

                    <div className="mt-7 pt-5 border-t border-blue-400/30 flex items-center justify-center gap-5">
                      <a
                        href="https://www.linkedin.com/in/dr-mohit-kaushik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D13D10] transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/theoptimisticsurgeon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D13D10] transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://x.com/DrMohit_Kaushik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D13D10] transition-colors"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content Area */}
              <div className="lg:col-span-7 relative pt-2 pb-10">
                <div className="space-y-12">
                  
                  {/* Main Page Heading (Restored Original) */}
                  <div className="mb-6 xl:mb-4 2xl:mb-8">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                      <T k="about-vice-chairman-desk_title_1" d={"Surgical Innovation & "} />
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">
                        <T k="about-vice-chairman-desk_title_2" d={"Healthcare Leadership"} />
                      </span>
                    </h3>
                  </div>

                  {/* Intro Text Sections */}
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-[18px] font-black text-[#123A5A] font-heading mb-2 leading-snug"><T k="about-vice-chairman-desk_0ef2eb" d={"A surgeon shaped by clinical excellence, research and healthcare leadership."} /></h4>
                      <p className="text-[14.5px] text-[#1d2b36] leading-relaxed text-justify"><T k="about-vice-chairman-desk_b66aea" d={"Dr. Mohit Kaushik combines AIIMS New Delhi surgical training, substantial renal transplant exposure, robotic surgery research and hands-on healthcare operations experience—bringing together medicine, innovation and systems thinking."} /></p>
                    </section>

                    <section>
                      <h4 className="text-[16px] font-bold text-[#168a8a] mb-1 uppercase tracking-widest"><T k="about-vice-chairman-desk_556576" d={"PATIENT FIRST"} /></h4>
                      <p className="text-xl md:text-2xl font-bold text-[#123A5A] mb-2 italic"><T k="about-vice-chairman-desk_5a4856" d={"“Patient First, Always.”"} /></p>
                      <p className="text-[14.5px] text-[#1d2b36] leading-relaxed"><T k="about-vice-chairman-desk_2c1510" d={"A patient-centred approach to clinical care, innovation and healthcare transformation."} /></p>
                    </section>
                  </div>

                  {/* Profile At A Glance */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-6 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_81df07" d={"Profile At A Glance"} /></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { title: "AIIMS NEW DELHI", subtitle: "MS General Surgery" },
                        { title: "IMS\u2013BHU", subtitle: "MBBS \u2022 Gold Medal" },
                        { title: "3 YEARS", subtitle: "Renal Transplant Exposure" },
                        { title: "ROBOTIC SURGERY", subtitle: "da Vinci Xi & Hugo\u2122 RAS" },
                        { title: "ASICON 2025", subtitle: "1st Prize \u2022 Free Paper" },
                        { title: "SURGICAL ENDOSCOPY", subtitle: "Published Research \u2022 2026" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#f3f7fa] p-5 text-center rounded-xl shadow-sm border border-gray-50">
                          <h4 className="font-bold text-[#123A5A] text-[14px] mb-2 h-10 flex items-center justify-center">{item.title}</h4>
                          <p className="text-[#1d2b36] text-[13.5px]">{item.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Full-Width Sections Below Left Card */}
            <div className="mt-12 lg:mt-20 w-full space-y-12">
              {/* Academic & Professional Journey */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-6 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_78c8d2" d={"Academic & Professional Journey"} /></h3>
                    <div className="space-y-4 border-l-2 border-[#168a8a]/30 pl-5 md:pl-6 ml-2 md:ml-3">
                      {[
                        {
                          year: "2017\u20132023",
                          title: "MBBS \u2022 Institute of Medical Sciences, Banaras Hindu University",
                          desc: "ICMR Short-Term Studentship Scholar; distinctions in Pharmacology and Forensic Medicine.",
                        },
                        {
                          year: "2022",
                          title: "Dr. Kodela Prasad Siva Rao Gold Medal",
                          desc: "Best Outgoing Male Student of the Year, IMS-BHU.",
                        },
                        {
                          year: "2023\u20132026",
                          title: "MS General Surgery \u2022 AIIMS New Delhi",
                          desc: "Broad General Surgery training with substantial three-year exposure to renal transplantation and complex surgical care.",
                        },
                        {
                          year: "2026",
                          title: "Research & Surgical Innovation",
                          desc: "Randomized Controlled Trial on robotic surgical ergonomics published in Surgical Endoscopy.",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[27px] md:-left-[31px] top-1 w-[14px] h-[14px] bg-[#168a8a] rounded-full ring-4 ring-white" />
                          <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                            <div className="text-[#168a8a] font-black text-[15px] tracking-widest mb-1.5">{item.year}</div>
                            <h4 className="text-[#123A5A] font-bold text-[16px] mb-2 leading-snug">{item.title}</h4>
                            <p className="text-[#1d2b36] text-[14.5px] leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Key Achievements & Recognition */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-6 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_851f90" d={"Key Achievements & Recognition"} /></h3>
                    <ul className="list-disc pl-5 space-y-4 text-[14.5px] text-[#1d2b36] leading-relaxed">
                      {[
                        { title: "GOLD MEDAL \u2022 2022", desc: "Dr. Kodela Prasad Siva Rao Gold Medal \u2022 Best Outgoing Male Student" },
                        { title: "ASICON \u2022 2025", desc: "First Prize \u2013 Free Paper for robotic surgery / microbreak research" },
                        { title: "ASICON \u2022 2025", desc: "Second Prize \u2013 Dr. C. Palanivelu Best Video" },
                        { title: "ICMR \u2022 2020", desc: "Short-Term Studentship Scholar \u2022 Undergraduate Research" },
                        { title: "SURGICAL ENDOSCOPY \u2022 2026", desc: "Published Randomized Controlled Trial on robotic surgical ergonomics" },
                        { title: "GLOBAL ACADEMIC EXPOSURE", desc: "European Colorectal Congress \u2022 St. Gallen \u2022 SAGES Annual Meeting \u2022 Tampa" },
                      ].map((item, idx) => (
                        <li key={idx}>
                          <span className="font-bold text-[#123A5A]">{item.title}</span>
                          <br />
                          {item.desc}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Surgical Expertise & Areas Of Interest */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-6 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_965bd3" d={"Surgical Expertise & Areas Of Interest"} /></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { title: "RENAL TRANSPLANTATION", desc: "Three-year exposure during AIIMS New Delhi training" },
                        { title: "ROBOTIC & MINIMALLY INVASIVE SURGERY", desc: "Exposure to da Vinci Xi and Hugo\u2122 RAS platforms" },
                        { title: "GENERAL & LAPAROSCOPIC SURGERY", desc: "Broad surgical training and patient management" },
                        { title: "VASCULAR ACCESS", desc: "Particular interest and exposure to AV fistula creation" },
                        { title: "SURGICAL RESEARCH", desc: "Robotic surgery, ergonomics, human factors and performance" },
                        { title: "PATIENT EDUCATION", desc: "Evidence-based healthcare communication and prevention" },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#f3f7fa] p-5 text-center rounded-xl border-t-[3px] border-[#168a8a] shadow-sm">
                          <h4 className="font-bold text-[#123A5A] text-[13px] uppercase mb-2 h-10 flex items-center justify-center">{item.title}</h4>
                          <p className="text-[#1d2b36] text-[13.5px] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Research & Academic Contribution */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-4 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_e77233" d={"Research & Academic Contribution"} /></h3>
                    <div className="space-y-4 text-[14.5px] text-[#1d2b36] leading-relaxed text-justify">
                      <p><T k="about-vice-chairman-desk_c422ac" d={"Research has been a consistent part of Dr. Mohit Kaushik’s medical journey—from ICMR-supported undergraduate research to postgraduate work at AIIMS New Delhi. His work has focused particularly on robotic surgery, surgical ergonomics, human factors and surgeon performance. His 2026 Surgical Endoscopy publication reports a randomized controlled trial examining visual, physical and mental strain during simulated robotic surgical tasks and the impact of structured microbreaks."} /></p>
                      <p><T k="about-vice-chairman-desk_10a4b4" d={"His academic work has also been presented at national and international forums, including the European Colorectal Congress in St. Gallen, Switzerland, SAGES 2026 in Tampa, Florida, and major Indian surgical meetings."} /></p>
                    </div>
                  </section>

                  {/* Healthcare Leadership & Transformation */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-4 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_bc6a74" d={"Healthcare Leadership & Transformation"} /></h3>
                    <div className="space-y-4 text-[14.5px] text-[#1d2b36] leading-relaxed text-justify">
                      <p><T k="about-vice-chairman-desk_1eecd7" d={"Dr. Mohit’s perspective extends beyond the operating room. During his MBBS years, he worked with Popular Medicare Ltd. in hospital operations, gaining practical exposure to clinical workflows, people, processes, infrastructure, technology and patient experience."} /></p>
                      <p><T k="about-vice-chairman-desk_d8ecf7" d={"This experience shaped his interest in healthcare transformation: building systems that are clinically strong, operationally efficient, technology-enabled and genuinely patient-centred."} /></p>
                    </div>
                  </section>

                  {/* Vision As Vice Chairman */}
                  <section>
                    <h3 className="text-[22px] font-black text-[#123A5A] font-heading uppercase mb-6 border-b-2 border-gray-100 pb-3"><T k="about-vice-chairman-desk_0b3f16" d={"Vision As Vice Chairman"} /></h3>
                    <div className="bg-[#123A5A] p-8 md:p-10 rounded-2xl shadow-xl text-center">
                      <p className="text-[22px] md:text-[26px] font-black font-heading italic leading-tight mb-5 text-white"><T k="about-vice-chairman-desk_80561b" d={"“Better Surgery. Better Systems. Better Healthcare. Always, the Patient First.”"} /></p>
                      <p className="text-[15px] md:text-[15.5px] text-[#e6f1f6] leading-relaxed max-w-[48rem] mx-auto"><T k="about-vice-chairman-desk_484d77" d={"As Vice Chairman, Dr. Mohit Kaushik aims to bring together clinical excellence, surgical innovation, research, technology and healthcare systems to help build more advanced, accessible and patient-centred healthcare."} /></p>
                    </div>
                  </section>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}
