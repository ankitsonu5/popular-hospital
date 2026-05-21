import Image from "next/image";

export const metadata = {
  title: "Vision 2030 | Popular Hospital",
  description:
    "Popular Hospital's Vision 2030 for advanced, accessible, and patient-focused healthcare.",
};

const visionGoals = [
  {
    label: "Hospitals",
    current: "4",
    target: "16",
    accent: "bg-[#E85222]",
    description: "Expanding from 4 hospitals to 16 hospitals.",
  },
  {
    label: "Clinics",
    current: "New",
    target: "300",
    accent: "bg-[#00A6A6]",
    description: "Building a network of 300 clinics.",
  },
  {
    label: "Revenue",
    current: "150 Cr",
    target: "1200 Cr",
    accent: "bg-[#284a91]",
    description: "Growing revenue from 150 Crore to 1200 Crore.",
  },
];

const visionTopics = [
  {
    title: "Expansion Plan",
    description:
      "Popular Hospital is planning a wider healthcare network that connects hospitals, clinics, diagnostics, and patient support services. The goal is to make trusted treatment available closer to more families while maintaining quality and consistency.",
  },
  {
    title: "Revenue Growth",
    description:
      "The 2030 roadmap targets revenue growth from 150 Crore to 1200 Crore through service expansion, higher patient reach, stronger operational systems, and a broader multi-speciality care model.",
  },
  {
    title: "Future Hospitals",
    description:
      "The plan is to grow from 4 hospitals to 16 hospitals with modern infrastructure, specialist departments, advanced technology, and patient-first facilities across key locations.",
  },
  {
    title: "Leadership Vision",
    description:
      "The leadership vision is to build a healthcare ecosystem that combines medical excellence, affordability, compassionate service, and sustainable growth for the communities Popular Hospital serves.",
  },
];

export default function OurVision2030Page() {
  return (
    <main className="min-h-screen bg-[#f7fafc]">
      <section className="relative flex min-h-[180px] items-center overflow-hidden bg-[#0b1c43] py-10 md:min-h-[220px]">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/about_us_vision.jpg"
            alt="Vision 2030"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-[#0b1c43]/35" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white/80">
            Future Ready Healthcare
          </p>
          <h1 className="font-heading text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Vision 2030
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#E85222]">
              Growth Targets
            </p>
            <h2 className="font-heading text-2xl font-black leading-tight text-[#0b1c43] md:text-4xl">
              Building a stronger healthcare future
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-gray-600 md:text-lg">
              Vision 2030 is our roadmap for expanding hospital capacity,
              creating a wider clinic network, and growing with sustainable
              healthcare delivery.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {visionGoals.map((goal) => (
              <div
                key={goal.label}
                className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-slate-100 bg-white p-7 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(15,23,42,0.75)]"
              >
                <div className="absolute inset-x-0 bottom-0 h-3 bg-[#E85222]" />

                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                    {goal.label}
                  </p>
                  <div className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#ffe1d8] bg-[#fff7f4] px-2 text-xs font-black shadow-[0_8px_20px_-14px_rgba(232,82,34,0.9)]">
                    <span className="rounded-full bg-white px-2 py-1 text-slate-500 shadow-sm">
                      {goal.current}
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E85222] text-[10px] leading-none text-white">
                      →
                    </span>
                    <span className="rounded-full bg-[#E85222]/10 px-2 py-1 text-[#E85222]">
                      {goal.target}
                    </span>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="font-heading text-5xl font-black leading-none tracking-normal text-[#27263a] md:text-6xl">
                    {goal.target}
                  </div>
                  <p className="mt-4 text-base font-semibold leading-6 text-slate-600">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8fb] py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0b1c43] p-7 text-white shadow-[0_24px_60px_-36px_rgba(11,28,67,0.9)] md:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E85222]/25 blur-2xl" />
            <div className="absolute -bottom-20 left-4 h-44 w-44 rounded-full bg-[#00A6A6]/20 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#ff8a66]">
                  Roadmap
                </p>
                <h2 className="font-heading text-3xl font-black leading-tight md:text-4xl">
                  Expanding care with scale, discipline, and trust
                </h2>
                <p className="mt-5 text-sm font-semibold leading-7 text-white/72 md:text-base">
                  A structured growth plan focused on reach, systems,
                  infrastructure, and leadership-led healthcare delivery.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                <div>
                  <div className="font-heading text-2xl font-black text-white">
                    16
                  </div>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/55">
                    Hospitals
                  </p>
                </div>
                <div>
                  <div className="font-heading text-2xl font-black text-white">
                    300
                  </div>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/55">
                    Clinics
                  </p>
                </div>
                <div>
                  <div className="font-heading text-2xl font-black text-white">
                    2030
                  </div>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/55">
                    Target
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {visionTopics.map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[24px] border border-white bg-white p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-34px_rgba(15,23,42,0.7)] sm:p-6"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#E85222] opacity-90" />
                <div className="flex gap-4 pl-2">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fff2ed] font-heading text-sm font-black text-[#E85222] ring-1 ring-[#ffd8cb]">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="font-heading text-xl font-black text-[#0b1c43]">
                        {item.title}
                      </h3>
                      <span className="rounded-full bg-[#f0fbfb] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#008f8f]">
                        Step {index + 1}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-700 md:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
