import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container-narrow flex h-14 items-center justify-between">
          <Link href="/admin" className="font-semibold text-hospital-navy">Popular Hospital CMS</Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/admin/branches" className="text-gray-600 hover:text-hospital-teal">Branches</Link>
            <Link href="/admin/doctors" className="text-gray-600 hover:text-hospital-teal">Doctors</Link>
            <Link href="/admin/bookings" className="text-gray-600 hover:text-hospital-teal">Bookings</Link>
            <Link href="/admin/content" className="text-gray-600 hover:text-hospital-teal">Content</Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700">View site →</Link>
          </nav>
        </div>
      </header>
      <div className="container-narrow py-8">{children}</div>
    </div>
  );
}
