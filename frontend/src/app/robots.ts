import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.popularhospital.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin-dashboard",
          "/admin-login",
          "/reset-admin-password",
          "/patient-reports",
          "/online-payment"
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
