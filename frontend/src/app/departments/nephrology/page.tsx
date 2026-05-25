import type { Metadata } from "next";
import NephrologyClient from "./NephrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Department of Nephrology | Popular Hospital",
  description:
    "Comprehensive kidney care including Hemodialysis, Peritoneal Dialysis, Kidney Transplantation, CRRT, and management of Chronic Kidney Disease.",
};

export default function NephrologyPage() {
  return (
    <>
      <DepartmentSchema
        name="Department of Nephrology | Popular Hospital"
        description="Comprehensive kidney care including Hemodialysis, Peritoneal Dialysis, Kidney Transplantation, CRRT, and management of Chronic Kidney Disease."
        urlSlug="nephrology"
        medicalSpecialty="Renal"
      />
      <NephrologyClient />
    </>
  );
}
