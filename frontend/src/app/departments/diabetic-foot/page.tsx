import type { Metadata } from "next";
import DiabeticFootClient from "./DiabeticFootClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advanced Diabetic Foot Unit | Popular Hospital Varanasi",
  description:
    "Specialized Advanced Diabetic Foot Unit at Popular Hospital Varanasi — expert care for non-healing wounds, diabetic ulcers, neuropathy, and limb salvage with a multidisciplinary team.",
};

export default async function DiabeticFootPage() {
  const dbDoctors = await fetchDoctors({ speciality: "diabetic-foot" });
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
        pageKey="department:diabetic-foot"
        fallback={
          <DepartmentSchema
            name="Advanced Diabetic Foot Unit | Popular Hospital Varanasi"
            description="Specialized Advanced Diabetic Foot Unit at Popular Hospital Varanasi — expert care for non-healing wounds, diabetic ulcers, neuropathy, and limb salvage with a multidisciplinary team."
            urlSlug="diabetic-foot"
            medicalSpecialty="Endocrine"
          />
        }
      />
      <DiabeticFootClient doctors={doctors} />
    </>
  );
}
