// ─────────────────────────────────────────────
// DynamicSchema.tsx
//
// Server-side fetch of an admin-managed JSON-LD override for a given pageKey.
// If admin has saved a schema for this key in the DB (and isActive=true),
// it renders that JSON. Otherwise it renders the `fallback` schema component.
//
// Use on any page that already has a static schema, e.g.:
//   <DynamicSchema pageKey="home" fallback={<HospitalSchema />} />
//
// pageKey conventions:
//   - "home"
//   - "doctors"
//   - "doctor:{slug}"
//   - "blog:{slug}"
//   - "department:{slug}"
// ─────────────────────────────────────────────

interface DynamicSchemaProps {
  pageKey: string;
  fallback?: React.ReactNode;
}

const PUBLIC_API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  process.env.BACKEND_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5100";

async function fetchOverride(pageKey: string): Promise<unknown | null> {
  try {
    const url = `${PUBLIC_API}/api/schemas/${encodeURIComponent(pageKey)}`;
    const res = await fetch(url, {
      // Revalidate frequently so admin edits go live fast,
      // but don't slow down every request
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

export default async function DynamicSchema({
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
