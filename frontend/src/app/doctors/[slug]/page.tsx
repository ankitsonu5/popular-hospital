import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDoctor } from "@/lib/api";
import DoctorImage from "@/components/DoctorImage";
import { getPrimaryDoctorImage } from "@/lib/doctorImages";
import { DoctorSchema } from "@/components/schema/DoctorSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

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

    const displayImage = getPrimaryDoctorImage(doctor);

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-heading">
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* ──── Left: Doctor Photo & Summary ──── */}
                <div className="lg:col-span-4 flex flex-col items-center bg-gray-50/80 border-r border-gray-100 p-10">
                  <div
                    className="relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 mb-6"
                    style={{ height: "350px", width: "280px" }}
                  >
                    {displayImage ? (
                      <DoctorImage src={displayImage} alt={displayName} />
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

                  <h2 className="text-lg font-bold text-[#3b82f6] text-center leading-tight">
                    {displayName}
                  </h2>
                  {displayQualification && (
                    <p className="text-gray-500 text-sm text-center mt-2 leading-relaxed px-2">
                      {displayQualification}
                    </p>
                  )}
                  {displayDesignation && (
                    <p className="text-gray-700 text-sm font-bold uppercase tracking-wide mt-2 text-center">
                      {displayDesignation}
                    </p>
                  )}
                  {displayFee != null && (
                    <div className="mt-5 bg-blue-50 rounded-lg px-4 py-3 text-center w-full">
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-blue-600 font-bold text-xl">
                        ₹{displayFee}
                      </p>
                    </div>
                  )}
                </div>

                {/* ──── Right: Details ──── */}
                <div className="lg:col-span-8 p-10 lg:p-12">
                  <div className="mb-8 flex flex-col justify-end gap-3 sm:flex-row">
                    <Link
                      href={`/book?doctor=${doctor.slug}`}
                      className="inline-flex items-center justify-center bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold text-sm tracking-wide shadow transition-all transform hover:scale-105"
                    >
                      SCHEDULE AN APPOINTMENT
                    </Link>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-3xl font-bold text-[#0b1c43]">
                      Department -{" "}
                      <span className="text-[#3b82f6]">
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
                      <h4 className="text-lg font-bold text-[#3b82f6] mb-2">
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
                        <span className="bg-[#3b82f6] text-white text-sm font-bold px-4 py-1.5 rounded">
                          {branch.branch}
                        </span>
                        <span className="text-[#3b82f6] font-semibold text-sm">
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
            </div>

            {/* ── Video Gallery Section ── */}
            {(() => {
              if (!doctor.videos || doctor.videos.length === 0) return null;

              const validVideos = doctor.videos.map(v => {
                const match = v.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                return match ? { ...v, videoId: match[1], id: v._id || Math.random().toString() } : null;
              }).filter(Boolean) as (typeof doctor.videos[0] & { videoId: string, id: string })[];
              
              if (validVideos.length === 0) return null;
              
              return (
                <div className="mt-12 bg-gradient-to-b from-white to-slate-50/50 rounded-[2.5rem] shadow-sm border border-slate-100 p-8 lg:p-12 overflow-hidden relative">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                  
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

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-slate-200/60 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-12 h-[2px] bg-[#E85222] rounded-full"></span>
                        <span className="text-[#E85222] font-bold text-sm tracking-widest uppercase">Video Library</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-[#1a3a5c] font-heading tracking-tight">
                        Watch
                      </h3>
                      <p className="text-slate-500 font-medium mt-2">Insights, treatments, and success stories</p>
                    </div>
                    
                    <a
                      href="https://youtube.com/@populargroupofhospitals?si=2WBF3-gr2RQTqMiY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                      Subscribe
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 relative z-10">
                    {validVideos.map((v, idx) => (
                      <a
                        key={v.id}
                        href={`https://www.youtube.com/watch?v=${v.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-[1.5rem] bg-white overflow-hidden shadow-sm border border-slate-100 hover:border-blue-100 transition-colors duration-300"
                      >
                        {/* HD Thumbnail Banner */}
                        <div className="relative w-full pb-[56.25%] bg-slate-900 overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`}
                            alt={v.title}
                            className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-90 transition-all duration-300"
                            loading="lazy"
                          />

                          {/* Subtle Bottom Gradient */}
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          
                          {/* Play Button Overlay (Glassmorphism) */}
                          <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#E85222] group-hover:border-[#E85222] transition-colors duration-300">
                              <svg className="w-8 h-8 text-white ml-1 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7L8 5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E85222]/0 to-transparent group-hover:via-[#E85222] transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                          
                          <h4 className="text-xl font-black text-[#1a3a5c] leading-tight line-clamp-2 group-hover:text-[#E85222] transition-colors duration-300 font-heading">
                            {v.title}
                          </h4>
                          
                          <div className="mt-auto pt-6 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-[#E85222] transition-colors">
                            <span className="flex items-center gap-2">
                              Watch Video
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="mt-8">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm"
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
