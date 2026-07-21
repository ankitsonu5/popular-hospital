import { Metadata } from "next";
import OrthopedicsClient from "./OrthopedicsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orthopedics & Joint Replacement | Popular Hospital",
  description:
    "Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology.",
};

export default async function OrthopedicsPage() {
  const dbDoctors = await fetchDoctors({ speciality: "orthopedics" });
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
        pageKey="department:orthopedics"
        fallback={
          <DepartmentSchema
            name="Orthopedics & Joint Replacement | Popular Hospital"
            description="Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology."
            urlSlug="orthopedics"
            medicalSpecialty="Musculoskeletal"
          />
        }
      />
      <OrthopedicsClient doctors={doctors} />
    </>
  );
}
