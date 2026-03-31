import { Metadata } from "next";
import OphthalmologyClient from "./OphthalmologyClient";

export const metadata: Metadata = {
  title: "Ophthalmology | Popular Hospital",
  description:
    "Advanced eye care center providing comprehensive diagnostic and surgical services including Cataract surgery, Glaucoma treatment, and specialized eye care for all age groups.",
};

export default function OphthalmologyPage() {
  return <OphthalmologyClient />;
}
