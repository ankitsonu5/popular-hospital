import React from "react";
import { Metadata } from "next";
import EmergencyTraumaClient from "./EmergencyClient";

export const metadata: Metadata = {
  title: "Emergency & Trauma Care | Popular Hospital",
  description:
    "24/7 Emergency and Trauma Care at Popular Hospital. Comprehensive emergency medical services with state-of-the-art infrastructure and highly trained professionals.",
};

export default function EmergencyTraumaPage() {
  return <EmergencyTraumaClient />;
}
