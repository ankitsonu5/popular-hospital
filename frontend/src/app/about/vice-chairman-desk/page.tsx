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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Info & Photo */}
              <div className="lg:col-span-5 mb-10 lg:mb-0">
                <div className="space-y-6 sticky top-24 mt-4 lg:mt-6 w-[85%] md:w-3/4 lg:w-[90%] xl:w-[85%] mx-auto">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white p-3 pt-6">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-gray-50">
                      <Image
                        src="/images/departments_doctor/dr_mohit_kaushik.png"
                        alt="Dr. Mohit Kaushik"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                  <div className="bg-[#1e5eb2] p-8 rounded-3xl border border-blue-400/20 shadow-xl text-white">
                    <h2 className="text-2xl md:text-3xl xl:text-xl font-black font-heading mb-2 uppercase tracking-tight">
                      Dr. Mohit Kaushik
                    </h2>
                    <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 leading-tight">
                      VICE CHAIRMAN
                    </p>

                    <div className="space-y-1 text-xs md:text-sm font-medium uppercase opacity-90 leading-snug">
                      <p>MBBS - IMS, BHU</p>
                      <p>MS (General Surgery) - AIIMS New Delhi</p>
                      <p className="pt-2 text-yellow-100 italic">3 YEARS Renal-transplant exposure</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content Area */}
              <div className="lg:col-span-7 relative pt-2">
                <div className="mb-6 xl:mb-4 2xl:mb-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                    <T k="about-vice-chairman-desk_title_1" d={"Surgical Innovation & "} />
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">
                      <T k="about-vice-chairman-desk_title_2" d={"Healthcare Leadership"} />
                    </span>
                  </h3>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">Profile</h4>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify mb-3">
                      Dr. Mohit Kaushik is a surgeon and healthcare leader trained at the Institute of Medical Sciences, Banaras Hindu University and the All India Institute of Medical Sciences (AIIMS), New Delhi. His postgraduate training in General Surgery included substantial exposure to complex surgical care, vascular access surgery and three years of experience in the renal-transplant environment.
                    </p>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify">
                      His professional interests lie at the intersection of advanced surgery, minimally invasive and robotic surgery, surgical research and patient-centred healthcare. He has academic exposure to the da Vinci Xi and Hugo™ RAS robotic platforms and has pursued research in robotic surgery ergonomics and surgeon performance.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">Areas of Expertise & Clinical Interest</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal">
                      <li>General Surgery & complex surgical care</li>
                      <li>Minimally Invasive / Laparoscopic Surgery</li>
                      <li>Robotic-Assisted Surgery & surgical innovation</li>
                      <li>Renal Transplantation – training and clinical exposure</li>
                      <li>Vascular Access Surgery, including AV fistula creation</li>
                      <li>Evidence-based, patient-centred surgical decision-making</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">Research & Academic Excellence</h4>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify mb-3">
                      <strong className="text-hospital-orange">RESEARCH HIGHLIGHT – 2026:</strong> Published research in Surgical Endoscopy on robotic-surgery ergonomics, including visual, physical and mental strain during simulated Hugo™ RAS tasks and comparison of robotic-console ergonomics. He has also presented research at national and international surgical forums.
                    </p>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify">
                      <strong className="font-semibold text-gray-800">Recognition:</strong> First Prize – Free Paper, ASICON 2025 | Second Prize – Dr. C. Palanivelu Best Video, ASICON 2025
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">A Patient-First Approach</h4>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify mb-3">
                      For Dr. Kaushik, good surgery begins before the operation. His approach is centred on understanding the patient, establishing the right diagnosis, discussing appropriate treatment options and selecting the most suitable surgical approach for the individual patient.
                    </p>
                    <blockquote className="border-l-4 border-hospital-teal pl-4 italic font-semibold text-gray-700 bg-gray-50 py-3 rounded-r-lg">
                      "Patient first, always."
                    </blockquote>
                  </section>

                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">Vision as Vice Chairman</h4>
                    <p className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify">
                      As Vice Chairman of Popular Hospital, Dr. Kaushik brings together clinical medicine and healthcare transformation. His vision is to build a healthcare environment where clinical excellence, responsible adoption of technology, research, patient education and compassionate care work together to create better patient experiences and outcomes.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xl font-bold text-[#0b1c43] mb-3 border-b pb-2">Why His Profile Matters to Patients</h4>
                    <ul className="list-disc pl-5 space-y-2 text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal">
                      <li>Advanced academic and surgical training at AIIMS New Delhi.</li>
                      <li>Exposure to high-complexity surgical and renal-transplant care.</li>
                      <li>Research-driven interest in modern robotic and minimally invasive surgery.</li>
                      <li>A balanced approach: technology where it adds clinical value, not technology for its own sake.</li>
                      <li>Clear communication and individualised treatment planning.</li>
                    </ul>
                  </section>

                  <div className="mt-10 pt-5 border-t text-center">
                    <p className="text-sm font-bold text-gray-500 tracking-wider">ADVANCED SURGERY • RESPONSIBLE INNOVATION • PATIENT-FIRST CARE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
