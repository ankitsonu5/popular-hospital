'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CMS_KEY = 'popular-hospital-cms-dev';

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [stored, setStored] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStored(sessionStorage.getItem('cms_key'));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key !== CMS_KEY) {
      setError('Invalid key');
      return;
    }
    sessionStorage.setItem('cms_key', key);
    setStored(key);
    setError('');
    router.push('/admin/branches');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cms_key');
    setStored(null);
    setKey('');
  };

  if (stored) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-hospital-navy">CMS Dashboard</h1>
        <p className="mt-2 text-gray-600">You are logged in. Manage website content below.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/branches" className="rounded-lg border border-gray-200 p-4 hover:border-hospital-teal hover:bg-gray-50">
            <span className="font-medium">Branches</span>
            <p className="text-sm text-gray-500">Add and edit hospital branches</p>
          </Link>
          <Link href="/admin/doctors" className="rounded-lg border border-gray-200 p-4 hover:border-hospital-teal hover:bg-gray-50">
            <span className="font-medium">Doctors</span>
            <p className="text-sm text-gray-500">Manage doctor profiles</p>
          </Link>
          <Link href="/admin/bookings" className="rounded-lg border border-gray-200 p-4 hover:border-hospital-teal hover:bg-gray-50">
            <span className="font-medium">Bookings</span>
            <p className="text-sm text-gray-500">View appointment bookings</p>
          </Link>
          <Link href="/admin/content" className="rounded-lg border border-gray-200 p-4 hover:border-hospital-teal hover:bg-gray-50">
            <span className="font-medium">Content</span>
            <p className="text-sm text-gray-500">Homepage and site content</p>
          </Link>
        </div>
        <button type="button" onClick={handleLogout} className="mt-8 text-sm text-gray-500 hover:text-red-600">
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-hospital-navy">CMS Login</h1>
      <p className="mt-2 text-sm text-gray-600">Enter your CMS key to manage the website. (Dev key: popular-hospital-cms-dev)</p>
      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="cms-key" className="mb-1 block text-sm font-medium text-gray-700">CMS Key</label>
        <input
          id="cms-key"
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(''); }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          placeholder="Enter key"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary mt-4 w-full">Log in</button>
      </form>
    </div>
  );
}
