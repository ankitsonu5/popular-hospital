'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RadiologyVideoSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] group cursor-pointer bg-black" 
      onClick={() => setIsVideoPlaying(true)}
    >
        {!isVideoPlaying ? (
            <>
                <Image 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2664&auto=format&fit=crop"
                    alt="Radiology Procedure Video"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75"></div>
                        <div className="w-20 h-20 bg-[#F05A28] rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#d0491c] text-white">
                            <svg className="w-8 h-8 ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Video Text */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl font-bold mb-2 font-heading">Inside the Radiology Lab</h3>
                    <p className="text-gray-200 text-sm line-clamp-2 max-w-md">Experience how our advanced technology and expert team work together to provide precise diagnostics.</p>
                </div>
            </>
        ) : (
            <video 
                className="w-full h-full object-cover"
                src="/videos/hero.mp4" 
                controls
                autoPlay
            >
                Your browser does not support the video tag.
            </video>
        )}
    </div>
  );
}
