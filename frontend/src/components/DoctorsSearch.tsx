"use client";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { fetchDoctors, fetchSpecialities } from "@/lib/api";
import type { Doctor, Speciality } from "@/lib/api";
import { getDoctorImageCandidates } from "@/lib/doctorImages";

const EMPTY_DEPARTMENTS: Speciality[] = [];
const EMPTY_DOCTORS: Doctor[] = [];

const getDoctorKey = (doc: Doctor) => doc._id || doc.id || doc.slug;

export function DoctorsSearch() {
  const [speciality, setSpeciality] = useState("");
  const [search, setSearch] = useState("");
  const [imageFallbackIndex, setImageFallbackIndex] = useState<
    Record<string, number>
  >({});

  const { data: departments = EMPTY_DEPARTMENTS } = useSWR(
    "specialities",
    fetchSpecialities,
    {
      revalidateOnFocus: false,
    },
  );
  const { data: doctors = EMPTY_DOCTORS, isLoading: loading } = useSWR(
    ["doctors", speciality, search],
    () => fetchDoctors({ speciality, search }),
    { keepPreviousData: true },
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageFallbackIndex({});
  }, [doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-7 w-full overflow-hidden">
      {/* Refined Filter Section */}
      <div className="mb-14 flex flex-col lg:flex-row items-stretch gap-5 bg-white p-5 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(30,58,95,0.08)]">
        <div className="w-full lg:flex-1 flex flex-col justify-center">
          <label
            htmlFor="search"
            className="mb-3 block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1"
          >
            Name / Qualification
          </label>
          <div className="relative">
            <input
              id="search"
              type="search"
              placeholder="Ex: Cardiology or Dr. Sharma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border-2 border-[#f1f5f9] px-5 py-4 text-sm font-medium focus:border-hospital-teal focus:ring-0 transition-all bg-[#f8fafc] placeholder:text-gray-400"
            />
          </div>
        </div>

        <div
          className="w-full lg:w-80 flex flex-col justify-center relative"
          ref={dropdownRef}
        >
          <label className="mb-3 block text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">
            Departments
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full rounded-xl border-2 border-[#f1f5f9] px-5 py-4 text-left text-sm font-bold text-hospital-navy focus:border-hospital-teal focus:ring-0 transition-all bg-[#f8fafc] flex items-center justify-between"
            >
              <span className="truncate">
                {speciality
                  ? departments.find((d) => d.slug === speciality)?.name ||
                    "All Departments"
                  : "All Departments"}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 text-gray-400 ${isDropdownOpen ? "rotate-180 text-hospital-teal" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Custom Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-50 z-[100] overflow-hidden animate-fade-in py-3">
                <div className="max-h-96 overflow-y-auto scrollbar-fancy custom-scrollbar-minimal">
                  <div
                    onClick={() => {
                      setSpeciality("");
                      setIsDropdownOpen(false);
                    }}
                    className={`px-6 py-3.5 text-sm font-bold cursor-pointer transition-all flex items-center justify-between ${!speciality ? "bg-teal-50 text-hospital-teal" : "text-gray-600 hover:bg-gray-50 hover:text-hospital-teal"}`}
                  >
                    All Departments
                    {!speciality && (
                      <div className="w-1.5 h-1.5 rounded-full bg-hospital-teal"></div>
                    )}
                  </div>
                  {departments.map((s) => (
                    <div
                      key={s._id}
                      onClick={() => {
                        setSpeciality(s.slug);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-6 py-3.5 text-sm font-bold cursor-pointer transition-all flex items-center justify-between ${speciality === s.slug ? "bg-teal-50 text-hospital-teal" : "text-gray-600 hover:bg-gray-50 hover:text-hospital-teal"}`}
                    >
                      {s.name}
                      {speciality === s.slug && (
                        <div className="w-1.5 h-1.5 rounded-full bg-hospital-teal"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex flex-col justify-end pb-0">
          <label className="mb-3 hidden lg:block text-[11px] font-bold text-transparent select-none uppercase tracking-[0.2em] px-1">
            Reset
          </label>
          <button
            onClick={() => {
              setSearch("");
              setSpeciality("");
            }}
            className={`flex items-center justify-center h-[56px] px-5 lg:px-7 rounded-xl border-2 transition-all duration-300 min-w-max ${
              search || speciality
                ? "border-red-100 bg-red-50 text-red-500 hover:bg-red-100 hover:border-red-200"
                : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
            }`}
            title="Reset All Filters"
            disabled={!search && !speciality}
          >
            <RotateCcw
              className={`w-5 h-5 ${search || speciality ? "animate-in spin-in-180" : ""}`}
            />
            <span className="ml-2 font-bold text-[13px] uppercase tracking-wider block">
              Reset
            </span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-hospital-teal"></div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-bold text-lg">
            No doctors found matching your criteria.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting the department filter.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-0 sm:px-1 pb-8">
          {[...doctors].map((doc, index) => {
            const doctorKey = getDoctorKey(doc);
            const imageCandidates = getDoctorImageCandidates(doc);
            const currentImageIndex = imageFallbackIndex[doctorKey] || 0;
            const imageSrc = imageCandidates[currentImageIndex];

            return (
              <li
                key={`${doc._id ?? doc.id ?? doc.slug ?? doc.name}-${index}`}
                className={`h-full`}
              >
                <Link
                  href={`/doctors/${doc.slug}`}
                  className={`group relative block h-full rounded-2xl p-3.5 sm:p-4 transition-all duration-500 hover:-translate-y-1 bg-white border border-gray-50 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]`}
                >
                  {/* Image Container with balanced rounding */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f1f5f9] mb-5 sm:mb-6">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={doc.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        onError={() =>
                          setImageFallbackIndex((current) => ({
                            ...current,
                            [doctorKey]: Math.min(
                              (current[doctorKey] || 0) + 1,
                              imageCandidates.length,
                            ),
                          }))
                        }
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-teal-50/30 text-teal-200">
                        <svg
                          className="w-24 h-24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="px-1 sm:px-3 pb-4 sm:pb-6 min-w-0">
                    <h3 className="text-[18px] sm:text-[22px] font-black text-[#4285f4] tracking-tight break-words leading-tight mb-2">
                      {doc.name}
                    </h3>

                    {doc.designation && (
                      <p className="text-[11px] sm:text-[12px] font-bold text-[#0d9488] uppercase tracking-wider mb-1 break-words">
                        {typeof doc.designation === "object"
                          ? doc.designation.name
                          : doc.designation || "-"}
                      </p>
                    )}

                    <p className="text-[13px] sm:text-[14px] font-bold text-gray-600 leading-tight mb-1 line-clamp-2">
                      {(doc.qualification || "")
                        .replace(/\s*\([^)]*\)\s*$/, "")
                        .trim() || "Highly Qualified Physician"}
                    </p>

                    <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.18em] sm:tracking-widest mb-5 sm:mb-6 break-words">
                      DEPARTMENT OF{" "}
                      {doc.speciality?.department_display_name ||
                        doc.speciality?.name ||
                        "Medical Science"}
                    </p>
                    {/* Footer with stats and button */}
                    <div className="flex flex-col gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
                      <div className="flex items-center gap-1.5 text-gray-900 min-w-0">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {doc.experience_years && (
                          <span className="text-base sm:text-lg font-bold">
                            {doc.experience_years}
                            <span className="text-sm text-gray-400 font-medium ml-1">
                              Years Exp.
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="w-full min-[380px]:w-auto bg-[#f1f5f9] px-4 sm:px-5 py-3 rounded-2xl font-bold text-gray-900 flex items-center justify-center gap-1 hover:bg-[#e2e8f0] transition-colors">
                        View <span className="text-xl leading-none">+</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
