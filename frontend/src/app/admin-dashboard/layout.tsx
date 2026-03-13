'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Users, Building2, CalendarCheck, FileText,
  Stethoscope, Settings, LogOut, Menu, X, ChevronRight, ChevronDown, Newspaper
} from 'lucide-react';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin-dashboard', icon: LayoutDashboard },
  { label: 'Doctors', href: '/admin-dashboard/doctors', icon: Stethoscope },
  { label: 'Branches', href: '/admin-dashboard/branches', icon: Building2 },
  { label: 'Bookings', href: '/admin-dashboard/bookings', icon: CalendarCheck },
  { label: 'Departments', href: '/admin-dashboard/departments', icon: Users },
  { label: 'Site Content', href: '/admin-dashboard/content', icon: FileText },
  { 
    label: 'Media & Blog', 
    icon: Newspaper,
    subItems: [
      { label: 'News', href: '/admin-dashboard/media-blog/news' },
      { label: 'Blog', href: '/admin-dashboard/media-blog/blog' }
    ]
  },
  { label: 'Settings', href: '/admin-dashboard/settings', icon: Settings },
];


export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mediaBlogOpen, setMediaBlogOpen] = useState(false);

  // Auto-open dropdown if we are currently inside media-blog route
  useEffect(() => {
    if (pathname.includes('/media-blog')) {
      setMediaBlogOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    if (!token) {
      router.push('/admin-login');
      return;
    }
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-login');
  };

  const currentPage = sidebarItems.find((item) => pathname === item.href)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-[#0b1c43] transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <Link href="/admin-dashboard" className="flex items-center gap-3">
            <Image
              src="/logo-horizontal.png"
              alt="Popular Hospital"
              width={160}
              height={40}
              className="h-8 w-auto object-contain bg-white rounded px-2 py-0.5"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto overflow-x-hidden">
          <p className="px-3 mb-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Menu</p>
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              
              if (item.subItems) {
                const isActiveGroup = pathname.includes('/media-blog');
                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() => setMediaBlogOpen(!mediaBlogOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${isActiveGroup
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActiveGroup ? 'text-[#0d9488]' : ''}`} />
                        <span>{item.label}</span>
                      </div>
                      {mediaBlogOpen ? (
                        <ChevronDown className="w-4 h-4 text-white/40" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      )}
                    </button>
                    {mediaBlogOpen && (
                      <div className="pl-11 pr-3 space-y-1 mt-1">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${isSubActive
                                  ? 'bg-white/15 text-white shadow-sm'
                                  : 'text-white/50 hover:text-white hover:bg-white/5'
                                }
                              `}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href || item.label}
                  href={item.href || '#'}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0d9488]' : ''}`} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-white/40" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Section at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0d9488] to-[#0b1c43] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-white/40 truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/40 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-[280px] min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{currentPage}</h1>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-500 hover:text-[#0d9488] transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              View Website →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
