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
  Sparkles,
  Users,
  AlertTriangle,
  X,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

function CareerList() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appCounts, setAppCounts] = useState<Record<string, number>>({});
  const [totalApps, setTotalApps] = useState(0);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<any | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [careersRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/cms/careers`, { headers: getHeaders() }),
        fetch(`${API_URL}/applications`, {
          headers: { ...getHeaders() },
        }),
      ]);
      if (careersRes.ok) {
        const careersData = await careersRes.json();
        setCareers(careersData);
      }
      if (appsRes.ok) {
        const apps: any[] = await appsRes.json();
        setTotalApps(apps.length);
        const counts: Record<string, number> = {};
        apps.forEach((a) => {
          const id = a.appliedFor?._id || a.appliedFor;
          if (id) counts[id] = (counts[id] || 0) + 1;
        });
        setAppCounts(counts);
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

  // Sync selectedCareer details if careers array updates
  useEffect(() => {
    if (selectedCareer) {
      const current = careers.find((c) => c._id === selectedCareer._id);
      if (current) {
        setSelectedCareer(current);
      }
    }
  }, [careers, selectedCareer]);

  const confirmDelete = async () => {
    const targetId = deleteConfirmId;
    if (!targetId) return;
    try {
      const res = await fetch(`${API_URL}/cms/careers/${targetId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        toast.success("Job posting deleted successfully");
        if (selectedCareer?._id === targetId) {
          setSelectedCareer(null);
        }
        fetchData();
      } else {
        toast.error("Failed to delete posting");
      }
    } catch {
      toast.error("Failed to delete posting");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleToggleActive = async (item: any) => {
    const nextState = !(item.isActive !== false);
    try {
      const res = await fetch(`${API_URL}/cms/careers/${item._id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ isActive: nextState }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCareers((prev) =>
          prev.map((c) => (c._id === item._id ? updated : c))
        );
        toast.success(`Hiring status set to ${nextState ? "Hiring" : "Closed"}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.designation?.toLowerCase().includes(search.toLowerCase()) ||
      c.department?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || c.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && c.isActive !== false) ||
      (statusFilter === "inactive" && c.isActive === false);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const activeOpenings = careers.filter((c) => c.isActive !== false).length;
  const closedOpenings = careers.filter((c) => c.isActive === false).length;
  const totalPositions = careers.reduce(
    (acc, cur) => acc + (parseInt(cur.position) || 0),
    0,
  );

  return (
    <div className="max-w-[1366px] mx-auto pb-24 font-sans tracking-tight relative">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 w-fit border border-blue-100 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment Center</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">
            Career Opportunities
          </h1>
          <p className="text-base text-gray-500 font-medium tracking-tight leading-relaxed max-w-xl">
            Public job openings, specifications, and vacancy administration.
          </p>
        </div>

        <Link
          href="/admin-dashboard/careers/action"
          className="group inline-flex items-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Post New Vacancy</span>
        </Link>
      </div>

      {/* ─── Overview Stats Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active Roles
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {activeOpenings}
            </h3>
            <p className="text-xs font-medium text-emerald-600">
              Currently hiring
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Open Vacancies
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {totalPositions}
            </h3>
            <p className="text-xs font-medium text-blue-600">Target vacancies</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Applications
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {totalApps}
            </h3>
            <p className="text-xs font-medium text-indigo-600">
              Candidates applied
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Closed Openings
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {closedOpenings}
            </h3>
            <p className="text-xs font-medium text-gray-500">Filled or paused</p>
          </div>
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 border border-gray-100">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ─── Control Bar ─── */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by designation, department, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-52">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Medico">Medical Openings</option>
            <option value="Non-Medical">Non-Medical</option>
            <option value="Admin">Administration</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Hiring (Active)</option>
            <option value="inactive">Closed (Inactive)</option>
          </select>
        </div>
      </div>

      {/* ─── Career Table ─── */}
      {isLoading && careers.length === 0 ? (
        <div className="py-48 flex flex-col items-center justify-center space-y-6">
          <Loader2 className="w-14 h-14 animate-spin text-blue-200" />
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest text-center">
            Loading Archives...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group/table">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 font-extrabold text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-5 text-left">Post Details</th>
                  <th className="px-8 py-5 text-left">Department</th>
                  <th className="px-8 py-5 text-left">Posted On</th>
                  <th className="px-8 py-5 text-left">Deadline</th>
                  <th className="px-8 py-5 text-center">Openings</th>
                  <th className="px-8 py-5 text-center">Applications</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                {filtered.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => setSelectedCareer(item)}
                    className="group hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
                  >
                    {/* Post Details */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm group-hover:scale-105 transition-transform duration-500 shrink-0">
                          <Briefcase className="w-5 h-5 text-blue-600 opacity-60" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight mb-1 truncate max-w-[240px]">
                            {item.designation || "Untitled Role"}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                            <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                            <span>{item.location || "Varanasi"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">
                          {item.department || "-"}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="px-8 py-6 text-gray-500 font-semibold whitespace-nowrap">
                      {item.postedOn || "-"}
                    </td>
                    <td className="px-8 py-6 text-gray-500 font-semibold whitespace-nowrap">
                      {item.lastDate || "-"}
                    </td>

                    {/* Positions */}
                    <td className="px-8 py-6 text-center text-gray-700 font-bold">
                      {item.position || "1"}
                    </td>

                    {/* Applications */}
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-bold text-gray-700">
                          {appCounts[item._id] || 0}
                        </span>
                      </div>
                    </td>

                    {/* Hiring Toggle/Badge */}
                    <td
                      className="px-8 py-6 text-center whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`px-4 py-1.5 rounded-full inline-flex items-center justify-center border font-extrabold text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                          item.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-100 shadow-sm"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {item.isActive !== false ? "Hiring" : "Closed"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td
                      className="px-8 py-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin-dashboard/careers/action?id=${item._id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-2xl mb-6 scale-90 opacity-40">
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

      {/* ─── Details Slide-Out Drawer ─── */}
      {selectedCareer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[90] transition-opacity duration-300"
            onClick={() => setSelectedCareer(null)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-out border-l border-gray-100 flex flex-col animate-in slide-in-from-right">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="min-w-0 flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                    {selectedCareer.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                    {selectedCareer.location || "Varanasi"}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase leading-tight truncate">
                  {selectedCareer.designation || "Untitled Role"}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCareer(null)}
                className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Stats Panel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Openings
                  </span>
                  <span className="text-xl font-extrabold text-gray-800">
                    {selectedCareer.position || "1"} Position(s)
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Applications
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-extrabold text-gray-800">
                      {appCounts[selectedCareer._id] || 0} Submitted
                    </span>
                    {(appCounts[selectedCareer._id] || 0) > 0 && (
                      <Link
                        href={`/admin-dashboard/applications?position=${encodeURIComponent(
                          selectedCareer.designation
                        )}`}
                        className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata Details */}
              <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 overflow-hidden bg-white shadow-xs">
                <div className="flex items-center justify-between p-4 text-sm font-semibold">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    Department
                  </span>
                  <span className="text-gray-800">
                    {selectedCareer.department || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 text-sm font-semibold">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    Posted On
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{selectedCareer.postedOn || "-"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 text-sm font-semibold">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    Deadline Date
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{selectedCareer.lastDate || "-"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 text-sm font-semibold">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    Hiring Status
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                        selectedCareer.isActive !== false
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {selectedCareer.isActive !== false ? "Hiring" : "Closed"}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedCareer.isActive !== false}
                        onChange={() => handleToggleActive(selectedCareer)}
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Job Description (Prose HTML) */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest block">
                  Job Description & Requirements
                </h4>
                <div className="p-5 bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                  {selectedCareer.description ? (
                    <div
                      className="prose prose-sm prose-slate max-w-none text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: selectedCareer.description,
                      }}
                    />
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No description has been uploaded for this vacancy.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-gray-100 flex items-center gap-3 bg-gray-50/50">
              <Link
                href={`/admin-dashboard/careers/action?id=${selectedCareer._id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all active:scale-95"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Role</span>
              </Link>
              <button
                onClick={() => setDeleteConfirmId(selectedCareer._id)}
                className="px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold text-sm border border-red-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Delete Job Posting
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Are you sure you want to delete this job posting? This action
                cannot be undone and will remove the listing from the public
                site.
              </p>
            </div>
            <div className="flex bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <div className="w-px bg-gray-200"></div>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
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
          <Loader2 className="w-14 h-14 animate-spin text-blue-600" />
        </div>
      }
    >
      <CareerList />
    </Suspense>
  );
}
