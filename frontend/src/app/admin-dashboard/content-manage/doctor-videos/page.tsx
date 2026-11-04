"use client";
import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Loader2,
  Search,
  Video,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "/api-backend";

interface DoctorVideo {
  _id?: string;
  title: string;
  url: string;
}

const YT_REGEX =
  /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;

const getYoutubeId = (url: string) => url.match(YT_REGEX)?.[1] ?? null;

export default function DoctorVideosPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Only one doctor's editor is open at a time
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DoctorVideo[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    index: number;
    video: DoctorVideo;
  } | null>(null);

  const authHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/doctors?t=${Date.now()}`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      setDoctors(Array.isArray(data) ? data : data?.doctors || []);
    } catch (e) {
      console.error(e);
      setDoctors([]);
      toast.error("Failed to load doctors");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleEditor = (doc: any) => {
    if (openId === doc._id) {
      setOpenId(null);
      return;
    }
    setOpenId(doc._id);
    setDraft((doc.videos || []).map((v: DoctorVideo) => ({ ...v })));
  };

  const addVideo = () => setDraft((d) => [...d, { title: "", url: "" }]);

  const updateVideo = (index: number, field: "title" | "url", value: string) =>
    setDraft((d) => d.map((v, i) => (i === index ? { ...v, [field]: value } : v)));

  // Persist a videos array for a doctor and refresh local data
  const persist = async (doctorId: string, videos: DoctorVideo[]) => {
    const res = await fetch(`${API_URL}/cms/doctors/${doctorId}`, {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ videos }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to update videos");
    }
    const updated = await res.json();
    setDoctors((prev) =>
      prev.map((d) => (d._id === doctorId ? { ...d, videos: updated.videos || [] } : d)),
    );
    return (updated.videos || []) as DoctorVideo[];
  };

  const handleSave = async () => {
    if (!openId) return;

    for (const v of draft) {
      if (!v.title.trim() || !v.url.trim()) {
        return toast.error("Every video needs a title and a YouTube URL.");
      }
      if (!getYoutubeId(v.url.trim())) {
        return toast.error(`"${v.title}" does not have a valid YouTube URL.`);
      }
    }

    setIsSaving(true);
    try {
      const saved = await persist(
        openId,
        draft.map((v) => ({ ...v, title: v.title.trim(), url: v.url.trim() })),
      );
      setDraft(saved.map((v) => ({ ...v })));
      toast.success("Videos updated successfully!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update videos");
    }
    setIsSaving(false);
  };

  const handleDelete = async (index: number) => {
    if (!openId) return;
    const video = draft[index];

    // Not saved yet — just drop it from the draft
    if (!video._id) {
      setDraft((d) => d.filter((_, i) => i !== index));
      return;
    }

    // Saved video — ask for confirmation in a proper dialog first
    setDeleteTarget({ index, video });
  };

  const confirmDelete = async () => {
    if (!openId || !deleteTarget) return;
    const { index, video } = deleteTarget;
    const label = video.title || "Video";

    setIsSaving(true);
    const toastId = toast.loading("Deleting video...");
    try {
      // Delete only this video; keep every other draft entry unchanged
      // (blank, still-unsaved rows are skipped so backend validation passes)
      const remaining = draft.filter(
        (v, i) => i !== index && v.title.trim() && v.url.trim(),
      );
      const saved = await persist(openId, remaining);
      setDraft(saved.map((v) => ({ ...v })));
      toast.success(`"${label}" deleted successfully`, { id: toastId });
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete video. Please try again.", {
        id: toastId,
      });
    }
    setDeleteTarget(null);
    setIsSaving(false);
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      !search ||
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSaving) setDeleteTarget(null);
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-center text-lg font-bold text-gray-900">
              Delete this video?
            </h3>
            <p className="mt-2 text-center text-sm text-gray-500">
              &quot;{deleteTarget.video.title || deleteTarget.video.url}&quot;
              will be removed from the doctor&apos;s Video Library on the
              website. This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isSaving}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Doctor Videos
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage the Video Library shown on each doctor&apos;s detail page. Add,
          edit or delete videos for any doctor.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                    S.No.
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Videos
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDoctors.map((doc, index) => {
                  const isOpen = openId === doc._id;
                  const count = (doc.videos || []).length;
                  return (
                    <Fragment key={doc._id}>
                      <tr
                        key={doc._id}
                        className={`transition-colors ${isOpen ? "bg-blue-50/40" : "hover:bg-gray-50/50"}`}
                      >
                        <td className="py-3.5 px-4 text-gray-500 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-gray-900">{doc.name}</p>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          {doc.speciality?.name || "-"}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              count > 0
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <Video className="w-3.5 h-3.5" />
                            {count} {count === 1 ? "video" : "videos"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => toggleEditor(doc)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                          >
                            {isOpen ? "Close" : "Manage"}
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {isOpen && (
                        <tr key={`${doc._id}-editor`} className="bg-gray-50/60">
                          <td colSpan={5} className="p-4 sm:p-6">
                            <div className="space-y-4">
                              {draft.length === 0 && (
                                <p className="text-center text-gray-400 py-6">
                                  No videos yet. Click &quot;Add Video&quot; to
                                  add one.
                                </p>
                              )}

                              {draft.map((v, i) => {
                                const vid = getYoutubeId(v.url);
                                return (
                                  <div
                                    key={v._id || `new-${i}`}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row"
                                  >
                                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-48">
                                      {vid ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                          src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                                          alt={v.title || "Video thumbnail"}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                                          <Video className="w-8 h-8" />
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex-1 space-y-3">
                                      <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                          Title
                                        </label>
                                        <input
                                          type="text"
                                          value={v.title}
                                          onChange={(e) =>
                                            updateVideo(i, "title", e.target.value)
                                          }
                                          placeholder="Video title"
                                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-all focus:border-[#0d9488]"
                                        />
                                      </div>
                                      <div>
                                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                                          YouTube URL
                                        </label>
                                        <input
                                          type="text"
                                          value={v.url}
                                          onChange={(e) =>
                                            updateVideo(i, "url", e.target.value)
                                          }
                                          placeholder="https://www.youtube.com/watch?v=..."
                                          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:border-[#0d9488] ${
                                            v.url && !vid
                                              ? "border-red-300"
                                              : "border-gray-200"
                                          }`}
                                        />
                                        {v.url && !vid && (
                                          <p className="mt-1 text-xs text-red-500">
                                            Enter a valid YouTube link.
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-start gap-2 sm:flex-col">
                                      {vid && (
                                        <a
                                          href={`https://www.youtube.com/watch?v=${vid}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          aria-label="Open on YouTube"
                                          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                        </a>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => handleDelete(i)}
                                        disabled={isSaving}
                                        aria-label="Delete video"
                                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}

                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <button
                                  type="button"
                                  onClick={addVideo}
                                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-[#0d9488] hover:text-[#0d9488] cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                  Add Video
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  disabled={isSaving}
                                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                                >
                                  {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Save className="w-4 h-4" />
                                  )}
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <p>No doctors found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
