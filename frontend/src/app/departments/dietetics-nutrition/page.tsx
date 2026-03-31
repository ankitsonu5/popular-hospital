import { Metadata } from "next";
import DieteticsNutritionClient from "./DieteticsNutritionClient";

export const metadata: Metadata = {
  title: "Dietetics & Nutrition | Popular Hospital",
  description:
    "Expert nutritional counseling and personalized diet plans at Popular Hospital Dietetics & Nutrition Department.",
};

export default function DieteticsNutritionPage() {
  return <DieteticsNutritionClient />;
}
