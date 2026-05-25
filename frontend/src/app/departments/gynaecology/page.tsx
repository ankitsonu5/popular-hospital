import type { Metadata } from "next";
import GynaecologyClient from "./GynaecologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";

export const metadata: Metadata = {
  title: "Obstetrics & Gynaecology | Popular Hospital",
  description:
    "Comprehensive women's health care including maternity, high-risk pregnancy, infertility treatment, and advanced gynaecological surgeries.",
};

export default function GynaecologyPage() {
  return (
    <>
      <DepartmentSchema
        name="Obstetrics & Gynaecology | Popular Hospital"
        description="Comprehensive women's health care including maternity, high-risk pregnancy, infertility treatment, and advanced gynaecological surgeries."
        urlSlug="gynaecology"
        medicalSpecialty="Gynecologic"
      />
      <GynaecologyClient />
    </>
  );
}
