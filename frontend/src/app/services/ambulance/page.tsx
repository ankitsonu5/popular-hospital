import { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceSection,
} from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Ambulance Services | Popular Hospital",
  description:
    "24 hrs Ambulance pickup service available all the way from anywhere in Varanasi ensuring fast and prompt transport to our Emergency Team.",
};

const textClass =
  "text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium";

const sections: ServiceSection[] = [
  {
    id: "department",
    title: "Department of",
    highlight: "Ambulance",
    content: (
      <div className="space-y-4">
        <div className="inline-flex rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-[#284a91]">
          For Ambulance Service in Varanasi, Call at +91-9519999280
        </div>
        <h3 className="text-base font-bold text-[#284a91] lg:text-lg">
          Meet the World's Best Doctors or Consultant
        </h3>
        <p className={textClass}>
          Popular Hospital provides prompt emergency transport support so
          patients can reach the Emergency Team with minimum delay.
        </p>
        <p className={textClass}>
          The nearest ambulance available in your locality will be rushed to
          your place, wherever you are, to bring your patient directly to
          Popular Hospital in the shortest possible time.
        </p>
        <p className={textClass}>
          While the patient is on the way, the Emergency Team at Popular
          Hospital prepares the ICU bed, O.T. and other critical support so that
          little time is lost after reaching the hospital.
        </p>
      </div>
    ),
    image: "/images/departments-images/ambulance_department.jpg",
    imgAlt: "Ambulance service",
  },
  {
    id: "best-hospitals",
    title: "Rated as One of Varanasi's Best",
    highlight: "Hospitals",
    eyebrow: "Why patients like Popular Hospital",
    content: (
      <p className={textClass}>
        Popular Hospital is backed by round-the-clock departments, prompt
        emergency response, specialist doctors and diagnostic support that helps
        reduce waiting time and improve treatment decisions during urgent care.
      </p>
    ),
    image: "/images/departments-images/ambulance_department_img.jpg",
    imgAlt: "Emergency medical team",
  },
  {
    id: "safest-hospital",
    title: "Safest Hospital for",
    highlight: "Any Operation",
    content: (
      <p className={textClass}>
        Popular Hospital has advanced operation theatre infrastructure and
        trained post-operative care teams, helping patients remain under the
        best care of doctors and nurses after surgery.
      </p>
    ),
    image: "/images/departments-images/safest_hospital.jpg",
    imgAlt: "Hospital operation theatre",
  },
  {
    id: "specialists-round-clock",
    title: "Specialist Doctors Round",
    highlight: "the Clock",
    content: (
      <p className={textClass}>
        With multiple medical departments and in-house specialist doctors,
        complications during a patient's stay can be handled quickly by the
        relevant team at Popular Hospital.
      </p>
    ),
    image: "/images/departments-images/ambulance_doctor.jpg",
    imgAlt: "Doctor near ambulance",
    imageClassName: "min-h-[300px] md:min-h-[380px] lg:min-h-[420px] lg:h-full",
  },
];

export default function AmbulancePage() {
  return (
    <ServiceDetailPage
      title="Ambulance"
      breadcrumb="Ambulance"
      heroImage="/images/banners/ambulance.png"
      heroAlt="Ambulance Services"
      sections={sections}
      cta={{
        title: "Need an Ambulance Now?",
        description:
          "Call our 24/7 emergency dispatch line directly for fast ambulance support in Varanasi.",
        label: "+91-9519999280",
        href: "tel:+919519999280",
        eyebrow: "24/7 Ambulance Dispatch",
      }}
    />
  );
}
