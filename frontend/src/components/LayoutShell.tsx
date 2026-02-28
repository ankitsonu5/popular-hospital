'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import SocialSidebar from '@/components/SocialSidebar';
import LoadingScreen from '@/components/LoadingScreen';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin-login') || pathname.startsWith('/admin-dashboard');

  if (isAdminRoute) {
    return (
      <main className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-hospital-teal focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>
      <LoadingScreen />
      <Header />
      <SocialSidebar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
