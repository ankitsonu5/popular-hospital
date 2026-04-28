"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getImageUrl } from "@/lib/api";

interface PopupData {
  _id: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export default function PopupBanner() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api-backend/popup")
      .then((r) => r.json())
      .then((data) => {
        if (data && data._id && data.imageUrl) {
          setPopup(data);
          setTimeout(() => setVisible(true), 600);
        }
      })
      .catch(() => {});
  }, []);


  const close = () => setVisible(false);

  const handleImageClick = () => {
    if (popup?.linkUrl) {
      window.open(popup.linkUrl, "_blank", "noopener,noreferrer");
    }
    close();
  };

  if (!popup || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative max-w-lg w-full animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute -top-4 right-0 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className={`rounded-2xl overflow-hidden${popup.linkUrl ? " cursor-pointer" : ""}`}
          onClick={popup.linkUrl ? handleImageClick : undefined}
        >
          <img
            src={getImageUrl(popup.imageUrl)}
            alt="Popup"
            className="w-full h-auto block max-h-[80vh] object-contain"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popup {
          animation: popupIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
}
