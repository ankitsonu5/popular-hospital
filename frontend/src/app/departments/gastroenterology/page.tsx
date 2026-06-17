import type { Metadata } from "next";
import GastroenterologyClient from "./GastroenterologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Gastroenterology & Hepatology | Popular Hospital",
  description:
    "Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment.",
};

export default function GastroenterologyPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:gastroenterology"
        fallback={
          <DepartmentSchema
            name="Gastroenterology & Hepatology | Popular Hospital"
            description="Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment."
            urlSlug="gastroenterology"
            medicalSpecialty="Gastroenterologic"
          />
        }
      />
      <GastroenterologyClient />
    </>
  );
}
