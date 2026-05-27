"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Save, Trash2, Code, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

// Static pages that have dedicated schema components.
// Dynamic pages (doctor, department, blog) use the custom key field below.
const PRESET_KEYS: { value: string; label: string; hint: string }[] = [
  { value: "home",     label: "Home Page (/)",                      hint: "HospitalSchema — WebSite + Organization + Hospital" },
  { value: "doctors",  label: "Doctors Listing (/doctors)",         hint: "DoctorsListSchema — CollectionPage + BreadcrumbList" },
  { value: "booking",  label: "Book Appointment (/book-an-appointment)", hint: "BookingSchema — MedicalClinic + ReserveAction" },
  { value: "chairman", label: "Chairman's Desk (/about/chairman-desk)",  hint: "ChairmanSchema — ProfilePage + Person (Dr. A.K. Kaushik)" },
];

interface SchemaItem {
  _id?: string;
  pageKey: string;
  label?: string;
  jsonLd: unknown;
  isActive?: boolean;
  notes?: string;
  updatedAt?: string;
}

export default function ManageSchemasPage() {
  const [schemas, setSchemas] = useState<SchemaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string>("home");
  const [customKey, setCustomKey] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [jsonCode, setJsonCode] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const getHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const effectivePageKey = (selectedKey === "__custom__" ? customKey : selectedKey).trim();

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/schemas`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setSchemas(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Load the schema for the selected pageKey into the editor
  useEffect(() => {
    if (!effectivePageKey) {
      setJsonCode("");
      setLabel("");
      setIsActive(true);
      return;
    }
    const existing = schemas.find((s) => s.pageKey === effectivePageKey);
    if (existing) {
      setJsonCode(JSON.stringify(existing.jsonLd, null, 2));
      setLabel(existing.label ?? "");
      setIsActive(existing.isActive !== false);
    } else {
      setJsonCode("");
      const preset = PRESET_KEYS.find((p) => p.value === effectivePageKey);
      setLabel(preset?.label ?? "");
      setIsActive(true);
    }
    setJsonError(null);
  }, [effectivePageKey, schemas]);

  // Validate JSON on change
  const handleJsonChange = (val: string) => {
    setJsonCode(val);
    if (!val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectivePageKey) {
      toast.error("Please select or enter a page key");
      return;
    }
    if (!jsonCode.trim()) {
      toast.error("Please paste JSON-LD schema code");
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonCode);
    } catch (err: any) {
      setJsonError(err.message);
      toast.error("Invalid JSON: " + err.message);
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/cms/schemas`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          pageKey: effectivePageKey,
          label,
          jsonLd: parsed,
          isActive,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to save");
      } else {
        toast.success("Schema saved successfully");
        fetchAll();
      }
    } catch {
      toast.error("Network error");
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!effectivePageKey) return;
    if (!confirm(`Delete schema override for "${effectivePageKey}"?`)) return;
    try {
      const res = await fetch(
        `${API_URL}/cms/schemas/${encodeURIComponent(effectivePageKey)}`,
        { method: "DELETE", headers: getHeaders() },
      );
      if (res.ok) {
        toast.success("Deleted");
        setJsonCode("");
        fetchAll();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const handlePrettify = () => {
    if (!jsonCode.trim()) return;
    try {
      const parsed = JSON.parse(jsonCode);
      setJsonCode(JSON.stringify(parsed, null, 2));
      setJsonError(null);
      toast.success("Formatted");
    } catch (e: any) {
      toast.error("Cannot format invalid JSON");
      setJsonError(e.message);
    }
  };

  const existingForKey = schemas.find((s) => s.pageKey === effectivePageKey);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Code className="w-6 h-6 text-[#0d9488]" />
          Manage Schemas (JSON-LD)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Paste valid JSON-LD schema for any page. Saved schemas override the
          static schema on the live site.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5"
      >
        {/* Page Key Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Page
          </label>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
          >
            {PRESET_KEYS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
            <option value="__custom__">— Custom page key —</option>
          </select>
          {selectedKey !== "__custom__" && (
            <p className="text-xs text-gray-500 mt-1">
              {PRESET_KEYS.find((p) => p.value === selectedKey)?.hint}
            </p>
          )}
        </div>

        {/* Custom Page Key */}
        {selectedKey === "__custom__" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Page Key
            </label>
            <input
              type="text"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="e.g. doctor:dr-ak-kaushik"
              className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all font-mono"
            />
            <div className="mt-2 bg-gray-50 rounded-xl border border-gray-100 px-3 py-2.5 text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700 mb-1">Dynamic page key formats:</p>
              <p><code className="bg-white border border-gray-200 px-1 rounded">doctor:dr-ak-kaushik</code> → Individual doctor page (DoctorSchema)</p>
              <p><code className="bg-white border border-gray-200 px-1 rounded">department:cardiology</code> → Department page (DepartmentSchema)</p>
              <p><code className="bg-white border border-gray-200 px-1 rounded">blog:my-article-slug</code> → Blog article page (BlogArticleSchema)</p>
            </div>
          </div>
        )}

        {/* Display Label — auto-filled, editable only for custom keys */}
        {selectedKey === "__custom__" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Display Label <span className="text-gray-400 font-normal">(shown in admin table only)</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Dr. AK Kaushik — Doctor Schema"
              className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
            />
          </div>
        )}

        {/* JSON-LD Code Editor */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-semibold text-gray-700">
              JSON-LD Schema Code
            </label>
            <button
              type="button"
              onClick={handlePrettify}
              className="text-xs text-[#0d9488] hover:text-[#0b8578] font-semibold"
            >
              Format JSON
            </button>
          </div>
          <textarea
            value={jsonCode}
            onChange={(e) => handleJsonChange(e.target.value)}
            placeholder={`{
  "@context": "https://schema.org",
  "@type": "Hospital",
  ...
}`}
            rows={20}
            className={`w-full px-3 py-2.5 rounded-xl border-2 text-xs font-mono focus:outline-none transition-all ${
              jsonError
                ? "border-red-300 focus:border-red-500 bg-red-50/30"
                : "border-gray-200 focus:border-[#0d9488] bg-gray-50/30"
            }`}
            spellCheck={false}
          />
          {jsonError && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {jsonError}
            </p>
          )}
          {!jsonError && jsonCode.trim() && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Valid JSON
            </p>
          )}
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Active (live on website). Uncheck to disable without deleting.
          </label>
        </div>

        {/* Status info */}
        {existingForKey && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
            <strong>Saved schema exists</strong> for{" "}
            <code className="bg-blue-100 px-1 rounded">{existingForKey.pageKey}</code>{" "}
            — last updated{" "}
            {existingForKey.updatedAt
              ? new Date(existingForKey.updatedAt).toLocaleString()
              : "unknown"}
            .
          </div>
        )}

        {/* Buttons */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center gap-3">
          {existingForKey ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete Override
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={isSaving || !!jsonError}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#0d9488]/20 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Schema
              </>
            )}
          </button>
        </div>
      </form>

      {/* Saved Schemas List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">
            All Saved Overrides ({schemas.length})
          </h3>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ) : schemas.length === 0 ? (
          <p className="text-center py-10 text-gray-400 text-sm">
            No schemas saved yet. Static defaults are used on every page.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Page Key
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Label
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schemas.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-6 font-mono text-xs">{s.pageKey}</td>
                  <td className="py-3 px-6 text-gray-600">{s.label || "—"}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        s.isActive !== false
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {s.isActive !== false ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-xs text-gray-500">
                    {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => {
                        // Switch editor to this key
                        const inPresets = PRESET_KEYS.some((p) => p.value === s.pageKey);
                        if (inPresets) {
                          setSelectedKey(s.pageKey);
                        } else {
                          setSelectedKey("__custom__");
                          setCustomKey(s.pageKey);
                        }
                      }}
                      className="text-xs text-[#0d9488] hover:text-[#0b8578] font-semibold"
                    >
                      Edit →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
