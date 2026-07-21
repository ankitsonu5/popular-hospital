import { Metadata } from "next";
import PainManagementClient from "./PainManagementClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pain Management Clinic | Popular Hospital",
  description:
    "Specialized management of chronic pain not responding to conventional treatment. Expert care for Trigeminal Neuralgia, PRP Therapy, Cancer Pain, and more under the supervision of specialists.",
};

export default async function PainManagementPage() {
  const dbDoctors = await fetchDoctors({ speciality: "pain-management" });
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
        pageKey="department:pain-management"
        fallback={
          <DepartmentSchema
            name="Pain Management Clinic | Popular Hospital"
            description="Specialized management of chronic pain not responding to conventional treatment. Expert care for Trigeminal Neuralgia, PRP Therapy, Cancer Pain, and more under the supervision of specialists."
            urlSlug="pain-management"
            medicalSpecialty="Anesthesia"
          />
        }
      />
      <PainManagementClient doctors={doctors} />
    </>
  );
}
