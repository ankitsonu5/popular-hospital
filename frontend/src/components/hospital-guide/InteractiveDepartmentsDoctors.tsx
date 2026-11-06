"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DepartmentInfo,
  POPULAR_HOSPITAL_DEPARTMENTS,
} from "@/data/varanasiHospitalsData";
import {
  Stethoscope,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  UserCheck,
  Building2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function InteractiveDepartmentsDoctors() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>("cardiology");
  const [filterCategory, setFilterCategory] = useState<
    "ALL" | "Super Speciality" | "Speciality"
  >("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDepartments = useMemo(() => {
    return POPULAR_HOSPITAL_DEPARTMENTS.filter((dept) => {
      const matchesCategory =
        filterCategory === "ALL" || dept.category === filterCategory;
      const matchesSearch =
        searchTerm.trim() === "" ||
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.doctors.some((d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchTerm]);

  // Keep currently active department or fallback to first matching
  const activeDept = useMemo(() => {
    const found = POPULAR_HOSPITAL_DEPARTMENTS.find(
      (d) => d.id === selectedDeptId,
    );
    if (found) return found;
    return filteredDepartments[0] || POPULAR_HOSPITAL_DEPARTMENTS[0];
  }, [selectedDeptId, filteredDepartments]);

  return (
    <div className="w-full">
      {/* Category Pills and Search Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm">
        {/* Category Toggle Tabs */}
        <div
          role="tablist"
          aria-label="Department categories"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterCategory === "ALL"}
            onClick={() => setFilterCategory("ALL")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              filterCategory === "ALL"
                ? "bg-[#1e3a5f] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All 25 Departments
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filterCategory === "Super Speciality"}
            onClick={() => setFilterCategory("Super Speciality")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              filterCategory === "Super Speciality"
                ? "bg-[#0d9488] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Super Specialties (11)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filterCategory === "Speciality"}
            onClick={() => setFilterCategory("Speciality")}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              filterCategory === "Speciality"
                ? "bg-[#0d9488] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Clinical Specialties (14)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <label htmlFor="dept-search-input" className="sr-only">
            Search medical departments or doctors
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="dept-search-input"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search department or doctor..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-[#fafafa] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Main Interactive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Department Selection Panel */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-sm max-h-[680px] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 px-2">
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500">
              Select Department ({filteredDepartments.length})
            </span>
            <span className="text-xs text-[#0d9488] font-semibold">
              Click to view doctors
            </span>
          </div>

          <div
            className="overflow-y-auto pr-1 space-y-1.5 flex-1 custom-scrollbar focus:outline-none"
            tabIndex={0}
            role="region"
            aria-label="Department list"
          >
            {filteredDepartments.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                No matching departments found.
              </div>
            ) : (
              filteredDepartments.map((dept) => {
                const isSelected = dept.id === activeDept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#1e3a5f] text-white shadow-md ring-2 ring-[#0d9488]/30"
                        : "bg-[#fafafa] hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#0d9488] text-white"
                            : "bg-white text-[#1e3a5f] border border-gray-200 group-hover:border-[#0d9488]"
                        }`}
                      >
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-bold truncate ${
                            isSelected ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {dept.name}
                        </div>
                        <div
                          className={`text-[11px] font-medium flex items-center gap-1.5 ${
                            isSelected ? "text-teal-200" : "text-gray-500"
                          }`}
                        >
                          <span>{dept.category}</span>
                          <span>•</span>
                          <span>
                            {dept.doctors.length}{" "}
                            {dept.doctors.length === 1 ? "Doctor" : "Doctors"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected
                          ? "text-[#0d9488] translate-x-1"
                          : "text-gray-300 group-hover:text-gray-600"
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active Department Details & Mapped Doctors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Department Header Card */}
          <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0b1c43] text-white p-6 sm:p-7 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 bg-[#0d9488]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0d9488] text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {activeDept.badge}
                </span>
                <Link
                  href={activeDept.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-300 hover:text-white transition group"
                >
                  <span>View Full Department Page</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {activeDept.name} Department
              </h3>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {activeDept.summary}
              </p>
            </div>
          </div>

          {/* Doctors List for this Department */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Verified Specialists & Doctors ({activeDept.doctors.length})
              </h4>
              <Link
                href="/doctors"
                className="text-xs font-semibold text-[#0d9488] hover:underline"
              >
                Browse All Doctors Directory →
              </Link>
            </div>

            {activeDept.doctors.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
                <Building2 className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-gray-800 mb-1">
                  Specialist Consultation Available
                </h4>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                  View the official doctor directory for current specialist
                  availability or speak directly with the outpatient scheduling
                  desk.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e3a5f] text-white text-xs font-bold hover:bg-[#0b1c43] transition"
                  >
                    View Doctor Directory
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0d9488] text-white text-xs font-bold hover:bg-teal-700 transition"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            ) : (
              activeDept.doctors.map((doctor, idx) => (
                <div
                  key={doctor.slug || idx}
                  className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-5"
                >
                  {/* Doctor Photo */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 mx-auto sm:mx-0">
                    {doctor.image ? (
                      <Image
                        src={doctor.image}
                        alt={`${doctor.name} - ${doctor.designation} at Popular Hospital Varanasi`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 96px, 112px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-teal-50 text-[#0d9488]">
                        <UserCheck className="w-8 h-8" />
                        <span className="text-[10px] font-bold mt-1">
                          Specialist
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="text-lg font-bold text-gray-900">
                        {doctor.name}
                      </h4>
                      {doctor.experience && (
                        <span className="inline-block self-center sm:self-auto px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0d9488] border border-teal-100">
                          {doctor.experience}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#0d9488] mb-1">
                      {doctor.designation}
                    </p>

                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      {doctor.qualifications}
                    </p>

                    {doctor.bio && (
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                        {doctor.bio}
                      </p>
                    )}

                    {doctor.opdTimings && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 mb-4 w-full sm:w-auto">
                        <Clock className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                        <span className="truncate">
                          <strong>OPD:</strong> {doctor.opdTimings}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                      <Link
                        href="/book"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0d9488] hover:bg-teal-700 text-white text-xs font-bold transition shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Book Appointment
                      </Link>

                      <Link
                        href={doctor.profileUrl || "/doctors"}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Crawlable Semantic SEO Fallback (Indexable by search engine bots) */}
      <div className="sr-only">
        <h3>Complete List of All 25 Departments at Popular Hospital Varanasi</h3>
        <ul>
          {POPULAR_HOSPITAL_DEPARTMENTS.map((dept) => (
            <li key={`crawlable-${dept.id}`}>
              <h4>
                <Link href={dept.href}>{dept.name}</Link> ({dept.category})
              </h4>
              <p>{dept.summary}</p>
              <h5>Specialist Doctors in {dept.name}:</h5>
              <ul>
                {dept.doctors.map((doc, i) => (
                  <li key={i}>
                    <strong>{doc.name}</strong> - {doc.designation} (
                    {doc.qualifications}). OPD: {doc.opdTimings || "Consultation by appointment"}.
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
