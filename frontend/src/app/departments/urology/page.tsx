import type { Metadata } from "next";
import UrologyClient from "./UrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/urology", {
  title: "Best Urology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Urology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/urology",
  },
});
}


export default async function UrologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "urology" });
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
        pageKey="department:urology"
        fallback={
          <DepartmentSchema
            name="Best Urology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Urology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="urology"
            medicalSpecialty="Urologic"
          />
        }
      />
      <UrologyClient doctors={doctors} />
    </>
  );
}
