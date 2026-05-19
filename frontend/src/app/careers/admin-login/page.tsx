"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CareerAdminLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin-login");
  }, [router]);
  return null;
}
