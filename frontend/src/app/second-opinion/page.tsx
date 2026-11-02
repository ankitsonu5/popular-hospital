"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DEPARTMENTS = [
  "Neurosurgery",
  "Gastroenterology",
  "Nephrology",
  "Oncology",
  "Urology",
  "Burns & Plastic Surgery",
  "Laparoscopy & General Surgery",
  "Obstetrics & Gynaecology",
  "Pediatrics And Neonatology",
  "Orthopedics & Joint Replacement",
  "General Medicine",
  "ENT",
  "Ophthalmology",
  "Dental",
  "Pulmonology & Chest/Respiratory Medicine Department",
  "Emergency and Trauma Care",
  "Blood Bank",
  "Ambulance",
  "Preventive Health Check Up",
  "Pharmacy",
  "Pathological Services",
  "Radiological Services",
  "Others",
];

export default function SecondOpinionPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    department: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    const phoneClean = form.phone.replace(/[\s\-\+]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneClean)) {
      setError("Please enter a valid phone number (10–15 digits).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api-backend/second-opinions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      setForm({ name: "", phone: "", department: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] text-white min-h-[150px] md:min-h-[200px] flex items-center z-10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0b1c43] z-0" />
          <Image
            src="/images/second_opinion.jpg"
            alt="Second Opinion"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/80 via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-12 w-full py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 font-heading tracking-tight drop-shadow-2xl text-white">
              Second Opinion
            </h1>
            <nav className="flex items-center text-sm md:text-lg font-bold tracking-widest uppercase">
              <Link
                href="/"
                className="text-gray-300 hover:text-[#E85222] transition-colors"
              >
                Home
              </Link>
              <span className="mx-4 text-[#E85222] font-black">/</span>
              <span className="text-white">Second Opinion</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ─── Main Content Section ─── */}
      <section className="py-20 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Side: Text Content */}
            <div className="lg:col-span-7 space-y-10">
              <div className="relative">
                {/* Decorative Element */}
                <div className="absolute -left-4 top-0 w-1 h-24 bg-[#E85222] rounded-full hidden md:block"></div>

                <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                  Why{" "}
                  <span className="text-[#2E59A8] not-italic">
                    Second Opinion
                  </span>{" "}
                  <br />
                  Is{" "}
                  <span className="text-[#2E59A8] not-italic underline decoration-[#E85222] decoration-4 underline-offset-8">
                    Necessary ?
                  </span>
                </h2>

                <div className="mt-8 flex items-center gap-3">
                  <div className="w-16 h-1.5 bg-[#2E59A8] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#E85222] rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-8 text-[#4a5568] text-lg md:text-xl leading-[1.8] font-medium">
                <p className="relative">
                  <span className="absolute -left-8 top-0 text-6xl text-gray-200 font-serif leading-none opacity-50 hidden md:block select-none">
                    "
                  </span>
                  When your diagnosis reveals a serious or life threatening
                  medical condition and your doctors suggest you to go for a
                  serious or risky medical treatment then having a second
                  opinion can verify your diagnosis and seriousness of your
                  medical condition. Also, it will save you from going through a
                  risky medical procedure which might not have been required.
                </p>
                <p className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#2E59A8] italic">
                  You must have a second opinion when you are already pursuing a
                  medical treatment but there is no significant affect on your
                  medical condition then it is a must to opt for{" "}
                  <strong className="text-[#0b1c43] font-black not-italic underline decoration-teal-400">
                    A SECOND OPINION
                  </strong>
                  .
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
                {/* Form Header gradient bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2E59A8] to-[#E85222]"></div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0b1c43] mb-2 font-heading">
                    Get Expert Consultation
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Fill the form below and our specialists will contact you.
                  </p>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-[#0b1c43]">
                      Request Submitted!
                    </h4>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Thank you. Our specialists will contact you shortly for
                      your second opinion consultation.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-sm text-[#2E59A8] font-semibold hover:underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                          required
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter Contact No"
                          required
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                        Department
                      </label>
                      <div className="relative">
                        <select
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 font-semibold appearance-none cursor-pointer outline-none"
                        >
                          <option value="">Select</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your query here..."
                        rows={3}
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-50 focus:border-[#2E59A8] focus:ring-0 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-semibold resize-none outline-none"
                      ></textarea>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium px-1">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-5 bg-[#E85222] hover:bg-[#d1451a] disabled:opacity-60 text-white font-black rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(232,82,34,0.3)] text-xl uppercase tracking-widest flex items-center justify-center gap-3"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="w-5 h-5 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT</span>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Decorative soft blob */}
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#2E59A8]/5 rounded-full blur-3xl group-hover:bg-[#E85222]/10 transition-colors duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
