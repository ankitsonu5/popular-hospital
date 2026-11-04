"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import DoctorBookingModal, { type BookingDoctor } from "./DoctorBookingModal";

interface DoctorBookingContextValue {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  openBooking: () => void;
}

const DoctorBookingContext = createContext<DoctorBookingContextValue | null>(
  null,
);

export function useDoctorBooking(): DoctorBookingContextValue {
  const ctx = useContext(DoctorBookingContext);
  if (!ctx) {
    throw new Error("useDoctorBooking must be used inside DoctorBookingProvider");
  }
  return ctx;
}

/**
 * Shares the calendar's selected date and the booking-modal open state between
 * the calendar (left column) and the SCHEDULE AN APPOINTMENT button (right column).
 */
export default function DoctorBookingProvider({
  doctor,
  children,
}: {
  doctor: BookingDoctor;
  children: ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DoctorBookingContext.Provider
      value={{ selectedDate, setSelectedDate, openBooking: () => setIsOpen(true) }}
    >
      {children}
      {isOpen && (
        <DoctorBookingModal
          doctor={doctor}
          initialDate={selectedDate ?? undefined}
          onClose={() => setIsOpen(false)}
        />
      )}
    </DoctorBookingContext.Provider>
  );
}
