import type { Metadata } from "next";
import PediatricSurgeryClient from "./PediatricSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Pediatric Surgery | Popular Hospital",
  description:
    "Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care.",
};

export default function PediatricSurgeryPage() {
  return (
    <>
      <DepartmentSchema
        name="Pediatric Surgery | Popular Hospital"
        description="Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care."
        urlSlug="pediatric-surgery"
        medicalSpecialty="Pediatric"
      />
      <PediatricSurgeryClient />
    </>
  );
}
