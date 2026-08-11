interface MedicalWebPageSchemaProps {
  urlSlug: string;
  name: string;
  description: string;
  specialtyName: string;
  reviewerName: string;
  dateReviewed: string;
}

export default function MedicalWebPageSchema({
  urlSlug,
  name,
  description,
  specialtyName,
  reviewerName,
  dateReviewed,
}: MedicalWebPageSchemaProps) {
  const url = `https://www.popularhospital.in/departments/${urlSlug}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url: url,
    name: name,
    description: description,
    about: {
      "@type": "MedicalSpecialty",
      name: specialtyName,
    },
    specialty: {
      "@type": "MedicalSpecialty",
      name: specialtyName,
    },
    audience: {
      "@type": "Patient",
    },
    lastReviewed: dateReviewed,
    reviewedBy: {
      "@type": "Physician",
      name: reviewerName,
    },
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "main",
    },
    isPartOf: {
      "@id": "https://www.popularhospital.in/#hospital",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
