import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import BookingSchema from "@/components/schema/BookingSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/book", {
  title: "Book Appointment",
  description:
    "Book doctor appointment or OPD at Popular Hospital online. Choose doctor, branch, date and time.",
  alternates: {
    canonical: "https://www.popularhospital.in/book",
  },
});
}


export default function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string; branch?: string }>;
}) {
  return (
    <>
      <DynamicSchema pageKey="booking" fallback={<BookingSchema />} />
      <main
        className="bg-[#f6f8fc]"
        style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif' }}
      >
        <section className="relative overflow-hidden bg-[#0b1c43] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(232,82,34,0.22),transparent_34%),linear-gradient(135deg,rgba(40,74,145,0.95),rgba(11,28,67,1))]" />
          <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-12 lg:py-14">
            <div className="flex flex-col justify-center">
              <p className="font-jakarta text-xs font-extrabold uppercase tracking-[0.22em] text-[#FFAB73]">
                OPD Appointment
              </p>
              <h1 className="mt-3 max-w-3xl font-jakarta text-3xl font-black leading-tight tracking-normal sm:text-4xl lg:text-5xl">
                Book your visit with Popular Hospital
              </h1>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/78 sm:text-lg">
                Choose your doctor, branch, preferred date, and time. Our team
                will review your request and confirm the slot shortly.
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-sm font-bold text-white/75">
                  Appointment support
                </span>
                <span className="rounded-full bg-[#E85222] px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
                  24/7
                </span>
              </div>
              <a
                href="tel:+917800001895"
                className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-[#0b1c43] transition hover:bg-white/92"
              >
                <span className="text-sm font-extrabold">
                  Call +91-7800001895
                </span>
                <span className="text-xs font-bold text-[#E85222]">
                  Tap to call
                </span>
              </a>
              <a
                href="tel:+917800001896"
                className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-[#0b1c43] transition hover:bg-white/90"
              >
                <span className="text-sm font-extrabold">
                  Call +91-7800001896
                </span>
                <span className="text-xs font-bold text-[#E85222]">
                  Tap to call
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-12 lg:py-10">
          <aside className="space-y-4">
            {[
              [
                "Quick confirmation",
                "Our team verifies your selected OPD slot.",
              ],
              ["Expert doctors", "Pick specialists across departments."],
              [
                "Multiple branches",
                "Choose the hospital branch nearest to you.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 h-1.5 w-12 rounded-full bg-[#E85222]" />
                <h2 className="font-jakarta text-base font-black text-[#0b1c43]">
                  {title}
                </h2>
                <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </aside>

          <Suspense
            fallback={
              <div className="h-96 animate-pulse rounded-xl bg-slate-100" />
            }
          >
            <BookingForm searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
