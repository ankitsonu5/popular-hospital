"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Newspaper,
  Loader2,
  Save,
  X,
  ArrowLeft,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { getImageUrl } from "@/lib/api";

const API_URL = "/api-backend";

function PressActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dateIso: "",
    source: "",
    isActive: true,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; isExisting: boolean; path?: string }[]
  >([]);

  useEffect(() => {
    if (editId) {
      const fetchPress = async () => {
        try {
          const res = await fetch(`${API_URL}/cms/coverage`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
              ...item,
              dateIso: item.date
                ? new Date(item.date).toISOString().split("T")[0]
                : "",
            });
            // Load existing gallery images (or fallback to single image)
            const existingImages: {
              src: string;
              isExisting: boolean;
              path: string;
            }[] = [];
            if (item.gallery && item.gallery.length > 0) {
              item.gallery.forEach((img: string) => {
                existingImages.push({
                  src: getImageUrl(img),
                  isExisting: true,
                  path: img,
                });
              });
            } else if (item.image) {
              existingImages.push({
                src: getImageUrl(item.image),
                isExisting: true,
                path: item.image,
              });
            }
            setImagePreviews(existingImages);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchPress();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("date", formData.date);
    submitData.append("source", formData.source);
    submitData.append("isActive", String(formData.isActive));

    // Append new image files
    imageFiles.forEach((file) => {
      submitData.append("gallery", file);
    });

    // Append existing image paths that were kept
    const existingPaths = imagePreviews
      .filter((p) => p.isExisting && p.path)
      .map((p) => p.path!);
    submitData.append("existingGallery", JSON.stringify(existingPaths));

    try {
      const url = editId
        ? `${API_URL}/cms/coverage/${editId}`
        : `${API_URL}/cms/coverage`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: submitData,
      });

      if (!res.ok) throw new Error("Failed to save press release");
      alert(editId ? "Press clipping updated!" : "Press clipping published!");
      if (window.opener || window.history.length === 1) window.close();
      router.push("/admin-dashboard/media-blog/coverage");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans">
      {/* ─── Header Section ─── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => window.close()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shadow-sm">
                <Newspaper className="w-5 h-5 text-teal-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? "Edit Clipping" : "New Press Coverage"}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Press Archive • Popular Hospital
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.close()}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{editId ? "Save Changes" : "Publish Coverage"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Form Content ─── */}
      <div className="max-w-[1366px] mx-auto mt-8 px-4 sm:px-8 lg:px-12">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Details Panel */}
          <div className="lg:col-span-12 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                Coverage Details
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Publication Heading *
                    </label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-bold"
                      placeholder="Enter headline as seen in publication..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        required
                        type="date"
                        value={formData.dateIso}
                        onChange={(e) => {
                          const iso = e.target.value;
                          if (!iso) return;
                          setFormData({
                            ...formData,
                            dateIso: iso,
                            date: new Date(iso).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }),
                          });
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Media Source *
                      </label>
                      <input
                        required
                        value={formData.source}
                        onChange={(e) =>
                          setFormData({ ...formData, source: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold"
                        placeholder="e.g. Times of India"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700">
                        Gallery Visibility
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.isActive}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isActive: e.target.checked,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium italic">
                      Status:{" "}
                      {formData.isActive
                        ? "VISIBLE IN PRESS SECTION"
                        : "HIDDEN FROM PUBLIC VIEW"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Press Clipping Photo *
                    <span className="text-xs text-gray-400 font-normal ml-2">
                      (Multiple images allowed)
                    </span>
                  </label>

                  {/* Image Previews Grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 group"
                        >
                          <img
                            src={preview.src}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = imagePreviews.filter(
                                (_, i) => i !== index,
                              );
                              setImagePreviews(newPreviews);
                              // Remove from new files if it's not an existing image
                              if (!preview.isExisting) {
                                const newFileIndex = imagePreviews
                                  .slice(0, index)
                                  .filter((p) => !p.isExisting).length;
                                setImageFiles((prev) =>
                                  prev.filter((_, i) => i !== newFileIndex),
                                );
                              }
                            }}
                            className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase rounded-full">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="relative aspect-[3/4] sm:aspect-video lg:aspect-[4/3] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group shadow-inner">
                    <div className="text-center">
                      <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {imagePreviews.length > 0
                          ? "Add More Photos"
                          : "Scan or Photo of Publication"}
                      </p>
                      <p className="text-[9px] text-gray-300 mt-1">
                        Select multiple files at once
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          setImageFiles((prev) => [...prev, ...files]);
                          const newPreviews = files.map((f) => ({
                            src: URL.createObjectURL(f),
                            isExisting: false,
                          }));
                          setImagePreviews((prev) => [...prev, ...newPreviews]);
                        }
                        e.target.value = "";
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PressActionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <PressActionForm />
    </Suspense>
  );
}
