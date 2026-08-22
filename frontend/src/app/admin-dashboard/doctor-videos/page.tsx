"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Video, Search, Save, Loader2, PlayCircle } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

export default function DoctorVideosPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state for current selected doctor's videos
  const [videos, setVideos] = useState<{ title: string; url: string; _id?: string }[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load doctors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDoctor = (docId: string) => {
    setSelectedDoctorId(docId);
    const doc = doctors.find((d) => d._id === docId);
    if (doc) {
      setVideos(doc.videos || []);
    }
  };

  const addVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const updateVideo = (index: number, field: "title" | "url", value: string) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const removeVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleSave = async () => {
    if (!selectedDoctorId) return;

    // Validate
    for (const v of videos) {
      if (!v.title.trim() || !v.url.trim()) {
        return toast.error("All videos must have a title and a valid YouTube URL.");
      }
    }

    setIsSaving(true);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/cms/doctors/${selectedDoctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videos }),
      });

      if (res.ok) {
        toast.success("Videos updated successfully!");
        // Update local state
        fetchDoctors();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update videos");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDoctor = doctors.find((d) => d._id === selectedDoctorId);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Video className="w-8 h-8 text-blue-600" />
          Doctor Videos
        </h1>
        <p className="text-gray-500 mt-2">
          Manage YouTube video gallery for individual doctors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Doctor Selection */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Select Doctor</h3>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <button
                    key={doc._id}
                    onClick={() => handleSelectDoctor(doc._id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${
                      selectedDoctorId === doc._id
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-100 hover:border-blue-100 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-bold text-sm text-gray-900">{doc.name}</div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between items-center">
                      <span>{doc.speciality?.name || "Specialist"}</span>
                      {doc.videos && doc.videos.length > 0 && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                          {doc.videos.length} Videos
                        </span>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-gray-500">
                  No doctors found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Video Management */}
        <div className="lg:col-span-8">
          {selectedDoctorId ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Videos for {selectedDoctor?.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Add YouTube links and titles for the doctor's profile page.
                  </p>
                </div>
                <button
                  onClick={addVideo}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Video
                </button>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <PlayCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No videos added yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Click the button above to add a video.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {videos.map((vid, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                            Video Title (Topic)
                          </label>
                          <input
                            type="text"
                            value={vid.title}
                            onChange={(e) => updateVideo(idx, "title", e.target.value)}
                            placeholder="e.g. Advanced Treatment Options"
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                            YouTube URL
                          </label>
                          <input
                            type="text"
                            value={vid.url}
                            onChange={(e) => updateVideo(idx, "url", e.target.value)}
                            placeholder="e.g. https://www.youtube.com/watch?v=XXXXXX"
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeVideo(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mt-6"
                        title="Remove video"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-[#0b1c43] hover:bg-blue-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Video className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Select a doctor from the list to manage their videos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
