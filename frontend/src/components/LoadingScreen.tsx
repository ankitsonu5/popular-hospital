'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let pageLoaded = document.readyState === 'complete';
    let minTimePassed = false;
    
    // Set a timeout to ensure minimum display time of 2.75s (half of the 5.5s animation)
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      if (pageLoaded) {
        // Small delay for smooth fade out
        setIsVisible(false);
      }
    }, 2750);

    const handleLoad = () => {
      pageLoaded = true;
      if (minTimePassed) {
        setIsVisible(false);
      }
    };

    if (!pageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(minTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden">
      <style>{`
        @keyframes driveRight {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw); }
        }
        .animate-drive {
          animation: driveRight 5.5s linear infinite;
        }
      `}</style>
      
      <div className="w-full relative flex items-center justify-center h-48">
        <div className="absolute animate-drive w-40 h-40 md:w-56 md:h-56">
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
