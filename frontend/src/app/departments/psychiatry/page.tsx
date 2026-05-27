import { Metadata } from "next";
import PsychiatryClient from "./PsychiatryClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Psychiatry Department | Popular Hospital",
  description:
    "Expert psychiatric care in Varanasi. Treatment for depression, anxiety, schizophrenia, bipolar disorder, and specialized therapy for all ages at Popular Hospital.",
};

export default function PsychiatryPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:psychiatry"
        fallback={<DepartmentSchema
        name="Psychiatry Department | Popular Hospital"
        description="Expert psychiatric care in Varanasi. Treatment for depression, anxiety, schizophrenia, bipolar disorder, and specialized therapy for all ages at Popular Hospital."
        urlSlug="psychiatry"
        medicalSpecialty="Psychiatric"
      />}
      />
      <PsychiatryClient />
    </>
  );
}
