import { Metadata } from "next";
import GeneralMedicineClient from "./GeneralMedicineClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "General Medicine | Popular Hospital",
  description:
    "Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/general-medicine",
  },
};

export default async function GeneralMedicinePage() {
  const dbDoctors = await fetchDoctors({ speciality: "general-medicine" });
  const doctors = dbDoctors.map((d) => ({
    name: d.name,
    qualifications: d.qualification || "",
    designation:
      typeof d.designation === "object" ? d.designation?.name : d.designation,
    slug: d.slug,
    image: d.image_url ? getImageUrl(d.image_url) : "",
  }));

  return (
    <>
      <DynamicSchema
        pageKey="department:general-medicine"
        fallback={
          <DepartmentSchema
            name="General Medicine | Popular Hospital"
            description="Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare."
            urlSlug="general-medicine"
            medicalSpecialty="InfectiousDisease"
          />
        }
      />
      <GeneralMedicineClient doctors={doctors} />
    </>
  );
}
