import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import NeurosurgeryClient from "./NeurosurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors } from "@/lib/api";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/neurosurgery", {
  title: "Best Neurosurgery Department Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Neurosurgery Department hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/neurosurgery",
  },
});
}


export default async function NeurosurgeryPage() {
  const doctors = await fetchDoctors({ speciality: "neurosurgery" });

  return (
    <>
      <DynamicSchema
        pageKey="department:neurosurgery"
        fallback={
          <DepartmentSchema
            name="Best Neurosurgery Department Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Neurosurgery Department hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="neurosurgery"
            medicalSpecialty="Neurologic"
          />
        }
      />
      <NeurosurgeryClient doctors={doctors} />
    </>
  );
}
