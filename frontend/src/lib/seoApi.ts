/**
 * Utility to fetch global SEO data from the backend.
 * Note: Since this is used in Next.js Server Components, we must use the absolute backend URL.
 */

import { Metadata } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5100/api";

export type SeoMetadataResponse = {
  success: boolean;
  data?: {
    page_route: string;
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
    og_image: string;
    canonical_url: string;
    robots_meta: string;
  };
};

export async function fetchSeoMetadata(route: string): Promise<SeoMetadataResponse["data"] | null> {
  try {
    const encodedRoute = encodeURIComponent(route);
    const res = await fetch(`${API_BASE_URL}/seo/by-route?route=${encodedRoute}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!res.ok) {
      return null;
    }
    
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error(`Error fetching SEO data for route ${route}:`, error);
    return null;
  }
}

export async function generatePageMetadata(route: string, defaultMeta: Metadata): Promise<Metadata> {
  const customSeo = await fetchSeoMetadata(route);
  
  if (!customSeo) return defaultMeta;

  return {
    title: customSeo.meta_title || defaultMeta.title,
    description: customSeo.meta_description || defaultMeta.description,
    robots: customSeo.robots_meta || "index, follow",
    openGraph: {
      title: customSeo.og_title || customSeo.meta_title || (defaultMeta.title as string),
      description: customSeo.og_description || customSeo.meta_description || (defaultMeta.description as string),
      url: customSeo.canonical_url || `https://www.popularhospital.in${route}`,
      siteName: "Popular Hospital",
      type: "website",
      ...(customSeo.og_image && {
        images: [{ url: customSeo.og_image, width: 800, height: 600 }],
      }),
    },
    alternates: {
      canonical: customSeo.canonical_url || `https://www.popularhospital.in${route}`,
    },
  };
}
