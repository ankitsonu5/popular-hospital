'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import { CreditCard, Users, HeartPulse, Activity } from 'lucide-react';

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
    label: 'About Us',
    dropdown: [
      { label: 'Overview', href: '/about' },
      { label: 'Our Vision & Mission', href: '/about/vision-mission' },
      { label: "From Chairman's Desk", href: '/about/chairman-desk' },
      { label: "From MD's Desk", href: '/about/md-desk' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Awards & Recognition', href: '/about/awards-recognition' },
      { label: 'Social Responsibility (SR)', href: '/about/csr', separator: true },
      { label: 'Cashless Empanelment', href: '/about/cashless-empanelment' },
    ],
  },
  {
    label: 'Find Your Doctor',
    href: '/doctors',
  },
  {
    label: 'Departments',
    dropdown: [
      { label: 'Super Specialties', href: '/departments/super' },
      { label: 'Specialties', href: '/departments/core' },
    ],
  },
  {
    label: 'Services',
    dropdown: [
      { label: "Emergency And Trauma Care", href: "/services/emergency" },
      { label: "Blood Bank", href: "/services/blood-bank" },
      { label: "Ambulance", href: "/services/ambulance" },
      { label: "Wellness Packages", href: "/services/wellness-packages" },
      { label: "Pharmacy", href: "/services/pharmacy" },
      { label: "Pathological Services", href: "/services/pathology" },
      { label: "Radiological Services", href: "/services/radiology" },
      { label: "Home Care Services", href: "/services/home-care" }
    ],
  },
  {
    label: 'Media & Blog',
    dropdown: [
      { label: 'News', href: '/media/news' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/media/coverage' },
      { label: 'Events', href: '/media/events' },
    ],
  },
];

const specialtiesContent: Record<string, { label: string; href: string }[]> = {
  "Super Specialties": [
    { label: "Cardiology", href: "/departments/cardiology" },
    { label: "Cardiothoracic & Vascular Surgery (CTVS)", href: "/departments/ctvs" }, 
    { label: "Neurosurgery", href: "/departments/neurosurgery" },
    { label: "Gastroenterology", href: "/departments/gastroenterology" },
    { label: "Nephrology", href: "/departments/nephrology" },
    { label: "Oncology", href: "/departments/oncology" },
    { label: "Urology", href: "/departments/urology" },
    { label: "Plastic & Reconstructive Surgery", href: "/departments/burns-plastic-surgery" },
    { label: "Interventional Radiology", href: "/departments/interventional-radiology" },
    { label: "Pediatric Surgery", href: "/departments/pediatric-surgery" }
  ],
  "Specialties": [
    { label: "Laparoscopy & General Surgery", href: "/departments/general-surgery" },
    { label: "Obstetrics & Gynaecology", href: "/departments/gynaecology" },
    { label: "Pediatrics And Neonatology", href: "/departments/pediatrics" },
    { label: "Orthopedics & Joint Replacement", href: "/departments/orthopedics" },
    { label: "General Medicine", href: "/departments/general-medicine" },
    { label: "ENT", href: "/departments/ent" },
    { label: "Dietetics & Nutrition", href: "/departments/dietetics-nutrition" },
    { label: "Ophthalmology", href: "/departments/ophthalmology" },
    { label: "Dental", href: "/departments/dental" },
    { label: "T.B & Respiratory Medicine", href: "/departments/respiratory" },
    { label: "Anesthesiology, Critical Care & Pain Medicine", href: "/departments/pain-management" },
    { label: "Psychiatry Department", href: "/departments/psychiatry" },
  ]
};

const servicesContent: Record<string, { label: string; href: string }[]> = {
  "Our Services": [
    { label: "Emergency And Trauma Care", href: "/services/emergency" },
    { label: "Blood Bank", href: "/services/blood-bank" },
    { label: "Ambulance", href: "/services/ambulance" },
    { label: "Wellness Packages", href: "/services/wellness-packages" },
    { label: "Pharmacy", href: "/services/pharmacy" },
    { label: "Pathological Services", href: "/services/pathology" },
    { label: "Radiological Services", href: "/services/radiology" },
    { label: "Home Care Services", href: "/services/home-care" }
  ]
};

