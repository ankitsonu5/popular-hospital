import { Suspense } from "react";

interface DynamicSchemaProps {
  pageKey: string;
  fallback?: React.ReactNode;
}

const getBackendBase = () => {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.BACKEND_API_URL ||
    "http://localhost:5100";
  return fromEnv.replace(/\/$/, "");
};

async function fetchOverride(pageKey: string): Promise<unknown | null> {
  try {
    const url = `${getBackendBase()}/api/schemas/${encodeURIComponent(pageKey)}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.jsonLd) return null;
    return data.jsonLd;
  } catch {
    return null;
  }
}

// Async inner component — resolves DB override
async function SchemaResolver({
  pageKey,
  fallback,
}: DynamicSchemaProps) {
  const override = await fetchOverride(pageKey);

  if (override) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(override) }}
      />
    );
  }

  return <>{fallback}</>;
}

// Sync outer wrapper with Suspense(fallback=null) — prevents double schema
// in the raw HTML that Next.js streaming produces for async server components.
export default function DynamicSchema({
  pageKey,
  fallback,
}: DynamicSchemaProps) {
  return (
    <Suspense fallback={null}>
      <SchemaResolver pageKey={pageKey} fallback={fallback} />
    </Suspense>
  );
}
