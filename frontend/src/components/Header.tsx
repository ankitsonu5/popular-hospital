'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/doctors', label: 'Find Doctors' },
  { href: '/book', label: 'Book Appointment' },
  { href: '/opd', label: 'OPD' },
  { href: '/branches', label: 'Our Branches' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-hospital-navy">
          <span className="text-xl">Popular Hospital</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-hospital-teal ${
                pathname === link.href ? 'text-hospital-teal' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:18001234567" className="hidden text-sm font-medium text-gray-600 hover:text-hospital-teal sm:block">
            Call 1800-123-4567
          </a>
          <Link href="/book" className="btn-primary hidden sm:inline-flex">
            Book Appointment
          </Link>
          <button
            type="button"
            className="rounded p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-hospital-teal"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary mt-2 inline-flex" onClick={() => setMenuOpen(false)}>
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
