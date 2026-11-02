"use client";

import React, { useEffect, useRef, useState } from "react";

const EMERGENCY_NUMBERS = [
  { label: "MOBILE 1:", display: "+91-7800001895", href: "tel:+917800001895" },
  { label: "MOBILE 2:", display: "+91-7800001896", href: "tel:+917800001896" },
  { label: "AMBULANCE:", display: "+91-9519999280", href: "tel:+919519999280" },
];

const EmergencySidebar = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[999] hidden md:flex items-center emergency-sidebar-container jakarta-font-scope"
    >
      {/* Tab + panel share one row and stretch to the same height */}
      <div className="flex items-stretch shadow-2xl rounded-r-2xl">
        {/* Vertical "Emergency" tab */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Emergency contact numbers"
          aria-expanded={open}
          aria-controls="emergency-contacts-popup"
          className={`bg-[#E85222] hover:bg-[#D2461B] text-white px-2.5 min-h-[320px] flex items-center justify-center transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white ${
            open ? "border-r border-white/30" : "rounded-r-2xl"
          }`}
        >
          <span className="text-[13px] xl:text-[12px] font-extrabold [-webkit-text-stroke:0.5px_currentColor] uppercase tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl] [text-orientation:upright]">
            EMERGENCY
          </span>
        </button>

        {/* Panel with emergency numbers */}
        {open && (
          <div
            id="emergency-contacts-popup"
            role="dialog"
            aria-label="Emergency contact numbers"
            className="bg-[#E85222] text-white rounded-r-2xl px-7 py-6 min-w-[320px] flex flex-col justify-center"
          >
            <ul className="flex flex-col gap-4">
              {EMERGENCY_NUMBERS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-8"
                >
                  <span className="text-[15px] font-extrabold tracking-wide">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-[15px] font-bold hover:underline whitespace-nowrap"
                  >
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/30">
              <span className="block text-[15px] font-extrabold tracking-wide mb-1.5">
                ADDRESS:
              </span>
              <address className="not-italic text-[14px] font-semibold leading-relaxed">
                N-10 / 60, A-2, B.L.W. Road, Kakarmatta,
                <br />
                Varanasi 221004, Uttar Pradesh, India
              </address>
            </div>
          </div>
        )}
      </div>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close emergency contacts"
          className="ml-3 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#E85222] hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EmergencySidebar;
