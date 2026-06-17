import Image from "next/image";

export const metadata = {
  title: "Infrastructure & Technology | Popular Hospital",
  description:
    "Explore Popular Hospital's advanced infrastructure, robotics, modular operation theatres, ICU, and diagnostic facilities.",
};

const technologyHighlights = [
  {
    title: "Robotics",
    description:
      "Advanced robotic-assisted care support for greater precision, planning, and confidence in complex clinical workflows.",
    color: "bg-blue-50 text-[#284a91] border-blue-100",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 3h6m-3 0v4m-5 8H5a2 2 0 01-2-2v-2a2 2 0 012-2h2m10 6h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2M8 21h8M9 17h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Modular OT",
    description:
      "Modern modular operation theatres designed for infection control, surgical efficiency, and specialist teamwork.",
    color: "bg-orange-50 text-[#E85222] border-orange-100",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 4v16M4 12h16M6 6h12v12H6z"
        />
      </svg>
    ),
  },
  {
    title: "ICU",
    description:
      "Critical care units supported by continuous monitoring, trained intensivists, and advanced life-support systems.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.5 12.5h3l2-5 4 10 2-5h4M12 21C7 17.5 4 14.5 4 10a4 4 0 017-2.7A4 4 0 0118 10c0 4.5-3 7.5-6 11z"
        />
      </svg>
    ),
  },
  {
    title: "Diagnostics",
    description:
      "Integrated diagnostic services with pathology and imaging support for faster decisions and accurate treatment planning.",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 4h6m-5 0v5l-5 8a2 2 0 001.7 3h10.6A2 2 0 0019 17l-5-8V4m-6 11h8"
        />
      </svg>
    ),
  },
];

export default function InfrastructureTechnologyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex min-h-[180px] items-center overflow-hidden bg-[#0b1c43] py-10 md:min-h-[220px]">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/about_us_infra.jpg"
            alt="Infrastructure and technology"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/80 via-[#0b1c43]/60 to-[#0b1c43]/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
              Infrastructure & Technology
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {technologyHighlights.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 ${item.color}`}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  {item.icon}
                </div>
                <h2 className="mb-3 font-heading text-2xl font-black text-[#0b1c43]">
                  {item.title}
                </h2>
                <p className="text-sm font-medium leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#E85222]">
                Patient First Technology
              </p>
              <h2 className="mb-5 font-heading text-3xl font-black text-[#0b1c43] md:text-4xl">
                Technology that supports doctors at every step
              </h2>
              <p className="text-base leading-7 text-gray-600">
                From high-dependency ICU care to diagnostic decision support and
                modern operating environments, Popular Hospital focuses on
                practical medical infrastructure that helps teams deliver
                timely, coordinated, and quality care.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0b1c43] p-6 text-white">
              <h3 className="mb-4 font-heading text-2xl font-bold">
                Core Facilities
              </h3>
              <div className="space-y-3">
                {technologyHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3"
                  >
                    <span className="font-semibold">{item.title}</span>
                    <span className="h-2 w-2 rounded-full bg-[#E85222]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
