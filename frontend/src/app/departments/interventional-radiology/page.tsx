import { Metadata } from "next";
import InterventionalRadiologyClient from "./InterventionalRadiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Interventional Radiology | Popular Hospital",
  description:
    "Advanced imaging technology meets expert clinical interpretation. Our interventional radiology team provides minimally invasive treatments with maximum precision.",
};

export default async function InterventionalRadiologyPage() {
  const doctors = await fetchDoctors({
    speciality: "interventional-radiology",
  });

  return (
    <>
      <DynamicSchema
        pageKey="department:interventional-radiology"
        fallback={
          <DepartmentSchema
            name="Interventional Radiology | Popular Hospital"
            description="Advanced imaging technology meets expert clinical interpretation. Our interventional radiology team provides minimally invasive treatments with maximum precision."
            urlSlug="interventional-radiology"
            medicalSpecialty="Radiologic"
          />
        }
      />
      <InterventionalRadiologyClient doctors={doctors} />
    </>
  );
}
