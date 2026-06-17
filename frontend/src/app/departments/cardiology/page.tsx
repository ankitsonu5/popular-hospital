import { Metadata } from "next";
import CardiologyClient from "./CardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Department of Cardiology | Popular Hospital",
  description:
    "Comprehensive evaluation of heart conditions with India's premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs.",
};

export default function CardiologyPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:cardiology"
        fallback={
          <DepartmentSchema
            name="Department of Cardiology | Popular Hospital"
            description="Comprehensive evaluation of heart conditions with India's premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs."
            urlSlug="cardiology"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <CardiologyClient />
    </>
  );
}
