import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Popular Hospital",
  description: "Admin login for Popular Hospital management system.",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
