"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  X,
  Loader2,
  Building2,
  MapPin,
  Clock,
  Phone,
  Image as ImageIcon,
  Upload,
  Save,
  ArrowLeft,
  Mail,
  Link as LinkIcon,
  Sparkles,
  Globe,
} from "lucide-react";
import { getImageUrl } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

const API_URL = "/api-backend";

function BranchActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(!!editingId);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    city: "",
    state: "",
    heading: "",
    title: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    pincode: "",
    timings: "",
    mapEmbedUrl: "",
    mapDirectionsUrl: "",
    facilities: "",
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    image_one: null,
    image_two: null,
    image_three: null,
    image_four: null,
  });

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    image_one: null,
    image_two: null,
    image_three: null,
    image_four: null,
  });

  useEffect(() => {
    if (editingId) {
      fetchBranch();
    }
  }, [editingId]);

  const fetchBranch = async () => {
    try {
      const res = await fetch(`${API_URL}/branches/${editingId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const branch = await res.json();
        setFormData({
          name: branch.name || "",
          slug: branch.slug || "",
          city: branch.city || "",
          state: branch.state || "",
          heading: branch.heading || "",
          title: branch.title || "",
          description: branch.description || "",
          address: branch.address || "",
          phone: branch.phone || "",
          email: branch.email || "",
          pincode: branch.pincode || "",
          timings: branch.timings || "",
          mapEmbedUrl: branch.mapEmbedUrl || "",
          mapDirectionsUrl: branch.mapDirectionsUrl || "",
          facilities: branch.facilities || "",
        });
        setPreviews({
          image_one: branch.image_one ? getImageUrl(branch.image_one) : null,
          image_two: branch.image_two ? getImageUrl(branch.image_two) : null,
          image_three: branch.image_three
            ? getImageUrl(branch.image_three)
            : null,
          image_four: branch.image_four ? getImageUrl(branch.image_four) : null,
        });
      }
    } catch (e) {
      console.error("Fetch error:", e);
    }
    setIsLoading(false);
  };

  const handleFileChange = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
    if (file) {
      setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      Object.entries(files).forEach(([key, file]) => {
        if (file) data.append(key, file);
      });

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/cms/branches/${editingId}`
        : `${API_URL}/cms/branches`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: data,
      });

      if (res.ok) {
        window.close();
      } else {
        const errData = await res.json();
        alert(`Failed to save: ${errData.error || "Unknown error"}`);
      }
    } catch (e) {
      alert("Error connecting to server. Please try again.");
    }
    setIsSaving(false);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans">
      {/* ─── Header Section ─── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link
              href="/admin-dashboard/branches"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5 text-teal-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editingId ? "Modify Branch" : "New Healthcare Branch"}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Location Node • Popular Hospital
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
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-[#0d9488] hover:bg-[#0b7a6f] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{editingId ? "Update Branch" : "Publish Branch"}</span>
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
            {/* Core Identity */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Core Branch Identity
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Branch Name *
                  </label>
                  <input
                    required
                    placeholder="e.g. Popular Hospital - BLW Road"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, ""),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    URL Slug *
                  </label>
                  <input
                    required
                    placeholder="pop-blw-vns"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    City *
                  </label>
                  <input
                    required
                    placeholder="Varanasi"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    State
                  </label>
                  <input
                    placeholder="Uttar Pradesh"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Branch Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Summarize the key strengths and focus of this branch..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Logistics & Location
              </h2>

              <div className="space-y-2 mb-6">
                <label className="block text-sm font-semibold text-gray-700">
                  HQ Address *
                </label>
                <input
                  required
                  placeholder="Plot No. X, Street Y, Landmark Z..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Contact Number
                  </label>
                  <input
                    placeholder="+91-78XXXXXX95"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Operational Hours
                  </label>
                  <input
                    placeholder="24/7 Availability"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.timings}
                    onChange={(e) =>
                      setFormData({ ...formData, timings: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Official Email
                  </label>
                  <input
                    placeholder="branch@popularhospital.in"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Pincode
                  </label>
                  <input
                    placeholder="221005"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Maps & Links */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" /> Integrations
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Google Map Embed (Iframe Src)
                  </label>
                  <input
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.mapEmbedUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, mapEmbedUrl: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Direct Directions Link
                  </label>
                  <input
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0d9488] focus:bg-white outline-none transition-all text-sm font-semibold text-gray-800"
                    value={formData.mapDirectionsUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mapDirectionsUrl: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Visual Assets */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Gallery Node
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["image_one", "image_two", "image_three", "image_four"].map(
                  (key) => (
                    <div key={key} className="space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`upload-${key}`}
                        onChange={(e) =>
                          handleFileChange(key, e.target.files?.[0] || null)
                        }
                      />
                      <label
                        htmlFor={`upload-${key}`}
                        className="block relative aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#0d9488] cursor-pointer overflow-hidden transition-all group shadow-inner"
                      >
                        {previews[key] ? (
                          <>
                            <Image
                              src={previews[key]!}
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              fill
                              unoptimized
                              alt="Preview"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                              <Upload className="w-6 h-6 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-300">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-1 shadow-sm group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                              <Plus className="w-6 h-6" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider">
                              {key.split("_")[1]}
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Facilities Attributes */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Quick Attributes
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Specialized Facilities
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Diagnostic, Ortho, ICCU..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:border-[#0d9488] focus:bg-white outline-none resize-none text-gray-800"
                    value={formData.facilities}
                    onChange={(e) =>
                      setFormData({ ...formData, facilities: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Status Hub */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Operational Node
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">
                    Status
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    Toggle visibility
                  </span>
                </div>
                <div className="w-11 h-6 bg-[#0d9488]/20 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-[#0d9488] rounded-full translate-x-full" />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                When active, this branch details will be visible in the
                locations section of the site.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BranchActionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" />
        </div>
      }
    >
      <BranchActionForm />
    </Suspense>
  );
}
