import { Metadata } from "next";
import CTVSClient from "./CTVSClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/ctvs", {
  title: "Best CTVS Department Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best CTVS Department hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/ctvs",
  },
});
}


export default async function CTVSPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ctvs" });
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
        pageKey="department:ctvs"
        fallback={
          <DepartmentSchema
            name="Best CTVS Department Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best CTVS Department hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="ctvs"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <CTVSClient doctors={doctors} />
    </>
  );
}
