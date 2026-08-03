import { Metadata } from "next";
import LaboratoryMedicineClient from "./LaboratoryMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Laboratory Medicine | Popular Hospital",
  description:
    "Advanced diagnostic services and medical research at Popular Hospital Laboratory Medicine Department.",
  alternates: {
    canonical: "https://popularhospital.in/departments/laboratory-medicine",
  },
};

export default function LaboratoryMedicinePage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:laboratory-medicine"
        fallback={
          <DepartmentSchema
            name="Laboratory Medicine | Popular Hospital"
            description="Advanced diagnostic services and medical research at Popular Hospital Laboratory Medicine Department."
            urlSlug="laboratory-medicine"
            medicalSpecialty="LaboratoryScience"
          />
        }
      />
      <LaboratoryMedicineClient />
    </>
  );
}
