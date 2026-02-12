import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchBranches } from '@/lib/api';
import type { Branch } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Branches',
  description: 'Find Popular Hospital branches. Addresses, phone numbers, and facilities at each location.',
};

export default async function BranchesPage() {
  const branches = await fetchBranches().catch(() => [] as Branch[]);
  const byCity = branches.reduce<Record<string, Branch[]>>((acc, b) => {
    const city = b.city || 'Other';
    if (!acc[city]) acc[city] = [];
    acc[city].push(b);
    return acc;
  }, {});

  return (
    <div className="container-narrow py-10">
      <h1 className="section-heading">Our Branches</h1>
      <p className="mt-2 text-gray-600">
        Visit any of our branches for OPD, diagnostics, and specialist care. Select a branch for details and directions.
      </p>
      <div className="mt-10 space-y-10">
        {Object.entries(byCity).sort(([a], [b]) => a.localeCompare(b)).map(([city, list]) => (
          <section key={city} aria-labelledby={`branch-${city}`}>
            <h2 id={`branch-${city}`} className="mb-4 text-xl font-semibold text-hospital-navy">
              {city}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((branch) => (
                <Link
                  key={branch.id}
                  href={`/branches/${branch.slug}`}
                  className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-hospital-teal hover:shadow-md"
                >
                  <h3 className="font-semibold text-hospital-navy">{branch.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{branch.address}</p>
                  {branch.phone && (
                    <p className="mt-2 text-sm font-medium text-hospital-teal">{branch.phone}</p>
                  )}
                  <span className="mt-3 inline-block text-sm font-medium text-hospital-teal">View details →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
