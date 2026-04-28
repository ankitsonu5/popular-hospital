"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Briefcase,
  Award,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Careers", href: "/careers/admin/careers", icon: Briefcase },
  { label: "Job Portal", href: "/careers/admin/applications", icon: Award },
];

export default function CareerAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");
    if (!token || !storedUser) {
      router.push("/careers/admin-login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    if (parsed.role !== "career_admin") {
      router.push("/careers/admin-login");
      return;
    }
    setUser(parsed);
  }, [router]);

  const fetcher = (url: string) =>
    fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } })
      .then((r) => r.json());

  const { data: newApplications } = useSWR(
    user ? "/api-backend/applications?isRead=false" : null,
    fetcher,
    { refreshInterval: 15000, revalidateOnFocus: true },
  );
  const unreadAppsCount = Array.isArray(newApplications) ? newApplications.length : 0;

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/careers/admin-login");
  };

  const currentPage = navItems.find((i) => pathname === i.href)?.label || "Career Portal";
  const isActionPage = pathname.includes("/action");

  if (isActionPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-[#0b1c43] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-horizontal.png"
              alt="Popular Hospital"
              width={140}
              height={36}
              className="h-7 w-auto object-contain bg-white rounded px-2 py-0.5"
            />
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Career Portal badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 bg-[#0d9488]/20 rounded-lg px-3 py-2">
            <Briefcase className="w-4 h-4 text-[#0d9488]" />
            <span className="text-[#0d9488] text-xs font-semibold tracking-wide uppercase">Career Portal</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-4 px-3">
          <p className="px-3 mb-3 text-[10px] font-bold tracking-widest text-white/30 uppercase">Menu</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const showBadge = item.label === "Job Portal" && unreadAppsCount > 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${isActive ? "bg-white/15 text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#0d9488]" : ""}`} />
                  <span>{item.label}</span>
                  <div className="flex-1 flex items-center justify-end gap-2">
                    {showBadge && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 text-white/40" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0d9488] to-[#0b1c43] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.charAt(0) || "C"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || "Career Admin"}</p>
              <p className="text-[11px] text-white/40 truncate">{user?.email || ""}</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/5" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-[260px] min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{currentPage}</h1>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
