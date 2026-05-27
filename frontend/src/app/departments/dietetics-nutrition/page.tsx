import { Metadata } from "next";
import DieteticsNutritionClient from "./DieteticsNutritionClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Dietetics & Nutrition | Popular Hospital",
  description:
    "Expert nutritional counseling and personalized diet plans at Popular Hospital Dietetics & Nutrition Department.",
};

export default function DieteticsNutritionPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:dietetics-nutrition"
        fallback={<DepartmentSchema
        name="Dietetics & Nutrition | Popular Hospital"
        description="Expert nutritional counseling and personalized diet plans at Popular Hospital Dietetics & Nutrition Department."
        urlSlug="dietetics-nutrition"
        medicalSpecialty="DietNutrition"
      />}
      />
      <DieteticsNutritionClient />
    </>
  );
}
