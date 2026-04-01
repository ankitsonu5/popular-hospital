import type { Metadata } from "next";
import BurnsPlasticSurgeryClient from "./BurnsPlasticSurgeryClient";

export const metadata: Metadata = {
  title: "Burns & Plastic Surgery | Popular Hospital",
  description:
    "Specialized centre for Burns Care, Reconstructive Surgery, and Cosmetic Enhancements. Advanced burn ICU and microsurgery facilities.",
};

export default function PlasticSurgeryPage() {
  return <BurnsPlasticSurgeryClient />;
}
