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
    <div className="w-full">
      <div className="relative rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(30,58,138,0.12)] ring-1 ring-slate-200">
        <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-[#1e3a8a]/12 via-white to-[#E85222]/10" />

        <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-slate-100 sm:h-[390px] lg:h-[430px]">
        <Image
          src={getImageUrl(selectedImage)}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1c43]/25 via-transparent to-transparent" />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {images.slice(0, 4).map((thumb, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(thumb)}
              className={`group relative aspect-[1.18/1] overflow-hidden rounded-lg bg-slate-100 transition-all duration-200 ${
                selectedImage === thumb
                  ? "shadow-[0_0_0_2px_#E85222,0_10px_20px_rgba(232,82,34,0.18)]"
                  : "shadow-[0_1px_4px_rgba(0,0,0,0.16)] hover:shadow-[0_0_0_2px_rgba(232,82,34,0.55)]"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={getImageUrl(thumb)}
                alt={`${name} - Photo ${index + 1}`}
                fill
                className={`object-cover transition duration-300 group-hover:scale-105 ${
                  selectedImage === thumb ? "brightness-100" : "brightness-90"
                }`}
                sizes="(max-width: 640px) 25vw, 150px"
              />
              {selectedImage === thumb && (
                <span className="absolute bottom-1.5 left-1.5 h-1.5 w-8 rounded-full bg-[#E85222]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
