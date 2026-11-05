import React from "react";
import Link from "next/link";
import { HOSPITALS_LIST } from "@/data/varanasiHospitalsData";
import { ExternalLink, CheckCircle2, ShieldAlert, MapPin, Building2 } from "lucide-react";

export default function HospitalComparisonTable() {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr className="bg-[#1e3a5f] text-white text-xs font-bold uppercase tracking-wider">
              <th scope="col" className="py-4 px-5 font-heading">
                Hospital Name
              </th>
              <th scope="col" className="py-4 px-4 font-heading">
                Hospital Category
              </th>
              <th scope="col" className="py-4 px-4 font-heading">
                Area / Location
              </th>
              <th scope="col" className="py-4 px-5 font-heading min-w-[240px]">
                Selected Medical Specialties
              </th>
              <th scope="col" className="py-4 px-4 font-heading min-w-[180px]">
                Emergency Service Support
              </th>
              <th scope="col" className="py-4 px-4 font-heading text-center">
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
                        className="font-bold text-gray-900 hover:text-[#0d9488] transition line-clamp-2"
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
                      <div className="text-[11px] text-gray-500 line-clamp-1">{hosp.location}</div>
                    </div>
                  </div>
                </td>

                {/* Selected Specialties */}
                <td className="py-4 px-5 align-top">
                  <ul className="space-y-1 text-xs text-gray-600">
                    {hosp.specialties.slice(0, 4).map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] shrink-0" />
                        <span className="truncate">{spec}</span>
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

                {/* Official Website */}
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
  );
}
