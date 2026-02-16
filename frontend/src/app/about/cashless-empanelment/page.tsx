import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cashless Empanelment | Popular Hospital',
  description:
    'Popular Hospital is empanelled with leading Government PSUs, Private Corporates, Insurance Companies and International TPAs for cashless treatment.',
};

/* ─── Data ─── */

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
  'GRANDHI MALLIKJUNA RAO',
  'HINDALCO INDUSTRIES',
  'LANCO POWER',
  'LARSON & TURBO POWER',
  'SOMA ENTERPRISES',
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
      <div className="relative bg-[#0b1c43] text-white py-16 overflow-hidden">
        {/* Decorative pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(0,180,216,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(232,82,34,0.2) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Shield icon */}
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#00B4D8]"
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
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading">
            Cashless Empanelment
          </h1>
          <p className="mt-4 text-blue-100 max-w-2xl text-lg">
            Popular Hospital is proudly empanelled with leading Government bodies,
            PSUs, Private Corporates, and International TPAs — ensuring hassle-free
            cashless treatment for you and your family.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1366px] px-4 py-16">
        {/* Quick stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              count: governmentPSU.length + '+',
              label: 'Government & PSU Partners',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              color: 'text-[#0b1c43]',
              bg: 'bg-blue-50',
            },
            {
              count: privateCorporate.length + '+',
              label: 'Private Corporates',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              color: 'text-[#8B4513]',
              bg: 'bg-orange-50',
            },
            {
              count: internationalTPA.length + '+',
              label: 'International TPAs',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: 'text-[#8B0000]',
              bg: 'bg-red-50',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-6 flex items-center gap-4 border border-white shadow-sm`}
            >
              <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
              <div>
                <div className={`text-3xl font-bold font-heading ${stat.color}`}>
                  {stat.count}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

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

        {/* International TPA */}
        <EmpanelmentSection
          title="International TPA"
          items={internationalTPA}
          accentColor="text-[#8B0000]"
          borderColor="border-gray-200"
          bgGradientFrom="from-[#8B0000]"
          bgGradientTo="to-[#E85222]"
        />

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
            href="tel:18001234567"
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
            Call 1800-123-4567
          </a>
        </div>
      </div>
    </div>
  );
}
