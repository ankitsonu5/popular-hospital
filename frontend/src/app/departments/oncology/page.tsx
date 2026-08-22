import type { Metadata } from "next";
import OncologyClient from "./OncologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const revalidate = 60;


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/oncology", {
  title: "Best Oncology (Cancer Care) Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Oncology (Cancer Care) hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/oncology",
  },
});
}


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
            name="Best Oncology (Cancer Care) Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Oncology (Cancer Care) hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="oncology"
            medicalSpecialty="Oncologic"
          />
        }
      />
      <OncologyClient doctors={doctors} />
    </>
  );
}
