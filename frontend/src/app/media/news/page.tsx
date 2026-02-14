import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Latest News & Updates – Popular Hospital",
  description:
    "Stay updated with the latest news, health articles, medical breakthroughs, and updates from Popular Hospital. Read expert health tips and hospital announcements.",
};

/* ───────────────── news data ───────────────── */
const newsArticles = [
  {
    slug: "best-medical-network-directory",
    title: "Best Medical Network Directory For Physicians & Clients",
    excerpt:
      "Tips for Maintaining a Healthy Heart Hypertension, commonly known as high blood pressure, is one of the most prevalent chronic conditions worldwide. It affects millions of people and is a leading risk factor for heart disease, stroke, and kidney disease.",
    image: "/images/latestnews/one.jpg",
    date: "February 10, 2026",
    category: "Healthcare",
  },
  {
    slug: "importance-of-regular-health-checkups",
    title: "The Importance of Regular Health Checkups",
    excerpt:
      "Tips for Maintaining a Healthy Heart Hypertension, commonly known as high blood pressure, is a silent killer that can go unnoticed for years. Regular health checkups help in early detection and prevention of serious conditions.",
    image: "/images/latestnews/two.jpg",
    date: "February 8, 2026",
    category: "Wellness",
  },
  {
    slug: "managing-stress-for-better-mental-health",
    title: "Managing Better Stress for Better Mental Health",
    excerpt:
      "Tips for Maintaining a Healthy Heart Hypertension, commonly known as high blood pressure, can be managed through stress reduction techniques. Mental health is equally important as physical health for overall wellbeing.",
    image: "/images/latestnews/three.jpg",
    date: "February 5, 2026",
    category: "Mental Health",
  },
  {
    slug: "advances-in-cardiac-surgery",
    title: "Advances in Cardiac Surgery at Popular Hospital",
    excerpt:
      "Popular Hospital continues to lead the way in cardiac surgery with the latest minimally invasive techniques, robotic-assisted procedures, and state-of-the-art catheterization labs that ensure faster recovery for patients.",
    image: "/about-section-image.png",
    date: "January 28, 2026",
    category: "Cardiology",
  },
  {
    slug: "understanding-diabetes-management",
    title: "Understanding Diabetes Management: A Complete Guide",
    excerpt:
      "Diabetes is a growing health concern in India. Learn about effective management strategies including diet control, exercise routines, medication adherence, and regular monitoring to keep your blood sugar levels in check.",
    image: "/about-section-image.png",
    date: "January 22, 2026",
    category: "Wellness",
  },
  {
    slug: "pediatric-care-excellence",
    title: "Excellence in Pediatric Care: Caring for Your Little Ones",
    excerpt:
      "Our pediatric department is committed to providing comprehensive healthcare for children from infancy through adolescence. Discover our specialized services including neonatal care, vaccinations, and child development programs.",
    image: "/about-section-image.png",
    date: "January 15, 2026",
    category: "Pediatrics",
  },
];

/* ───────────────── page component ───────────────── */
export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <nav className="mb-6 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Latest News & Updates</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Latest News{" "}
            <span className="text-[#00B4D8]">& Updates</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
            Stay informed with the latest health news, articles, expert tips,
            and announcements from Popular Hospital.
          </p>
        </div>
      </section>

      {/* ─── News Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1e3a8a]/90 text-white text-xs font-semibold backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-gray-400 font-medium">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1e3a8a] transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-[#E85222] font-semibold hover:text-[#d1451a] transition-colors text-sm group/link"
                >
                  <span>Read More</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
