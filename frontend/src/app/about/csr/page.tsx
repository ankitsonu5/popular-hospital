"use client";

import Image from "next/image";
import Link from "next/link";

const outreachPrograms = [
  {
    title: "Free Medical Camps",
    desc: "Every year, we organize free medical camps in underserved areas to provide access to essential healthcare services, including consultations, diagnostics, and preventive treatments. These camps offer a lifeline to those who may otherwise not have access to quality healthcare.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Health Education & Awareness",
    desc: "We partner with local schools, NGOs, and communities to educate people on various health topics, including hygiene, nutrition, mental health, and the importance of early disease detection. We aim to reduce health risks and empower individuals.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Support for Vulnerable Groups",
    desc: "Dedicated to supporting the elderly, children, and low-income families with specialized health services and resources. Our hospital provides free treatment and medication for those who cannot afford care, ensuring everyone has an opportunity for a healthy life.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Blood Donation Drives",
    desc: "Regular blood donation drives are held at the hospital, encouraging individuals to donate blood and save lives. We are proud to support national blood banks and ensure that there is a constant supply of life-saving blood for those in need.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Environmental Initiatives",
    desc: "Our hospital follows eco-friendly practices, such as waste management, water conservation, and the use of renewable energy sources to minimize our environmental footprint and promote sustainability for a better future.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "bg-green-50 text-green-600",
  },
];

const stats = [
  { label: "Individuals Served", value: "5,000+", icon: "👤" },
  { label: "Children Educated", value: "10,000+", icon: "🎓" },
  { label: "Free Surgeries", value: "500+", icon: "🏥" },
  { label: "Waste Recycled", value: "100+ Tons", icon: "♻️" },
];

export default function CSRPage() {
  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="CSR Banner"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Social <br />
              <span className="text-blue-400">Responsibility</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ─── Intro Section ─── */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c43] mb-8 font-heading">
              Our Mission for a Better World
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 text-justify md:text-center">
              Our mission is to not only treat illnesses but also to foster a
              healthier, more equitable world through our comprehensive social
              responsibility initiatives. With a strong commitment to community
              outreach, we aim to make a positive impact on the lives of
              individuals and families across our region.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
                  alt="Community Support"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-left space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c43]">
                      Community Focused
                    </h3>
                    <p className="text-gray-500">
                      Tailoring our services to meet the specific needs of our
                      local community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c43]">
                      Sustainable Impact
                    </h3>
                    <p className="text-gray-500">
                      Creating long-term health solutions through education and
                      awareness.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0b1c43]">
                      Equitable Access
                    </h3>
                    <p className="text-gray-500">
                      Breaking barriers to healthcare for underprivileged
                      groups.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Programs Grid ─── */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">
              Outreach
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0b1c43] font-heading">
              Our Community Programs
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outreachPrograms.map((program, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 ${program.color}`}
                >
                  {program.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0b1c43] mb-4 font-heading">
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="py-24 bg-[#0b1c43] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="mx-auto w-full max-w-[1366px] px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
            {stats.map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black mb-2 font-heading text-blue-400">
                  {stat.value}
                </div>
                <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Commitment Section ─── */}
      <section className="py-32 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                Equity & Inclusion
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0b1c43] mb-8 font-heading leading-tight italic">
                Healthcare is a Right, <br />
                <span className="text-blue-500">Not a Privilege</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
                <p>
                  At Popular Hospital, we believe that every individual deserves
                  access to high-quality healthcare, regardless of their
                  socioeconomic background. By addressing health disparities and
                  providing resources to underserved communities, we strive to
                  create an equitable and healthy future for everyone.
                </p>
                <p>
                  Through our community programs and partnerships with local
                  organizations, we ensure that healthcare services are
                  accessible to all. We are building a future where your ability
                  to pay never determines your right to live.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl -rotate-2 blur-sm" />
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                  alt="Equity in healthcare"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-xs border border-gray-100 hidden md:block">
                <p className="text-blue-600 font-bold text-xl italic">
                  "Making a positive impact on every life we touch."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-6">
          <div className="bg-gradient-to-br from-[#0b1c43] to-[#042d55] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 font-heading">
                Join Us in Making a Difference
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-12 leading-relaxed">
                Whether through volunteering, donations, or simply spreading
                awareness, your support helps us continue to make a difference.
                Together, we can build a healthier world for future generations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-900/40 uppercase tracking-widest"
                >
                  Volunteer Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all uppercase tracking-widest"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white text-center border-t border-gray-50">
        <p className="text-gray-400 text-sm">
          © Popular Hospital CSR Initiatives. Empowering Communities Since 1994.
        </p>
      </footer>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
