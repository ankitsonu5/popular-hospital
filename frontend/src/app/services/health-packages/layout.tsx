import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Fit Card & Health Packages | Popular Hospital",
  description:
    "Apply for the Popular Hospital Health Fit Card to get priority services, free checkups, and massive discounts on healthcare.",
};

export default function HealthPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
