import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  fetchBlogs,
  fetchBlogItem,
  fetchBlogCategoriesMetrics,
  getImageUrl,
} from "@/lib/api";
import BlogSidebar, { BlogSearchWidget } from "@/app/blog/BlogSidebar";
import BlogComments from "./BlogComments";
import { allCategories } from "../data";
import BlogArticleSchema from "@/components/schema/BlogArticleSchema";

/* ───────────────── static params ───────────────── */
export async function generateStaticParams() {
  const blogsList = await fetchBlogs().catch(() => []);
  return blogsList.map((a) => ({ slug: a.slug }));
}

/* ───────────────── metadata ───────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = await fetchBlogItem(slug);

  if (!article) return { title: "Article Not Found" };
  const title = article.metaTitle || `${article.title} – Popular Hospital Blog`;
  const description =
    article.metaDescription || article.excerpt || article.title;

  return {
    title,
    description,
    keywords: article.metaKeywords || "",
    alternates: {
      canonical:
        article.canonicalUrl || `https://popularhospital.in/blog/${slug}`,
    },
    openGraph: {
      title: article.ogTitle || title,
      description: article.ogDescription || description,
      images: [getImageUrl(article.image, true)],
    },
  };
}

/* ───────────────── page component ───────────────── */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await fetchBlogItem(slug);

  if (!article) notFound();

  const [dbPosts, categoriesMetrics] = await Promise.all([
    fetchBlogs().catch(() => []),
    fetchBlogCategoriesMetrics().catch(() => []),
  ]);

  return (
    <>
    <BlogArticleSchema
      title={article.title}
      slug={slug}
      excerpt={article.excerpt || article.metaDescription || article.title}
      image={getImageUrl(article.image, true)}
      date={article.date}
      author={article.author}
      category={article.category}
      readingTime={article.readingTime}
      dateModified={article.updatedAt || article.dateModified}
      keywords={article.metaKeywords}
      imageAlt={article.imageAlt}
      canonicalUrl={article.canonicalUrl}
      wordCount={
        article.content
          ? (Array.isArray(article.content)
              ? article.content.join(" ")
              : article.content
            )
              .replace(/<[^>]+>/g, " ")
              .split(/\s+/)
              .filter(Boolean).length
          : undefined
      }
    />
    <main className="min-h-screen bg-[#f9fafb] py-12">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Mobile Search Widget - Only shown on mobile at the top */}
        <div className="lg:hidden w-full">
          <BlogSearchWidget />
        </div>

        {/* Left Side (Main Content) */}
        <section className="w-full lg:w-[70%]">
          {/* Main Article Container */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Main Hero Image */}
            <div className="relative w-full aspect-[3/2] mb-0 sm:mb-8 sm:rounded-t-xl overflow-hidden">
              <Image
                src={getImageUrl(article.image) || "/about-section-image.png"}
                alt={article.imageAlt || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Wrapper (Padding for text while image is full-width on mobile) */}
            <div className="p-6 sm:px-10 sm:pb-10">
              {/* Category & Title & Meta */}
              <div className="text-left mb-8">
                {article.category && (
                  <span className="inline-block bg-[#00B4D8]/10 text-[#00B4D8] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    {article.category}
                  </span>
                )}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1e3a8a] leading-[1.2] mb-6">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-400 text-sm font-medium flex-wrap">
                  <span className="flex items-center gap-1.5 grayscale opacity-70">
                    <svg
                      className="w-4 h-4 text-[#e85222]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5 grayscale opacity-70">
                    <svg
                      className="w-4 h-4 text-[#e85222]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {article.author || "Popular Hospital Admin"}
                  </span>
                  {article.readingTime && (
                    <span className="flex items-center gap-1.5 grayscale opacity-70">
                      <svg
                        className="w-4 h-4 text-[#e85222]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {article.readingTime} min read
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="mt-8 border-t border-gray-50 pt-8">
                <div
                  className="prose prose-teal prose-lg max-w-none text-gray-700 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{
                    __html: Array.isArray(article.content)
                      ? article.content.join("")
                      : article.content || "",
                  }}
                />
              </div>
            </div>
          </article>

          {/* Leave a Reply Section */}
          <BlogComments
            blogId={article._id || ""}
            initialComments={article.comments || []}
          />
        </section>

        {/* Right Sidebar */}
        <BlogSidebar
          allArticles={dbPosts}
          allCategories={allCategories}
          metrics={categoriesMetrics}
          showRecentPosts={true}
        />
      </div>
    </main>
    </>
  );
}
