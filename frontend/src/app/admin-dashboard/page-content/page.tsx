"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Save,
  Loader2,
  RefreshCw,
  Upload,
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
  Undo2,
  RotateCcw,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

interface PageSummary {
  pageKey: string;
  route: string;
  label: string;
  group: string;
  sectionCount: number;
  itemCount: number;
  editedCount: number;
}

interface Item {
  key: string;
  type: "heading" | "paragraph" | "link" | "list" | "text" | "image";
  label: string;
  default: string;
  alt?: string;
  value: string;
  edited: boolean;
}

interface Section {
  key: string;
  label: string;
  items: Item[];
}

interface PageDetail {
  pageKey: string;
  route: string;
  label: string;
  group: string;
  sections: Section[];
}

const GROUP_ORDER = ["Home", "About Us", "Popular Finds", "Departments", "Services", "Careers", "Media & Blog", "Other"];

export default function PageContentManager() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ Home: true, "About Us": true });

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [detail, setDetail] = useState<PageDetail | null>(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // values currently in the inputs, and the values last loaded/saved from the server
  const [values, setValues] = useState<Record<string, string>>({});
  const savedRef = useRef<Record<string, string>>({});
  const defaultsRef = useRef<Record<string, string>>({});

  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const authHeader = () => ({ Authorization: "Bearer " + (sessionStorage.getItem("admin_token") || "") });
  const jsonHeaders = () => ({ ...authHeader(), "Content-Type": "application/json" });

  const loadList = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch(API_URL + "/cms/page-content", { headers: authHeader() });
      const data = await res.json();
      setPages(Array.isArray(data?.pages) ? data.pages : []);
    } catch {
      toast.error("Pages load nahi ho paaye");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const dirtyKeys = useMemo(
    () => Object.keys(values).filter((k) => values[k] !== savedRef.current[k]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values, detail]
  );
  const isDirty = dirtyKeys.length > 0;

  const openPage = async (pageKey: string) => {
    if (pageKey === activeKey) return;
    if (isDirty && !confirm("Is page mein unsaved changes hain. Chhodna chahte hain?")) return;
    setActiveKey(pageKey);
    setLoadingPage(true);
    setDetail(null);
    try {
      const res = await fetch(API_URL + "/cms/page-content/" + encodeURIComponent(pageKey), { headers: authHeader() });
      if (!res.ok) throw new Error();
      const data: PageDetail = await res.json();
      const v: Record<string, string> = {};
      const d: Record<string, string> = {};
      data.sections.forEach((s) =>
        s.items.forEach((i) => {
          v[i.key] = i.value;
          d[i.key] = i.default;
        })
      );
      savedRef.current = { ...v };
      defaultsRef.current = d;
      setValues(v);
      setDetail(data);
      setOpenSections({ [data.sections[0]?.key]: true });
    } catch {
      toast.error("Page load nahi ho paaya");
      setActiveKey(null);
    } finally {
      setLoadingPage(false);
    }
  };

  const setValue = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!detail || !isDirty) return;
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      dirtyKeys.forEach((k) => (payload[k] = values[k]));
      const res = await fetch(API_URL + "/cms/page-content/" + encodeURIComponent(detail.pageKey), {
        method: "PUT",
        headers: jsonHeaders(),
        body: JSON.stringify({ values: payload }),
      });
      if (!res.ok) throw new Error();
      savedRef.current = { ...values };
      setDetail({ ...detail }); // refresh derived dirty state
      toast.success("Saved! Website par 10-15 second mein dikhega");
      loadList();
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetPage = async () => {
    if (!detail) return;
    if (!confirm("Is page ka poora content original par wapas karna hai?")) return;
    setSaving(true);
    try {
      const res = await fetch(API_URL + "/cms/page-content/" + encodeURIComponent(detail.pageKey) + "/overrides", {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error();
      const v = { ...defaultsRef.current };
      savedRef.current = { ...v };
      setValues(v);
      setDetail({ ...detail });
      toast.success("Page original content par wapas aa gaya");
      loadList();
    } catch {
      toast.error("Reset failed");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (key: string, file: File) => {
    if (!detail) return;
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(API_URL + "/cms/page-content/" + encodeURIComponent(detail.pageKey) + "/upload-image", {
        method: "POST",
        headers: authHeader(),
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data?.error || "Upload failed");
      setValue(key, data.url);
      toast.success("Image upload ho gayi — Save dabana na bhoolein");
    } catch (e: any) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploadingKey(null);
    }
  };

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? pages.filter((p) => p.label.toLowerCase().includes(q) || p.route.toLowerCase().includes(q) || p.group.toLowerCase().includes(q))
      : pages;
    const map = new Map<string, PageSummary[]>();
    filtered.forEach((p) => {
      if (!map.has(p.group)) map.set(p.group, []);
      map.get(p.group)!.push(p);
    });
    return [...map.entries()].sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a[0]);
      const ib = GROUP_ORDER.indexOf(b[0]);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }, [pages, search]);

  const renderItem = (item: Item) => {
    const value = values[item.key] ?? "";
    const changed = value !== item.default;
    const long = item.type === "paragraph" || item.default.length > 110 || item.default.includes("\n");

    return (
      <div key={item.key} className={"rounded-xl border p-3 sm:p-4 transition-colors " + (changed ? "border-amber-300 bg-amber-50/40" : "border-gray-100 bg-white")}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold text-gray-700">{item.label}</span>
            {changed && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">EDITED</span>}
          </div>
          {changed && (
            <button
              type="button"
              onClick={() => setValue(item.key, item.default)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-gray-800"
              title="Original text wapas lao"
            >
              <Undo2 className="w-3 h-3" /> Original
            </button>
          )}
        </div>

        {item.type === "image" ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-40 h-28 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
              {value ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt={item.alt || item.label} className="max-w-full max-h-full object-contain" />
              ) : (
                <FileText className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(item.key, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                placeholder="/images/... ya https://..."
              />
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                {uploadingKey === item.key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                Naya image upload karein
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(item.key, f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
        ) : long ? (
          <textarea
            value={value}
            onChange={(e) => setValue(item.key, e.target.value)}
            rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 leading-relaxed"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(item.key, e.target.value)}
            className={"w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 " + (item.type === "heading" ? "font-semibold" : "")}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Page Content Manager</h2>
          <p className="text-sm text-gray-500 mt-1">
            Page ke har section ka heading, paragraph aur image yahin se edit karein. Jo abhi website par hai wahi input mein bhara hua hai.
          </p>
        </div>
        <button onClick={loadList} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">
        {/* Page list */}
        <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-120px)] flex flex-col overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Page search karein..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {loadingList ? (
              <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-gray-300" /></div>
            ) : pages.length === 0 ? (
              <p className="text-sm text-gray-500 p-4">
                Koi page nahi mila. Frontend folder mein <code className="bg-gray-100 px-1 rounded">npm run scan:content</code> chalayein.
              </p>
            ) : (
              grouped.map(([group, list]) => {
                const open = search ? true : !!openGroups[group];
                return (
                  <div key={group} className="mb-1">
                    <button
                      onClick={() => setOpenGroups((p) => ({ ...p, [group]: !p[group] }))}
                      className="w-full flex items-center justify-between px-2 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <span className="flex items-center gap-1.5">
                        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                        {group}
                      </span>
                      <span className="text-[11px] font-medium text-gray-400">{list.length}</span>
                    </button>
                    {open && (
                      <div className="ml-3 border-l border-gray-100 pl-2 space-y-0.5">
                        {list.map((p) => (
                          <button
                            key={p.pageKey}
                            onClick={() => openPage(p.pageKey)}
                            className={"w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] flex items-center justify-between gap-2 transition-colors " + (activeKey === p.pageKey ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50")}
                          >
                            <span className="truncate">{p.label.replace(/^.*? › /, "") || p.label}</span>
                            {p.editedCount > 0 && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full flex-shrink-0">{p.editedCount}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Editor */}
        <section className="min-w-0">
          {!activeKey && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-500 text-sm">
              Left side se koi page chuniye — uske saare sections yahan khul jayenge.
            </div>
          )}

          {loadingPage && (
            <div className="flex justify-center items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
          )}

          {detail && !loadingPage && (
            <div className="space-y-4">
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{detail.label}</h3>
                  <a href={detail.route} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    {detail.route} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {isDirty && <span className="text-xs font-semibold text-amber-600">{dirtyKeys.length} unsaved</span>}
                  <button onClick={resetPage} disabled={saving} className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-60">
                    <RotateCcw className="w-3.5 h-3.5" /> Page ko original karein
                  </button>
                  <button onClick={save} disabled={saving || !isDirty} className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                  </button>
                </div>
              </div>

              {detail.sections.map((section) => {
                const open = !!openSections[section.key];
                const editedHere = section.items.filter((i) => values[i.key] !== i.default).length;
                return (
                  <div key={section.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setOpenSections((p) => ({ ...p, [section.key]: !p[section.key] }))}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        {open ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                        <span className="font-bold text-gray-900 truncate">{section.label}</span>
                      </span>
                      <span className="flex items-center gap-2 flex-shrink-0">
                        {editedHere > 0 && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{editedHere} edited</span>}
                        <span className="text-xs text-gray-400">{section.items.length} fields</span>
                      </span>
                    </button>
                    {open && <div className="border-t border-gray-100 p-3 sm:p-4 space-y-3 bg-gray-50/40">{section.items.map(renderItem)}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}