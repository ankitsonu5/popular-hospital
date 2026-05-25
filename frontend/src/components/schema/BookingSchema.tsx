export default function BookingSchema() {
  const bookingSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://www.popularhospital.in/book#booking",
    name: "Popular Hospital — Book Appointment",
    description:
      "Book OPD appointment online at Popular Hospital, Varanasi. Choose doctor, branch, preferred date, and time slot. Quick confirmation with 24/7 appointment support.",
    url: "https://www.popularhospital.in/book",
    image: "https://www.popularhospital.in/logo.png",
    telephone: ["+91-7800001895", "+91-7800001896"],
    isAcceptingPatients: true,
    availableService: {
      "@type": "MedicalProcedure",
      name: "OPD Consultation",
      howPerformed: "Online appointment booking with doctor selection",
      procedureType: "https://schema.org/NoninvasiveProcedure",
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book Appointment",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.popularhospital.in/book?doctor={doctor}",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "OPD Appointment Reservation",
      },
    },
    parentOrganization: {
      "@type": "Hospital",
      "@id": "https://www.popularhospital.in/#hospital",
      name: "Popular Hospital",
      url: "https://www.popularhospital.in",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.popularhospital.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Book Appointment",
        item: "https://www.popularhospital.in/book",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
