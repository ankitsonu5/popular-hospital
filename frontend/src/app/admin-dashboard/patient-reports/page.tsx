"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FileText,
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  Upload,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Paperclip,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";
const PAGE_SIZE = 20;
const MAX_BULK = 50;

interface ReportFile {
  id: string;
  name: string;
  mime: string;
  size: number;
}

interface PatientReport {
  _id: string;
  patient_name: string;
  mobile: string;
  bill_id: string;
  reg_no: string;
  report_title: string;
  report_date: string;
  files: ReportFile[];
  isActive: boolean;
  createdAt: string;
  ageDays?: number;
  isOld?: boolean;
}

type AgeTab = "" | "recent" | "old";

interface FormState {
  patient_name: string;
  mobile: string;
  bill_id: string;
  reg_no: string;
  report_title: string;
  report_date: string;
}

interface BulkRow {
  key: string;
  file: File;
  patient_name: string;
  mobile: string;
  bill_id: string;
  reg_no: string;
  report_title: string;
  report_date: string;
  error?: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm: FormState = {
  patient_name: "",
  mobile: "",
  bill_id: "",
  reg_no: "",
  report_title: "",
  report_date: today(),
};

const authHeader = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
});

const titleFromFile = (name: string) =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/[_]+/g, " ")
    .trim();

const rowError = (r: BulkRow): string => {
  if (!r.report_title.trim()) return "Report title is required";
  if (!r.patient_name.trim()) return "Patient name is required";
  if (r.mobile.replace(/\D/g, "").length !== 10) return "Enter a 10-digit mobile";
  if (!r.bill_id.trim() && !r.reg_no.trim()) return "Enter Bill ID or Reg. No";
  return "";
};

const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#0b1c43]/20 outline-none";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

