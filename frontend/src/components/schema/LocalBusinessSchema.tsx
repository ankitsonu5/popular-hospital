export default function LocalBusinessSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",

    "@type": "Hospital",

    "@id": "https://www.popularhospital.in/#localbusiness",

    name: "Popular Hospital",

    alternateName: "Popular Hospital Varanasi",

    legalName: "POPULAR HOSPITAL",

    url: "https://www.popularhospital.in/",

    mainEntityOfPage: "https://www.popularhospital.in/",

    image: [
      "https://www.popularhospital.in/logo.png"
    ],

    logo: "https://www.popularhospital.in/logo.png",

    description:
      "Popular Hospital is a leading multi super speciality hospital in Varanasi offering advanced medical, surgical, diagnostics, ICU, emergency and trauma care services across Eastern Uttar Pradesh and nearby regions.",

    slogan: "Trusted care, proven outcomes",

    telephone: [
      "+91-7800001895",
      "+91-7800001896"
    ],

    email: "info@popularhospital.in",

    faxNumber: "+91-7800001896",

    foundingDate: "1996",

    numberOfBeds: 450,

    priceRange: "$$",

    currenciesAccepted: "INR",

    paymentAccepted: [
      "Cash",
      "UPI",
      "Credit Card",
      "Debit Card",
      "Net Banking"
    ],

    address: {
      "@type": "PostalAddress",

      streetAddress:
        "N-10/60, A-2, B.L.W. Road, Kakarmatta",

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

    hasMap:
      "https://www.google.com/maps/place/Popular+Hospital+Varanasi/@25.2932666,82.9691746,17z/data=!4m6!3m5!1s0x398e326d171ec8b9:0xf996b29293133cb9!8m2!3d25.2927719!4d82.970505!16s%2Fg%2F1hm46979f",

    areaServed: [
      {
        "@type": "City",
        name: "Varanasi"
      },
      {
        "@type": "State",
        name: "Uttar Pradesh"
      },
      {
        "@type": "State",
        name: "Bihar"
      },
      {
        "@type": "State",
        name: "Jharkhand"
      },
      {
        "@type": "State",
        name: "Chhattisgarh"
      },
      {
        "@type": "State",
        name: "Madhya Pradesh"
      }
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

    availableLanguage: [
      "English",
      "Hindi"
    ],

    contactPoint: [
      {
        "@type": "ContactPoint",

        telephone: "+91-7800001895",

        contactType: "customer support",

        areaServed: "IN",

        availableLanguage: [
          "English",
          "Hindi"
        ]
      },
      {
        "@type": "ContactPoint",

        telephone: "+91-7800001896",

        contactType: "emergency",

        areaServed: "IN",

        availableLanguage: [
          "English",
          "Hindi"
        ]
      }
    ],

    isAcceptingPatients: true,

    medicalSpecialty: [
      "Cardiology",
      "Neurology",
      "Nephrology",
      "Oncology",
      "Orthopedics",
      "Urology",
      "Gastroenterology",
      "Pediatrics",
      "Gynecology",
      "ENT",
      "Dental",
      "Plastic Surgery",
      "IVF & Fertility",
      "General Surgery"
    ],

    availableService: [
      {
        "@type": "MedicalService",
        name: "24/7 Emergency Care"
      },
      {
        "@type": "MedicalService",
        name: "Trauma Care"
      },
      {
        "@type": "MedicalService",
        name: "ICU & Critical Care"
      },
      {
        "@type": "MedicalService",
        name: "Diagnostics & Imaging"
      },
      {
        "@type": "MedicalService",
        name: "Ambulance Services"
      },
      {
        "@type": "MedicalService",
        name: "Blood Bank"
      },
      {
        "@type": "MedicalService",
        name: "Pharmacy"
      }
    ],

    department: [
      { "@type": "MedicalClinic", name: "Cardiology Department", url: "https://www.popularhospital.in/departments/cardiology" },
      { "@type": "MedicalClinic", name: "CTVS Department", url: "https://www.popularhospital.in/departments/ctvs" },
      { "@type": "MedicalClinic", name: "Neurosurgery Department", url: "https://www.popularhospital.in/departments/neurosurgery" },
      { "@type": "MedicalClinic", name: "Gastroenterology Department", url: "https://www.popularhospital.in/departments/gastroenterology" },
      { "@type": "MedicalClinic", name: "Nephrology Department", url: "https://www.popularhospital.in/departments/nephrology" },
      { "@type": "MedicalClinic", name: "Oncology Department", url: "https://www.popularhospital.in/departments/oncology" },
      { "@type": "MedicalClinic", name: "Urology Department", url: "https://www.popularhospital.in/departments/urology" },
      { "@type": "MedicalClinic", name: "Burns & Plastic Surgery", url: "https://www.popularhospital.in/departments/burns-plastic-surgery" },
      { "@type": "MedicalClinic", name: "Interventional Radiology", url: "https://www.popularhospital.in/departments/interventional-radiology" },
      { "@type": "MedicalClinic", name: "Pediatric Surgery", url: "https://www.popularhospital.in/departments/pediatric-surgery" },
      { "@type": "MedicalClinic", name: "Pediatric Cardiology", url: "https://www.popularhospital.in/departments/pediatric-cardiology" },
      { "@type": "MedicalClinic", name: "Orthopedics & Joint Replacement", url: "https://www.popularhospital.in/departments/orthopedics" },
      { "@type": "MedicalClinic", name: "General Medicine", url: "https://www.popularhospital.in/departments/general-medicine" },
      { "@type": "MedicalClinic", name: "Laparoscopy & General Surgery", url: "https://www.popularhospital.in/departments/general-surgery" },
      { "@type": "MedicalClinic", name: "Obstetrics & Gynaecology", url: "https://www.popularhospital.in/departments/gynaecology" },
      { "@type": "MedicalClinic", name: "Pediatrics & Neonatology", url: "https://www.popularhospital.in/departments/pediatrics" },
      { "@type": "MedicalClinic", name: "IVF & Fertility", url: "https://www.popularhospital.in/departments/ivf-fertility" },
      { "@type": "MedicalClinic", name: "ENT Department", url: "https://www.popularhospital.in/departments/ent" },
      { "@type": "MedicalClinic", name: "Ophthalmology", url: "https://www.popularhospital.in/departments/ophthalmology" },
      { "@type": "MedicalClinic", name: "Dental Department", url: "https://www.popularhospital.in/departments/dental" },
      { "@type": "MedicalClinic", name: "Respiratory Medicine", url: "https://www.popularhospital.in/departments/respiratory" },
      { "@type": "MedicalClinic", name: "Pain Management", url: "https://www.popularhospital.in/departments/pain-management" },
      { "@type": "MedicalClinic", name: "Psychiatry Department", url: "https://www.popularhospital.in/departments/psychiatry" },
      { "@type": "MedicalClinic", name: "Dietetics & Nutrition", url: "https://www.popularhospital.in/departments/dietetics-nutrition" },
      { "@type": "MedicalClinic", name: "Advanced Diabetic Foot Unit", url: "https://www.popularhospital.in/departments/diabetic-foot" },
      { "@type": "MedicalClinic", name: "Radiology Department", url: "https://www.popularhospital.in/departments/radiology" },
      { "@type": "MedicalClinic", name: "Pathology Department", url: "https://www.popularhospital.in/departments/pathology" },
      { "@type": "MedicalClinic", name: "Laboratory Medicine", url: "https://www.popularhospital.in/departments/laboratory-medicine" },
    ],

    branchOf: {
      "@type": "Organization",
      name: "Popular Group of Hospitals"
    },

    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/company/popularhospitals",
      "https://www.youtube.com/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
