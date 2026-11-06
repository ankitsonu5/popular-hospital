"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HOSPITALS_LIST } from "@/data/varanasiHospitalsData";
import {
  ExternalLink,
  CheckCircle2,
  MapPin,
  Building2,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
} from "lucide-react";

export default function HospitalComparisonTable() {
  const [activeTab, setActiveTab] = useState<"cards" | "table">("cards");

  return (
    <div className="w-full">
      {/* Mobile View Toggle Bar */}
      <div className="flex md:hidden items-center justify-between bg-white p-2 rounded-2xl border border-gray-200 mb-4 shadow-xs">
        <span className="text-xs font-bold text-gray-700 pl-2">Display Style:</span>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "cards"
                ? "bg-white text-[#0d9488] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "table"
                ? "bg-white text-[#0d9488] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* MOBILE CARDS VIEW (Clean, 100% visible, no clipping on phones) */}
      <div className={`${activeTab === "cards" ? "block" : "hidden"} md:hidden space-y-4`}>
        {HOSPITALS_LIST.map((hosp) => (
          <div
            key={`card-${hosp.id}`}
            id={`m-${hosp.id}`}
            className={`rounded-2xl p-4 sm:p-5 border transition-all ${
              hosp.isPopularHospital
                ? "bg-gradient-to-b from-teal-50/70 via-white to-white border-teal-300 shadow-md ring-1 ring-teal-200"
                : "bg-white border-gray-200 shadow-xs hover:border-gray-300"
            }`}
          >
            {/* Top row: Number, Name, Featured Badge */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-start gap-2.5">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                    hosp.isPopularHospital
                      ? "bg-[#0d9488] text-white shadow-xs"
                      : "bg-[#1e3a5f] text-white"
                  }`}
                >
                  {hosp.number}
                </span>
                <div>
                  <a
                    href={`#${hosp.id}`}
                    className="font-bold text-base text-gray-900 hover:text-[#0d9488] transition block leading-snug"
                  >
                    {hosp.name}
                  </a>
                  {hosp.isPopularHospital && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0d9488] bg-teal-100/80 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Featured Hospital
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Category & Location Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 font-medium text-gray-700">
                <Building2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                {hosp.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 font-medium text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                {hosp.area} • {hosp.location}
              </span>
            </div>

            {/* Emergency Service Support Badge */}
            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100/80 text-xs text-emerald-900 font-medium flex items-start gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-bold text-emerald-950">Emergency Care: </span>
                {hosp.emergencyInfo}
              </div>
            </div>

            {/* Specialties Pill Tags */}
            <div className="mb-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                Key Specialties:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {hosp.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-0.5 rounded-md font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: Official Action Link (Only for Popular Hospital) */}
            {hosp.isPopularHospital && (
              <a
                href={hosp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#0d9488] hover:bg-teal-700 py-2.5 px-4 rounded-xl shadow-xs transition active:scale-[0.99]"
              >
                <span>Visit Popular Hospital Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* TABLE VIEW (Active on Desktop, and optionally switchable on mobile) */}
      <div
        className={`${
          activeTab === "table" ? "block" : "hidden md:block"
        } w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm`}
      >
        {/* Swipe notice only visible on mobile when table is active */}
        <div className="flex md:hidden items-center justify-between px-4 py-2 bg-amber-50/90 border-b border-amber-200/80 text-[11px] text-amber-900 font-bold">
          <span className="flex items-center gap-1.5">
            <span>👉</span> Swipe left / right to compare all 6 columns
          </span>
          <span className="text-[10px] uppercase tracking-wider text-amber-700 bg-white/90 px-2 py-0.5 rounded border border-amber-200">
            Scroll Table
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
          <table className="w-full text-left border-collapse min-w-[1020px]">
            <thead>
              <tr className="bg-[#1e3a5f] text-white text-xs font-bold uppercase tracking-wider">
                <th scope="col" className="py-4 px-5 font-heading w-[240px] min-w-[240px]">
                  Hospital Name
                </th>
                <th scope="col" className="py-4 px-4 font-heading w-[180px] min-w-[180px]">
                  Hospital Category
                </th>
                <th scope="col" className="py-4 px-4 font-heading w-[180px] min-w-[180px]">
                  Area / Location
                </th>
                <th scope="col" className="py-4 px-5 font-heading w-[240px] min-w-[240px]">
                  Selected Medical Specialties
                </th>
                <th scope="col" className="py-4 px-4 font-heading w-[200px] min-w-[200px]">
                  Emergency Service Support
                </th>
                <th scope="col" className="py-4 px-4 font-heading text-center w-[130px] min-w-[130px]">
                  Official Website
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {HOSPITALS_LIST.map((hosp) => (
                <tr
                  key={`row-${hosp.id}`}
                  className={`transition-colors ${
                    hosp.isPopularHospital
                      ? "bg-teal-50/60 hover:bg-teal-50/90 font-medium"
                      : "hover:bg-gray-50/80"
                  }`}
                >
                  {/* Hospital Name & Anchor Link */}
                  <td className="py-4 px-5 align-top">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded shrink-0 ${
                          hosp.isPopularHospital
                            ? "bg-[#0d9488] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {hosp.number}
                      </span>
                      <div>
                        <a
                          href={`#${hosp.id}`}
                          className="font-bold text-gray-900 hover:text-[#0d9488] transition block"
                        >
                          {hosp.name}
                        </a>
                        {hosp.isPopularHospital && (
                          <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0d9488] bg-teal-100/70 px-2 py-0.5 rounded-full">
                            Featured Hospital
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 align-top text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{hosp.category}</span>
                    </div>
                  </td>

                  {/* Area / Location */}
                  <td className="py-4 px-4 align-top text-xs text-gray-600">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0d9488] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-gray-900">{hosp.area}</div>
                        <div className="text-[11px] text-gray-500">{hosp.location}</div>
                      </div>
                    </div>
                  </td>

                  {/* Selected Specialties */}
                  <td className="py-4 px-5 align-top">
                    <ul className="space-y-1 text-xs text-gray-600">
                      {hosp.specialties.slice(0, 4).map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Emergency Support */}
                  <td className="py-4 px-4 align-top text-xs">
                    <div className="flex items-start gap-1.5 text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{hosp.emergencyInfo}</span>
                    </div>
                  </td>

                  {/* Official Website (Only for Popular Hospital) */}
                  <td className="py-4 px-4 align-top text-center">
                    {hosp.isPopularHospital ? (
                      <a
                        href={hosp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200 transition"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-gray-300 font-medium text-xs select-none">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
          <span>
            <strong>Note:</strong> Hospital services, facilities, specialist availability, and insurance arrangements may change. This comparison uses publicly available information and should be independently confirmed with the relevant healthcare provider.
          </span>
        </div>
      </div>
    </div>
  );
}
