"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Calendar,
  Search,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  AlertTriangle,
  FileText,
  FileSpreadsheet,
  X,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { formatTimeToAmPm } from "@/lib/time";

const API_URL = "/api-backend";

interface Booking {
  _id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  doctor: { _id: string; name: string; slug: string };
  branch: { _id: string; name: string; slug: string };
  slot_date: string;
  slot_time: string;
  status: "pending" | "confirmed" | "done" | "rejected";
  notes: string;
  adminNotes: string;
  isRead: boolean;
  createdAt: string;
}

type TabType = "all" | "unread" | "pending" | "confirmed" | "done" | "rejected";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateYMD(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getTodayYMD(): string {
  return formatDateYMD(new Date().toISOString());
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  done: "Done",
  rejected: "Rejected",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  confirmed: "text-emerald-700 bg-emerald-50 border-emerald-200",
  done: "text-blue-700 bg-blue-50 border-blue-200",
  rejected: "text-red-700 bg-red-50 border-red-200",
};

const STATUS_BTN_STYLES: Record<string, string> = {
  pending: "bg-amber-500 hover:bg-amber-600 text-white",
  confirmed: "bg-emerald-500 hover:bg-emerald-600 text-white",
  done: "bg-blue-500 hover:bg-blue-600 text-white",
  rejected: "bg-red-500 hover:bg-red-600 text-white",
};

const PAGE_SIZE = 20;

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [adminNotesDraft, setAdminNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Booking[] = await res.json();
      setBookings(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab, monthFilter, dateFrom, dateTo]);

  const markAsRead = useCallback(
    async (booking: Booking) => {
      if (booking.isRead) return;
      try {
        const token = sessionStorage.getItem("admin_token");
        await fetch(`${API_URL}/cms/bookings/${booking._id}/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings((prev) =>
          prev.map((b) => (b._id === booking._id ? { ...b, isRead: true } : b))
        );
        mutate("/api-backend/cms/bookings?status=pending");
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  const updateStatus = useCallback(
    async (booking: Booking, newStatus: string) => {
      try {
        const token = sessionStorage.getItem("admin_token");
        const res = await fetch(
          `${API_URL}/cms/bookings/${booking._id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );
        if (!res.ok) throw new Error("Failed to update status");
        const updatedBooking = await res.json();
        setBookings((prev) =>
          prev.map((b) =>
            b._id === booking._id ? { ...b, ...updatedBooking } : b
          )
        );
        if (selected && selected._id === booking._id) {
          setSelected((prev) =>
            prev ? { ...prev, ...updatedBooking } : null
          );
        }
        toast.success(`Status updated to ${STATUS_LABEL[newStatus]}`);
        mutate("/api-backend/cms/bookings?status=pending");
      } catch (e) {
        console.error(e);
        toast.error("Failed to update status");
      }
    },
    [selected]
  );

  const promptDelete = useCallback((id: string) => {
    setDeleteConfirmId(id);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirmId) return;
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/bookings/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBookings((prev) => prev.filter((b) => b._id !== deleteConfirmId));
      if (selected && selected._id === deleteConfirmId) setSelected(null);
      toast.success("Booking deleted successfully");
      mutate("/api-backend/cms/bookings?status=pending");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete booking");
    } finally {
      setDeleteConfirmId(null);
    }
  }, [deleteConfirmId, selected]);

  const handleSelectBooking = useCallback(
    (booking: Booking) => {
      setSelected(booking);
      setAdminNotesDraft(booking.adminNotes || "");
      markAsRead(booking);
    },
    [markAsRead]
  );

  const saveAdminNotes = useCallback(async () => {
    if (!selected) return;
    setNotesSaving(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/bookings/${selected._id}/admin-notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminNotes: adminNotesDraft }),
      });
      if (!res.ok) throw new Error();
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selected._id ? { ...b, adminNotes: adminNotesDraft } : b
        )
      );
      setSelected((prev) => prev ? { ...prev, adminNotes: adminNotesDraft } : null);
      toast.success("Notes saved");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setNotesSaving(false);
    }
  }, [selected, adminNotesDraft]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setMonthFilter("");
    setDateFrom("");
    setDateTo("");
  }, []);

  // Tab counts based on all bookings (no date/search filters)
  const tabCounts = useMemo(() => {
    return {
      all: bookings.length,
      unread: bookings.filter((b) => !b.isRead).length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      done: bookings.filter((b) => b.status === "done").length,
      rejected: bookings.filter((b) => b.status === "rejected").length,
    };
  }, [bookings]);

  const filtered = useMemo(() => {
    let result = bookings;

    // Tab filter
    if (activeTab === "unread") result = result.filter((b) => !b.isRead);
    else if (activeTab === "pending")
      result = result.filter((b) => b.status === "pending");
    else if (activeTab === "confirmed")
      result = result.filter((b) => b.status === "confirmed");
    else if (activeTab === "done")
      result = result.filter((b) => b.status === "done");
    else if (activeTab === "rejected")
      result = result.filter((b) => b.status === "rejected");

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.patient_name.toLowerCase().includes(q) ||
          b.patient_phone.includes(q) ||
          (b.doctor?.name || "").toLowerCase().includes(q) ||
          (b.branch?.name || "").toLowerCase().includes(q)
      );
    }

    // Month filter (YYYY-MM)
    if (monthFilter) {
      result = result.filter((b) => {
        const d = new Date(b.createdAt);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return ym === monthFilter;
      });
    }

    // Date range filter
    if (dateFrom) {
      const from = new Date(dateFrom);
      from.setHours(0, 0, 0, 0);
      result = result.filter((b) => new Date(b.createdAt) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((b) => new Date(b.createdAt) <= to);
    }

    return result;
  }, [bookings, activeTab, search, monthFilter, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = filtered.length > 0 ? (currentPage - 1) * PAGE_SIZE : 0;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const paginatedBookings = filtered.slice(pageStart, pageEnd);

  const hasActiveFilters =
    search !== "" || monthFilter !== "" || dateFrom !== "" || dateTo !== "";

  // Export as CSV
  const exportCSV = useCallback(() => {
    const headers = [
      "Patient Name",
      "Phone",
      "Email",
      "Doctor",
      "Branch",
      "Slot Date",
      "Slot Time",
      "Status",
      "Read",
      "Created At",
    ];
    const rows = filtered.map((b) => [
      b.patient_name,
      b.patient_phone,
      b.patient_email || "",
      b.doctor?.name || "",
      b.branch?.name || "",
      b.slot_date,
      formatTimeToAmPm(b.slot_time),
      STATUS_LABEL[b.status] || b.status,
      b.isRead ? "Yes" : "No",
      formatDate(b.createdAt),
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${getTodayYMD()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }, [filtered]);

  // Export as PDF (print)
  const exportPDF = useCallback(() => {
    const rows = filtered
      .map(
        (b, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${b.patient_name}</strong><br/><small>${b.patient_phone}</small></td>
        <td>${b.doctor?.name || "-"}</td>
        <td>${b.branch?.name || "-"}</td>
        <td>${b.slot_date}<br/><small>${formatTimeToAmPm(b.slot_time)}</small></td>
        <td><span class="status-badge status-${b.status}">${STATUS_LABEL[b.status] || b.status}</span></td>
        <td>${formatDate(b.createdAt)}</td>
      </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Bookings Report - ${getTodayYMD()}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #1a1a1a; padding: 24px; }
    h1 { color: #0b1c43; font-size: 18px; margin-bottom: 4px; }
    .meta { color: #666; font-size: 11px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #0b1c43; color: white; padding: 8px 10px; text-align: left; font-size: 11px; }
    td { padding: 7px 10px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    tr:nth-child(even) td { background: #f9fafb; }
    .status-badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; }
    .status-pending { background: #fef3c7; color: #92400e; }
    .status-confirmed { background: #d1fae5; color: #065f46; }
    .status-done { background: #dbeafe; color: #1e40af; }
    .status-rejected { background: #fee2e2; color: #991b1b; }
    @media print {
      body { padding: 0; }
      @page { margin: 1.5cm; }
    }
  </style>
</head>
<body>
  <h1>Popular Hospital - Bookings Report</h1>
  <p class="meta">Generated on ${new Date().toLocaleString("en-IN")} &nbsp;|&nbsp; Total: ${filtered.length} bookings &nbsp;|&nbsp; Filter: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</p>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Branch</th>
        <th>Appointment</th>
        <th>Status</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <script>window.onload = function() { window.print(); };<\/script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }, [filtered, activeTab]);

  const TABS: { key: TabType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "rejected", label: "Rejected" },
  ];

  const TAB_BADGE_COLOR: Record<TabType, string> = {
    all: "bg-gray-500 text-white",
    unread: "bg-blue-500 text-white",
    pending: "bg-amber-500 text-white",
    confirmed: "bg-emerald-500 text-white",
    done: "bg-blue-400 text-white",
    rejected: "bg-red-500 text-white",
  };

  // ─── Detail View ────────────────────────────────────────────────────────────
  if (selected) {
    return (
      <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
        {/* Detail header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </button>
          <button
            onClick={() => {
              if (selected.status !== "pending") promptDelete(selected._id);
            }}
            disabled={selected.status === "pending"}
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              selected.status === "pending"
                ? "text-gray-300 cursor-not-allowed"
                : "text-red-600 hover:bg-red-50 cursor-pointer"
            }`}
            title={
              selected.status === "pending"
                ? "Cannot delete pending booking"
                : "Delete Booking"
            }
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Detail body */}
        <div className="flex-1 overflow-y-auto bg-gray-50/40 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#0b1c43]/10 text-[#0b1c43] flex items-center justify-center shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selected.patient_name}
                  </h2>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[selected.status]}`}
                  >
                    {STATUS_LABEL[selected.status]}
                  </span>
                  {!selected.isRead && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      Unread
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selected.patient_phone}
                  </span>
                  {selected.patient_email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selected.patient_email}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0 mt-1">
                {formatDate(selected.createdAt)}
              </span>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Appointment Details
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-4.5 h-4.5 text-indigo-500" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                        Date
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.slot_date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Clock className="w-4.5 h-4.5 text-teal-500" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                        Time
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {formatTimeToAmPm(selected.slot_time)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Hospital Info
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4.5 h-4.5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                        Doctor
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.doctor?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                        Branch
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.branch?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selected.notes && (
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mb-6">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2">
                  Patient Notes
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {selected.notes}
                </p>
              </div>
            )}

            {/* Status actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                Update Status
              </div>
              <div className="flex flex-wrap gap-3">
                {(["pending", "confirmed", "rejected"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(selected, st)}
                    disabled={selected.status === st}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      selected.status === st
                        ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                        : `${STATUS_BTN_STYLES[st]} border-transparent shadow-sm hover:shadow-md`
                    }`}
                  >
                    {selected.status === st
                      ? `Current: ${STATUS_LABEL[st]}`
                      : `Mark as ${STATUS_LABEL[st]}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Internal Admin Notes
                </div>
                {selected.adminNotes && adminNotesDraft === selected.adminNotes && (
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">
                    Saved
                  </span>
                )}
              </div>
              <textarea
                value={adminNotesDraft}
                onChange={(e) => setAdminNotesDraft(e.target.value)}
                placeholder="Add internal notes about this booking — e.g. patient called, rescheduling requested, follow-up required..."
                rows={4}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:bg-white outline-none text-sm text-gray-700 leading-relaxed resize-none transition-all"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-gray-400">
                  {adminNotesDraft.length}/2000
                </span>
                <button
                  onClick={saveAdminNotes}
                  disabled={notesSaving || adminNotesDraft === (selected.adminNotes || "")}
                  className="px-5 py-2 rounded-xl text-sm font-bold bg-[#0b1c43] text-white hover:bg-[#162d6b] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {notesSaving ? "Saving…" : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete confirm modal */}
        {deleteConfirmId && (
          <DeleteModal
            onCancel={() => setDeleteConfirmId(null)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    );
  }

  // ─── List View ──────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      {/* ── Tabs ── */}
      <div className="flex items-center gap-0.5 px-4 pt-3 pb-0 border-b border-gray-100 bg-white overflow-x-auto">
        {TABS.map((tab) => {
          const count = tabCounts[tab.key];
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-[#0b1c43] text-[#0b1c43] bg-blue-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    isActive
                      ? TAB_BADGE_COLOR[tab.key]
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
        {/* Spacer + Export */}
        <div className="ml-auto flex items-center gap-2 pb-1 pl-4">
          <button
            onClick={exportCSV}
            title="Export CSV"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Excel
          </button>
          <button
            onClick={exportPDF}
            title="Export PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/60">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, doctor, branch…"
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43]/50 outline-none transition-all"
          />
        </div>

        {/* Month picker */}
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium whitespace-nowrap">
            Month:
          </label>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setDateFrom("");
              setDateTo("");
            }}
            disabled={!!(dateFrom || dateTo)}
            className="text-sm px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43]/50 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium">From:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setMonthFilter("");
            }}
            disabled={!!monthFilter}
            className="text-sm px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43]/50 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium">To:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setMonthFilter("");
            }}
            disabled={!!monthFilter}
            min={dateFrom || undefined}
            className="text-sm px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43]/50 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          />
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}

        {/* Pagination info + controls */}
        <div className="ml-auto flex items-center gap-1 text-gray-500">
          <button
            onClick={fetchBookings}
            title="Refresh"
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <span className="text-xs font-medium text-gray-400 mx-1">
            {filtered.length > 0 ? `${pageStart + 1}–${pageEnd}` : "0"} of{" "}
            {filtered.length}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50/30">
          <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-white divide-y divide-gray-100">
          {paginatedBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-[15px] font-medium text-gray-500">
                No bookings found
              </p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            paginatedBookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                onSelect={handleSelectBooking}
                onStatusChange={updateStatus}
                onDelete={promptDelete}
              />
            ))
          )}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirmId && (
        <DeleteModal
          onCancel={() => setDeleteConfirmId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

// ─── BookingRow sub-component ────────────────────────────────────────────────
function BookingRow({
  booking,
  onSelect,
  onStatusChange,
  onDelete,
}: {
  booking: Booking;
  onSelect: (b: Booking) => void;
  onStatusChange: (b: Booking, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(booking)}
      className={`group flex flex-col sm:flex-row sm:items-center px-4 py-3 cursor-pointer transition-all border-l-4 hover:bg-blue-50/40 ${
        !booking.isRead
          ? "border-l-blue-500 bg-blue-50/20"
          : "border-l-transparent bg-white"
      }`}
    >
      {/* Patient name column */}
      <div className="flex items-center gap-3 sm:w-[220px] sm:shrink-0 mb-1 sm:mb-0">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${
            !booking.isRead ? "bg-blue-500" : "bg-transparent"
          }`}
        />
        <span
          className={`truncate text-sm tracking-tight ${
            !booking.isRead
              ? "font-bold text-gray-900"
              : "font-medium text-gray-700"
          }`}
        >
          {booking.patient_name}
        </span>
      </div>

      {/* Middle info */}
      <div className="flex-1 min-w-0 text-[13px] text-gray-500 sm:pr-4 ml-5 sm:ml-0">
        <span className="text-[#0d9488] font-semibold mr-2">
          {booking.slot_date} · {formatTimeToAmPm(booking.slot_time)}
        </span>
        <span className="text-gray-400">
          {booking.doctor?.name || "—"} @ {booking.branch?.name || "—"}
        </span>
        <div className="sm:hidden text-xs mt-0.5 text-gray-400">
          {booking.patient_phone}
        </div>
      </div>

      {/* Right controls */}
      <div
        className="hidden sm:flex items-center gap-3 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Phone */}
        <span className="text-xs text-gray-400 font-medium hidden lg:inline w-28 text-right">
          {booking.patient_phone}
        </span>

        {/* Status dropdown */}
        <select
          value={booking.status}
          onChange={(e) => onStatusChange(booking, e.target.value)}
          className={`text-[11px] font-bold border rounded-lg px-2.5 py-1 outline-none appearance-none cursor-pointer transition-colors ${STATUS_STYLES[booking.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Delete button */}
        <button
          onClick={() => {
            if (booking.status !== "pending") onDelete(booking._id);
          }}
          disabled={booking.status === "pending"}
          title={
            booking.status === "pending"
              ? "Cannot delete pending booking"
              : "Delete"
          }
          className={`p-1.5 rounded-lg transition-all ${
            booking.status === "pending"
              ? "text-gray-200 cursor-not-allowed"
              : "text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Created date */}
        <span className="text-[11px] text-gray-400 font-medium w-20 text-right whitespace-nowrap">
          {formatDate(booking.createdAt)}
        </span>
      </div>

      {/* Mobile status + date */}
      <div className="flex items-center justify-between sm:hidden mt-1.5 ml-5">
        <span
          className={`text-[11px] font-bold border rounded-md px-2 py-0.5 ${STATUS_STYLES[booking.status]}`}
        >
          {STATUS_LABEL[booking.status]}
        </span>
        <span className="text-[11px] text-gray-400">
          {formatDate(booking.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ─── DeleteModal sub-component ───────────────────────────────────────────────
function DeleteModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Delete Booking
          </h3>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete this appointment? This action cannot
            be undone.
          </p>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
