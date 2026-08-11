"use client";

import { usePathname } from "next/navigation";

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  // Split pathname into segments
  const paths = pathname.split("/").filter((path) => path);

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.popularhospital.in",
    },
  ];

  let currentUrl = "https://www.popularhospital.in";

  paths.forEach((path, index) => {
    currentUrl += `/${path}`;
    // Format the name: capitalize first letter, replace hyphens with spaces
    const name = path
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: name,
      item: currentUrl,
    });
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
