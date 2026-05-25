export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What medical specialties are available at Popular Hospital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Popular Hospital is a multi-specialty hospital offering advanced treatment in Cardiology, Neurology, Orthopedics, Nephrology, Urology, Gastroenterology, Oncology, IVF & Fertility, Pediatrics, ENT, Dental, and General Surgery.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital provide 24/7 emergency services?", 
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital provides 24/7 emergency and trauma care services with advanced life support ambulances and emergency specialists.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book an appointment at Popular Hospital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Appointments can be booked through the official website, hospital helpline numbers, or by visiting the hospital reception for OPD consultations.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital provide cashless treatment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital provides cashless hospitalization facilities through major insurance companies and TPAs for eligible patients.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ayushman Bharat treatment available at Popular Hospital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital is empanelled under Ayushman Bharat PM-JAY scheme for eligible beneficiaries.",
        },
      },
      {
        "@type": "Question",
        name: "What diagnostic facilities are available at Popular Hospital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The hospital provides advanced diagnostic facilities including MRI, CT Scan, Ultrasound, Digital X-Ray, Mammography, Pathology Lab, ECG, EEG, and other imaging services.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital have ICU and critical care units?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the hospital has advanced ICU, NICU, PICU, MICU, SICU, and critical care facilities for patients requiring continuous monitoring and intensive treatment.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Popular Hospital located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Popular Hospital is located at N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh 221004, India.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital have a 24-hour pharmacy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital has a 24/7 in-house pharmacy for medicines and emergency medical requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital provide dialysis services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the hospital provides advanced dialysis and nephrology care services with experienced specialists.",
        },
      },
      {
        "@type": "Question",
        name: "Are preventive health checkup packages available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital offers preventive and comprehensive health checkup packages for different age groups and healthcare needs.",
        },
      },
      {
        "@type": "Question",
        name: "Does Popular Hospital provide ambulance services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Popular Hospital provides 24/7 ambulance and emergency transportation services.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}
