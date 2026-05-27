import { Metadata } from "next";
import ENTClient from "./ENTClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "ENT (Ear, Nose & Throat) | Popular Hospital",
  description:
    "Expert ENT services for ear, nose, and throat disorders. Advanced surgical and medical care by Dr. Anshuman Singh and team.",
};

export default function ENTPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:ent"
        fallback={<DepartmentSchema
        name="ENT (Ear, Nose & Throat) | Popular Hospital"
        description="Expert ENT services for ear, nose, and throat disorders. Advanced surgical and medical care by Dr. Anshuman Singh and team."
        urlSlug="ent"
        medicalSpecialty="Otolaryngologic"
      />}
      />
      <ENTClient />
    </>
  );
}
