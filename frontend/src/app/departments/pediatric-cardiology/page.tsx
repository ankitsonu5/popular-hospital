import type { Metadata } from "next";
import PediatricCardiologyClient from "./PediatricCardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pediatric Cardiology | Popular Hospital",
  description:
    "Specialized pediatric cardiology care for children. Dedicated Pediatric Cardiologists and support ensuring gentle, safe care.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/pediatric-cardiology",
  },
};

export default async function PediatricCardiologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "pediatric-cardiology" });
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
        pageKey="department:pediatric-cardiology"
        fallback={
          <DepartmentSchema
            name="Pediatric Cardiology | Popular Hospital"
            description="Specialized pediatric cardiology care for children. Dedicated Pediatric Cardiologists and support ensuring gentle, safe care."
            urlSlug="pediatric-cardiology"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricCardiologyClient doctors={doctors} />
    </>
  );
}
