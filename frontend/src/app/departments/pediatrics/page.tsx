import { Metadata } from "next";
import PediatricsClient from "./PediatricsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Pediatrics & Neonatology | Popular Hospital",
  description:
    "Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians.",
};

export default function PediatricsPage() {
  return (
    <>
      <DepartmentSchema
        name="Pediatrics & Neonatology | Popular Hospital"
        description="Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians."
        urlSlug="pediatrics"
        medicalSpecialty="Pediatric"
      />
      <PediatricsClient />
    </>
  );
}
