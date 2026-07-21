import type { Metadata } from "next";
import PediatricSurgeryClient from "./PediatricSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pediatric Surgery | Popular Hospital",
  description:
    "Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care.",
};

export default async function PediatricSurgeryPage() {
  const dbDoctors = await fetchDoctors({ speciality: "pediatric-surgery" });
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
        pageKey="department:pediatric-surgery"
        fallback={
          <DepartmentSchema
            name="Pediatric Surgery | Popular Hospital"
            description="Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care."
            urlSlug="pediatric-surgery"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricSurgeryClient doctors={doctors} />
    </>
  );
}
