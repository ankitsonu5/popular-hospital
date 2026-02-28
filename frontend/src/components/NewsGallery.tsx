"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsGalleryProps {
  images: string[];
  title: string;
}

export default function NewsGallery({ images, title }: NewsGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative h-52 sm:h-60 lg:h-72 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={img}
              alt={`${title} - Image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
               <span className="text-white text-sm font-medium border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View Preview</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white z-[110] transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[110] transition-colors p-2"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[110] transition-colors p-2"
                onClick={handleNext}
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - Preview`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              Image {selectedIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
