import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ServiceSection = {
  id: string;
  title: string;
  eyebrow?: string;
  highlight?: string;
  content: ReactNode;
  image?: string;
  imgAlt?: string;
  imageClassName?: string;
};

type ServiceDetailPageProps = {
  title: string;
  breadcrumb: string;
  heroImage: string;
  heroAlt: string;
  sections: ServiceSection[];
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
    eyebrow: string;
  };
};

const SectionHeader = ({
  title,
  highlight,
  eyebrow,
}: {
  title: string;
  highlight?: string;
  eyebrow?: string;
}) => (
  <div className="mb-7">
    {eyebrow && (
      <p className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-[#284a91]">
        {eyebrow}
      </p>
    )}
    <h2 className="max-w-4xl text-2xl font-black leading-tight text-[#0b1c43] md:text-3xl lg:text-[2.35rem]">
      {title} {highlight && <span className="text-[#284a91]">{highlight}</span>}
    </h2>
    <div className="mt-4 flex items-center gap-3">
      <div className="h-1.5 w-1.5 rounded-full bg-[#cf2e2e]" />
      <div className="h-px w-24 bg-gradient-to-r from-[#cf2e2e] via-[#284a91] to-transparent" />
    </div>
  </div>
);

export function ServiceDetailPage({
  title,
  breadcrumb,
  heroImage,
  heroAlt,
  sections,
  cta,
}: ServiceDetailPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc]">
      <section className="relative flex min-h-[300px] w-full items-center overflow-hidden bg-[#0b1c43] py-10 font-sans md:h-[300px] md:py-0 lg:h-[320px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="mb-5 text-3xl font-black leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <nav
              className="flex items-center text-xs font-bold text-white/90 md:text-base"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="uppercase tracking-wider transition-colors hover:text-blue-300"
              >
                Home
              </Link>
              <span className="mx-3 font-black text-red-500">/</span>
              <Link
                href="/services"
                className="uppercase tracking-wider transition-colors hover:text-blue-300"
              >
                Services
              </Link>
              <span className="mx-3 font-black text-red-500">/</span>
              <span className="uppercase tracking-wider text-white">
                {breadcrumb}
              </span>
            </nav>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-white" />
        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:gap-10">
            {sections.map((section, idx) => {
              const showImage = Boolean(section.image);
              const isEven = idx % 2 === 0;

              return (
                <article
                  key={section.id}
                  className={`relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${
                    showImage ? "p-4 sm:p-5 lg:p-6" : "p-5 sm:p-8 lg:p-10"
                  }`}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#cf2e2e] via-[#284a91] to-[#0b1c43]" />
                  <div
                    className={`flex flex-col ${
                      showImage
                        ? isEven
                          ? "lg:flex-row-reverse"
                          : "lg:flex-row"
                        : ""
                    } gap-8 lg:gap-12`}
                  >
                    <div
                      className={`w-full ${
                        showImage
                          ? "lg:w-[58%] lg:px-2 lg:py-4"
                          : "mx-auto max-w-5xl"
                      }`}
                    >
                      <SectionHeader
                        title={section.title}
                        highlight={section.highlight}
                        eyebrow={section.eyebrow}
                      />
                      <div className="text-left [&_li>span:first-child]:mt-2 [&_li>span:first-child]:inline-block [&_li>span:first-child]:h-2 [&_li>span:first-child]:w-2 [&_li>span:first-child]:flex-shrink-0 [&_li>span:first-child]:rounded-full [&_li>span:first-child]:bg-[#284a91] [&_li>span:first-child]:text-transparent [&_li]:leading-relaxed [&_p]:text-left [&_p]:md:text-justify [&_ul]:rounded-2xl [&_ul]:border [&_ul]:border-slate-100 [&_ul]:bg-slate-50/70 [&_ul]:p-4">
                        {section.content}
                      </div>
                    </div>

                    {showImage && section.image && (
                      <div className="flex w-full justify-center lg:w-[42%]">
                        <div className="relative w-full">
                          <div
                            className={`group relative h-full w-full overflow-hidden rounded-[1.35rem] border border-white ${
                              section.imageClassName || "min-h-[260px] md:min-h-[340px] lg:min-h-full lg:h-full"
                            } ${
                              isEven
                                ? "rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[1rem] rounded-bl-[1rem]"
                                : "rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-[1rem] rounded-br-[1rem]"
                            }`}
                          >
                            <Image
                              src={section.image}
                              alt={section.imgAlt || section.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 42vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/35 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-[1366px] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white px-5 py-12 text-center shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:px-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#cf2e2e] via-[#284a91] to-[#0b1c43]" />
          <h2 className="mb-4 text-2xl font-black text-[#0b1c43] lg:text-3xl">
            {cta.title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600">
            {cta.description}
          </p>
          <div className="inline-flex flex-col items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row md:p-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="mb-1 text-sm font-bold uppercase tracking-[0.1em] text-gray-500">
                {cta.eyebrow}
              </p>
              <a
                href={cta.href}
                className="text-xl font-black text-red-600 transition-colors hover:text-red-700 md:text-2xl"
              >
                {cta.label}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
