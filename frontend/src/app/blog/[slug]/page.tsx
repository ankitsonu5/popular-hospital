import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogs, fetchBlogItem, fetchBlogCategoriesMetrics, getImageUrl } from "@/lib/api";
import BlogSidebar, { BlogSearchWidget } from "@/app/blog/BlogSidebar";
import BlogComments from "./BlogComments";
import { allCategories } from "../data";

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
  return {
    title: `${article.title} – Popular Hospital Blog`,
    description: article.excerpt || article.title,
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
    fetchBlogCategoriesMetrics().catch(() => [])
  ]);

  return (
    <main className="min-h-screen bg-[#f9fafb] py-12">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Mobile Search Widget - Only shown on mobile at the top */}
        <div className="lg:hidden w-full">
          <BlogSearchWidget />
        </div>

        {/* Left Side (Main Content) */}
        <section className="w-full lg:w-[70%]">
          {/* Main Article Container */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden p-6 sm:p-10 border border-gray-100">
            
            {/* Main Hero Image */}
            <div className="relative w-full h-[300px] sm:h-[450px] mb-8 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getImageUrl(article.image) || "/about-section-image.png"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title & Meta */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1e3a8a] leading-[1.2] mb-4">
                {article.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base font-medium">
                Posted on {article.date} by <span className="text-[#f5a623]">{article.author || 'popularhospital admin'}</span>
              </p>
            </div>

            {/* Content Body */}
            <div className="text-gray-800 text-base sm:text-lg leading-[1.8] text-justify space-y-6">
              {(() => {
                const elements: JSX.Element[] = [];
                let currentList: string[] = [];
                let isListMode = false;

                (article.content || []).forEach((paragraph: string, index: number, arr: string[]) => {
                  const prev = index > 0 ? arr[index - 1] : '';
                  
                  const isNumberedHeading = /^\d+\.\s/.test(paragraph);
                  const isListItemCondition = !isNumberedHeading && paragraph.length < 150 && !paragraph.endsWith('.') && !paragraph.endsWith('?') && !paragraph.endsWith(':');
                  const isListItem = isListItemCondition && (prev.endsWith(':') || isListMode);

                  if (isListItem) {
                    isListMode = true;
                    currentList.push(paragraph);
                  } else {
                    if (currentList.length > 0) {
                      elements.push(
                        <ul key={`list-${index}`} className="list-disc pl-6 sm:pl-8 space-y-2 mb-6">
                          {currentList.map((item, i) => (
                            <li key={i} className="text-base text-gray-700">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                      currentList = [];
                    }
                    isListMode = false;

                    const isHeading = isNumberedHeading || (paragraph.length < 100 && !paragraph.endsWith('.') && !paragraph.endsWith('?') && !paragraph.endsWith(':') && !paragraph.includes(','));
                    
                    if (isHeading) {
                      elements.push(
                        <h3 key={index} className="text-xl sm:text-2xl font-serif font-bold text-[#1e3a8a] mt-8 mb-4">
                          {paragraph}
                        </h3>
                      );
                    } else {
                      elements.push(
                        <p key={index} className="mb-6">
                          {paragraph}
                        </p>
                      );
                    }
                  }
                });

                if (currentList.length > 0) {
                  elements.push(
                    <ul key={`list-end`} className="list-disc pl-6 sm:pl-8 space-y-2 mb-6">
                      {currentList.map((item, i) => (
                        <li key={i} className="text-base text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return elements;
              })()}
            </div>
          </article>

          {/* Leave a Reply Section */}
          <BlogComments blogId={article._id || ''} initialComments={article.comments || []} />
          
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
  );
}
