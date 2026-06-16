"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
  Video,
} from "lucide-react";
import {
  fetchDepartmentGallery,
  getImageUrl,
  type DepartmentGalleryItem,
} from "@/lib/api";

export default function DepartmentGallerySection({
  departmentSlug,
  departmentName,
}: {
  departmentSlug: string;
  departmentName: string;
}) {
  const [items, setItems] = useState<DepartmentGalleryItem[]>([]);
  const [activeType, setActiveType] = useState<"all" | "image" | "video">(
    "all",
  );
  const [selected, setSelected] = useState<DepartmentGalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchDepartmentGallery(departmentSlug)
      .then((data) => {
        if (!ignore) setItems(data);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [departmentSlug]);

  const filteredItems = useMemo(
    () =>
      activeType === "all"
        ? items
        : items.filter((item) => item.type === activeType),
    [activeType, items],
  );
  const selectedIndex = selected
    ? filteredItems.findIndex((item) => item._id === selected._id)
    : -1;

  const showPrevious = () => {
    if (filteredItems.length <= 1) return;
    const nextIndex =
      selectedIndex <= 0 ? filteredItems.length - 1 : selectedIndex - 1;
    setSelected(filteredItems[nextIndex]);
  };

  const showNext = () => {
    if (filteredItems.length <= 1) return;
    const nextIndex =
      selectedIndex === -1 || selectedIndex >= filteredItems.length - 1
        ? 0
        : selectedIndex + 1;
    setSelected(filteredItems[nextIndex]);
  };

  if (!loading && items.length === 0) return null;

  return (
    <section className="bg-white py-16 xl:py-12 2xl:py-20">
      <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-jakarta text-xs font-extrabold uppercase tracking-[0.22em] text-[#284a91]">
              Gallery
            </p>
            <h2 className="mt-2 text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
              {departmentName} Photos & Videos
            </h2>
          </div>
          <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 p-1">
            {[
              ["all", "All"],
              ["image", "Photos"],
              ["video", "Videos"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setActiveType(value as "all" | "image" | "video")
                }
                className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition ${
                  activeType === value
                    ? "bg-[#284a91] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#284a91]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setSelected(item)}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  {item.type === "video" ? (
                    <>
                      {item.thumbnailUrl ? (
                        <Image
                          src={getImageUrl(item.thumbnailUrl, false, {
                            preferRelativeUploads: true,
                          })}
                          alt={item.title || `${departmentName} video`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={getImageUrl(item.mediaUrl, false, {
                            preferRelativeUploads: true,
                          })}
                          className="h-full w-full object-cover"
                          muted
                          preload="metadata"
                        />
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#284a91] shadow-lg">
                          <Play className="h-7 w-7 fill-current" />
                        </span>
                      </span>
                    </>
                  ) : (
                    <Image
                      src={getImageUrl(item.mediaUrl, false, {
                        preferRelativeUploads: true,
                      })}
                      alt={item.title || `${departmentName} photo`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#284a91]">
                    {item.type === "video" ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                  </span>
                  <p className="line-clamp-2 text-sm font-extrabold text-[#0b1c43]">
                    {item.title ||
                      (item.type === "video"
                        ? "Department Video"
                        : "Department Photo")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-black text-slate-900"
            >
              x
            </button>
            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1c43] shadow"
                  aria-label="Previous gallery item"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1c43] shadow"
                  aria-label="Next gallery item"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="relative aspect-video bg-black">
              {selected.type === "video" ? (
                <video
                  src={getImageUrl(selected.mediaUrl, false, {
                    preferRelativeUploads: true,
                  })}
                  className="h-full w-full"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={getImageUrl(selected.mediaUrl, false, {
                    preferRelativeUploads: true,
                  })}
                  alt={selected.title || `${departmentName} photo`}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
