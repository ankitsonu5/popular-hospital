"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Phone,
  Search,
  RefreshCw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Square,
  CheckSquare,
  MoreVertical,
  AlertTriangle,
  PhoneCall,
  PhoneIncoming,
  CheckCheck,
  X,
  FileSpreadsheet,
  FileText,
  Mail,
  Send,
  Loader2,
  ExternalLink,
  Sparkles,
  Users,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const API_URL = "/api-backend";

interface CallbackRequest {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  department: string;
  source?: string;
  status: "new" | "read";
  createdAt: string;
}

const EMAIL_TEMPLATES = [
  {
    id: "health_tips",
    title: "Healthcare Tips & Wellness Alert",
    subject: "Health & Wellness Updates from Popular Hospital",
    body: `Dear Subscriber,

Thank you for connecting with Popular Hospital Varanasi. We are committed to keeping you and your family informed with timely healthcare guidance and wellness advice.

Our multi super-speciality facility is equipped with 450+ beds, 28+ departments, 24/7 Emergency & Trauma Care, and cashless treatment with all major TPAs.

Need immediate medical advice or consultation?
📞 24/7 Emergency Helpline: +91 7703000088
📍 BLW-B.H.U. Road, Kakarmata, Varanasi
🌐 Visit: https://www.popularhospital.in

Stay Healthy, Stay Safe!
Popular Hospital, Varanasi`,
  },
  {
    id: "consultation",
    title: "Call Back & Consultation Follow-up",
    subject: "Follow-up regarding your enquiry — Popular Hospital Varanasi",
    body: `Dear Patient,

Thank you for reaching out to Popular Hospital. We received your consultation request and our health advisor would like to assist you.

If you are looking to book an appointment or consult with our specialist doctors, please reply to this email or call our direct helpline:
📞 +91 7703000088

Warm regards,
Patient Care Team
Popular Hospital, Varanasi
https://www.popularhospital.in`,
  },
  {
    id: "checkup",
    title: "Special Health Checkup Package",
    subject: "Comprehensive Preventive Health Packages — Popular Hospital",
    body: `Dear Subscriber,

Prioritize your health with our Comprehensive Preventive Health Checkup Packages at Popular Hospital. Early detection and regular screening ensure a healthier tomorrow.

Package includes: Complete Blood Count, Liver & Kidney Profile, Lipid Profile, ECG, Chest X-Ray, and Specialist Doctor Consultation.

To book a slot or know more:
📞 Call: +91 7703000088
🌐 Visit: https://www.popularhospital.in

Popular Hospital — Excellence in Healthcare`,
  },
  {
    id: "custom",
    title: "Custom Message",
    subject: "Healthcare Update — Popular Hospital Varanasi",
    body: "",
  },
];

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
  const [activeTab, setActiveTab] = useState<"all" | "new" | "read" | "subscribers">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Role authorization: ONLY super_admin has delete authority
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("admin_user");
      if (raw) {
        const u = JSON.parse(raw);
        setIsSuperAdmin(u.role === "super_admin" || u.role === "admin");
      }
    } catch {}
  }, []);

  // Multi-select for bulk email sending / actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Email Composer Modal State
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [mailRecipients, setMailRecipients] = useState<string[]>([]);
  const [isMailToAll, setIsMailToAll] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [mailTemplateId, setMailTemplateId] = useState("health_tips");
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [mailError, setMailError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const PAGE_SIZE = 10;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("admin_token");
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
    setSelectedIds([]);
  }, [search, activeTab, monthFilter, dateFrom, dateTo]);

  // All UNIQUE subscriber emails (deduplicated by lowercase string)
  const allSubscriberEmails = useMemo(() => {
    const seen = new Set<string>();
    const uniqueEmails: string[] = [];
    requests.forEach((r) => {
      const emailClean = r.email?.trim().toLowerCase();
      if (emailClean && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
        if (!seen.has(emailClean)) {
          seen.add(emailClean);
          uniqueEmails.push(emailClean);
        }
      }
    });
    return uniqueEmails;
  }, [requests]);

  const subscribersCount = allSubscriberEmails.length;

  const markAsRead = async (req: CallbackRequest) => {
    if (req.status === "read") return;
    try {
      const token = sessionStorage.getItem("admin_token");
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
    if (!isSuperAdmin) {
      toast.error("Only Super Admin can delete records.");
      setDeleteConfirmId(null);
      return;
    }
    if (!deleteConfirmId) return;
    try {
      const token = sessionStorage.getItem("admin_token");
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
      setSelectedIds((prev) => prev.filter((id) => id !== deleteConfirmId));
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

  // Open Mail Modal for specific emails (deduplicated)
  const openMailComposer = (emails: string[]) => {
    const validEmails = Array.from(
      new Set(
        emails
          .map((e) => e?.trim().toLowerCase())
          .filter((e): e is string => Boolean(e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))),
      ),
    );

    if (validEmails.length === 0) {
      toast.error("No valid email address found for selected contact(s).");
      return;
    }

    const defaultTpl = EMAIL_TEMPLATES[0];
    setIsMailToAll(false);
    setMailRecipients(validEmails);
    setMailTemplateId(defaultTpl.id);
    setMailSubject(defaultTpl.subject);
    setMailBody(defaultTpl.body);
    setMailError(null);
    setMailModalOpen(true);
  };

  // Open Mail Modal to Send to ALL Subscribers (strictly deduplicated)
  const handleOpenSendMailToAll = () => {
    if (allSubscriberEmails.length === 0) {
      toast.error("No subscribers with email found yet.");
      return;
    }

    const defaultTpl = EMAIL_TEMPLATES[0];
    setIsMailToAll(true);
    setMailRecipients(allSubscriberEmails);
    setMailTemplateId(defaultTpl.id);
    setMailSubject(defaultTpl.subject);
    setMailBody(defaultTpl.body);
    setMailError(null);
    setMailModalOpen(true);
  };

  const handleTemplateChange = (tplId: string) => {
    setMailTemplateId(tplId);
    const found = EMAIL_TEMPLATES.find((t) => t.id === tplId);
    if (found) {
      setMailSubject(found.subject);
      setMailBody(found.body);
    }
  };

  const copyEmailsToClipboard = () => {
    navigator.clipboard.writeText(mailRecipients.join(", "));
    setIsCopied(true);
    toast.success(`Copied ${mailRecipients.length} unique email(s) to clipboard!`);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    setMailError(null);

    if (!mailSubject.trim() || !mailBody.trim()) {
      toast.error("Subject and message are required.");
      return;
    }
    if (mailRecipients.length === 0) {
      toast.error("No recipients selected.");
      return;
    }

    setIsSendingMail(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/callback-requests/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipients: isMailToAll ? "all" : mailRecipients,
          subject: mailSubject.trim(),
          message: mailBody.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      toast.success(
        isMailToAll
          ? `Email sent successfully to all ${mailRecipients.length} subscribers!`
          : `Email sent successfully to ${mailRecipients.length} recipient(s)!`,
      );
      setMailModalOpen(false);
    } catch (err: any) {
      console.error(err);
      const errMsg = err.message || "Failed to send email";
      setMailError(errMsg);
      toast.error("Email send failed. Check the alert box below for options.");
    } finally {
      setIsSendingMail(false);
    }
  };

  // Filtered requests (with deduplication on Subscribed Emails tab)
  const filtered = useMemo(() => {
    const seenEmails = new Set<string>();

    return requests.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        r.name.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        r.department.toLowerCase().includes(q);

      let matchTab = true;
      if (activeTab === "new") {
        matchTab = r.status === "new";
      } else if (activeTab === "read") {
        matchTab = r.status === "read";
      } else if (activeTab === "subscribers") {
        const emailClean = r.email?.trim().toLowerCase();
        if (!emailClean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
          return false;
        }
        // Deduplicate: Keep only the first/latest occurrence of each unique email
        if (seenEmails.has(emailClean)) {
          return false;
        }
        seenEmails.add(emailClean);
        matchTab = true;
      }

      let matchMonth = true;
      if (monthFilter) {
        const d = new Date(r.createdAt);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        matchMonth = ym === monthFilter;
      }
      let matchFrom = true;
      if (dateFrom) {
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        matchFrom = new Date(r.createdAt) >= from;
      }
      let matchTo = true;
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        matchTo = new Date(r.createdAt) <= to;
      }
      return matchSearch && matchTab && matchMonth && matchFrom && matchTo;
    });
  }, [requests, search, activeTab, monthFilter, dateFrom, dateTo]);

  const hasActiveFilters =
    monthFilter !== "" || dateFrom !== "" || dateTo !== "";

  const getTodayYMD = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const exportCSV = useCallback(() => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Department / Speciality",
      "Status",
      "Source",
      "Received At",
    ];
    const rows = filtered.map((r) => [
      r.name,
      r.phone,
      r.email || "",
      r.department || "",
      r.status === "new" ? "New" : "Called Back",
      r.source === "notification_subscribe"
        ? "Notification Subscribe"
        : r.source || "Callback",
      new Date(r.createdAt).toLocaleString("en-IN"),
    ]);

    const csvContent =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `callback_subscribers_${getTodayYMD()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Excel CSV exported successfully");
  }, [filtered]);

  const exportPDF = useCallback(() => {
    const rows = filtered
      .map(
        (r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${r.name}</strong></td>
        <td>${r.phone}</td>
        <td>${r.email || "-"}</td>
        <td>${r.department || "-"}</td>
        <td><span class="badge badge-${r.status}">${r.status === "new" ? "New" : "Called Back"}</span></td>
        <td>${new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
      </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Callback & Subscribers Report</title>
      <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,sans-serif;font-size:11px;padding:24px}
      h1{color:#0b1c43;font-size:16px;margin-bottom:4px}.meta{color:#666;font-size:10px;margin-bottom:16px}
      table{width:100%;border-collapse:collapse}th{background:#0b1c43;color:white;padding:7px 8px;text-align:left;font-size:10px}
      td{padding:6px 8px;border-bottom:1px solid #e5e7eb;vertical-align:top}tr:nth-child(even) td{background:#f9fafb}
      .badge{display:inline-block;padding:1px 6px;border-radius:999px;font-size:9px;font-weight:700}
      .badge-new{background:#fef3c7;color:#92400e}.badge-read{background:#d1fae5;color:#065f46}
      @media print{body{padding:0}@page{margin:1.5cm}}</style></head>
      <body><h1>Popular Hospital — Callback & Subscribers Report</h1>
      <p class="meta">Generated: ${new Date().toLocaleString("en-IN")} | Total Records: ${filtered.length}</p>
      <table><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Email</th><th>Department / Speciality</th><th>Status</th><th>Received</th></tr></thead>
      <tbody>${rows}</tbody></table>
      <script>window.onload=function(){window.print();}<\/script></body></html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = filtered.length > 0 ? (currentPage - 1) * PAGE_SIZE : 0;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const paginated = filtered.slice(pageStart, pageEnd);

  // Checkbox toggle helpers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map((r) => r._id));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Selected requests with email (strictly deduplicated)
  const selectedEmails = useMemo(() => {
    const set = new Set<string>();
    requests.forEach((r) => {
      if (selectedIds.includes(r._id) && r.email && r.email.trim()) {
        const clean = r.email.trim().toLowerCase();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
          set.add(clean);
        }
      }
    });
    return Array.from(set);
  }, [requests, selectedIds]);

  // URLs for Direct Compose Fallbacks
  const gmailWebComposeUrl = useMemo(() => {
    if (mailRecipients.length === 0) return "#";
    const bccParam = mailRecipients.length > 1 ? mailRecipients.join(",") : "";
    const toParam = mailRecipients.length === 1 ? mailRecipients[0] : "";
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toParam)}&bcc=${encodeURIComponent(bccParam)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  }, [mailRecipients, mailSubject, mailBody]);

  const defaultMailtoUrl = useMemo(() => {
    if (mailRecipients.length === 0) return "#";
    const bccParam = mailRecipients.length > 1 ? mailRecipients.join(",") : "";
    const toParam = mailRecipients.length === 1 ? mailRecipients[0] : "";
    return `mailto:${toParam}?bcc=${encodeURIComponent(bccParam)}&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  }, [mailRecipients, mailSubject, mailBody]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Top Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-1 text-gray-500">
          {selected ? (
            <button
              onClick={() => setSelected(null)}
              className="p-2 hover:bg-gray-100 rounded-full mr-2 text-gray-700 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleSelectAll}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-500"
                title={selectedIds.length === paginated.length && paginated.length > 0 ? "Deselect page" : "Select page"}
              >
                {selectedIds.length === paginated.length && paginated.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={fetchRequests}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
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
              {selected.email && (
                <button
                  onClick={() => openMailComposer([selected.email!])}
                  className="p-2 hover:bg-blue-50 rounded-md text-blue-600 flex items-center gap-1 text-xs font-semibold cursor-pointer"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Send Mail</span>
                </button>
              )}
              {/* DELETE BUTTON: ONLY SHOWN TO SUPER ADMIN */}
              {isSuperAdmin && (
                <button
                  onClick={() => setDeleteConfirmId(selected._id)}
                  className="p-2 hover:bg-red-50 rounded-md text-red-500 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
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
              placeholder="Search name, phone, email, speciality..."
              className="w-48 sm:w-72 pl-10 pr-3 py-1.5 text-sm bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
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
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || totalPages === 0}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Export Bar */}
      {!selected && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50/60">
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
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
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
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500 font-medium">To:</label>
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => {
                setDateTo(e.target.value);
                setMonthFilter("");
              }}
              disabled={!!monthFilter}
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setMonthFilter("");
                setDateFrom("");
                setDateTo("");
              }}
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          {/* Bulk Action: Send Mail when items selected */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
              <span className="text-xs font-semibold">
                {selectedIds.length} selected
              </span>
              {selectedEmails.length > 0 && (
                <button
                  onClick={() => openMailComposer(selectedEmails)}
                  className="flex items-center gap-1 px-2.5 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" /> Send Mail ({selectedEmails.length} unique)
                </button>
              )}
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs text-blue-500 hover:text-blue-800 ml-1 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* FEATURE: SEND MAIL TO ALL SUBSCRIBERS BUTTON (Strictly unique count) */}
            <button
              onClick={handleOpenSendMailToAll}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-[#0b1c43] hover:bg-[#152e68] rounded-lg transition-all shadow-sm cursor-pointer"
              title="Compose and broadcast email to all unique subscribers"
            >
              <Users className="w-3.5 h-3.5" /> Send Mail to All ({subscribersCount})
            </button>

            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              title="Export as Excel CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
              title="Print / PDF Report"
            >
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>
      )}

      {!selected ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Tabs: Includes Subscribed Emails directly next to Called Back */}
          <div className="flex border-b border-gray-100 bg-white overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-4 transition-all whitespace-nowrap cursor-pointer ${activeTab === "all" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <PhoneCall className="w-4 h-4" /> All Requests
              <span className="ml-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {requests.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-4 transition-all whitespace-nowrap cursor-pointer ${activeTab === "new" ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <PhoneIncoming className="w-4 h-4" /> New
              <span className="ml-1 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">
                {requests.filter((r) => r.status === "new").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("read")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-4 transition-all whitespace-nowrap cursor-pointer ${activeTab === "read" ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <CheckCheck className="w-4 h-4" /> Called Back
              <span className="ml-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {requests.filter((r) => r.status === "read").length}
              </span>
            </button>
            {/* NEXT TAB: Subscribed Emails (Shows unique count) */}
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-4 transition-all whitespace-nowrap cursor-pointer ${activeTab === "subscribers" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:bg-gray-50"}`}
            >
              <Mail className="w-4 h-4" /> Subscribed Emails
              <span className="ml-1 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {subscribersCount}
              </span>
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
                  const isChecked = selectedIds.includes(req._id);
                  const hasEmail = Boolean(req.email && req.email.trim() !== "");

                  return (
                    <div
                      key={req._id}
                      onClick={() => handleSelect(req)}
                      className={`group flex items-center px-4 py-3 border-l-4 hover:shadow-md transition-all cursor-pointer ${
                        isChecked
                          ? "bg-blue-50/60 border-blue-500"
                          : isNew
                            ? "bg-white font-bold border-[#e11d48]"
                            : "bg-gray-50/50 font-normal opacity-85 border-transparent"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className="flex items-center gap-2 shrink-0 mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRow(req._id);
                        }}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                        )}
                      </div>

                      {/* Name */}
                      <div
                        className={`w-32 sm:w-44 shrink-0 truncate text-sm ${isNew ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {req.name}
                      </div>

                      {/* Phone & Email & Speciality */}
                      <div className="flex-1 min-w-0 flex items-center gap-3 text-sm truncate">
                        <span className="flex items-center gap-1.5 text-gray-600 shrink-0">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <a
                            href={`tel:${req.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline font-mono text-xs sm:text-sm"
                          >
                            {req.phone}
                          </a>
                        </span>

                        {hasEmail ? (
                          <span className="hidden md:flex items-center gap-1 text-indigo-700 font-medium truncate max-w-[220px]">
                            <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span className="truncate text-xs">
                              {req.email}
                            </span>
                          </span>
                        ) : (
                          <span className="hidden md:inline text-xs text-gray-300 italic">
                            No email
                          </span>
                        )}

                        {req.department && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium shrink-0 max-w-[170px] truncate">
                            {req.department}
                          </span>
                        )}

                        {req.source === "notification_subscribe" && (
                          <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-[11px] rounded-full font-medium shrink-0">
                            <Sparkles className="w-3 h-3" /> Subscribe Alert
                          </span>
                        )}
                      </div>

                      {/* Right Action buttons */}
                      <div className="w-36 shrink-0 flex items-center justify-end gap-1">
                        <div
                          className={`text-xs group-hover:hidden ${isNew ? "text-gray-900 font-bold" : "text-gray-500"}`}
                        >
                          {formatDate(req.createdAt)}
                        </div>

                        <div className="hidden group-hover:flex items-center gap-1">
                          {hasEmail && (
                            <button
                              className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                openMailComposer([req.email!]);
                              }}
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          {/* ROW TRASH ICON: ONLY SHOWN TO SUPER ADMIN */}
                          {isSuperAdmin && (
                            <button
                              className="p-1.5 hover:bg-red-50 text-red-500 rounded-md transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(req._id);
                              }}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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
          <div className="max-w-2xl mx-auto w-full px-6 py-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#0b1c43] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selected.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Received on{" "}
                  {new Date(selected.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {selected.source === "notification_subscribe" && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Subscribed Alert
                  </span>
                )}
                {selected.status === "new" ? (
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase">
                    New
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">
                    Called Back
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Patient / Subscriber Name
                </p>
                <p className="text-gray-900 font-semibold text-lg">
                  {selected.name}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Phone Number
                </p>
                <a
                  href={`tel:${selected.phone}`}
                  className="text-blue-600 font-semibold text-xl hover:underline flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> {selected.phone}
                </a>
              </div>

              {selected.email ? (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-indigo-600 font-semibold text-lg hover:underline flex items-center gap-2"
                    >
                      <Mail className="w-5 h-5" /> {selected.email}
                    </a>
                    <button
                      onClick={() => openMailComposer([selected.email!])}
                      className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Compose Email
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </p>
                  <p className="text-gray-400 text-sm italic">
                    No email provided
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Speciality / Department
                </p>
                <p className="text-gray-900 font-semibold text-base sm:text-lg">
                  {selected.department || "General Enquiry"}
                </p>
              </div>

              {selected.source && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Lead Source
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    {selected.source === "notification_subscribe"
                      ? "Website Notification Alerts Modal"
                      : selected.source}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${selected.phone}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#e11d48] text-white rounded-full text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>

              {selected.email && (
                <button
                  onClick={() => openMailComposer([selected.email!])}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0b1c43] text-white rounded-full text-sm font-semibold hover:bg-[#152e68] transition-colors shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </button>
              )}

              {/* DETAIL DELETE: ONLY SHOWN TO SUPER ADMIN */}
              {isSuperAdmin && (
                <button
                  onClick={() => setDeleteConfirmId(selected._id)}
                  className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-red-500 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal: ONLY RENDERED FOR SUPER ADMIN */}
      {isSuperAdmin && deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95">
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
                className="flex-1 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <div className="w-px bg-gray-200" />
              <button
                onClick={confirmDelete}
                className="flex-1 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Email Modal */}
      {mailModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0b1c43] text-white flex items-center justify-center shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {isMailToAll
                      ? "Send Email to All Subscribers"
                      : "Send Email to Subscriber(s)"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isMailToAll
                      ? `Broadcasting to all ${mailRecipients.length} unique subscriber(s)`
                      : `Recipient(s): ${mailRecipients.length} unique subscriber(s)`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMailModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSendMail} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Error Guidance Alert if SMTP fails */}
              {mailError && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2.5 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900">
                        Server Email Sending Notice
                      </h4>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        {mailError}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-amber-900">
                      Direct Instant Alternatives:
                    </span>
                    <a
                      href={gmailWebComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-rose-600" /> Open in Gmail Web
                    </a>
                    <button
                      type="button"
                      onClick={copyEmailsToClipboard}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? "Copied!" : "Copy Emails"}
                    </button>
                  </div>
                </div>
              )}

              {/* Recipients List Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-700">
                    To:
                  </label>
                  <button
                    type="button"
                    onClick={copyEmailsToClipboard}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? "Copied!" : `Copy all ${mailRecipients.length} emails`}
                  </button>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-700 max-h-24 overflow-y-auto flex flex-wrap gap-1.5">
                  {isMailToAll ? (
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded text-xs flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> All Subscribers ({mailRecipients.length} unique emails)
                    </span>
                  ) : (
                    mailRecipients.map((em) => (
                      <span
                        key={em}
                        className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-800 font-mono text-[11px]"
                      >
                        {em}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Template selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Choose Template:
                </label>
                <select
                  value={mailTemplateId}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none"
                >
                  {EMAIL_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  required
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  placeholder="Email Subject"
                  className="w-full text-sm px-3.5 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43] outline-none"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message:
                </label>
                <textarea
                  rows={6}
                  required
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full text-xs sm:text-sm p-3.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 focus:border-[#0b1c43] outline-none font-sans"
                />
              </div>

              {/* Instant One-Click Fallback Bar */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                  Direct Send Options:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={gmailWebComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 rounded border border-gray-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-rose-500" /> Gmail Web
                  </a>
                  <a
                    href={defaultMailtoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 rounded border border-gray-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Mail className="w-3 h-3 text-blue-500" /> Mail Client
                  </a>
                </div>
              </div>

              {/* Submit / Cancel Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setMailModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingMail}
                  className="flex items-center gap-2 px-5 py-2 bg-[#0b1c43] hover:bg-[#152e68] text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSendingMail ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {isMailToAll ? "Send to All Subscribers" : "Send Email"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
