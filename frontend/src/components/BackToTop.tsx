"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    const handleChatState = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setIsChatOpen(Boolean(customEvent.detail?.open));
    };
    window.addEventListener("chatbot:state", handleChatState);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("chatbot:state", handleChatState);
    };
  }, []);

  const show = isVisible && !isChatOpen;

  return (
    <div
      className={`fixed bottom-[76px] left-4 md:left-auto md:right-[30px] md:bottom-[92px] z-[990] transition-all duration-300 transform ${
        show
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="flex h-11 w-11 items-center justify-center bg-[#e85222] hover:bg-[#d13d10] text-white rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-[#e85222]/50"
        aria-label="Back to Top"
        title="Scroll to Top"
      >
        <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default BackToTop;
