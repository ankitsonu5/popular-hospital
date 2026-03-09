import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: {
    default: 'Popular Hospital | Best Multispeciality Hospital - Book Doctor & OPD',
    template: '%s | Popular Hospital',
  },
  description:
    'Popular Hospital offers quality healthcare, doctor appointments, OPD services, and multiple branches. Book online, find doctors by speciality, and get the best care.',
  keywords: ['hospital', 'doctor appointment', 'OPD', 'healthcare', 'Popular Hospital', 'multispeciality'],
  openGraph: {
    title: 'Popular Hospital | Best Multispeciality Hospital',
    description: 'Quality healthcare with compassion. Book appointments, find doctors, and visit our branches.',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://popularhospital.com' },
  icons: {
    icon: '/images/favicon/favppl.png',
    apple: '/images/favicon/favppl.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Official Google Translate Configuration */}
        <Script id="google-translate-config" strategy="beforeInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi',
                autoDisplay: false,
                multilanguagePage: true
              }, 'google_translate_element');
            }
          `}
        </Script>
        
        {/* Official Google Translate Element Script */}
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
          id="google-translate-script"
        />

        {/* Hidden Container for Google Translate Element */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
