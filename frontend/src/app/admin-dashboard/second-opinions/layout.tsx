import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Second Opinion Requests",
};

export default function SecondOpinionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

