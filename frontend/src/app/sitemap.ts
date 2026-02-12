import { MetadataRoute } from 'next';
import { fetchBranches, fetchDoctors } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://popularhospital.com';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [branches, doctors] = await Promise.all([
    fetchBranches().catch(() => []),
    fetchDoctors().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/doctors`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/opd`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/branches`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const branchPages: MetadataRoute.Sitemap = branches.map((b) => ({
    url: `${BASE}/branches/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const doctorPages: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${BASE}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...branchPages, ...doctorPages];
}
