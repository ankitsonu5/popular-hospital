"use client";
import { useEffect, useState, useCallback } from "react";
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
  Search,
  Loader2,
  Stethoscope,
  RotateCcw,
  Filter,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import DoctorFormModal from "./DoctorFormModal";

function SortableDoctorRow({ doc, onEdit, onDelete, isDragEnabled }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: doc._id, disabled: !isDragEnabled });

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
      {isDragEnabled && (
        <td className="pl-4 pr-1 py-3.5 w-10">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="p-1.5 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        </td>
      )}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 font-bold text-xs shrink-0 overflow-hidden border border-gray-100">
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
            <p className="text-[11px] text-[#0d9488] font-bold uppercase mt-0.5">
              {doc.designation?.name || doc.designation || "-"}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {doc.qualification || "-"}
            </p>
            {doc.experience_location && (
              <p className="text-[10px] text-[#0d9488] font-bold uppercase mt-0.5">
                @ {doc.experience_location}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">
        {doc.speciality?.name || "-"}
      </td>
      <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">
        {doc.experience_years ? `${doc.experience_years} yrs` : "-"}
      </td>
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${doc.is_active !== false ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {doc.is_active !== false ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="py-3.5 px-4 text-right">
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

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtSpec, setFiltSpec] = useState("");
  const [filtDesig, setFiltDesig] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const isDragEnabled = !search && !filtSpec && !filtDesig;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setDoctors((items) => {
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
            if (!res.ok) {
              const errorText = await res.text();
              throw new Error(`Failed to save: ${res.status} ${errorText}`);
            }
            toast.success("Doctor order saved!");
          })
          .catch((e) => {
            console.error("Failed to reorder", e);
            toast.error("Failed to save order!");
          });

        return newOrder;
      });
    }
  };

  const getHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [docsRes, specsRes, branchesRes, desigRes] = await Promise.all([
        fetch(`${API_URL}/cms/doctors?t=${Date.now()}`, {
          headers: getHeaders(),
        }),
        fetch(`${API_URL}/doctors/specialities`),
        fetch(`${API_URL}/branches`),
        fetch(`${API_URL}/cms/designations`, { headers: getHeaders() }),
      ]);
      const [docsData, specsData, branchesData, desigData] = await Promise.all([
        docsRes.json().catch(() => []),
        specsRes.json().catch(() => []),
        branchesRes.json().catch(() => []),
        desigRes.ok ? desigRes.json().catch(() => []) : Promise.resolve([]),
      ]);

      setDoctors(Array.isArray(docsData) ? docsData : docsData?.doctors || []);
      setSpecialities(
        Array.isArray(specsData) ? specsData : specsData?.specialities || [],
      );
      setBranches(
        Array.isArray(branchesData)
          ? branchesData
          : branchesData?.branches || [],
      );
      setDesignations(
        Array.isArray(desigData) ? desigData : desigData?.designations || [],
      );
    } catch (e) {
      console.error(e);
      setDoctors([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (doc: any) => {
    setEditingDoctor(doc);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    await fetch(`${API_URL}/cms/doctors/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    fetchData();
  };

  const filteredDoctors = (Array.isArray(doctors) ? doctors : []).filter(
    (d) => {
      const matchesSearch =
        !search ||
        d.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.qualification?.toLowerCase().includes(search.toLowerCase());

      const matchesSpec =
        !filtSpec ||
        d.speciality?._id === filtSpec ||
        d.speciality === filtSpec;
      const matchesDesig =
        !filtDesig ||
        d.designation?._id === filtDesig ||
        d.designation === filtDesig;

      return matchesSearch && matchesSpec && matchesDesig;
    },
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Manage Doctors
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {Array.isArray(doctors) ? doctors.length : 0} doctors registered
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin-dashboard/departments"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-[#0d9488] hover:text-[#0d9488] text-gray-600 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Manage Departments
          </Link>
          <Link
            href="/admin-dashboard/designations"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-[#0d9488] hover:text-[#0d9488] text-gray-600 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Manage Designations
          </Link>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              showFilters
                ? "bg-[#0d9488] text-white shadow-inner"
                : "bg-white border-2 border-gray-200 text-gray-600 hover:border-[#0d9488] hover:text-[#0d9488]"
            }`}
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            onClick={() => {
              setEditingDoctor(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Doctor
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50/50 p-4 rounded-2xl border border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="relative">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Name/qualification..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">
              Department
            </label>
            <select
              value={filtSpec}
              onChange={(e) => setFiltSpec(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] outline-none"
            >
              <option value="">All Departments</option>
              {specialities.map((s: any) => (
                <option key={s._id} value={s._id}>
                  {s.name} (/{s.slug})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">
              Designation
            </label>
            <select
              value={filtDesig}
              onChange={(e) => setFiltDesig(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] outline-none"
            >
              <option value="">All Designations</option>
              {designations.map((d: any) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setFiltSpec("");
              setFiltDesig("");
            }}
            disabled={!search && !filtSpec && !filtDesig}
            className={`flex items-center justify-center gap-2 h-[46px] px-4 rounded-xl border-2 transition-all ${
              search || filtSpec || filtDesig
                ? "border-red-100 bg-red-50 text-red-500 hover:bg-red-100"
                : "border-gray-100 bg-gray-50 text-gray-300"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Reset</span>
          </button>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <table className="w-full text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {isDragEnabled && <th className="w-10 px-4"></th>}
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Experience
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Status
                    </th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <SortableContext
                    items={filteredDoctors.map((d) => d._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredDoctors.map((doc) => (
                      <SortableDoctorRow
                        key={doc._id}
                        doc={doc}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isDragEnabled={isDragEnabled}
                      />
                    ))}
                  </SortableContext>
                  {filteredDoctors.length === 0 && (
                    <tr>
                      <td
                        colSpan={isDragEnabled ? 6 : 5}
                        className="text-center py-16 text-gray-400"
                      >
                        <Stethoscope className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                        <p>No doctors found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </DndContext>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <DoctorFormModal
          specialities={specialities}
          designations={designations}
          editingDoctor={editingDoctor}
          onClose={() => {
            setShowForm(false);
            setEditingDoctor(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditingDoctor(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
