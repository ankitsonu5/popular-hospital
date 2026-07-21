"use client";
import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/api";

const API_URL = "/api-backend";

const defaultOpdTimings = {
  monday: "9am-12pm & 4pm-8pm",
  tuesday: "9am-12pm & 4pm-8pm",
  wednesday: "9am-12pm & 4pm-8pm",
  thursday: "9am-12pm & 4pm-8pm",
  friday: "9am-12pm & 4pm-8pm",
  saturday: "9am-12pm & 4pm-8pm",
  sunday: "-",
};

const emptyForm = {
  name: "",
  slug: "",
  speciality: "",
  qualification: "",
  designation: "",
  experience_years: "",
  experience_location: "",
  bio: "",
  image_url: "",
  consultation_fee: "",
  available_days: "",
  branches: [] as string[],
  is_active: true,
  opd_timings: defaultOpdTimings,
};

export default function DoctorFormModal({
  specialities,
  designations,
  editingDoctor,
  defaultSpecialityId,
  lockSpeciality,
  onClose,
  onSaved,
}: {
  specialities: any[];
  designations: any[];
  editingDoctor?: any | null;
  defaultSpecialityId?: string;
  lockSpeciality?: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [formData, setFormData] = useState(() => {
    if (editingDoctor) {
      return {
        name: editingDoctor.name || "",
        slug: editingDoctor.slug || "",
        speciality:
          editingDoctor.speciality?._id || editingDoctor.speciality || "",
        qualification: editingDoctor.qualification || "",
        designation:
          editingDoctor.designation?._id || editingDoctor.designation || "",
        experience_years: editingDoctor.experience_years?.toString() || "",
        experience_location: editingDoctor.experience_location || "",
        bio: editingDoctor.bio || "",
        image_url: editingDoctor.image_url || "",
        consultation_fee: editingDoctor.consultation_fee?.toString() || "",
        available_days: editingDoctor.available_days || "",
        branches:
          editingDoctor.branches?.map((b: any) => b._id || b) || [],
        is_active: editingDoctor.is_active !== false,
        opd_timings: editingDoctor.opd_timings || defaultOpdTimings,
      };
    }
    return { ...emptyForm, speciality: defaultSpecialityId || "" };
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    editingDoctor?.image_url ? getImageUrl(editingDoctor.image_url) : null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const editingId = editingDoctor?._id || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "branches") {
        (value as string[]).forEach((b: string) =>
          data.append("branches[]", b),
        );
      } else if (key === "opd_timings") {
        data.append(key, JSON.stringify(value));
      } else if (key === "image_url" && selectedFile) {
        // Skip old image_url when a new file is selected — let backend use the new upload
      } else {
        data.append(key, value?.toString() || "");
      }
    });
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
      };
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/cms/doctors/${editingId}`, {
          method: "PUT",
          headers,
          body: data,
        });
      } else {
        res = await fetch(`${API_URL}/cms/doctors`, {
          method: "POST",
          headers,
          body: data,
        });
      }

      if (!res.ok) {
        const errText = await res.text();
        let errMsg = `Server error ${res.status}`;
        try {
          errMsg = JSON.parse(errText)?.error || errMsg;
        } catch {}
        toast.error(`Failed to save: ${errMsg}`);
        setIsSaving(false);
        return;
      }

      toast.success(
        editingId ? "Doctor updated successfully!" : "Doctor added successfully!",
      );
      onSaved();
    } catch (e) {
      console.error(e);
      toast.error("Network error. Please try again.");
    }
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center p-4 pt-[10vh] overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {editingId ? "Edit Doctor" : "Add New Doctor"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name *
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-"),
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Slug *
              </label>
              <input
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Department *
              </label>
              <select
                required
                disabled={lockSpeciality}
                value={formData.speciality}
                onChange={(e) =>
                  setFormData({ ...formData, speciality: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Select</option>
                {specialities.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.name} (/{s.slug})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Qualification
              </label>
              <input
                value={formData.qualification}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    qualification: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Designation
              </label>
              <select
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              >
                <option value="">Select Designation</option>
                {designations.map((d: any) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience (years)
              </label>
              <input
                type="number"
                value={formData.experience_years}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience_years: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                value={formData.consultation_fee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consultation_fee: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience From (Hospital/Clinic)
              </label>
              <input
                value={formData.experience_location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience_location: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Bio
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    (formData.bio.trim()
                      ? formData.bio.trim().split(/\s+/).length
                      : 0) > 500
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {formData.bio.trim()
                    ? formData.bio.trim().split(/\s+/).length
                    : 0}{" "}
                  / 500 words
                </span>
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                  Max 500 words
                </span>
              </div>
            </div>
            <textarea
              rows={5}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us about the doctor's background..."
              className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none"
            />
          </div>

          {/* OPD Timings Section */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900 border-b pb-2">
              OPD Timings
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(formData.opd_timings).map(([day, timing]) => (
                <div key={day}>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                    {day}
                  </label>
                  <input
                    value={timing as string}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        opd_timings: {
                          ...formData.opd_timings,
                          [day]: e.target.value,
                        },
                      })
                    }
                    className="w-full px-2 py-1.5 rounded-lg border-2 border-gray-100 text-[11px] focus:border-[#0d9488] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Doctor's Photo
            </label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setImagePreview(null);
                      setFormData({ ...formData, image_url: "" });
                    }}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                  id="doctor-image"
                />
                <label
                  htmlFor="doctor-image"
                  className="flex flex-col items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-[#0d9488] focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      Choose Image
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="rounded"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-700"
            >
              Active
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {editingId ? "Update Doctor" : "Add Doctor"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
