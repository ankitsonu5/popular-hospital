"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, Globe, Save, X, FileText } from "lucide-react";

type SeoData = {
  _id?: string;
  page_route: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  robots_meta: string;
  updatedAt?: string;
  isCustom?: boolean;
  group?: string;
};

import { STANDARD_PAGES } from "@/lib/seoConstants";

export default function SeoSettingsPage() {
  const [dbSeoList, setDbSeoList] = useState<SeoData[]>([]);
  const [dbDoctors, setDbDoctors] = useState<{ name: string, slug: string, speciality_name?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPageRoute, setSelectedPageRoute] = useState("All");
  const [formData, setFormData] = useState<Partial<SeoData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCustomRouteMode, setIsCustomRouteMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchSeoData = async () => {
    try {
      const res = await fetch(`/api-backend/seo?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setDbSeoList(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch SEO data", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorsData = async () => {
    try {
      const res = await fetch(`/api-backend/doctors?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbDoctors(data);
      }
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
    fetchDoctorsData();
  }, []);

  const ALL_PAGES = useMemo(() => {
    const docPages = dbDoctors.map(doc => {
      const docName = doc.name.trim();
      const hasDrPrefix = docName.toLowerCase().startsWith('dr.') || docName.toLowerCase().startsWith('dr ');
      const displayName = hasDrPrefix ? docName : `Dr. ${docName}`;
      const speciality = doc.speciality_name || "Specialist";

      let title = `${displayName} - ${speciality} | Popular Hospital`;
      let description = `View the profile and OPD timings for ${displayName} at Popular Hospital.`;

      if (doc.slug === "dr-a-k-kaushik") {
        title = `${displayName} - ${speciality} - Best Surgeon in Varanasi | Popular Hospital`;
        description = `${description} He is widely recognized as the best surgeon in Varanasi, providing exceptional surgical care.`;
      }

      return {
        group: "Doctors (Dynamic)",
        label: displayName,
        route: `/doctors/${doc.slug}`,
        defaultTitle: title,
        defaultDescription: description
      };
    });
    return [...STANDARD_PAGES, ...docPages];
  }, [dbDoctors]);

  const displayList = useMemo(() => {
    const list: SeoData[] = [];

    // Add standard pages first
    ALL_PAGES.forEach(std => {
      const found = dbSeoList.find(db => db.page_route === std.route);
      if (found) {
        list.push({ ...found, isCustom: false, group: std.group });
      } else {
        list.push({
          page_route: std.route,
          meta_title: std.defaultTitle || "",
          meta_description: std.defaultDescription || "",
          og_title: std.defaultTitle || "",
          og_description: std.defaultDescription || "",
          og_image: "",
          canonical_url: "",
          robots_meta: "index, follow",
          isCustom: false,
          group: std.group,

        });
      }
    });

    // Add remaining custom pages from DB
    dbSeoList.forEach(db => {
      if (!ALL_PAGES.some(std => std.route === db.page_route)) {
        list.push({ ...db, isCustom: true, group: "Custom Routes" });
      }
    });

    return list;
  }, [dbSeoList, ALL_PAGES]);

  const categories = useMemo(() => {
    const cats = new Set(displayList.map(item => item.group));
    return ["All", ...Array.from(cats).filter(Boolean)] as string[];
  }, [displayList]);

  const availablePagesInCategory = useMemo(() => {
    if (selectedCategory === "All") return [];
    return displayList
      .filter(item => item.group === selectedCategory)
      .map(item => {
        const std = ALL_PAGES.find(p => p.route === item.page_route);
        return {
          route: item.page_route,
          label: std ? std.label : (item.meta_title || item.page_route)
        };
      });
  }, [displayList, selectedCategory, ALL_PAGES]);

  const filteredList = displayList.filter(item => {
    const matchesSearch = item.page_route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.meta_title && item.meta_title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || item.group === selectedCategory;
    const matchesPage = selectedPageRoute === "All" || item.page_route === selectedPageRoute;
    return matchesSearch && matchesCategory && matchesPage;
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedPageRoute("All");
  };

  const openModal = (seo?: SeoData, isCustomNew: boolean = false) => {
    setIsCustomRouteMode(isCustomNew || (seo ? !!seo.isCustom : true));

    if (seo) {
      setFormData(seo);
    } else {
      setFormData({
        page_route: "",
        meta_title: "",
        meta_description: "",
        og_title: "",
        og_description: "",
        og_image: "",
        canonical_url: "",
        robots_meta: "index, follow",
      });
    }
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const route = e.target.value;
    if (route === "CUSTOM") {
      setIsCustomRouteMode(true);
      setFormData({ ...formData, page_route: "" });
    } else {
      setIsCustomRouteMode(false);

      // If selecting a predefined route, check if we already have DB data for it
      const existing = dbSeoList.find(db => db.page_route === route);
      if (existing) {
        setFormData(existing);
      } else {
        const std = ALL_PAGES.find(p => p.route === route);
        setFormData({
          page_route: route,
          meta_title: std?.defaultTitle || "",
          meta_description: std?.defaultDescription || "",
          og_title: std?.defaultTitle || "",
          og_description: std?.defaultDescription || "",
          og_image: "",
          canonical_url: "",
          robots_meta: "index, follow",
        });
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 250 * 1024) {
      setError("Image size should be less than 250KB");
      return;
    }

    setIsUploading(true);
    setError("");
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await fetch("/api-backend/seo/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, og_image: data.url }));
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch (err) {
      setError("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.page_route) {
      setError("Page Route is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const method = "POST";
      const url = "/api-backend/seo";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        fetchSeoData();
        closeModal();
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to save SEO data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to reset/delete this SEO record? It will fallback to default dynamically generated SEO.")) {
      return;
    }
    try {
      const res = await fetch(`/api-backend/seo/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchSeoData();
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-gray-500 mt-1">Manage meta tags, titles, and descriptions for all pages.</p>
        </div>
      </div>

      {/* Search and List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by route or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            {selectedCategory !== "All" && availablePagesInCategory.length > 0 && (
              <select
                value={selectedPageRoute}
                onChange={(e) => setSelectedPageRoute(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white sm:max-w-[250px] truncate"
              >
                <option value="All">All Pages in {selectedCategory}</option>
                {availablePagesInCategory.map((page) => (
                  <option key={page.route} value={page.route}>
                    {page.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Page Type</th>
                <th className="px-6 py-4">Page Route</th>
                <th className="px-6 py-4">Meta Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    Loading SEO records...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No matching SEO records found.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => (
                  <tr key={item._id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {item.isCustom ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                          Custom
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          <FileText className="w-3.5 h-3.5" />
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-2.5 py-1 rounded-md font-mono">
                        {item.page_route}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium line-clamp-1 max-w-[200px]" title={item.meta_title}>
                        {item.meta_title || <span className="text-gray-400 italic">Not set</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item._id ? (
                        <span className="text-green-600 font-medium">Customized</span>
                      ) : (
                        <span className="text-gray-400">Default fallback</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-xs font-bold"
                        >
                          {item._id ? "Edit SEO" : "Set SEO"}
                        </button>
                        {item._id && (
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reset to default"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="shrink-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {formData._id ? "Edit SEO Details" : "Set SEO Details"}
              </h2>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                  {error}
                </div>
              )}

              {/* Page Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Select Page / Route <span className="text-red-500">*</span>
                </label>

                {!formData._id && !isCustomRouteMode ? (
                  <select
                    value={formData.page_route || ""}
                    onChange={handleSelectRoute}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    required
                  >
                    <option value="" disabled>Select a standard page...</option>
                    {Array.from(new Set(ALL_PAGES.map(p => p.group))).map(group => (
                      <optgroup key={group} label={group}>
                        {ALL_PAGES.filter(p => p.group === group).map(std => (
                          <option key={std.route} value={std.route}>
                            {std.label} ({std.route})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="CUSTOM">+ Custom Route (e.g. /doctors/dr-abc)</option>
                  </select>
                ) : (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      name="page_route"
                      value={formData.page_route || ""}
                      onChange={handleChange}
                      placeholder="e.g. /doctors/dr-a-k-kaushik"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono bg-gray-50 text-sm"
                      required
                      readOnly={!!formData._id && !isCustomRouteMode}
                    />
                    {!formData._id && (
                      <button type="button" onClick={() => setIsCustomRouteMode(false)} className="text-sm text-blue-600 font-medium whitespace-nowrap hover:underline">
                        Select from list
                      </button>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1.5">Exact path after domain, e.g. /doctors/dr-a-k-kaushik</p>
              </div>

              {/* Standard Meta */}
              <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-5 space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Standard Meta</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.meta_title?.length || 0} characters. Recommended: 50-60.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    name="meta_description"
                    rows={3}
                    value={formData.meta_description || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.meta_description?.length || 0} characters. Recommended: 150-160.
                  </p>
                </div>
              </div>

              {/* Open Graph */}
              <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-5 space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Open Graph (Social Sharing)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">OG Title</label>
                    <input
                      type="text"
                      name="og_title"
                      value={formData.og_title || ""}
                      onChange={handleChange}
                      placeholder="Defaults to Meta Title if empty"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">OG Image (Max 250KB)</label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                        />
                        {isUploading && <span className="text-sm text-blue-600 animate-pulse whitespace-nowrap">Uploading...</span>}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          name="og_image"
                          value={formData.og_image || ""}
                          onChange={handleChange}
                          placeholder="/uploads/seo/image.jpg"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
                        />
                        {formData.og_image && (
                          <img
                            src={formData.og_image.startsWith('http') ? formData.og_image : `http://localhost:5100${formData.og_image}`}
                            alt="OG Preview"
                            className="h-9 w-9 object-cover rounded border"
                            onError={(e) => {
                              // Fallback if the domain is already in the URL or proxy works
                              (e.target as HTMLImageElement).src = formData.og_image || "";
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">OG Description</label>
                  <textarea
                    name="og_description"
                    rows={2}
                    value={formData.og_description || ""}
                    onChange={handleChange}
                    placeholder="Defaults to Meta Description if empty"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-5 space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Advanced Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Robots Meta</label>
                    <select
                      name="robots_meta"
                      value={formData.robots_meta || "index, follow"}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    >
                      <option value="index, follow">Index, Follow (Recommended)</option>
                      <option value="noindex, follow">NoIndex, Follow</option>
                      <option value="noindex, nofollow">NoIndex, NoFollow</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Canonical URL</label>
                    <input
                      type="text"
                      name="canonical_url"
                      value={formData.canonical_url || ""}
                      onChange={handleChange}
                      placeholder="e.g. https://www.popularhospital.in/route"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-end gap-3 z-10">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 text-gray-700 text-sm font-medium hover:bg-gray-200 bg-white border border-gray-300 rounded-xl transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save SEO Data
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
