"use client";

import { useState } from "react";

interface PatientRegion {
  title: string;
  description: string;
  points: string[];
}

interface InternationalPatientTabsProps {
  regions: PatientRegion[];
}

export default function InternationalPatientTabs({
  regions,
}: InternationalPatientTabsProps) {
  const [activeRegion, setActiveRegion] = useState(0);
  const region = regions[activeRegion];

  return (
    <div className="mb-10 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
      <h3 className="mb-4 text-2xl font-bold text-[#0b1c43] font-heading">
        Patients From
      </h3>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row">
        {regions.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveRegion(idx)}
            className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
              activeRegion === idx
                ? "bg-[#284a91] text-white shadow-md"
                : "bg-white text-[#284a91] hover:bg-blue-100"
            }`}
          >
            {item.title} Welcome
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h4 className="mb-2 text-xl font-bold text-[#0b1c43]">
          {region.title} Patients Welcome
        </h4>
        <p className="mb-4 text-gray-600">{region.description}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {region.points.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E85222] text-xs font-bold text-white">
                ✓
              </span>
              <span className="text-sm font-medium text-gray-700">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
