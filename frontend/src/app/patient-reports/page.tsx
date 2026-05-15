"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  FileText,
  Phone,
  Mail,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function PatientReportsPage() {
  const [searchMethod, setSearchMethod] = useState<"bill" | "reg">("bill");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        "Report searching functionality will be integrated with the hospital HMS system.",
      );
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* ═══════ HERO / BANNER ═══════ */}
      <section className="relative h-[250px] md:h-[300px] w-full bg-[#1e3a5f] overflow-hidden flex items-center">
        {/* Navy Background with Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1e3a5f] mix-blend-multiply" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0d9488 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-3xl">
            <span className="text-[#0d9488] text-sm font-black uppercase tracking-[0.2em] mb-3 block">
              Digital Healthcare.
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-heading tracking-tight leading-tight">
              Patient Reports Online.
            </h1>
            <p className="text-white/70 text-base md:text-lg font-medium max-w-xl">
              Quickly find and download your medical reports using your Bill ID
              or Registration Number.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ SEARCH SECTION ═══════ */}
      <section className="py-12 md:py-20 px-4 md:px-6 -mt-10 relative z-20">
        <div className="mx-auto max-w-5xl">
          {/* Main Card with Left Image (Matching Wellness style) */}
          <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(30,58,95,0.1)] border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Left Side: Image (Unique Touch like Wellness) */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <Image
                  src="/images/health-packages/health_packages.jpg"
                  alt="Medical Reports"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/40 to-transparent md:bg-gradient-to-t md:from-[#1e3a5f]/40 md:to-transparent" />
                <div className="absolute bottom-8 left-8 text-white z-10 hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#0d9488] flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-wide uppercase text-sm">
                      SECURE ACCESS
                    </span>
                  </div>
                  <p className="text-white/80 text-xs font-bold leading-relaxed max-w-[200px]">
                    Your privacy is our priority. All data is encrypted and
                    secure.
                  </p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-[#1e3a5f] mb-2 uppercase tracking-tight">
                    Search Your Report
                  </h2>
                  <div className="w-12 h-1.5 bg-[#0d9488] rounded-full" />
                </div>

                <div className="bg-gray-50 p-1.5 rounded-2xl inline-flex w-fit mb-8 border border-gray-100">
                  <button
                    onClick={() => setSearchMethod("bill")}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      searchMethod === "bill"
                        ? "bg-white text-[#1e3a5f] shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Bill ID
                  </button>
                  <button
                    onClick={() => setSearchMethod("reg")}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      searchMethod === "reg"
                        ? "bg-white text-[#1e3a5f] shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Reg. No
                  </button>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative group">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={
                        searchMethod === "bill"
                          ? "Enter Bill ID (e.g. PHV25-123)"
                          : "Enter Reg. No (e.g. REG-456)"
                      }
                      className="block w-full px-8 py-5 bg-white border-2 border-gray-100 rounded-2xl text-lg font-bold text-[#1e3a5f] placeholder-gray-300 focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/5 transition-all outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0d9488] hover:bg-[#0b7e74] text-white py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-[#0d9488]/20 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Search Now</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 flex items-center gap-3 text-orange-600/80 font-bold bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-xs">
                    Note: Reports may take 24-48 hours to appear online.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ SUPPORT SECTION ═══════ */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#0d9488]/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a5f]">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1e3a5f] uppercase tracking-tight">
                    Need Help?
                  </h3>
                  <div className="flex flex-col text-sm font-bold text-gray-500">
                    <a
                      href="tel:+917800001895"
                      className="hover:text-[#0d9488] transition-colors"
                    >
                      +91-7800001895 / 96
                    </a>
                    <a
                      href="tel:+917800001896"
                      className="hover:text-[#0d9488] transition-colors"
                    >
                      +91-7800001896
                    </a>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-[#0d9488] transform group-hover:translate-x-1 transition-all" />
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#0d9488]/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0d9488]">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1e3a5f] uppercase tracking-tight">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@popularhospitals.in"
                    className="text-sm font-bold text-gray-500 hover:text-[#0d9488] transition-colors block"
                  >
                    info@popularhospitals.in
                  </a>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-[#0d9488] transform group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
