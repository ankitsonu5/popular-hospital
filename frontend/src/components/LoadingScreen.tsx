'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen when the window is fully loaded
    const handleLoad = () => {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700">
      <div className="relative">
        {/* Pulsing Ring Effect */}
        <div className="absolute inset-x-0 inset-y-0 -m-4 rounded-full border-4 border-hospital-teal opacity-20 animate-ping"></div>
        <div className="absolute inset-x-0 inset-y-0 -m-8 rounded-full border-4 border-hospital-orange opacity-10 animate-pulse delay-700"></div>
        
        {/* Central Logo */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 animate-fade-in">
          <Image
            src="/logo.png"
            alt="Popular Hospital"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Loading Progress Bar */}
      <div className="mt-12 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-hospital-teal to-hospital-orange animate-loading-bar origin-left"></div>
      </div>
      
      <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-[0.4em] animate-pulse">
        Healing with Care
      </p>
    </div>
  );
};

export default LoadingScreen;
