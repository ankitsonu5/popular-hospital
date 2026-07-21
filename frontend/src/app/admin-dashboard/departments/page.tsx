"use client";

import { useEffect, useState } from "react";
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
  LayoutGrid,
  Search,
  Stethoscope,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import DoctorFormModal from "../doctors/DoctorFormModal";

function SortableDeptDoctorRow({ doc, onEdit, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: doc._id });

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
      className={`hover:bg-gray-50/50 transition-colors ${isDragging ? "bg-white shadow-xl ring-1 ring-gray-200" : "bg-transparent"}`}
    >
      <td className="pl-4 pr-1 py-3 w-10">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1.5 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 font-bold text-xs shrink-0 overflow-hidden border border-gray-100">
            {doc.image_url ? (
              <img
                src={getImageUrl(doc.image_url)}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            ) : (
              doc.name?.charAt(0)
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-tight">{doc.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {doc.qualification || "-"}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600 hidden md:table-cell">
        {doc.designation?.name || doc.designation || "-"}
      </td>
      <td className="py-3 px-4 hidden sm:table-cell">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${doc.is_active !== false ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {doc.is_active !== false ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="inline-flex gap-1">
          <button
            onClick={() => onEdit(doc)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(doc._id)}
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
const departmentPageSlugs = new Set([
  "burns-plastic-surgery",
  "cardiology",
  "ctvs",
  "dental",
  "diabetic-foot",
  "dietetics-nutrition",
  "ent",
  "gastroenterology",
  "general-medicine",
  "general-surgery",
  "gynaecology",
  "interventional-radiology",
  "ivf-fertility",
  "laboratory-medicine",
  "nephrology",
  "neurosurgery",
  "oncology",
  "ophthalmology",
  "orthopedics",
  "pain-management",
  "pediatric-cardiology",
  "pediatric-surgery",
  "pediatrics",
  "psychiatry",
  "respiratory",
  "urology",
]);

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    department_display_name: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // ── Doctors-by-department panel ──
  const [designations, setDesignations] = useState<any[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [deptDoctors, setDeptDoctors] = useState<any[]>([]);
  const [isDoctorsLoading, setIsDoctorsLoading] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const getHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/doctors/specialities`);
      const data = await res.json();
      setDepartments(data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
    setIsLoading(false);
  };

  const fetchDesignations = async () => {
    try {
      const res = await fetch(`${API_URL}/cms/designations`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setDesignations(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch designations error:", e);
    }
  };

  const fetchDeptDoctors = async (specId: string) => {
    if (!specId) {
      setDeptDoctors([]);
      return;
    }
    setIsDoctorsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/cms/doctors?speciality=${specId}&t=${Date.now()}`,
        { headers: getHeaders() },
      );
      const data = await res.json();
      setDeptDoctors(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch department doctors error:", e);
      setDeptDoctors([]);
    }
    setIsDoctorsLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchDesignations();
  }, []);

  useEffect(() => {
    fetchDeptDoctors(selectedDeptId);
  }, [selectedDeptId]);

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    await fetch(`${API_URL}/cms/doctors/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    fetchDeptDoctors(selectedDeptId);
  };

  const handleDoctorDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setDeptDoctors((items) => {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over?.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      const updates = newOrder.map((doc, index) => ({
        id: doc._id,
        sortIndex: index,
      }));

      fetch(`${API_URL}/cms/doctors/reorder`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ doctors: updates }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Failed to save: ${res.status}`);
          toast.success("Doctor order saved!");
        })
        .catch((e) => {
          console.error("Failed to reorder", e);
          toast.error("Failed to save order!");
        });

      return newOrder;
    });
  };

  const handleEdit = (dept: any) => {
    setEditingId(dept._id);
    setFormData({
      name: dept.name,
      slug: dept.slug,
      department_display_name: dept.department_display_name || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this department? This will also remove all doctors assigned to it.",
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/cms/specialities/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        sessionStorage.removeItem("admin_token");
        window.location.href = "/admin-login";
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete");
      }
      alert("Department deleted successfully");
      fetchData();
    } catch (e: any) {
      console.error(e);
      alert("Error: " + e.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Name is required");

    setIsSaving(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/cms/specialities/${editingId}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`${API_URL}/cms/specialities`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(formData),
        });
      }

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        sessionStorage.removeItem("admin_token");
        window.location.href = "/admin-login";
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        console.error("Response Error Body:", text);
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || `Error ${res.status}`);
        } catch (e) {
          throw new Error(
            `Server returned HTML (Status ${res.status}). Check if API URL is correct.`,
          );
        }
      }

      alert(editingId ? "Department updated" : "Department added successfully");
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", slug: "", department_display_name: "" });
      await fetchData();
    } catch (e: any) {
      console.error("Submit Error:", e);
      alert("Error: " + e.message);
    }

    setIsSaving(false);
  };

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Departments
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {departments.length} categories active
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin-dashboard/doctors"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-[#0d9488] hover:text-[#0d9488] text-gray-600 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Manage Doctors
          </Link>
          <Link
            href="/admin-dashboard/designations"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-[#0d9488] hover:text-[#0d9488] text-gray-600 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Manage Designations
          </Link>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", slug: "", department_display_name: "" });
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Department
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDepts.map((spec: any) => (
            <div
              key={spec._id}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">
                    {spec.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate uppercase tracking-wider font-medium">
                    /{spec.slug}
                  </p>
                  {departmentPageSlugs.has(spec.slug) && (
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Page linked
                    </p>
                  )}
                </div>
              </div>

              <div className="absolute top-2 right-2 flex gap-1 transition-opacity">
                <button
                  onClick={() => handleEdit(spec)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(spec._id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {filteredDepts.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-8 h-8 text-gray-200" />
              </div>
              <p className="text-sm">
                No departments found matching "{search}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Doctors by Department ── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Manage Doctors by Department
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select a department to add, edit, or remove its doctors.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="min-w-[240px] px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] outline-none transition-all"
            >
              <option value="">Select a department...</option>
              {departments.map((d: any) => (
                <option key={d._id} value={d._id}>
                  {d.name} (/{d.slug})
                </option>
              ))}
            </select>
            <button
              disabled={!selectedDeptId}
              onClick={() => {
                setEditingDoctor(null);
                setShowDoctorForm(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add Doctor
            </button>
          </div>
        </div>

        {!selectedDeptId ? (
          <div className="text-center py-12 text-gray-400">
            <Stethoscope className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">
              Choose a department above to view and manage its doctors.
            </p>
          </div>
        ) : isDoctorsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ) : deptDoctors.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Stethoscope className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">No doctors in this department yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
              <GripVertical className="w-3.5 h-3.5" />
              Drag rows by the handle to reorder — this order is what shows on
              the public department page.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDoctorDragEnd}
              >
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="w-10 px-4"></th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Designation
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <SortableContext
                      items={deptDoctors.map((d) => d._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {deptDoctors.map((doc: any) => (
                        <SortableDeptDoctorRow
                          key={doc._id}
                          doc={doc}
                          onEdit={(d: any) => {
                            setEditingDoctor(d);
                            setShowDoctorForm(true);
                          }}
                          onDelete={handleDeleteDoctor}
                        />
                      ))}
                    </SortableContext>
                  </tbody>
                </table>
              </DndContext>
            </div>
          </div>
        )}
      </div>

      {showDoctorForm && (
        <DoctorFormModal
          specialities={departments}
          designations={designations}
          editingDoctor={editingDoctor}
          defaultSpecialityId={selectedDeptId}
          lockSpeciality
          onClose={() => {
            setShowDoctorForm(false);
            setEditingDoctor(null);
          }}
          onSaved={() => {
            setShowDoctorForm(false);
            setEditingDoctor(null);
            fetchDeptDoctors(selectedDeptId);
          }}
        />
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Department" : "Add New Department"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                  placeholder="e.g. Cardiology"
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
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all text-gray-500"
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  Page URL: /departments/{formData.slug || "department-slug"}
                </p>
                {formData.slug && !departmentPageSlugs.has(formData.slug) && (
                  <p className="mt-1 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700">
                    This slug is not currently used by a static department page.
                    Doctor cards can still resolve by department name/alias, but
                    matching the page slug is safest.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Display Name (for Doctor Cards)
                </label>
                <input
                  value={formData.department_display_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      department_display_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                  placeholder="e.g. CARDIOLOGY"
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                  Doctor cards show as: DEPARTMENT OF{" "}
                  {formData.department_display_name || formData.name || "..."}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
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
