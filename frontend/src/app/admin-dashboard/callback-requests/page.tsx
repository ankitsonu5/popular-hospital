"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Phone,
  Search,
  RefreshCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Square,
  MoreVertical,
  AlertTriangle,
  PhoneCall,
  PhoneIncoming,
  CheckCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const API_URL = "/api-backend";

interface CallbackRequest {
  _id: string;
  name: string;
  phone: string;
  department: string;
  status: "new" | "read";
  createdAt: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export default function CallbackRequestsPage() {
  const [requests, setRequests] = useState<CallbackRequest[]>([]);
  const [selected, setSelected] = useState<CallbackRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "new" | "read">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const PAGE_SIZE = 10;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/callback-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: CallbackRequest[] = await res.json();
      setRequests(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load callback requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  const markAsRead = async (req: CallbackRequest) => {
    if (req.status === "read") return;
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`${API_URL}/callback-requests/${req._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "read" }),
      });
      setRequests((prev) =>
        prev.map((r) => (r._id === req._id ? { ...r, status: "read" } : r)),
      );
      mutate("/api-backend/callback-requests?status=new");
    } catch (e) {
      console.error(e);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(
        `${API_URL}/callback-requests/${deleteConfirmId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Failed to delete");
      setRequests((prev) => prev.filter((r) => r._id !== deleteConfirmId));
      if (selected?._id === deleteConfirmId) setSelected(null);
      toast.success("Deleted successfully");
    } catch (e) {
      toast.error("Failed to delete");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleSelect = (req: CallbackRequest) => {
    setSelected(req);
    markAsRead(req);
  };

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.department.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" ? true : r.status === activeTab;
    return matchSearch && matchTab;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = filtered.length > 0 ? (currentPage - 1) * PAGE_SIZE : 0;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const paginated = filtered.slice(pageStart, pageEnd);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-1 text-gray-500">
          {selected ? (
            <button
              onClick={() => setSelected(null)}
              className="p-2 hover:bg-gray-100 rounded-full mr-2 text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Square className="w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={fetchRequests}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          )}
          {selected && (
            <div className="flex items-center gap-1 border-l pl-2 ml-1">
              <button
                onClick={() => setDeleteConfirmId(selected._id)}
                className="p-2 hover:bg-red-50 rounded-md text-red-500"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone..."
              className="w-48 sm:w-64 pl-10 pr-3 py-1.5 text-sm bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center text-gray-500">
            <span className="text-xs mr-4 hidden sm:inline">
              {filtered.length > 0 ? `${pageStart + 1}-${pageEnd}` : "0"} of{" "}
              {filtered.length}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!selected ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-4 transition-all ${activeTab === "all" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <PhoneCall className="w-4 h-4" /> All Requests
              <span className="ml-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {requests.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-4 transition-all ${activeTab === "new" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <PhoneIncoming className="w-4 h-4" /> New
              <span className="ml-1 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {requests.filter((r) => r.status === "new").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("read")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold border-b-4 transition-all ${activeTab === "read" ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <CheckCheck className="w-4 h-4" /> Called Back
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                <p>Loading requests...</p>
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Phone className="w-12 h-12 mb-2 opacity-20" />
                <p>No callback requests found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {paginated.map((req) => {
                  const isNew = req.status === "new";
                  return (
                    <div
                      key={req._id}
                      onClick={() => handleSelect(req)}
                      className={`group flex items-center px-4 py-3 border-l-4 hover:shadow-md transition-all cursor-pointer ${
                        isNew
                          ? "bg-white font-bold border-[#e11d48]"
                          : "bg-gray-50/50 font-normal opacity-80 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 shrink-0 mr-3">
                        <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                      </div>

                      <div
                        className={`w-36 sm:w-48 shrink-0 truncate text-sm ${isNew ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {req.name}
                      </div>

                      <div className="flex-1 min-w-0 flex items-center gap-3 text-sm truncate">
                        <span className="flex items-center gap-1.5 text-gray-600 shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                          <a
                            href={`tel:${req.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline"
                          >
                            {req.phone}
                          </a>
                        </span>
                        {req.department && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium shrink-0">
                            {req.department}
                          </span>
                        )}
                      </div>

                      <div className="w-28 shrink-0 flex items-center justify-end">
                        <div
                          className={`text-xs group-hover:hidden ${isNew ? "text-gray-900 font-bold" : "text-gray-500"}`}
                        >
                          {formatDate(req.createdAt)}
                        </div>
                        <div className="hidden group-hover:flex items-center gap-1 px-1">
                          <button
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmId(req._id);
                            }}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Detail View */
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full px-6 py-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-[#e11d48] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selected.name}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Requested on{" "}
                  {new Date(selected.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {selected.status === "new" && (
                <span className="ml-auto px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase">
                  New
                </span>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Patient Name
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  {selected.name}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Phone Number
                </p>
                <a
                  href={`tel:${selected.phone}`}
                  className="text-blue-600 font-semibold text-xl hover:underline flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> {selected.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Department
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  {selected.department || "Not specified"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${selected.phone}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#e11d48] text-white rounded-full text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <button
                onClick={() => setDeleteConfirmId(selected._id)}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-red-500 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Delete Request
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Are you sure you want to delete this callback request? This
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
              <div className="w-px bg-gray-200" />
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
