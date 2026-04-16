import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchDoctor, getImageUrl } from "@/lib/api";
import { localDoctors } from "@/lib/localDoctors";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbDoctor = await fetchDoctor(slug);
  const local = localDoctors[slug];
  const name =
    dbDoctor?.name ??
    local?.name ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const speciality =
    dbDoctor?.speciality?.name ??
    dbDoctor?.speciality_name ??
    local?.speciality ??
    "Specialist";
  return {
    title: `${name} - ${speciality} | Popular Hospital`,
    description:
      dbDoctor?.bio ??
      local?.bio ??
      `View the profile and OPD timings for ${name} at Popular Hospital.`,
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const dbDoctor = await fetchDoctor(slug);
  const local = localDoctors[slug];

  // Merge: local takes priority if available (manual override), otherwise use DB
  const displayName =
    local?.name ??
    dbDoctor?.name ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const displaySpeciality =
    local?.speciality ??
    dbDoctor?.speciality?.department_display_name ??
    dbDoctor?.speciality?.name ??
    dbDoctor?.speciality_name ??
    "Specialist";

  const displayQualificationRaw =
    local?.qualifications ?? dbDoctor?.qualification ?? "";

  // Cleanup: Remove redundant (Speciality) or (Designation) from qualifications if present in parentheses
  const displayQualification = displayQualificationRaw
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim();

  const displayDesignation =
    local?.designation ||
    (dbDoctor?.designation && typeof dbDoctor.designation === "object"
      ? dbDoctor.designation.name
      : dbDoctor?.designation || "");

  const displayExperience = local?.experience
    ? local.experience
    : dbDoctor?.experience_years
      ? `${dbDoctor.experience_years}+ Years`
      : null;

  const displayBio = local?.bio ?? dbDoctor?.bio;
  const displayFee = dbDoctor?.consultation_fee;
  const displayPastHospitals = local?.pastHospitals ?? [];

  const displayImage =
    local?.image && local.image !== "/images/departments-images/"
      ? local.image
      : dbDoctor?.image_url
        ? getImageUrl(dbDoctor.image_url)
        : null;

  // OPD schedule: use DB opd_timings if available
  const opdBranches = local?.opdTimings ?? [
    {
      branch: "Varanasi",
      schedule: dbDoctor?.opd_timings
        ? [
            { day: "Monday", timing: dbDoctor.opd_timings.monday },
            { day: "Tuesday", timing: dbDoctor.opd_timings.tuesday },
            { day: "Wednesday", timing: dbDoctor.opd_timings.wednesday },
            { day: "Thursday", timing: dbDoctor.opd_timings.thursday },
            { day: "Friday", timing: dbDoctor.opd_timings.friday },
            { day: "Saturday", timing: dbDoctor.opd_timings.saturday },
            { day: "Sunday", timing: dbDoctor.opd_timings.sunday },
          ]
        : dbDoctor?.available_days
          ? OPD_DAYS.map((day) => ({
              day,
              timing: dbDoctor
                .available_days!.split(",")
                .map((d) => d.trim().toLowerCase())
                .includes(day.toLowerCase())
                ? "9am-12pm & 4pm-8pm"
                : "-",
            }))
          : DEFAULT_SCHEDULE,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
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
                    <Image
                      src={displayImage}
                      alt={displayName}
                      fill
                      className="object-cover object-top"
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
                {/* Schedule Button */}
                <div className="flex justify-end mb-8">
                  <Link
                    href={dbDoctor ? `/book?doctor=${dbDoctor.id}` : "/book"}
                    className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold text-sm tracking-wide shadow transition-all transform hover:scale-105"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>
                </div>

                {/* Department Header */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="text-3xl font-bold text-[#0b1c43]">
                    Department -{" "}
                    <span className="text-[#3b82f6]">{displaySpeciality}</span>
                  </h3>
                  {displayBio && (
                    <p className="text-gray-500 text-base mt-3 leading-relaxed">
                      {displayBio}
                    </p>
                  )}
                </div>

                {/* Experience */}
                {(displayExperience ||
                  dbDoctor?.experience_location ||
                  displayPastHospitals.length > 0) && (
                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <h4 className="text-lg font-bold text-[#3b82f6] mb-2">
                      Experience
                    </h4>

                    {displayExperience && (
                      <p className="text-gray-600 text-sm mb-1">
                        {displayExperience}
                      </p>
                    )}

                    {dbDoctor?.experience_location && (
                      <p className="text-gray-500 text-sm mb-3">
                        {dbDoctor.experience_location}
                      </p>
                    )}

                    {displayPastHospitals.length > 0 && (
                      <ul className="space-y-1 mt-2">
                        {displayPastHospitals.map((hospital, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-gray-600 text-sm"
                          >
                            <span className="text-blue-600 mt-0.5 font-bold">
                              ›
                            </span>
                            <span>{hospital}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* OPD Timings for each branch */}
                {opdBranches.map((branch, bIdx) => (
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

          {/* Back Button */}
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
}
