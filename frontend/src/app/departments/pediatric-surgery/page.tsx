import type { Metadata } from "next";
import PediatricSurgeryClient from "./PediatricSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const revalidate = 60;


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/pediatric-surgery", {
  title: "Best Pediatric Surgery Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Pediatric Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/pediatric-surgery",
  },
});
}


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
            name="Best Pediatric Surgery Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Pediatric Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="pediatric-surgery"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricSurgeryClient doctors={doctors} />
    </>
  );
}
