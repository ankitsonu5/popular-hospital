import type { Metadata } from "next";
import UrologyClient from "./UrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Department of Urology | Popular Hospital",
  description:
    "Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility.",
};

export default function UrologyPage() {
  return (
    <>
      <DepartmentSchema
        name="Department of Urology | Popular Hospital"
        description="Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility."
        urlSlug="urology"
        medicalSpecialty="Urologic"
      />
      <UrologyClient />
    </>
  );
}
