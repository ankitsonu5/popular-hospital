import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radiological Services | Popular Hospital",
  description:
    "Advanced diagnostic imaging and radiological services at Popular Hospital.",
};

const SectionDivider = () => (
  <div className="flex items-center mt-2 mb-6">
    <div className="h-0.5 w-12 bg-gray-800"></div>
    <div className="w-2.5 h-2.5 bg-gray-800 transform rotate-45 -mx-1"></div>
    <div className="h-0.5 w-12 bg-gray-800"></div>
  </div>
);

export default function RadiologicalServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[400px] md:h-[400px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/radiology_banner_services.png"
            alt="Radiology Services"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              Radiological Services
            </h1>
            <nav
              className="flex items-center text-sm md:text-lg text-white/90 font-bold"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Home
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <Link
                href="/services"
                className="hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Services
              </Link>
              <span className="mx-3 text-red-500 font-black">/</span>
              <span className="text-white uppercase tracking-wider">
                Radiology
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Top Section - Gray Background */}
      <section className="bg-[#f6f7f9] py-16">
        <div className="max-w-[1366px] mx-auto px-6 lg:px-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl font-medium">
              Department of Radiology was 2 major achieved when first CT scanner
              was installed in the hospital by SNS group. It was first of its
              kind in northern India and second in whole India.
            </p>
            <Link
              href="/book"
              className="bg-[#2a5da3] hover:bg-[#1e447a] text-white px-6 py-3 text-sm font-semibold transition-colors uppercase tracking-wide shrink-0"
            >
              SCHEDULE AN APPOINTMENT
            </Link>
          </div>

          {/* Department of Radiology and Imaging */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] font-heading flex flex-wrap gap-2">
              Department of{" "}
              <span className="text-[#284a91]">Radiology and Imaging</span>
            </h1>
            <SectionDivider />
            <p className="text-gray-700 text-[15px] leading-[1.8] text-justify">
              Ultrasound department was started in 4. 1 Tesla MRI was installed
              in the hospital in 9 which is upgraded by 3 Tesla in 2009.
              Department of mammography was started in 1999.State of art
              vascular cath lab. Especially designed for vascular procedure
              started in 2010. Popular houses a vast imaging department with its
              unique subdivisions which include conventional radiology, General
              Ultrasound, Fetal Medicine, CT, MRI and Interventional radiology.
              All the subdivisions are highly coordinated, equipped with latest
              technology and managed effectively by number of expert consultants
              mastered in their respective areas and providing high quality
              reporting and quality care of patients. Each department is also
              staffed with highly trained and experienced technical personnel.
            </p>
          </div>

          {/* Conventional Radiology */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] font-heading">
              Conventional Radiology
            </h2>
            <SectionDivider />
            <p className="text-gray-700 text-[15px] leading-[1.8] text-justify">
              The department of conventional radiology is equipped with two
              digital x-ray machines, one fluoroscopy unit, two high frequency
              conventional x-ray machine, one mammography machine and one OPG
              x-ray machine. The work load on an average is 400 patients per
              day. The procedures done under fluoroscopy control include barium
              investigations for the gastrointestinal tract,
              hysterosalpingograms for the female genital tract and a number of
              procedures for diagnostic and therapeutic intervention for
              hepatobiliary system. The department also does urological
              investigations such as intravenous urogram and micturating and
              cystourethrogram. Special investigations like dacrocystogram,
              sialogram, myelogram are also done. Procedures like deferography
              are also done which is available in very few centers in India.
              Portable radiography units are kept on each floor of the hospital
              ward block for patients who are too sick to come to the main
              department. Digital portable radiographs are being carried out in
              the ICU patients. The department also has a state-of-the-art
              mammography machine with stereotactic biopsy attachment for
              diagnostic interventional procedures. On an average 175-200
              mammograms are done every month with interventional procedures
              including hook wire placements and breast biopsies.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-[1366px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 item-start">
            {/* Left Content */}
            <div className="flex-1 lg:max-w-[60%]">
              {/* Interventional Radiology */}
              <div className="mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] font-heading flex gap-2">
                  Interventional{" "}
                  <span className="text-[#284a91]">Radiology</span>
                </h2>
                <SectionDivider />
                <p className="text-gray-700 text-[15px] leading-[1.8] text-justify">
                  Department of Interventional radiology is equipped with latest
                  Philips digital fluoroscopy angiography unit. Each subdivision
                  (hepatobiliary, cardiac, peripheral vascular, and
                  neurointervention) is run by highly experienced and trained
                  senior consultants. A number of interventional procedures
                  including hepatobiliary, renal, gynaecological, neurological
                  and cardiac interventions are carried out. Students are also
                  given sufficient hands on experience in these procedures.
                  Hepatobiliary interventions like transarterial
                  chemoembolization for tumors (TACE), transarterial
                  radiotherapy (TARE), radiofrequency ablation (RFA),
                  Transjugular intrahepatic Portosystemic shunts (TIPPS) and
                  embolization for GI bleeds are done extensively in the
                  department.Others procedures like uterine artery embolization
                  are also carried out.
                </p>
              </div>

              {/* Ultrasound */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#333333] font-heading">
                  Ultrasound
                </h2>
                <SectionDivider />
                <p className="text-gray-700 text-[15px] leading-[1.8] text-justify">
                  The ultrasound division of the radiology department is one of
                  the earliest ultrasound setups in the city, started in 2.
                  Since then it has grown steadily, is associated with the first
                  IVF live birth in North India and is currently associated with
                  the highly successful liver transplant programme at this
                  hospital. The department of General Ultrasound is equipped
                  with 5 high end resolution ultrasound Doppler machines.
                  Overall patient overload is average 200 patients per day.
                </p>
              </div>
            </div>

            {/* Right Image element */}
            <div className="flex-1 lg:max-w-[40%] flex justify-center lg:justify-end items-start mt-8 lg:mt-0">
              <div
                className="relative w-full aspect-[4/5] max-w-[500px] overflow-hidden shadow-xl"
                style={{ borderRadius: "100px 100px 300px 100px" }}
              >
                <Image
                  src="/images/departments-images/radiology_popular.jpg"
                  alt="Doctor examining radiology scans"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
