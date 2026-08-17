import Image from "next/image";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/about/mission", {
  title: "Our Mission | Popular Hospital",
  description:
    "Guiding principles that drive Popular Hospital towards excellence in healthcare and patient safety.",
  alternates: {
    canonical: "https://www.popularhospital.in/about/mission",
  },
});
}


export default function VisionMissionPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── Clean Hero Section ─── */}
      <section className="relative bg-[#0b1c43] overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/about_us_mission.jpg"
            alt="Vision Banner"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-3xl font-bold font-heading text-white tracking-tight leading-tight">
            Our Mission
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Guiding principles that drive Popular Hospital towards excellence in
            healthcare and patient safety.
          </p>
        </div>
      </section>

      {/* ─── Mission & Vision Section (Themed) ─── */}
      <section className="relative py-20 md:py-24 xl:py-12 bg-[#f8fafc] overflow-hidden">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#0b1c43 1px, transparent 1px), linear-gradient(90deg, #0b1c43 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Bottom Right Decorative Swoosh */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#005696]/10 to-transparent rounded-tl-[100%] pointer-events-none translate-x-1/4 translate-y-1/4" />

        <div className="max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 xl:gap-12 items-start">
            {/* Mission Card */}
            <div className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#056b46]/10 flex items-center justify-center text-[#056b46] group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <circle cx="12" cy="12" r="6" strokeWidth="2" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl xl:text-2xl font-black font-heading text-[#056b46] tracking-tight uppercase">
                  MISSION
                </h2>
              </div>
              <p className="text-2xl md:text-3xl xl:text-lg font-bold text-gray-800 leading-[1.3] font-heading">
                "To be the Preferred Destination for all patients for Quality
                Health Care Services."
              </p>
            </div>

            {/* Vision Card */}
            <div className="group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#005696]/10 flex items-center justify-center text-[#005696] group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl xl:text-2xl font-black font-heading text-[#005696] tracking-tight uppercase">
                  VISION
                </h2>
              </div>
              <p className="text-2xl md:text-3xl xl:text-lg font-bold text-gray-800 leading-[1.3] font-heading">
                "To Provide Quality Health Care Services to Every Patient at
                Affordable Cost."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-20 xl:py-12 bg-white relative overflow-hidden">
        <div className="max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hospital-orange/10 border border-hospital-orange/20 mb-8">
            <span className="text-sm font-bold text-hospital-orange tracking-widest uppercase">
              Immediate Assistance
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl xl:text-2xl font-black font-heading text-[#0b1c43] mb-8 xl:mb-6">
            Reach Out to Us <br className="hidden md:block" />
            Anytime
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <a
              href="tel:+917800001895"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0b1c43] text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-hospital-orange transition-all duration-300 shadow-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">
                Reception
              </span>
              <span className="text-xl md:text-2xl xl:text-lg font-black text-[#0b1c43]">
                +91-7800001895
              </span>
            </a>

            <div className="hidden md:block w-px h-24 bg-gray-200" />

            <a
              href="tel:+917800001896"
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0b1c43] text-white flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-hospital-orange transition-all duration-300 shadow-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">
                Emergency
              </span>
              <span className="text-xl md:text-2xl xl:text-lg font-black text-[#0b1c43]">
                +91-7800001896
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
