"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the loading screen after exactly 5 seconds (one full ambulance pass)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden">
      <div className="w-full relative flex items-center justify-center h-48">
        {/* Central Logo with Pulsing Rings (Background) */}
        <div className="absolute flex items-center justify-center opacity-40 z-0">
          {/* Pulsing Ring Effect */}
          <div className="absolute inset-x-0 inset-y-0 -m-4 rounded-full border-4 border-hospital-teal opacity-30 animate-ping"></div>
          <div className="absolute inset-x-0 inset-y-0 -m-8 rounded-full border-4 border-hospital-orange opacity-20 animate-pulse delay-700"></div>

          {/* Central Logo */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 animate-fade-in">
            <Image
              src="/logo.png"
              alt="Popular Hospital"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Ambulance driving animation (Foreground) */}
        <div className="absolute animate-drive w-40 h-40 md:w-56 md:h-56 z-10">
          <Image
            src="/images/ambulance.png"
            alt="Ambulance"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Loading Progress Bar */}
      <div className="mt-6 w-56 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-hospital-teal to-hospital-orange animate-loading-bar origin-left"></div>
      </div>

      <p className="mt-4 text-sm font-bold text-gray-600 uppercase tracking-[0.3em] font-heading animate-pulse">
        Popular Hospital
      </p>
    </div>
  );
};

export default LoadingScreen;
