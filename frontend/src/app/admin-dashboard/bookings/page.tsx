"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Search,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ArrowLeft,
  MoreVertical,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  Square,
  Stethoscope,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { formatTimeToAmPm } from "@/lib/time";

const API_URL = "/api-backend";

interface Booking {
  _id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  doctor: { _id: string; name: string; slug: string };
  branch: { _id: string; name: string; slug: string };
  slot_date: string;
  slot_time: string;
  status: "pending" | "confirmed" | "done";
  notes: string;
  isRead: boolean;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const PAGE_SIZE = 10;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      // Using generic cms route for all bookings based on backend integration
      const res = await fetch(`${API_URL}/cms/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Booking[] = await res.json();
      setBookings(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  const promptDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/bookings/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");

      setSelected(null);
      toast.success("Booking deleted successfully");
      mutate("/api-backend/cms/bookings?status=pending");
      await fetchBookings();
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete booking");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const updateStatus = async (booking: Booking, newStatus: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/bookings/${booking._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      const updatedBooking = await res.json();
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, ...updatedBooking } : b,
        ),
      );
      if (selected && selected._id === booking._id) {
        setSelected({ ...selected, ...updatedBooking });
      }
      toast.success("Status updated");
      mutate("/api-backend/cms/bookings?status=pending");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const handleSelect = (booking: Booking) => {
    setSelected(booking);
  };

  const filtered = bookings.filter((b) => {
    return (
      b.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      b.patient_phone.includes(search) ||
      (b.doctor &&
        b.doctor.name.toLowerCase().includes(search.toLowerCase())) ||
      (b.branch && b.branch.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageStart = filtered.length > 0 ? (currentPage - 1) * PAGE_SIZE : 0;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const paginatedBookings = filtered.slice(pageStart, pageEnd);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-1 text-gray-500">
          {selected ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                title="Back to list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (selected.status !== "pending") promptDelete(selected._id);
                }}
                disabled={selected.status === "pending"}
                className={`p-2 rounded-full transition-colors ${
                  selected.status === "pending"
                    ? "text-gray-300 cursor-not-allowed opacity-50"
                    : "hover:bg-red-50 text-red-500 cursor-pointer"
                }`}
                title={
                  selected.status === "pending"
                    ? "Cannot delete pending booking"
                    : "Delete Booking"
                }
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Square className="w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={fetchBookings}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Refresh"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bookings"
              className="w-48 sm:w-64 pl-10 pr-3 py-1.5 text-sm bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 focus:shadow-md transition-all outline-none"
            />
          </div>
          <div className="flex items-center text-gray-500">
            <span className="text-xs mr-4 hidden sm:inline">
              {filtered.length > 0 ? `${pageStart + 1}-${pageEnd}` : "0"} of{" "}
              {filtered.length}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50/30">
          <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : selected ? (
        /* Detailed View */
        <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                Appointment Details
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase tracking-widest">
                  {selected.status}
                </span>
              </h2>
              <span className="text-sm text-gray-400">
                {formatDate(selected.createdAt)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex items-start gap-4 border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {selected.patient_name}
                </h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-gray-400" />{" "}
                    {selected.patient_phone}
                  </span>
                  {selected.patient_email && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-gray-400" />{" "}
                      {selected.patient_email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Booking Information
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400">
                        APPOINTMENT DATE
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.slot_date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-teal-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400">
                        TIME SLOT
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {formatTimeToAmPm(selected.slot_time)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Hospital Details
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400">
                        ASSIGNED DOCTOR
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.doctor?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-semibold text-gray-400">
                        BRANCH LOCATION
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selected.branch?.name || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selected.notes && (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                  Patient Notes
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {selected.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="flex-1 overflow-y-auto w-full bg-white divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-[15px] font-medium text-gray-500">
                No bookings found
              </p>
              <p className="text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          ) : (
            paginatedBookings.map((booking) => (
              <div
                key={booking._id}
                onClick={() => handleSelect(booking)}
                className={`group flex flex-col sm:flex-row items-start sm:items-center px-4 py-3 hover:bg-blue-50/50 hover:shadow-[inset_0_-1px_0_0_#e2e8f0,inset_4px_0_0_0_#3b82f6] cursor-pointer transition-all border-l-4 w-full text-[14px] ${!booking.isRead ? "bg-blue-50/20 border-l-blue-500" : "border-transparent bg-white"}`}
              >
                {/* Desktop layout elements */}
                <div className="hidden sm:flex items-center gap-4 flex-shrink-0 w-[220px]">
                  <div
                    className="p-1 hover:bg-gray-200 rounded text-gray-300 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Square className="w-4 h-4" />
                  </div>
                  {!booking.isRead ? (
                    <User className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
                  ) : (
                    <User className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                  <span
                    className={`${!booking.isRead ? "font-bold text-gray-900" : "font-semibold text-gray-700"} truncate pr-2 tracking-tight`}
                  >
                    {booking.patient_name}
                  </span>
                </div>

                {/* Mobile top-row */}
                <div className="flex justify-between w-full sm:hidden mb-1">
                  <div
                    className={`${!booking.isRead ? "font-bold text-gray-900" : "font-semibold text-gray-700"} flex items-center gap-2`}
                  >
                    {!booking.isRead ? (
                      <User className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-blue-500" />
                    )}
                    {booking.patient_name}
                  </div>
                  <span className="text-xs font-medium text-gray-500 shrink-0">
                    {formatDate(booking.createdAt)}
                  </span>
                </div>

                <div className="flex-1 min-w-0 pr-4 w-full text-gray-600 font-medium">
                  <span className="text-blue-600 font-bold hidden sm:inline mr-2 text-[13px]">
                    {booking.slot_date} at {formatTimeToAmPm(booking.slot_time)}
                  </span>
                  <span className="sm:hidden text-blue-600 font-bold block mb-1 text-xs">
                    {booking.slot_date} at {formatTimeToAmPm(booking.slot_time)}
                  </span>
                  <span className="text-gray-500 truncate inline-block max-w-full align-bottom">
                    - {booking.doctor?.name || "Doctor"} @{" "}
                    {booking.branch?.name || "Branch"}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-3 flex-shrink-0 min-w-[180px] justify-end pr-4">
                  <div className="relative">
                    <select
                      value={booking.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateStatus(booking, e.target.value as any);
                      }}
                      className={`text-[11px] font-bold uppercase tracking-widest border rounded-md px-2 py-1 outline-none appearance-none cursor-pointer transition-colors ${
                        booking.status === "confirmed"
                          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                          : booking.status === "done"
                            ? "text-blue-700 bg-blue-50 border-blue-100"
                            : "text-amber-700 bg-amber-50 border-amber-100"
                      }`}
                    >
                      <option value="pending">PENDING</option>
                      <option value="confirmed">CONFIRM</option>
                      <option value="done">DONE</option>
                    </select>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (booking.status !== "pending")
                        promptDelete(booking._id);
                    }}
                    disabled={booking.status === "pending"}
                    className={`p-1.5 rounded-lg transition-all transform ${
                      booking.status === "pending"
                        ? "text-gray-300 cursor-not-allowed opacity-30 group-hover:opacity-30"
                        : "hover:bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                    }`}
                    title={
                      booking.status === "pending"
                        ? "Cannot delete pending booking"
                        : "Delete"
                    }
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-semibold text-gray-400 w-16 text-right whitespace-nowrap">
                    {formatDate(booking.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
                Delete Booking
              </h3>
              <p className="text-gray-500 text-sm text-center">
                Are you sure you want to delete this appointment? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <div className="w-px bg-gray-200"></div>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
