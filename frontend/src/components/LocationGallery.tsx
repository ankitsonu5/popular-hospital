"use client";
 
import { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
 
interface LocationGalleryProps {
  images: string[];
  name: string;
}
 
export function LocationGallery({ images, name }: LocationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Sync state if images change (e.g. after dynamic fetch)
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);
 
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 order-1 lg:order-2">
      {/* Main Large Image */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
        <Image
          src={getImageUrl(selectedImage)}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-in-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
 
      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
        {images.slice(0, 4).map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb)}
            className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
              ${
                selectedImage === thumb
                  ? 'border-[#E85222] scale-105 shadow-lg'
                  : 'border-transparent hover:border-[#E85222] hover:scale-105 active:scale-95'
              }
            `}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={getImageUrl(thumb)}
              alt={`${name} - Photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, 150px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
