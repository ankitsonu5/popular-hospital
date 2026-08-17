import type { Metadata } from "next";
import GeneralSurgeryClient from "./GeneralSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/general-surgery", {
  title: "Best Laparoscopy & General Surgery Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Laparoscopy & General Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/general-surgery",
  },
});
}


export default async function GeneralSurgeryPage() {
  const dbDoctors = await fetchDoctors({ speciality: "general-surgery" });
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
        pageKey="department:general-surgery"
        fallback={
          <DepartmentSchema
            name="Best Laparoscopy & General Surgery Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Laparoscopy & General Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="general-surgery"
            medicalSpecialty="Surgical"
          />
        }
      />
      <GeneralSurgeryClient doctors={doctors} />
    </>
  );
}
