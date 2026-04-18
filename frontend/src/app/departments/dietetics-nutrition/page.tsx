import { Metadata } from "next";
import DieteticsNutritionClient from "./DieteticsNutritionClient";
import { fetchDoctors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Dietetics & Nutrition | Popular Hospital",
  description:
    "Expert nutritional counseling and personalized diet plans at Popular Hospital Dietetics & Nutrition Department.",
};

export default async function DieteticsNutritionPage() {
  const doctors = await fetchDoctors({ speciality: "dietetics-nutrition" });
  return <DieteticsNutritionClient doctors={doctors} />;
}
