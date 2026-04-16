"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
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
  verticalListSortingStrategy,
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
import Image from "next/image";
import toast from "react-hot-toast";
import { type PatientStory } from "@/lib/api";
import {
  getPatientStoryLabel,
  getStoryThumbnailUrl,
  getVideoPlatform,
  getYoutubeId,
} from "@/lib/patientStories";

const API_URL = "/api-backend";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type StoryForm = {
  title: string;
  videoUrl: string;
  isActive: boolean;
};

const defaultForm: StoryForm = {
  title: "",
  videoUrl: "",
  isActive: true,
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SortableStoryRow({
  story,
  index,
  onEdit,
  onDelete,
}: {
  story: PatientStory;
  index: number;
  onEdit: (story: PatientStory) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: story._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: isDragging ? ("relative" as const) : ("static" as const),
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`transition-colors ${isDragging ? "bg-white shadow-xl" : "hover:bg-gray-50/80"}`}
    >
      <td className="pl-4 pr-1 py-3.5 w-10">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="py-3.5 px-4">
        <div className="relative h-16 w-28 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
          <Image
            src={getStoryThumbnailUrl(story.thumbnailUrl, story.videoUrl)}
            alt={story.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
      </td>
      <td className="py-3.5 px-4">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">
            {getPatientStoryLabel(index)}
          </p>
          {story.title ? <p className="text-xs text-gray-500">{story.title}</p> : null}
        </div>
      </td>
      <td className="py-3.5 px-4">
        <a
          href={story.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex max-w-[280px] items-center gap-2 text-sm text-[#0d9488] hover:text-[#0b8578] truncate"
        >
          <Video className="w-4 h-4 shrink-0" />
          <span className="truncate">{story.videoUrl}</span>
        </a>
      </td>
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
            story.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {story.isActive ? "Active" : "Hidden"}
        </span>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="inline-flex gap-1">
          <button
            onClick={() => onEdit(story)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(story._id)}
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

export default function PatientStoriesManagePage() {
  const [stories, setStories] = useState<PatientStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<PatientStory | null>(null);
  const [formData, setFormData] = useState<StoryForm>(defaultForm);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/patient-stories`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch patient stories");
      const data = await res.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setStories([]);
      toast.error("Failed to load patient stories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const resetForm = () => {
    setEditingStory(null);
    setFormData(defaultForm);
    setThumbnailFile(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (story: PatientStory) => {
    setEditingStory(story);
    setFormData({
      title: story.title || "",
      videoUrl: story.videoUrl,
      isActive: story.isActive,
    });
    setThumbnailFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient story?")) return;

    try {
      const res = await fetch(`${API_URL}/cms/patient-stories/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Patient story deleted");
      fetchStories();
    } catch (error) {
      toast.error("Failed to delete patient story");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setStories((items) => {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);

      fetch(`${API_URL}/cms/patient-stories/reorder`, {
        method: "PUT",
        headers: { ...getHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ ids: reordered.map((item) => item._id) }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed");
          toast.success("Order saved");
        })
        .catch(() => toast.error("Failed to save order"));

      return reordered;
    });
  };

  const handleThumbnailChange = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Thumbnail must be an image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(
        `Thumbnail is ${formatBytes(file.size)}. Maximum allowed is ${MAX_FILE_SIZE_MB} MB.`,
      );
      return;
    }
    setThumbnailFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.videoUrl.trim()) {
      toast.error("Video link is required");
      return;
    }

    const platform = getVideoPlatform(formData.videoUrl.trim());
    if (platform !== "youtube" && platform !== "facebook") {
      toast.error("Only YouTube or Facebook video links are supported.");
      return;
    }

    setIsSaving(true);
    const editingIndex = editingStory
      ? stories.findIndex((item) => item._id === editingStory._id)
      : -1;
    const data = new FormData();
    const generatedName = editingStory
      ? getPatientStoryLabel(Math.max(editingIndex, 0))
      : getPatientStoryLabel(stories.length);
    data.append("title", formData.title.trim());
    data.append("name", generatedName);
    data.append("videoUrl", formData.videoUrl.trim());
    data.append("isActive", String(formData.isActive));

    if (!editingStory) {
      data.append("order", String(stories.length));
    }
    if (thumbnailFile) {
      data.append("thumbnail", thumbnailFile);
    }

    try {
      const res = await fetch(
        editingStory
          ? `${API_URL}/cms/patient-stories/${editingStory._id}`
          : `${API_URL}/cms/patient-stories`,
        {
          method: editingStory ? "PUT" : "POST",
          headers: getHeaders(),
          body: data,
        },
      );

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.error || "Unable to save");
      }

      toast.success(editingStory ? "Patient story updated" : "Patient story created");
      setShowForm(false);
      resetForm();
      fetchStories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save patient story");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Patients Speak
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add YouTube or Facebook links with custom thumbnails. Drag to reorder cards.
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Story
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
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Story
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Video Link
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
                    items={stories.map((story) => story._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {stories.map((story) => (
                      <SortableStoryRow
                        key={story._id}
                        story={story}
                        index={stories.findIndex((item) => item._id === story._id)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                {stories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-400">
                      <ImageIcon className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>No patient stories added yet</p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 sm:p-8 relative">
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingStory ? "Edit Patient Story" : "Add Patient Story"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Card Title
                </label>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((current) => ({ ...current, title: e.target.value }))
                  }
                  placeholder="Optional short headline"
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Story Number
                </label>
                <div className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                  {editingStory
                    ? getPatientStoryLabel(
                        Math.max(
                          stories.findIndex((item) => item._id === editingStory._id),
                          0,
                        ),
                      )
                    : getPatientStoryLabel(stories.length)}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  New stories automatically get the next patient story number.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Video Link
                </label>
                <input
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData((current) => ({ ...current, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=... or https://facebook.com/..."
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  YouTube or Facebook video links are supported.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Thumbnail Upload
                </label>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Optional. Recommended Size: 1280x720px · Max {MAX_FILE_SIZE_MB} MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleThumbnailChange(e.target.files?.[0])}
                  className="w-full text-sm text-gray-700 border-2 border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#0d9488] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] hover:file:bg-[#0d9488]/20"
                />
                {thumbnailFile ? (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Selected: {thumbnailFile.name} ({formatBytes(thumbnailFile.size)})
                  </p>
                ) : editingStory ? (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Keep current thumbnail, or use the YouTube thumbnail by default if no custom one is saved.
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 mt-1">
                    If you do not upload a thumbnail, the YouTube video thumbnail will be used by default.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="patient-story-active"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((current) => ({ ...current, isActive: e.target.checked }))
                  }
                  className="w-4 h-4 text-[#0d9488] rounded border-gray-300 focus:ring-[#0d9488]"
                />
                <label
                  htmlFor="patient-story-active"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Publish on website
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
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
                  ) : editingStory ? (
                    "Update Story"
                  ) : (
                    "Save Story"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
