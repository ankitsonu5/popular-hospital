import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Bank Services | Popular Hospital",
  description:
    "24/7 Blood Bank services at Popular Hospital ensuring availability of safe blood and blood components with the highest quality standards.",
};

const sections = [
  {
    id: "department",
    title: "Department of Blood Bank",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          There is a always a significant, ongoing need for blood and blood
          products.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Because there is no substitute for human blood, the generosity of
          blood donors helps to ensure that we maintain an adequate supply for
          our patients. Giving just one pint of your blood can help save the
          lives of three patients, and the entire process of blood donation only
          takes about an hour.
        </p>

        <h3 className="text-[#284a91] font-bold text-sm lg:text-base mt-2">
          The donation process is simple. You may be eligible to donate blood if
          you:
        </h3>
        <ul className="space-y-2 text-sm lg:text-base text-gray-700 font-medium">
          {[
            "are 18 - 60 years old",
            "weight at least 45 kgs",
            "are in good health",
            "Donations of whole blood and platelets are needed every day — red blood cells can be stored for 42 days and platelets for 5 days.",
          ].map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span
                className="text-blue-700 font-black flex-shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Latest techniques are used for immune-hematological testing, for blood
          compatibility and for diagnosis. The department is committed to ensure
          availability of safe blood. We supply best quality blood and
          components, prepared from unremunerated donors, screened by
          appropriate methods and stored and transported at night temperature.
          We also maintain a quality system which is compliant of all existing
          statutory provisions of the Drugs and cosmetic act 1940 and
          amendments, other directives from Drug Controller General of India,
          National Blood Policy, NACO guidelines on HIV screening and NABH
          guidelines. Blood is carefully screened for transfusion transmitted
          infections (HBsAg, HCV, HIV I& II- using CMIA technology along with
          RPR and malarial antigen testing). Stringent quality control practices
          include testing of a defined number of units of each product for the
          appropriate parameters. The facility is licensed by Drug controller
          General India.
        </p>

        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          The department has adopted Leukoreduction technology (Opti) to provide
          Leukoreduced Red Cells.
        </p>

        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Red cell grouping, antibody screening, antihuman globulin test & cross
          match are being done routinely using latest technique of gel
          technology. We have facility for advanced tests (Identification of
          antigen, antibody & rare blood groups)
        </p>

        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          The Department provides round the clock service including platelet
          apheresis and peripheral stem cell harvesting.
        </p>
      </div>
    ),
    image: "/images/departments-images/blood_bank.jpg",
    imgAlt: "",
  },
  {
    id: "health-benefits",
    title: "Health benefits of donating blood",
    subtitle: "Reduces chances of",
    subtitleHighlight: "heart attack:",
    content: (
      <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
        It has been observed that increase in blood iron level increases the
        chance of heart disease. Iron is involved in the oxidation of
        cholesterol and this process is believed to be detrimental for the
        arteries. Increases blood iron level favors this process of cholesterol
        oxidation and thus leads to heart disease. Regular blood donation helps
        in loosing iron on regular basis. It helps in reducing the chance of
        heart attack to one third.
      </p>
    ),
    image: "/images/departments-images/reduces_heart_attack.jpg",
    imgAlt: "Medical checkup",
  },
  {
    id: "enhance-production",
    title: "Enhance the production of new Red",
    subtitle: "Blood",
    subtitleHighlight: "cells:",
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          As the blood is withdrawn from the donors body there is decrease in
          blood cells. To replenish it, immediately new cells are produced by
          marrow and this way blood gets refreshed. Therefore donating blood
          helps in stimulating generation of new blood cells.
        </p>
        <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
          Apart from all these benefits a donor gets a mini blood test done
          before donating blood. This includes Hematocrit i.e. Hb level test,
          Blood pressure is measured, body weight is checked. After this blood
          is collected it tested for 5 major diseases. Those are Hepatitis B,
          Hepatitis C, HIV, Syphilis and malaria. Donor is informed if any of
          these test found to be positive.
        </p>
      </div>
    ),
    image: "/images/departments-images/enhance_red_blood_cells.jpg",
    imgAlt: "Blood tubes",
  },
  {
    id: "components",
    title: "Specialized services",
    subtitle: "Blood",
    subtitleHighlight: "components:",
    content: (
      <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium">
        Thanks to advances in medical technology, blood can be separated into
        its different components. Hence, one unit is used to prepare red blood
        cells, platelet concentrate and plasma each of which can be given to
        three different patients and therefore one unit of blood when separated
        into component can save 3 lives.
      </p>
    ),
    image: "/images/departments-images/blood_components.jpg",
    imgAlt: "Patient giving blood",
  },
  {
    id: "component-therapy",
    title: "What is blood component therapy?",
    subtitle: "Various reason as quoted by",
    subtitleHighlight: "WHO are:",
    content: (
      <ul className="space-y-3 text-sm lg:text-base text-gray-700 font-medium">
        {[
          "The recipient can be treated with only those blood components that are lacking, reducing the occurrence of adverse transfusion reactions",
          "More than one patient can be treated with blood components derived from one donation;",
          "Therapeutic support for patients with special transfusion requirements can be provided, for example, plasma that often is not directly needed for transfusion can be used manufacturing of Factor VIII concentrate for Haemophilia A patients",
          "Improved quality and functional capacity of each component when varied storage conditions and shelf lives were applied.",
          "It has also been observed that infants treated with reconstituted blood (mixture of separated blood components) instead of whole blood recover faster.",
        ].map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span
              className="text-blue-700 font-black flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-justify">{item}</span>
          </li>
        ))}
      </ul>
    ),
    image: "/images/departments-images/blood_component_therapy.jpg",
    imgAlt: "Blood bag",
  },
];

