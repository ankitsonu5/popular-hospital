import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import NeurosurgeryClient from "./NeurosurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Neurosurgery Department | Popular Hospital",
  description:
    "Expert surgical treatment for brain, spinal cord, and peripheral nerve disorders at Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/neurosurgery",
  },
};

export default async function NeurosurgeryPage() {
  const doctors = await fetchDoctors({ speciality: "neurosurgery" });

  return (
    <>
      <DynamicSchema
        pageKey="department:neurosurgery"
        fallback={
          <DepartmentSchema
            name="Neurosurgery Department | Popular Hospital"
            description="Expert surgical treatment for brain, spinal cord, and peripheral nerve disorders at Popular Hospital."
            urlSlug="neurosurgery"
            medicalSpecialty="Neurologic"
          />
        }
      />
      <NeurosurgeryClient doctors={doctors} />
    </>
  );
}
