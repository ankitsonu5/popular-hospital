import type { Metadata } from "next";
import DiabeticFootClient from "./DiabeticFootClient";

export const metadata: Metadata = {
  title: "Advanced Diabetic Foot Unit | Popular Hospital Varanasi",
  description:
    "Specialized Advanced Diabetic Foot Unit at Popular Hospital Varanasi — expert care for non-healing wounds, diabetic ulcers, neuropathy, and limb salvage with a multidisciplinary team.",
};

export default function DiabeticFootPage() {
  return <DiabeticFootClient />;
}
