import { Metadata } from "next";
import RespiratoryClient from "./RespiratoryClient";

export const metadata: Metadata = {
  title: "Department of Respiratory Medicine | Popular Hospital",
  description:
    "Our Respiratory medicine Department is dedicated to providing exceptional care of chest, lungs, and Sleep Disorders. Expert treatment for asthma, COPD, pneumonia, lung cancer, and more at Popular Hospital.",
};

export default function RespiratoryMedicinePage() {
  return <RespiratoryClient />;
}
