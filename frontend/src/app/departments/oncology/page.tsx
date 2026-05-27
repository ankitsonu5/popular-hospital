import type { Metadata } from "next";
import OncologyClient from "./OncologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Oncology (Cancer Care) | Popular Hospital",
  description:
    "Comprehensive cancer care centre offering Medical, Surgical, and Radiation Oncology. Expert Tumor Board and dedicated chemotherapy day care.",
};

export default function OncologyPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:oncology"
        fallback={<DepartmentSchema
        name="Oncology (Cancer Care) | Popular Hospital"
        description="Comprehensive cancer care centre offering Medical, Surgical, and Radiation Oncology. Expert Tumor Board and dedicated chemotherapy day care."
        urlSlug="oncology"
        medicalSpecialty="Oncologic"
      />}
      />
      <OncologyClient />
    </>
  );
}
