import { Metadata } from "next";
import LaboratoryMedicineClient from "./LaboratoryMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/laboratory-medicine", {
  title: "Best Laboratory Medicine Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Laboratory Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/laboratory-medicine",
  },
});
}


export default function LaboratoryMedicinePage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:laboratory-medicine"
        fallback={
          <DepartmentSchema
            name="Best Laboratory Medicine Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Laboratory Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="laboratory-medicine"
            medicalSpecialty="LaboratoryScience"
          />
        }
      />
      <LaboratoryMedicineClient />
    </>
  );
}
