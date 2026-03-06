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
      { label: "From Chairman's Desk", href: '/about/chairman-desk' },
      { label: "From MD's Desk", href: '/about/md-desk' },
      { label: 'Leadership Team', href: '/about/leadership' },
      { label: 'Social Responsibility (SR)', href: '/about/csr', separator: true },
      { label: 'Cashless Empanelment', href: '/about/cashless-empanelment' },
    ],
  },
  {
    label: 'Find a Hospital',
    dropdown: [
      { label: 'Our Locations', href: '/our-locations' },
      { label: 'Explore Our Facilities', href: '/facilities' },
    ],
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
      { label: "Preventive Health Check Up", href: "/services/preventive-health" },
      { label: "Pharmacy", href: "/services/pharmacy" },
      { label: "Pathological Services", href: "/services/pathology" },
      { label: "Radiological Services", href: "/services/radiology" },
      { label: "Home Care Services", href: "/services/home-care" }
    ],
  },
  {
    label: 'Media & Blog',
    dropdown: [
      { label: 'Latest News & Updates', href: '/media/news' },
      { label: 'Upcoming Events', href: '/media/events' },
      { label: 'Media Coverage', href: '/media/coverage' },
      { label: 'Blog', href: '/blog' },
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
    { label: "Burns & Plastic Surgery", href: "/departments/burns-plastic-surgery" },
    { label: "Radiology", href: "/departments/radiology" },
    { label: "Pediatric Surgery", href: "/departments/pediatric-surgery" }
  ],
  "Specialties": [
    { label: "Laparoscopy & General Surgery", href: "/departments/general-surgery" },
    { label: "Obstetrics & Gynaecology", href: "/departments/gynaecology" },
    { label: "Pediatrics And Neonatology", href: "/departments/pediatrics" },
    { label: "Orthopedics & Joint Replacement", href: "/departments/orthopedics" },
    { label: "General Medicine", href: "/departments/general-medicine" },
    { label: "ENT", href: "/departments/ent" },
    { label: "Ophthalmology", href: "/departments/ophthalmology" },
    { label: "Dental", href: "/departments/dental" },
    { label: "Department Of Respiratory Medicine", href: "/departments/respiratory" },
    { label: "Pain Management Clinic", href: "/departments/pain-management" },
    { label: "Psychiatry Department", href: "/departments/psychiatry" },
    { label: "Pathology", href: "/departments/pathology" }
  ]
};

