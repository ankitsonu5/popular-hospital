import { Metadata } from "next";
import DentalClient from "./DentalClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Department of Dental | Popular Hospital",
  description:
    "The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. Offering a full range of services from oral and maxillofacial surgery to digital radiological support.",
};

export default function DentalPage() {
  return (
    <>
      <DepartmentSchema
        name="Department of Dental | Popular Hospital"
        description="The department is operational with state of the art dental equipments harmonizing International standards to deliver quality treatment to the patients. Offering a full range of services from oral and maxillofacial surgery to digital radiological support."
        urlSlug="dental"
        medicalSpecialty="DentalSpecialty"
      />
      <DentalClient />
    </>
  );
}
