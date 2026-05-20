import { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceSection,
} from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Home Care Services | Popular Hospital",
  description:
    "Providing genuine health care beyond the four walls of a hospital with expert medical advice and 24x7 nursing care at home.",
};

const textClass =
  "text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium";
const listClass = "space-y-3 text-sm lg:text-base text-gray-700 font-medium";

const serviceList = (items: string[]) => (
  <ul className={listClass}>
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <span aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const sections: ServiceSection[] = [
  {
    id: "overview",
    title: "Care at Your",
    highlight: "Doorstep",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          With the introduction of Home Care Services, Popular Hospital has
          focused on providing quality care at the comfort of your doorsteps
          with an aim to making healthcare more affordable as well as convenient
          to the consumer.
        </p>
        <p className={textClass}>
          Many patients struggle to get to the hospitals, and this initiative
          helps crucial medical services reach more individuals without the
          hassle of regular travel.
        </p>
      </div>
    ),
    image: "/images/departments-images/home_care_nurse_patient.png",
    imgAlt: "Nurse helping elderly patient at home",
  },
  {
    id: "holistic-care",
    title: "Professional Medical Support",
    highlight: "at Home",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          Our services include doctor consultations for expert medical advice,
          24/7 nursing care for continuous monitoring, physiotherapy sessions to
          aid recovery and mobility, and blood sample collection at home for
          timely diagnosis.
        </p>
        <p className={textClass}>
          This is not merely a service but a genuine effort by Popular Hospital
          to offer caring health care beyond the four walls of a hospital.
        </p>
      </div>
    ),
    image: "/images/departments-images/doctors-emergency.jpg",
    imgAlt: "Doctor consultation support",
  },
  {
    id: "doctor-consultation",
    title: "Doctor",
    highlight: "Consultation",
    content: serviceList([
      "Doctor visit at home on appointment",
      "Doctor video call consultation",
      "Dietitian services on video call",
    ]),
  },
  {
    id: "nursing-care",
    title: "24x7 Nursing",
    highlight: "Care",
    content: serviceList([
      "Elderly care at home",
      "Wound care",
      "Urinary catheterisation",
      "Suture removal",
      "Basic IV procedure",
      "Vaccinations-injection services",
      "Bed sore assistance and management",
      "Regular monitoring of vitals",
      "Ryle's tube insertion and feeding",
    ]),
    image: "/images/departments-images/home_care_nurse_patient.png",
    imgAlt: "Nursing care at home",
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    highlight: "Therapy",
    content: serviceList([
      "Orthopaedic injuries",
      "Sports injuries",
      "Back and neck pain",
      "Fall prevention for elders",
    ]),
  },
  {
    id: "sample-collection",
    title: "Blood Sample",
    highlight: "Collection",
    content: serviceList([
      "Lab test at home",
      "ECG at home",
      "General health checkup",
      "Senior citizen health packages",
    ]),
    image: "/images/departments-images/pathology.jpeg",
    imgAlt: "Blood sample collection",
  },
  {
    id: "support-services",
    title: "Support",
    highlight: "Services",
    content: serviceList([
      "Vaccination (routine and seasonal at home)",
      "24x7 ambulance services",
      "Medicine services at door step",
    ]),
  },
];

export default function HomeCarePage() {
  return (
    <ServiceDetailPage
      title="Home Care Services"
      breadcrumb="Home Care"
      heroImage="/images/banners/home_care_services.png"
      heroAlt="Home Care"
      sections={sections}
      cta={{
        title: "Need care at home?",
        description:
          "Call Popular Hospital to arrange home care support, nursing care, consultations or sample collection.",
        label: "+91-7800001895",
        href: "tel:+917800001895",
        eyebrow: "Home Care Support",
      }}
    />
  );
}
