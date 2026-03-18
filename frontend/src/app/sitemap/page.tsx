import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | Popular Hospital Varanasi',
  description: 'Navigate through all the pages and services offered by Popular Hospital, Varanasi.',
};

const sitemapData = [
  {
    category: "About Popular Hospital",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    links: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Chairman's Desk", href: "/about/chairman-desk" },
      { name: "MD's Desk", href: "/about/md-desk" },
      { name: "Vision & Mission", href: "/about/vision-mission" },
      { name: "Leadership Team", href: "/about/leadership" },
      { name: "CSR Initiatives", href: "/about/csr" },
      { name: "Cashless Empanelment", href: "/about/cashless-empanelment" },
      { name: "Our Locations", href: "/our-locations" },
    ]
  },
  {
    category: "Specialities & Departments",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    links: [
      { name: "Cardiology", href: "/departments/cardiology" },
      { name: "Neurosurgery", href: "/departments/neurosurgery" },
      { name: "Oncology", href: "/departments/oncology" },
      { name: "Nephrology", href: "/departments/nephrology" },
      { name: "Gastroenterology", href: "/departments/gastroenterology" },
      { name: "Urology", href: "/departments/urology" },
      { name: "CTVS", href: "/departments/ctvs" },
      { name: "Plastic Surgery", href: "/departments/burns-plastic-surgery" },
      { name: "Orthopedics", href: "/departments/orthopedics" },
      { name: "Obstetrics & Gynaecology", href: "/departments/gynaecology" },
      { name: "Pediatrics & Neonatology", href: "/departments/pediatrics" },
      { name: "General Medicine", href: "/departments/general-medicine" },
      { name: "General Surgery", href: "/departments/general-surgery" },
      { name: "Dental", href: "/departments/dental" },
      { name: "ENT", href: "/departments/ent" },
      { name: "Ophthalmology", href: "/departments/ophthalmology" },
      { name: "Psychiatry", href: "/departments/psychiatry" },
      { name: "Respiratory Medicine", href: "/departments/respiratory" },
    ]
  },
  {
    category: "Support Services",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    links: [
      { name: "Emergency & Trauma", href: "/services/emergency" },
      { name: "Blood Bank", href: "/services/blood-bank" },
      { name: "Ambulance", href: "/services/ambulance" },
      { name: "Pathology", href: "/services/pathology" },
      { name: "Pharmacy", href: "/services/pharmacy" },
      { name: "Home Care Services", href: "/services/home-care" },
      { name: "Diagnostic Facilities", href: "/facilities" },
    ]
  },
  {
    category: "Wellness & Health Check",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    links: [
      { name: "Wellness Packages", href: "/services/wellness-packages" },
      { name: "Health Packages", href: "/services/health-packages" },
      { name: "Women's Health Special", href: "/services/womens-health-special" },
      { name: "Primary Health Check Up", href: "/services/wellness-packages/primary-health-check-up-male" },
      { name: "Executive Health Check Up", href: "/services/wellness-packages/executive-health-check-up-male" },
      { name: "Advance Health Check Up", href: "/services/wellness-packages/advance-health-check-up-male" },
      { name: "Annual Health Check Up", href: "/services/wellness-packages/annual-health-check-up-male" },
      { name: "Comprehensive Health Check Up", href: "/services/wellness-packages/comprehensive-health-check-up-male-female" },
      { name: "Cardiac Screening", href: "/services/wellness-packages/cardiac-screening-1" },
      { name: "Child Health Check Up", href: "/services/wellness-packages/child-health-check-up" },
      { name: "Well Woman Checkup", href: "/services/wellness-packages/well-woman-executive-health-checkup" },
    ]
  },
  {
    category: "Patient Quick Links",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    links: [
      { name: "Book Appointment", href: "/book" },
      { name: "Find a Doctor", href: "/doctors" },
      { name: "Online Payment", href: "/online-payment" },
      { name: "OPD Schedule", href: "/opd" },
      { name: "Health Updates", href: "/updates" },
      { name: "Feedback", href: "/feedback" },
      { name: "FAQs", href: "/faqs" },
    ]
  },
  {
    category: "News, Media & Legal",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    links: [
      { name: "Latest News", href: "/news" },
      { name: "Video Gallery", href: "/media/videos" },
      { name: "Media Highlights", href: "/media/coverage" },
      { name: "Patient Stories", href: "/stories" },
      { name: "Careers", href: "/careers" },
      { name: "Payment Policy", href: "/payment-policy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Blog", href: "/blog" },
    ]
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
            A comprehensive directory of all sections and pages within the Popular Hospital website. Find exactly what you're looking for easily.
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
                <h2 className="text-xl font-black text-[#1a3a5c] font-heading group-hover:text-[#E85222] transition-colors">{section.category}</h2>
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
              <h3 className="text-3xl font-black mb-6 font-heading">Still can't find what you need?</h3>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                Our 24/7 help desk is here to assist you with any queries regarding your medical visits, appointments, or hospital services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link href="/book" className="px-10 py-4 bg-[#E85222] text-white rounded-full font-black hover:bg-[#d1451a] transition-all shadow-lg shadow-orange-900/40 uppercase tracking-widest text-sm">
                    Book Appointment
                 </Link>
                 <a href="tel:+917800001895" className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black hover:bg-white/20 transition-all uppercase tracking-widest text-sm">
                    Call: +91 7800001895
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
