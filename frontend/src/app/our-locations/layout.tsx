import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata: Metadata = {
  title: "Our Locations",
  description: "Find the nearest Popular Hospital locations.",
  alternates: {
    canonical: "https://www.popularhospital.in/our-locations",
  },
};

export default function OurLocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/our-locations", defaultMetadata);
}
