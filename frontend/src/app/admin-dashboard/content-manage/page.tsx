"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  Video as VideoIcon,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/api";

function SortableBannerRow({ banner, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
    position: isDragging ? "relative" : ("static" as any),
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-gray-50/50 transition-colors ${
        isDragging ? "bg-white shadow-xl ring-1 ring-gray-200" : "bg-transparent"
      }`}
    >
      <td className="pl-4 pr-1 py-3.5 w-10">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1.5 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="py-3.5 px-4 w-20 text-center">
        {banner.type === "video" ? (
          <VideoIcon className="w-6 h-6 text-gray-400 mx-auto" />
        ) : (
          <ImageIcon className="w-6 h-6 text-gray-400 mx-auto" />
        )}
      </td>
      <td className="py-3.5 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-500 uppercase">Desktop Media</p>
          <div className="h-16 w-32 bg-gray-100 rounded overflow-hidden border border-gray-200 relative">
            {banner.type === "video" ? (
              <video
                src={getImageUrl(banner.desktopMediaUrl)}
                className="w-full h-full object-cover"
                muted
                preload="metadata"
              />
            ) : (
              <img
                src={getImageUrl(banner.desktopMediaUrl)}
                alt="Desktop Banner"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-500 uppercase">Mobile Media</p>
          <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden border border-gray-200 relative">
            {banner.mobileMediaUrl ? (
              banner.type === "video" ? (
                <video
                  src={getImageUrl(banner.mobileMediaUrl)}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={getImageUrl(banner.mobileMediaUrl)}
                  alt="Mobile Banner"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Desktop
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
            banner.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {banner.isActive ? "Active" : "Hidden"}
        </span>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="inline-flex gap-1">
          <button
            onClick={() => onEdit(banner)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(banner._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

const API_URL = "/api-backend";

// Keep in sync with backend multer `limits.fileSize` in heroBannerController.js
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const validateMediaFile = (file: File, type: "image" | "video", label: string) => {
  // 1) size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `${label} file is ${formatBytes(file.size)} — maximum allowed is ${MAX_FILE_SIZE_MB} MB. Please compress and try again.`;
  }
  // 2) mime check
  if (type === "image" && !file.type.startsWith("image/")) {
    return `${label} file must be an image (you selected ${file.type || "unknown"}).`;
  }
  if (type === "video" && !file.type.startsWith("video/")) {
    return `${label} file must be a video (you selected ${file.type || "unknown"}).`;
  }
  return null;
};

export default function ManageContentPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    type: "image",
    isActive: true,
  });

  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/hero-banners`, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setBanners(data || []);
      }
    } catch (e) {
      console.error(e);
      setBanners([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBanners((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over?.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        const updates = newOrder.map((b) => b._id);

        fetch(`${API_URL}/cms/hero-banners/reorder`, {
          method: "PUT",
          headers: { ...getHeaders(), "Content-Type": "application/json" },
          body: JSON.stringify({ ids: updates }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to order");
            toast.success("Order saved!");
          })
          .catch(() => toast.error("Failed to save order"));

        return newOrder;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      type: "image",
      isActive: true,
    });
    setDesktopFile(null);
    setMobileFile(null);
  };

  const handleEdit = (banner: any) => {
    setEditingId(banner._id);
    setFormData({
      type: banner.type || "image",
      isActive: banner.isActive !== false,
    });
    setDesktopFile(null);
    setMobileFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await fetch(`${API_URL}/cms/hero-banners/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      fetchBanners();
      toast.success("Banner deleted successfully");
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingId && !desktopFile) {
      toast.error("Please select a desktop media file.");
      return;
    }

    setIsSaving(true);
    const data = new FormData();
    data.append("type", formData.type);
    data.append("isActive", formData.isActive.toString());

    if (desktopFile) data.append("desktopMedia", desktopFile);
    if (mobileFile) data.append("mobileMedia", mobileFile);

    try {
      const res = editingId
        ? await fetch(`${API_URL}/cms/hero-banners/${editingId}`, {
            method: "PUT",
            headers: getHeaders(),
            body: data,
          })
        : await (async () => {
            // Find highest order to append
            const newOrder = banners.length;
            data.append("order", newOrder.toString());
            return fetch(`${API_URL}/cms/hero-banners`, {
              method: "POST",
              headers: getHeaders(),
              body: data,
            });
          })();

      if (!res.ok) {
        // Try to surface a useful error message
        let msg = `Upload failed (HTTP ${res.status})`;
        if (res.status === 413) {
          msg =
            "File too large — server rejected the upload. Try a smaller video/image.";
        } else {
          try {
            const err = await res.json();
            if (err?.error) msg = err.error;
          } catch {
            /* non-JSON body, keep default */
          }
        }
        toast.error(msg);
        setIsSaving(false);
        return;
      }

      toast.success(
        editingId ? "Banner updated successfully" : "Banner created successfully",
      );
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchBanners();
    } catch (error) {
      toast.error("Network error — please check your connection and try again");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Hero Content
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage homepage hero banners here. Drag and drop to reorder active slides.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingId(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th className="w-10 px-4"></th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Type</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Desktop View (1920x1080)
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Mobile View (768x1366)
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={banners.map((b) => b._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {banners.map((banner) => (
                      <SortableBannerRow
                        key={banner._id}
                        banner={banner}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                {banners.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-400">
                      <ImageIcon className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>No banners uploaded yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Banner" : "Add New Banner"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Media Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                >
                  <option value="image">Image / Graphic</option>
                  <option value="video">Video Loop</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Desktop File Upload
                </label>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Recommended Size: 1920x1080px (16:9) · Max {MAX_FILE_SIZE_MB} MB
                </p>
                <input
                  type="file"
                  accept={formData.type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const err = validateMediaFile(
                      f,
                      formData.type as "image" | "video",
                      "Desktop",
                    );
                    if (err) {
                      toast.error(err);
                      e.target.value = "";
                      return;
                    }
                    setDesktopFile(f);
                  }}
                  className="w-full text-sm text-gray-700 border-2 border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#0d9488] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] hover:file:bg-[#0d9488]/20"
                />
                {desktopFile && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Selected: {desktopFile.name} ({formatBytes(desktopFile.size)})
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mobile File Upload
                </label>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Optional. Recommended Size: 768x1366px (Vertical) · Max {MAX_FILE_SIZE_MB} MB
                </p>
                <input
                  type="file"
                  accept={formData.type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const err = validateMediaFile(
                      f,
                      formData.type as "image" | "video",
                      "Mobile",
                    );
                    if (err) {
                      toast.error(err);
                      e.target.value = "";
                      return;
                    }
                    setMobileFile(f);
                  }}
                  className="w-full text-sm text-gray-700 border-2 border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#0d9488] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] hover:file:bg-[#0d9488]/20"
                />
                {mobileFile && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Selected: {mobileFile.name} ({formatBytes(mobileFile.size)})
                  </p>
                )}
                {!mobileFile && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    If left empty, desktop media will be used on mobile.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Publish (Active on Website)
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-[#0d9488]/20 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </span>
                  ) : (
                    "Save Banner"
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
