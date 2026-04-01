import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import NeurosurgeryClient from "./NeurosurgeryClient";

export const metadata: Metadata = {
  title: "Neurosurgery Department | Popular Hospital",
  description:
    "Expert surgical treatment for brain, spinal cord, and peripheral nerve disorders at Popular Hospital.",
};

export default function NeurosurgeryPage() {
  return <NeurosurgeryClient />;
}
