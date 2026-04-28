"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2, Save, ExternalLink, ToggleLeft, ToggleRight } from "lucide-react";
import { getImageUrl } from "@/lib/api";

const API = "/api-backend/cms/popup";

interface PopupData {
  _id: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export default function ManagePopupPage() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch(API, { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        if (data && data._id) {
          setPopup(data);
          setLinkUrl(data.linkUrl || "");
          setIsActive(data.isActive);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!imageFile && !popup?.imageUrl) {
      showToast("error", "Pehle ek image upload karein.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      if (imageFile) fd.append("image", imageFile);
      fd.append("linkUrl", linkUrl);
      fd.append("isActive", String(isActive));

      const res = await fetch(API, {
        method: "PUT",
        headers: authHeaders(),
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setPopup(data);
      setImageFile(null);
      setPreview(null);
      showToast("success", "Popup save ho gaya!");
    } catch (err: any) {
      showToast("error", err.message || "Kuch galat hua.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Popup delete karna chahte hain?")) return;
    setDeleting(true);
    try {
      const res = await fetch(API, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      setPopup(null);
      setPreview(null);
      setImageFile(null);
      setLinkUrl("");
      setIsActive(true);
      showToast("success", "Popup delete ho gaya.");
    } catch {
      showToast("error", "Delete nahi hua, try karein.");
    } finally {
      setDeleting(false);
    }
  };

  const currentImage = preview || (popup?.imageUrl ? getImageUrl(popup.imageUrl) : null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
            ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Popup Banner</h2>
          <p className="text-sm text-gray-500 mt-1">
            Website load hone par visitor ko ye popup dikhega. Ek hi popup active rehta hai.
          </p>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            Loading...
          </div>
        ) : (
          <>
            {/* Image Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-[#0d9488] cursor-pointer overflow-hidden transition-colors bg-gray-50 flex items-center justify-center group"
            >
              {currentImage ? (
                <>
                  <Image
                    src={currentImage}
                    alt="Popup preview"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <ImagePlus className="w-8 h-8 text-white" />
                    <span className="text-white text-sm font-medium">Image badlein</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-[#0d9488] transition-colors">
                  <ImagePlus className="w-10 h-10" />
                  <span className="text-sm font-medium">Image select karein</span>
                  <span className="text-xs">JPG, PNG, WebP — max 10MB</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-400 -mt-2">
              Recommended size: <span className="font-medium text-gray-600">600 × 600 px</span> (square) ya{" "}
              <span className="font-medium text-gray-600">800 × 600 px</span> (landscape) — JPG/PNG, max 10MB
            </p>

            {/* Link URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4" />
                Click pe kahan bhejein? (optional)
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
              />
              <p className="text-xs text-gray-400">
                Agar khaali chhoden to popup sirf close hoga, kahi nahi jaayega.
              </p>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">Popup Active</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isActive ? "Visitors ko dikhega" : "Abhi kisi ko nahi dikhega"}
                </p>
              </div>
              <button
                onClick={() => setIsActive((v) => !v)}
                className="text-[#0d9488] hover:text-[#0b7a70] transition-colors"
              >
                {isActive ? (
                  <ToggleRight className="w-9 h-9" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-gray-400" />
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0b1c43] hover:bg-[#0d2257] disabled:opacity-60 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Popup"}
              </button>
              {popup && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-60 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
