"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchDoctors, fetchSpecialities, getImageUrl } from "@/lib/api";

interface Doctor {
  _id?: string;
  id?: string;
  name: string;
  qualifications?: string;
  qualification?: string;
  designation?: string | { _id: string; name: string };
  slug: string;
  image?: string;
  image_url?: string;
  speciality?: {
    name?: string;
    department_display_name?: string;
  };
}

const normalizeDepartmentValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeDoctorValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const departmentRouteAliases: Record<string, string[]> = {
  "general-surgery": ["laparoscopy-and-general-surgery"],
  gynaecology: ["obstetrics-and-gynaecology"],
  pediatrics: ["pediatrics-and-neonatology"],
  orthopedics: ["orthopedics-and-joint-replacement"],
  respiratory: ["respiratory-medicine"],
  "pain-management": ["pain-medicine"],
  "diabetic-foot": ["advanced-diabetic-foot-unit"],
  ctvs: ["cardiothoracic-and-vascular-surgery", "ctvs"],
};

const getDesignationName = (designation: Doctor["designation"]) =>
  typeof designation === "string" ? designation : designation?.name || "";

export default function DoctorSlider({
  doctors,
  departmentName,
  preventBackendFetch = false,
}: {
  doctors: Doctor[];
  departmentName: string;
  preventBackendFetch?: boolean;
}) {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [backendDoctors, setBackendDoctors] = useState<Doctor[]>([]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const departmentSlug = pathname?.startsWith("/departments/")
    ? pathname.split("/").filter(Boolean).at(-1) || ""
    : "";
  const displayDoctors =
    backendDoctors.length > 0
      ? [...backendDoctors].sort((a, b) => {
        const getOrder = (doctor: Doctor) => {
          const slugKey = normalizeDoctorValue(doctor.slug || "");
          const nameKey = normalizeDoctorValue(doctor.name || "");
          const index = doctors.findIndex((item) => {
            const itemSlugKey = normalizeDoctorValue(item.slug || "");
            const itemNameKey = normalizeDoctorValue(item.name || "");
            return (
              itemSlugKey === slugKey ||
              itemNameKey === nameKey ||
              itemSlugKey === nameKey ||
              itemNameKey === slugKey
            );
          });

          return index === -1 ? Number.MAX_SAFE_INTEGER : index;
        };

        return getOrder(a) - getOrder(b);
      })
      : doctors;
  const currentDoctor = displayDoctors[currentSlide];
  const appointmentHref = currentDoctor?.slug
    ? `/book?doctor=${encodeURIComponent(currentDoctor.slug)}`
    : "/book";

  useEffect(() => {
    if (preventBackendFetch || !departmentSlug) return;

    let ignore = false;
    setCurrentSlide(0);
    setBackendDoctors([]);
    setFailedImages({});

    const loadDepartmentDoctors = async () => {
      const directDoctors = await fetchDoctors({ speciality: departmentSlug });
      if (directDoctors.length > 0) return directDoctors;

      const routeValue = normalizeDepartmentValue(departmentSlug);
      const departmentValue = normalizeDepartmentValue(departmentName);
      const aliases = departmentRouteAliases[routeValue] || [];
      const departments = await fetchSpecialities();
      const matchedDepartment = departments.find((department) => {
        const values = [
          department.slug,
          department.name,
          department.department_display_name || "",
        ].map(normalizeDepartmentValue);

        return values.some(
          (value) =>
            value === routeValue ||
            value === departmentValue ||
            aliases.includes(value),
        );
      });

      if (!matchedDepartment?.slug || matchedDepartment.slug === departmentSlug) {
        return directDoctors;
      }

      return fetchDoctors({ speciality: matchedDepartment.slug });
    };

    loadDepartmentDoctors()
      .then((items) => {
        if (ignore) return;
        setBackendDoctors(items);
      })
      .catch(() => {
        if (ignore) return;
        setBackendDoctors([]);
      });

    return () => {
      ignore = true;
    };
  }, [departmentName, departmentSlug, preventBackendFetch]);

  useEffect(() => {
    if (currentSlide >= displayDoctors.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, displayDoctors.length]);

  useEffect(() => {
    if (displayDoctors.length <= 1 || !isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === displayDoctors.length - 1 ? 0 : prev + 1,
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [displayDoctors.length, isAutoPlaying]);

  const handleManualSlide = (index: number | ((prev: number) => number)) => {
    setIsAutoPlaying(false);
    if (typeof index === "function") {
      setCurrentSlide(index);
    } else {
      setCurrentSlide(index);
    }
  };

  if (!displayDoctors || displayDoctors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border border-gray-100 p-12 text-center max-w-sm mx-auto">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <p className="text-gray-500 font-bold text-lg">
          Information Not Available
        </p>
        <p className="text-gray-400 text-sm mt-1">
          We are currently updating our doctor profiles for this department.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pt-6 max-w-sm mx-auto">
      {/* Floating Appointment Button */}
      <Link
        href={appointmentHref}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] text-white py-2.5 px-7 rounded-xl font-bold text-xs tracking-wider shadow-[0_4px_10px_rgba(59,130,246,0.2)] whitespace-nowrap uppercase"
      >
        SCHEDULE AN APPOINTMENT
      </Link>

      <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100/80 flex flex-col items-center p-0 w-full relative" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
        <div className="w-full relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {displayDoctors.map((doc, idx) => {
              const imageKey = doc._id || doc.id || doc.slug || `${idx}`;
              const fallbackDoctor = doctors.find(
                (item) => item.slug === doc.slug,
              );
              const primaryImage = doc.image_url || doc.image || "";
              const fallbackImage =
                fallbackDoctor?.image || fallbackDoctor?.image_url || "";
              const imageSrc =
                failedImages[imageKey] && fallbackImage
                  ? fallbackImage
                  : primaryImage || fallbackImage;

              return (
                <div
                  key={imageKey}
                  className="w-full flex-shrink-0 px-6 py-5 pt-10 flex flex-col items-center"
                >
                  <div className="relative w-56 h-56 rounded-2xl overflow-hidden mb-4 bg-white border border-slate-100/80 group/img">
                    {imageSrc ? (
                      <Image
                        src={getImageUrl(imageSrc)}
                        alt={doc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top"
                        onError={() =>
                          setFailedImages((current) => ({
                            ...current,
                            [imageKey]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-blue-50 text-blue-200">
                        <svg
                          className="w-20 h-20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <Link
                      href={`/doctors/${doc.slug}`}
                      className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                    >
                      <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-blue-600 transition-all uppercase text-sm">
                        View Details
                      </span>
                    </Link>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <Link href={`/doctors/${doc.slug}`}>
                      <h3 className="text-xl font-bold text-blue-600 font-heading mb-1">
                        {doc.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-xs font-semibold leading-relaxed px-4">
                      {doc.qualifications || doc.qualification}
                    </p>
                    {getDesignationName(doc.designation) && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 mt-2 tracking-wide">
                        {getDesignationName(doc.designation).toUpperCase()}
                      </span>
                    )}
                    <p className="text-slate-400 text-[9px] uppercase tracking-widest font-bold mt-3.5">
                      DEPARTMENT OF{" "}
                      {(
                        doc.speciality?.department_display_name ||
                        doc.speciality?.name ||
                        departmentName
                      ).toUpperCase()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows (Only if > 1) */}
        {displayDoctors.length > 1 && (
          <>
            <button
              onClick={() =>
                handleManualSlide((prev) =>
                  prev === 0 ? displayDoctors.length - 1 : prev - 1,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
              aria-label="Previous doctor"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                handleManualSlide((prev) =>
                  prev === displayDoctors.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-xl text-blue-600 z-10 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
              aria-label="Next doctor"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2.5 mb-8 justify-center">
              {displayDoctors.map((doc, idx) => (
                <button
                  key={doc._id || doc.id || doc.slug || idx}
                  onClick={() => handleManualSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-slate-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
        <div className="h-2" />
      </div>
    </div>
  );
}
