import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ServiceContent {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  offerHighlights?: string[];
  whyChoose?: {
    title: string;
    description: string;
  }[];
  costComparison?: {
    treatment: string;
    india: string;
    otherCountries: string;
    note: string;
  }[];
  treatmentPackages?: {
    title: string;
    description: string;
    inclusions: string[];
  }[];
  endToEndServices?: {
    title: string;
    description: string;
    image?: string;
  }[];
  coordinatorSupport?: string[];
  patientRegions?: {
    title: string;
    description: string;
    points: string[];
  }[];
  ctaLabel?: string;
  image: string;
  icon: React.ReactNode;
}

const servicesData: Record<string, ServiceContent> = {
  emergency: {
    title: "24x7 Emergency Services",
    description:
      "Equipped to manage all types of Trauma, Medical Queries, or Surgical emergencies.",
    longDescription:
      "Popular Hospital provides round-the-clock emergency medical services with a team of highly qualified doctors and paramedics. Our emergency department is equipped with state-of-the-art life-saving equipment and facilities to handle critical cases including trauma, cardiac emergencies, and stroke.",
    features: [
      "24/7 Availability of Trauma Specialists",
      "Advanced Life Support Ambulances",
      "Dedicated Triage Area",
      "Immediate access to diagnostic services",
      "Specialized care for Cardiac & Neurological emergencies",
    ],
    image: "/images/facilities/08.jpeg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  "blood-bank": {
    title: "24x7 Blood Bank Services",
    description:
      "Equipped with an ultramodern collection centre and component lab.",
    longDescription:
      "Our 24-hour Blood Bank is a vital part of Popular Hospital, ensuring that safe blood and blood components are always available for patients. We follow stringent quality control measures for collection, testing, and storage of blood.",
    features: [
      "24/7 Blood availability",
      "Advanced Component Separation Lab",
      "Single Donor Plateletpheresis (SDP)",
      "AABB and NABH Standard protocols",
      "Strict screening for infections",
    ],
    image: "/images/departments-images/pathology.jpeg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  ambulance: {
    title: "24x7 Ambulance Services",
    description:
      "Advanced life support ambulances and air ambulance connectivity.",
    longDescription:
      "Popular Hospital provides a fleet of well-equipped ambulances designed to deliver rapid response for medical emergencies. From basic life support to advanced cardiac care on wheels, we ensure that the patient receives immediate medical attention during transit.",
    features: [
      "Advanced Cardiac Life Support (ACLS)",
      "Basic Life Support (BLS)",
      "Ventilator & Multipara Monitor Support",
      "Trained Doctors & Paramedics on board",
      "Air Ambulance connectivity for long-distance transit",
    ],
    image: "/images/hospital-sample.jpg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1"
        />
      </svg>
    ),
  },
  "diagnostics-and-imaging": {
    title: "Diagnostics & Imaging",
    description: "Advanced pathology and imaging services under one roof.",
    longDescription:
      "Our diagnostic wing is equipped with cutting-edge medical technology to provide accurate and timely results. From high-end pathology labs to advanced radiology including MRI, CT-Scan, and Ultrasound, we provide comprehensive diagnostic support.",
    features: [
      "Fully Automated Pathology Lab",
      "High-Resolution MRI & CT Scan",
      "Digital X-Ray & Mammography",
      "4D Ultrasound & Color Doppler",
      "Home Sample Collection Service",
    ],
    image: "/images/departments-images/radiology.jpeg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  "icu-service": {
    title: "Intensive Care Unit (ICU)",
    description:
      "Specialized intensive treatment and close monitoring for critical patients.",
    longDescription:
      "Popular Hospital features a world-class ICU facility designed to provide critical care to patients with life-threatening conditions. Our units are managed by experienced intensivists and specialized nursing staff 24/7.",
    features: [
      "Round-the-clock Monitoring",
      "Advanced Ventilator Support",
      "Dialysis Support in ICU",
      "Isolation Beds for critical infections",
      "1:1 Nursing care for critical cases",
    ],
    image: "/images/departments-images/neuro-surgery.jpeg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  "free-opd-offer": {
    title: "Free OPD and Offer",
    description:
      "Special OPD offers and free consultation updates at Popular Hospital.",
    longDescription:
      "Popular Hospital regularly introduces patient-friendly OPD offers to make quality healthcare more accessible. Patients can check current OPD schedules, fertility consultation availability, special camps, discounted packages, and limited-period healthcare offers before booking an appointment.",
    offerHighlights: [
      "Saturday: Chairman OPD",
      "IVF OPD: Mon-Fri",
      "Limited Slot: Book Now",
    ],
    features: [
      "Free OPD consultation updates",
      "Special healthcare camp information",
      "Limited-period consultation offers",
      "Affordable diagnostic and health package guidance",
      "Easy online appointment support",
    ],
    image: "/images/banners/health_packages.png",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 14l6-6m-5.5.5h.01m5 5h.01M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  "international-patients": {
    title: "International Patients",
    description:
      "Dedicated assistance for international patients planning treatment at Popular Hospital.",
    longDescription:
      "Popular Hospital supports international patients with coordinated medical guidance, treatment planning, appointment assistance, documentation support, and comfortable care throughout their healthcare journey in Varanasi. From the first medical query to post-treatment follow-up, our team helps patients connect with the right specialists and manage every important step with clarity.",
    features: [
      "Pre-arrival medical opinion and treatment plan",
      "Specialist appointment and admission coordination",
      "Transparent package estimate before travel",
      "Interpreter and family support guidance when required",
      "Discharge summary and follow-up coordination",
      "Dedicated contact point throughout the journey",
    ],
    whyChoose: [
      {
        title: "Trusted multi-speciality care",
        description:
          "Patients can access experienced specialists across fertility, orthopedics, general surgery, diagnostics, critical care, and other major departments under one hospital network.",
      },
      {
        title: "Affordable treatment planning",
        description:
          "The team shares clear treatment estimates and package guidance before arrival, helping families compare cost, duration, and expected hospital stay.",
      },
      {
        title: "Faster access to doctors",
        description:
          "International patients receive coordinated appointment planning so consultations, diagnostics, admission, and procedures can be scheduled efficiently.",
      },
      {
        title: "Comfort for patients and attendants",
        description:
          "Support is planned around both the patient and family, including travel help, stay guidance, hospital navigation, and post-treatment communication.",
      },
    ],
    costComparison: [
      {
        treatment: "IVF treatment",
        india: "Lower package cost with specialist fertility care",
        otherCountries: "Often significantly higher in USA and Europe",
        note: "Popular Hospital helps patients understand consultation, investigations, procedure, and follow-up costs before travel.",
      },
      {
        treatment: "Knee replacement",
        india: "Affordable surgical packages with hospital stay support",
        otherCountries: "High implant, surgeon, and hospital charges in many western countries",
        note: "Package guidance can include surgery planning, admission, diagnostics, and recovery support.",
      },
      {
        treatment: "Gallbladder surgery",
        india: "Cost-effective laparoscopic surgery options",
        otherCountries: "Emergency and elective surgery costs may be much higher abroad",
        note: "Patients receive estimate guidance for consultation, tests, surgery, room category, and discharge.",
      },
      {
        treatment: "Cardiac angioplasty",
        india: "More affordable cath lab procedure planning with cardiology support",
        otherCountries: "Stent, hospital, and cardiologist charges are often much higher",
        note: "Cost guidance can vary based on stent type, investigations, ICU stay, and overall cardiac condition.",
      },
      {
        treatment: "Cataract surgery",
        india: "Budget-friendly eye surgery options with lens choice guidance",
        otherCountries: "Procedure and lens package costs are commonly higher abroad",
        note: "Final estimate depends on lens category, pre-operative tests, and doctor recommendation.",
      },
      {
        treatment: "Hernia surgery",
        india: "Cost-effective open or laparoscopic surgery planning",
        otherCountries: "Operating room, surgeon, mesh, and recovery charges can be significantly higher",
        note: "Package guidance can include consultation, diagnostics, mesh selection, admission, and discharge planning.",
      },
      {
        treatment: "Dental implant",
        india: "Affordable implant treatment with dental specialist consultation",
        otherCountries: "Implant and prosthetic costs are often substantially higher",
        note: "Estimate depends on implant system, bone condition, scans, number of implants, and crown choice.",
      },
    ],
    treatmentPackages: [
      {
        title: "IVF Package",
        description:
          "Designed for couples seeking fertility care with structured consultation, investigation, treatment planning, and follow-up support.",
        inclusions: [
          "Fertility specialist consultation",
          "Pre-treatment investigation guidance",
          "Cycle planning and appointment coordination",
          "Follow-up support after the procedure",
        ],
      },
      {
        title: "Knee Replacement Package",
        description:
          "A planned orthopaedic pathway for patients with severe knee pain, arthritis, mobility restriction, or joint damage.",
        inclusions: [
          "Orthopaedic consultation and surgical opinion",
          "Pre-operative tests and fitness coordination",
          "Admission, surgery, and recovery planning",
          "Physiotherapy and follow-up guidance",
        ],
      },
      {
        title: "Gallbladder Surgery Package",
        description:
          "A focused surgical package for gallstones and gallbladder-related symptoms, usually planned with laparoscopic care where suitable.",
        inclusions: [
          "General surgery consultation",
          "Ultrasound and diagnostic support",
          "Laparoscopic surgery planning",
          "Discharge and diet guidance",
        ],
      },
    ],
    endToEndServices: [
      {
        title: "Visa Assistance",
        description:
          "Guidance for medical visa documentation, hospital invitation support, and required treatment papers.",
        image: "/images/download/international_patient_img/visa_assistance.jpg",
      },
      {
        title: "Airport Pickup",
        description:
          "Pickup coordination can be arranged for patients and attendants arriving for planned treatment.",
        image: "/images/download/international_patient_img/airport_pickup.jpg",
      },
      {
        title: "Hotel Stay",
        description:
          "Stay guidance near the hospital helps families choose convenient accommodation during treatment and recovery.",
        image: "/images/download/international_patient_img/hotel_stay.jpg",
      },
      {
        title: "Hospital Journey Support",
        description:
          "Assistance with appointments, admission, billing guidance, discharge process, and follow-up communication.",
        image:
          "/images/download/international_patient_img/hospital_journey_support.jpg",
      },
    ],
    coordinatorSupport: [
      "Single contact point for patient query, documents, and appointments",
      "Coordination with doctors, diagnostics, admission desk, and billing team",
      "Treatment estimate sharing and package clarification",
      "Help for attendants with local stay, pickup, and hospital navigation",
      "Post-discharge follow-up coordination through phone or online communication",
    ],
    patientRegions: [
      {
        title: "Bangladesh",
        description:
          "Dedicated coordination for patients travelling from Bangladesh for consultation, surgery, diagnostics, and follow-up care in Varanasi.",
        points: [
          "Pre-arrival medical opinion from shared reports",
          "Appointment, admission, and estimate assistance",
          "Family stay and local hospital navigation support",
          "Follow-up care coordination after return",
        ],
      },
      {
        title: "Africa",
        description:
          "End-to-end support for patients from African countries seeking specialist treatment, planned surgery, diagnostics, and recovery care at Popular Hospital.",
        points: [
          "Specialist consultation and treatment roadmap",
          "Visa, travel, and document guidance",
          "Multi-speciality treatment and package support",
          "Post-treatment communication with coordinators",
        ],
      },
      {
        title: "Middle East",
        description:
          "Personalized treatment planning and hospital coordination for patients visiting from Middle East regions for advanced, affordable care.",
        points: [
          "Fast treatment plan and estimate assistance",
          "Priority appointment coordination",
          "Transparent package information for families",
          "Comfort-focused hospital and stay support",
        ],
      },
    ],
    ctaLabel: "Get Treatment Plan in 24 Hours",
    image: "/images/banners/health_packages.png",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h18M3 19h18M4 12h16M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18"
        />
      </svg>
    ),
  },
  pharmacy: {
    title: "24x7 In-House Pharmacy",
    description:
      "A fully stocked pharmacy providing genuine medicines around the clock.",
    longDescription:
      "Our 24/7 in-house pharmacy ensures that all prescribed medicines and surgical items are readily available to our patients. We prioritize genuine quality and maintain a wide stock of domestic and international life-saving drugs.",
    features: [
      "24/7 Availability",
      "Computerized Billing System",
      "Proper Cold Chain maintenance",
      "Expert Pharmacists for guidance",
      "Genuine & High-quality Stock",
    ],
    image: "/images/facilities/09.jpeg",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Popular Hospital`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) notFound();

  const isFreeOpdOffer = slug === "free-opd-offer";
  const isPopularFindsService =
    slug === "international-patients" || isFreeOpdOffer;
  const hasCompactHero = isFreeOpdOffer || slug === "international-patients";
  const hideServicesSidebar =
    slug === "international-patients" || isFreeOpdOffer;

  return (
    <div
      className={`bg-[#f8fafc] min-h-screen ${isPopularFindsService ? "font-jakarta" : ""}`}
    >
      {/* ═══════ HERO ═══════ */}
      <section
        className={`relative w-full bg-[#1a2b3c] overflow-hidden flex items-center ${hasCompactHero
          ? "min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] py-8 md:py-10 xl:py-6 2xl:py-12"
          : "h-[350px] md:h-[400px]"
          }`}
      >
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className={`font-black text-white mb-4 font-heading tracking-tight leading-tight ${hasCompactHero
                ? "text-3xl sm:text-4xl md:text-5xl xl:text-3xl 2xl:text-5xl"
                : "text-4xl md:text-5xl lg:text-6xl"
                }`}
            >
              {service.title}
            </h1>
            <nav
              className="flex max-w-full flex-wrap items-center gap-y-1 text-sm md:text-base text-white/90 font-medium"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-blue-300 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link
                href="/services"
                className="hover:text-blue-300 transition-colors"
              >
                Services
              </Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">{service.title}</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div
            className={`${isPopularFindsService ? "space-y-14 sm:space-y-16" : "space-y-12"} ${hideServicesSidebar ? "lg:col-span-12" : "lg:col-span-8"
              }`}
          >
            {!hasCompactHero && (
              <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Detailed Content */}
            <div
              className={
                isPopularFindsService
                  ? ""
                  : "bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-100"
              }
            >
              <h2 className="text-3xl font-bold text-[#0b1c43] mb-4 font-heading">
                Overview
              </h2>
              <div
                className={
                  isPopularFindsService
                    ? "max-w-none space-y-12 sm:space-y-14 lg:space-y-16"
                    : "max-w-none space-y-10 sm:space-y-12"
                }
              >
                <p className="max-w-5xl text-gray-600 text-lg leading-relaxed">
                  {service.longDescription}
                </p>

                {service.offerHighlights && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {service.offerHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="group relative min-h-[150px] overflow-hidden rounded-[24px] border border-[#ffd9cc] bg-white p-5 shadow-[0_18px_46px_-34px_rgba(15,23,42,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-36px_rgba(232,82,34,0.65)]"
                      >
                        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#E85222]" />
                        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#fff1ec]" />

                        <div className="relative flex items-start justify-between gap-4">
                          <span className="rounded-full bg-[#fff4ef] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#E85222]">
                            Offer {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E85222] text-white shadow-[0_12px_24px_-14px_rgba(232,82,34,0.9)]">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3M5 11h14M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                              />
                            </svg>
                          </div>
                        </div>

                        <p className="relative mt-7 text-lg font-black leading-snug text-[#0b1c43]">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {service.whyChoose && (
                  <section>
                    <div className="mb-5">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#E85222]">
                        Why Choose Popular Hospitals?
                      </p>
                      <h3 className="font-heading text-3xl font-black text-[#0b1c43]">
                        International care with clarity, comfort, and trust
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {service.whyChoose.map((item, idx) => (
                        <div
                          key={item.title}
                          className="group relative min-h-[190px] overflow-hidden rounded-[24px] border border-[#f2d9cf] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc8b6] hover:shadow-[0_26px_60px_-38px_rgba(232,82,34,0.55)] sm:p-6"
                        >
                          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#fff1ec] transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#E85222] via-[#f59f7d] to-[#1e3a8a] opacity-90" />

                          <div className="relative flex h-full flex-col">
                            <div className="mb-5 flex items-center justify-between gap-4">
                              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2ec] text-[#E85222] ring-1 ring-[#ffd6c8] transition-colors duration-300 group-hover:bg-[#E85222] group-hover:text-white">
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.4}
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </span>
                              <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-black text-slate-400 ring-1 ring-slate-100">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <h4 className="mb-3 font-jakarta text-xl font-black leading-snug text-[#0b1c43]">
                              {item.title}
                            </h4>
                            <p className="text-sm font-semibold leading-7 text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {service.costComparison && (
                  <section className="rounded-3xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
                    <div className="mb-5">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#284a91]">
                        Cost Comparison
                      </p>
                      <h3 className="font-heading text-3xl font-black text-[#0b1c43]">
                        India vs USA and European countries
                      </h3>
                      <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                        India is often preferred by international patients for
                        quality care at a more affordable treatment cost. Final
                        estimates depend on diagnosis, room category, implants,
                        investigations, and doctor advice.
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
                      <div className="hidden grid-cols-[1fr_1fr_1fr] bg-[#0b1c43] text-sm font-black uppercase tracking-wider text-white md:grid">
                        <div className="p-4">Treatment</div>
                        <div className="p-4">India</div>
                        <div className="p-4">Other Countries</div>
                      </div>
                      {service.costComparison.map((row) => (
                        <div
                          key={row.treatment}
                          className="grid gap-3 border-t border-slate-100 p-4 md:grid-cols-[1fr_1fr_1fr]"
                        >
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400 md:hidden">
                              Treatment
                            </p>
                            <p className="font-black text-[#0b1c43]">
                              {row.treatment}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400 md:hidden">
                              India
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-700">
                              {row.india}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400 md:hidden">
                              Other Countries
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-700">
                              {row.otherCountries}
                            </p>
                            <p className="mt-2 text-xs font-medium leading-5 text-gray-500">
                              {row.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {service.treatmentPackages && (
                  <section>
                    <div className="mb-5">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#E85222]">
                        Treatment Packages
                      </p>
                      <h3 className="font-heading text-3xl font-black text-[#0b1c43]">
                        Planned care for popular international treatments
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                      {service.treatmentPackages.map((pack) => (
                        <div
                          key={pack.title}
                          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                        >
                          <h4 className="mb-3 font-heading text-2xl font-black text-[#0b1c43]">
                            {pack.title}
                          </h4>
                          <p className="mb-5 text-sm font-medium leading-6 text-gray-600">
                            {pack.description}
                          </p>
                          <div className="space-y-3">
                            {pack.inclusions.map((item) => (
                              <div key={item} className="flex gap-3">
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E85222] text-xs font-black text-white">
                                  ✓
                                </span>
                                <span className="text-sm font-semibold leading-6 text-gray-700">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {service.endToEndServices && (
                  <section>
                    <div className="mb-5">
                      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#284a91]">
                        End to End Services
                      </p>
                      <h3 className="font-heading text-3xl font-black text-[#0b1c43]">
                        From visa guidance to hotel stay support
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {service.endToEndServices.map((item, idx) => (
                        <div
                          key={item.title}
                          className="flex overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                        >
                          <div className="relative min-h-[150px] w-32 shrink-0 overflow-hidden bg-slate-100 sm:w-40">
                            <Image
                              src={
                                item.image || "/images/international_patients.png"
                              }
                              alt={item.title}
                              fill
                              className="h-full w-full object-cover"
                              sizes="160px"
                            />
                            <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#E85222] font-heading text-xs font-black text-white shadow-sm">
                              {idx + 1}
                            </span>
                          </div>
                          <div className="p-5">
                            <h4 className="mb-1 text-lg font-black text-[#0b1c43]">
                              {item.title}
                            </h4>
                            <p className="text-sm font-medium leading-6 text-gray-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {service.coordinatorSupport && (
                  <section className="overflow-hidden rounded-[28px] border border-[#f4ded5] bg-[#fffaf7] shadow-[0_22px_60px_-42px_rgba(124,45,18,0.5)]">
                    <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative overflow-hidden bg-[#fff3ec] p-7 text-[#0b1c43] sm:p-8 lg:p-10">
                        <div className="absolute inset-0 bg-[linear-gradient(140deg,#fff8f4_0%,#fff1e9_54%,#e9fbf7_130%)]" />
                        <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#E85222]/14 blur-3xl" />
                        <div className="absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-hospital-teal/12 blur-3xl" />
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#E85222] via-[#f59f7d] to-hospital-teal" />
                        <div className="relative flex h-full flex-col justify-between gap-10">
                          <div>
                            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#E85222]">
                              Dedicated Coordinators
                            </p>
                            <h3 className="font-jakarta text-3xl font-black leading-tight text-[#1e3a8a] sm:text-4xl">
                              Hospital support designed around the patient journey
                            </h3>
                            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-slate-600">
                              A single support flow helps international patients
                              manage documents, appointments, estimates, and
                              hospital coordination with clarity.
                            </p>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            <div className="rounded-2xl border border-[#ffd8cb] bg-white p-4 shadow-sm">
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E85222]">
                                Support Desk
                              </p>
                              <p className="mt-2 font-jakarta text-2xl font-black text-[#1e3a8a]">
                                One Point Contact
                              </p>
                            </div>
                            <div className="rounded-2xl border border-[#cfeee7] bg-white p-4 shadow-sm">
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-hospital-teal">
                                Response Flow
                              </p>
                              <p className="mt-2 font-jakarta text-2xl font-black text-[#1e3a8a]">
                                End-to-End Help
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5 sm:p-6 lg:p-8">
                        <div className="space-y-4">
                          {service.coordinatorSupport.map((item, idx) => (
                            <div
                              key={item}
                              className="group relative flex gap-4 rounded-2xl border border-[#f4ded5] bg-[#fffdfb] p-4 shadow-[0_10px_28px_-26px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffc6b6] hover:bg-white hover:shadow-[0_20px_46px_-34px_rgba(232,82,34,0.42)]"
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1eb] font-jakarta text-sm font-black text-[#E85222] ring-1 ring-[#ffd3c3] transition-colors group-hover:bg-[#E85222] group-hover:text-white">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-bold leading-6 text-[#1e293b]">
                                  {item}
                                </p>
                              </div>
                              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-hospital-teal/30 transition-colors group-hover:bg-hospital-teal" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <section className="border-t border-slate-100 pt-8 sm:pt-10">
                  <h3 className="text-2xl font-bold text-[#0b1c43] mb-5 font-heading">
                    Key Features & Specialist Care
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Helpline Section */}
            <div className="bg-gradient-to-br from-hospital-teal to-[#164e63] rounded-3xl p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-heading">
                  Need Urgent Assistance?
                </h3>
                <p className="text-teal-100">
                  Contact our 24/7 dedicated helpline for immediate support.
                </p>
              </div>
              <a
                href="tel:+917800001895"
                className="flex items-center gap-4 bg-white text-hospital-teal px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.82-6.62-6.65l1.97-1.57c.26-.26.35-.63.24-1.01a17.9 17.9 0 01-.56-3.53.995.995 0 00-1-1H4.05c-.55 0-1.05.52-1.05 1.15 0 9.05 7.6 16.9 16.9 16.9.55 0 1.15-.5 1.15-1.05v-3.95c0-.55-.52-1.05-1.04-1.05z" />
                </svg>
                {service.ctaLabel || "+91-7800001895 / 96"}
              </a>
            </div>
          </div>

          {!hideServicesSidebar && (
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 sticky top-28">
                <h3 className="text-xl font-bold text-[#0b1c43] mb-6 font-heading border-b border-slate-100 pb-4">
                  Other 24x7 Services
                </h3>
                <div className="space-y-3">
                  {Object.entries(servicesData).map(([sSlug, sContent]) => {
                    const isActive = sSlug === slug;
                    return (
                      <Link
                        key={sSlug}
                        href={`/services/${sSlug}`}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all border-2 group ${isActive
                          ? "border-[#E85222]/40 bg-white shadow-sm ring-4 ring-[#E85222]/5"
                          : "bg-white border-slate-50 hover:border-[#E85222]/20 hover:bg-slate-50/50"
                          }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive
                            ? "bg-[#E85222]/10 text-[#E85222]"
                            : "bg-slate-50 text-slate-400 group-hover:bg-[#E85222]/5 group-hover:text-[#E85222]"
                            }`}
                        >
                          <div className="w-6 h-6 flex items-center justify-center">
                            <svg
                              className="w-full h-full"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              {/* @ts-ignore */}
                              {sContent.icon.props.children}
                            </svg>
                          </div>
                        </div>
                        <span
                          className={`text-[15px] leading-tight transition-colors ${isActive
                            ? "text-[#E85222] font-black"
                            : "text-slate-700 font-bold group-hover:text-[#E85222]"
                            }`}
                        >
                          {sContent.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-10 p-6 bg-hospital-navy rounded-2xl text-white">
                  <h4 className="font-bold mb-4">Book an Appointment</h4>
                  <p className="text-sm text-slate-300 mb-6">
                    Schedule your visit with our specialists today.
                  </p>
                  <Link
                    href="/book"
                    className="block text-center bg-hospital-orange py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
