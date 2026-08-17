import type { Metadata } from "next";
import GynaecologyClient from "./GynaecologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/gynaecology", {
  title: "Best Obstetrics & Gynaecology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Obstetrics & Gynaecology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/gynaecology",
  },
});
}


export default async function GynaecologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "gynaecology" });
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
        pageKey="department:gynaecology"
        fallback={
          <DepartmentSchema
            name="Best Obstetrics & Gynaecology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Obstetrics & Gynaecology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="gynaecology"
            medicalSpecialty="Gynecologic"
          />
        }
      />
      <GynaecologyClient doctors={doctors} />
    </>
  );
}