export default function PatientReportsAdminPage() {
  const [records, setRecords] = useState<PatientReport[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | "visible" | "hidden">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PatientReport | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removeIds, setRemoveIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const [bulkOpen, setBulkOpen] = useState(false);
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [shared, setShared] = useState({
    patient_name: "",
    mobile: "",
    bill_id: "",
    reg_no: "",
    report_date: today(),
  });
  const [bulkSaving, setBulkSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // "Older than 45 days" section
  const [ageTab, setAgeTab] = useState<AgeTab>("");
  const [stats, setStats] = useState({ old: 0, recent: 0, oldAfterDays: 45 });
  const [deleteOldOpen, setDeleteOldOpen] = useState(false);
  const [deletingOld, setDeletingOld] = useState(false);

  // debounce the search box
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      if (query) params.set("q", query);
      if (status) params.set("status", status);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (ageTab) params.set("age", ageTab);
      const res = await fetch(`${API_URL}/patient-reports?${params}`, {
        headers: authHeader(),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (!Array.isArray(data?.items)) {
        // Older backend (returns a plain array) — restart the backend server.
        setRecords([]);
        setTotal(0);
        setPages(1);
        toast.error("Backend is outdated — please restart the backend server.");
        return;
      }
      setRecords(
        data.items.map((r: PatientReport) => ({ ...r, files: r.files ?? [] })),
      );
      setTotal(data.total ?? data.items.length);
      setPages(data.pages ?? 1);
      if (data.stats) setStats(data.stats);
    } catch {
      toast.error("Failed to load patient reports");
    } finally {
      setLoading(false);
    }
  }, [page, query, status, from, to, ageTab]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setFrom("");
    setTo("");
    setPage(1);
  };
  const hasFilters = !!(search || status || from || to);

  /* ── Open a file through a short-lived signed link ── */
  const openFile = async (reportId: string, fileId: string) => {
    const win = window.open("", "_blank");
    try {
      const res = await fetch(
        `${API_URL}/patient-reports/${reportId}/files/${fileId}/link`,
        { method: "POST", headers: authHeader() },
      );
      if (!res.ok) throw new Error();
      const { token } = await res.json();
      const url = `${API_URL}/patient-reports/file/${token}`;
      if (win) win.location.href = url;
      else window.open(url, "_blank");
    } catch {
      win?.close();
      toast.error("Could not open the file");
    }
  };

  /* ── Single report (add / edit) ── */
  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, report_date: today() });
    setNewFiles([]);
    setRemoveIds([]);
    setModalOpen(true);
  };

  const openEdit = (r: PatientReport) => {
    setEditing(r);
    setForm({
      patient_name: r.patient_name,
      mobile: r.mobile,
      bill_id: r.bill_id,
      reg_no: r.reg_no,
      report_title: r.report_title,
      report_date: r.report_date ? r.report_date.slice(0, 10) : "",
    });
    setNewFiles([]);
    setRemoveIds([]);
    setModalOpen(true);
  };

  const keptFiles = (editing?.files || []).filter((f) => !removeIds.includes(f.id));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (keptFiles.length + newFiles.length === 0) {
      toast.error("Please attach at least one report file (PDF, JPG or PNG)");
      return;
    }
    setSaving(true);
    try {
      const body = new FormData();
      (Object.keys(form) as (keyof FormState)[]).forEach((k) =>
        body.append(k, form[k]),
      );
      newFiles.forEach((f) => body.append("files", f));
      if (editing) body.append("removeFileIds", JSON.stringify(removeIds));

      const res = await fetch(
        editing
          ? `${API_URL}/patient-reports/${editing._id}`
          : `${API_URL}/patient-reports`,
        { method: editing ? "PUT" : "POST", headers: authHeader(), body },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success(editing ? "Report updated" : "Report uploaded");
      setModalOpen(false);
      fetchRecords();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle / delete ── */
  const toggleActive = async (r: PatientReport) => {
    try {
      const res = await fetch(`${API_URL}/patient-reports/${r._id}/toggle`, {
        method: "PATCH",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error();
      const updated: PatientReport = await res.json();
      setRecords((prev) => prev.map((x) => (x._id === r._id ? updated : x)));
      toast.success(updated.isActive ? "Report is now visible" : "Report hidden");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`${API_URL}/patient-reports/${deleteId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error();
      toast.success("Report deleted");
      if (records.length === 1 && page > 1) setPage(page - 1);
      else fetchRecords();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleteId(null);
    }
  };

  const handleDeleteOld = async () => {
    setDeletingOld(true);
    try {
      const res = await fetch(`${API_URL}/patient-reports/old`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      toast.success(`${data.deleted} old report(s) deleted`);
      setDeleteOldOpen(false);
      setPage(1);
      fetchRecords();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeletingOld(false);
    }
  };

  /* ── Bulk upload ── */
  const openBulk = () => {
    setRows([]);
    setShared({ patient_name: "", mobile: "", bill_id: "", reg_no: "", report_date: today() });
    setBulkOpen(true);
  };

  const addBulkFiles = (list: FileList | File[]) => {
    const allowed = Array.from(list).filter((f) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(f.type),
    );
    const skipped = Array.from(list).length - allowed.length;
    if (skipped > 0) toast.error(`${skipped} file(s) skipped — only PDF, JPG or PNG`);
    setRows((prev) => {
      const room = MAX_BULK - prev.length;
      if (allowed.length > room) toast.error(`Up to ${MAX_BULK} files at a time`);
      const next = allowed.slice(0, Math.max(room, 0)).map<BulkRow>((file) => ({
        key: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
        file,
        patient_name: shared.patient_name,
        mobile: shared.mobile,
        bill_id: shared.bill_id,
        reg_no: shared.reg_no,
        report_title: titleFromFile(file.name),
        report_date: shared.report_date,
      }));
      return [...prev, ...next];
    });
  };

  const updateRow = (key: string, patch: Partial<BulkRow>) =>
    setRows((prev) =>
      prev.map((r) => (r.key === key ? { ...r, ...patch, error: undefined } : r)),
    );

  const applyShared = () =>
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        patient_name: shared.patient_name || r.patient_name,
        mobile: shared.mobile || r.mobile,
        bill_id: shared.bill_id || r.bill_id,
        reg_no: shared.reg_no || r.reg_no,
        report_date: shared.report_date || r.report_date,
        error: undefined,
      })),
    );

  const handleBulkSubmit = async () => {
    const checked = rows.map((r) => ({ ...r, error: rowError(r) || undefined }));
    setRows(checked);
    if (checked.some((r) => r.error)) {
      toast.error("Please fix the highlighted rows");
      return;
    }
    setBulkSaving(true);
    try {
      const body = new FormData();
      body.append(
        "meta",
        JSON.stringify(
          checked.map((r) => ({
            patient_name: r.patient_name,
            mobile: r.mobile,
            bill_id: r.bill_id,
            reg_no: r.reg_no,
            report_title: r.report_title,
            report_date: r.report_date,
          })),
        ),
      );
      checked.forEach((r) => body.append("files", r.file));
      const res = await fetch(`${API_URL}/patient-reports/bulk`, {
        method: "POST",
        headers: authHeader(),
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok && !data.failed) throw new Error(data.error || "Upload failed");

      const failedIdx = new Set<number>((data.failed || []).map((f: any) => f.index));
      if (data.created) toast.success(`${data.created} report(s) uploaded`);
      if (failedIdx.size === 0) {
        setBulkOpen(false);
      } else {
        // keep only the rows that failed, with their reason
        setRows(
          checked
            .filter((_, i) => failedIdx.has(i))
            .map((r) => ({
              ...r,
              error:
                (data.failed as any[]).find((f) => f.name === r.file.name)?.error ||
                "Could not upload",
            })),
        );
        toast.error(`${failedIdx.size} file(s) failed — see the rows below`);
      }
      setPage(1);
      fetchRecords();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setBulkSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#0b1c43]" />
          <h1 className="text-lg font-bold text-[#0b1c43]">Patient Reports</h1>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
            {total}
          </span>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            onClick={fetchRecords}
            className="p-2 text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openBulk}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0b1c43] border border-[#0b1c43]/30 hover:bg-[#0b1c43]/5 rounded-lg"
          >
            <UploadCloud className="w-4 h-4" /> Bulk Upload
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0b1c43] hover:bg-[#13296a] rounded-lg"
          >
            <Plus className="w-4 h-4" /> Upload Report
          </button>
        </div>
      </div>

      {/* Recent / Older than 45 days */}
      <div className="flex flex-wrap items-center gap-2 px-6 pt-3">
        {(
          [
            ["", "All reports", stats.old + stats.recent, ""],
            ["recent", `Recent (within ${stats.oldAfterDays} days)`, stats.recent, ""],
            ["old", `Older than ${stats.oldAfterDays} days`, stats.old, "old"],
          ] as [AgeTab, string, number, string][]
        ).map(([key, label, count, kind]) => (
          <button
            key={key || "all"}
            onClick={() => {
              setAgeTab(key);
              setPage(1);
            }}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
              ageTab === key
                ? kind === "old"
                  ? "border-orange-400 bg-orange-50 text-orange-700"
                  : "border-[#0b1c43] bg-[#0b1c43]/5 text-[#0b1c43]"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                kind === "old" && count > 0
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {ageTab === "old" && (
        <div className="mx-6 mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <p className="text-sm text-orange-800">
            These reports were uploaded more than {stats.oldAfterDays} days ago.
            A report moves here automatically when it reaches{" "}
            {stats.oldAfterDays} days.
          </p>
          <button
            onClick={() => setDeleteOldOpen(true)}
            disabled={stats.old === 0}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" /> Delete all {stats.old} old report
            {stats.old === 1 ? "" : "s"}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 px-6 py-3 bg-gray-50/60 border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, mobile, Bill ID, Reg. No, title"
            className={`${inputCls} pl-9`}
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as "" | "visible" | "hidden");
            setPage(1);
          }}
          className={`${inputCls} w-auto`}
        >
          <option value="">All status</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
        </select>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(1);
            }}
            className={`${inputCls} w-auto`}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium">To</label>
          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(1);
            }}
            className={`${inputCls} w-auto`}
          />
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg bg-white hover:border-gray-300"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-4 py-3">Bill ID</th>
              <th className="px-4 py-3">Reg. No</th>
              <th className="px-4 py-3">Report &amp; Files</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && records.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                  {hasFilters
                    ? "No reports match your filters."
                    : ageTab === "old"
                      ? `No reports are older than ${stats.oldAfterDays} days.`
                      : "No reports uploaded yet."}
                </td>
              </tr>
            )}
            {records.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50/60 align-top">
                <td className="px-6 py-3">
                  <p className="font-semibold text-gray-800">{r.patient_name}</p>
                  <p className="text-xs text-gray-500">{r.mobile}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">{r.bill_id || "—"}</td>
                <td className="px-4 py-3 text-gray-700">{r.reg_no || "—"}</td>
                <td className="px-4 py-3">
                  <p className="flex flex-wrap items-center gap-2 font-medium text-gray-800">
                    {r.report_title}
                    {r.isOld && (
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-bold text-orange-700">
                        {stats.oldAfterDays}+ days · {r.ageDays}d old
                      </span>
                    )}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {r.files.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => openFile(r._id, f.id)}
                        title={f.name}
                        className="inline-flex max-w-[180px] items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-100"
                      >
                        <Paperclip className="w-3 h-3 shrink-0" />
                        <span className="truncate">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {r.report_date
                    ? new Date(r.report_date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      r.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {r.isActive ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => toggleActive(r)}
                      className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100"
                      title={r.isActive ? "Hide from patients" : "Show to patients"}
                    >
                      {r.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(r)}
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(r._id)}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100"
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
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between gap-3 px-6 py-3 border-t border-gray-100 text-sm text-gray-600">
          <span>
            Page {page} of {pages} · {total} report{total === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page >= pages}
              className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-[#0b1c43] mb-4">
              {editing ? "Edit Report" : "Upload Report"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Patient Name *</label>
                <input
                  required
                  value={form.patient_name}
                  onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Registered Mobile *</label>
                <input
                  required
                  inputMode="numeric"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="10-digit number"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Bill ID</label>
                <input
                  value={form.bill_id}
                  onChange={(e) => setForm({ ...form, bill_id: e.target.value })}
                  placeholder="e.g. PHV25-123"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Registration No</label>
                <input
                  value={form.reg_no}
                  onChange={(e) => setForm({ ...form, reg_no: e.target.value })}
                  placeholder="e.g. REG-456"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Report Title *</label>
                <input
                  required
                  value={form.report_title}
                  onChange={(e) => setForm({ ...form, report_title: e.target.value })}
                  placeholder="e.g. CBC / X-Ray Chest"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Report Date</label>
                <input
                  type="date"
                  value={form.report_date}
                  onChange={(e) => setForm({ ...form, report_date: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Enter a Bill ID, a Registration No, or both. The patient needs the ID
              plus this mobile number to view the report.
            </p>

            {/* Files */}
            <div className="mt-4">
              <label className={labelCls}>
                Report files (PDF / JPG / PNG, max 15 MB each) *
              </label>
              <ul className="space-y-1.5 mb-2">
                {keptFiles.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-sm"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      <span className="truncate">{f.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setRemoveIds((p) => [...p, f.id])}
                      className="text-gray-400 hover:text-red-600"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
                {newFiles.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between gap-2 rounded-lg bg-teal-50 px-3 py-1.5 text-sm"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Upload className="w-3.5 h-3.5 shrink-0 text-teal-600" />
                      <span className="truncate">{f.name}</span>
                      <span className="text-[10px] font-bold text-teal-700">NEW</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setNewFiles((p) => p.filter((_, x) => x !== i))}
                      className="text-gray-400 hover:text-red-600"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <label className="flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {keptFiles.length + newFiles.length > 0 ? "Add more files" : "Choose files"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="application/pdf,image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    setNewFiles((p) => [...p, ...Array.from(e.target.files || [])]);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#0b1c43] hover:bg-[#13296a] rounded-lg disabled:opacity-60"
              >
                {saving ? "Saving..." : editing ? "Save Changes" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk upload modal */}
      {bulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setBulkOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-[#0b1c43]">Bulk Upload Reports</h2>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Add up to {MAX_BULK} files. Each file becomes one report — set its
              Bill ID, Registration No and Report Title below. Title is taken from
              the file name by default.
            </p>

            {/* Apply to all */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">
                Same for all files (optional) — fill, then click “Apply to all”
              </p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <input
                  value={shared.patient_name}
                  onChange={(e) => setShared({ ...shared, patient_name: e.target.value })}
                  placeholder="Patient name"
                  className={inputCls}
                />
                <input
                  value={shared.mobile}
                  inputMode="numeric"
                  maxLength={10}
                  onChange={(e) =>
                    setShared({ ...shared, mobile: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="Mobile"
                  className={inputCls}
                />
                <input
                  value={shared.bill_id}
                  onChange={(e) => setShared({ ...shared, bill_id: e.target.value })}
                  placeholder="Bill ID"
                  className={inputCls}
                />
                <input
                  value={shared.reg_no}
                  onChange={(e) => setShared({ ...shared, reg_no: e.target.value })}
                  placeholder="Reg. No"
                  className={inputCls}
                />
                <input
                  type="date"
                  value={shared.report_date}
                  onChange={(e) => setShared({ ...shared, report_date: e.target.value })}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={applyShared}
                  disabled={rows.length === 0}
                  className="px-3 py-2 text-sm font-semibold text-[#0b1c43] border border-[#0b1c43]/30 rounded-lg hover:bg-[#0b1c43]/5 disabled:opacity-40"
                >
                  Apply to all
                </button>
              </div>
            </div>

            {/* Drop zone */}
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                addBulkFiles(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer text-sm transition ${
                dragOver
                  ? "border-[#0d9488] bg-teal-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <UploadCloud className="w-6 h-6 text-gray-400" />
              <span className="font-medium text-gray-700">
                Drag &amp; drop report files here, or click to choose
              </span>
              <span className="text-xs text-gray-500">PDF, JPG or PNG · max 15 MB each</span>
              <input
                type="file"
                multiple
                accept="application/pdf,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) addBulkFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>

            {/* Rows */}
            {rows.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm min-w-[860px]">
                  <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="py-2 pr-2 w-44">File</th>
                      <th className="py-2 px-1">Patient name *</th>
                      <th className="py-2 px-1 w-32">Mobile *</th>
                      <th className="py-2 px-1 w-32">Bill ID</th>
                      <th className="py-2 px-1 w-32">Reg. No</th>
                      <th className="py-2 px-1">Report title *</th>
                      <th className="py-2 pl-1 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.key} className="align-top">
                        <td className="py-1.5 pr-2">
                          <p className="truncate max-w-[170px] text-xs text-gray-600" title={r.file.name}>
                            {r.file.name}
                          </p>
                          {r.error && (
                            <p className="text-[11px] text-red-600 mt-0.5">{r.error}</p>
                          )}
                        </td>
                        <td className="py-1.5 px-1">
                          <input
                            value={r.patient_name}
                            onChange={(e) => updateRow(r.key, { patient_name: e.target.value })}
                            className={`${inputCls} ${r.error && !r.patient_name.trim() ? "border-red-400" : ""}`}
                          />
                        </td>
                        <td className="py-1.5 px-1">
                          <input
                            value={r.mobile}
                            inputMode="numeric"
                            maxLength={10}
                            onChange={(e) =>
                              updateRow(r.key, { mobile: e.target.value.replace(/\D/g, "") })
                            }
                            className={`${inputCls} ${r.error && r.mobile.length !== 10 ? "border-red-400" : ""}`}
                          />
                        </td>
                        <td className="py-1.5 px-1">
                          <input
                            value={r.bill_id}
                            onChange={(e) => updateRow(r.key, { bill_id: e.target.value })}
                            className={inputCls}
                          />
                        </td>
                        <td className="py-1.5 px-1">
                          <input
                            value={r.reg_no}
                            onChange={(e) => updateRow(r.key, { reg_no: e.target.value })}
                            className={inputCls}
                          />
                        </td>
                        <td className="py-1.5 px-1">
                          <input
                            value={r.report_title}
                            onChange={(e) => updateRow(r.key, { report_title: e.target.value })}
                            className={`${inputCls} ${r.error && !r.report_title.trim() ? "border-red-400" : ""}`}
                          />
                        </td>
                        <td className="py-1.5 pl-1">
                          <button
                            type="button"
                            onClick={() => setRows((p) => p.filter((x) => x.key !== r.key))}
                            className="p-1.5 text-gray-400 hover:text-red-600"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-6">
              <span className="text-xs text-gray-500">
                {rows.length} file{rows.length === 1 ? "" : "s"} selected
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBulkOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBulkSubmit}
                  disabled={bulkSaving || rows.length === 0}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#0b1c43] hover:bg-[#13296a] rounded-lg disabled:opacity-60"
                >
                  {bulkSaving
                    ? "Uploading..."
                    : `Upload ${rows.length || ""} report${rows.length === 1 ? "" : "s"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete ALL old reports */}
      {deleteOldOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Delete all {stats.old} old report{stats.old === 1 ? "" : "s"}?
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Every report uploaded more than {stats.oldAfterDays} days ago (and
              all of its files) will be permanently deleted. Reports from the
              last {stats.oldAfterDays} days are not touched. This cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteOldOpen(false)}
                disabled={deletingOld}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOld}
                disabled={deletingOld}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-60"
              >
                {deletingOld ? "Deleting..." : "Yes, delete all"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete this report?</h3>
            <p className="text-sm text-gray-500 mb-5">
              All its files will be permanently removed and patients will no longer
              be able to view it.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
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
