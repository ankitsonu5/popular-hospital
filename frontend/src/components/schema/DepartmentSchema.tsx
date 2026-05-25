interface DepartmentSchemaProps {
  name: string;
  description: string;
  urlSlug: string;
  medicalSpecialty?: string;
}

export default function DepartmentSchema({ 
  name,
  description,
  urlSlug,
  medicalSpecialty,
}: DepartmentSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `https://www.popularhospital.in/departments/${urlSlug}#medicalclinic`,
    name: name,
    description: description,
    url: `https://www.popularhospital.in/departments/${urlSlug}`,
    isAcceptingPatients: true,
    parentOrganization: {
      "@type": "Hospital",
      "@id": "https://www.popularhospital.in/#hospital",
      name: "Popular Hospital",
      url: "https://www.popularhospital.in/",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221004",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2927719,
      longitude: 82.970505,
    },
    telephone: ["+91-7800001895", "+91-7800001896"],
    image: "https://www.popularhospital.in/logo.png",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  if (medicalSpecialty) {
    schema.medicalSpecialty = `https://schema.org/${medicalSpecialty}`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
