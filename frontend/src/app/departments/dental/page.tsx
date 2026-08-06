import { Metadata } from "next";
import DentalClient from "./DentalClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Dental Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Dental hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/dental",
  },
};

export default async function DentalPage() {
  const dbDoctors = await fetchDoctors({ speciality: "dental" });
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
        pageKey="department:dental"
        fallback={
          <DepartmentSchema
            name="Best Dental Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Dental hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="dental"
            medicalSpecialty="DentalSpecialty"
          />
        }
      />
      <DentalClient doctors={doctors} />
    </>
  );
}
