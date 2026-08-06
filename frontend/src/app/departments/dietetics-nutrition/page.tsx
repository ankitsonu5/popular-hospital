import { Metadata } from "next";
import DieteticsNutritionClient from "./DieteticsNutritionClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Dietetics & Nutrition Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Dietetics & Nutrition hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/dietetics-nutrition",
  },
};

export default async function DieteticsNutritionPage() {
  const dbDoctors = await fetchDoctors({ speciality: "dietetics-nutrition" });
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
        pageKey="department:dietetics-nutrition"
        fallback={
          <DepartmentSchema
            name="Best Dietetics & Nutrition Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Dietetics & Nutrition hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="dietetics-nutrition"
            medicalSpecialty="DietNutrition"
          />
        }
      />
      <DieteticsNutritionClient doctors={doctors} />
    </>
  );
}
