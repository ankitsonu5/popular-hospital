import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | Popular Hospital",
  description:
    "Find answers to common questions about Popular Hospital Varanasi, including appointments, emergency services, cashless facilities, and more.",
  alternates: {
    canonical: "https://popularhospital.in/faqs",
  },
};

const faqs = [
  {
    id: 1,
    question: "What medical specialties are available at Popular Hospital?",
    answer:
      "Popular Hospital is a multi-specialty facility offering advanced treatment in Cardiology, Neurology, Orthopedics, Nephrology, Urology, Gastroenterology, and General Surgery.",
  },
  {
    id: 2,
    question: "Does the hospital provide 24/7 emergency services?",
    answer:
      "Yes, Popular Hospital offers round-the-clock Emergency and Trauma care, supported by a dedicated emergency medical team and advanced life-support ambulances (+91-7800001895 / 96).",
  },
  {
    id: 3,
    question: "How can I schedule an appointment with a specialist?",
    answer:
      "Appointments can be booked via the hospital’s official website or by calling our helpline. Physical walk-ins at the reception are also available for OPD consultations.",
  },
  {
    id: 4,
    question: "Is cashless treatment available for insured patients?",
    answer:
      "Yes, the hospital has tie-ups with major Third Party Administrators (TPAs) and private insurance companies, providing cashless hospitalization for eligible policyholders.",
  },
  {
    id: 5,
    question: "Does the hospital support the Ayushman Bharat Yojana (PM-JAY)?",
    answer:
      "Yes, Popular Hospital is an empanelled provider for the Ayushman Bharat scheme, offering free treatment to eligible cardholders as per government norms.",
  },
  {
    id: 6,
    question: "What diagnostic facilities are available on-site?",
    answer:
      "The hospital features a comprehensive diagnostic wing equipped with MRI, CT Scan, X-ray, Ultrasound, and a fully automated Pathology laboratory for quick and accurate results.",
  },
  {
    id: 7,
    question: "Are there specialized critical care units?",
    answer:
      "Yes, the facility includes state-of-the-art Intensive Care Units (ICU), Neonatal ICUs (NICU), and Pediatric ICUs (PICU) for patients requiring constant monitoring.",
  },
  {
    id: 8,
    question: "Where is Popular Hospital located in Varanasi?",
    answer:
      "The hospital is located at Kakarmatta, near DLW Ground, Varanasi, Uttar Pradesh, 221004. It is well-connected and accessible from all major parts of the city.",
  },
  {
    id: 9,
    question: "Is there a 24-hour pharmacy within the hospital?",
    answer:
      "Yes, an in-house pharmacy is available 24/7 to ensure that all necessary medications and surgical supplies are readily available for patients at any time.",
  },
  {
    id: 10,
    question: "What are the rules and timings for patient visitors?",
    answer:
      "General ward visiting hours are 11:00 AM – 1:00 PM and 5:00 PM – 7:00 PM. Ward and ICU visits are strictly regulated to maintain a sterile environment and ensure patient safety.",
  },
  {
    id: 11,
    question: "Does Popular Hospital have a dialysis center?",
    answer:
      "Yes, we have a state-of-the-art Dialysis Center providing 24/7 services for patients with chronic kidney diseases, supported by experienced nephrologists.",
  },
  {
    id: 12,
    question: "Are preventive health checkup packages available?",
    answer:
      "We offer a variety of comprehensive preventive health checkup packages tailored for different age groups and lifestyles to ensure early detection and wellness.",
  },
  {
    id: 13,
    question: "Do you provide assistance for international patients?",
    answer:
      "Yes, Popular Hospital has a dedicated international patient care cell that assists with appointments, travel, and accommodation for patients visiting from abroad.",
  },
  {
    id: 14,
    question: "Is there a cafeteria or food service for attendants?",
    answer:
      "Yes, we have an in-house hygienic cafeteria that provides nutritious meals for both patients (as per diet) and their attendants.",
  },
  {
    id: 15,
    question: "How can I obtain a copy of my medical records?",
    answer:
      "Medical records and discharge summaries can be obtained from the Medical Records Department (MRD) during office hours after completing the necessary formalities.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-[#f0f7ff] min-h-screen pt-12 pb-20">
      <div className="mx-auto max-w-[1366px] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#1a3a5c] mb-4 font-heading tracking-tight leading-tight">
            Frequently Asked Questions - Popular Hospital
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed max-w-5xl">
            Explore detailed answers to commonly asked questions about
            healthcare services, specialist consultations, treatment processes,
            and patient care at Popular Hospital, one of India's leading
            multispeciality hospital networks.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-[1366px] space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-2xl border border-[#d0e3f0] shadow-sm transition-all duration-300 open:shadow-md"
            >
              <summary className="flex items-center justify-between p-7 cursor-pointer list-none">
                <h3 className="text-[17px] font-bold text-[#1a3a5c] transition-colors pr-8">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 transition-all duration-300 group-open:rotate-45">
                  <div className="w-11 h-11 rounded-full border-2 border-[#2a7a8c] flex items-center justify-center bg-white group-open:bg-[#2a7a8c] transition-colors">
                    <svg
                      className="w-5 h-5 text-[#2a7a8c] group-open:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </span>
              </summary>
              <div className="px-8 pb-8 animate-fade-in">
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Support Section - Updated Style */}
        <div className="mt-24 bg-white rounded-[2rem] p-10 md:p-14 text-center border border-[#d0e3f0] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a5c] mb-6 font-heading">
              Still have more questions?
            </h2>
            <p className="text-gray-500 mb-10 text-xl max-w-3xl mx-auto leading-relaxed">
              Our clinical support team is available 24/7 to guide you through
              your medical journey.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              <a
                href="tel:+917800001895"
                className="flex items-center gap-3 px-8 py-4 bg-[#1a3a5c] text-white rounded-full font-bold text-lg hover:bg-[#122842] transition-all hover:scale-105 shadow-lg shadow-blue-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5Z" />
                </svg>
                +91 7800001895
              </a>
              <a
                href="tel:+917800001896"
                className="flex items-center gap-3 px-8 py-4 bg-[#1a3a5c] text-white rounded-full font-bold text-lg hover:bg-[#122842] transition-all hover:scale-105 shadow-lg shadow-blue-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5Z" />
                </svg>
                +91 7800001896
              </a>
              <Link
                href="/#contact-form"
                className="px-8 py-4 border-2 border-[#1a3a5c] text-[#1a3a5c] rounded-full font-bold text-lg hover:bg-[#1a3a5c] hover:text-white transition-all hover:scale-105"
              >
                Reach Out to Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
