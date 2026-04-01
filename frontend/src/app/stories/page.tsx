import { Metadata } from "next";
import StoriesClient from "./StoriesClient";

export const metadata: Metadata = {
  title: "Patient Stories | Popular Hospital",
  description:
    "Hear directly from our patients about their experiences and successful recovery journeys at Popular Hospital.",
};

export default function StoriesPage() {
  return <StoriesClient />;
}
