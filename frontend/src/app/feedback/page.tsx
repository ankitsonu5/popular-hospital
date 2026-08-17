import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/feedback", {
  title: "Patient Feedback | Popular Hospital",
  description:
    "Your feedback helps us provide better care. Please share your experience with Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/feedback",
  },
});
}


export default function FeedbackPage() {
  return <FeedbackClient />;
}
