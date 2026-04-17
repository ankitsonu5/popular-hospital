"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Loader2,
  Briefcase,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { fetchCareers } from "@/lib/api";
import type { CareerItem } from "@/lib/api";

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<
    "Medico" | "Non-Medical" | "Admin"
  >("Medico");
  const [openings, setOpenings] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);

  useEffect(() => {
    fetchCareers().then((data) => {
      setOpenings(data);
      setLoading(false);
    });
  }, []);

  const currentOpenings = openings.filter((o) => o.category === activeTab);

  return (
    <div className="bg-[#f0f7ff] min-h-screen pt-12 pb-20">
      <div className="max-w-[1366px] mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a3a5c] mb-6 font-heading tracking-tight leading-tight">
            Careers at <span className="text-[#E85222]">Popular Hospital</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-4xl">
            Popular Group of Hospitals provides a solid foundation for
            developing a fulfilling professional career. Join our team of
            dedicated medical professionals and make a real difference in
            patient care.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-4 mb-10 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] w-fit border border-white">
          <button
            onClick={() => setActiveTab("Medico")}
            className={`px-8 py-3 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] transition-all duration-300 ${
              activeTab === "Medico"
                ? "bg-[#1a3a5c] text-white shadow-xl shadow-blue-900/20 px-10"
                : "bg-transparent text-gray-400 hover:text-[#1a3a5c]"
            }`}
          >
            Medical Openings
          </button>
          <button
            onClick={() => setActiveTab("Non-Medical")}
            className={`px-8 py-3 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] transition-all duration-300 ${
              activeTab === "Non-Medical"
                ? "bg-[#1a3a5c] text-white shadow-xl shadow-blue-900/20 px-10"
                : "bg-transparent text-gray-400 hover:text-[#1a3a5c]"
            }`}
          >
            Non-Medical
          </button>
          <button
            onClick={() => setActiveTab("Admin")}
            className={`px-8 py-3 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] transition-all duration-300 ${
              activeTab === "Admin"
                ? "bg-[#1a3a5c] text-white shadow-xl shadow-blue-900/20 px-10"
                : "bg-transparent text-gray-400 hover:text-[#1a3a5c]"
            }`}
          >
            Administration
          </button>
        </div>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#0d9488]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentOpenings.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-bold italic">
                  No active openings in this category at the moment.
                </p>
              </div>
            ) : (
              currentOpenings.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-[#f0f7ff] text-[#2a7a8c] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {job.department}
                      </div>
                      <div className="text-gray-300 text-[11px] font-bold">
                        Posted: {job.postedOn}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-[#1a3a5c] mb-6 group-hover:text-[#E85222] transition-colors leading-tight min-h-[3rem]">
                      {job.designation}
                    </h3>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <MapPin className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        {job.location}
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <Users className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        Positions: {job.position}
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <Calendar className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        Last Date:{" "}
                        <span
                          className={
                            job.lastDate === "-"
                              ? "text-slate-400 underline underline-offset-4 decoration-slate-200"
                              : "text-[#E85222]"
                          }
                        >
                          {job.lastDate === "-" ? "Ongoing" : job.lastDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full py-4 bg-[#f8fafc] text-[#1a3a5c] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#1a3a5c] hover:text-white transition-all border border-slate-100 shadow-sm"
                    >
                      View Job Details
                    </button>
                    <Link
                      href={`/apply?job=${job._id}`}
                      className="w-full py-4 bg-[#1a3a5c] text-white rounded-2xl text-center font-black text-sm uppercase tracking-widest hover:bg-[#E85222] transition-all shadow-lg hover:shadow-orange-900/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Balanced Single Column Fully Scrollable Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative animate-in zoom-in-95 duration-400 my-auto border border-slate-200">
            {/* ─── Header Part (Scrollable) ─── */}
            <div className="px-8 lg:px-10 py-9 lg:py-12 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 uppercase tracking-tight leading-none">
                    {selectedJob.designation}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                    {selectedJob.department} Division
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2.5 hover:bg-slate-50 text-slate-300 hover:text-slate-900 rounded-lg transition-all border border-transparent hover:border-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ─── Main Content Body ─── */}
            <div className="px-8 lg:px-10 py-12 lg:py-14 space-y-12">
              {/* Job Specification Bar */}
              <div className="flex flex-wrap gap-4 pb-8 border-b border-slate-100/60">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-[#E85222]" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {selectedJob.location || "Varanasi"}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {selectedJob.position} Positions
                  </span>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none block">
                    {selectedJob.lastDate === "-"
                      ? "Ongoing Recruitment"
                      : `Deadline: ${selectedJob.lastDate}`}
                  </span>
                </div>
              </div>

              {/* Description Area */}
              <div
                className="prose prose-slate prose-sm lg:prose-base max-w-none text-slate-600 font-medium leading-[1.8] tracking-tight"
                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
              />

              {/* Contact Section */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-100 space-y-6">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#E85222]" /> Recruitment
                  Inquiry
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3.5 text-xs text-slate-600 font-bold group hover:text-blue-600 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-400 border border-slate-200">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>careers@popularhospital.in</span>
                  </div>
                  <div className="flex items-center gap-3.5 text-xs text-slate-600 font-bold group hover:text-blue-600 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-400 border border-slate-200">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>+91 7800001895</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/apply?job=${selectedJob._id}`}
                  className="flex-[2] py-5 bg-[#1a3a5c] text-white rounded-xl text-center font-black text-xs uppercase tracking-[0.25em] hover:bg-[#E85222] transition-all shadow-lg active:scale-[0.98]"
                >
                  Confirm Application
                </Link>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 py-5 bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 shadow-sm"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
