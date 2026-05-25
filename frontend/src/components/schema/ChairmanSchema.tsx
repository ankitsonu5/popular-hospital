export default function ChairmanSchema() {
  const chairmanSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": "https://www.popularhospital.in/about/chairman-desk#chairman",
      name: "Dr. A.K. Kaushik",
      jobTitle: "Chairman",
      honorificPrefix: "Dr.",
      description:
        "Founder & Chairman of Popular Hospital, Varanasi. MBBS, MS (Gen. Surgery) from Institute of Medical Sciences, BHU, Varanasi. Leading Popular Group of Hospitals with a vision for excellence in modern healthcare.",
      image: "https://www.popularhospital.in/images/dr_ak_kaushik.png",
      url: "https://www.popularhospital.in/about/chairman-desk",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Institute of Medical Sciences, BHU, Varanasi",
      },
      worksFor: {
        "@type": "Hospital",
        name: "Popular Hospital",
        url: "https://www.popularhospital.in",
        address: {
          "@type": "PostalAddress",
          streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          postalCode: "221004",
          addressCountry: "IN",
        },
      },
      knowsAbout: ["General Surgery", "Hospital Administration", "Healthcare Management"],
      sameAs: ["https://www.popularhospital.in/doctors/dr-a-k-kaushik"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(chairmanSchema),
      }}
    />
  );
}
