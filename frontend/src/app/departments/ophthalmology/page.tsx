import { Metadata } from "next";
import OphthalmologyClient from "./OphthalmologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const revalidate = 60;


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/ophthalmology", {
  title: "Best Ophthalmology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Ophthalmology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/ophthalmology",
  },
});
}


export default async function OphthalmologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ophthalmology" });
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
        pageKey="department:ophthalmology"
        fallback={
          <DepartmentSchema
            name="Best Ophthalmology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Ophthalmology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="ophthalmology"
            medicalSpecialty="Optometric"
          />
        }
      />
      <OphthalmologyClient doctors={doctors} />
    </>
  );
}
