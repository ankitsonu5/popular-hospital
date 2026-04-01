"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";

declare global {
  interface Window {
    gtranslate_settings: any;
    doGTranslate: (lang_pair: string) => void;
  }
}

const languages = [
  { code: "en", label: "English", native: "English", flag: "US" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "IN" },
  { code: "bn", label: "Bengali", native: "বাংলা", flag: "IN" },
  { code: "mr", label: "Marathi", native: "मराठी", flag: "IN" },
  { code: "te", label: "Telugu", native: "తెలుగు", flag: "IN" },
  { code: "ta", label: "Tamil", native: "தமிழ்", flag: "IN" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", flag: "IN" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "IN" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", flag: "IN" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ", flag: "IN" },
  { code: "ml", label: "Malayalam", native: "മലയാളം", flag: "IN" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "IN" },
];

const LanguageSelector = ({
  scrolled,
  isTransparentPage,
}: {
  scrolled: boolean;
  isTransparentPage: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Sync UI state with saved preference OR default to English
    const savedLang = localStorage.getItem("user-language");
    if (savedLang && savedLang !== "en") {
      setCurrentLang(savedLang);
      loadGoogleTranslate();
    } else {
      setCurrentLang("en");
      // Ensure no google cookie exists which might force a translation on English
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname;
    }

    // 2. Defining official translation helper
    if (!(window as any).doGTranslate) {
      (window as any).doGTranslate = (lang: string) => {
        if (!lang) return;

        const trigger = () => {
          const combo = document.querySelector(
            ".goog-te-combo",
          ) as HTMLSelectElement;
          if (combo && combo.options && combo.options.length > 0) {
            combo.value = lang;
            combo.dispatchEvent(new Event("change", { bubbles: true }));
            return true;
          }
          return false;
        };

        if (!trigger()) {
          let attempts = 0;
          const interval = setInterval(() => {
            if (trigger() || attempts > 20) clearInterval(interval);
            attempts++;
          }, 300);
        }
      };
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadGoogleTranslate = () => {
    if (document.getElementById("google-translate-script")) return;

    // Create the hidden element if it doesn't exist
    if (!document.getElementById("google_translate_element")) {
      const el = document.createElement("div");
      el.id = "google_translate_element";
      el.style.display = "none";
      document.body.appendChild(el);
    }

    (window as any).googleTranslateElementInit = function () {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((l) => l.code).join(","),
          autoDisplay: false,
          multilanguagePage: true,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  };

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);

    // Save preference to localStorage so we don't clear the cookie next time
    localStorage.setItem("user-language", code);

    if (code !== "en") {
      loadGoogleTranslate();
    } else {
      // If switching back to English
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname;
      // Also trigger official translation to clear existing translation if script is loaded
    }

    // Trigger official Google Translate
    if ((window as any).doGTranslate) {
      (window as any).doGTranslate(code);
    }
  };

  const isDark = scrolled || !isTransparentPage;
  const textColor = isDark ? "text-gray-700" : "text-white";
  const bgColor = isDark ? "bg-white/90" : "bg-white/10";
  const hoverBgColor = isDark ? "hover:bg-gray-100" : "hover:bg-white/20";

  const currentLanguageDetails =
    languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 group focus:outline-none ${
          isDark
            ? "border-gray-200 shadow-sm hover:border-hospital-teal/30 hover:shadow-md"
            : "border-white/20 hover:border-white/40 shadow-none"
        } ${bgColor} ${hoverBgColor}`}
      >
        <div
          className={`p-1 rounded-full transition-colors duration-300 ${
            isDark
              ? "bg-hospital-teal/10 text-hospital-teal"
              : "bg-white/20 text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
        </div>
        <span
          className={`text-[13px] font-bold tracking-tight uppercase ${textColor} notranslate`}
        >
          {currentLanguageDetails.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""} ${textColor} opacity-60`}
        />
      </button>

      {/* Language Selection List */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 max-h-[400px] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-[100] animate-in fade-in slide-in-from-top-2 duration-200 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-gray-50 flex items-center justify-between z-10">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] notranslate">
              Translate
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-hospital-teal animate-pulse" />
          </div>
          <div className="p-1.5 flex flex-col gap-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  currentLang === lang.code
                    ? "bg-hospital-teal text-white shadow-lg shadow-hospital-teal/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-hospital-teal"
                }`}
              >
                <span className="flex items-center gap-2 notranslate">
                  <span className="w-6 text-[10px] font-bold tracking-wider opacity-60 uppercase flex-shrink-0">
                    {lang.flag}
                  </span>
                  {lang.native}
                </span>
                {currentLang === lang.code && (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        #google_translate_element,
        .skiptranslate,
        iframe[id=":1.container"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          height: 0 !important;
          width: 0 !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
