"use client";

import React, { useState } from "react";
import { FaqItem } from "@/data/varanasiHospitalsData";
import { ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const headingId = `faq-heading-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-white border-[#0d9488]/40 shadow-md ring-1 ring-[#0d9488]/20"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
            }`}
          >
            <h3 id={headingId} className="text-base font-bold text-gray-900 m-0">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              >
                <span className="flex items-center gap-3 text-base sm:text-lg font-bold text-gray-900">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#0d9488] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#0d9488]" : ""
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={`px-5 sm:px-6 pb-5 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100/60 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <p className="m-0 pl-10 text-gray-600 leading-relaxed font-normal">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
