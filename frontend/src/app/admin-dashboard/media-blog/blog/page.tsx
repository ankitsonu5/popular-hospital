"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Newspaper,
  Sparkles,
  Folder,
  FolderPlus,
  Calendar,
  ExternalLink,
  X,
  Check,
  Tag,
  AlertCircle,
} from "lucide-react";
import { getImageUrl } from "@/lib/api";
import Link from "next/link";

const API_URL = "/api-backend";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  isDefault?: boolean;
  count?: number;
  createdAt?: string;
}

function BlogList() {
  const [blogList, setBlogList] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryModalSearch, setCategoryModalSearch] = useState("");
  const [categoryMsg, setCategoryMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const getHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/blogs`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        setBlogList(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [getHeaders]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/blogs/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {
      console.error("Failed to fetch categories:", e);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchCategories();
    const handleFocus = () => {
      fetchData();
      fetchCategories();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchData, fetchCategories]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await fetch(`${API_URL}/cms/blogs/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      fetchData();
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);
    setCategoryMsg(null);
    try {
      const res = await fetch(`${API_URL}/cms/blogs/categories`, {
        method: "POST",
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          description: newCategoryDesc.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create category");
      }
      setCategoryMsg({
        type: "success",
        text: `Category "${data.name}" created successfully!`,
      });
      setNewCategoryName("");
      setNewCategoryDesc("");
      fetchCategories();
    } catch (err: any) {
      setCategoryMsg({
        type: "error",
        text: err.message || "Failed to create category",
      });
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (catId: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/cms/blogs/categories/${catId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete category");
        return;
      }
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to delete category");
    }
  };

  const filteredBlogs = blogList.filter((n) => {
    const matchesSearch =
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      n.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const filteredModalCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(categoryModalSearch.toLowerCase()),
  );

  return (
    <div className="max-w-[1700px] mx-auto pb-20 font-sans tracking-tight px-4 sm:px-6 lg:px-8">
      {/* ─── Modern Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest mb-2 w-fit border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            <Sparkles className="w-4 h-4" />
            <span>Content Studio</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Blog Repository
          </h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            Manage insights, health guides and wellness stories.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Manage Categories Button */}
          <button
            type="button"
            onClick={() => {
              setCategoryMsg(null);
              setIsCategoryModalOpen(true);
            }}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
            title="Manage publication categories"
          >
            <FolderPlus className="w-4 h-4 text-indigo-600 transition-transform group-hover:scale-110" />
            <span>Categories</span>
            {categories.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                {categories.length}
              </span>
            )}
          </button>

          {/* New Publication Button */}
          <Link
            href="/admin-dashboard/media-blog/blog/action"
            className="group inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>New Publication</span>
          </Link>
        </div>
      </div>

      {/* ─── Search & Category Filter Bar ─── */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by publication title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
          />
        </div>

        {/* Category Filter Select */}
        <div className="w-full md:w-72">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="all">All Categories ({blogList.length})</option>
            {categories.map((c) => (
              <option key={c._id || c.name} value={c.name}>
                {c.name} {c.count !== undefined ? `(${c.count})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── Modern Table ─── */}
      {isLoading && blogList.length === 0 ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-200" />
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center italic">
            Scanning Digital Library...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 font-extrabold text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Publication Profile</th>
                  <th className="px-8 py-6">Classification</th>
                  <th className="px-8 py-6">Release Date</th>
                  <th className="px-8 py-6 text-center">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBlogs.map((item) => (
                  <tr
                    key={item._id}
                    className="group hover:bg-indigo-50/30 transition-all duration-300"
                  >
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
                          {item.image ? (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700"
                              title={item.title}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200 bg-slate-50">
                              <Newspaper className="w-5 h-5 opacity-40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 opacity-60">
                            <span className="text-[10px] font-bold tracking-widest uppercase">
                              /{item.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(item.category || "all")}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
                        title={`Filter by ${item.category}`}
                      >
                        <Folder className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest hover:underline">
                          {item.category || "Clinical Advisory"}
                        </span>
                      </button>
                    </td>
                    <td className="px-8 py-7 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-gray-500 font-medium">
                          {item.date || "Archives"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-center whitespace-nowrap">
                      <div
                        className={`px-4 py-1.5 rounded-2xl inline-flex items-center justify-center border font-extrabold text-[10px] uppercase tracking-widest transition-all ${
                          item.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-100 shadow-sm"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {item.isActive !== false ? "Published" : "Under Review"}
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex items-center justify-end gap-1 transition-all pr-2">
                        <Link
                          href={`/admin-dashboard/media-blog/blog/action?id=${item._id}`}
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBlogs.length === 0 && (
              <div className="py-24 flex flex-col items-center justify-center px-10">
                <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-[2rem] mb-6 scale-90 opacity-40">
                  <Newspaper className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-extrabold text-gray-400 text-lg uppercase tracking-tight">
                  No Publications Found
                </h3>
                {selectedCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Clear category filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Category Management Modal ─── */}
      {isCategoryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-[#0b1c43] to-[#1e3a8a] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <FolderPlus className="w-5 h-5 text-[#E85222]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Manage Blog Categories
                  </h2>
                  <p className="text-xs text-gray-300 font-medium">
                    Add new categories for blog articles and clinical publications
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-6">
              {/* Add New Category Box */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-indigo-600" />
                  Add New Category
                </h3>

                <form onSubmit={handleCreateCategory} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Category name (e.g. Robotic Surgery, Pediatric Cardiology, Health Tips)..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-indigo-200 text-sm font-semibold text-gray-800 placeholder:text-gray-400 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Optional brief description..."
                      value={newCategoryDesc}
                      onChange={(e) => setNewCategoryDesc(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-700 placeholder:text-gray-400 outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>

                  {categoryMsg && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        categoryMsg.type === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {categoryMsg.type === "success" ? (
                        <Check className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{categoryMsg.text}</span>
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={isCreatingCategory || !newCategoryName.trim()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50 active:scale-95"
                    >
                      {isCreatingCategory ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Category</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Categories List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    Existing Categories ({categories.length})
                  </h3>
                  <div className="w-56">
                    <input
                      type="text"
                      placeholder="Filter categories..."
                      value={categoryModalSearch}
                      onChange={(e) => setCategoryModalSearch(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-medium outline-none focus:bg-white focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {filteredModalCategories.map((c) => (
                    <div
                      key={c._id || c.name}
                      className="p-3.5 flex items-center justify-between hover:bg-gray-50/80 transition-colors"
                    >
                      <div className="min-w-0 pr-3">
                        <p className="text-xs font-bold text-gray-800 line-clamp-1">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono">
                          /{c.slug}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            (c.count || 0) > 0
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {c.count || 0} {(c.count || 0) === 1 ? "Blog" : "Blogs"}
                        </span>

                        {!c.isDefault && (c.count || 0) === 0 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(c._id, c.name)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredModalCategories.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-xs font-semibold">
                      No categories match your search.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-400">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      }
    >
      <BlogList />
    </Suspense>
  );
}
