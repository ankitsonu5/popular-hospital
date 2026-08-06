import type { Metadata } from "next";
import BurnsPlasticSurgeryClient from "./BurnsPlasticSurgeryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Burns & Plastic Surgery Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Burns & Plastic Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/burns-plastic-surgery",
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
            name="Best Burns & Plastic Surgery Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Burns & Plastic Surgery hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="burns-plastic-surgery"
            medicalSpecialty="PlasticSurgery"
          />
        }
      />
      <BurnsPlasticSurgeryClient doctors={doctors} />
    </>
  );
}
