import type { Metadata } from "next";
import GynaecologyClient from "./GynaecologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obstetrics & Gynaecology | Popular Hospital",
  description:
    "Comprehensive women's health care including maternity, high-risk pregnancy, infertility treatment, and advanced gynaecological surgeries.",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/gynaecology",
  },
};

export default async function GynaecologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "gynaecology" });
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
        pageKey="department:gynaecology"
        fallback={
          <DepartmentSchema
            name="Obstetrics & Gynaecology | Popular Hospital"
            description="Comprehensive women's health care including maternity, high-risk pregnancy, infertility treatment, and advanced gynaecological surgeries."
            urlSlug="gynaecology"
            medicalSpecialty="Gynecologic"
          />
        }
      />
      <GynaecologyClient doctors={doctors} />
    </>
  );
}
