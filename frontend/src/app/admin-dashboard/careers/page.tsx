"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const API_URL = "/api-backend";

function CareerList() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/careers`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        setCareers(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [getHeaders]);

  useEffect(() => {
    fetchData();
    const handleFocus = () => fetchData();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await fetch(`${API_URL}/cms/careers/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = careers.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.department?.toLowerCase().includes(search.toLowerCase()) ||
      c.designation?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-[1366px] mx-auto pb-24 font-sans tracking-tight">
      {/* ─── Modern Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 w-fit border border-teal-100 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment Center</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">
            Career Opportunities
          </h1>
          <p className="text-base text-gray-500 font-medium tracking-tight leading-relaxed max-w-xl">
            Public job openings and vacancies management system.
          </p>
        </div>

        <Link
          href="/admin-dashboard/careers/action"
          target="_blank"
          className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Post New Vacancy</span>
        </Link>
      </div>

      {/* ─── Control Bar ─── */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by role, department or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-4 rounded-[2rem] bg-gray-50 border border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* ─── Career Table ─── */}
      {isLoading && careers.length === 0 ? (
        <div className="py-48 flex flex-col items-center justify-center space-y-6">
          <Loader2 className="w-14 h-14 animate-spin text-teal-200" />
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest text-center">
            Loading Archives...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden group/table">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 font-extrabold text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-10 py-6 text-left">Post Details</th>
                  <th className="px-10 py-6 text-left">Department</th>
                  <th className="px-10 py-6 text-left">Posted On</th>
                  <th className="px-10 py-6 text-left">Deadline</th>
                  <th className="px-10 py-6 text-center">Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {filtered.map((item) => (
                  <tr
                    key={item._id}
                    className="group hover:bg-teal-50/30 transition-all duration-300"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-7">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm relative group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                          <Briefcase className="w-6 h-6 text-teal-600 opacity-60" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-gray-900 group-hover:text-teal-600 transition-colors uppercase tracking-tight mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                            <MapPin className="w-3 h-3 text-red-400" />
                            <span>{item.location || "Varanasi"}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">
                          {item.department || "-"}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-gray-500 font-medium whitespace-nowrap">
                      {item.postedOn || "-"}
                    </td>
                    <td className="px-10 py-8 text-gray-500 font-medium whitespace-nowrap">
                      {item.lastDate || "-"}
                    </td>
                    <td className="px-10 py-8 text-center whitespace-nowrap">
                      <div
                        className={`px-4 py-1.5 rounded-2xl inline-flex items-center justify-center border font-extrabold text-[10px] uppercase tracking-widest transition-all ${
                          item.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-100 shadow-sm"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {item.isActive !== false ? "Hiring" : "Closed"}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-1 pr-2 transition-all">
                        <Link
                          href={`/admin-dashboard/careers/action?id=${item._id}`}
                          target="_blank"
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-40 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-[2rem] mb-6 scale-90 opacity-40">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-extrabold text-gray-400 text-lg uppercase tracking-tight">
                  No Vacancies Found
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCareersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-14 h-14 animate-spin text-[#0d9488]" />
        </div>
      }
    >
      <CareerList />
    </Suspense>
  );
}
