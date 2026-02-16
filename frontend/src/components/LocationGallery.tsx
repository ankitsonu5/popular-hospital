"use client";

import { useState } from "react";
import Image from "next/image";

interface LocationGalleryProps {
  image: string;
  name: string;
}

export function LocationGallery({ image, name }: LocationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(image);

  // Mock thumbnails as requested: "niche me three-four image aur rahegi... ek hi image sabhi jagah kar do"
  // Using the same image for all thumbnails for now.
  const thumbnails = [
    image,
    image,
    image,
    image
  ];

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-4 order-1 lg:order-2">
      {/* Main Large Image - Height controlled for "thoda chhota" visual */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
        <Image
          src={selectedImage}
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
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(thumb)}
            className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
              ${
                // Simple logic: if this thumbnail is the source of the selected image, highlight it.
                // Since all sources are currently identical, this visual feedback might look static for now,
                // but the click functionality works. In a real scenario with unique URLs, `selectedImage === thumb` works perfect.
                // For now, let's just make them interactive buttons.
                'border-transparent hover:border-[#E85222] focus:border-[#E85222] focus:outline-none hover:scale-105 active:scale-95'
              }
            `}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, 150px"
            />
            {/* Active Indicator Overlay */}
            {selectedImage === thumb && (
               <div className="absolute inset-0 ring-2 ring-inset ring-[#E85222]/50 rounded-lg pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
