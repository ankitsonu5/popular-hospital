import { Metadata } from "next";
import PediatricsClient from "./PediatricsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pediatrics & Neonatology | Popular Hospital",
  description:
    "Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians.",
};

export default async function PediatricsPage() {
  const dbDoctors = await fetchDoctors({ speciality: "pediatrics" });
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
        pageKey="department:pediatrics"
        fallback={
          <DepartmentSchema
            name="Pediatrics & Neonatology | Popular Hospital"
            description="Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians."
            urlSlug="pediatrics"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricsClient doctors={doctors} />
    </>
  );
}
