import { Metadata } from "next";
import PediatricsClient from "./PediatricsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/pediatrics", {
  title: "Best Pediatrics & Neonatology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Pediatrics & Neonatology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/pediatrics",
  },
});
}


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
            name="Best Pediatrics & Neonatology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Pediatrics & Neonatology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="pediatrics"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricsClient doctors={doctors} />
    </>
  );
}
