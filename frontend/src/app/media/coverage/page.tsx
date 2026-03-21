'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCoverage, getImageUrl, CoverageItem } from "@/lib/api";
import { X, ChevronLeft, ChevronRight, Maximize2, Loader2, ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function MediaCoveragePage() {
  const [items, setItems] = useState<CoverageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCoverage();
        setItems(data);
      } catch (error) {
        console.error("Failed to load coverage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  const openLightbox = (indexInPaginated: number) => {
    // We want to open the lightbox with the index of the full list
    const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + indexInPaginated;
    setSelectedImageIndex(actualIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % items.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, items.length]);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about-section-image.png"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-[#0b1c43]/75" />
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center sm:text-left">
          <nav className="mb-6 text-[10px] sm:text-xs text-white/60 uppercase tracking-widest" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Media Coverage Gallery</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-loose max-w-4xl drop-shadow-lg">
            Media <span className="text-[#00B4D8]">Coverage</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl leading-relaxed mx-auto sm:mx-0">
            A visual gallery of our news presence, newspaper clippings, and media highlights. Click any image to preview.
          </p>
        </div>
      </section>

      {/* ─── Coverage Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
             <p className="text-gray-400 font-medium">Loading Gallery...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {paginatedItems.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className="group relative cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-[#1e3a8a]/10 hover:border-[#1e3a8a]/40 h-full"
                >
                  {/* Newspaper Clipping Image */}
                  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={getImageUrl(item.image) || "/about-section-image.png"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300">
                      <Maximize2 className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 border-l-4 border-teal-600 flex-1 flex flex-col bg-white">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider border border-teal-100">
                        {item.source}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-[#1e3a8a] leading-tight group-hover:text-teal-600 transition-colors line-clamp-3">
                      {item.title}
                    </h2>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl bg-white/50">
                  <p className="text-lg font-medium italic">No media coverage gallery items published yet.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full bg-white border border-gray-200 text-[#1e3a8a] disabled:text-gray-300 disabled:bg-gray-50 hover:bg-teal-50 hover:border-teal-200 transition-all shadow-sm disabled:shadow-none"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1 px-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-teal-600 text-white shadow-md"
                          : "text-[#1e3a8a] hover:bg-teal-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full bg-white border border-gray-200 text-[#1e3a8a] disabled:text-gray-300 disabled:bg-gray-50 hover:bg-teal-50 hover:border-teal-200 transition-all shadow-sm disabled:shadow-none"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ─── Lightbox Modal ─── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-[110]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Controls */}
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

          <div className="w-full h-full flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
            {/* Image Container */}
            <div className="relative w-full flex-1 max-h-[75vh] group">
              <Image
                src={getImageUrl(items[selectedImageIndex].image)}
                alt={items[selectedImageIndex].title}
                fill
                unoptimized
                className="object-contain drop-shadow-2xl select-none animate-in zoom-in-95 duration-300"
              />
            </div>
            
            {/* Caption */}
            <div className="text-center text-white max-w-3xl space-y-2 px-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-center gap-3">
                <span className="bg-teal-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{items[selectedImageIndex].source}</span>
                <span className="text-white/50 text-xs font-medium">{items[selectedImageIndex].date}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold leading-tight">{items[selectedImageIndex].title}</h3>
              <p className="text-white/40 text-[11px] uppercase tracking-widest pt-2">
                Image {selectedImageIndex + 1} of {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
