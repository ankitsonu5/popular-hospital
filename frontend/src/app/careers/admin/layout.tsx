"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CareerAdminLayoutRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const storedUser = sessionStorage.getItem("admin_user");
    if (token && storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.role === "career_admin" || parsed.role === "super_admin" || parsed.role === "admin") {
        router.replace("/admin-dashboard/careers");
        return;
      }
    }
    router.replace("/admin-login");
  }, [router]);
  return null;
}
