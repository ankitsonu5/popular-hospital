"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  Calendar,
  Clock,
  Building2,
  User,
  Phone,
  Mail,
  CheckCircle2,
  X,
  FileText,
  ChevronDown,
} from "lucide-react";

export interface BookingDoctor {
  id?: string;
  _id?: string;
  name: string;
  qualifications?: string;
  designation?: string;
  slug: string;
  image?: string;
  /** Extra image URLs of the SAME doctor, tried in order if `image` fails to load. */
  images?: string[];
  speciality?: string;
}

interface BranchItem {
  _id: string;
  id?: string;
  name: string;
  slug?: string;
  is_active?: boolean;
}

// 30-minute intervals for Appointment Time
const TIME_SLOTS_30MIN = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
];

export default function DoctorBookingModal({
  doctor,
  onClose,
  initialDate,
}: {
  doctor: BookingDoctor | null;
  onClose: () => void;
  initialDate?: string;
}) {
  const minDate = new Date().toISOString().slice(0, 10);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [slotDate, setSlotDate] = useState(
    initialDate && initialDate >= minDate ? initialDate : minDate,
  );
  const [slotTime, setSlotTime] = useState("10:00 AM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [imgIdx, setImgIdx] = useState(0);

  // New doctor selected (cardiology page reuses one modal) — restart photo fallbacks
  const doctorKey = doctor?.slug;
  useEffect(() => {
    setImgIdx(0);
  }, [doctorKey]);

  // Load active branches from admin database and pre-select the 1st branch
  useEffect(() => {
    fetch("/api-backend/branches", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activeList = data.filter((b: any) => b.is_active !== false);
          const list = activeList.length > 0 ? activeList : data;
          setBranches(list);
          // Pre-select the first branch from admin
          if (list[0]) {
            setSelectedBranchId(String(list[0]._id || list[0].id || list[0].name));
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch branches:", err);
      });
  }, []);

  // Lock background scroll and close on Escape while the modal is open
  const isOpen = !!doctor;
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!doctor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      setError("Please enter your name.");
      return;
    }

    const cleanPhone = patientPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Mobile number must start with 6, 7, 8, or 9 (10 digits).");
      return;
    }

    if (!slotDate || !slotTime) {
      setError("Please select a preferred date and time.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const selectedBranchObj = branches.find(
        (b) => String(b._id || b.id || b.name) === selectedBranchId,
      );

      const bookingPayload = {
        doctor: doctor._id || doctor.id || doctor.slug,
        doctor_name: doctor.name,
        branch: selectedBranchId || selectedBranchObj?._id || "main",
        slot_date: slotDate,
        slot_time: slotTime,
        patient_name: patientName.trim(),
        patient_phone: cleanPhone,
        patient_email: patientEmail.trim() || undefined,
        notes: notes.trim() || `Consultation with ${doctor.name}`,
        source: "website",
      };

      const res = await fetch("/api-backend/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create booking.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Only this doctor's own images are ever tried (in order). If all fail we show
  // a neutral placeholder — never another doctor's photo.
  const photoCandidates = Array.from(
    new Set([doctor.image, ...(doctor.images ?? [])].filter(Boolean) as string[]),
  );
  const doctorPhoto = photoCandidates[imgIdx] ?? null;

  const prettyDate = (() => {
    try {
      return new Date(`${slotDate}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return slotDate;
    }
  })();

  const inputCls =
    "w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-base sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#284a91] focus:ring-2 focus:ring-[#284a91]/15";
  const labelCls =
    "mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600";

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex items-end justify-center bg-[#0b1c43]/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative flex max-h-[96dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[92vh] sm:max-w-4xl sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[#0b1c43] to-[#284a91] px-5 py-4 text-white md:px-6">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase leading-none tracking-widest text-[#FFAB73]">
              OPD Appointment
            </p>
            <h3
              id="booking-title"
              className="font-heading text-lg font-bold leading-tight md:text-xl"
            >
              Appointment Details
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Screen */
          <div className="flex-1 overflow-y-auto p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#0b1c43]">
              Booking Confirmed!
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              Thank you, <strong className="text-slate-800">{patientName}</strong>.
              Your appointment request for{" "}
              <strong className="text-[#0b1c43]">{doctor.name}</strong> on{" "}
              <strong className="text-[#E85222]">{prettyDate}</strong> at{" "}
              <strong className="text-[#E85222]">{slotTime}</strong> has been
              received.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Our hospital team will verify your slot shortly in the admin portal.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg bg-[#E85222] px-10 text-sm font-bold text-white shadow-md transition hover:bg-[#d1451a]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="grid md:grid-cols-5">
                {/* Doctor & summary */}
                <aside className="border-b border-slate-200 bg-slate-50 p-4 md:col-span-2 md:border-b-0 md:border-r md:p-6">
                  <div className="flex items-center gap-4 md:flex-col md:text-center">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#E85222]/30 bg-white md:h-28 md:w-28 md:border-4">
                      {doctorPhoto ? (
                        <Image
                          key={doctorPhoto}
                          src={doctorPhoto}
                          alt={doctor.name}
                          fill
                          unoptimized
                          className="object-cover object-top"
                          onError={() => setImgIdx((i) => i + 1)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-200">
                          <User className="h-1/2 w-1/2" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase leading-none tracking-wider text-[#E85222]">
                        Selected Specialist
                      </span>
                      <h4 className="mt-1 font-heading text-base font-bold leading-tight text-[#0b1c43] md:text-lg">
                        {doctor.name}
                      </h4>
                      {doctor.qualifications && (
                        <p className="mt-0.5 text-xs text-slate-500">
                          {doctor.qualifications}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs font-semibold text-[#284a91] sm:text-sm">
                        {doctor.speciality || "Cardiology Specialist"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6">
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        <Calendar className="h-3 w-3" /> Date
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#0b1c43] sm:text-sm">
                        {prettyDate}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        <Clock className="h-3 w-3" /> Time
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#0b1c43] sm:text-sm">
                        {slotTime}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 hidden text-xs leading-relaxed text-slate-500 md:block">
                    Our hospital team will verify your slot after you submit
                    the request.
                  </p>
                </aside>

                {/* Form */}
                <form
                  id="booking-form"
                  onSubmit={handleSubmit}
                  className="space-y-5 p-4 md:col-span-3 md:p-6"
                >
                  {error && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  <div className="space-y-4">
                    <h5 className="border-b border-slate-200 pb-2 text-sm font-bold text-[#0b1c43]">
                      Appointment
                    </h5>

                    <div>
                      <label className={labelCls}>
                        <Building2 className="h-3.5 w-3.5 text-[#284a91]" />
                        Hospital Branch *
                      </label>
                      <div className="relative">
                        <select
                          value={selectedBranchId}
                          onChange={(e) => setSelectedBranchId(e.target.value)}
                          required
                          className={`${inputCls} cursor-pointer appearance-none pr-9`}
                        >
                          {branches.map((b) => (
                            <option
                              key={b._id || b.id}
                              value={String(b._id || b.id || b.name)}
                            >
                              {b.name}
                            </option>
                          ))}
                          {branches.length === 0 && (
                            <option value="popular-hospital-varanasi">
                              Popular Hospital - Main Branch
                            </option>
                          )}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>
                          <Calendar className="h-3.5 w-3.5 text-[#284a91]" />
                          Date *
                        </label>
                        <input
                          type="date"
                          required
                          min={minDate}
                          value={slotDate}
                          onChange={(e) => setSlotDate(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>
                          <Clock className="h-3.5 w-3.5 text-[#284a91]" />
                          Time * (30 min slots)
                        </label>
                        <div className="relative">
                          <select
                            value={slotTime}
                            onChange={(e) => setSlotTime(e.target.value)}
                            required
                            className={`${inputCls} cursor-pointer appearance-none pr-9`}
                          >
                            {TIME_SLOTS_30MIN.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="border-b border-slate-200 pb-2 text-sm font-bold text-[#0b1c43]">
                      Patient Details
                    </h5>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>
                          <User className="h-3.5 w-3.5 text-[#284a91]" />
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>
                          <Phone className="h-3.5 w-3.5 text-[#284a91]" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile"
                          value={patientPhone}
                          onChange={(e) => {
                            const digits = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            setPatientPhone(digits);
                          }}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        <Mail className="h-3.5 w-3.5 text-[#284a91]" />
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>
                        <FileText className="h-3.5 w-3.5 text-[#284a91]" />
                        Health Notes / Symptoms (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief description of your concern..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white p-3 text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#284a91] focus:ring-2 focus:ring-[#284a91]/15 sm:text-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Sticky footer: always visible on mobile and desktop */}
            <div className="shrink-0 border-t border-slate-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6">
              <button
                type="submit"
                form="booking-form"
                disabled={loading}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E85222] text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-[#d1451a] active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? "Confirming Booking..." : "Confirm Booking"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
