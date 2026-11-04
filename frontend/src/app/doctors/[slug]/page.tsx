import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDoctor } from "@/lib/api";
import DoctorImage from "@/components/DoctorImage";
import {
  getPrimaryDoctorImage,
  getDoctorImageCandidates,
} from "@/lib/doctorImages";
import { DoctorSchema } from "@/components/schema/DoctorSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import DoctorBookingProvider from "@/components/DoctorBookingProvider";
import DoctorAvailabilityCalendar from "@/components/DoctorAvailabilityCalendar";
import DoctorVideoCarousel from "@/components/DoctorVideoCarousel";
import DoctorShareButton from "@/components/DoctorShareButton";

import { fetchSeoMetadata } from "@/lib/seoApi";

export const revalidate = 60;


type Props = { params: Promise<{ slug: string }> };

const OPD_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DEFAULT_SCHEDULE = OPD_DAYS.map((day) => ({
  day,
  timing: day === "Sunday" ? "-" : "9am-12pm & 4pm-8pm",
}));

function safeStr(val: unknown, fallback = ""): string {
  if (val === null || val === undefined) return fallback;
  const s = String(val).trim();
  return s.length > 0 ? s : fallback;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = `/doctors/${slug}`;
  
  try {
    // 1. Check for custom SEO from the database
    const customSeo = await fetchSeoMetadata(route);
    const doctor = await fetchDoctor(slug);
    
    if (customSeo) {
      return {
        title: customSeo.meta_title,
        description: customSeo.meta_description,
        robots: customSeo.robots_meta,
        openGraph: {
          title: customSeo.og_title || customSeo.meta_title,
          description: customSeo.og_description || customSeo.meta_description,
          url: customSeo.canonical_url || `https://www.popularhospital.in${route}`,
          siteName: "Popular Hospital",
          type: "profile",
          ...(customSeo.og_image && {
            images: [{ url: customSeo.og_image, width: 800, height: 600 }],
          }),
        },
        alternates: {
          canonical: customSeo.canonical_url || `https://www.popularhospital.in${route}`,
        },
      };
    }

    // 2. Fallback to default dynamically generated SEO
    const name = doctor?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const docName = name.trim();
    const hasDrPrefix = docName.toLowerCase().startsWith('dr.') || docName.toLowerCase().startsWith('dr ');
    const displayName = hasDrPrefix ? docName : `Dr. ${docName}`;

    const speciality =
      doctor?.speciality?.name ?? doctor?.speciality_name ?? "Specialist";
      
    let title = `${displayName} - ${speciality} | Popular Hospital`;
    let description =
      doctor?.bio ??
      `View the profile and OPD timings for ${displayName} at Popular Hospital.`;

    if (slug === "dr-a-k-kaushik") {
      title = `${displayName} - ${speciality} - Best Surgeon in Varanasi | Popular Hospital`;
      description = `${description} He is widely recognized as the best surgeon in Varanasi, providing exceptional surgical care.`;
    }

    const displayImage = doctor ? getPrimaryDoctorImage(doctor) : null;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://www.popularhospital.in${route}`,
        siteName: "Popular Hospital",
        type: "profile",
        ...(displayImage && {
          images: [
            {
              url: displayImage.startsWith("http")
                ? displayImage
                : `https://www.popularhospital.in${displayImage}`,
              width: 800,
              height: 600,
              alt: name,
            },
          ],
        }),
      },
      alternates: {
        canonical: `https://www.popularhospital.in${route}`,
      },
    };
  } catch {
    return {
      title: "Doctor Profile | Popular Hospital",
      alternates: {
        canonical: `https://www.popularhospital.in/doctors/${slug}`,
      },
    };
  }
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = await fetchDoctor(slug);

  if (!doctor) {
    notFound();
  }

  try {
    const displayName =
      doctor.name ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const displaySpeciality =
      doctor.speciality?.department_display_name ??
      doctor.speciality?.name ??
      doctor.speciality_name ??
      "Specialist";

    const rawQualification = safeStr(doctor.qualification);
    const displayQualification = rawQualification
      .replace(/\s*\([^)]*\)\s*$/, "")
      .trim();

    const displayDesignation =
      doctor.designation && typeof doctor.designation === "object"
        ? safeStr((doctor.designation as { name?: unknown }).name)
        : safeStr(doctor.designation);

    const displayExperience = doctor.experience_years
      ? `${doctor.experience_years}+ Years`
      : null;

    const displayBio = doctor.bio;
    const displayFee = doctor.consultation_fee;

    const imageCandidates = getDoctorImageCandidates(doctor);
    const displayImage = imageCandidates[0] || null;

    const normTiming = (val: unknown): string => safeStr(val, "-");

    const opdBranches = [
      {
        branch: "Varanasi",
        schedule: doctor.opd_timings
          ? [
              { day: "Monday", timing: normTiming(doctor.opd_timings.monday) },
              {
                day: "Tuesday",
                timing: normTiming(doctor.opd_timings.tuesday),
              },
              {
                day: "Wednesday",
                timing: normTiming(doctor.opd_timings.wednesday),
              },
              {
                day: "Thursday",
                timing: normTiming(doctor.opd_timings.thursday),
              },
              { day: "Friday", timing: normTiming(doctor.opd_timings.friday) },
              {
                day: "Saturday",
                timing: normTiming(doctor.opd_timings.saturday),
              },
              { day: "Sunday", timing: normTiming(doctor.opd_timings.sunday) },
            ]
          : doctor.available_days
            ? OPD_DAYS.map((day) => ({
                day,
                timing: (doctor.available_days ?? "")
                  .split(",")
                  .map((d) => d.trim().toLowerCase())
                  .includes(day.toLowerCase())
                  ? "9am-12pm & 4pm-8pm"
                  : "-",
              }))
            : DEFAULT_SCHEDULE,
      },
    ];

    const safeBranches = opdBranches.map((b) => ({
      branch: safeStr(b.branch, "Varanasi"),
      schedule:
        Array.isArray(b.schedule) && b.schedule.length > 0
          ? b.schedule
          : DEFAULT_SCHEDULE,
    }));

    return (
      <main className="min-h-screen bg-white">
        <DynamicSchema
          pageKey={`doctor:${slug}`}
          fallback={
            <DoctorSchema
              name={displayName}
              slug={slug}
              description={displayBio ?? undefined}
              qualification={displayQualification || undefined}
              designation={displayDesignation || undefined}
              speciality={displaySpeciality || undefined}
              experienceYears={doctor.experience_years ?? undefined}
              experienceLocation={doctor.experience_location ?? undefined}
              consultationFee={displayFee ?? undefined}
              image={displayImage ?? undefined}
              opdTimings={doctor.opd_timings ?? undefined}
            />
          }
        />
        {/* ── Banner ── */}
        <section
          className="relative py-14 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a4a6b 0%, #2d7a9a 60%, #3aaccc 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute right-0 top-0 h-full w-72 opacity-10 hidden lg:block pointer-events-none">
            <div className="absolute right-10 top-8 w-40 h-40 rounded-full bg-white" />
            <div className="absolute right-32 bottom-4 w-24 h-24 rounded-full bg-white" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1366px] px-6">
            <h1 translate="no" className="notranslate text-4xl md:text-5xl font-bold text-white mb-3 font-heading">
              Doctor Profile
            </h1>
            <nav className="flex items-center gap-2 text-white/80 text-sm flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>|</span>
              <Link
                href="/doctors"
                className="hover:text-white transition-colors"
              >
                Find a Doctor
              </Link>
              <span>|</span>
              <span className="text-white font-semibold">Doctor Profile</span>
            </nav>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="py-14 bg-gray-50">
          <div className="mx-auto max-w-[1366px] px-6">
            <DoctorBookingProvider
              doctor={{
                id: doctor._id || doctor.id,
                name: displayName,
                slug: doctor.slug,
                image: displayImage || "",
                images: imageCandidates,
                speciality: displaySpeciality,
                qualifications: displayQualification,
              }}
            >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* ──── Left: Doctor Photo & Summary ──── */}
                <div className="lg:col-span-7 flex items-center bg-[#0b1c43] p-8 lg:p-10">
                  <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center">
                  <div className="relative w-full max-w-[260px] shrink-0 aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-white sm:w-[240px]">
                    {displayImage ? (
                      <DoctorImage
                        src={displayImage}
                        alt={displayName}
                        fallbacks={imageCandidates.slice(1)}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-blue-50">
                        <svg
                          className="w-32 h-32 text-blue-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 w-full">
                  <h2 className="font-heading text-3xl font-bold leading-tight text-white">
                    {displayName}
                  </h2>
                  {displayQualification && (
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {displayQualification}
                    </p>
                  )}
                  {displayDesignation && (
                    <p className="mt-3 text-xl font-semibold leading-snug text-white">
                      {displayDesignation}
                    </p>
                  )}
                  {displaySpeciality && (
                    <p className="mt-2 text-base leading-snug text-white/90">
                      {displaySpeciality}
                    </p>
                  )}
                  {displayExperience && (
                    <p className="mt-2 text-base text-white/90">
                      Experience: {displayExperience}
                    </p>
                  )}
                  <DoctorShareButton title={displayName} className="mt-3" />
                  {displayFee != null && (
                    <div className="mt-5 w-full rounded-lg bg-white/15 px-4 py-3 text-center">
                      <p className="text-sm text-white/80">Consultation Fee</p>
                      <p className="text-xl font-bold text-white">₹{displayFee}</p>
                    </div>
                  )}
                  </div>
                  </div>
                </div>

                {/* ──── Right: Availability Calendar ──── */}
                <div className="lg:col-span-5 flex items-center justify-center p-10 lg:p-12">
                  <div className="w-full max-w-[460px]">
                    <DoctorAvailabilityCalendar />
                  </div>
                </div>
              </div>

              {/* ──── Below: Department, Experience & OPD Timings ──── */}
              <div className="border-t border-gray-100 p-10 lg:p-12">
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-3xl font-bold text-[#0b1c43]">
                      Department -{" "}
                      <span className="text-[#284a91]">
                        {displaySpeciality}
                      </span>
                    </h3>
                    {displayBio && (
                      <p className="text-gray-500 text-base mt-3 leading-relaxed">
                        {displayBio}
                      </p>
                    )}
                  </div>

                  {(displayExperience || doctor.experience_location) && (
                    <div className="mb-8 pb-6 border-b border-gray-100">
                      <h4 className="text-lg font-bold text-[#284a91] mb-2">
                        Experience
                      </h4>
                      {displayExperience && (
                        <p className="text-gray-600 text-sm mb-1">
                          {displayExperience}
                        </p>
                      )}
                      {doctor.experience_location && (
                        <p className="text-gray-500 text-sm">
                          {doctor.experience_location}
                        </p>
                      )}
                    </div>
                  )}

                  {safeBranches.map((branch, bIdx) => (
                    <div key={bIdx} className={bIdx > 0 ? "mt-8" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#284a91] text-white text-sm font-bold px-4 py-1.5 rounded">
                          {branch.branch}
                        </span>
                        <span className="text-[#284a91] font-semibold text-sm">
                          - OPD Timings
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full min-w-[700px]">
                          <thead>
                            <tr className="bg-[#0b1c43] text-white">
                              {branch.schedule.map((s) => (
                                <th
                                  key={s.day}
                                  className="py-4 px-5 text-center font-semibold text-sm tracking-wide"
                                >
                                  {s.day}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-50">
                              {branch.schedule.map((s) => (
                                <td
                                  key={s.day}
                                  className={`py-5 px-4 text-center text-sm font-medium leading-snug ${
                                    s.timing === "-"
                                      ? "text-gray-400"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {s.timing}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            </DoctorBookingProvider>

            {/* ── Video Library Section ── */}
            {(() => {
              if (!doctor.videos || doctor.videos.length === 0) return null;

              const validVideos = doctor.videos
                .map((v) => {
                  const match = v.url.match(
                    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
                  );
                  return match
                    ? {
                        title: v.title,
                        videoId: match[1],
                        id: v._id || match[1],
                      }
                    : null;
                })
                .filter((v): v is { title: string; videoId: string; id: string } => v !== null);

              if (validVideos.length === 0) return null;

              return (
                <>
                  {/* Schema generation for all videos */}
                  {validVideos.map((v) => (
                    <script
                      key={v.id}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "VideoObject",
                          "name": v.title,
                          "description": `Watch ${v.title} by ${displayName} at Popular Hospital.`,
                          "thumbnailUrl": `https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`,
                          "uploadDate": "2024-01-01T08:00:00+08:00",
                          "embedUrl": `https://www.youtube.com/embed/${v.videoId}`
                        })
                      }}
                    />
                  ))}
                  <DoctorVideoCarousel
                    videos={validVideos}
                    channelUrl="https://youtube.com/@populargroupofhospitals?si=2WBF3-gr2RQTqMiY"
                  />
                </>
              );
            })()}

            <div className="mt-8">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 text-[#284a91] hover:text-[#E85222] font-semibold transition-colors text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to All Doctors
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (err) {
    console.error("[DoctorPage] render error:", err);
    throw err;
  }
}
