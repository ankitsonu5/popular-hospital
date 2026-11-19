"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Phone,
  Search,
  Stethoscope,
} from "lucide-react";
import { CImage, T } from "@/components/content/Editable";

const highlights = [
  "Two Modern Cath Labs",
  "HD-IVUS & Rotablation",
  "Radial Angioplasty",
  "NABH Accredited",
];

/* Decorative flowing lines behind the hero (pure SVG, no image needed) */
function HeroWaves() {
  const lines = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      fill="none"
    >
      {lines.map((i) => (
        <path
          key={`a${i}`}
          d={`M-40 ${330 + i * 5} C 260 ${180 + i * 9}, 520 ${430 - i * 7}, 860 ${300 + i * 3} S 1300 ${120 + i * 6}, 1500 ${170 + i * 4}`}
          stroke="#E85222"
          strokeOpacity={0.08 + (i % 4) * 0.03}
          strokeWidth={1}
        />
      ))}
      {lines.slice(0, 10).map((i) => (
        <path
          key={`b${i}`}
          d={`M900 ${-20 + i * 6} C 1080 ${90 + i * 5}, 1260 ${-10 + i * 7}, 1500 ${60 + i * 6}`}
          stroke="#1e3a8a"
          strokeOpacity={0.07}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

export default function CardiologyHero() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "invalid"
  >("idle");
  const [query, setQuery] = useState("");

  const submitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = form.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api-backend/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone,
          email: form.email.trim() || undefined,
          department: "Cardiology",
          source: "cardiology-hero-enquiry",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  const findDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ speciality: "cardiology" });
    if (query.trim()) params.set("search", query.trim());
    router.push(`/doctors?${params.toString()}`);
  };

  const input =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#E85222] focus:ring-2 focus:ring-[#E85222]/15 focus:outline-none transition-all";

  return (
    <section className="relative pb-2 md:pb-4">
      {/* ── Light hero band ── */}
      <div className="relative bg-[#f4f5f7] overflow-hidden">
        <HeroWaves />
        <div className="relative mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 pt-10 md:pt-12 pb-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Text */}
            <div className="lg:col-span-5 order-1">
              <p className="text-[#0b1c43] font-bold text-lg md:text-xl mb-1">
                <T
                  k="departments-cardiology_hero_eyebrow"
                  d={"World-class Heart Care"}
                />
              </p>
              <h1 className="font-heading font-bold text-[#0b1c43] leading-[1.1] text-4xl md:text-5xl 2xl:text-6xl">
                <T k="departments-cardiology_hero_h1a" d={"Department of"} />{" "}
                <span className="text-[#E85222]">
                  <T k="departments-cardiology_hero_h1b" d={"Cardiology"} />
                </span>
              </h1>
              <p className="text-slate-600 text-[15px] md:text-base leading-relaxed mt-4 max-w-md">
                <T
                  k="departments-cardiology_hero_sub"
                  d={
                    "Advanced heart care in Varanasi, from ECG and Echo to complex angioplasty, pacemakers and emergency heart attack treatment."
                  }
                />
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 max-w-md">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-[13.5px] font-semibold text-[#0b1c43]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E85222] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <a
                href="tel:+917800001895"
                className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#E85222] hover:underline"
              >
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#E85222] opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#E85222]" />
                </span>
                24x7 Cardiac Emergency: +91-7800001895
              </a>
            </div>

            {/* Heart medallion */}
            <div className="lg:col-span-3 order-2 flex justify-center py-4 lg:py-0">
              <div className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-[15.5rem] lg:h-[15.5rem] 2xl:w-80 2xl:h-80">
                <div className="absolute -inset-5 rounded-full border border-dashed border-slate-400/70" />
                <div className="absolute inset-0 rounded-full bg-white shadow-[0_20px_50px_-20px_rgba(11,28,67,0.35)] p-3">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <CImage
                      k="departments-cardiology_hero_heart"
                      src="/images/departments-images/preventive_cardiology.jpeg"
                      alt="Illustration of the human heart"
                      fill
                      sizes="320px"
                      priority
                      className="object-cover object-[56%_50%] scale-[1.35]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-4 order-3">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(11,28,67,0.25)] p-6 md:p-7">
                <h2 className="text-xl font-bold text-[#0b1c43] mb-1">
                  <T
                    k="departments-cardiology_hero_form_title"
                    d={"Enquiry Form"}
                  />
                </h2>
                <p className="text-slate-500 text-xs mb-5">
                  Our cardiac team will call you back shortly.
                </p>
                {status === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="font-semibold text-slate-700">
                      Thank you! We will call you back soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-sm font-semibold text-[#E85222] hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitEnquiry} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter Your Name*"
                      aria-label="Your name"
                      className={input}
                    />
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1.5 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 font-medium whitespace-nowrap flex-shrink-0">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="Enter Your Mobile Number*"
                        aria-label="Mobile number"
                        className={input}
                      />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="Enter Your Email"
                      aria-label="Email"
                      className={input}
                    />
                    {status === "invalid" && (
                      <p className="text-red-500 text-xs">
                        Please enter a valid 10-digit mobile number.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-red-500 text-xs">
                        Something went wrong. Please try again or call
                        +91-7800001895.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 bg-[#E85222] hover:bg-[#d4461b] disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {status === "loading" ? "Submitting..." : "Submit"}
                      <span className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating search / action bar ── */}
      <div className="relative mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 -mt-10 md:-mt-11">
        <form
          onSubmit={findDoctor}
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-[0_12px_40px_-12px_rgba(11,28,67,0.25)] overflow-hidden"
        >
          <label className="flex items-center gap-3 flex-1 px-5 py-4">
            <span className="w-9 h-9 rounded-full bg-[#E85222] flex items-center justify-center flex-shrink-0">
              <Search className="w-4 h-4 text-white" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Cardiologists"
              aria-label="Search for cardiologists"
              className="w-full text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </label>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#E85222] hover:bg-[#d4461b] text-white px-8 py-4 font-bold text-[15px] md:text-base transition-colors"
          >
            <Stethoscope className="w-5 h-5" /> Find a Doctor
          </button>
          <Link
            href="/book"
            className="flex items-center justify-center gap-2 text-[#0b1c43] hover:bg-slate-50 px-8 py-4 font-bold text-[15px] md:text-base transition-colors border-t md:border-t-0 border-slate-100"
          >
            <CalendarDays className="w-5 h-5 text-[#E85222]" /> Book Appointment
          </Link>
          <a
            href="tel:+919519001056"
            className="flex md:hidden xl:flex items-center justify-center gap-2 text-[#0b1c43] hover:bg-slate-50 px-6 py-4 font-bold text-[15px] transition-colors border-t md:border-t-0 md:border-l border-slate-100"
          >
            <Phone className="w-5 h-5 text-[#E85222]" /> Call Coordinator
          </a>
        </form>
      </div>
    </section>
  );
}
