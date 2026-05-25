export default function HospitalSchema() {
  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": "https://www.popularhospital.in/#hospital",
    name: "Popular Hospital",
    legalName: "POPULAR HOSPITAL",
    alternateName: [
      "Popular Hospital Varanasi",
      "Best Hospital in Varanasi",
      "Top Hospital in Varanasi",
      "Best Multi Super Speciality Hospital in Varanasi",
    ],
    url: "https://www.popularhospital.in/",
    logo: "https://www.popularhospital.in/logo.png",
    image: "https://www.popularhospital.in/logo.png",
    description:
      "Popular Hospital (a unit of POPULAR MEDICARE LTD) is the best and top multi super speciality hospital in Varanasi with 450+ beds, 28 departments, and 100+ expert doctors offering 24/7 emergency care, cashless treatment, and advanced medical services.",
    telephone: ["+91-7800001895", "+91-7800001896"],
    email: "info@popularhospital.in",
    priceRange: "$$",
    numberOfBeds: 450,
    foundingDate: "1996",
    founder: {
      "@type": "Person",
      name: "Dr. A.K. Kaushik",
      jobTitle: "Chairman",
      url: "https://www.popularhospital.in/about/chairman-desk",
      image: "https://www.popularhospital.in/images/dr_ak_kaushik.png",
    },
    medicalSpecialty: [
      "Cardiology",
      "Cardiothoracic & Vascular Surgery",  
      "Neurosurgery",
      "Gastroenterology",
      "Nephrology",
      "Oncology",
      "Urology",
      "Burns & Plastic Surgery",
      "Interventional Radiology",
      "Pediatric Surgery",
      "Pediatric Cardiology",
      "Orthopedics",
      "General Medicine",
      "IVF & Fertility",
      "ENT",
      "Ophthalmology",
      "Dental",
      "Respiratory Medicine",
      "Psychiatry"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221004",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2927719,
      longitude: 82.970505
    },
    areaServed: [
      "Varanasi",
      "Eastern Uttar Pradesh",
      "Bihar",
      "Jharkhand",
      "Chhattisgarh",
      "Madhya Pradesh"
    ],
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
          "Sunday"
        ],
        opens: "00:00",
        closes: "23:59"
      }
    ],
    availableService: [
      {
        "@type": "MedicalService",
        name: "Emergency And Trauma Care",
        serviceType: "24/7 Emergency Care"
      },
      {
        "@type": "MedicalService",
        name: "Blood Bank"
      },
      {
        "@type": "MedicalService",
        name: "Ambulance"
      },
      {
        "@type": "MedicalService",
        name: "Preventive Health Check Up"
      },
      {
        "@type": "MedicalService",
        name: "Pharmacy"
      },
      {
        "@type": "MedicalService",
        name: "Pathological Services"
      },
      {
        "@type": "MedicalService",
        name: "Radiological Services"
      },
      {
        "@type": "MedicalService",
        name: "Home Care Services"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Popular Hospital Healthcare Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalService",
            name: "Book an Appointment",
            url: "https://www.popularhospital.in/book-an-appointment"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalService",
            name: "Find a Doctor",
            url: "https://www.popularhospital.in/doctors"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalService",
            name: "Health Packages",
            url: "https://www.popularhospital.in/health-packages"
          }
        }
      ]
    },
    isAcceptingPatients: true,
    sameAs: [
      "https://www.popularhospital.in/",
      "https://www.facebook.com/popularhospitals",
      "https://www.instagram.com/popularhospitals",
      "https://www.linkedin.com/company/popularhospitals",
      "https://www.youtube.com/@popularhospitals"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(hospitalSchema),
      }}
    />
  );
}
