import type { Metadata } from "next";
import UrologyClient from "./UrologyClient";

export const metadata: Metadata = {
  title: "Department of Urology | Popular Hospital",
  description:
    "Expert care for urological conditions including kidney stones, prostate health, uro-oncology, and male infertility.",
};

export default function UrologyPage() {
  return <UrologyClient />;
}
