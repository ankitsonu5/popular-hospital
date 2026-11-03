"use client";

import React, { useEffect, useRef, useState } from "react";

const EMERGENCY_NUMBERS = [
  { label: "MOBILE 1:", display: "+91-7800001895", href: "tel:+917800001895" },
  { label: "MOBILE 2:", display: "+91-7800001896", href: "tel:+917800001896" },
  { label: "AMBULANCE:", display: "+91-9519999280", href: "tel:+919519999280" },
];

const EmergencySidebar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolledOnMobile, setIsScrolledOnMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or ESC key
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

  // Hide on mobile after scrolling down past 180px
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) {
        if (window.scrollY > 180) {
          setIsScrolledOnMobile(true);
          setOpen(false);
        } else {
          setIsScrolledOnMobile(false);
        }
      } else {
        setIsScrolledOnMobile(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-[999] flex items-center emergency-sidebar-container jakarta-font-scope transition-all duration-300 ${
        isScrolledOnMobile
          ? "-translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100"
          : "translate-x-0 opacity-100 pointer-events-auto"
      }`}
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
          className={`bg-[#E85222] hover:bg-[#D2461B] text-white px-2 sm:px-2.5 min-h-[220px] sm:min-h-[260px] md:min-h-[320px] flex items-center justify-center transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white ${
            open ? "border-r border-white/30" : "rounded-r-2xl"
          }`}
        >
          <span className="text-[11px] sm:text-[12px] md:text-[13px] font-extrabold [-webkit-text-stroke:0.5px_currentColor] uppercase tracking-[0.25em] sm:tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl] [text-orientation:upright]">
            EMERGENCY
          </span>
        </button>

        {/* Panel with emergency numbers */}
        {open && (
          <div
            id="emergency-contacts-popup"
            role="dialog"
            aria-label="Emergency contact numbers"
            className="bg-[#E85222] text-white rounded-r-2xl px-5 py-5 sm:px-7 sm:py-6 min-w-[280px] sm:min-w-[320px] max-w-[calc(100vw-3.5rem)] flex flex-col justify-center"
          >
            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {EMERGENCY_NUMBERS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 sm:gap-8"
                >
                  <span className="text-[13px] sm:text-[15px] font-extrabold tracking-wide">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-[13px] sm:text-[15px] font-bold hover:underline whitespace-nowrap"
                  >
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/30">
              <span className="block text-[13px] sm:text-[15px] font-extrabold tracking-wide mb-1.5">
                ADDRESS:
              </span>
              <address className="not-italic text-[12px] sm:text-[14px] font-semibold leading-relaxed">
                N-10 / 60, A-2, B.L.W. Road, Kakarmatta,
                <br />
                Varanasi 221004, Uttar Pradesh, India
              </address>
              <a
                href="https://maps.app.goo.gl/8KVyxNdETY219tRD6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 sm:mt-4 inline-flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 px-4 bg-white text-[#E85222] hover:bg-orange-50 font-bold text-[13px] sm:text-[14px] rounded-xl shadow-md transition-all active:scale-[0.98] group cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#E85222] group-hover:scale-110 transition-transform"
                >
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close emergency contacts"
          className="ml-2 sm:ml-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#E85222] hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 sm:w-6 sm:h-6"
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
