'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  separator?: boolean;
}

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'About Popular',
    dropdown: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Our Vision & Mission', href: '/about/vision-mission' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Awards & Recognition', href: '/about/awards' },
      { label: 'Corporate Social Responsibility (CSR)', href: '/about/csr', separator: true },
    ],
  },
  {
    label: 'Find a Hospital',
    dropdown: [
      { label: 'Our Locations', href: '/branches' },
      { label: 'Explore Our Facilities', href: '/facilities' },
      { label: 'Specialized Care Locations', href: '/specialized-care' },
    ],
  },
  {
    label: 'Specialties & Departments',
    dropdown: [
      { label: 'Super Specialties', href: '/specialties/super' },
      { label: 'Core Specialties', href: '/specialties/core' },
      { label: 'Our Expertise', href: '/specialties/expertise' },
    ],
  },
  {
    label: 'Services We Offer',
    dropdown: [
      { label: 'Comprehensive Healthcare Services', href: '/services/healthcare' },
      { label: 'Medical Support Services', href: '/services/support' },
      { label: 'Home Care & Rehabilitation', href: '/services/home-care' },
      { label: 'Wellness Services', href: '/services/wellness' },
    ],
  },
  {
    label: 'Media Center',
    dropdown: [
      { label: 'Latest News & Updates', href: '/media/news' },
      { label: 'Upcoming Events', href: '/media/events' },
      { label: 'Media Coverage', href: '/media/coverage' },
    ],
  },

];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const ref = dropdownRefs.current[activeDropdown];
        if (ref && !ref.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const getIcon = (label: string) => {
    const iconClass = 'w-5 h-5 text-gray-600 flex-shrink-0';
    if (label.includes('Story') || label.includes('Vision')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    }
    if (label.includes('Location') || label.includes('Facilities')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    if (label.includes('Specialty') || label.includes('Expertise')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    if (label.includes('Service') || label.includes('Wellness')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    }
    if (label.includes('News') || label.includes('Event') || label.includes('Media')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      );
    }
    if (label.includes('Appointment') || label.includes('Book')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (label.includes('Financial') || label.includes('Payment')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm lg:shadow-none ${
        scrolled ? 'lg:bg-white lg:shadow-sm' : 'lg:bg-transparent'
      }`}
    >
      {/* Desktop Gradient Overlay - Show from lg */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 hidden lg:block ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)' }}
      />
      
      <div className="relative mx-auto w-full max-w-[1920px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <Image
              src="/logo-horizontal.png"
              alt="Popular Hospital"
              width={200}
              height={60}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation - Show from 1025px */}
          <nav className="hidden min-[1025px]:flex min-[1025px]:items-center min-[1025px]:justify-center min-[1025px]:flex-1 min-[1025px]:gap-0.5" aria-label="Main navigation">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2 lg:px-2 xl:px-3 2xl:px-5 py-2.5 text-xs lg:text-sm xl:text-[13px] min-[1366px]:text-[14px] 2xl:text-base font-medium transition-colors font-heading whitespace-nowrap ${
                        scrolled
                          ? (activeDropdown === item.label ? 'text-hospital-teal' : 'text-gray-700 hover:text-hospital-teal')
                          : 'text-white hover:text-gray-200'
                      }`}
                    >
                      {item.label}
                      <svg className={`h-3 w-3 xl:h-3.5 xl:w-3.5 flex-shrink-0 ${!scrolled ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div
                        ref={(el) => { dropdownRefs.current[item.label] = el; }}
                        className="absolute left-0 top-full pt-2 z-50"
                      >
                        <div className="w-72 rounded-xl bg-white py-2.5 shadow-xl border border-gray-100">
                        {item.dropdown.map((dropdownItem, index) => (
                          <div key={dropdownItem.label}>
                            {dropdownItem.separator && index > 0 && (
                              <div className="my-1.5 mx-4 border-t border-gray-100" />
                            )}
                            <Link
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-hospital-teal group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-hospital-teal opacity-60 group-hover:opacity-100 transition-opacity">
                                {getIcon(dropdownItem.label)}
                              </span>
                              <span className="flex-1">{dropdownItem.label}</span>
                            </Link>
                            {dropdownItem.separator && index < item.dropdown!.length - 1 && (
                              <div className="my-1.5 mx-4 border-t border-gray-100" />
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`px-2 lg:px-2 xl:px-3 2xl:px-5 py-2.5 text-xs lg:text-sm xl:text-[13px] min-[1366px]:text-[14px] 2xl:text-base font-medium transition-colors font-heading whitespace-nowrap ${
                      scrolled
                        ? (pathname === item.href ? 'text-hospital-teal' : 'text-gray-700 hover:text-hospital-teal')
                        : 'text-white hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            {/* Call Back Button - Desktop */}
            <Link
              href="/book"
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-white rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md font-heading"
              style={{ backgroundColor: '#E85222' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d1451a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E85222';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden xl:inline">Request Call Back</span>
              <span className="xl:hidden">Call Back</span>
            </Link>

            {/* Phone Number - Medium screens */}
            <a
              href="tel:18001234567"
              className="hidden md:flex lg:hidden items-center gap-1.5 text-sm font-medium transition-colors text-gray-600 hover:text-hospital-teal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">1800-123-4567</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden rounded-lg p-2 transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto w-full max-w-[1920px] px-4 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div className="flex flex-col">
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-gray-900 font-heading hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.label ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                            activeMobileDropdown === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeMobileDropdown === item.label && (
                        <div className="ml-4 flex flex-col gap-0.5 mt-1 border-l-2 border-gray-100 pl-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-hospital-teal rounded-lg transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <span className="text-hospital-teal opacity-60">
                                {getIcon(dropdownItem.label)}
                              </span>
                              <span>{dropdownItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-hospital-teal rounded-lg transition-colors font-heading"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white rounded-lg text-sm font-medium transition-colors font-heading"
                  style={{ backgroundColor: '#E85222' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d1451a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#E85222';
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Request Call Back
                </Link>
                <a
                  href="tel:18001234567"
                  className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 1800-123-4567
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
