import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Popular Hospital Varanasi",
  description:
    "Navigate through all the pages and services offered by Popular Hospital, Varanasi.",
  alternates: {
    canonical: "https://www.popularhospital.in/sitemap",
  },
};

const sitemapData = [
  {
    category: "About Popular Hospital",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Our Vision", href: "/about/our-vision-2030" },
      { name: "Our Mission", href: "/about/mission" },
      { name: "From Chairman's Desk", href: "/about/chairman-desk" },
      { name: "From Vice Chairman's Desk", href: "/about/vice-chairman-desk" },
      { name: "From MD's Desk", href: "/about/md-desk" },
      { name: "Leadership Team", href: "/about/leadership" },
      { name: "Awards & Recognition", href: "/about/awards-recognition" },
      { name: "Social Responsibility (SR)", href: "/about/csr" },
      { name: "Cashless Empanelment", href: "/about/cashless-empanelment" },
      { name: "Our Branches", href: "/#our-locations" },
    ],
  },
  {
    category: "Super Specialties",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.01.707.293l5.414 5.414a1 1.01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    links: [
      { name: "Cardiology", href: "/departments/cardiology" },
      { name: "CTVS", href: "/departments/ctvs" },
      { name: "Neurosurgery", href: "/departments/neurosurgery" },
      { name: "Gastroenterology", href: "/departments/gastroenterology" },
      { name: "Nephrology", href: "/departments/nephrology" },
      { name: "Oncology", href: "/departments/oncology" },
      { name: "Urology", href: "/departments/urology" },
      {
        name: "Burns & Plastic Surgery",
        href: "/departments/burns-plastic-surgery",
      },
      {
        name: "Interventional Radiology",
        href: "/departments/interventional-radiology",
      },
      { name: "Pediatric Surgery", href: "/departments/pediatric-surgery" },
    ],
  },
  {
    category: "Specialties",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    links: [
      {
        name: "Laparoscopy & General Surgery",
        href: "/departments/general-surgery",
      },
      { name: "Obstetrics & Gynaecology", href: "/departments/gynaecology" },
      { name: "Pediatrics And Neonatology", href: "/departments/pediatrics" },
      {
        name: "Orthopedics & Joint Replacement",
        href: "/departments/orthopedics",
      },
      { name: "General Medicine", href: "/departments/general-medicine" },
      { name: "ENT", href: "/departments/ent" },
      { name: "Laboratory Medicine", href: "/departments/laboratory-medicine" },
      {
        name: "Dietetics & Nutrition",
        href: "/departments/dietetics-nutrition",
      },
      { name: "Ophthalmology", href: "/departments/ophthalmology" },
      { name: "Dental", href: "/departments/dental" },
      { name: "Respiratory Medicine", href: "/departments/respiratory" },
      { name: "Pain Medicine", href: "/departments/pain-management" },
      { name: "Psychiatry Department", href: "/departments/psychiatry" },
    ],
  },
  {
    category: "Our Services",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    links: [
      { name: "Emergency And Trauma Care", href: "/services/emergency" },
      { name: "Blood Bank", href: "/services/blood-bank" },
      { name: "Ambulance", href: "/services/ambulance" },
      {
        name: "Preventive Health Check Up",
        href: "/services/wellness-packages",
      },
      { name: "Pharmacy", href: "/services/pharmacy" },
      { name: "Pathological Services", href: "/services/pathology" },
      { name: "Radiological Services", href: "/services/radiology" },
      { name: "Home Care Services", href: "/services/home-care" },
      { name: "Health Packages", href: "/services/health-packages" },
    ],
  },
  {
    category: "Patient Central",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    links: [
      { name: "Book Appointment", href: "/book" },
      { name: "Our Doctors", href: "/doctors" },
      {
        name: "International Patients",
        href: "/services/international-patients",
      },
      { name: "Free OPD and Offer", href: "/services/free-opd-offer" },
      { name: "Online Payment", href: "/online-payment" },
      { name: "Second Opinion", href: "/second-opinion" },
      { name: "OPD Schedule", href: "/opd" },
      { name: "Careers", href: "/careers" },
      { name: "Feedback", href: "/feedback" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    category: "Media & Blog",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    links: [
      { name: "Latest News", href: "/media/news" },
      { name: "Blog Highlights", href: "/blog" },
      { name: "Media Coverage", href: "/media/coverage" },
      { name: "Hospital Events", href: "/media/events" },
      { name: "Patients Testimonial", href: "/stories" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Payment Policy", href: "/payment-policy" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="bg-[#f0f7ff] min-h-screen pt-12 pb-20">
      <div className="mx-auto max-w-[1366px] px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a3a5c] mb-6 font-heading tracking-tight leading-tight">
            Visual <span className="text-[#E85222]">Sitemap</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-3xl">
            A comprehensive directory of all sections and pages within the
            Popular Hospital website. Find exactly what you're looking for
            easily.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#E85222]/10 transition-all duration-500 group"
            >
              {/* Category Icon & Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1a3a5c] text-white flex items-center justify-center shadow-lg shadow-blue-900/10 group-hover:bg-[#E85222] transition-colors duration-500">
                  {section.icon}
                </div>
                <h2 className="text-xl font-black text-[#1a3a5c] font-heading group-hover:text-[#E85222] transition-colors">
                  {section.category}
                </h2>
              </div>

              {/* Links List */}
              <ul className="grid grid-cols-1 gap-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-3 text-slate-600 font-bold hover:text-[#E85222] transition-colors group/link text-sm md:text-base"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/link:bg-[#E85222] group-hover/link:scale-150 transition-all flex-shrink-0"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 bg-[#1a3a5c] rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-br-full -ml-20 -mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-6 font-heading">
              Still can't find what you need?
            </h3>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Our 24/7 help desk is here to assist you with any queries
              regarding your medical visits, appointments, or hospital services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 max-w-lg mx-auto">
              <Link
                href="/book"
                className="px-6 py-3 sm:px-10 sm:py-4 bg-[#E85222] text-white rounded-2xl sm:rounded-full font-black hover:bg-[#d1451a] transition-all shadow-lg shadow-orange-900/40 uppercase tracking-widest text-xs sm:text-sm text-center"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+917800001895"
                className="px-6 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl sm:rounded-full font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs sm:text-sm text-center"
              >
                Call: +91 7800001895
              </a>
              <a
                href="tel:+917800001896"
                className="px-6 py-3 sm:px-10 sm:py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl sm:rounded-full font-black hover:bg-white/20 transition-all uppercase tracking-widest text-xs sm:text-sm text-center"
              >
                Call: +91 7800001896
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
