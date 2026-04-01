"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  MapPin,
  FileText,
  ArrowLeft,
  CheckCircle2,
  X,
  Printer,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import Link from "next/link";

import { CareerItem } from "@/lib/api";

interface Application {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  nationality: string;
  identificationType: string;
  address?: string;
  location?: string;
  resumeUrl: string;
  photoUrl?: string;
  appliedFor?: Partial<CareerItem>;
  createdAt: string;
  status: string;
  isRead?: boolean;
  isStarred?: boolean;
}

export default function JobPortalPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Primary");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api-backend/applications");
      if (!resp.ok) {
        throw new Error("Backend server is down or unreachable (Status 500)");
      }
      const data = await resp.json();
      setApplications(data);
    } catch (err: any) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSelectApp = async (app: Application) => {
    setSelectedApp(app);
    if (!app.isRead) {
      try {
        const resp = await fetch(`/api-backend/applications/${app._id}/read`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        if (resp.ok) {
          setApplications((prev) =>
            prev.map((a) => (a._id === app._id ? { ...a, isRead: true } : a)),
          );
          mutate("/api-backend/applications?isRead=false");
        }
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    }
  };

  const toggleStar = async (e: React.MouseEvent, app: Application) => {
    e.stopPropagation();
    const newStarred = !app.isStarred;
    try {
      const resp = await fetch(`/api-backend/applications/${app._id}/star`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred: newStarred }),
      });
      if (resp.ok) {
        setApplications((prev) =>
          prev.map((a) =>
            a._id === app._id ? { ...a, isStarred: newStarred } : a,
          ),
        );
      }
    } catch (err) {
      console.error("Error toggling star:", err);
    }
  };

  const promptDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const resp = await fetch(`/api-backend/applications/${deleteConfirmId}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        setApplications((prev) =>
          prev.filter((app) => app._id !== deleteConfirmId),
        );
        if (selectedApp?._id === deleteConfirmId) setSelectedApp(null);
        toast.success("Application deleted successfully");
      } else {
        toast.error("Failed to delete application");
      }
    } catch (err: any) {
      console.error("Error deleting application:", err);
      toast.error("Failed to delete application");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const renderDeleteModal = () => {
    if (!deleteConfirmId) return null;
    return (
      <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">
              Delete Application
            </h3>
            <p className="text-gray-500 text-sm text-center">
              Are you sure you want to delete this application? This action
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
    );
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.appliedFor?.designation
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (activeTab === "Starred") return matchesSearch && app.isStarred;
    if (activeTab === "Unread") return matchesSearch && !app.isRead;
    return matchesSearch;
  });

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Print Styling */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }
            /* Hide EVERYTHING by default */
            html, body, #__next, .min-h-screen {
              height: auto !important;
              background: white !important;
            }
            body > * { visibility: hidden !important; }
            
            /* Show ONLY the print section */
            .print-section, .print-section * { 
              visibility: visible !important; 
            }
            .print-section {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              z-index: 9999 !important;
            }
            .no-print { display: none !important; }
            
            /* Flatten form for professional look */
            .print-card {
              border: 1px solid #ddd !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              max-width: 100% !important;
              width: 100% !important;
            }
            .rounded-3xl, .rounded-[2rem], .rounded-2xl { 
              border-radius: 4px !important; 
            }
            
            /* Adjust spacing for A4 height */
            .p-10 { padding: 5mm !important; }
            .gap-12 { gap: 5mm !important; }
            .mb-6 { margin-bottom: 3mm !important; }
          }
        `,
          }}
        />

        {/* Detail Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 no-print">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedApp(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedApp.name}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Applied for:{" "}
                {selectedApp.appliedFor?.designation || "General Posting"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Printer className="w-4 h-4" /> Print A4 Form
            </button>
            <button
              onClick={(e) => promptDelete(selectedApp._id, e)}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100/50"
            >
              <Trash2 className="w-4 h-4" /> Delete Profile
            </button>
          </div>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/20 p-4 md:p-8 print-section">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print-card">
            {/* Professional Clean Header */}
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row items-start md:items-center gap-6 relative">
              <div className="w-32 h-32 rounded-2xl border border-gray-200 overflow-hidden shrink-0 relative z-10">
                {selectedApp.photoUrl ? (
                  <img
                    src={selectedApp.photoUrl}
                    alt={selectedApp.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>

              <div className="relative z-10 flex-1">
                <div className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                  Job Applicant Profile
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                  {selectedApp.name}
                </h3>
                <p className="text-base font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                  {selectedApp.appliedFor?.designation ||
                    "Medical Staff Candidate"}
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100/50">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      {selectedApp.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100/50">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      {selectedApp.mobile}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Personal Identification
                    </h4>
                  </div>
                  <div className="grid gap-4">
                    <InfoRow label="Gender" value={selectedApp.gender} />
                    <InfoRow
                      label="Nationality"
                      value={selectedApp.nationality}
                    />
                    <InfoRow
                      label="Identity Proof"
                      value={selectedApp.identificationType}
                    />
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Communication Address
                    </h4>
                  </div>
                  <div className="p-5 bg-gray-50/30 rounded-2xl border border-gray-100">
                    <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                      {selectedApp.address}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Current City
                      </p>
                      <p className="text-sm font-bold text-blue-600 uppercase">
                        {selectedApp.location || "Varanasi Area"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Application Status
                    </h4>
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">
                      Applied For Position
                    </p>
                    <p className="text-lg font-bold text-gray-800 tracking-tight mb-3">
                      {selectedApp.appliedFor?.designation ||
                        "Healthcare Professional"}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-blue-100/50">
                      <div className="text-xs font-semibold text-gray-500">
                        Submit Date
                      </div>
                      <div className="text-xs font-bold text-blue-600">
                        {new Date(selectedApp.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="no-print">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Attachments
                    </h4>
                  </div>
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/10">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          Download Resume
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Applicant's CV Document
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-all" />
                  </a>
                </section>
              </div>
            </div>

            {/* Print Only Disclaimer */}
            <div className="hidden print:block p-8 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                Popular Group of Hospitals • Recruitment Records • Confidential
              </p>
            </div>
          </div>
        </div>
        {renderDeleteModal()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Gmail Inbox Header */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 bg-white z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <CheckCircle2 className="w-5 h-5" />
            </button>
            <button
              onClick={fetchApplications}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-100 focus:bg-white border-transparent focus:border-gray-200 border rounded-lg outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">
            1-{filteredApps.length} of {applications.length}
          </p>
        </div>
      </div>

      {/* Gmail Tabs */}
      <div className="flex items-center border-b border-gray-200 overflow-x-auto no-scrollbar bg-white sticky top-[53px] z-10">
        <Tab
          icon={<Briefcase />}
          label="Primary"
          active={activeTab === "Primary"}
          onClick={() => setActiveTab("Primary")}
          count={`${applications.filter((a) => !a.isRead).length} new`}
          color="blue"
        />
        <Tab
          icon={<Globe />}
          label="Unread"
          active={activeTab === "Unread"}
          onClick={() => setActiveTab("Unread")}
          count={`${applications.filter((a) => !a.isRead).length} new`}
          color="green"
        />
        <Tab
          icon={<FileText />}
          label="Starred"
          active={activeTab === "Starred"}
          onClick={() => setActiveTab("Starred")}
          count={`${applications.filter((a) => a.isStarred).length} new`}
          color="orange"
        />
      </div>

      {/* Gmail List View */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="py-20 text-center text-gray-400 italic">
            No applications in this category.
          </div>
        ) : (
          <div className="w-full">
            {filteredApps.map((app) => (
              <div
                key={app._id}
                onClick={() => handleSelectApp(app)}
                className={`flex items-center px-4 py-2 border-b border-gray-100 hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] cursor-pointer group transition-all ${app.isRead ? "bg-[#f2f6fc]/50 text-gray-600" : "bg-white font-bold text-gray-900"}`}
              >
                {/* Icons Area */}
                <div className="flex items-center gap-3 shrink-0 mr-4">
                  <div
                    className="w-5 h-5 border-2 border-gray-300 rounded-sm group-hover:border-gray-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => toggleStar(e, app)}
                    className={`transition-colors ${app.isStarred ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"}`}
                  >
                    <Globe
                      className={`w-5 h-5 ${app.isStarred ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                {/* Sender Name */}
                <div className="w-48 shrink-0 truncate text-sm">{app.name}</div>

                {/* Subject and Snippet */}
                <div className="flex-1 truncate text-sm">
                  <span className="mr-2">
                    {app.appliedFor?.designation || "Healthcare Application"}
                  </span>
                  <span className="text-gray-500 font-normal">
                    — {app.email} • {app.mobile} •{" "}
                    {app.location || "Local Applicant"}
                  </span>
                </div>

                {/* Date and Hover Actions */}
                <div className="flex items-center gap-4 shrink-0 px-2 min-w-[100px] justify-end relative">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md absolute right-0">
                    <button
                      onClick={(e) => promptDelete(app._id, e)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs font-bold whitespace-nowrap">
                    {new Date(app.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {renderDeleteModal()}
    </div>
  );
}

function Tab({ icon, label, active, onClick, count, color }: any) {
  const colors: any = {
    blue: "text-blue-600 border-blue-600",
    green: "text-green-600 border-green-600",
    orange: "text-orange-600 border-orange-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 border-b-4 transition-all hover:bg-gray-50 min-w-[200px] ${active ? colors[color] : "border-transparent text-gray-500"}`}
    >
      <div className={`w-5 h-5 ${active ? "" : "text-gray-400"}`}>{icon}</div>
      <div className="text-left flex-1">
        <div className="text-sm font-bold flex items-center justify-between">
          <span>{label}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? (color === "blue" ? "bg-blue-100" : color === "green" ? "bg-green-100" : "bg-orange-100") : "bg-gray-100 text-gray-400"}`}
          >
            {count}
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailItem({ label, value, icon }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all font-medium border border-transparent hover:border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-blue-100 pl-4 py-1">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-sm font-black text-[#0b1c43]">{value}</span>
    </div>
  );
}
