import { Metadata } from "next";
import CardiologyClient from "./CardiologyClient";

export const metadata: Metadata = {
  title: "Department of Cardiology | Popular Hospital",
  description:
    "Comprehensive evaluation of heart conditions with India's premier cardiac care team. Advanced diagnostics, minimally invasive procedures, and personalized rehabilitation programs.",
};

export default function CardiologyPage() {
  return <CardiologyClient />;
}
