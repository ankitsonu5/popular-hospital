import { Metadata } from "next";
import {
  ServiceDetailPage,
  type ServiceSection,
} from "../_components/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Pathology Services | Popular Hospital",
  description:
    "NABL Accredited Best Pathology & Microbiology Testing Laboratory equipped with world-class instruments.",
};

const textClass =
  "text-gray-700 leading-relaxed text-sm lg:text-base text-justify font-medium";

const listClass = "space-y-3 text-sm lg:text-base text-gray-700 font-medium";

const sections: ServiceSection[] = [
  {
    id: "department",
    title: "Department of",
    highlight: "Pathology",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          Popular Hospitals has its in-house state-of-the-art laboratory
          services, catering to all the needs of the patients, with the utmost
          integrity. Popular Clinical Laboratory offers 24x7 operational
          supports to the medical teams in the hospital.
        </p>
        <p className={textClass}>
          At Popular we believe, quality is never an accident; it is always the
          result of high intention, sincere effort, intelligent direction and
          skilful execution.
        </p>
      </div>
    ),
    image: "/images/departments-images/pathology.jpg",
    imgAlt: "Pathology laboratory",
  },
  {
    id: "testing-lab",
    title: "Best Pathology and Microbiology",
    highlight: "Testing Laboratory",
    eyebrow: "NABL Accredited",
    content: (
      <div className="space-y-4">
        <p className={textClass}>
          Popular Pathology Laboratory is committed to providing quality with
          care even in emergency situations. Popular hospitals unique and
          hi-tech laboratory has world-class instruments and well-trained,
          efficient staff.
        </p>
        <p className={textClass}>
          Popular Pathology Laboratory is accredited by the NABL (National
          Accreditation Board of Calibration, Testing Laboratory), giving
          patients dependable testing support round the clock.
        </p>
      </div>
    ),
    image: "/images/departments-images/pathology.jpeg",
    imgAlt: "Laboratory testing equipment",
  },
  {
    id: "scope",
    title: "Scope of",
    highlight: "Services",
    content: (
      <ul className={listClass}>
        {[
          "Immunology",
          "Biochemistry",
          "Hematology",
          "Clinical Pathology",
          "Serology",
          "Microbiology",
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "equipment",
    title: "Prominent",
    highlight: "Instruments",
    eyebrow: "Equipment",
    content: (
      <ul className={listClass}>
        {[
          "VITROSECi Immuno-diagnostic analyser (Johnson & Johnson)",
          "VITROS 250 Biochemistry analyser (Johnson & Johnson)",
          "CELL DYN 3700 Hematology analyser",
          "TURBOX PLUS Nephlometery analyser",
          "COASU 411 Urine analyser",
          "MICRO SHED ESR SYSTEM",
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
    image: "/images/departments-images/prominent_nstruments.jpg",
    imgAlt: "Pathology instruments",
  },
  {
    id: "quality-assurance",
    title: "Internal Quality",
    highlight: "Assurance",
    content: (
      <ul className={listClass}>
        {[
          "Quality control samples are run every day at pre-determined intervals before testing patient samples.",
          "Daily analysis of low, medium, and high level third-party controls before analyzing patient samples.",
          "Ideal blood collection via vacutainer system to avoid activation of clotting mechanism.",
          "Periodic calibration of machines and complete documentation of maintenance logs.",
          "A dual check of reports by qualified technical staff and final approval by Pathologist.",
          "A repeat of abnormal samples by different technologists.",
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
    image: "/images/departments-images/quality_assurance.webp",
    imgAlt: "Laboratory quality assurance",
  },
  {
    id: "external-quality",
    title: "External Quality",
    highlight: "Assessment Scheme",
    content: (
      <p className={textClass}>
        External quality assessment schemes are accepted around the world as
        invaluable tools for laboratories. Popular has a tie-up with BIORAD for
        analyzing hematology, biochemistry and immunology panels, improving
        laboratory performance, patient care and safety.
      </p>
    ),
  },
];

export default function PathologyPage() {
  return (
    <ServiceDetailPage
      title="Pathological Services"
      breadcrumb="Pathology"
      heroImage="/images/banners/services_pathology.png"
      heroAlt="Pathology Services"
      sections={sections}
      cta={{
        title: "Need pathology testing support?",
        description:
          "Our laboratory team provides reliable reporting and round-the-clock diagnostic support for patients and doctors.",
        label: "+91-7800001895",
        href: "tel:+917800001895",
        eyebrow: "Popular Clinical Laboratory",
      }}
    />
  );
}
