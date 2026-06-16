import type { Metadata } from "next";
import UrologyClient from "./UrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Department of Urology | Popular Hospital",
  description:
    "Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility.",
};

export default function UrologyPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:urology"
        fallback={
          <DepartmentSchema
            name="Department of Urology | Popular Hospital"
            description="Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility."
            urlSlug="urology"
            medicalSpecialty="Urologic"
          />
        }
      />
      <UrologyClient />
    </>
  );
}
