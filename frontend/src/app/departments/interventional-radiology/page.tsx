import { Metadata } from "next";
import InterventionalRadiologyClient from "./InterventionalRadiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Best Interventional Radiology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Interventional Radiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/interventional-radiology",
  },
};

export default async function InterventionalRadiologyPage() {
  const doctors = await fetchDoctors({
    speciality: "interventional-radiology",
  });

  return (
    <>
      <DynamicSchema
        pageKey="department:interventional-radiology"
        fallback={
          <DepartmentSchema
            name="Best Interventional Radiology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Interventional Radiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="interventional-radiology"
            medicalSpecialty="Radiologic"
          />
        }
      />
      <InterventionalRadiologyClient doctors={doctors} />
    </>
  );
}