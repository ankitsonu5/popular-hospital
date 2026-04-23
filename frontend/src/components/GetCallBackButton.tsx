"use client";

import { useState } from "react";

interface Props {
  department: string;
  className?: string;
  children?: React.ReactNode;
}

export default function GetCallBackButton({ department, className, children }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api-backend/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, department }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        onClick={() => { setShowModal(true); setStatus("idle"); }}
        className={className}
      >
        {children}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#0b1c43] mb-2 font-heading">Get a Call Back</h3>
            <p className="text-gray-500 text-sm mb-6">Our team will call you shortly.</p>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="text-green-500 text-5xl mb-3">✓</div>
                <p className="text-gray-700 font-semibold">Thank you! We will call you back soon.</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 bg-[#e11d48] text-white px-6 py-2 rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#e11d48] focus:ring-2 focus:ring-rose-100 focus:outline-none transition-all"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#e11d48] hover:bg-rose-700 disabled:opacity-60 text-white py-3 rounded-full font-semibold transition-all"
                >
                  {status === "loading" ? "Submitting..." : "Request Call Back"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
