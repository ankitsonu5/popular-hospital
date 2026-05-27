import { Metadata } from "next";
import OrthopedicsClient from "./OrthopedicsClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

export const metadata: Metadata = {
  title: "Orthopedics & Joint Replacement | Popular Hospital",
  description:
    "Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology.",
};

export default function OrthopedicsPage() {
  return (
    <>
      <DynamicSchema
        pageKey="department:orthopedics"
        fallback={<DepartmentSchema
        name="Orthopedics & Joint Replacement | Popular Hospital"
        description="Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology."
        urlSlug="orthopedics"
        medicalSpecialty="Musculoskeletal"
      />}
      />
      <OrthopedicsClient />
    </>
  );
}
