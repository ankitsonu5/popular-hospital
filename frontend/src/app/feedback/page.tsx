import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Patient Feedback | Popular Hospital",
  description:
    "Your feedback helps us provide better care. Please share your experience with Popular Hospital.",
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
