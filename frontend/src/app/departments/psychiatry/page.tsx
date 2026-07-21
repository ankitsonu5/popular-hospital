import { Metadata } from "next";
import PsychiatryClient from "./PsychiatryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Psychiatry Department | Popular Hospital",
  description:
    "Expert psychiatric care in Varanasi. Treatment for depression, anxiety, schizophrenia, bipolar disorder, and specialized therapy for all ages at Popular Hospital.",
};

export default async function PsychiatryPage() {
  const dbDoctors = await fetchDoctors({ speciality: "psychiatry" });
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
        pageKey="department:psychiatry"
        fallback={
          <DepartmentSchema
            name="Psychiatry Department | Popular Hospital"
            description="Expert psychiatric care in Varanasi. Treatment for depression, anxiety, schizophrenia, bipolar disorder, and specialized therapy for all ages at Popular Hospital."
            urlSlug="psychiatry"
            medicalSpecialty="Psychiatric"
          />
        }
      />
      <PsychiatryClient doctors={doctors} />
    </>
  );
}
