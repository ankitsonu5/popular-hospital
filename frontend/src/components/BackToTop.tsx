'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[999] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="flex items-center gap-2 bg-[#e85222] hover:bg-[#d13d10] text-white px-5 py-2 rounded-lg shadow-xl transition-all duration-300 hover:-translate-y-1 group focus:outline-none"
        aria-label="Back to Top"
      >
        <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        <span className="text-[15px] font-bold tracking-wide">Back to Top</span>
      </button>
    </div>
  );
};

export default BackToTop;
