import type { Metadata } from "next";
import PediatricCardiologyClient from "./PediatricCardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Pediatric Cardiology | Popular Hospital",
  description:
    "Specialized pediatric cardiology care for children. Dedicated Pediatric Cardiologists and support ensuring gentle, safe care.",
};

export default function PediatricCardiologyPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:pediatric-cardiology"
        fallback={
          <DepartmentSchema
            name="Pediatric Cardiology | Popular Hospital"
            description="Specialized pediatric cardiology care for children. Dedicated Pediatric Cardiologists and support ensuring gentle, safe care."
            urlSlug="pediatric-cardiology"
            medicalSpecialty="Pediatric"
          />
        }
      />
      <PediatricCardiologyClient />
    </>
  );
}
