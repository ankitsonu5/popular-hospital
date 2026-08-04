import type { Metadata } from "next";
import UrologyClient from "./UrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department of Urology | Popular Hospital",
  description:
    "Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/urology",
  },
};

export default async function UrologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "urology" });
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
        pageKey="department:urology"
        fallback={
          <DepartmentSchema
            name="Department of Urology | Popular Hospital"
            description="Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility."
            urlSlug="urology"
            medicalSpecialty="Urologic"
          />
        }
      />
      <UrologyClient doctors={doctors} />
    </>
  );
}
