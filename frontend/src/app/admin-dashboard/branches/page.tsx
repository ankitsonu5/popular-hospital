"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Building2,
  MapPin,
  Clock,
  Phone,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";
import { getImageUrl } from "@/lib/api";
import Link from "next/link";

const API_URL = "/api-backend";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getHeaders = useCallback(
    () => ({
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/branches`, { cache: "no-store" });
      if (res.ok) setBranches(await res.json());
    } catch (e) {
      console.error("Fetch error:", e);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const handleFocus = () => fetchData();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchData]);

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
    e.currentTarget.classList.add("opacity-40");
  };

  const onDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-40");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = async (e: React.DragEvent, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    if (dragIndex === dropIndex) return;

    const newBranches = [...branches];
    const [draggedItem] = newBranches.splice(dragIndex, 1);
    newBranches.splice(dropIndex, 0, draggedItem);

    setBranches(newBranches);

    try {
      await fetch(`${API_URL}/cms/branches/reorder`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ ids: newBranches.map((b) => b._id) }),
      });
    } catch (error) {
      console.error("Reorder error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;
    try {
      const res = await fetch(`${API_URL}/cms/branches/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) fetchData();
    } catch (e) {
      alert("Error deleting branch");
    }
  };

  const filteredBranches = branches.filter(
    (b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.city?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Original Header Style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Branches
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {branches.length} locations
          </p>
        </div>
        <Link
          href="/admin-dashboard/branches/action"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Branch
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search branches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] outline-none transition-all"
        />
      </div>

      {isLoading && branches.length === 0 ? (
        <div className="flex justify-center py-20 text-[#0d9488]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredBranches.map((branch, index) => (
            <div
              key={branch._id}
              draggable={!search}
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden group relative"
            >
              {!search && (
                <div className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 cursor-move transition-all border border-gray-100 shadow-sm">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>
              )}

              <div className="h-40 bg-gray-100 relative overflow-hidden">
                <img
                  src={getImageUrl(branch.image_one)}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">
                  {branch.city}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      /{branch.slug}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Link
                      href={`/admin-dashboard/branches/action?id=${branch._id}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(branch._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {branch.description}
                </p>

                <div className="space-y-1.5 text-xs text-gray-400 border-t border-gray-50 pt-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{branch.address}</span>
                  </div>
                  {branch.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      <span>{branch.phone}</span>
                    </div>
                  )}
                  {branch.timings && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>{branch.timings}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className="w-3 h-3" />
                    <span>
                      {
                        [
                          branch.image_one,
                          branch.image_two,
                          branch.image_three,
                          branch.image_four,
                        ].filter(Boolean).length
                      }{" "}
                      images
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredBranches.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-100">
              <Building2 className="w-10 h-10 mx-auto mb-3 text-gray-200" />
              <p className="font-semibold text-sm">
                No branches found in results.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
