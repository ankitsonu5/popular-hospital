import { Metadata } from "next";
import OphthalmologyClient from "./OphthalmologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Ophthalmology | Popular Hospital",
  description:
    "Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract surgery, Glaucoma treatment, and specialized eye care for all age groups.",
};

export default function OphthalmologyPage() {
  return (
    <>
      <DepartmentSchema
        name="Ophthalmology | Popular Hospital"
        description="Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract surgery, Glaucoma treatment, and specialized eye care for all age groups."
        urlSlug="ophthalmology"
        medicalSpecialty="Optometric"
      />
      <OphthalmologyClient />
    </>
  );
}
