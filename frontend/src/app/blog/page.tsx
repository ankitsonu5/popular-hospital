import type { Metadata } from "next";
import { fetchBlogs, fetchBlogCategoriesMetrics } from "@/lib/api";
import BlogClientLayout from "./BlogClientLayout";


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/blog", {
  title: "Medical Blog & Health Updates | Popular Hospital",
  description:
    "Stay updated with the latest medical advancements, health tips, and hospital news from Popular Hospital Varanasi.",
  alternates: {
    canonical: "https://www.popularhospital.in/blog",
  },
});
}


export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [dbPosts, categoriesMetrics] = await Promise.all([
    fetchBlogs().catch(() => []),
    fetchBlogCategoriesMetrics().catch(() => []),
  ]);

  return <BlogClientLayout articles={dbPosts} metrics={categoriesMetrics} />;
}
