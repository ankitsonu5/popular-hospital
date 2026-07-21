import type { Metadata } from "next";
import NephrologyClient from "./NephrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department of Nephrology | Popular Hospital",
  description:
    "Comprehensive kidney care including Hemodialysis, Peritoneal Dialysis, Kidney Transplantation, CRRT, and management of Chronic Kidney Disease.",
};

export default async function NephrologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "nephrology" });
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
        pageKey="department:nephrology"
        fallback={
          <DepartmentSchema
            name="Department of Nephrology | Popular Hospital"
            description="Comprehensive kidney care including Hemodialysis, Peritoneal Dialysis, Kidney Transplantation, CRRT, and management of Chronic Kidney Disease."
            urlSlug="nephrology"
            medicalSpecialty="Renal"
          />
        }
      />
      <NephrologyClient doctors={doctors} />
    </>
  );
}
