"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  Bell,
  Sparkles,
  Megaphone,
  MapPin,
  Calendar,
  FileText,
  Link2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface UpdateItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  iconType: string;
  isImportant: boolean;
  isActive: boolean;
  pdfUrl?: string;
  imageUrl?: string;
  linkUrl?: string;
}

const API_URL = "/api-backend";

function UpdatesHub() {
  const router = useRouter();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState<Partial<UpdateItem>>({
    title: "",
    category: "",
    date: "",
    description: "",
    iconType: "bell",
    isImportant: false,
    isActive: true,
    pdfUrl: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const getHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/updates?all=true`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
        },
      });
      if (res.status === 401) return router.push("/admin-login");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch updates");
      setUpdates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleOpenModal = (update?: UpdateItem) => {
    if (update) {
      setCurrentUpdate(update);
      setIsEditMode(true);
    } else {
      setCurrentUpdate({
        title: "",
        category: "",
        date: "",
        description: "",
        iconType: "bell",
        isImportant: false,
        isActive: true,
        pdfUrl: "",
        imageUrl: "",
        linkUrl: "",
      });
      setIsEditMode(false);
    }
    setSelectedFile(null);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isCustomIcon = [
        "bell",
        "clock",
        "heart",
        "star",
        "alert",
        "news",
        "event",
      ].includes(currentUpdate.iconType || "")
        ? currentUpdate.iconType
        : "bell";

      const formData = new FormData();
      formData.append("title", currentUpdate.title || "");
      formData.append("category", currentUpdate.category || "");
      formData.append("date", currentUpdate.date || "");
      formData.append("description", currentUpdate.description || "");
      formData.append("iconType", String(isCustomIcon));
      formData.append("isImportant", String(currentUpdate.isImportant));
      formData.append("isActive", String(currentUpdate.isActive));
      formData.append("linkUrl", currentUpdate.linkUrl || "");

      if (selectedFile) {
        formData.append("pdf", selectedFile);
      }
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const url = isEditMode
        ? `${API_URL}/cms/updates/${currentUpdate._id}`
        : `${API_URL}/cms/updates`;
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save update");

      setIsModalOpen(false);
      fetchUpdates();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;
    try {
      const res = await fetch(`${API_URL}/cms/updates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setUpdates(updates.filter((u) => u._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-40 min-h-screen items-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#E85222]/30" />
      </div>
    );
  if (error)
    return (
      <div className="p-10 max-w-2xl mx-auto">
        <div className="bg-red-50 p-6 text-red-600 font-bold border border-red-100 flex items-center gap-4 text-sm tracking-tight">
          <X className="w-5 h-5 shrink-0" /> {error}
        </div>
      </div>
    );

  return (
    <div className="updates-flat max-w-[1366px] mx-auto pb-24 font-sans tracking-tight">
      {/* ─── Premium Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#E85222] bg-[#E85222]/5 px-4 py-1.5 uppercase tracking-widest mb-2 w-fit border-l-4 border-[#E85222] animate-in fade-in slide-in-from-left duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Public Notices Hub</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tighter">
            Announcements Hub
          </h1>
          <p className="text-base text-gray-500 font-medium tracking-tight">
            Broadcast feed for hospital notices, events and clinical updates.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#E85222] hover:bg-[#d4431a] text-white transition-all font-bold text-sm active:scale-95"
        >
          <Megaphone className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* ─── Archive Table ─── */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 font-extrabold text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <th className="px-10 py-6 text-left">Internal ID</th>
                <th className="px-10 py-6 text-left">Notice Headlines</th>
                <th className="px-10 py-6 text-left">Context & Date</th>
                <th className="px-10 py-6 text-center">Engagement</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {updates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-40 text-center">
                    <Megaphone className="w-10 h-10 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-gray-400 font-bold text-lg tracking-tight uppercase">
                      No Announcements BroadcastED
                    </h3>
                  </td>
                </tr>
              ) : (
                updates.map((update) => (
                  <tr
                    key={update._id}
                    className="group hover:bg-[#284a91]/[0.03] transition-all duration-300"
                  >
                    <td className="px-10 py-8 whitespace-nowrap">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        #{update._id.slice(-6)}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <h3
                          className={`font-extrabold tracking-tight group-hover:text-[#284a91] transition-colors line-clamp-1 ${update.isImportant ? "text-gray-900 border-l-2 border-red-500 pl-3" : "text-gray-800"}`}
                        >
                          {update.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          {update.imageUrl && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                              <span>Image Added</span>
                            </div>
                          )}
                          {update.pdfUrl && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
                              <FileText className="w-2.5 h-2.5" />
                              <span>PDF Attachment</span>
                            </div>
                          )}
                          {update.linkUrl && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-violet-50 text-violet-600 text-[9px] font-black uppercase tracking-widest border border-violet-100">
                              <Link2 className="w-2.5 h-2.5" />
                              <span>Link Added</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#E85222] uppercase tracking-widest mb-1.5">
                          <MapPin className="w-3 h-3" />
                          <span>{update.category}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                          <Calendar className="w-3 h-3" />
                          <span>{update.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center whitespace-nowrap">
                      <div
                        className={`px-4 py-1.5 inline-flex items-center justify-center border font-extrabold text-[10px] uppercase tracking-widest transition-all ${
                          update.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {update.isActive ? "Live" : "Draft"}
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-1 pr-2 transition-all">
                        <button
                          onClick={() => handleOpenModal(update)}
                          className="p-3.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(update._id)}
                          className="p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md sm:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white shadow-2xl w-full max-w-2xl my-auto p-8 sm:p-10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-500 relative border border-gray-200">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-orange-50 flex items-center justify-center border border-orange-100 text-[#E85222]">
                  <Megaphone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                    {isEditMode
                      ? "Modify Official Update"
                      : "New System Broadcast"}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1.5">
                    Hospital Communication Protocol
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 text-gray-300 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                    Archive Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23-03-2026"
                    className="w-full px-6 py-4.5 bg-gray-50/50 border-2 border-transparent focus:border-[#E85222] focus:bg-white outline-none transition-all text-sm font-bold text-gray-900"
                    value={currentUpdate.date}
                    onChange={(e) =>
                      setCurrentUpdate({
                        ...currentUpdate,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                    Distribution Context
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Departments"
                    className="w-full px-6 py-4.5 bg-gray-50/50 border-2 border-transparent focus:border-[#E85222] focus:bg-white outline-none transition-all text-sm font-bold text-gray-900"
                    value={currentUpdate.category}
                    onChange={(e) =>
                      setCurrentUpdate({
                        ...currentUpdate,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                  Official Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter primary notification title..."
                  className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent focus:border-[#E85222] focus:bg-white outline-none transition-all text-lg font-black text-gray-900"
                  value={currentUpdate.title}
                  onChange={(e) =>
                    setCurrentUpdate({
                      ...currentUpdate,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                  Detailed Briefing
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Full communication substance for public distribution..."
                  className="w-full px-6 py-5 bg-gray-50/50 border-2 border-transparent focus:border-[#E85222] focus:bg-white outline-none transition-all text-sm font-bold resize-none leading-relaxed text-gray-700"
                  value={currentUpdate.description}
                  onChange={(e) =>
                    setCurrentUpdate({
                      ...currentUpdate,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                    Card Image
                  </label>
                  <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/60 px-5 py-6 text-center transition-all hover:border-[#284a91] hover:bg-blue-50/40">
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) =>
                        setSelectedImage(e.target.files?.[0] || null)
                      }
                    />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-800">
                      {selectedImage
                        ? selectedImage.name
                        : currentUpdate.imageUrl
                          ? "Replace uploaded image"
                          : "Upload update image"}
                    </span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      JPG, PNG, WEBP
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                    PDF Attachment
                  </label>
                  <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/60 px-5 py-6 text-center transition-all hover:border-[#E85222] hover:bg-orange-50/40">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                    />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-800">
                      {selectedFile
                        ? selectedFile.name
                        : currentUpdate.pdfUrl
                          ? "Replace uploaded PDF"
                          : "Upload PDF"}
                    </span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Optional document
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                  External Link <span className="text-gray-300 font-bold normal-case tracking-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="url"
                    placeholder="https://example.com/more-info"
                    className="w-full pl-11 pr-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-[#E85222] focus:bg-white outline-none transition-all text-sm font-bold text-gray-900"
                    value={currentUpdate.linkUrl || ""}
                    onChange={(e) =>
                      setCurrentUpdate({ ...currentUpdate, linkUrl: e.target.value })
                    }
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 ml-1">
                  If added, a "Read More" button will appear on the public page
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 bg-gray-50/50 p-6 border border-gray-100">
                <label className="flex-1 flex items-center gap-5 cursor-pointer group bg-white p-5 border border-gray-100 hover:border-red-200 transition-all hover:shadow-md active:scale-[0.98]">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={currentUpdate.isImportant}
                    onChange={(e) =>
                      setCurrentUpdate({
                        ...currentUpdate,
                        isImportant: e.target.checked,
                      })
                    }
                  />
                  <div
                    className={`w-10 h-10 border-2 flex items-center justify-center transition-all duration-300 ${currentUpdate.isImportant ? "bg-red-500 border-red-500 shadow-lg shadow-red-500/20" : "border-gray-200 bg-white group-hover:border-red-200"}`}
                  >
                    {currentUpdate.isImportant && (
                      <Check className="w-6 h-6 text-white font-black animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">
                      Urgent Alert
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      Alerts whole system
                    </span>
                  </div>
                </label>

                <label className="flex-1 flex items-center gap-5 cursor-pointer group bg-white p-5 border border-gray-100 hover:border-emerald-200 transition-all hover:shadow-md active:scale-[0.98]">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={currentUpdate.isActive}
                    onChange={(e) =>
                      setCurrentUpdate({
                        ...currentUpdate,
                        isActive: e.target.checked,
                      })
                    }
                  />
                  <div
                    className={`w-10 h-10 border-2 flex items-center justify-center transition-all duration-300 ${currentUpdate.isActive ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-gray-200 bg-white group-hover:border-emerald-200"}`}
                  >
                    {currentUpdate.isActive && (
                      <Check className="w-6 h-6 text-white font-black animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">
                      Live View
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      Online for public
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end items-center gap-8 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[11px] font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-[0.2em] px-4"
                >
                  Discard Notice
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-[#E85222] hover:bg-[#d4431a] text-white font-black text-sm shadow-xl shadow-orange-500/30 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center gap-4"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Megaphone className="w-6 h-6" />
                  )}
                  <span>
                    {isEditMode ? "Authorize Revision" : "Authorize Release"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style jsx global>{`
        .updates-flat,
        .updates-flat * {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
}

export default function AdminUpdatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-12 h-12 animate-spin text-[#E85222]" />
        </div>
      }
    >
      <UpdatesHub />
    </Suspense>
  );
}
