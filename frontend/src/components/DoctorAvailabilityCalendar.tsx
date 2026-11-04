"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDoctorBooking } from "./DoctorBookingProvider";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export default function DoctorAvailabilityCalendar() {
  const { selectedDate, setSelectedDate, openBooking } = useDoctorBooking();

  const now = new Date();
  const todayISO = toISO(now.getFullYear(), now.getMonth(), now.getDate());

  const [view, setView] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Previous month is not allowed before the current month
  const isCurrentMonth =
    view.year === now.getFullYear() && view.month === now.getMonth();

  const goPrev = () => {
    if (isCurrentMonth) return;
    setView((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { year: v.year, month: v.month - 1 },
    );
  };

  const goNext = () => {
    setView((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { year: v.year, month: v.month + 1 },
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-[#0b1c43] to-[#284a91] px-4 py-2.5 text-sm font-bold text-white">
        To Check Availability, Select the Date
      </div>

      <div className="px-4 pb-4 pt-3">
        {/* Month navigation */}
        <div className="mb-3 flex items-center justify-between text-sm font-semibold">
          <button
            type="button"
            onClick={goPrev}
            disabled={isCurrentMonth}
            className="flex items-center gap-1 text-[#284a91] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <span className="text-gray-600">
            {MONTHS[view.month]} {view.year}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-1 text-[#0b1c43] cursor-pointer"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Weekday strip */}
        <div className="grid grid-cols-7 rounded-md bg-[#284a91] py-2 text-center text-xs font-bold text-white">
          {WEEKDAYS.map((d, i) => (
            <span
              key={d}
              className={i < 6 ? "border-r border-white/50" : undefined}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Date grid */}
        <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
          {cells.map((day, idx) => {
            if (day === null) return <span key={`blank-${idx}`} />;

            const iso = toISO(view.year, view.month, day);
            const isPast = iso < todayISO;
            const isToday = iso === todayISO;
            const isSelected = iso === selectedDate;

            return (
              <button
                key={iso}
                type="button"
                disabled={isPast}
                onClick={() => setSelectedDate(iso)}
                aria-pressed={isSelected}
                aria-label={`${day} ${MONTHS[view.month]} ${view.year}`}
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-[#E85222] text-white"
                    : isPast
                      ? "cursor-not-allowed text-gray-300"
                      : isToday
                        ? "text-[#E85222] hover:bg-[#E85222]/10 cursor-pointer"
                        : "text-gray-600 hover:bg-[#E85222]/10 cursor-pointer"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={openBooking}
          className="mt-4 flex h-12 w-full items-stretch overflow-hidden rounded-md bg-[#E85222] text-white transition-colors hover:bg-[#d1451a] cursor-pointer"
        >
          <span className="flex flex-1 items-center justify-center text-sm font-bold">
            Book an Appointment
          </span>
          <span className="flex w-12 items-center justify-center bg-black/15">
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </div>
  );
}
