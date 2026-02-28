import type { Metadata } from 'next';
import { Montserrat, Lato } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

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
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
