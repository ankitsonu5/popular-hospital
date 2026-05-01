"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CareerAdminHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/careers/admin-login");
  }, [router]);
  return null;
}
