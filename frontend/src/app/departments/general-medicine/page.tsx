import { Metadata } from "next";
import GeneralMedicineClient from "./GeneralMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/general-medicine", {
  title: "Best General Medicine Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best General Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/general-medicine",
  },
});
}


export default async function GeneralMedicinePage() {
  const dbDoctors = await fetchDoctors({ speciality: "general-medicine" });
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
        pageKey="department:general-medicine"
        fallback={
          <DepartmentSchema
            name="Best General Medicine Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best General Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="general-medicine"
            medicalSpecialty="InfectiousDisease"
          />
        }
      />
      <GeneralMedicineClient doctors={doctors} />
    </>
  );
}
