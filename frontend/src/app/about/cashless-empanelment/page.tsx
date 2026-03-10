import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cashless Empanelment | Popular Hospital',
  description:
    'Popular Hospital is empanelled with leading Government PSUs, Private Corporates, Insurance Companies and International TPAs for cashless treatment.',
};

const governmentPSU = [
  'AIRPORT AUTHORITY OF INDIA',
  'ANPARA THERMOL POWER CORPORATION',
  'BANARAS LOCOMOTIVE WORKS',
  'BHARAT HEAVY ELECTRICALS LIMITED',
  'BHARAT PETROLEUM CORPORATION LTD',
  'BHARAT SANCHAR NIGAM LIMITED',
  'CENTRAL GOVERNMENT HEALTH SCHEME',
  'CENTRAL INDUSTRIAL SECURITY FORCE',
  'CENTRAL RESERVE POLICE FORCE',
  'COAL INDIA LIMITED',
  'EAST CENTRAL RAILWAY',
  "EMPLOYEES' PROVIDENT FUND ORGANIZATION",
  "EMPLOYEES' STATE INSURANCE SCHEME",
  'EX-SERVICEMEN CONTRIBUTORY HEALTH SCHEME',
  'FOOD CORPORATION OF INDIA',
  'GAS AUTHORITY OF INDIA LIMITED',
  'HINDUSTAN PETROLEUM CORPORATION LIMITED',
  'ICAR-INDIAN INSTITUTE OF VEGETABLE RESEARCH',
  'INDIAN OIL CORPORATION LTD.',
  'NATIONAL HIGHWAYS AUTHORITY OF INDIA',
  'NATIONAL THERMAL POWER CORPORATION LIMITED',
  'NORTH EASTERN RAILWAY',
  'NORTHERN COALFIELDS LIMITED',
  'NORTHERN RAILWAY',
  'OBRA THERMOL POWER CORPORATION',
  'POWER GRID CORPORATION OF INDIA',
  "PRIME MINISTER'S NATIONAL RELIEF FUND",
  'UTTAR PRADESH POLICE',
  'UTTAR PRADESH POWER CORPORATION LTD.',
];

const privateCorporate = [
  'DILIP BUIDCON LTD.',
  'GRANDHI MALLIKARJUNA RAO',
  'HINDALCO INDUSTRIES',
  'LANCO POWER',
  'LARSON & TURBO POWER',
  'SOMA ENTERPRISES',
];

const insuranceCompanies = [
  'ADITYA BIRLA HEALTH INSURANCE COMPANY LIMITED',
  'BAJAJ ALLIANZ GENERAL INSURANCE COMPANY LIMITED',
  'BHARTI AXA GENERAL INSURANCE COMPANY LIMITED',
  'CARE HEALTH INSURANCE COMPANY LIMITED',
  'CHOLAMANDALAM MS GENERAL INSURANCE COMPANY LIMITED',
  'CIGNA TTK HEALTH INSURANCE COMPANY LIMITED',
  'DHFL GENERAL INSURANCE LIMITED',
  'EDELWEISS GENERAL INSURANCE COMPANY LIMITED',
  'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
  'HDFC ERGO GENERAL INSURANCE COMPANY LIMITED',
  'ICICI LOMBARD GENERAL INSURANCE COMPANY LIMITED',
  'IFFCO TOKIO GENERAL INSURANCE COMPANY LIMITED',
  'KOTAK MAHINDRA GENERAL INSURANCE COMPANY LIMITED',
  'LARSON & TOUBRO GENERAL INSURANCE COMPANY LIMITED',
  'LIBERTY VIDEOCON GENERAL INSURANCE COMPANY LIMITED',
  'MAX BUPA HEALTH INSURANCE COMPANY LIMITED',
  'RELIANCE GENERAL INSURANCE COMPANY LIMITED',
  'SBI GENERAL INSURANCE COMPANY LIMITED',
  'STAR HEALTH AND ALLIED INSURANCE COMPANY LIMITED',
  'TATA AIG GENERAL INSURANCE COMPANY LIMITED',
  'UNIVERSAL SOMPO GENERAL INSURANCE COMPANY LIMITED',
];

const tpaCompanies = [
  'ALANKIT HEALTH CARE LIMITED',
  'EAST WEST ASSIST PVT. LTD.',
  'ERICSON INSURANCE TPA PRIVATE LIMITED',
  'FAMILY HEALTH PLAN LTD.',
  'FOCUS HEALTH INSURANCE (TPA) PRIVATE LIMITED',
  'GENINS INDIA LTD.',
  'GOOD HEALTHPLAN LTD.',
  'GRAND INSURANCE TPA PVT. LTD.',
  'HEALTH INDIA TPA SERVICES PRIVATE LIMITED',
  'HEALTH INSURANCE TPA (HITPA)',
  'HERITAGE HEALTHCARE SERVICES PVT. LTD.',
  'MD INDIA HEALTHCARE SERVICES PVT. LTD.',
  'MED SAVE HEALTH CARE',
  'MEDI ASSIST INDIA PVT. LTD.',
  'MEDICARE TPA SERVICES PVT. LTD.',
  'PARAMOUNT HEALTH SERVICES PVT. LTD.',
  'PARK MEDICLAIM CONSULTANTS PRIVATE LIMITED',
  'RAKSHA TPA PVT. LTD.',
  'R-CARE TPA PVT LTD',
  'UNITED HEALTHCARE PAREKH PVT. LTD.',
  'VIDAL HEALTH TPA PVT. LTD.',
  'VIPUL MED CORP TPA. PVT. LTD.',
  'VISION EMEDISOLUTIONS',
];

