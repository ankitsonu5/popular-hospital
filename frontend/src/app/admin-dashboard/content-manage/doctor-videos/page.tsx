"use client";
import { useEffect, useState, useCallback } from "react";
import { Loader2, Search, Video, Save } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

export default function DoctorVideosPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  // Track inputs per doctor
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});

  const getHeaders = () => ({
    Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
    "Content-Type": "application/json",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/doctors?t=${Date.now()}`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      const docs = Array.isArray(data) ? data : data?.doctors || [];
      setDoctors(docs);

      const urls: Record<string, string> = {};
      docs.forEach((doc: any) => {
        urls[doc._id] = doc.youtube_video_url || "";
      });
      setVideoUrls(urls);
    } catch (e) {
      console.error(e);
      setDoctors([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUrlChange = (id: string, url: string) => {
    setVideoUrls((prev) => ({ ...prev, [id]: url }));
  };

  const handleSave = async (id: string) => {
    setSavingId(id);
    try {
      const url = videoUrls[id] || "";

      // We can use the existing PUT endpoint since it merges updates.
      // But we must send it as JSON or FormData. The controller supports FormData if there is a file,
      // but if we send JSON without file, does it work?
      // Let's check updateDoctor controller: it just does updates = { ...req.body }.
      // But it expects FormData because of uploadDoctor.single("image") middleware.
      // So we should send FormData.

      const data = new FormData();
      data.append("youtube_video_url", url);

      const res = await fetch(`${API_URL}/cms/doctors/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
          // Don't set Content-Type, let browser set it with boundary for FormData
        },
        body: data,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      toast.success("Doctor video updated successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update video URL.");
    }
    setSavingId(null);
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      !search ||
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Doctor Videos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage YouTube video links for doctors' detail pages.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                    S.No.
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                    Doctor
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                    Department
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/4">
                    YouTube Video URL
                  </th>
                  <th className="py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDoctors.map((doc, index) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-gray-500 text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-900">{doc.name}</p>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {doc.speciality?.name || "-"}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="relative">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="https://youtube.com/..."
                          value={videoUrls[doc._id] || ""}
                          onChange={(e) =>
                            handleUrlChange(doc._id, e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSave(doc._id)}
                        disabled={savingId === doc._id}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                      >
                        {savingId === doc._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <p>No doctors found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
