import { Metadata } from "next";
import StoriesClient from "./StoriesClient";
import { fetchPatientStories } from "@/lib/api";

export const revalidate = 60;


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/stories", {
  title: "Patient Stories | Popular Hospital",
  description:
    "Hear directly from our patients about their experiences and successful recovery journeys at Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/stories",
  },
});
}


export default async function StoriesPage() {
  const stories = await fetchPatientStories();
  return <StoriesClient stories={stories} />;
}
