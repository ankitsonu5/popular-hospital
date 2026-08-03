import type { Metadata } from "next";
import BurnsPlasticSurgeryClient from "./BurnsPlasticSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Burns & Plastic Surgery | Popular Hospital",
  description:
    "Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities.",
  alternates: {
    canonical: "https://popularhospital.in/departments/burns-plastic-surgery",
  },
};

export default async function PlasticSurgeryPage() {
  const dbDoctors = await fetchDoctors({ speciality: "burns-plastic-surgery" });
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
        pageKey="department:burns-plastic-surgery"
        fallback={
          <DepartmentSchema
            name="Burns & Plastic Surgery | Popular Hospital"
            description="Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities."
            urlSlug="burns-plastic-surgery"
            medicalSpecialty="PlasticSurgery"
          />
        }
      />
      <BurnsPlasticSurgeryClient doctors={doctors} />
    </>
  );
}
