import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import NeurosurgeryClient from "./NeurosurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Neurosurgery Department | Popular Hospital",
  description:
    "Expert surgical treatment for brain, spinal cord, and peripheral nerve disorders at Popular Hospital.",
};

export default function NeurosurgeryPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:neurosurgery"
        fallback={<DepartmentSchema
        name="Neurosurgery Department | Popular Hospital"
        description="Expert surgical treatment for brain, spinal cord, and peripheral nerve disorders at Popular Hospital."
        urlSlug="neurosurgery"
        medicalSpecialty="Neurologic"
      />}
      />
      <NeurosurgeryClient />
    </>
  );
}