const servicesContent: Record<string, { label: string; href: string }[]> = {
  "Our Services": [
    { label: "Emergency And Trauma Care", href: "/services/emergency" },
    { label: "Blood Bank", href: "/services/blood-bank" },
    { label: "Ambulance", href: "/services/ambulance" },
    { label: "Preventive Health Check Up", href: "/services/preventive-health" },
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
  const [selectedSpecialty, setSelectedSpecialty] = useState('Super Specialties');
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
    if (label === 'Departments') {
      setSelectedSpecialty('Super Specialties');
    } else if (label === 'Services') {
      setSelectedSpecialty('Our Services');
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  function getIcon(label: string) {
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm xl:shadow-none ${
          scrolled || !isTransparentPage ? 'xl:bg-white xl:shadow-sm' : 'xl:bg-transparent'
        }`}
      >
        {/* Gradient Overlay for visibility on transparent background — desktop only */}
        <div 
          className={`hidden xl:block absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-500 pointer-events-none ${
            scrolled || !isTransparentPage ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <div className="bg-[#2E59A8] text-white py-2 sm:py-2.5 relative z-50">
          <div className="max-w-[1366px] mx-auto px-2 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-0 text-[11px] min-[400px]:text-[12px] sm:text-[13.5px] md:text-[14.5px] font-medium">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 w-full sm:w-auto">
              <Link href="/online-payment" className="flex items-center gap-1.5 hover:text-white/80 transition-colors whitespace-nowrap">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="leading-none">Online Payment</span>
              </Link>
              <Link href="/second-opinion" className="hover:text-white/80 transition-colors whitespace-nowrap leading-none">Second opinion</Link>
              <Link href="/services/preventive-health" className="hover:text-white/80 transition-colors whitespace-nowrap leading-none">Health Packages</Link>
              <Link href="/services/wellness" className="hover:text-white/80 transition-colors whitespace-nowrap leading-none">Wellness Packages</Link>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-x-4 gap-y-1 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 min-w-max">
                <a href="https://wa.me/917800001895" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform text-[#25D366]">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.983.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045c0 2.12.554 4.189 1.602 6.06L0 24l6.12-1.605a11.777 11.777 0 005.927 1.6h.005c6.635 0 12.046-5.41 12.049-12.048 0-3.22-1.252-6.241-3.525-8.514z" />
                  </svg>
                </a>
                <a href="tel:+917800001895" className="hover:text-white/80 transition-colors">7800001895</a>
              </div>
              <div className="flex items-center gap-1.5 min-w-max">
                <a href="https://wa.me/917800001896" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform text-[#25D366]">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.983.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045c0 2.12.554 4.189 1.602 6.06L0 24l6.12-1.605a11.777 11.777 0 005.927 1.6h.005c6.635 0 12.046-5.41 12.049-12.048 0-3.22-1.252-6.241-3.525-8.514z" />
                  </svg>
                </a>
                <a href="tel:+917800001896" className="hover:text-white/80 transition-colors">7800001896</a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 lg:px-12">
          <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-2 sm:gap-4">
            <Link 
              href="/" 
              className={`flex items-center flex-shrink-0 group transition-all duration-300 ${
                scrolled || !isTransparentPage ? '' : 'bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm'
              }`}
            >
              <Image
                src="/logo-horizontal.png"
                alt="Popular Hospital"
                width={200}
                height={60}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
                priority
                sizes="(max-width: 768px) 150px, 200px"
              />
            </Link>

            <nav className="hidden xl:flex xl:items-center xl:justify-center xl:flex-1 xl:gap-0.5" aria-label="Main navigation">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2 lg:px-2 xl:px-3 2xl:px-5 py-2.5 text-xs lg:text-sm xl:text-[13px] min-[1366px]:text-[14px] 2xl:text-base font-medium transition-colors font-heading whitespace-nowrap ${
                        scrolled || !isTransparentPage
                          ? (activeDropdown === item.label ? 'text-hospital-teal' : 'text-gray-700 hover:text-hospital-teal')
                          : 'text-white hover:text-gray-200'
                      }`}
                    >
                      {item.label}
                      <svg className={`h-3 w-3 xl:h-3.5 xl:w-3.5 flex-shrink-0 ${!scrolled && isTransparentPage ? 'text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div
                        ref={(el) => { dropdownRefs.current[item.label] = el; }}
                        className={`absolute left-0 top-full z-50 ${item.label === 'Departments' ? '-left-48 min-[1366px]:-left-64' : item.label === 'Services' ? '-left-64 min-[1366px]:-left-80' : ''}`}
                      >
                        <div className="pt-2"> {/* Invisible bridge and top padding */}
                        {item.label === 'Departments' ? (
                          <div className="w-[820px] min-[1366px]:w-[960px] rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                            <div className="flex">

                              {/* Left — Super Specialties */}
                              <div className="flex-1 p-6 pr-5">
                                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b-2 border-hospital-teal/30">
                                  <span className="text-hospital-teal">{getIcon('Super Specialties')}</span>
                                  <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest">Super Specialties</h3>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  {specialtiesContent['Super Specialties'].map((subItem) => (
                                    <Link
                                      href={subItem.href}
                                      key={subItem.label}
                                      className="text-[13px] text-gray-600 hover:text-hospital-teal hover:bg-teal-50 transition-all block py-1.5 px-2 rounded-lg hover:translate-x-1 duration-150"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Vertical Divider */}
                              <div className="w-px bg-gray-100 my-4" />

                              {/* Right — Specialties */}
                              <div className="flex-1 p-6 pl-5">
                                <div className="flex items-center gap-2 mb-4 pb-2.5 border-b-2 border-hospital-teal/30">
                                  <span className="text-hospital-teal">{getIcon('Specialties')}</span>
                                  <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest">Specialties</h3>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  {specialtiesContent['Specialties'].map((subItem) => (
                                    <Link
                                      href={subItem.href}
                                      key={subItem.label}
                                      className="text-[13px] text-gray-600 hover:text-hospital-teal hover:bg-teal-50 transition-all block py-1.5 px-2 rounded-lg hover:translate-x-1 duration-150"
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
                          <div className="w-[600px] p-6 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                             <h3 className="text-hospital-teal font-heading font-bold text-xs uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">Our Services</h3>
                             <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                               {item.dropdown?.map((dropdownItem) => (
                                 <Link
                                   key={dropdownItem.label}
                                   href={dropdownItem.href}
                                   className="flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-hospital-teal transition-colors group"
                                   onClick={() => setActiveDropdown(null)}
                                 >
                                   <span className="text-hospital-teal opacity-60 group-hover:opacity-100 transition-opacity">
                                     {getIcon(dropdownItem.label)}
                                   </span>
                                   <span>{dropdownItem.label}</span>
                                 </Link>
                               ))}
                             </div>
                          </div>
                        ) : (
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
                        )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={`px-2 lg:px-2 xl:px-3 2xl:px-5 py-2.5 text-xs lg:text-sm xl:text-[13px] min-[1366px]:text-[14px] 2xl:text-base font-medium transition-colors font-heading whitespace-nowrap ${
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
              href="tel:+917800001895"
              className="hidden md:flex xl:hidden items-center gap-1.5 text-sm font-medium transition-colors text-gray-600 hover:text-hospital-teal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">+91-7800001895</span>
            </a>

            {/* Mobile Menu Button - Visible on all screens smaller than XL */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
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
        <div className="border-t border-gray-100 bg-white xl:hidden">
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
                           {(item.label === 'Departments' || item.label === 'Services') ? (
                            // Mobile View for Specialties (Nested)
                            item.dropdown?.map((dropdownItem) => {
                                const contentMap = item.label === 'Departments' ? specialtiesContent : servicesContent;
                                const isCategory = contentMap.hasOwnProperty(dropdownItem.label);
                                
                                if (isCategory) {
                                    return (
                                        <div key={dropdownItem.label} className="flex flex-col">
                                            <button
                                                type="button"
                                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                                onClick={() => setActiveMobileSubCategory(activeMobileSubCategory === dropdownItem.label ? null : dropdownItem.label)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`${activeMobileSubCategory === dropdownItem.label ? 'text-hospital-teal' : 'text-gray-400'}`}>
                                                        {getIcon(dropdownItem.label)}
                                                    </span>
                                                    <span>{dropdownItem.label}</span>
                                                </div>
                                                <svg
                                                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                                        activeMobileSubCategory === dropdownItem.label ? 'rotate-180' : ' -rotate-90'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {activeMobileSubCategory === dropdownItem.label && (
                                                <div className="ml-4 border-l border-gray-100 pl-2 mt-1 mb-2 flex flex-col gap-1">
                                                    {(item.label === 'Departments' ? specialtiesContent : servicesContent)[dropdownItem.label].map((subItem) => (
                                                        <Link
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            className="block px-3 py-1.5 text-sm text-gray-600 hover:text-hospital-teal transition-colors"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                } else {
                                    return (
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
                                    );
                                }
                            })
                          ) : (
                             // Standard Mobile View
                             item.dropdown.map((dropdownItem) => (
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
                            ))
                          )}
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
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Link href="/online-payment" className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 text-xs font-medium rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Online Payment
                  </Link>
                  <Link href="/second-opinion" className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 text-xs font-medium rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Second Opinion
                  </Link>
                  <Link href="/services/preventive-health" className="w-full bg-gray-50 text-gray-700 px-3 py-2 text-xs font-medium rounded-lg text-center hover:bg-gray-100 transition-colors">
                    Health Cards Packages
                  </Link>
                </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  <a
                    href="tel:+917800001895"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg className="w-3.5 h-3.5 text-hospital-teal" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.384 17.791l-4.469-1.914a1.041 1.041 0 0 0-1.181.209l-2.022 2.022a15.153 15.153 0 0 1-6.822-6.822l2.022-2.022a1.041 1.041 0 0 0 .209-1.181L7.209 3.614A1.036 1.036 0 0 0 6.222 3H3.046a1.032 1.032 0 0 0-1.026 1.134 14.502 14.502 0 0 0 12.846 12.846 1.032 1.032 0 0 0 1.134-1.026v-3.176a1.031 1.031 0 0 0-.616-.94z" />
                    </svg>
                    +91-7800001895
                  </a>
                  <a
                    href="tel:+917800001896"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg className="w-3.5 h-3.5 text-hospital-teal" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.384 17.791l-4.469-1.914a1.041 1.041 0 0 0-1.181.209l-2.022 2.022a15.153 15.153 0 0 1-6.822-6.822l2.022-2.022a1.041 1.041 0 0 0 .209-1.181L7.209 3.614A1.036 1.036 0 0 0 6.222 3H3.046a1.032 1.032 0 0 0-1.026 1.134 14.502 14.502 0 0 0 12.846 12.846 1.032 1.032 0 0 0 1.134-1.026v-3.176a1.031 1.031 0 0 0-.616-.94z" />
                    </svg>
                    +91-7800001896
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
    {pathname !== '/' && <div className="h-[104px] sm:h-[112px] md:h-[122px]" />}
    </>
  );
}
