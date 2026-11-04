"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function DoctorShareButton({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled the share sheet or clipboard is blocked — nothing to do.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-3 text-base font-medium text-white hover:opacity-80 transition-opacity cursor-pointer ${className}`}
    >
      {copied ? "Link copied" : "Share Doctor Profile"}
      {copied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
    </button>
  );
}
