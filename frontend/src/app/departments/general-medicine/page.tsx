import { Metadata } from "next";
import GeneralMedicineClient from "./GeneralMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "General Medicine | Popular Hospital",
  description:
    "Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare.",
};

export default function GeneralMedicinePage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:general-medicine"
        fallback={
          <DepartmentSchema
            name="General Medicine | Popular Hospital"
            description="Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare."
            urlSlug="general-medicine"
            medicalSpecialty="InfectiousDisease"
          />
        }
      />
      <GeneralMedicineClient />
    </>
  );
}
