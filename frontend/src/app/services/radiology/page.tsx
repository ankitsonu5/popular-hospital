import { Metadata } from "next";
import Link from "next/link";
import {
  ServiceDetailPage,
  type ServiceSection,
} from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Radiological Services | Popular Hospital",
  description:
    "Advanced diagnostic imaging and radiological services at Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/services/radiology",
  },
};

const textClass =
  "text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium";

const sections: ServiceSection[] = [
  {
    id: "intro",
    title: "Department of Radiology and",
    highlight: "Imaging",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          Department of Radiology achieved a major milestone when the first CT
          scanner was installed in the hospital by SNS group. It was first of
          its kind in northern India and second in whole India.
        </p>
        <Link
          href="/book"
          className="inline-flex rounded-2xl bg-[#284a91] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0b1c43]"
        >
          Schedule an Appointment
        </Link>
      </div>
    ),
    image: "/images/departments-images/radiology_popular.jpg",
    imgAlt: "Doctor examining radiology scans",
  },
  {
    id: "department",
    title: "Advanced Radiology",
    highlight: "Services",
    content: (
      <p className={textClass}>
        Popular houses a vast imaging department with unique subdivisions which
        include conventional radiology, General Ultrasound, Fetal Medicine, CT,
        MRI and Interventional Radiology. All subdivisions are highly
        coordinated, equipped with latest technology and managed by expert
        consultants and trained technical personnel.
      </p>
    ),
    image: "/images/departments-images/radiology_scan.png",
    imgAlt: "Radiology scan equipment",
  },
  {
    id: "conventional-radiology",
    title: "Conventional",
    highlight: "Radiology",
    content: (
      <p className={textClass}>
        The department of conventional radiology is equipped with digital x-ray
        machines, fluoroscopy unit, high frequency x-ray machines, mammography
        machine and OPG x-ray machine. Portable radiography units are kept on
        each floor for patients who are too sick to come to the main department.
      </p>
    ),
    image: "/images/departments-images/radiology.jpg",
    imgAlt: "Radiology equipment",
  },
  {
    id: "interventional-radiology",
    title: "Interventional",
    highlight: "Radiology",
    content: (
      <p className={textClass}>
        Department of Interventional Radiology is equipped with latest Philips
        digital fluoroscopy angiography unit. Hepatobiliary, renal,
        gynaecological, neurological and cardiac interventions are carried out
        by experienced senior consultants.
      </p>
    ),
    image: "/images/departments-images/radiology.jpeg",
    imgAlt: "Interventional radiology care",
  },
  {
    id: "ultrasound",
    title: "General",
    highlight: "Ultrasound",
    content: (
      <p className={textClass}>
        The ultrasound division of the radiology department is one of the
        earliest ultrasound setups in the city. It is equipped with high-end
        resolution ultrasound Doppler machines and supports a high daily patient
        workload.
      </p>
    ),
  },
];

export default function RadiologicalServicesPage() {
  return (
    <ServiceDetailPage
      title="Radiological Services"
      breadcrumb="Radiology"
      heroImage="/images/banners/radiology_banner_services.png"
      heroAlt="Radiology Services"
      sections={sections}
      cta={{
        title: "Need diagnostic imaging?",
        description:
          "Book a radiology appointment for dependable imaging, reporting and specialist diagnostic support.",
        label: "+91-7800001895 / 96",
        href: "tel:+917800001895",
        eyebrow: "Radiology Appointment",
      }}
    />
  );
}
