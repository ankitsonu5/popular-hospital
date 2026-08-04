import type { Metadata } from "next";
import GastroenterologyClient from "./GastroenterologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gastroenterology & Hepatology | Popular Hospital",
  description:
    "Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/gastroenterology",
  },
};

export default async function GastroenterologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "gastroenterology" });
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
        pageKey="department:gastroenterology"
        fallback={
          <DepartmentSchema
            name="Gastroenterology & Hepatology | Popular Hospital"
            description="Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment."
            urlSlug="gastroenterology"
            medicalSpecialty="Gastroenterologic"
          />
        }
      />
      <GastroenterologyClient doctors={doctors} />
    </>
  );
}
