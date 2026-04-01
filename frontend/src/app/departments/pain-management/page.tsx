import { Metadata } from "next";
import PainManagementClient from "./PainManagementClient";

export const metadata: Metadata = {
  title: "Pain Management Clinic | Popular Hospital",
  description:
    "Specialized management of chronic pain not responding to conventional treatment. Expert care for Trigeminal Neuralgia, PRP Therapy, Cancer Pain, and more under the supervision of specialists.",
};

export default function PainManagementPage() {
  return <PainManagementClient />;
}
