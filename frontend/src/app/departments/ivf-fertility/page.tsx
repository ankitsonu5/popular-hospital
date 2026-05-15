import type { Metadata } from "next";
import IvfFertilityClient from "./IvfFertilityClient";

export const metadata: Metadata = {
  title: "IVF & Fertility | Popular Hospital",
  description:
    "Advanced IVF and fertility care at Popular Hospital, Varanasi. Evaluation, ovulation induction, IUI, IVF guidance, fertility preservation, and compassionate reproductive care.",
};

export default function IvfFertilityPage() {
  return <IvfFertilityClient />;
}
