import type { Metadata } from "next";
import { fetchBlogs, fetchBlogCategoriesMetrics } from "@/lib/api";
import BlogClientLayout from "./BlogClientLayout";

export const metadata: Metadata = {
  title: 'Medical Blog & Health Updates | Popular Hospital',
  description: 'Stay updated with the latest medical advancements, health tips, and hospital news from Popular Hospital Varanasi.',
};

export default async function BlogPage() {
  const [dbPosts, categoriesMetrics] = await Promise.all([
    fetchBlogs().catch(() => []),
    fetchBlogCategoriesMetrics().catch(() => [])
  ]);
  
  return (
    <BlogClientLayout articles={dbPosts} metrics={categoriesMetrics} />
  );
}
