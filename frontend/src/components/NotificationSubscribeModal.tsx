"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bell,
  X,
  Phone,
  Mail,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const SPECIALTIES = [
  "Cardiology & Heart Care",
  "CTVS (Cardiothoracic & Vascular Surgery)",
  "Orthopedics & Joint Replacement",
  "Neurology & Neurosurgery",
  "Nephrology & Dialysis",
  "Gastroenterology & Hepatology",
  "Oncology & Cancer Care",
  "Gynaecology & Obstetrics",
  "Pediatrics & Neonatology",
  "Pediatric Surgery",
  "General & Laparoscopic Surgery",
  "General Medicine",
  "ENT (Ear, Nose & Throat)",
  "Ophthalmology (Eye Care)",
  "Dental Surgery",
  "Respiratory Medicine & Pulmonology",
  "Urology & Andrology",
  "Burns & Plastic Surgery",
  "Interventional Radiology",
  "IVF & Fertility Care",
  "Diabetic Foot Care",
  "Psychiatry & Mental Health",
  "Dietetics & Clinical Nutrition",
  "Pain Management",
  "Emergency & Trauma Care (24/7)",
  "Other / General Enquiry",
];

export default function NotificationSubscribeModal() {
  const [step, setStep] = useState<"none" | "prompt" | "modal">("none");
  const [mounted, setMounted] = useState(false);

  // Form states (Name first, then Phone, Email, Speciality)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [specialitySearch, setSpecialitySearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // On page load/reload, show the top-right subscribe prompt after a short gentle delay
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setStep("prompt");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Global event listener so any button/trigger can open the modal every time
  useEffect(() => {
    const handleOpen = () => {
      setStep("modal");
      setIsSubmitted(false);
      setErrorMsg("");
    };
    window.addEventListener("open-subscribe-modal", handleOpen);
    return () => window.removeEventListener("open-subscribe-modal", handleOpen);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDismissPrompt = () => {
    setStep("none");
  };

  const handleAcceptPrompt = () => {
    setStep("modal");
    setIsSubmitted(false);
    setErrorMsg("");
  };

  const handleCloseModal = () => {
    setStep("none");
  };

  const filteredSpecialties = SPECIALTIES.filter((item) =>
    item.toLowerCase().includes(specialitySearch.toLowerCase()),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    const phoneClean = phone.replace(/[\s\-\+]/g, "");
    if (!phoneClean || phoneClean.length < 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!speciality.trim()) {
      setErrorMsg("Please select a speciality.");
      return;
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api-backend/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          department: speciality.trim(),
          source: "notification_subscribe",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
      toast.success("Subscribed successfully! Our health advisor will call you.");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || step === "none") return null;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1st DESIGN: Top-Left Notification Prompt Card
      ────────────────────────────────────────────────────────────── */}
      {step === "prompt" && (
        <div className="fixed top-5 md:top-[120px] lg:top-[126px] 2xl:top-[140px] min-[1920px]:top-[154px] left-4 sm:left-6 md:left-8 z-[8000] w-[calc(100vw-2rem)] sm:w-[350px] max-w-[360px] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-slate-100/90 p-4 sm:p-5 text-center relative overflow-hidden">
            {/* Bottom-right decorative overlapping curved circles */}
            <div className="absolute -bottom-7 -right-7 w-28 h-28 pointer-events-none select-none z-0">
              <svg
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="160" cy="160" r="130" fill="#E8F1FC" />
                <circle
                  cx="160"
                  cy="160"
                  r="96"
                  stroke="#FBA86B"
                  strokeWidth="1.5"
                  fill="#F1F6FD"
                />
                <circle cx="160" cy="160" r="66" fill="#FFF5EC" />
              </svg>
            </div>

            <div className="relative z-10 mb-1.5">
              <h3 className="text-base sm:text-[18.5px] font-extrabold tracking-tight leading-snug">
                <span className="text-[#004bb1]">Welcome to </span>
                <span className="text-[#ff5500]">Popular Hospitals!</span>
              </h3>
            </div>

            <p className="relative z-10 text-[12px] sm:text-[13px] text-[#556477] font-medium leading-relaxed max-w-[300px] mx-auto mb-4">
              Subscribe to our alerts and receive regular healthcare information.
            </p>

            <div className="relative z-10 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleDismissPrompt}
                className="flex-1 py-2 px-3 bg-white hover:bg-blue-50/50 text-[#004bb1] border-[1.5px] border-[#004bb1] text-xs sm:text-[13.5px] font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow cursor-pointer active:scale-[0.98]"
              >
                No, Thanks
              </button>
              <button
                type="button"
                onClick={handleAcceptPrompt}
                className="flex-1 py-2 px-3 bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs sm:text-[13.5px] font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2nd DESIGN: Modal Dialog ("Need help finding what you were looking for?")
      ────────────────────────────────────────────────────────────── */}
      {step === "modal" && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-[430px] bg-[#f5f8fc] rounded-2xl shadow-2xl p-6 sm:p-7 border border-blue-50 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-7 h-7 rounded-full border border-gray-300 text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer bg-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center pr-6 pl-2 mb-5">
              <h2 className="text-lg sm:text-[20px] font-bold text-[#0b1c43] leading-snug">
                Need help finding what you were looking for?
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#0b1c43] mt-1.5">
                Get a call back from our Health advisor
              </p>
            </div>

            {/* Content: Form or Success */}
            {isSubmitted ? (
              <div className="text-center py-6 px-2 bg-white rounded-xl border border-green-100 shadow-sm animate-in zoom-in-95">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                  Thank You for Subscribing!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-xs mx-auto">
                  Your request has been received. Our health advisor will call you shortly on{" "}
                  <strong className="text-[#0b1c43]">{phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-[#0b1c43] hover:bg-[#152e68] text-white text-xs sm:text-sm font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Name Input First */}
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name*"
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1c43] focus:ring-1 focus:ring-[#0b1c43] transition-all shadow-2xs"
                  />
                </div>

                {/* 2. Phone Input Second */}
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone*"
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1c43] focus:ring-1 focus:ring-[#0b1c43] transition-all shadow-2xs"
                  />
                </div>

                {/* 3. Email Input */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1c43] focus:ring-1 focus:ring-[#0b1c43] transition-all shadow-2xs"
                  />
                </div>

                {/* 4. Search or Select Speciality */}
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm cursor-pointer flex items-center justify-between text-gray-900 shadow-2xs hover:border-gray-300 transition-colors"
                  >
                    <span className={speciality ? "text-gray-900 font-medium truncate" : "text-gray-400 truncate"}>
                      {speciality || "Search or select speciality*"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <input
                          type="text"
                          autoFocus
                          value={specialitySearch}
                          onChange={(e) => setSpecialitySearch(e.target.value)}
                          placeholder="Type to search speciality..."
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1c43]"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto divide-y divide-gray-50 text-xs">
                        {filteredSpecialties.length === 0 ? (
                          <div className="p-3 text-center text-gray-400">
                            No speciality found
                          </div>
                        ) : (
                          filteredSpecialties.map((item) => (
                            <div
                              key={item}
                              onClick={() => {
                                setSpeciality(item);
                                setIsDropdownOpen(false);
                                setSpecialitySearch("");
                              }}
                              className={`p-2.5 px-3.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                                speciality === item
                                  ? "bg-blue-50 text-[#0b1c43] font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {item}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 bg-[#0b1c43] hover:bg-[#152e68] text-white py-3 rounded-lg font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Request a Callback</span>
                  )}
                </button>
              </form>
            )}

            {/* Footer Disclaimer & Direct Contacts */}
            <div className="mt-4 pt-3 border-t border-gray-200/70 text-center">
              <p className="text-[11px] text-gray-500 leading-tight">
                By Clicking on agree to our{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy policy
                </a>
                ,{" "}
                <a href="/terms-conditions" className="text-blue-600 hover:underline">
                  Terms of use & Disclaimer
                </a>
              </p>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#f5f8fc] px-2 text-gray-500 font-semibold">
                    or
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm font-semibold text-[#0b1c43]">
                <a
                  href="tel:+917800001895"
                  className="flex items-center justify-center gap-2 hover:text-[#e11d48] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0b1c43] text-white flex items-center justify-center text-xs">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <span>Call: +91-7800001895</span>
                </a>

                <a
                  href="mailto:info@popularhospitals.in"
                  className="flex items-center justify-center gap-2 hover:text-[#e11d48] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0b1c43] text-white flex items-center justify-center text-xs">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span className="truncate">Email: info@popularhospitals.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
