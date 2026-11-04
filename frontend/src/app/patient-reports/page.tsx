"use client";

import React, { useState } from "react";
import {
  Search,
  FileText,
  Download,
  Phone,
  Mail,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { T } from "@/components/content/Editable";

type Method = "bill" | "reg";

interface ReportFile {
  id: string;
  name: string;
  mime: string;
  token: string; // short-lived signed link
}

interface Report {
  id: string;
  patient_name: string;
  report_title: string;
  report_date: string;
  files: ReportFile[];
}

const STEPS = [
  {
    title: "Enter your ID",
    text: "Your Bill ID or Registration No. from the hospital receipt.",
  },
  {
    title: "Verify your mobile",
    text: "The mobile number you gave at registration.",
  },
  {
    title: "View or download",
    text: "Open your report as a PDF or image.",
  },
];

export default function PatientReportsPage() {
  const [method, setMethod] = useState<Method>("bill");
  const [value, setValue] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Report[] | null>(null);

  const switchMethod = (m: Method) => {
    setMethod(m);
    setValue("");
    setError("");
    setResults(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api-backend/patient-reports/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, value, mobile }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-[#1e3a5f] placeholder-gray-400 outline-none transition focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10";

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header band */}
      <section className="bg-[#1e3a5f] px-4 pb-24 pt-12 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl"><T k="patient-reports_67898a" d={"Patient Reports"} /></h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70 md:text-base"><T k="patient-reports_f6538f" d={"Find and download your medical reports securely, any time."} /></p>
        </div>
      </section>

      <div className="mx-auto -mt-16 max-w-2xl px-4 pb-16">
        {/* Search card */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div
            role="tablist"
            aria-label="Search by"
            className="mb-6 grid grid-cols-2 rounded-xl bg-gray-100 p-1"
          >
            {(
              [
                ["bill", "Bill ID"],
                ["reg", "Registration No."],
              ] as [Method, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={method === key}
                onClick={() => switchMethod(key)}
                className={`rounded-lg py-2 text-sm font-semibold transition ${
                  method === key
                    ? "bg-white text-[#1e3a5f] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label
                htmlFor="report-id"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {method === "bill" ? "Bill ID" : "Registration No."}
              </label>
              <input
                id="report-id"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  method === "bill" ? "e.g. PHV25-123" : "e.g. REG-456"
                }
                className={inputCls}
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="report-mobile"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              ><T k="patient-reports_9bf1ff" d={"Registered mobile number"} /></label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-500"><T k="patient-reports_b733cb" d={"+91"} /></span>
                <input
                  id="report-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit number"
                  className={`${inputCls} rounded-l-none`}
                  required
                  pattern="[0-9]{10}"
                  title="Enter the 10-digit mobile number registered with the hospital"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d9488] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0b7e74] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              {loading ? "Searching..." : "Find My Report"}
            </button>
          </form>

          {/* Result states */}
          <div aria-live="polite">
            {error && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {results && results.length === 0 && (
              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                <p className="font-semibold"><T k="patient-reports_68df05" d={"No report found"} /></p>
                <p className="mt-1"><T k="patient-reports_d04065" d={"Please check your ID and mobile number. Reports can take 24–48 hours to appear online — or call us and we will help."} /></p>
              </div>
            )}

            {results && results.length > 0 && (
              <ul className="mt-5 space-y-3">
                {results.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0d9488]">
                        <FileText className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-[#1e3a5f]">
                          {r.report_title}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {r.patient_name} ·{" "}
                          {new Date(r.report_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {r.files.map((f) => (
                        <li key={f.id}>
                          <a
                            href={`/api-backend/patient-reports/file/${f.token}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm transition hover:bg-teal-50"
                          >
                            <span className="min-w-0 truncate text-gray-700">
                              {f.name}
                            </span>
                            <span className="flex shrink-0 items-center gap-1 font-semibold text-[#0d9488]">
                              <Download className="h-4 w-4" /><T k="patient-reports_17a571" d={" Open"} /></span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 text-[#0d9488]" /><T k="patient-reports_a36a67" d={"Your reports are private. Download links work for a few minutes only."} /></p>
        </section>

        {/* How it works */}
        <section className="mt-8">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-500"><T k="patient-reports_1dd6a1" d={"How it works"} /></h2>
          <ol className="grid gap-3 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-gray-100 bg-white p-4"
              >
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-[#1e3a5f]">
                  {step.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Help */}
        <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#1e3a5f]"><T k="patient-reports_bd321d" d={"Need help finding your report?"} /></p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-600 sm:flex-row sm:gap-5">
            <a
              href="tel:+917800001895"
              className="flex items-center gap-2 hover:text-[#0d9488]"
            >
              <Phone className="h-4 w-4" /><T k="patient-reports_731451" d={" +91-7800001895"} /></a>
            <a
              href="mailto:info@popularhospitals.in"
              className="flex items-center gap-2 hover:text-[#0d9488]"
            >
              <Mail className="h-4 w-4" /><T k="patient-reports_e048a4" d={" info@popularhospitals.in"} /></a>
          </div>
        </section>
      </div>
    </main>
  );
}
