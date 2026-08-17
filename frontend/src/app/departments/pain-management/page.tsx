import { Metadata } from "next";
import PainManagementClient from "./PainManagementClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/pain-management", {
  title: "Best Pain Management Clinic Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Pain Management Clinic hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/pain-management",
  },
});
}


export default async function PainManagementPage() {
  const dbDoctors = await fetchDoctors({ speciality: "pain-management" });
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
        pageKey="department:pain-management"
        fallback={
          <DepartmentSchema
            name="Best Pain Management Clinic Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Pain Management Clinic hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="pain-management"
            medicalSpecialty="Anesthesia"
          />
        }
      />
      <PainManagementClient doctors={doctors} />
    </>
  );
}
