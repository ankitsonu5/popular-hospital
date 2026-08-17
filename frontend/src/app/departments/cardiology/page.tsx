import { Metadata } from "next";
import CardiologyClient from "./CardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import MedicalWebPageSchema from "@/components/schema/MedicalWebPageSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/cardiology", {
  title: "Best Cardiology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/cardiology",
  },
});
}


export default async function CardiologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "cardiology" });
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
        pageKey="department:cardiology"
        fallback={
          <DepartmentSchema
            name="Best Cardiology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="cardiology"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <MedicalWebPageSchema
        urlSlug="cardiology"
        name="Best Cardiology Hospital in Varanasi | Popular Hospital"
        description="Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
        specialtyName="Cardiology"
        reviewerName="Dr. Hari Krishan Srivastava"
        dateReviewed={new Date().toISOString().split('T')[0]} // Current date as proxy for lastReviewed
      />
      <CardiologyClient doctors={doctors} />
    </>
  );
}
