interface BlogArticleSchemaProps {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  dateModified?: string;
}

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
}: BlogArticleSchemaProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: image.startsWith("http")
      ? image
      : `https://www.popularhospital.in${image.startsWith("/") ? image : `/${image}`}`,
    url: `https://www.popularhospital.in/blog/${slug}`,
    datePublished: date,
    dateModified: dateModified || date,
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
    author: {
      "@type": "Person",
      name: author || "Popular Hospital Admin",
    },
    publisher: {
      "@type": "Organization",
      name: "Popular Hospital",
      url: "https://www.popularhospital.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.popularhospital.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.popularhospital.in/blog/${slug}`,
    },
    ...(category && {
      articleSection: category,
    }),
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "Blog",
      name: "Popular Hospital Blog",
      url: "https://www.popularhospital.in/blog",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.popularhospital.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.popularhospital.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://www.popularhospital.in/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
