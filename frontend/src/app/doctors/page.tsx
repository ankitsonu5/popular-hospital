import type { Metadata } from "next";
import { DoctorsSearch } from "@/components/DoctorsSearch";
import { DoctorsListSchema } from "@/components/schema/DoctorSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Find Doctors",
  description:
    "Search and book doctors by speciality and branch at Popular Hospital. View profiles, qualifications, and consultation fees.",
  alternates: {
    canonical: "https://popularhospital.in/doctors",
  },
};

export default function DoctorsPage() {
  return (
    <div className="max-w-[1366px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-10 sm:py-14">
      <DynamicSchema pageKey="doctors" fallback={<DoctorsListSchema />} />
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e3a8a] font-heading tracking-tight mb-3">
        Find a Doctor
      </h1>
      <p className="max-w-2xl text-gray-500 text-base sm:text-lg leading-relaxed font-medium">
        Search by speciality, branch, or name. Click on a doctor to book an
        appointment.
      </p>
      <DoctorsSearch />
    </div>
  );
}