const SectionHeader = ({
  title,
  highlight,
  eyebrow,
}: {
  title: string;
  highlight?: string;
  eyebrow?: string;
}) => (
  <div className="mb-7">
    {eyebrow && (
      <p className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-[#284a91]">
        {eyebrow}
      </p>
    )}
    <h2 className="max-w-4xl text-2xl font-black leading-tight text-[#0b1c43] md:text-3xl lg:text-[2.35rem]">
      {title} {highlight && <span className="text-[#284a91]">{highlight}</span>}
    </h2>
    <div className="mt-4 flex items-center gap-3">
      <div className="h-1.5 w-1.5 rounded-full bg-[#cf2e2e]" />
      <div className="h-px w-24 bg-gradient-to-r from-[#cf2e2e] via-[#284a91] to-transparent" />
    </div>
  </div>
);

export default function BloodBankPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[300px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 font-sans md:h-[300px] md:py-0 lg:h-[320px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/blood_bank_services.png"
            alt="Blood Bank"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-[1.08]">
              Blood Bank
            </h1>
            <nav
              className="flex items-center text-xs md:text-base text-white/90 font-bold"
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
                Blood Bank
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content (Zig-Zag Layout) */}
      <section className="relative py-14 md:py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-white" />
        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:gap-10">
            {sections.map((section, idx) => {
              const showImage = section.id !== "department";
              const isEven = idx % 2 === 0;
              const titleParts = section.title.split(" ");
              const title = section.subtitle
                ? section.subtitle
                : titleParts.slice(0, -2).join(" ");
              const highlight = section.subtitle
                ? section.subtitleHighlight
                : titleParts.slice(-2).join(" ");

              return (
                <article
                  key={section.id}
                  className={`relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                    showImage ? "p-4 sm:p-5 lg:p-6" : "p-5 sm:p-8 lg:p-10"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#cf2e2e] via-[#284a91] to-[#0b1c43]" />
                  <div
                    className={`flex flex-col ${
                      showImage
                        ? isEven
                          ? "lg:flex-row-reverse"
                          : "lg:flex-row"
                        : ""
                    } gap-8 lg:gap-12`}
                  >
                    <div
                      className={`w-full ${
                        showImage
                          ? "lg:w-[58%] lg:px-2 lg:py-4"
                          : "mx-auto max-w-5xl"
                      }`}
                    >
                      <SectionHeader
                        title={title}
                        highlight={highlight}
                        eyebrow={section.subtitle ? section.title : undefined}
                      />
                      <div className="text-left [&_li>span:first-child]:mt-2 [&_li>span:first-child]:inline-block [&_li>span:first-child]:h-2 [&_li>span:first-child]:w-2 [&_li>span:first-child]:rounded-full [&_li>span:first-child]:bg-[#284a91] [&_li>span:first-child]:text-transparent [&_li]:leading-relaxed [&_p]:text-left [&_p]:md:text-justify [&_ul]:rounded-2xl [&_ul]:border [&_ul]:border-slate-100 [&_ul]:bg-slate-50/70 [&_ul]:p-4">
                      {section.content}
                      </div>
                    </div>

                    {showImage && (
                      <div className="flex w-full justify-center lg:w-[42%]">
                        <div className="relative w-full">
                          <div
                            className={`group relative h-full min-h-[260px] w-full overflow-hidden rounded-[1.35rem] border border-white md:min-h-[340px] lg:min-h-full ${
                              isEven
                                ? "rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[1rem] rounded-bl-[1rem]"
                                : "rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-[1rem] rounded-br-[1rem]"
                            }`}
                          >
                            <Image
                              src={section.image}
                              alt={section.imgAlt}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 42vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/35 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-[1366px] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white px-5 py-12 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:px-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#cf2e2e] via-[#284a91] to-[#0b1c43]" />
          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] mb-4">
            Ready to save a life?
          </h2>
          <p className="text-gray-600 mb-8 text-base max-w-2xl mx-auto">
            Donating blood is safe and simple, taking only about an hour. Call
            our Blood Bank to schedule your donation.
          </p>
          <div className="inline-flex flex-col items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row md:p-6">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.1em] mb-1">
                Blood Bank Team
              </p>
              <a
                href="tel:+917800001895"
                className="text-xl md:text-2xl font-black text-red-600 hover:text-red-700 transition-colors"
              >
                +91-7800001895 / 96
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
