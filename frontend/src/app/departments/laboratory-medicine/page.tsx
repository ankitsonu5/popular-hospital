import { Metadata } from "next";
import LaboratoryMedicineClient from "./LaboratoryMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Laboratory Medicine | Popular Hospital",
  description:
    "Advanced diagnostic services and medical research at Popular Hospital Laboratory Medicine Department.",
};

export default function LaboratoryMedicinePage() {
  return (
    <>
      <DepartmentSchema
        name="Laboratory Medicine | Popular Hospital"
        description="Advanced diagnostic services and medical research at Popular Hospital Laboratory Medicine Department."
        urlSlug="laboratory-medicine"
        medicalSpecialty="LaboratoryScience"
      />
      <LaboratoryMedicineClient />
    </>
  );
}
