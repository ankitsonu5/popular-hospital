import type { Metadata } from "next";
import GeneralSurgeryClient from "./GeneralSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laparoscopy & General Surgery | Popular Hospital",
  description:
    "Advanced laparoscopic (keyhole) and general surgical procedures with state-of-the-art technology and expert surgeons.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/general-surgery",
  },
};

export default async function GeneralSurgeryPage() {
  const dbDoctors = await fetchDoctors({ speciality: "general-surgery" });
  const doctors = dbDoctors.map((d) => ({
    name: d.name,
    qualifications: d.qualification || "",
    designation:
      typeof d.designation === "object" ? d.designation?.name : d.designation,
    slug: d.slug,
    image: d.image_url ? getImageUrl(d.image_url) : "",
  }));

  return (
    <>
      <DynamicSchema
        pageKey="department:general-surgery"
        fallback={
          <DepartmentSchema
            name="Laparoscopy & General Surgery | Popular Hospital"
            description="Advanced laparoscopic (keyhole) and general surgical procedures with state-of-the-art technology and expert surgeons."
            urlSlug="general-surgery"
            medicalSpecialty="Surgical"
          />
        }
      />
      <GeneralSurgeryClient doctors={doctors} />
    </>
  );
}
