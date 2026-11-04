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
  Building2,
  ChevronDown,
  GripVertical,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  Video,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getImageUrl } from "@/lib/api";
import { getYoutubeId } from "@/lib/patientStories";

const API_URL = "/api-backend";
const MAX_THUMBNAIL_SIZE = 200 * 1024;

const getHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
});

const emptyForm = {
  department: "",
  type: "image",
  title: "",
  mediaUrl: "",
  isActive: true,
};

const getVideoThumbnail = (item: any) => {
  const customThumbnail = item.thumbnailUrl || item.thumbnailMobileUrl;
  if (customThumbnail) {
    return getImageUrl(customThumbnail, false, {
      preferRelativeUploads: true,
    });
  }

  const youtubeId = getYoutubeId(item.mediaUrl || "");
  return youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : "";
};

function GalleryCard({
  item,
  onEdit,
  onDelete,
  isDeleting,
}: {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
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
          getVideoThumbnail(item) ? (
            <img
              src={getVideoThumbnail(item)}
              alt={item.title || "Video thumbnail"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              <Video className="h-10 w-10" />
            </div>
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
              disabled={isDeleting}
              className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
              aria-label={`Edit ${item.title || "gallery item"}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item._id)}
              disabled={isDeleting}
              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Delete ${item.title || "gallery item"}`}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DepartmentGalleryPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [desktopThumbnailFile, setDesktopThumbnailFile] =
    useState<File | null>(null);
  const [mobileThumbnailFile, setMobileThumbnailFile] =
    useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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
  const currentEditingItem = useMemo(
    () => items.find((item) => item._id === editingId) || null,
    [editingId, items],
  );
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      [
        item.title || "Untitled",
        item.type,
        item.isActive !== false ? "Active" : "Hidden",
        item.mediaUrl,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [items, searchQuery]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_URL}/doctors/specialities`);
      const data = await res.json().catch(() => []);
      setDepartments(Array.isArray(data) ? data : []);
    } catch {
      setDepartments([]);
      toast.error("Failed to load departments");
    }
  };

  const fetchGallery = async (departmentId = selectedDepartment) => {
    if (!departmentId) {
      setItems([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/cms/department-gallery?department=${departmentId}`,
        { headers: getHeaders() },
      );
      const data = await res.json().catch(() => []);
      setItems(Array.isArray(data) ? data : []);
    } catch {
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
    setDesktopThumbnailFile(null);
    setMobileThumbnailFile(null);
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
      mediaUrl: item.type === "video" ? item.mediaUrl || "" : "",
      isActive: item.isActive !== false,
    });
    setMediaFile(null);
    setDesktopThumbnailFile(null);
    setMobileThumbnailFile(null);
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
                void deleteGalleryItem(id);
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  const deleteGalleryItem = async (id: string) => {
    if (deletingId) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/cms/department-gallery/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "Failed to delete gallery item",
        );
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item._id !== id),
      );
      toast.success("Gallery item deleted");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete gallery item. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleThumbnailSelection = (
    file: File | null,
    label: string,
    setFile: (nextFile: File | null) => void,
  ) => {
    if (!file) {
      setFile(null);
      return true;
    }
    if (!file.type.startsWith("image/")) {
      toast.error(`${label} must be an image file`);
      setFile(null);
      return false;
    }
    if (file.size > MAX_THUMBNAIL_SIZE) {
      toast.error(`${label} must be 200 KB or smaller`);
      setFile(null);
      return false;
    }

    setFile(file);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.department) return toast.error("Select a department");

    const editingItem = currentEditingItem;

    if (formData.type === "video") {
      if (!getYoutubeId(formData.mediaUrl.trim())) {
        return toast.error("Enter a valid YouTube video link");
      }
      if (!desktopThumbnailFile && !editingItem?.thumbnailUrl) {
        return toast.error("Choose a desktop video thumbnail");
      }
      if (!mobileThumbnailFile && !editingItem?.thumbnailMobileUrl) {
        return toast.error("Choose a mobile video thumbnail");
      }
    } else if (
      !mediaFile &&
      (!editingItem || editingItem.type !== "image")
    ) {
      return toast.error("Choose a gallery photo");
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value.toString()),
    );
    if (mediaFile) data.append("media", mediaFile);
    if (desktopThumbnailFile)
      data.append("thumbnailDesktop", desktopThumbnailFile);
    if (mobileThumbnailFile)
      data.append("thumbnailMobile", mobileThumbnailFile);

    setIsSaving(true);
    try {
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
      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "Failed to save gallery item",
        );
      }

      const savedDepartment = formData.department;
      toast.success(editingId ? "Gallery item updated" : "Gallery item added");
      setShowForm(false);
      resetForm();
      setSearchQuery("");

      if (selectedDepartment !== savedDepartment) {
        setSelectedDepartment(savedDepartment);
      } else {
        await fetchGallery(savedDepartment);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save gallery item. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
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
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
              Department
            </label>
            <div
              className={`group relative overflow-hidden rounded-xl border-2 bg-gradient-to-r transition-all focus-within:border-[#0d9488] focus-within:ring-4 focus-within:ring-[#0d9488]/10 ${
                selectedDepartment
                  ? "border-[#0d9488]/30 from-[#f0fdfa] to-white"
                  : "border-gray-200 from-gray-50 to-white"
              }`}
            >
              <span
                className={`pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg ${
                  selectedDepartment
                    ? "bg-[#0d9488] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Building2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <select
                value={selectedDepartment}
                onChange={(event) => {
                  setSelectedDepartment(event.target.value);
                  setSearchQuery("");
                }}
                className={`w-full appearance-none bg-transparent py-3.5 pl-14 pr-12 text-sm font-bold outline-none ${
                  selectedDepartment ? "text-gray-900" : "text-gray-500"
                }`}
              >
                <option value="" disabled>
                  Select a department to filter gallery
                </option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name} — /{department.slug}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-transform group-focus-within:rotate-180 group-focus-within:text-[#0d9488]"
                aria-hidden="true"
              />
            </div>
            {selectedDept?.slug && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#0d9488]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                Public page: /departments/{selectedDept.slug}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="gallery-search"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400"
            >
              Search gallery
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="gallery-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                disabled={!selectedDepartment}
                placeholder={
                  selectedDepartment
                    ? "Search by title, type or status..."
                    : "Select a department first"
                }
                className="w-full rounded-xl border-2 border-gray-200 py-3 pl-10 pr-10 text-sm font-semibold outline-none focus:border-[#0d9488] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Clear gallery search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-400">
              {!selectedDepartment
                ? "Search becomes available after selecting a department"
                : searchQuery.trim()
                ? `${filteredItems.length} of ${items.length} items found`
                : `${items.length} gallery ${items.length === 1 ? "item" : "items"}`}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {!selectedDepartment ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0fdfa] text-[#0d9488]">
              <Building2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-bold text-gray-700">
              Select a department to view its gallery
            </p>
            <p className="mt-1 text-xs font-medium text-gray-400">
              Gallery items will appear here after you choose a department above.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-semibold">No gallery items yet</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Search className="mx-auto mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-semibold">No matching gallery items</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs font-bold text-[#0d9488] hover:text-[#0b8578]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredItems.map((item) => item._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => (
                  <GalleryCard
                    key={item._id}
                    item={item}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    isDeleting={deletingId === item._id}
                  />
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
                    onChange={(event) => {
                      const nextType = event.target.value;
                      setFormData({ ...formData, type: nextType });
                      setMediaFile(null);
                      setDesktopThumbnailFile(null);
                      setMobileThumbnailFile(null);
                    }}
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

              {formData.type === "video" ? (
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    YouTube video link *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.mediaUrl}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        mediaUrl: event.target.value,
                      })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Only youtube.com and youtu.be video links are accepted.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Media file {currentEditingItem?.type === "image" ? "" : "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required={!currentEditingItem || currentEditingItem.type !== "image"}
                    onChange={(event) =>
                      setMediaFile(event.target.files?.[0] || null)
                    }
                    className="w-full rounded-xl border-2 border-dashed border-gray-200 px-3 py-3 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Upload a gallery photo. Max 80 MB.
                  </p>
                </div>
              )}

              {formData.type === "video" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Desktop thumbnail {currentEditingItem?.thumbnailUrl ? "" : "*"}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!currentEditingItem?.thumbnailUrl}
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (
                          !handleThumbnailSelection(
                            file,
                            "Desktop thumbnail",
                            setDesktopThumbnailFile,
                          )
                        ) {
                          event.currentTarget.value = "";
                        }
                      }}
                      className="w-full rounded-xl border-2 border-dashed border-gray-200 px-3 py-3 text-xs"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Landscape image, maximum 200 KB.
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Mobile thumbnail {currentEditingItem?.thumbnailMobileUrl ? "" : "*"}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!currentEditingItem?.thumbnailMobileUrl}
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (
                          !handleThumbnailSelection(
                            file,
                            "Mobile thumbnail",
                            setMobileThumbnailFile,
                          )
                        ) {
                          event.currentTarget.value = "";
                        }
                      }}
                      className="w-full rounded-xl border-2 border-dashed border-gray-200 px-3 py-3 text-xs"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Portrait/mobile image, maximum 200 KB.
                    </p>
                  </div>
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
