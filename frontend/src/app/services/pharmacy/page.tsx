import { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceSection,
} from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Pharmacy | Popular Hospital",
  description:
    "100% authentic and genuine medicines available 24/7 under strict quality control to fulfill patient emergency needs.",
};

const textClass =
  "text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium";

const sections: ServiceSection[] = [
  {
    id: "commitment",
    title: "Our",
    highlight: "Commitment",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          Popular Hospital Pharmacy is situated in the campus of all the
          hospitals to facilitate patients fulfilling their emergency needs as
          well as the medicines as prescribed inside the hospital premises.
        </p>
        <p className={textClass}>
          In line with rules and regulations and under the strict supervision of
          authorities and the Drug Controller. We are committed to achieve and
          maintain excellent standards of pharmaceutical care to deliver the
          right medicines with best price. We continually seek ways to improve
          our offering and services, what we deliver to our clients.
        </p>
      </div>
    ),
    image: "/images/departments-images/pharmacy.jpg",
    imgAlt: "Hospital pharmacy shelves",
  },
  {
    id: "quality",
    title: "Authentic and Genuine",
    highlight: "Medicines",
    eyebrow: "Quality Control",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          We believe in providing high quality, authentic and 100% genuine
          products to our customers. We have highly skilled and qualified
          employees who regularly perform the quality check.
        </p>
        <p className={textClass}>
          All the medicines and other health care products being sold at Popular
          Medical Stores are purchased from their authorized companies and its
          distributors. This rules out spurious, duplicate, and expired drugs
          completely for safe-guarding the interest and health of customers.
        </p>
      </div>
    ),
    image: "/images/banners/pharmacy_24_bg.avif",
    imgAlt: "Pharmacy medicine counter",
  },
  {
    id: "inventory",
    title: "Centrally Managed",
    highlight: "Inventory",
    eyebrow: "Availability",
    content: (
      <p className={textClass}>
        Our entire inventory is centrally managed by highly skilled workers.
        These skilled and qualified workers are dedicated to maintain sufficient
        stock, dispose of any damaged/expired medicines and other inventory
        control processes.
      </p>
    ),
  },
];

export default function PharmacyPage() {
  return (
    <ServiceDetailPage
      title="Pharmacy"
      breadcrumb="Pharmacy"
      heroImage="/images/banners/pharmacy.png"
      heroAlt="Pharmacy"
      sections={sections}
      cta={{
        title: "Need medicines or pharmacy support?",
        description:
          "Our pharmacy team supports patients with genuine medicines and prompt service inside the hospital premises.",
        label: "+91-7800001895",
        href: "tel:+917800001895",
        eyebrow: "Popular Hospital Pharmacy",
      }}
    />
  );
}
