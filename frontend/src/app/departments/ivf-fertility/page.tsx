import type { Metadata } from "next";
import IvfFertilityClient from "./IvfFertilityClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "IVF & Fertility | Popular Hospital",
  description:
    "Advanced IVF and fertility care at Popular Hospital, Varanasi. Evaluation, ovulation induction, IUI, IVF guidance, fertility preservation, and compassionate reproductive care.",
};

export default function IvfFertilityPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:ivf-fertility"
        fallback={<DepartmentSchema
        name="IVF & Fertility | Popular Hospital"
        description="Advanced IVF and fertility care at Popular Hospital, Varanasi. Evaluation, ovulation induction, IUI, IVF guidance, fertility preservation, and compassionate reproductive care."
        urlSlug="ivf-fertility"
        medicalSpecialty="Gynecologic"
      />}
      />
      <IvfFertilityClient />
    </>
  );
}
