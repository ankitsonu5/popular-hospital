import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBranch } from '@/lib/api';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branch = await fetchBranch(slug);
  if (!branch) return { title: 'Branch Not Found' };
  return {
    title: `${branch.name} - Address, Phone, OPD`,
    description: branch.description || `${branch.name}, ${branch.address}, ${branch.city}. Contact: ${branch.phone}.`,
  };
}

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const branch = await fetchBranch(slug);
  if (!branch) notFound();

  const facilities = branch.facilities ? branch.facilities.split(',').map((f) => f.trim()).filter(Boolean) : [];

  return (
    <div className="container-narrow py-10">
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link href="/branches" className="hover:text-hospital-teal">Branches</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{branch.name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-hospital-navy">{branch.name}</h1>
      {branch.description && <p className="mt-4 text-gray-600">{branch.description}</p>}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-hospital-navy">Address & Contact</h2>
          <address className="mt-4 not-italic text-gray-600">
            <p>{branch.address}</p>
            <p>{branch.city}{branch.state ? `, ${branch.state}` : ''} {branch.pincode || ''}</p>
            {branch.phone && (
              <p className="mt-2">
                <a href={`tel:${branch.phone}`} className="text-hospital-teal hover:underline">{branch.phone}</a>
              </p>
            )}
            {branch.email && (
              <p>
                <a href={`mailto:${branch.email}`} className="text-hospital-teal hover:underline">{branch.email}</a>
              </p>
            )}
          </address>
        </div>
        {facilities.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-hospital-navy">Facilities</h2>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              {facilities.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/book?branch=${branch.id}`} className="btn-primary">
          Book Appointment at this Branch
        </Link>
        <Link href="/branches" className="btn-secondary">
          All Branches
        </Link>
      </div>
    </div>
  );
}
