"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, Loader2, Save, X, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/TinyMCEEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] animate-pulse bg-gray-100 rounded-xl" />
  ),
});

const API_URL = "/api-backend";

interface CareerItem {
  _id: string;
  category: "Medico" | "Non-Medical" | "Admin";
  department: string;
  designation: string;
  location: string;
  position: string;
  postedOn: string;
  lastDate: string;
  description: string;
  isActive: boolean;
}

function CareerActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CareerItem>>({
    category: "Medico",
    department: "",
    designation: "",
    location: "Varanasi",
    position: "1",
    postedOn: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    lastDate: "-",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (editId) {
      const fetchCareer = async () => {
        try {
          const res = await fetch(`/api-backend/cms/careers/${editId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
            },
          });
          if (!res.ok) throw new Error("Could not fetch career details");
          const data = await res.json();
          setFormData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCareer();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const getHeaders = () => ({
      Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    });

    try {
      const url = editId
        ? `/api-backend/cms/careers/${editId}`
        : `/api-backend/cms/careers`;
      const method = editId ? "PUT" : "POST";

      const submitData = { ...formData };
      delete submitData._id;
      delete (submitData as any).__v;
      delete (submitData as any).createdAt;
      delete (submitData as any).updatedAt;

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(submitData),
      });

      const contentType = res.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const errorText = await res.text();
        console.error("Server returned non-JSON response:", errorText);
        throw new Error("Server error: Received invalid response format.");
      }

      if (!res.ok) {
        throw new Error(result.error || "Failed to save career opening");
      }

      alert(
        editId
          ? "Job opening updated successfully!"
          : "New job role published successfully!",
      );
      router.push("/admin-dashboard/careers");
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
              onClick={() => router.push("/admin-dashboard/careers")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shadow-sm">
                <Briefcase className="w-5 h-5 text-teal-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? "Modify Role" : "New Job Vacancy"}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Talent Acquisition • Popular Hospital
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push("/admin-dashboard/careers")}
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
              <span>{editId ? "Save opening" : "Publish Role"}</span>
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
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                Job Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category *
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                    value={formData.category}
                    onChange={(e: any) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Medico">Medical Openings</option>
                    <option value="Non-Medical">Non-Medical</option>
                    <option value="Admin">Administration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Department *
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                    placeholder="e.g. Cardiology"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Designation *
                </label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                  placeholder="e.g. Senior Consultant / Staff Nurse"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Location
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Open Positions
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold"
                    value={
                      formData.lastDate && formData.lastDate !== "-"
                        ? new Date(formData.lastDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, lastDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Job Description & Requirements
                </label>
                <div className="rounded-xl overflow-hidden border border-gray-200 min-h-[450px]">
                  <Editor
                    value={formData.description}
                    onEditorChange={(content: string) =>
                      setFormData({ ...formData, description: content })
                    }
                    init={{
                      height: 450,
                      menubar: false,
                      plugins:
                        "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                      toolbar:
                        "undo redo | blocks | bold italic forecolor | image link media | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                      content_style:
                        "body { font-family:Inter,Arial,sans-serif; font-size:14px; color: #1f2937; }",
                      images_upload_url: `${API_URL}/blog-image-direct`,
                      branding: false,
                      statusbar: false,
                      images_upload_handler: (blobInfo: any) =>
                        new Promise((resolve, reject) => {
                          const fd = new FormData();
                          fd.append(
                            "file",
                            blobInfo.blob(),
                            blobInfo.filename(),
                          );
                          fetch(`${API_URL}/blog-image-direct`, {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
                            },
                            body: fd,
                          })
                            .then((res) =>
                              res.ok ? res.json() : reject("Upload failed"),
                            )
                            .then((json) =>
                              json.location
                                ? resolve(json.location)
                                : reject("Invalid location"),
                            )
                            .catch((err) => reject(err.message));
                        }),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Visibility Center
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">
                    Live Status
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    Toggle visibility on site
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                When active, this opening will appear in the careers section of
                the hospital website.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CareerActionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <CareerActionForm />
    </Suspense>
  );
}
