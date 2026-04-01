import { Metadata } from "next";
import GeneralMedicineClient from "./GeneralMedicineClient";

export const metadata: Metadata = {
  title: "General Medicine | Popular Hospital",
  description:
    "Comprehensive internal medicine services for adult health. Management of chronic conditions, infectious diseases, and preventive healthcare.",
};

export default function GeneralMedicinePage() {
  return <GeneralMedicineClient />;
}
