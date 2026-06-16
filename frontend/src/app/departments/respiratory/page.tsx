import { Metadata } from "next";
import RespiratoryClient from "./RespiratoryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Department of Respiratory Medicine | Popular Hospital",
  description:
    "Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Expert treatment for asthma, COPD, pneumonia, lung cancer, and more at Popular Hospital.",
};

export default function RespiratoryMedicinePage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:respiratory"
        fallback={
          <DepartmentSchema
            name="Department of Respiratory Medicine | Popular Hospital"
            description="Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Expert treatment for asthma, COPD, pneumonia, lung cancer, and more at Popular Hospital."
            urlSlug="respiratory"
            medicalSpecialty="Pulmonary"
          />
        }
      />
      <RespiratoryClient />
    </>
  );
}
