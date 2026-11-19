"use client";

import { Share2 } from "lucide-react";
import { CImage, T } from "@/components/content/Editable";

export default function AwardsProfileHero({ onShare }: { onShare: () => void }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#071632",
        backgroundImage:
          "linear-gradient(120deg, #06132f 0%, #0b1c43 52%, #173675 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.12]">
        <CImage
          k="about-awards-recognition_b6eb4f"
          src="/images/banners/about_us_reward.jpg"
          alt="Awards and recognition banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,19,47,0.92) 0%, rgba(11,28,67,0.78) 52%, rgba(23,54,117,0.64) 100%)",
        }}
      />
      <div className="absolute -bottom-44 -right-28 h-[460px] w-[460px] rounded-full bg-[#E85222]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-10 px-5 pb-16 pt-14 sm:px-8 md:pt-20 lg:min-h-[680px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-0 lg:pt-0">
        <div className="order-2 lg:order-1 lg:self-end">
          <div className="relative mx-auto min-h-[430px] w-full max-w-[480px] sm:min-h-[520px] lg:min-h-[620px]">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
              <CImage
                k="about-awards-recognition_a8776d"
                src="/images/dr_ak_kaushik.png?v=20261118-1327"
                alt="Dr. A.K. Kaushik"
                fill
                className="object-contain object-bottom px-3 pt-16 sm:pt-20 lg:pt-24"
                priority
                unoptimized
              />
            </div>
            <div className="absolute bottom-0 left-8 right-8 z-20 h-1.5 rounded-t-full bg-[#E85222] shadow-[0_-8px_28px_rgba(232,82,34,0.4)]" />
          </div>
        </div>

        <div className="order-1 text-white lg:order-2 lg:py-16">
          <div className="border-l-4 border-[#E85222] pl-5 sm:pl-6">
            <h2 className="font-heading text-3xl font-black leading-none tracking-tight text-white sm:text-4xl">
              <T
                k="about-awards-recognition_cf7a53"
                d={"Dr. A.K. Kaushik"}
              />
            </h2>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.24em] text-white/55 sm:text-xs">
              <T
                k="about-awards-recognition_da7b25"
                d={"Chairman & Managing Director"}
              />
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm sm:p-5">
              <div className="mb-3 h-2 w-2 rounded-full bg-[#0d9488]" />
              <p className="text-sm font-bold leading-relaxed text-white/85">
                <T
                  k="about-awards-recognition_d242bb"
                  d={"General, Laparoscopic, & Minimal Invasive Surgeon"}
                />
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm sm:p-5">
              <div className="mb-3 h-2 w-2 rounded-full bg-[#0d9488]" />
              <p className="text-sm font-bold leading-relaxed text-white/85">
                <T
                  k="about-awards-recognition_8d3559"
                  d={"MBBS, MS (General Surgery) IMS-BHU"}
                />
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {[
              "POPULAR GROUP OF HOSPITALS",
              "POPULAR INSTITUTE OF MEDICAL FOUNDATION",
              "NIRAAMAYA DIAGNOSTICS",
            ].map((item) => (
              <p
                key={item}
                className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-[#06132f]/45 px-3 py-2 text-[8px] font-black uppercase leading-relaxed tracking-[0.12em] text-white/60"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#E85222]" />
                {item}
              </p>
            ))}
          </div>

          <button
            onClick={onShare}
            className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#E85222] px-6 py-3.5 text-white shadow-[0_14px_32px_rgba(232,82,34,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d8471e]"
          >
            <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              <T
                k="about-awards-recognition_5f83e2"
                d={"Share Profile"}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
