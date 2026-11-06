"use client";

import React from "react";
import { HOSPITALS_LIST } from "@/data/varanasiHospitalsData";
import { ListFilter, MapPin, Building, ArrowDown } from "lucide-react";

export default function HospitalTableOfContents() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d9488] flex items-center justify-center">
            <ListFilter className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 m-0">
              Hospital Directory &amp; Quick Jump
            </h3>
            <p className="text-xs text-gray-500 m-0">
              Jump directly to any verified hospital profile in this 2026 guide
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTo("comparison-table")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition"
          >
            <span>Compare Table</span>
            <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("how-to-choose")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition"
          >
            <span>Selection Guide</span>
            <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>

      <nav aria-label="Hospitals Table of Contents">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {HOSPITALS_LIST.map((hosp) => (
            <a
              key={hosp.id}
              href={`#${hosp.id}`}
              className={`p-3 rounded-2xl border text-left transition-all group flex flex-col justify-between ${
                hosp.isPopularHospital
                  ? "bg-gradient-to-br from-teal-50/70 to-emerald-50/40 border-teal-200 hover:border-teal-400 hover:shadow-sm"
                  : "bg-[#fafafa] border-gray-100 hover:border-gray-300 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`inline-block text-[11px] font-black px-2 py-0.5 rounded-md ${
                      hosp.isPopularHospital
                        ? "bg-[#0d9488] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {hosp.number}
                  </span>
                  {hosp.isPopularHospital && (
                    <span className="text-[10px] font-bold text-[#0d9488] tracking-tight uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0d9488] transition line-clamp-1">
                  {hosp.shortName}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2 truncate">
                <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                <span className="truncate">{hosp.area}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
