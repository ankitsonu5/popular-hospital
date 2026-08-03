import { Metadata } from "next";
import CTVSClient from "./CTVSClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CTVS Department | Popular Hospital",
  description:
    "Specialized Cardiothoracic & Vascular Surgery (CTVS) including Bypass (CABG), Valve Replacement, and Aortic Surgery.",
  alternates: {
    canonical: "https://popularhospital.in/departments/ctvs",
  },
};

export default async function CTVSPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ctvs" });
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
        pageKey="department:ctvs"
        fallback={
          <DepartmentSchema
            name="CTVS Department | Popular Hospital"
            description="Specialized Cardiothoracic & Vascular Surgery (CTVS) including Bypass (CABG), Valve Replacement, and Aortic Surgery."
            urlSlug="ctvs"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <CTVSClient doctors={doctors} />
    </>
  );
}
