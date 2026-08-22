import type { Metadata } from "next";
import PediatricCardiologyClient from "./PediatricCardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const revalidate = 60;


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/pediatric-cardiology", {
  title: "Best Pediatric Cardiology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Pediatric Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/pediatric-cardiology",
  },
});
}


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
            name="Best Pediatric Cardiology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Pediatric Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="pediatric-cardiology"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricCardiologyClient doctors={doctors} />
    </>
  );
}
