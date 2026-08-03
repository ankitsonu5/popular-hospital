import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Locations",
  description: "Find the nearest Popular Hospital locations.",
  alternates: {
    canonical: "https://popularhospital.in/our-locations",
  },
};

export default function OurLocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