export function Header() {
  const pathname = usePathname();
  const isTransparentPage = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [activeMobileSubCategory, setActiveMobileSubCategory] = useState<string | null>(null);
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);



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

  function getIcon(label: string) {
    const iconClass = 'w-5 h-5 text-gray-600 flex-shrink-0';
    if (label.includes('Story') || label.includes('Vision') || label.includes('About')) {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1.01.707.293l5.414 5.414a1 1.01.293.707V19a2 2 2 0 01-2 2z" />
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
    if (label.includes('Award') || label.includes('Recognition')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
    if (label.includes('Cashless') || label.includes('Empanelment')) {
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
  }

  return (
    <>
      <header
        className={`${pathname === '/' ? 'fixed' : 'sticky'} top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || !isTransparentPage 
            ? 'bg-white shadow-sm' 
            : 'bg-white shadow-sm md:bg-transparent md:shadow-none'
        }`}
      >
        {/* Gradient Overlay */}
        <div 
          className={`hidden xl:block absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-black/60 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none -z-10 ${
            scrolled || !isTransparentPage ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        
        {/* Top Bar */}
        <div className="hidden md:block bg-[#2E59A8] text-white relative z-50 overflow-hidden max-h-[200px] opacity-100 py-3 sm:py-4">
          <div className="max-w-[1366px] mx-auto px-2 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-0 text-[14px] sm:text-[17px] font-medium">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 w-full sm:w-auto">
              <Link href="/online-payment" className="flex items-center gap-2 hover:text-white/80 transition-colors whitespace-nowrap">
                <svg className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Online Payment</span>
              </Link>
              <div className="w-[1px] h-4 sm:h-5 bg-white/30 hidden sm:block"></div>
              <Link href="/second-opinion" className="hover:text-white/80 transition-colors whitespace-nowrap">Second opinion</Link>
              <div className="w-[1px] h-4 sm:h-5 bg-white/30 hidden sm:block"></div>
              <Link href="/services/wellness-packages" className="hover:text-white/80 transition-colors whitespace-nowrap">Wellness Packages</Link>
              <div className="w-[1px] h-4 sm:h-5 bg-white/30 hidden sm:block"></div>
              <Link href="/services/health-packages" className="hover:text-white/80 transition-colors whitespace-nowrap">Health Packages</Link>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-x-6 w-full sm:w-auto mt-1 sm:mt-0">
               <div className="flex items-center gap-2">
                <a href="https://wa.me/917800001895" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                  <Image className="w-5 h-5 sm:w-[22px] sm:h-[22px]" src="/images/whatsapp_icon.png" alt="whatsapp" width={22} height={22} />
                </a>
                <a href="tel:+917800001895" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <svg className="w-4 h-4 sm:w-[20px] sm:h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.75-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>+91-7800001895</span>
                </a>
               </div>
               <div className="flex items-center gap-2">
                <a href="https://wa.me/917800001896" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                  <Image className="w-5 h-5 sm:w-[22px] sm:h-[22px]" src="/images/whatsapp_icon.png" alt="whatsapp" width={22} height={22} />
                </a>
                <a href="tel:+917800001896" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <svg className="w-4 h-4 sm:w-[20px] sm:h-[20px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.75-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>+91-7800001896</span>
                </a>
               </div>
            </div>
          </div>
        </div>

        {/* Brand & Desktop Nav */}
        <div className="relative mx-auto w-full max-w-[1366px] px-6 sm:px-8 lg:px-12">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
            <Link 
              href="/" 
              className={`flex items-center transition-all duration-300 ${
                scrolled || !isTransparentPage ? '' : 'md:bg-white/90 md:backdrop-blur-sm md:rounded-lg md:px-3 md:py-1'
              }`}
            >
              <Image
                src="/logo-horizontal.png"
                alt="Popular Hospital"
                width={200}
                height={60}
                className="h-8 sm:h-10 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden xl:flex xl:items-center xl:flex-1 xl:justify-center xl:gap-0.5">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        type="button"
                        className={`flex items-center gap-1 px-2 min-[1366px]:px-2.5 min-[1440px]:px-3 2xl:px-4 py-2.5 text-[14px] min-[1366px]:text-[14.5px] min-[1440px]:text-[15.5px] 2xl:text-[16px] font-bold transition-colors font-heading whitespace-nowrap ${
                          scrolled || !isTransparentPage
                            ? (activeDropdown === item.label ? 'text-hospital-teal' : 'text-gray-700 hover:text-hospital-teal')
                            : 'text-white hover:text-gray-200'
                        }`}
                      >
                        {item.label}
                        <svg className="h-3.5 w-3.5 min-[1440px]:w-4 min-[1440px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        ref={(el) => { dropdownRefs.current[item.label] = el; }}
                        className={`absolute left-0 top-full z-50 transition-all duration-300 ${
                          activeDropdown === item.label 
                            ? 'opacity-100 translate-y-0 pointer-events-auto' 
                            : 'opacity-0 -translate-y-2 pointer-events-none'
                        } ${item.label === 'Departments' ? '-left-64' : item.label === 'Services' ? '-left-80' : ''}`}
                      >
                        <div className="pt-2">
                          {item.label === 'Departments' ? (
                            <div className="w-[820px] min-[1366px]:w-[960px] rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                              <div className="flex">
                                {/* Left Side */}
                                <div className="flex-1 p-6 border-r border-gray-100">
                                  <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b-2 border-hospital-teal/20">Super Specialties</h3>
                                  <div className="flex flex-col gap-0.5">
                                    {specialtiesContent['Super Specialties'].map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        href={subItem.href}
                                        className="text-[14.5px] font-bold text-gray-700 hover:text-hospital-teal hover:bg-teal-50/70 p-2 rounded-lg transition-all"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                                {/* Right Side */}
                                <div className="flex-1 p-6">
                                  <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b-2 border-hospital-teal/20">Specialties</h3>
                                  <div className="flex flex-col gap-0.5">
                                    {specialtiesContent['Specialties'].map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        href={subItem.href}
                                        className="text-[14.5px] font-bold text-gray-700 hover:text-hospital-teal hover:bg-teal-50/70 p-2 rounded-lg transition-all"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : item.label === 'Services' ? (
                            <div className="w-[600px] p-6 rounded-xl bg-white shadow-xl border border-gray-100">
                              <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Our Services</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {item.dropdown?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.label}
                                    href={dropdownItem.href}
                                    className="flex items-center gap-3 p-2.5 text-[15px] font-bold text-gray-700 hover:text-hospital-teal hover:bg-gray-50 rounded-xl transition-all"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span className="opacity-70">{getIcon(dropdownItem.label)}</span>
                                    <span>{dropdownItem.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="w-72 rounded-xl bg-white py-2 shadow-xl border border-gray-100">
                              {item.dropdown.map((dropdownItem, idx) => (
                                <div key={dropdownItem.label}>
                                  {dropdownItem.separator && idx > 0 && <div className="my-1.5 mx-4 border-t border-gray-100" />}
                                  <Link
                                    href={dropdownItem.href}
                                    className="flex items-center gap-4 px-6 py-3 text-[15px] font-bold text-gray-700 hover:bg-gray-50 hover:text-hospital-teal transition-all"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span className="opacity-70">{getIcon(dropdownItem.label)}</span>
                                    <span>{dropdownItem.label}</span>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`px-2 min-[1366px]:px-2.5 min-[1440px]:px-3 2xl:px-4 py-2.5 text-[14px] min-[1366px]:text-[14.5px] min-[1440px]:text-[15.5px] 2xl:text-[16px] font-bold transition-colors font-heading whitespace-nowrap ${
                        scrolled || !isTransparentPage
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

            <div className="flex items-center gap-3">
              <Link
                href="/book"
                className="hidden lg:flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2 lg:py-2.5 text-white rounded-full text-[13px] font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                style={{ backgroundColor: '#E85222' }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Request Call Back</span>
              </Link>

              <div className="hidden xl:block">
                <LanguageSelector scrolled={scrolled} isTransparentPage={isTransparentPage} />
              </div>

              <div className="flex xl:hidden items-center gap-2">
                <LanguageSelector scrolled={true} isTransparentPage={false} />
                <button
                  type="button"
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    scrolled || !isTransparentPage 
                      ? 'text-gray-600 hover:bg-gray-100' 
                      : 'text-gray-600 hover:bg-gray-100 md:bg-white/90 md:backdrop-blur-sm md:text-gray-600 md:shadow-sm'
                  }`}
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
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-full left-0 w-full border-t border-gray-100 bg-white xl:hidden transition-all duration-300 ease-in-out z-[100] shadow-2xl ${
          menuOpen ? 'max-h-[calc(100dvh-120px)] opacity-100 overflow-y-auto overscroll-contain pb-10' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
        }`}>
          <div className="px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div className="flex flex-col">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-900 rounded-lg hover:bg-gray-50"
                      onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${activeMobileDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`pl-4 overflow-hidden transition-all duration-300 ${activeMobileDropdown === item.label ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {(item.label === 'Departments' || item.label === 'Services') ? (
                        item.dropdown.map((dropdownItem) => {
                          const contentMap = item.label === 'Departments' ? specialtiesContent : servicesContent;
                          const isCategory = contentMap.hasOwnProperty(dropdownItem.label);
                          
                          if (isCategory) {
                             return (
                               <div key={dropdownItem.label} className="mt-1">
                                 <button
                                   type="button"
                                   className="flex items-center justify-between w-full px-4 py-2 text-sm font-bold text-gray-700 hover:text-hospital-teal"
                                   onClick={() => setActiveMobileSubCategory(activeMobileSubCategory === dropdownItem.label ? null : dropdownItem.label)}
                                 >
                                   <span>{dropdownItem.label}</span>
                                   <svg className={`w-3.5 h-3.5 transition-transform ${activeMobileSubCategory === dropdownItem.label ? 'rotate-180' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                   </svg>
                                 </button>
                                 <div className={`pl-4 overflow-hidden transition-all duration-300 ${activeMobileSubCategory === dropdownItem.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                   {contentMap[dropdownItem.label]?.map((subItem) => (
                                     <Link
                                       key={subItem.label}
                                       href={subItem.href}
                                       className="block px-4 py-2 text-sm font-bold text-gray-600 hover:text-hospital-teal"
                                       onClick={() => setMenuOpen(false)}
                                     >
                                       {subItem.label}
                                     </Link>
                                   ))}
                                 </div>
                               </div>
                             );
                          }
                          return (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-hospital-teal"
                              onClick={() => setMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          );
                        })
                      ) : (
                        item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-hospital-teal"
                            onClick={() => setMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="block px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Added Bottom Nav Items to Mobile Menu */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quick Links</h3>
              <div className="space-y-1">
                <Link
                  href="/online-payment"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  Online Payment
                </Link>
                <Link
                  href="/second-opinion"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <Users className="w-5 h-5 text-gray-400" />
                  Second Opinion
                </Link>
                <Link
                  href="/services/wellness-packages"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <HeartPulse className="w-5 h-5 text-gray-400" />
                  Wellness Packages
                </Link>
                <Link
                  href="/services/health-packages"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <Activity className="w-5 h-5 text-gray-400" />
                  Health Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
