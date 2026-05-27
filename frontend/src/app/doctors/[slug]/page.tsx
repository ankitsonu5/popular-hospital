import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDoctor } from "@/lib/api";
import DoctorImage from "@/components/DoctorImage";
import { getPrimaryDoctorImage } from "@/lib/doctorImages";
import { DoctorSchema } from "@/components/schema/DoctorSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  try {
    const { slug } = await params;
    const doctor = await fetchDoctor(slug);
    const name =
      doctor?.name ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const speciality =
      doctor?.speciality?.name ?? doctor?.speciality_name ?? "Specialist";
    return {
      title: `${name} - ${speciality} | Popular Hospital`,
      description:
        doctor?.bio ??
        `View the profile and OPD timings for ${name} at Popular Hospital.`,
    };
  } catch {
    return { title: "Doctor Profile | Popular Hospital" };
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
                    <a
                      href={
                        doctor.youtube_video_url
                          ? (doctor.youtube_video_url.startsWith('http') ? doctor.youtube_video_url : `https://${doctor.youtube_video_url}`)
                          : "https://youtube.com/@populargroupofhospitals?si=2WBF3-gr2RQTqMiY"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-[#3b82f6]/25 bg-white px-8 py-3 text-sm font-bold tracking-wide text-[#3b82f6] shadow transition-all hover:-translate-y-0.5 hover:border-[#3b82f6] hover:bg-blue-50"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                      DOCTOR&apos;S VIDEO
                    </a>
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