const internationalTPA = [
  'AMA GLOBAL ASSISTANCE',
  'CIGNA INTERNATIONAL',
  'MEDTRAVELS',
];

/* ─── Section component (keeps JSX DRY) ─── */

interface SectionProps {
  title: string;
  items: string[];
  accentColor: string;        // tailwind text-color class
  borderColor: string;        // tailwind border-color class
  bgGradientFrom: string;     // tailwind from-color class
  bgGradientTo: string;       // tailwind to-color class
}

function EmpanelmentSection({
  title,
  items,
  accentColor,
  borderColor,
  bgGradientFrom,
  bgGradientTo,
}: SectionProps) {
  return (
    <section className="mb-16 last:mb-0">
      {/* Section heading */}
      <div className="text-center mb-10">
        <h2 className={`text-2xl md:text-3xl font-bold font-heading ${accentColor}`}>
          {title}
        </h2>
        <div className={`w-20 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r ${bgGradientFrom} ${bgGradientTo}`} />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((name) => (
          <div
            key={name}
            className={`group relative bg-white rounded-xl border ${borderColor} px-5 py-4 text-center
              transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
              hover:border-transparent`}
          >
            {/* Subtle gradient overlay on hover */}
            <div
              className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 bg-gradient-to-br ${bgGradientFrom} ${bgGradientTo}`}
            />
            <span className="relative text-sm font-semibold text-gray-700 uppercase tracking-wide leading-snug">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─── */



export default function CashlessEmpanelmentPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/about_popular/cashless_empanelment.png"
                alt="Cashless Banner"
                fill
                className="object-cover opacity-85"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
        </div>
        <div className="relative z-10 text-center px-6 sm:px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-white">Cashless Empanelment</h1>
            <p className="text-sm sm:text-base md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto font-light">
                Popular Hospital is proudly empanelled with leading Government bodies, PSUs, Private Corporates, and International TPAs — ensuring hassle-free cashless treatment for you and your family.
            </p>
        </div>
      </div>

      {/* ─── Logo Marquee Slider ─── */}
      <div className="w-full bg-white py-12 overflow-hidden relative border-y border-gray-100">
        <div className="flex animate-scroll-left whitespace-nowrap pause-scroll">
          {[
            'AAI.png',
            'BHEL.png',
            'Indian_oil.png',
            'NCL.png',
            'SBI_general.png',
            'hindalco.png',
            'iffco-tokio.png',
            'pmjay.png',
            'vidal_health.png',
            // Doubling for infinite effect
            'AAI.png',
            'BHEL.png',
            'Indian_oil.png',
            'NCL.png',
            'SBI_general.png',
            'hindalco.png',
            'iffco-tokio.png',
            'pmjay.png',
            'vidal_health.png',
          ].map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8 md:mx-16 w-32 md:w-48 h-16 md:h-24 relative flex items-center justify-center">
              <Image
                src={`/images/cashless_empanelment/${logo}`}
                alt={`Partner Logo - ${logo}`}
                fill
                className="object-contain filter transition-all duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        {/* Government & PSU Houses */}
        <EmpanelmentSection
          title="Government & PSU Houses"
          items={governmentPSU}
          accentColor="text-[#0b1c43]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#0b1c43]"
          bgGradientTo="to-[#00B4D8]"
        />

        {/* Private Corporate */}
        <EmpanelmentSection
          title="Private Corporate"
          items={privateCorporate}
          accentColor="text-[#8B4513]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#8B4513]"
          bgGradientTo="to-[#E85222]"
        />

        {/* Insurance Companies */}
        <EmpanelmentSection
          title="Insurance Companies"
          items={insuranceCompanies}
          accentColor="text-[#2957A4]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#2957A4]"
          bgGradientTo="to-[#00B4D8]"
        />

        {/* TPA Companies */}
        <EmpanelmentSection
          title="TPA Companies"
          items={tpaCompanies}
          accentColor="text-[#E85222]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#E85222]"
          bgGradientTo="to-[#FFB088]"
        />

        {/* International TPA */}
        <EmpanelmentSection
          title="International TPA"
          items={internationalTPA}
          accentColor="text-[#8B0000]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#8B0000]"
          bgGradientTo="to-[#E85222]"
        />

        {/* Quick stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-16">
          {[
            {
              count: governmentPSU.length + '+',
              label: 'Govt & PSU',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              color: 'text-[#0b1c43]',
              bg: 'bg-blue-50',
            },
            {
              count: privateCorporate.length + '+',
              label: 'Private Corporate',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              color: 'text-[#8B4513]',
              bg: 'bg-orange-50',
            },
            {
              count: insuranceCompanies.length + '+',
              label: 'Insurance',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              color: 'text-[#2957A4]',
              bg: 'bg-indigo-50',
            },
            {
              count: tpaCompanies.length + '+',
              label: 'TPA Partners',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              color: 'text-[#E85222]',
              bg: 'bg-red-50',
            },
            {
              count: internationalTPA.length + '+',
              label: 'Intl TPAs',
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: 'text-[#8B0000]',
              bg: 'bg-rose-50',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-4 flex items-center gap-3 border border-white shadow-sm`}
            >
              <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
              <div>
                <div className={`text-2xl font-bold font-heading ${stat.color}`}>
                  {stat.count}
                </div>
                <div className="text-xs text-gray-600 font-medium whitespace-nowrap">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#0b1c43] to-[#1a3a6b] rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Can&apos;t find your organization?
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
            We are constantly adding new partners. Contact our billing department to
            check if your employer or insurer is empanelled with us.
          </p>
          <a
            href="tel:+917800001895"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0b1c43] rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call +91-7800001895 / 96
          </a>
        </div>
      </div>
    </div>
  );
}
