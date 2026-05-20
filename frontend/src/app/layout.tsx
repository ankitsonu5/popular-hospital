import type { Metadata, Viewport } from "next";
import "./globals.css";
import { apiBaseUrl } from "@/lib/api";
import LayoutShell from "@/components/LayoutShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1c43",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://popularhospital.in"),
  title: {
    default:
      "Popular Hospital | Best Multispeciality Hospital - Book Doctor & OPD",
    template: "%s | Popular Hospital",
  },
  description:
    "Popular Hospital offers quality healthcare, doctor appointments, OPD services, and multiple branches across Varanasi. Book online, find doctors by speciality, and get the best care.",
  keywords: [
    "hospital",
    "doctor appointment",
    "OPD",
    "healthcare",
    "Popular Hospital",
    "multispeciality",
    "Varanasi",
    "best hospital",
  ],
  authors: [{ name: "Popular Hospital" }],
  creator: "Popular Hospital",
  openGraph: {
    title: "Popular Hospital | Best Multispeciality Hospital",
    description:
      "Quality healthcare with compassion. Book appointments, find doctors, and visit our branches.",
    type: "website",
    locale: "en_IN",
    siteName: "Popular Hospital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Popular Hospital | Best Multispeciality Hospital",
    description:
      "Quality healthcare with compassion. Book appointments, find doctors, and visit our branches.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://popularhospital.com" },
  icons: {
    icon: "/images/favicon/favppl.png",
    apple: "/images/favicon/favppl.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* DNS Prefetch for API and uploads */}
        {apiBaseUrl && <link rel="dns-prefetch" href={apiBaseUrl} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Rozha+One&family=Martel:wght@700;800;900&family=Teko:wght@600;700&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
