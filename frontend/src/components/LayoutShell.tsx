"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import LoadingScreen from "@/components/LoadingScreen";
import BackToTop from "@/components/BackToTop";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileWhatsAppFAB from "@/components/MobileWhatsAppFAB";

const ZOOM_PATHS = [
  "/about",
  "/about/vision-mission",
  "/about/chairman-desk",
  "/about/md-desk",
  "/about/leadership",
  "/about/awards-recognition",
  "/about/csr",
  "/about/cashless-empanelment",
  "/doctors",
  "/departments/cardiology",
  "/departments/ctvs",
  "/departments/neurosurgery",
  "/departments/nephrology",
  "/departments/gastroenterology",
  "/departments/oncology",
  "/departments/burns-plastic-surgery",
  "/departments/interventional-radiology",
  "/departments/pediatric-surgery",
  "/departments/general-surgery",
  "/departments/gynaecology",
  "/departments/pediatrics",
  "/departments/orthopedics",
  "/departments/general-medicine",
  "/departments/ent",
  "/departments/dietetics-nutrition",
  "/departments/ophthalmology",
  "/departments/dental",
  "/departments/respiratory",
  "/departments/pain-management",
  "/departments/psychiatry",
];

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname.startsWith("/admin-login") ||
    pathname.startsWith("/admin-dashboard");

  const isBlogDetailRoute =
    pathname.startsWith("/blog/") && pathname.split("/").length === 3;

  if (isAdminRoute) {
    return (
      <main className="flex-1">
        {children}
        <BackToTop />
      </main>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-hospital-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      {!isBlogDetailRoute && <LoadingScreen />}
      <Header />
      <SocialSidebar />
      <main
        id="main-content"
        className={`flex-1 pb-[70px] md:pb-0 ${ZOOM_PATHS.includes(pathname) ? "is-zoom-page" : ""}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <MobileBottomNav />
      <MobileWhatsAppFAB />
      <BackToTop />
      <Footer />
    </>
  );
}
