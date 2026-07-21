import { Metadata } from "next";
import ENTClient from "./ENTClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ENT (Ear, Nose & Throat) | Popular Hospital",
  description:
    "Expert ENT services for ear, nose, and throat disorders. Advanced surgical and medical care by Dr. Anshuman Singh and team.",
};

export default async function ENTPage() {
  const dbDoctors = await fetchDoctors({ speciality: "ent" });
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
        pageKey="department:ent"
        fallback={
          <DepartmentSchema
            name="ENT (Ear, Nose & Throat) | Popular Hospital"
            description="Expert ENT services for ear, nose, and throat disorders. Advanced surgical and medical care by Dr. Anshuman Singh and team."
            urlSlug="ent"
            medicalSpecialty="Otolaryngologic"
          />
        }
      />
      <ENTClient doctors={doctors} />
    </>
  );
}
