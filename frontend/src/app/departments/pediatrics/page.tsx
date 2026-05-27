import { Metadata } from "next";
import PediatricsClient from "./PediatricsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Pediatrics & Neonatology | Popular Hospital",
  description:
    "Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians.",
};

export default function PediatricsPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:pediatrics"
        fallback={<DepartmentSchema
        name="Pediatrics & Neonatology | Popular Hospital"
        description="Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians."
        urlSlug="pediatrics"
        medicalSpecialty="Pediatric"
      />}
      />
      <PediatricsClient />
    </>
  );
}
