import type { Metadata } from "next";
import NephrologyClient from "./NephrologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Nephrology Hospital in Varanasi | Popular Hospital",
  description:
    "Popular Hospital is the best Nephrology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
  alternates: {
    canonical: "https://www.popularhospital.in/departments/nephrology",
  },
};

export default async function NephrologyPage() {
  const dbDoctors = await fetchDoctors({ speciality: "nephrology" });
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
        pageKey="department:nephrology"
        fallback={
          <DepartmentSchema
            name="Best Nephrology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Nephrology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="nephrology"
            medicalSpecialty="Renal"
          />
        }
      />
      <NephrologyClient doctors={doctors} />
    </>
  );
}
