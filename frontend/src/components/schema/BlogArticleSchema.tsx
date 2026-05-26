// ─────────────────────────────────────────────
// BlogArticleSchema.tsx
// Best-approach BlogPosting schema for /blog/[slug]
// - Uses BlogPosting (Google's recommended type)
// - Combined @graph: BlogPosting + BreadcrumbList + WebPage
// - Future-proof: supports keywords, wordCount, dateModified, imageAlt, canonicalUrl
// ─────────────────────────────────────────────

interface BlogArticleSchemaProps {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string; // ISO date or "YYYY-MM-DD"
  author?: string;
  category?: string;
  readingTime?: number;
  dateModified?: string;
  keywords?: string | string[];
  wordCount?: number;
  imageAlt?: string;
  canonicalUrl?: string;
}

const SITE_URL = "https://www.popularhospital.in";

const PUBLISHER = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Popular Hospital",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: 600,
    height: 60,
    caption: "Popular Hospital Logo",
  },
};

// Normalize image URL to absolute https URL
const absoluteImage = (img: string): string => {
  if (!img) return `${SITE_URL}/logo.png`;
  if (img.startsWith("http")) return img;
  return `${SITE_URL}${img.startsWith("/") ? img : `/${img}`}`;
};

// Convert date string to ISO 8601 format (YYYY-MM-DD if possible)
const normalizeDate = (d: string): string => {
  if (!d) return new Date().toISOString().split("T")[0];
  // already ISO
  if (/^\d{4}-\d{2}-\d{2}/.test(d)) return d;
  try {
    return new Date(d).toISOString();
  } catch {
    return d;
  }
};

// Normalize keywords (string or array → array of strings)
const normalizeKeywords = (k?: string | string[]): string[] | undefined => {
  if (!k) return undefined;
  if (Array.isArray(k)) return k.map((s) => s.trim()).filter(Boolean);
  return k.split(",").map((s) => s.trim()).filter(Boolean);
};

// Strip HTML tags and decode common entities for clean plain text description
const stripHtml = (html: string): string => {
  if (!html) return "";
  let text = html.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return text.replace(/\s+/g, " ").trim();
};

export default function BlogArticleSchema({
  title,
  slug,
  excerpt,
  image,
  date,
  author,
  category,
  readingTime,
  dateModified,
  keywords,
  wordCount,
  imageAlt,
  canonicalUrl,
}: BlogArticleSchemaProps) {
  const articleUrl = canonicalUrl || `${SITE_URL}/blog/${slug}`;
  const imgUrl = absoluteImage(image);
  const published = normalizeDate(date);
  const modified = normalizeDate(dateModified || date);
  const kws = normalizeKeywords(keywords);
  const cleanExcerpt = stripHtml(excerpt);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        isPartOf: { "@id": `${articleUrl}#webpage` },
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
        headline: title,
        name: title,
        description: cleanExcerpt,
        url: articleUrl,
        datePublished: published,
        dateModified: modified,
        inLanguage: "en-IN",
        image: {
          "@type": "ImageObject",
          url: imgUrl,
          contentUrl: imgUrl,
          caption: imageAlt || title,
        },
        author: {
          "@type": "Person",
          name: author || "Popular Hospital Admin",
          url: `${SITE_URL}/`,
        },
        publisher: PUBLISHER,
        ...(category && { articleSection: category }),
        ...(kws && kws.length > 0 && { keywords: kws.join(", ") }),
        ...(readingTime && { timeRequired: `PT${readingTime}M` }),
        ...(wordCount && { wordCount }),
        about: {
          "@type": "Hospital",
          "@id": `${SITE_URL}/#hospital`,
          name: "Popular Hospital",
        },
        isPartOfBlog: {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "Popular Hospital Blog",
          url: `${SITE_URL}/blog`,
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: title,
        description: cleanExcerpt,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imgUrl,
        },
        datePublished: published,
        dateModified: modified,
        inLanguage: "en-IN",
        breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
        potentialAction: {
          "@type": "ReadAction",
          target: [articleUrl],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          ...(category
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category,
                  item: `${SITE_URL}/blog?category=${encodeURIComponent(category)}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: title,
                  item: articleUrl,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: title,
                  item: articleUrl,
                },
              ]),
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
