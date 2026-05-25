import type { Metadata } from "next";
import GastroenterologyClient from "./GastroenterologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Gastroenterology & Hepatology | Popular Hospital",
  description:
    "Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment.",
};

export default function GastroenterologyPage() {
  return (
    <>
      <DepartmentSchema
        name="Gastroenterology & Hepatology | Popular Hospital"
        description="Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment."
        urlSlug="gastroenterology"
        medicalSpecialty="Gastroenterologic"
      />
      <GastroenterologyClient />
    </>
  );
}
