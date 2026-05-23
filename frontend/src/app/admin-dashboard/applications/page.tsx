"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  User,
  Mail,
  Phone,
  Calendar,
  X,
  MapPin,
  FileText,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Printer,
  AlertTriangle,
  Check,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import Link from "next/link";

import { CareerItem } from "@/lib/api";

interface Application {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  nationality: string;
  identificationType: string;
  address?: string;
  location?: string;
  resumeUrl: string;
  photoUrl?: string;
  appliedFor?: Partial<CareerItem>;
  createdAt: string;
  status: string;
  isRead?: boolean;
  isStarred?: boolean;
}

export default function JobPortalPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Primary");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 25;

  const authHeader = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api-backend/applications", {
        headers: authHeader(),
      });
      if (!resp.ok) throw new Error("Failed to fetch applications");
      const data = await resp.json();
      setApplications(data);
    } catch (err: any) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pos = params.get("position");
      if (pos) {
        setFilterPosition(pos);
      }
    }
  }, []);

  const handleSelectApp = async (app: Application) => {
    setSelectedApp(app);
    if (!app.isRead) {
      try {
        const resp = await fetch(`/api-backend/applications/${app._id}/read`, {
          method: "PATCH",
          headers: authHeader(),
          body: JSON.stringify({ isRead: true }),
        });
        if (resp.ok) {
          setApplications((prev) =>
            prev.map((a) => (a._id === app._id ? { ...a, isRead: true } : a)),
          );
          mutate("/api-backend/applications?isRead=false");
        }
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const resp = await fetch(`/api-backend/applications/${id}/status`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (resp.ok) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
        );
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

  const bulkUpdateStatus = async (newStatus: string) => {
    if (!selectedIds.length) return;
    let successCount = 0;
    for (const id of selectedIds) {
      try {
        const resp = await fetch(`/api-backend/applications/${id}/status`, {
          method: "PATCH",
          headers: authHeader(),
          body: JSON.stringify({ status: newStatus }),
        });
        if (resp.ok) {
          successCount++;
          setApplications((prev) =>
            prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
          );
        }
      } catch { /* continue */ }
    }
    toast.success(`${successCount} application(s) marked as ${newStatus}`);
    setSelectedIds([]);
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Mobile", "Applied For", "Status", "Date", "Location", "Gender", "Nationality"];
    const rows = filteredApps.map((a) => [
      a.name,
      a.email,
      a.mobile,
      a.appliedFor?.designation || "General",
      a.status || "Applied",
      new Date(a.createdAt).toLocaleDateString("en-IN"),
      a.location || "",
      a.gender || "",
      a.nationality || "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const promptDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId === "bulk") {
      try {
        setLoading(true);
        for (const id of selectedIds) {
          await fetch(`/api-backend/applications/${id}`, {
            method: "DELETE",
            headers: authHeader(),
          });
        }
        setApplications((prev) =>
          prev.filter((app) => !selectedIds.includes(app._id)),
        );
        setSelectedIds([]);
        toast.success("Selected applications deleted successfully");
      } catch (err: any) {
        console.error("Error deleting applications:", err);
        toast.error("Failed to delete applications");
      } finally {
        setLoading(false);
        setDeleteConfirmId(null);
      }
      return;
    }

    if (!deleteConfirmId) return;
    try {
      const resp = await fetch(`/api-backend/applications/${deleteConfirmId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (resp.ok) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== deleteConfirmId),
        );
        if (selectedApp?._id === deleteConfirmId) setSelectedApp(null);
        toast.success("Application deleted successfully");
      } else {
        toast.error("Failed to delete application");
      }
    } catch (err: any) {
      console.error("Error deleting application:", err);
      toast.error("Failed to delete application");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const renderDeleteModal = () => {
    if (!deleteConfirmId) return null;
    return (
      <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-sm shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              Delete Application
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Are you sure you want to delete {deleteConfirmId === "bulk" ? "these selected applications" : "this application"}? This action
              cannot be undone.
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
    );
  };

  const uniquePositions = Array.from(
    new Set(applications.map((a) => a.appliedFor?.designation).filter(Boolean))
  ) as string[];

  const hasGeneralApps = applications.some((a) => !a.appliedFor?.designation);

  const filteredApps = applications
    .filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.appliedFor?.designation?.toLowerCase().includes(searchTerm.toLowerCase());

      const appDate = new Date(app.createdAt);
      appDate.setHours(0, 0, 0, 0);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      if (to) to.setHours(23, 59, 59, 999);
      const matchesDate = (!from || appDate >= from) && (!to || appDate <= to);

      const matchesPosition =
        !filterPosition ||
        (filterPosition === "__general__"
          ? !app.appliedFor?.designation
          : app.appliedFor?.designation === filterPosition);

      if (activeTab === "Selected") return matchesSearch && matchesDate && matchesPosition && app.status === "Selected";
      if (activeTab === "Shortlisted") return matchesSearch && matchesDate && matchesPosition && app.status === "Shortlisted";
      if (activeTab === "Rejected") return matchesSearch && matchesDate && matchesPosition && app.status === "Rejected";
      return matchesSearch && matchesDate && matchesPosition;
    })
    .sort((a, b) => {
      if (sortBy === "date-asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "date-desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "status") return (a.status || "").localeCompare(b.status || "");
      return 0;
    });

  const totalPages = Math.ceil(filteredApps.length / PAGE_SIZE);
  const paginatedApps = filteredApps.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Print Styling */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }
            /* Hide EVERYTHING by default */
            html, body, #__next, .min-h-screen {
              height: auto !important;
              background: white !important;
            }
            body > * { visibility: hidden !important; }
            
            /* Show ONLY the print section */
            .print-section, .print-section * { 
              visibility: visible !important; 
            }
            .print-section {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              z-index: 9999 !important;
            }
            .no-print { display: none !important; }
            
            /* Flatten form for professional look */
            .print-card {
              border: 1px solid #ddd !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              max-width: 100% !important;
              width: 100% !important;
            }
            .rounded-3xl, .rounded-[2rem], .rounded-2xl, .rounded-xl, .rounded-lg, .rounded-md { 
              border-radius: 2px !important; 
            }
            
            /* Adjust spacing for A4 height */
            .p-10 { padding: 5mm !important; }
            .gap-12 { gap: 5mm !important; }
            .mb-6 { margin-bottom: 3mm !important; }
          }
        `,
          }}
        />

        {/* Detail Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 no-print">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedApp(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedApp.name}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Applied for:{" "}
                {selectedApp.appliedFor?.designation || "General Posting"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-4 h-4" /> Print A4 Form
            </button>
            <button
              onClick={(e) => promptDelete(selectedApp._id, e)}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-red-100 transition-all border border-red-100/50"
            >
              <Trash2 className="w-4 h-4" /> Delete Profile
            </button>
          </div>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/20 p-4 md:p-8 print-section">
          <div className="max-w-4xl mx-auto bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden print-card">
            {/* Professional Clean Header */}
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row items-start md:items-center gap-6 relative">


              <div className="relative z-10 flex-1">
                <div className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-sm mb-2">
                  Job Applicant Profile
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                  {selectedApp.name}
                </h3>
                <p className="text-base font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                  {selectedApp.appliedFor?.designation ||
                    "Medical Staff Candidate"}
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-sm border border-gray-100/50">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      {selectedApp.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-sm border border-gray-100/50">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      {selectedApp.mobile}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10 no-print">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Candidate Status
                </label>
                <select
                  value={selectedApp.status || "Applied"}
                  onChange={(e) => updateStatus(selectedApp._id, e.target.value)}
                  className={`px-4 py-2.5 rounded-sm font-bold text-sm border outline-none appearance-none cursor-pointer pr-10 transition-colors
                    ${selectedApp.status === "Selected" ? "bg-green-50 text-green-700 border-green-200" :
                      selectedApp.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                      selectedApp.status === "Shortlisted" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  `}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Personal Identification
                    </h4>
                  </div>
                  <div className="grid gap-4">
                    <InfoRow label="Gender" value={selectedApp.gender} />
                    <InfoRow
                      label="Nationality"
                      value={selectedApp.nationality}
                    />
                    <InfoRow
                      label="Identity Proof"
                      value={selectedApp.identificationType}
                    />
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Communication Address
                    </h4>
                  </div>
                  <div className="p-5 bg-gray-50/30 rounded-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                      {selectedApp.address}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Current City
                      </p>
                      <p className="text-sm font-bold text-blue-600 uppercase">
                        {selectedApp.location || "Varanasi Area"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Application Status
                    </h4>
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-sm border border-blue-100">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">
                      Applied For Position
                    </p>
                    <p className="text-lg font-bold text-gray-800 tracking-tight mb-3">
                      {selectedApp.appliedFor?.designation ||
                        "Healthcare Professional"}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-blue-100/50">
                      <div className="text-xs font-semibold text-gray-500">
                        Submit Date
                      </div>
                      <div className="text-xs font-bold text-blue-600">
                        {new Date(selectedApp.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="no-print">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Attachments
                    </h4>
                  </div>
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-sm hover:border-blue-200 hover:bg-blue-50/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white shadow-md shadow-blue-600/10">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          Download Resume
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Applicant's CV Document
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-all" />
                  </a>
                </section>
              </div>
            </div>

            {/* Print Only Disclaimer */}
            <div className="hidden print:block p-8 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                Popular Group of Hospitals • Recruitment Records • Confidential
              </p>
            </div>
          </div>
        </div>
        {renderDeleteModal()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Gmail Inbox Header */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 bg-white z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const visibleIds = filteredApps.map(a => a._id);
                const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.includes(id));
                if (allSelected && visibleIds.length > 0) {
                  setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
                } else {
                  const newIds = new Set([...selectedIds, ...visibleIds]);
                  setSelectedIds(Array.from(newIds));
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            >
              {selectedIds.length > 0 ? (
                <div className="w-5 h-5 border-2 border-blue-600 bg-blue-600 rounded-sm flex items-center justify-center">
                  <div className="w-2.5 h-0.5 bg-white rounded-full"></div>
                </div>
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-sm"></div>
              )}
            </button>
            <button
              onClick={fetchApplications}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            {selectedIds.length > 0 && (
              <>
                <button
                  onClick={() => setDeleteConfirmId("bulk")}
                  className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full transition-colors"
                  title="Delete Selected"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <select
                  defaultValue=""
                  onChange={(e) => { if (e.target.value) { bulkUpdateStatus(e.target.value); e.target.value = ""; } }}
                  className="text-xs font-semibold border border-gray-200 rounded-sm px-2 py-1.5 outline-none bg-white text-gray-600 cursor-pointer"
                  title="Bulk update status"
                >
                  <option value="" disabled>Set status…</option>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <span className="text-xs text-blue-600 font-semibold">{selectedIds.length} selected</span>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 max-w-xl px-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email, position…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 focus:bg-white border-transparent focus:border-gray-200 border rounded-sm outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-sm px-2 py-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setPage(0); }}
              title="From date"
              className="bg-transparent text-xs text-gray-600 outline-none w-[110px] cursor-pointer"
            />
            <span className="text-gray-300 text-xs">–</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(0); }}
              title="To date"
              className="bg-transparent text-xs text-gray-600 outline-none w-[110px] cursor-pointer"
            />
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(""); setDateTo(""); setPage(0); }}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Clear date filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-sm px-2.5 py-1.5 transition-colors"
            title="Export to CSV"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <p className="text-xs text-gray-500 whitespace-nowrap">
            {filteredApps.length}/{applications.length}
          </p>
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="border-b border-gray-100 px-4 py-2 flex items-center gap-3 bg-gray-50/50">
        <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <select
          value={filterPosition}
          onChange={(e) => { setFilterPosition(e.target.value); setPage(0); }}
          className="text-xs font-semibold border border-gray-200 rounded-sm px-2 py-1.5 outline-none bg-white text-gray-600 cursor-pointer max-w-[220px]"
        >
          <option value="">All Positions ({applications.length})</option>
          {uniquePositions.map((p) => (
            <option key={p} value={p}>
              {p} ({applications.filter((a) => a.appliedFor?.designation === p).length})
            </option>
          ))}
          {hasGeneralApps && (
            <option value="__general__">
              General / No Position ({applications.filter((a) => !a.appliedFor?.designation).length})
            </option>
          )}
        </select>
        {filterPosition && (
          <button onClick={() => { setFilterPosition(""); setPage(0); }} className="text-gray-400 hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
            className="text-xs font-semibold border border-gray-200 rounded-sm px-2 py-1.5 outline-none bg-white text-gray-600 cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="status">By Status</option>
          </select>
        </div>
      </div>

      {/* Gmail Tabs */}
      <div className="flex items-center border-b border-gray-200 overflow-x-auto no-scrollbar bg-white sticky top-[53px] z-10">
        <Tab
          icon={<Briefcase />}
          label="Primary"
          active={activeTab === "Primary"}
          onClick={() => { setActiveTab("Primary"); setPage(0); }}
          count={`${applications.filter((a) => !a.isRead).length} new`}
          color="blue"
        />
        <Tab
          icon={<CheckCircle2 />}
          label="Selected"
          active={activeTab === "Selected"}
          onClick={() => { setActiveTab("Selected"); setPage(0); }}
          count={`${applications.filter((a) => a.status === "Selected").length} total`}
          color="green"
        />
        <Tab
          icon={<Briefcase />}
          label="Shortlisted"
          active={activeTab === "Shortlisted"}
          onClick={() => { setActiveTab("Shortlisted"); setPage(0); }}
          count={`${applications.filter((a) => a.status === "Shortlisted").length} total`}
          color="orange"
        />
        <Tab
          icon={<XCircle />}
          label="Rejected"
          active={activeTab === "Rejected"}
          onClick={() => { setActiveTab("Rejected"); setPage(0); }}
          count={`${applications.filter((a) => a.status === "Rejected").length} total`}
          color="red"
        />
      </div>

      {/* Gmail List View */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="py-20 text-center text-gray-400 italic">
            No applications in this category.
          </div>
        ) : (
          <div className="w-full">
            {paginatedApps.map((app) => (
              <div
                key={app._id}
                onClick={() => handleSelectApp(app)}
                className={`flex items-center px-4 py-2 border-b border-gray-100 hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] cursor-pointer group transition-all ${selectedIds.includes(app._id) ? "bg-blue-50/50" : app.isRead ? "bg-[#f2f6fc]/50 text-gray-600" : "bg-white font-bold text-gray-900"}`}
              >
                {/* Icons Area */}
                <div className="flex items-center gap-3 shrink-0 mr-4">
                  <div
                    className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors cursor-pointer ${
                      selectedIds.includes(app._id)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelection(app._id);
                    }}
                  >
                    {selectedIds.includes(app._id) && (
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    )}
                  </div>
                </div>

                {/* Sender Name */}
                <div className="w-48 shrink-0 truncate text-sm">{app.name}</div>

                {/* Subject and Snippet */}
                <div className="flex-1 truncate text-sm">
                  <span className="mr-2">
                    {app.appliedFor?.designation || "Healthcare Application"}
                  </span>
                  <span className="text-gray-500 font-normal">
                    — {app.email} • {app.mobile} •{" "}
                    {app.location || "Local Applicant"}
                  </span>
                </div>

                {/* Date and Status Badge */}
                <div className="flex items-center gap-4 shrink-0 px-2 min-w-[100px] justify-end">
                  {app.status && app.status !== "Applied" && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${
                      app.status === "Selected" ? "bg-green-100 text-green-700" :
                      app.status === "Rejected" ? "bg-red-100 text-red-700" :
                      app.status === "Shortlisted" ? "bg-yellow-100 text-yellow-700" : ""
                    }`}>
                      {app.status}
                    </span>
                  )}
                  <span className="text-xs font-bold whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-white sticky bottom-0">
          <span className="text-xs text-gray-500">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredApps.length)} of {filteredApps.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-sm hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-7 h-7 rounded-sm text-xs font-bold transition-colors ${i === page ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-sm hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {renderDeleteModal()}
    </div>
  );
}

function Tab({ icon, label, active, onClick, count, color }: any) {
  const colors: any = {
    blue: "text-blue-600 border-blue-600",
    green: "text-green-600 border-green-600",
    orange: "text-orange-600 border-orange-600",
    red: "text-red-600 border-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 border-b-4 transition-all hover:bg-gray-50 min-w-[200px] ${active ? colors[color] : "border-transparent text-gray-500"}`}
    >
      <div className={`w-5 h-5 ${active ? "" : "text-gray-400"}`}>{icon}</div>
      <div className="text-left flex-1">
        <div className="text-sm font-bold flex items-center justify-between">
          <span>{label}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? (color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" : color === "red" ? "bg-red-100" : "bg-orange-100") : "bg-gray-100 text-gray-400"}`}
          >
            {count}
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailItem({ label, value, icon }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-sm hover:bg-gray-50 transition-all font-medium border border-transparent hover:border-gray-100">
      <div className="w-10 h-10 rounded-sm bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-blue-100 pl-4 py-1">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-black text-[#0b1c43]">{value}</span>
    </div>
  );
}
