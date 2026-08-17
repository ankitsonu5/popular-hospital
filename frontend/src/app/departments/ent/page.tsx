import { Metadata } from "next";
import ENTClient from "./ENTClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/departments/ent", {
  title: "Best ENT (Ear, Nose & Throat) Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best ENT (Ear, Nose & Throat) hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/ent",
  },
});
}


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
            name="Best ENT (Ear, Nose & Throat) Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best ENT (Ear, Nose & Throat) hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="ent"
            medicalSpecialty="Otolaryngologic"
          />
        }
      />
      <ENTClient doctors={doctors} />
    </>
  );
}
