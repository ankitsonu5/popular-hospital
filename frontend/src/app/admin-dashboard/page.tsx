"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Building2,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";

const API_URL = "/api-backend";

interface Stats {
  doctors: number;
  branches: number;
  bookings: number;
  departments: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    doctors: 0,
    branches: 0,
    bookings: 0,
    departments: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    Promise.all([
      fetch(`${API_URL}/branches`, { headers }).then((r) => r.json()),
      fetch(`${API_URL}/doctors`, { headers }).then((r) => r.json()),
      fetch(`${API_URL}/doctors/specialities`, { headers }).then((r) =>
        r.json(),
      ),
      fetch(`${API_URL}/cms/bookings`, { headers })
        .then((r) => r.json())
        .catch(() => []),
    ])
      .then(([branches, doctors, departments, bookings]) => {
        setStats({
          branches: Array.isArray(branches) ? branches.length : 0,
          doctors: Array.isArray(doctors) ? doctors.length : 0,
          departments: Array.isArray(departments) ? departments.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
        });
        if (Array.isArray(bookings)) setRecentBookings(bookings.slice(0, 5));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Doctors",
      value: stats.doctors,
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
      href: "/admin-dashboard/doctors",
    },
    {
      label: "Branches",
      value: stats.branches,
      icon: Building2,
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      href: "/admin-dashboard/branches",
    },
    {
      label: "Bookings",
      value: stats.bookings,
      icon: CalendarCheck,
      color: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      text: "text-orange-600",
      href: "/admin-dashboard/bookings",
    },
    {
      label: "Departments",
      value: stats.departments,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
      href: "/admin-dashboard/departments",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0d9488] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1c43] to-[#1e3a8a] p-6 sm:p-8 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4">
            <Activity className="w-3 h-3" />
            <span>Admin Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back, Admin! 👋
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl">
            Manage your hospital data from one place. Here&apos;s a quick
            overview of your system.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${card.text}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {card.value}
              </p>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              {
                label: "Add New Doctor",
                href: "/admin-dashboard/doctors",
                icon: Stethoscope,
                color: "text-blue-600 bg-blue-50",
              },
              {
                label: "Add New Branch",
                href: "/admin-dashboard/branches",
                icon: Building2,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                label: "Manage Bookings",
                href: "/admin-dashboard/bookings",
                icon: CalendarCheck,
                color: "text-orange-600 bg-orange-50",
              },
              {
                label: "Update Content",
                href: "/admin-dashboard/content",
                icon: TrendingUp,
                color: "text-purple-600 bg-purple-50",
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {action.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-500" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
            <Link
              href="/admin-dashboard/bookings"
              className="text-xs text-[#0d9488] font-medium hover:underline"
            >
              View All →
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="text-center py-10">
              <CalendarCheck className="w-12 h-12 mx-auto text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Doctor
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-3 px-2">
                        <p className="font-medium text-gray-900">
                          {b.patient_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {b.patient_phone}
                        </p>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell text-gray-600">
                        {b.doctor?.name || "-"}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          {b.slot_date} {b.slot_time}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            b.status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : b.status === "cancelled"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
