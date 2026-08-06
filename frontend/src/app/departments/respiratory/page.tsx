import { Metadata } from "next";
import RespiratoryClient from "./RespiratoryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Respiratory Medicine Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Respiratory Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/respiratory",
  },
};

export default async function RespiratoryMedicinePage() {
  const dbDoctors = await fetchDoctors({ speciality: "respiratory" });
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
        pageKey="department:respiratory"
        fallback={
          <DepartmentSchema
            name="Best Respiratory Medicine Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Respiratory Medicine hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="respiratory"
            medicalSpecialty="Pulmonary"
          />
        }
      />
      <RespiratoryClient doctors={doctors} />
    </>
  );
}
