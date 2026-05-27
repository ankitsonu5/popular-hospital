import type { Metadata } from "next";
import BurnsPlasticSurgeryClient from "./BurnsPlasticSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Burns & Plastic Surgery | Popular Hospital",
  description:
    "Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities.",
};

export default function PlasticSurgeryPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:burns-plastic-surgery"
        fallback={<DepartmentSchema
        name="Burns & Plastic Surgery | Popular Hospital"
        description="Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities."
        urlSlug="burns-plastic-surgery"
        medicalSpecialty="PlasticSurgery"
      />}
      />
      <BurnsPlasticSurgeryClient />
    </>
  );
}
