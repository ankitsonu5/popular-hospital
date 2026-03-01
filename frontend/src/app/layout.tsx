import type { Metadata } from 'next';
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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
