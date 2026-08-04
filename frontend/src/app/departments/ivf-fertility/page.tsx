import type { Metadata } from "next";
import IvfFertilityClient from "./IvfFertilityClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IVF & Fertility | Popular Hospital",
  description:
    "Advanced IVF and fertility care at Popular Hospital, Varanasi. Evaluation, ovulation induction, IUI, IVF guidance, fertility preservation, and compassionate reproductive care.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/ivf-fertility",
  },
};

export default async function IvfFertilityPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ivf-fertility" });
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
        pageKey="department:ivf-fertility"
        fallback={
          <DepartmentSchema
            name="IVF & Fertility | Popular Hospital"
            description="Advanced IVF and fertility care at Popular Hospital, Varanasi. Evaluation, ovulation induction, IUI, IVF guidance, fertility preservation, and compassionate reproductive care."
            urlSlug="ivf-fertility"
            medicalSpecialty="Gynecologic"
          />
        }
      />
      <IvfFertilityClient doctors={doctors} />
    </>
  );
}
