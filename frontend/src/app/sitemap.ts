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
    { url: `${BASE}/online-payment`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/sitemap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    
    // About Pages
    { url: `${BASE}/about/our-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/chairman-desk`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/md-desk`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/leadership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/vision-mission`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    
    // Major Specialties
    { url: `${BASE}/departments/cardiology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/departments/neurosurgery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/departments/oncology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/departments/orthopedics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    
    // Services
    { url: `${BASE}/services/wellness`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/womens-health-special`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/preventive-health`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/emergency`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const branchPages: MetadataRoute.Sitemap = branches.map((b: any) => ({
    url: `${BASE}/branches/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const doctorPages: MetadataRoute.Sitemap = doctors.map((d: any) => ({
    url: `${BASE}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...branchPages, ...doctorPages];
}
