"use client";

import { useState, useEffect } from "react";
import type { ReactElement, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { fetchDoctors, fetchBranches, createBooking } from "@/lib/api";
import type { Doctor, Branch } from "@/lib/api";
import { formatTimeToAmPm } from "@/lib/time";

type SearchParams = Promise<{ doctor?: string; branch?: string }>;

export function BookingForm({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const presetDoctor = urlSearchParams.get("doctor") || "";
  const presetBranch = urlSearchParams.get("branch") || "";

  useEffect(() => {
    Promise.all([fetchDoctors(), fetchBranches()]).then(([d, b]) => {
      setDoctors(d);
      setBranches(b);
      if (presetDoctor) setDoctorId(presetDoctor);
      if (presetBranch) setBranchId(presetBranch);
    });
  }, [presetDoctor, presetBranch]);

  const minDate = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !doctorId ||
      !branchId ||
      !slotDate ||
      !slotTime ||
      !patientName ||
      !patientPhone
    ) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createBooking({
        doctor: doctorId,
        branch: branchId,
        slot_date: slotDate,
        slot_time: slotTime,
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_email: patientEmail || undefined,
        notes: notes || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Booking failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-jakarta text-2xl font-black text-[#0b1c43]">
          Booking Confirmed
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-600">
          We have received your appointment request. Our team will confirm
          shortly.
        </p>
        <button
          type="button"
          className="mt-6 rounded-lg bg-[#E85222] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#d1451a]"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8"
    >
      <div className="mb-6 flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-jakarta text-xs font-extrabold uppercase tracking-[0.18em] text-[#E85222]">
            Appointment Details
          </p>
          <h2 className="mt-2 font-jakarta text-2xl font-black text-[#0b1c43]">
            Tell us when you would like to visit
          </h2>
        </div>
        <p className="text-xs font-bold text-slate-500">
          Fields marked * are required
        </p>
      </div>
      {error && (
        <p className="mb-5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="doctor" icon={<Stethoscope />}>
            Doctor *
          </FieldLabel>
          <select
            id="doctor"
            required
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
          >
            <option value="">Select doctor</option>
            {doctors.map((d) => (
              <option key={d._id || d.id} value={d._id || d.id}>
                {d.name} – {d.speciality_name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="branch" icon={<Building2 />}>
            Branch *
          </FieldLabel>
          <select
            id="branch"
            required
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
          >
            <option value="">Select branch</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="slotDate" icon={<CalendarDays />}>
            Date *
          </FieldLabel>
          <input
            id="slotDate"
            type="date"
            required
            min={minDate}
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="slotTime" icon={<Clock3 />}>
            Time *
          </FieldLabel>
          <input
            id="slotTime"
            type="time"
            required
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
          />
          {slotTime && (
            <p className="text-xs font-semibold text-slate-500">
              Selected time: {formatTimeToAmPm(slotTime)}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 border-t border-slate-100 pt-6">
        <p className="mb-5 font-jakarta text-xs font-extrabold uppercase tracking-[0.18em] text-[#284a91]">
          Patient Information
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="patientName" icon={<UserRound />}>
              Your name *
            </FieldLabel>
            <input
              id="patientName"
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="patientPhone" icon={<Phone />}>
              Phone *
            </FieldLabel>
            <input
              id="patientPhone"
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FieldLabel htmlFor="patientEmail" icon={<Mail />}>
              Email
            </FieldLabel>
            <input
              id="patientEmail"
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FieldLabel htmlFor="notes" icon={<MessageSquareText />}>
              Notes (optional)
            </FieldLabel>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#284a91] focus:ring-4 focus:ring-[#284a91]/10"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#E85222] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#d1451a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-extrabold text-[#0b1c43] transition hover:border-[#284a91] hover:text-[#284a91]"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  );
}

function FieldLabel({
  htmlFor,
  icon,
  children,
}: {
  htmlFor: string;
  icon: ReactElement;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-extrabold text-[#0b1c43]"
      style={{ fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif' }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#284a91]/8 text-[#284a91] [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      {children}
    </label>
  );
}
