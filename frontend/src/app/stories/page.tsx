import { Metadata } from "next";
import StoriesClient from "./StoriesClient";
import { fetchPatientStories } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Patient Stories | Popular Hospital",
  description:
    "Hear directly from our patients about their experiences and successful recovery journeys at Popular Hospital.",
  alternates: {
    canonical: "https://popularhospital.in/stories",
  },
};

export default async function StoriesPage() {
  const stories = await fetchPatientStories();
  return <StoriesClient stories={stories} />;
}
