"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import DoctorBookingModal from "@/components/DoctorBookingModal";

export interface ExpertDoctor {
  id?: string;
  _id?: string;
  name: string;
  qualifications?: string;
  qualification?: string;
  designation?: string | { name?: string };
  slug: string;
  image?: string;
  image_url?: string;
  speciality?: string | { name?: string };
}

/* Doctor photo; when the doctor has no photo (or it fails to load) show initials */
function DoctorImage({
  src,
  alt,
  name,
  className = "",
}: {
  src: string;
  alt: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    const initials = name
      .replace(/^dr\.?\s*/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#f1f5f9] text-[#94a3b8] text-4xl font-bold">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

const getText = (value?: string | { name?: string }) =>
  typeof value === "string" ? value : value?.name || "";

/* ─── Our Medical Experts (shared by every department page) ─── */

export default function DepartmentMedicalExperts({
  doctors,
  specialitySlug,
}: {
  doctors: ExpertDoctor[];
  /** Used for the "Find a Doctor" link; defaults to the department route. */
  specialitySlug?: string;
}) {
  const pathname = usePathname();
  const slug =
    specialitySlug ||
    (pathname?.startsWith("/departments/")
      ? pathname.split("/").filter(Boolean).at(-1)
      : "") ||
    "";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<ExpertDoctor | null>(
    null,
  );
  const list = Array.isArray(doctors) ? doctors : [];

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setCanScroll(scrollWidth > clientWidth + 4);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 150);

    const el = scrollRef.current;
    let observer: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => checkScroll());
      observer.observe(el);
    }

    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, [list.length, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const renderArrows = () => (
    <div className="flex items-center gap-3">
      <button
        onClick={() => scroll("left")}
        aria-label="Previous doctors"
        className="text-[#E85222] hover:text-[#d1451a] transition-colors p-1 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Next doctors"
        className="text-[#E85222] hover:text-[#d1451a] transition-colors p-1 active:scale-95"
      >
        <ArrowRight className="w-5 h-5 stroke-[2.2]" />
      </button>
    </div>
  );

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
        <div className="hidden lg:flex items-center justify-end min-h-[28px] mb-3">
          {canScroll && renderArrows()}
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-stretch">
          {/* Left Navy Blue "Our Medical Experts" Card */}
          <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 bg-[#0b1c43] text-white rounded-2xl lg:rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="text-2xl sm:text-[26px] font-bold font-heading text-white tracking-tight leading-tight">
                Our Medical Experts
              </h2>
              <p className="text-white/90 text-sm leading-relaxed mt-4 font-normal">
                Popular Hospital is home to eminent doctors in the world, most of
                whom are pioneers in their respective fields. Additionally, they
                are renowned for developing innovative and revolutionary
                clinical procedures.
              </p>
            </div>

            <Link
              href={slug ? `/doctors?speciality=${slug}` : "/doctors"}
              className="mt-6 flex items-center justify-between w-full bg-[#E85222] hover:bg-[#d1451a] text-white rounded-lg overflow-hidden transition-all shadow-sm group"
            >
              <span className="px-5 py-3 text-[14.5px] font-semibold flex-1 text-center">
                Find a Doctor
              </span>
              <span className="w-11 py-3 flex items-center justify-center border-l border-white/20 bg-[#c53d12] group-hover:bg-[#b5340a] transition-colors">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {list.length > 0 && canScroll && (
            <div className="flex lg:hidden items-center justify-end px-1 -mt-1 mb-1">
              {renderArrows()}
            </div>
          )}

          {/* Right Doctor Cards Carousel (nothing when the department has no doctors) */}
          {list.length > 0 && (
            <div className="flex-1 min-w-0">
              <div
                ref={scrollRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth py-1 px-0.5"
              >
                {list.map((doc, idx) => {
                  const subtitle =
                    getText(doc.speciality) ||
                    doc.qualifications ||
                    doc.qualification ||
                    getText(doc.designation);
                  return (
                    <div
                      key={doc.slug || idx}
                      className="w-[230px] sm:w-[245px] md:w-[255px] shrink-0 bg-white rounded-xl border border-gray-200 shadow-none hover:shadow-none flex flex-col overflow-hidden group relative"
                    >
                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="relative h-[210px] sm:h-[225px] w-full bg-[#f8fafc] overflow-hidden rounded-t-xl block"
                      >
                        <DoctorImage
                          src={doc.image || doc.image_url || ""}
                          alt={doc.name}
                          name={doc.name}
                          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </Link>

                      <div className="px-4 pt-3.5 pb-4 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <Link href={`/doctors/${doc.slug}`}>
                            <h3 className="font-semibold text-[#1e293b] text-[16px] sm:text-[16.5px] leading-tight line-clamp-1 group-hover:text-[#E85222] transition-colors">
                              {doc.name}
                            </h3>
                          </Link>
                          <p
                            className="text-[12px] sm:text-[12.5px] text-[#64748b] line-clamp-1 mt-2 font-normal"
                            title={subtitle}
                          >
                            {subtitle}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setBookingDoctor(doc);
                          }}
                          className="mt-3.5 w-full py-2 px-3 rounded-lg text-xs font-bold text-[#E85222] bg-[#E85222]/10 hover:bg-[#E85222] hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Appointment</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <DoctorBookingModal
        doctor={
          bookingDoctor
            ? {
                id: bookingDoctor.id,
                _id: bookingDoctor._id,
                name: bookingDoctor.name,
                qualifications:
                  bookingDoctor.qualifications || bookingDoctor.qualification,
                designation: getText(bookingDoctor.designation),
                slug: bookingDoctor.slug,
                image: bookingDoctor.image || bookingDoctor.image_url,
                speciality: getText(bookingDoctor.speciality),
              }
            : null
        }
        onClose={() => setBookingDoctor(null)}
      />
    </section>
  );
}
