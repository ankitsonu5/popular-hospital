import { Metadata } from "next";
import CardiologyClient from "./CardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department of Cardiology | Popular Hospital",
  description:
    "Comprehensive evaluation of heart conditions with India's premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs.",
};

export default async function CardiologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "cardiology" });
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
        pageKey="department:cardiology"
        fallback={
          <DepartmentSchema
            name="Department of Cardiology | Popular Hospital"
            description="Comprehensive evaluation of heart conditions with India's premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs."
            urlSlug="cardiology"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <CardiologyClient doctors={doctors} />
    </>
  );
}
