import { Metadata } from "next";
import PainManagementClient from "./PainManagementClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Pain Management Clinic | Popular Hospital",
  description:
    "Specialized management of chronic pain not responding to conventional treatment. Expert care for Trigeminal Neuralgia, PRP Therapy, Cancer Pain, and more under the supervision of specialists.",
};

export default function PainManagementPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:pain-management"
        fallback={<DepartmentSchema
        name="Pain Management Clinic | Popular Hospital"
        description="Specialized management of chronic pain not responding to conventional treatment. Expert care for Trigeminal Neuralgia, PRP Therapy, Cancer Pain, and more under the supervision of specialists."
        urlSlug="pain-management"
        medicalSpecialty="Anesthesia"
      />}
      />
      <PainManagementClient />
    </>
  );
}
