import type { Metadata } from "next";
import DiabeticFootClient from "./DiabeticFootClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/diabetic-foot", {
  title: "Best Diabetic Foot Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Diabetic Foot hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/diabetic-foot",
  },
});
}


export default async function DiabeticFootPage() {
  const dbDoctors = await fetchDoctors({ speciality: "diabetic-foot" });
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
        pageKey="department:diabetic-foot"
        fallback={
          <DepartmentSchema
            name="Best Diabetic Foot Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Diabetic Foot hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="diabetic-foot"
            medicalSpecialty="Endocrine"
          />
        }
      />
      <DiabeticFootClient doctors={doctors} />
    </>
  );
}
