import type { Metadata } from "next";
import IvfFertilityClient from "./IvfFertilityClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/ivf-fertility", {
  title: "Best IVF & Fertility Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best IVF & Fertility hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/ivf-fertility",
  },
});
}


export default async function IvfFertilityPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ivf-fertility" });
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
        pageKey="department:ivf-fertility"
        fallback={
          <DepartmentSchema
            name="Best IVF & Fertility Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best IVF & Fertility hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="ivf-fertility"
            medicalSpecialty="Gynecologic"
          />
        }
      />
      <IvfFertilityClient doctors={doctors} />
    </>
  );
}
