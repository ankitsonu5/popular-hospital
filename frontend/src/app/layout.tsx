import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { apiBaseUrl } from "@/lib/api";
import LayoutShell from "@/components/LayoutShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1c43",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.popularhospital.in"),
  title: {
    default: "Popular Hospital Varanasi | Top Multi Super Speciality Hospital",
    template: "%s | Popular Hospital Varanasi",
  },
  description:
    "Varanasi's best multi super speciality hospital — 450+ beds, 28 departments, 24/7 emergency & cashless treatment. Book appointment today.",

  authors: [{ name: "Popular Hospital" }],
  creator: "Popular Hospital",
  openGraph: {
    title:
      "Best Multi Super Speciality Hospital in Varanasi | Popular Hospital",
    description:
      "Varanasi's best multi super speciality hospital — 450+ beds, 28 departments, 24/7 emergency & cashless treatment. Book appointment today.",
    type: "website",
    locale: "en_IN",
    siteName: "Popular Hospital Varanasi",
    url: "https://www.popularhospital.in",
    images: [
      {
        url: "https://www.popularhospital.in/logo.png",
        width: 512,
        height: 512,
        alt: "Popular Hospital Varanasi Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Popular Hospital Varanasi | Top Multi Super Speciality Hospital",
    description:
      "Varanasi's best multi super speciality hospital — 450+ beds, 28 departments, 24/7 emergency & cashless treatment. Book appointment today.",
  },
  robots: { index: true, follow: true },
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-242FEVKDES"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-242FEVKDES');
            `,
          }}
        />
        {/* Bypass the Next.js/React dev timing/performance measure overlay crash bug */}
        <Script
          id="performance-bypass"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined' && window.performance && window.performance.measure) {
                  const originalMeasure = window.performance.measure;
                  window.performance.measure = function() {
                    try {
                      return originalMeasure.apply(window.performance, arguments);
                    } catch (e) {
                      console.warn("[Performance Bypass] Ignored error:", e.message);
                    }
                  };
                }
              })();
            `,
          }}
        />
        {/* LocalBusiness Schema for NAP (Name, Address, Phone, Email) */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hospital",
              name: "Popular Hospital",
              url: "https://www.popularhospital.in",
              logo: "https://www.popularhospital.in/logo.png",
              image: "https://www.popularhospital.in/logo.png",
              description:
                "Varanasi's best multi super speciality hospital — 450+ beds, 28 departments, 24/7 emergency & cashless treatment.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "N2/115-116, BLW-B.H.U. Road, Kakarmata",
                addressLocality: "Varanasi",
                addressRegion: "Uttar Pradesh",
                postalCode: "221005",
                addressCountry: "IN",
              },
              telephone: "+91-7703000088",
              email: "info@popularhospitals.in",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7703000088",
                contactType: "Emergency",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
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
