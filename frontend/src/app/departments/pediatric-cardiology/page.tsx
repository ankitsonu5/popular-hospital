import type { Metadata } from "next";
import PediatricCardiologyClient from "./PediatricCardiologyClient";

export const metadata: Metadata = {
  title: "Pediatric Cardiology | Popular Hospital",
  description:
    "Specialized pediatric cardiology care for children. Dedicated Pediatric Cardiologists and support ensuring gentle, safe care.",
};

export default function PediatricCardiologyPage() {
  return <PediatricCardiologyClient />;
}
