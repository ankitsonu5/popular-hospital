"use client";

import { useState } from "react";
import Image from "next/image";
import { PhoneCall, X } from "lucide-react";

export default function MobileWhatsAppFAB() {
  const [activeMenu, setActiveMenu] = useState<"call" | "whatsapp" | null>(
    null,
  );

  const toggleMenu = (menu: "call" | "whatsapp") => {
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  return (
    <div
      className="md:hidden fixed bottom-[100px] right-4 z-[100] flex flex-col items-end gap-2 pb-safe-bottom"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Menu Options */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${
          activeMenu
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {activeMenu === "whatsapp" ? (
          <>
            <a
              href="https://wa.me/917800001895"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-50"
            >
              <Image
                src="/images/whatsapp_icon.png"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <span className="text-[13px] font-bold tracking-wide text-gray-800">
                +91-7800001895 / 96
              </span>
            </a>
            <a
              href="https://wa.me/917800001896"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-50"
            >
              <Image
                src="/images/whatsapp_icon.png"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <span className="text-[13px] font-bold tracking-wide text-gray-800">
                +91-7800001896
              </span>
            </a>
          </>
        ) : (
          <>
            <a
              href="tel:+917800001895"
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-50"
            >
              <PhoneCall className="h-4 w-4 text-[#0b7a75]" />
              <span className="text-[13px] font-bold tracking-wide text-gray-800">
                +91-7800001895 / 96
              </span>
            </a>
            <a
              href="tel:+917800001896"
              className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-50"
            >
              <PhoneCall className="h-4 w-4 text-[#0b7a75]" />
              <span className="text-[13px] font-bold tracking-wide text-gray-800">
                +91-7800001896
              </span>
            </a>
          </>
        )}
      </div>

      {/* Call Toggle Button */}
      <button
        onClick={() => toggleMenu("call")}
        className={`flex h-10 w-10 items-center justify-center rounded-full shadow-[0_4px_18px_rgba(11,122,117,0.28)] transition-all duration-300 ${
          activeMenu === "call"
            ? "rotate-90 scale-105 bg-gray-800 hover:bg-gray-900"
            : "bg-[#0b7a75] hover:scale-105 hover:bg-[#096a66]"
        }`}
        aria-label="Toggle call options"
      >
        {activeMenu === "call" ? (
          <X className="h-[18px] w-[18px] text-white" />
        ) : (
          <PhoneCall className="h-[18px] w-[18px] text-white" />
        )}
      </button>

      {/* WhatsApp Toggle Button */}
      <button
        onClick={() => toggleMenu("whatsapp")}
        className={`flex h-11 w-11 items-center justify-center rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-300 ${
          activeMenu === "whatsapp"
            ? "rotate-90 scale-105 bg-gray-800 hover:bg-gray-900"
            : "bg-[#25D366] hover:scale-105 hover:bg-[#20bd5a]"
        }`}
        aria-label="Toggle WhatsApp options"
      >
        {activeMenu === "whatsapp" ? (
          <X className="h-[18px] w-[18px] text-white" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );
}
