"use client";

import { useEffect, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Video,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/api";

const API_URL = "/api-backend";

const getHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
});

const emptyForm = {
  department: "",
  type: "image",
  title: "",
  isActive: true,
};

function GalleryCard({
  item,
  onEdit,
  onDelete,
}: {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.65 : 1,
    zIndex: isDragging ? 20 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${
        isDragging ? "ring-2 ring-[#0d9488]/30" : ""
      }`}
    >
      <div className="relative aspect-video bg-gray-100">
        {item.type === "video" ? (
          item.thumbnailUrl ? (
            <img
              src={getImageUrl(item.thumbnailUrl, false, {
                preferRelativeUploads: true,
              })}
              alt={item.title || "Video thumbnail"}
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              src={getImageUrl(item.mediaUrl, false, {
                preferRelativeUploads: true,
              })}
              className="h-full w-full object-cover"
              muted
              preload="metadata"
            />
          )
        ) : (
          <img
            src={getImageUrl(item.mediaUrl, false, {
              preferRelativeUploads: true,
            })}
            alt={item.title || "Gallery image"}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold uppercase text-[#0b1c43]">
          {item.type === "video" ? (
            <Video className="h-3.5 w-3.5" />
          ) : (
            <ImageIcon className="h-3.5 w-3.5" />
          )}
          {item.type}
        </span>
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="absolute right-3 top-3 inline-flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm hover:text-[#0d9488] active:cursor-grabbing"
          aria-label="Drag gallery item"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">
              {item.title || "Untitled"}
            </h3>
            <p className="mt-1 text-xs font-semibold text-gray-400">
              {item.isActive !== false ? "Active" : "Hidden"}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item._id)}
              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableGalleryCardShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.65 : 1,
    zIndex: isDragging ? 20 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${
        isDragging ? "rounded-2xl ring-2 ring-[#0d9488]/30" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function DepartmentGalleryPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const selectedDept = useMemo(
    () => departments.find((dept) => dept._id === selectedDepartment),
    [departments, selectedDepartment],
  );

  const fetchDepartments = async () => {
    const res = await fetch(`${API_URL}/doctors/specialities`);
    const data = await res.json().catch(() => []);
    setDepartments(Array.isArray(data) ? data : []);
    if (!selectedDepartment && Array.isArray(data) && data[0]?._id) {
      setSelectedDepartment(data[0]._id);
    }
  };

  const fetchGallery = async (departmentId = selectedDepartment) => {
    if (!departmentId) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/cms/department-gallery?department=${departmentId}`,
        { headers: getHeaders() },
      );
      const data = await res.json().catch(() => []);
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setItems([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGallery(selectedDepartment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

  const resetForm = () => {
    setFormData({ ...emptyForm, department: selectedDepartment });
    setEditingId(null);
    setMediaFile(null);
    setThumbnailFile(null);
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      department: item.department?._id || selectedDepartment,
      type: item.type || "image",
      title: item.title || "",
      isActive: item.isActive !== false,
    });
    setMediaFile(null);
    setThumbnailFile(null);
    setShowForm(true);
    toast.success("Edit mode opened");
  };

  const handleDelete = (id: string) => {
    toast.custom(
      (toastItem) => (
        <div className="w-[min(360px,calc(100vw-32px))] rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
          <p className="text-sm font-bold text-gray-900">
            Delete this gallery item?
          </p>
          <p className="mt-1 text-xs font-medium leading-5 text-gray-500">
            This media will be removed from the department gallery.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(toastItem.id)}
              className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(toastItem.id);
                deleteGalleryItem(id);
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  const deleteGalleryItem = async (id: string) => {
    const res = await fetch(`${API_URL}/cms/department-gallery/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) {
      toast.error("Failed to delete gallery item");
      return;
    }
    toast.success("Gallery item deleted");
    fetchGallery();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.department) return toast.error("Select a department");
    if (!editingId && !mediaFile) return toast.error("Choose a media file");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value.toString()),
    );
    if (mediaFile) data.append("media", mediaFile);
    if (thumbnailFile) data.append("thumbnail", thumbnailFile);

    setIsSaving(true);
    const res = await fetch(
      editingId
        ? `${API_URL}/cms/department-gallery/${editingId}`
        : `${API_URL}/cms/department-gallery`,
      {
        method: editingId ? "PUT" : "POST",
        headers: getHeaders(),
        body: data,
      },
    );
    setIsSaving(false);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      toast.error(error.error || "Failed to save gallery item");
      return;
    }

    toast.success(editingId ? "Gallery item updated" : "Gallery item added");
    setShowForm(false);
    resetForm();
    fetchGallery(formData.department);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item._id === active.id);
      const newIndex = currentItems.findIndex((item) => item._id === over.id);
      if (oldIndex === -1 || newIndex === -1) return currentItems;

      const nextItems = arrayMove(currentItems, oldIndex, newIndex);
      fetch(`${API_URL}/cms/department-gallery/reorder`, {
        method: "PUT",
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: nextItems.map((item) => item._id) }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save order");
          toast.success("Gallery order saved");
        })
        .catch(() => {
          toast.error("Failed to save gallery order");
          fetchGallery();
        });

      return nextItems;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Department Gallery
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage department-wise photos and videos shown on public pages.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d9488] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#0b8578]"
        >
          <Plus className="h-4 w-4" />
          Add Media
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
          Department
        </label>
        <select
          value={selectedDepartment}
          onChange={(event) => setSelectedDepartment(event.target.value)}
          className="w-full max-w-md rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-[#0d9488]"
        >
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name} (/{department.slug})
            </option>
          ))}
        </select>
        {selectedDept?.slug && (
          <p className="mt-2 text-xs font-semibold text-gray-400">
            Public page section: /departments/{selectedDept.slug}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-semibold">No gallery items yet</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <SortableGalleryCardShell key={item._id} id={item._id}>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                      <div className="relative aspect-video bg-gray-100">
                        {item.type === "video" ? (
                          item.thumbnailUrl ? (
                            <img
                              src={getImageUrl(item.thumbnailUrl, false, {
                                preferRelativeUploads: true,
                              })}
                              alt={item.title || "Video thumbnail"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              src={getImageUrl(item.mediaUrl, false, {
                                preferRelativeUploads: true,
                              })}
                              className="h-full w-full object-cover"
                              muted
                              preload="metadata"
                            />
                          )
                        ) : (
                          <img
                            src={getImageUrl(item.mediaUrl, false, {
                              preferRelativeUploads: true,
                            })}
                            alt={item.title || "Gallery image"}
                            className="h-full w-full object-cover"
                          />
                        )}
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold uppercase text-[#0b1c43]">
                          {item.type === "video" ? (
                            <Video className="h-3.5 w-3.5" />
                          ) : (
                            <ImageIcon className="h-3.5 w-3.5" />
                          )}
                          {item.type}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {item.title || "Untitled"}
                            </h3>
                            <p className="mt-1 text-xs font-semibold text-gray-400">
                              {item.isActive !== false ? "Active" : "Hidden"}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => openEdit(item)}
                              className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SortableGalleryCardShell>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[8vh]">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              {editingId ? "Edit Gallery Item" : "Add Gallery Item"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Department *
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        department: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                  >
                    <option value="">Select department</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(event) =>
                      setFormData({ ...formData, type: event.target.value })
                    }
                    className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                  >
                    <option value="image">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Title
                </label>
                <input
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                  placeholder="Cath lab, OPD facility, procedure video..."
                />
              </div>

              <div>
                <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        isActive: event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#0d9488]"
                  />
                  Show on website
                </label>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Media file {editingId ? "" : "*"}
                </label>
                <input
                  type="file"
                  accept={formData.type === "video" ? "video/*" : "image/*"}
                  onChange={(event) =>
                    setMediaFile(event.target.files?.[0] || null)
                  }
                  className="w-full rounded-xl border-2 border-dashed border-gray-200 px-3 py-3 text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Upload photo or video. Max 80 MB.
                </p>
              </div>

              {formData.type === "video" && (
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Video thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setThumbnailFile(event.target.files?.[0] || null)
                    }
                    className="w-full rounded-xl border-2 border-dashed border-gray-200 px-3 py-3 text-sm"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-xl bg-[#0d9488] px-4 py-3 text-sm font-bold text-white hover:bg-[#0b8578] disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
