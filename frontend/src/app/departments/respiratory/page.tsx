import { Metadata } from "next";
import RespiratoryClient from "./RespiratoryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department of Respiratory Medicine | Popular Hospital",
  description:
    "Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Expert treatment for asthma, COPD, pneumonia, lung cancer, and more at Popular Hospital.",
};

export default async function RespiratoryMedicinePage() {
  const dbDoctors = await fetchDoctors({ speciality: "respiratory" });
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
        pageKey="department:respiratory"
        fallback={
          <DepartmentSchema
            name="Department of Respiratory Medicine | Popular Hospital"
            description="Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Expert treatment for asthma, COPD, pneumonia, lung cancer, and more at Popular Hospital."
            urlSlug="respiratory"
            medicalSpecialty="Pulmonary"
          />
        }
      />
      <RespiratoryClient doctors={doctors} />
    </>
  );
}
