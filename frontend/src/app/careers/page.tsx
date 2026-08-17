import { Metadata } from "next";
import CareersClient from "./CareersClient";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/careers", {
  title: "Careers | Popular Hospital",
  description:
    "Join our team of dedicated medical professionals and make a real difference in patient care. Explore medical and non-medical job openings at Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/careers",
  },
});
}


export default function CareerPage() {
  return <CareersClient />;
}
