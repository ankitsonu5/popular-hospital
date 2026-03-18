import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Face: Dr. A.K. Kaushik – A Healthcare ICON | Popular Hospital",
  description: "Profile Summary, Awards and Strategic Value of Dr. A.K. Kaushik.",
};

export default function AwardsRecognitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
