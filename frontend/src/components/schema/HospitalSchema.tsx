export default function HospitalSchema() {
  const hospitalAddress = {
    "@type": "PostalAddress",
    streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221004",
    addressCountry: "IN",
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.popularhospital.in/#website",
        name: "Popular Hospital",
        url: "https://www.popularhospital.in/",
        publisher: { "@id": "https://www.popularhospital.in/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.popularhospital.in/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: ["en", "hi"],
      },
      {
        "@type": "Organization",
        "@id": "https://www.popularhospital.in/#organization",
        name: "Popular Hospital",
        legalName: "POPULAR MEDICARE LTD",
        url: "https://www.popularhospital.in/",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.popularhospital.in/#logo",
          url: "https://www.popularhospital.in/logo.png",
          contentUrl: "https://www.popularhospital.in/logo.png",
          caption: "Popular Hospital Logo",
        },
        image: { "@id": "https://www.popularhospital.in/#logo" },
        foundingDate: "1996",
        founder: {
          "@type": "Person",
          name: "Dr. A.K. Kaushik",
          jobTitle: "Chairman",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-7800001895",
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-7800001896",
            contactType: "emergency",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: [
          "https://www.facebook.com/popularhospitals",
          "https://www.instagram.com/popularhospitals",
          "https://www.linkedin.com/company/popularhospitals",
          "https://www.youtube.com/@popularhospitals",
        ],
      },
      {
        "@type": ["Hospital", "MedicalOrganization"],
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
        mainEntityOfPage: "https://www.popularhospital.in/",
        logo: "https://www.popularhospital.in/logo.png",
        image: ["https://www.popularhospital.in/logo.png"],
        description:
          "Popular Hospital (a unit of POPULAR MEDICARE LTD) is the best and top multi super speciality hospital in Varanasi with 450+ beds, 28 departments, and 100+ expert doctors offering 24/7 emergency care, cashless treatment, and advanced medical services.",
        slogan: "Trusted care, proven outcomes",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".speakable", "meta[name='description']"],
        },
        telephone: ["+91-7800001895", "+91-7800001896"],
        email: "info@popularhospital.in",
        faxNumber: "+91-7800001896",
        priceRange: "$$",
        currenciesAccepted: "INR",
        paymentAccepted: [
          "Cash",
          "UPI",
          "Credit Card",
          "Debit Card",
          "Net Banking",
        ],
        numberOfBeds: 450,
        foundingDate: "1996",
        isAcceptingPatients: true,
        founder: {
          "@type": "Person",
          name: "Dr. A.K. Kaushik",
          jobTitle: "Chairman",
          url: "https://www.popularhospital.in/about/chairman-desk",
          image: "https://www.popularhospital.in/images/dr_ak_kaushik.png",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.6",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "2847",
          reviewCount: "1523",
        },
        address: hospitalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.2927719,
          longitude: 82.970505,
        },
        hasMap:
          "https://www.google.com/maps/place/Popular+Hospital+Varanasi/@25.2932666,82.9691746,17z/data=!4m6!3m5!1s0x398e326d171ec8b9:0xf996b29293133cb9!8m2!3d25.2927719!4d82.970505!16s%2Fg%2F1hm46979f",
        areaServed: [
          { "@type": "City", name: "Varanasi" },
          { "@type": "State", name: "Uttar Pradesh" },
          { "@type": "State", name: "Bihar" },
          { "@type": "State", name: "Jharkhand" },
          { "@type": "State", name: "Chhattisgarh" },
          { "@type": "State", name: "Madhya Pradesh" },
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
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-7800001895",
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-7800001896",
            contactType: "emergency",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        medicalSpecialty: [
          "Cardiovascular",
          "Neurologic",
          "Gastroenterologic",
          "Renal",
          "Oncologic",
          "Urologic",
          "PlasticSurgery",
          "Pediatric",
          "Musculoskeletal",
          "Gynecologic",
          "Optometric",
          "Dentistry",
          "RespiratoryTherapy",
          "Psychiatric",
          "DietNutrition",
          "Emergency",
          "Surgical",
          "Endocrine",
        ],
        availableService: [
          {
            "@type": "Service",
            name: "Emergency And Trauma Care",
            serviceType: "24/7 Emergency Care",
          },
          { "@type": "Service", name: "ICU & Critical Care" },
          { "@type": "Service", name: "Diagnostics & Imaging" },
          { "@type": "Service", name: "Blood Bank" },
          { "@type": "Service", name: "Ambulance Services" },
          { "@type": "Service", name: "Preventive Health Check Up" },
          { "@type": "Service", name: "Pharmacy" },
          { "@type": "Service", name: "Pathological Services" },
          { "@type": "Service", name: "Radiological Services" },
          { "@type": "Service", name: "Home Care Services" },
        ],
        department: [
          {
            name: "Cardiology Department",
            url: "https://www.popularhospital.in/departments/cardiology",
          },
          {
            name: "CTVS Department",
            url: "https://www.popularhospital.in/departments/ctvs",
          },
          {
            name: "Neurosurgery Department",
            url: "https://www.popularhospital.in/departments/neurosurgery",
          },
          {
            name: "Gastroenterology Department",
            url: "https://www.popularhospital.in/departments/gastroenterology",
          },
          {
            name: "Nephrology Department",
            url: "https://www.popularhospital.in/departments/nephrology",
          },
          {
            name: "Oncology Department",
            url: "https://www.popularhospital.in/departments/oncology",
          },
          {
            name: "Urology Department",
            url: "https://www.popularhospital.in/departments/urology",
          },
          {
            name: "Burns & Plastic Surgery",
            url: "https://www.popularhospital.in/departments/burns-plastic-surgery",
          },
          {
            name: "Interventional Radiology",
            url: "https://www.popularhospital.in/departments/interventional-radiology",
          },
          {
            name: "Pediatric Surgery",
            url: "https://www.popularhospital.in/departments/pediatric-surgery",
          },
          {
            name: "Pediatric Cardiology",
            url: "https://www.popularhospital.in/departments/pediatric-cardiology",
          },
          {
            name: "Orthopedics & Joint Replacement",
            url: "https://www.popularhospital.in/departments/orthopedics",
          },
          {
            name: "General Medicine",
            url: "https://www.popularhospital.in/departments/general-medicine",
          },
          {
            name: "Laparoscopy & General Surgery",
            url: "https://www.popularhospital.in/departments/general-surgery",
          },
          {
            name: "Obstetrics & Gynaecology",
            url: "https://www.popularhospital.in/departments/gynaecology",
          },
          {
            name: "Pediatrics & Neonatology",
            url: "https://www.popularhospital.in/departments/pediatrics",
          },
          {
            name: "IVF & Fertility",
            url: "https://www.popularhospital.in/departments/ivf-fertility",
          },
          {
            name: "ENT Department",
            url: "https://www.popularhospital.in/departments/ent",
          },
          {
            name: "Ophthalmology",
            url: "https://www.popularhospital.in/departments/ophthalmology",
          },
          {
            name: "Dental Department",
            url: "https://www.popularhospital.in/departments/dental",
          },
          {
            name: "Respiratory Medicine",
            url: "https://www.popularhospital.in/departments/respiratory",
          },
          {
            name: "Pain Management",
            url: "https://www.popularhospital.in/departments/pain-management",
          },
          {
            name: "Psychiatry Department",
            url: "https://www.popularhospital.in/departments/psychiatry",
          },
          {
            name: "Dietetics & Nutrition",
            url: "https://www.popularhospital.in/departments/dietetics-nutrition",
          },
          {
            name: "Advanced Diabetic Foot Unit",
            url: "https://www.popularhospital.in/departments/diabetic-foot",
          },
          {
            name: "Radiology Department",
            url: "https://www.popularhospital.in/departments/radiology",
          },
          {
            name: "Pathology Department",
            url: "https://www.popularhospital.in/departments/pathology",
          },
          {
            name: "Laboratory Medicine",
            url: "https://www.popularhospital.in/departments/laboratory-medicine",
          },
        ].map((dept) => ({
          "@type": "MedicalClinic",
          ...dept,
          telephone: "+91-7800001895",
          priceRange: "$$",
          image: "https://www.popularhospital.in/logo.png",
          address: hospitalAddress,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Popular Hospital Healthcare Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Book an Appointment",
                url: "https://www.popularhospital.in/book-an-appointment",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Find a Doctor",
                url: "https://www.popularhospital.in/doctors",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Health Packages",
                url: "https://www.popularhospital.in/health-packages",
              },
            },
          ],
        },
        branchOf: {
          "@type": "Organization",
          name: "Popular Group of Hospitals",
        },
        sameAs: [
          "https://www.popularhospital.in/",
          "https://www.facebook.com/popularhospitals",
          "https://www.instagram.com/popularhospitals",
          "https://www.linkedin.com/company/popularhospitals",
          "https://www.youtube.com/@popularhospitals",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
