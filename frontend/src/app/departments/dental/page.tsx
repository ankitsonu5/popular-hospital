import { Metadata } from "next";
import DentalClient from "./DentalClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department of Dental | Popular Hospital",
  description:
    "The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. Offering a full range of services from oral and maxillofacial surgery to digital radiological support.",
};

export default async function DentalPage() {
  const dbDoctors = await fetchDoctors({ speciality: "dental" });
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
        pageKey="department:dental"
        fallback={
          <DepartmentSchema
            name="Department of Dental | Popular Hospital"
            description="The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. Offering a full range of services from oral and maxillofacial surgery to digital radiological support."
            urlSlug="dental"
            medicalSpecialty="DentalSpecialty"
          />
        }
      />
      <DentalClient doctors={doctors} />
    </>
  );
}
