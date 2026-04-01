"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/api";

interface ComponentCoverageItem {
  slug: string;
  title: string;
  image: string;
  date: string;
  source: string;
  excerpt?: string;
}

export default function MediaCoverageClient({ items }: { items: ComponentCoverageItem[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev !== null ? (prev + 1) % items.length : null
      );
    }
  }, [selectedImageIndex, items.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev !== null ? (prev - 1 + items.length) % items.length : null
      );
    }
  }, [selectedImageIndex, items.length]);

  // Handle Keyboard Arrows & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, closeLightbox, nextImage, prevImage]);

  return (
    <>
      {/* ─── Coverage Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={`${item.slug}-${index}`}
              className="group relative h-full cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-[#1e3a8a]/10 hover:border-[#1e3a8a]/40 h-full flex flex-col">
                {/* Newspaper Clipping Image */}
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#1e3a8a]/0 group-hover:bg-[#1e3a8a]/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <span className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        View Clipping
                     </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 border-l-4 border-[#1e3a8a] flex-1 flex flex-col">
                  {/* Source + Date Row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1e3a8a]/10 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-wider">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {item.source}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-sm font-bold text-[#1e3a8a] leading-snug group-hover:text-[#E85222] transition-colors line-clamp-3 flex-1">
                    {item.title}
                  </h2>
                  <div className="mt-3 flex items-center justify-between">
                     <Link 
                        href={`/media/coverage/${item.slug}`} 
                        onClick={(e) => e.stopPropagation()} 
                        className="text-[11px] font-bold text-[#1e3a8a] hover:underline flex items-center gap-1"
                     >
                        Read Details <span>→</span>
                     </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-[110]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Controls */}
          {items.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
            </>
          )}

          <div 
            className="w-full h-full flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative w-full flex-1 max-h-[75vh] group">
              <img
                src={getImageUrl(items[selectedImageIndex].image)}
                alt={items[selectedImageIndex].title}
                className="w-full h-full object-contain drop-shadow-2xl select-none animate-in zoom-in-95 duration-300"
              />
            </div>
            
            {/* Caption */}
            <div className="text-center text-white max-w-3xl space-y-2 px-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-center gap-3">
                <span className="bg-[#1e3a8a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">{items[selectedImageIndex].source}</span>
                <span className="text-white/50 text-xs font-medium">{items[selectedImageIndex].date}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold leading-tight drop-shadow-md">{items[selectedImageIndex].title}</h3>
              <p className="text-white/40 text-[11px] uppercase tracking-widest pt-2">
                Image {selectedImageIndex + 1} of {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
