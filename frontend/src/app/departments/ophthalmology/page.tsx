import { Metadata } from "next";
import OphthalmologyClient from "./OphthalmologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ophthalmology | Popular Hospital",
  description:
    "Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract surgery, Glaucoma treatment, and specialized eye care for all age groups.",
};

export default async function OphthalmologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ophthalmology" });
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
        pageKey="department:ophthalmology"
        fallback={
          <DepartmentSchema
            name="Ophthalmology | Popular Hospital"
            description="Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract surgery, Glaucoma treatment, and specialized eye care for all age groups."
            urlSlug="ophthalmology"
            medicalSpecialty="Optometric"
          />
        }
      />
      <OphthalmologyClient doctors={doctors} />
    </>
  );
}
