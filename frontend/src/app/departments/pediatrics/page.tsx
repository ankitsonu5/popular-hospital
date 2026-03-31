import { Metadata } from "next";
import PediatricsClient from "./PediatricsClient";

export const metadata: Metadata = {
  title: "Pediatrics & Neonatology | Popular Hospital",
  description:
    "Comprehensive pediatric care from newborns to adolescents. Featuring advanced NICU, vaccination center, and expert pediatricians.",
};

export default function PediatricsPage() {
  return <PediatricsClient />;
}
