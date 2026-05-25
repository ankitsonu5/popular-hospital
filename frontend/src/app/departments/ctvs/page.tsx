import { Metadata } from "next";
import CTVSClient from "./CTVSClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "CTVS Department | Popular Hospital",
  description:
    "Specialized Cardiothoracic & Vascular Surgery (CTVS) including Bypass (CABG), Valve Replacement, and Aortic Surgery.",
};

export default function CTVSPage() {
  return (
    <>
      <DepartmentSchema
        name="CTVS Department | Popular Hospital"
        description="Specialized Cardiothoracic & Vascular Surgery (CTVS) including Bypass (CABG), Valve Replacement, and Aortic Surgery."
        urlSlug="ctvs"
        medicalSpecialty="Cardiovascular"
      />
      <CTVSClient />
    </>
  );
}
