"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Mail,
  MailOpen,
  Search,
  RefreshCw,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Building2,
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  MoreVertical,
  Trash2,
  Archive,
  Star,
  Square,
  ChevronLeft,
  ChevronRight,
  Settings,
  Grid,
  Globe,
  AlertTriangle,
  X,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const API_URL = "/api-backend";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timing: string;
  department: string;
  location: string;
  message: string;
  agreedToTerms: boolean;
  status: "new" | "read";
  isInternational: boolean;
  age?: string;
  country?: string;
  createdAt: string;
}

function formatGmailDate(dateStr: string): string {
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

export default function GmailContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"primary" | "unread" | "read">(
    "primary",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const PAGE_SIZE = 10;

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Contact[] = await res.json();
      setContacts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab, monthFilter, dateFrom, dateTo]);

  const markAsRead = async (contact: Contact) => {
    if (contact.status === "read") return;
    try {
      const token = sessionStorage.getItem("admin_token");
      await fetch(`${API_URL}/contacts/${contact._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "read" }),
      });
      setContacts((prev) =>
        prev.map((c) => (c._id === contact._id ? { ...c, status: "read" } : c)),
      );
      mutate("/api-backend/contacts?status=new");
    } catch (e) {
      console.error(e);
    }
  };

  const promptDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/contacts/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");

      setContacts((prev) => prev.filter((c) => c._id !== deleteConfirmId));
      if (selected?._id === deleteConfirmId) setSelected(null);
      toast.success("Contact deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete contact");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleSelect = (contact: Contact) => {
    setSelected(contact);
    markAsRead(contact);
  };

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search);
      const matchTab =
        activeTab === "primary"
          ? true
          : c.status === (activeTab === "unread" ? "new" : "read");
      let matchMonth = true;
      if (monthFilter) {
        const d = new Date(c.createdAt);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        matchMonth = ym === monthFilter;
      }
      let matchFrom = true;
      if (dateFrom) {
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        matchFrom = new Date(c.createdAt) >= from;
      }
      let matchTo = true;
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        matchTo = new Date(c.createdAt) <= to;
      }
      return matchSearch && matchTab && matchMonth && matchFrom && matchTo;
    });
  }, [contacts, search, activeTab, monthFilter, dateFrom, dateTo]);

  const hasActiveFilters = monthFilter !== "" || dateFrom !== "" || dateTo !== "";

  const getTodayYMD = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const exportCSV = useCallback(() => {
    const headers = ["Name", "Email", "Phone", "Department", "Location", "Preferred Date", "Timing", "Message", "Status", "International", "Country", "Age", "Received At"];
    const rows = filtered.map((c) => [
      c.name, c.email, c.phone, c.department || "", c.location || "",
      c.date ? new Date(c.date).toLocaleDateString("en-IN") : "",
      c.timing || "", c.message || "",
      c.status === "new" ? "Unread" : "Read",
      c.isInternational ? "Yes" : "No",
      c.country || "", c.age || "",
      new Date(c.createdAt).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `contacts_${getTodayYMD()}.csv`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }, [filtered]);

  const exportPDF = useCallback(() => {
    const rows = filtered.map((c, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${c.name}</strong><br/><small>${c.email}</small></td>
        <td>${c.phone}</td>
        <td>${c.department || "-"}</td>
        <td>${c.location || "-"}</td>
        <td>${c.date ? new Date(c.date).toLocaleDateString("en-IN") : "-"}<br/><small>${c.timing || ""}</small></td>
        <td><span class="badge badge-${c.status === "new" ? "new" : "read"}">${c.status === "new" ? "Unread" : "Read"}</span>${c.isInternational ? ' <span class="badge badge-intl">Intl</span>' : ""}</td>
        <td>${new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
      </tr>`).join("");
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Contacts Report</title>
      <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,sans-serif;font-size:11px;padding:24px}
      h1{color:#0b1c43;font-size:16px;margin-bottom:4px}.meta{color:#666;font-size:10px;margin-bottom:16px}
      table{width:100%;border-collapse:collapse}th{background:#0b1c43;color:white;padding:7px 8px;text-align:left;font-size:10px}
      td{padding:6px 8px;border-bottom:1px solid #e5e7eb;vertical-align:top}tr:nth-child(even) td{background:#f9fafb}
      .badge{display:inline-block;padding:1px 6px;border-radius:999px;font-size:9px;font-weight:700}
      .badge-new{background:#fef3c7;color:#92400e}.badge-read{background:#d1fae5;color:#065f46}.badge-intl{background:#ffedd5;color:#9a3412}
      @media print{body{padding:0}@page{margin:1.5cm}}</style></head>
      <body><h1>Popular Hospital — Contacts Report</h1>
      <p class="meta">Generated: ${new Date().toLocaleString("en-IN")} | Total: ${filtered.length}</p>
      <table><thead><tr><th>#</th><th>Name / Email</th><th>Phone</th><th>Department</th><th>Location</th><th>Preferred Date</th><th>Status</th><th>Received</th></tr></thead>
      <tbody>${rows}</tbody></table>
      <script>window.onload=function(){window.print();}<\/script></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = filtered.length > 0 ? (currentPage - 1) * PAGE_SIZE : 0;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const paginatedContacts = filtered.slice(pageStart, pageEnd);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-1 text-gray-500">
          {selected ? (
            <button
              onClick={() => setSelected(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2 text-gray-700"
              title="Back to inbox"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Square className="w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={fetchContacts}
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
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <Archive className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => promptDelete(selected._id)}
                className="p-2 hover:bg-gray-100 rounded-md text-red-500"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <Mail className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in contacts"
              className="w-48 sm:w-64 pl-10 pr-3 py-1.5 text-sm bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 focus:shadow-md transition-all outline-none"
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
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      {!selected && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 font-medium whitespace-nowrap">Month:</label>
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => { setMonthFilter(e.target.value); setDateFrom(""); setDateTo(""); }}
              disabled={!!(dateFrom || dateTo)}
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 font-medium">From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setMonthFilter(""); }}
              disabled={!!monthFilter}
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 font-medium">To:</label>
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => { setDateTo(e.target.value); setMonthFilter(""); }}
              disabled={!!monthFilter}
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => { setMonthFilter(""); setDateFrom(""); setDateTo(""); }}
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
            <button onClick={exportPDF} className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>
      )}

      {/* Main Area */}
      {!selected ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Gmail Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("primary")}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all border-b-4 ${activeTab === "primary" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <Grid className="w-4 h-4" /> Primary
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all border-b-4 ${activeTab === "unread" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <Mail className="w-4 h-4" /> Unread
            </button>
            <button
              onClick={() => setActiveTab("read")}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-semibold transition-all border-b-4 ${activeTab === "read" ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <MailOpen className="w-4 h-4" /> Responded
            </button>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                <p>Loading messages...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Mail className="w-12 h-12 mb-2 opacity-20" />
                <p>Your inbox is empty</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-50">
                {paginatedContacts.map((contact) => {
                  const isNew = contact.status === "new";
                  return (
                    <div
                      key={contact._id}
                      onClick={() => handleSelect(contact)}
                      className={`group flex items-center px-4 py-2 border-b hover:shadow-md transition-all cursor-pointer ${
                        isNew
                          ? "bg-white font-bold"
                          : "bg-gray-50/50 font-normal opacity-85"
                      } ${
                        contact.isInternational
                          ? "border-l-4 border-[#FF6B00] bg-orange-50/40"
                          : "border-l-4 border-transparent"
                      }`}
                    >
                      {/* Checkbox & Star */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Square
                          className={`w-4 h-4 text-gray-300 group-hover:text-gray-400`}
                        />
                        <Star
                          className={`w-4 h-4 text-gray-300 group-hover:text-gray-400 hover:text-yellow-400`}
                        />
                      </div>

                      {/* Name */}
                      <div
                        className={`w-32 sm:w-48 shrink-0 truncate text-sm ${isNew ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {contact.name || "Anonymous Patient"}
                      </div>

                      {/* Preview */}
                      <div className="flex-1 min-w-0 truncate text-sm flex items-center gap-2">
                        <div className="flex-1 truncate">
                          <span
                            className={
                              isNew ? "text-gray-900" : "text-gray-800"
                            }
                          >
                            Appointment Request:{" "}
                            {contact.department || "General Inquiry"}
                          </span>
                          <span className="text-gray-500 ml-2 font-normal">
                            -{" "}
                            {contact.message
                              ? contact.message.substring(0, 100)
                              : "New appointment contact details submitted..."}
                          </span>
                        </div>
                        {contact.isInternational && (
                          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-[10px] font-black uppercase rounded-full shadow-md border border-orange-400/30 scale-105">
                            <Globe className="w-3.5 h-3.5" />
                            <span>International</span>
                          </div>
                        )}
                      </div>

                      {/* Date & Hover Actions */}
                      <div className="w-28 shrink-0 flex items-center justify-end h-full">
                        <div
                          className={`text-xs ${isNew ? "text-gray-900 font-bold" : "text-gray-500"} group-hover:hidden transition-opacity`}
                        >
                          {formatGmailDate(contact.createdAt)}
                        </div>
                        <div className="hidden group-hover:flex items-center gap-1 px-1">
                          <button
                            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              promptDelete(contact._id);
                            }}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            title="Snooze"
                          >
                            <Clock className="w-4 h-4 text-gray-500" />
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
        /* Detailed Message View */
        <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Subject Area */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-normal text-gray-800 flex items-center gap-3">
                New Appointment Request — {selected.name}
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                  Inbox
                </span>
                {selected.isInternational && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-[11px] font-black uppercase rounded-full shadow-md">
                    <Globe className="w-3.5 h-3.5" />
                    International Patient
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2 text-gray-500">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* Sender Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#0b1c43] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {selected.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        &lt;{selected.email}&gt;
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(selected.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 cursor-default">
                    to me <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Content Body - Gmail Formatted */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-100">
                  Appointment Request Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 mb-10">
                  <DetailRow label="Patient Name" value={selected.name} />
                  <DetailRow
                    label="Phone Number"
                    value={selected.phone}
                    isPhone
                  />
                  <DetailRow
                    label="Preferred Date"
                    value={
                      selected.date
                        ? new Date(selected.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "Not specified"
                    }
                  />
                  <DetailRow
                    label="Timing Slot"
                    value={selected.timing || "Not specified"}
                  />
                  <DetailRow
                    label="Department"
                    value={selected.department || "Not specified"}
                  />
                  <DetailRow
                    label="Branch/Location"
                    value={selected.location || "Not specified"}
                  />
                  {selected.isInternational && (
                    <>
                      <DetailRow
                        label="Country"
                        value={selected.country || "Not specified"}
                      />
                      <DetailRow
                        label="Age"
                        value={selected.age || "Not specified"}
                      />
                    </>
                  )}
                </div>

                {selected.message && (
                  <div className="mt-10 pt-10 border-t border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                      Patient Message
                    </p>
                    <div className="text-gray-800 leading-[1.8] text-base whitespace-pre-wrap font-serif italic text-lg px-2 border-l-4 border-blue-100">
                      {selected.message}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 mb-20">
                <a
                  href={`mailto:${selected.email}?subject=RE: Appointment Request — Popular Hospitals&body=Dear ${selected.name},%0A%0AWe have received your appointment request...`}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Reply
                </a>
                <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronRight className="w-4 h-4 ml-1" /> Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Delete Contact
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Are you sure you want to delete this contact? This action cannot
                be undone.
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

function DetailRow({
  label,
  value,
  isPhone = false,
}: {
  label: string;
  value: string;
  isPhone?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 opacity-70">
        {label}
      </p>
      {isPhone ? (
        <a
          href={`tel:${value}`}
          className="text-blue-600 font-semibold text-lg hover:underline transition-all decoration-blue-200 underline-offset-4"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900 font-semibold text-lg">{value}</p>
      )}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
