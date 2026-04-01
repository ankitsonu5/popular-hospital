"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchEventItem, getImageUrl, EventItem } from "@/lib/api";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  LayoutGrid,
  Maximize2,
} from "lucide-react";

export default function EventDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      if (typeof slug !== "string") return;
      const data = await fetchEventItem(slug);
      setEvent(data);
      setIsLoading(false);
    };
    load();
  }, [slug]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset";
  };

  const nextImg = () => {
    if (selectedImageIndex !== null && event) {
      setSelectedImageIndex((selectedImageIndex + 1) % event.gallery.length);
    }
  };

  const prevImg = () => {
    if (selectedImageIndex !== null && event) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + event.gallery.length) % event.gallery.length,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h1>
        <Link
          href="/media/events"
          className="text-indigo-600 font-bold hover:underline underline-offset-4"
        >
          Back to all events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* ─── Header Section ─── */}
      <section className="bg-gray-50 border-b border-gray-100 py-12 sm:py-20 lg:py-24">
        <div className="max-w-[1366px] mx-auto px-6 sm:px-8 lg:px-12">
          <Link
            href="/media/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Events
          </Link>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-widest">
                <Calendar className="w-4 h-4" /> {event.date}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight w-full">
              {event.title}
            </h1>
            {event.description && (
              <p className="text-gray-500 text-base sm:text-lg w-full leading-relaxed mt-2 whitespace-pre-wrap">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Gallery Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6">
          <LayoutGrid className="w-6 h-6 text-[#E85222]" />
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
            Event Highlights Gallery
          </h2>
          <span className="ml-auto text-sm font-medium text-gray-400">
            ({event.gallery.length} Photos)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {event.gallery.map((img, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={getImageUrl(img)}
                alt={`${event.title} - photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex items-center justify-center">
                <Maximize2 className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {event.gallery.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 italic">
              No gallery photos added for this event yet.
            </p>
          </div>
        )}
      </section>

      {/* ─── Responsive Lightbox ─── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 text-white z-10 w-full">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                {event.title}
              </span>
              <span className="text-[10px] text-white/50">
                {selectedImageIndex + 1} / {event.gallery.length}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-12 overflow-hidden">
            <button
              onClick={prevImg}
              className="absolute left-4 sm:left-12 p-4 bg-black/40 hover:bg-indigo-600/80 text-white rounded-full transition-all z-20 backdrop-blur-md"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <Image
              src={getImageUrl(event.gallery[selectedImageIndex])}
              className="object-contain select-none animate-in zoom-in-95 duration-500 drop-shadow-2xl"
              alt="Event Enlarged"
              fill
              unoptimized
            />

            <button
              onClick={nextImg}
              className="absolute right-4 sm:right-12 p-4 bg-black/40 hover:bg-indigo-600/80 text-white rounded-full transition-all z-20 backdrop-blur-md"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
