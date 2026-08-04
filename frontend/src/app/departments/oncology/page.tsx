import type { Metadata } from "next";
import OncologyClient from "./OncologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Oncology (Cancer Care) | Popular Hospital",
  description:
    "Comprehensive cancer care centre offering Medical, Surgical, and Radiation Oncology. Expert Tumor Board and dedicated chemotherapy day care.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/oncology",
  },
};

export default async function OncologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "oncology" });
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
        pageKey="department:oncology"
        fallback={
          <DepartmentSchema
            name="Oncology (Cancer Care) | Popular Hospital"
            description="Comprehensive cancer care centre offering Medical, Surgical, and Radiation Oncology. Expert Tumor Board and dedicated chemotherapy day care."
            urlSlug="oncology"
            medicalSpecialty="Oncologic"
          />
        }
      />
      <OncologyClient doctors={doctors} />
    </>
  );
}
