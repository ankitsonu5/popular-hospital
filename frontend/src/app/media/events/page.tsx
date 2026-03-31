"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchEvents, getImageUrl, EventItem } from "@/lib/api";
import { Loader2, Calendar, ArrowRight } from "lucide-react";

export default function EventsListingPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/news-sm-inner.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/90 via-[#0b1c43]/40 to-transparent z-10" />
        </div>

        <div className="relative z-10 max-w-[1366px] mx-auto px-6 sm:px-8 lg:px-12 text-center sm:text-left">
          <nav
            className="mb-6 text-[11px] text-white/50 uppercase tracking-[0.2em]"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Events</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
            Hospital <span className="text-[#00B4D8]">Events</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mx-auto sm:mx-0">
            Capturing the spirit of healthcare through our community outreach,
            medical camps, and organizational milestones.
          </p>
        </div>
      </section>

      {/* ─── Events Grid ─── */}
      <section className="max-w-[1366px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
            <p className="text-gray-400 font-medium">Loading Events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/media/events/${event.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={
                      getImageUrl(event.thumbnail) || "/about-section-image.png"
                    }
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>

                {/* Info Container */}
                <div className="p-6 flex flex-col h-full items-center text-center">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </div>
                  <h2 className="text-lg font-extrabold text-[#111827] leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 px-2">
                    {event.title}
                  </h2>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-[#E85222] uppercase tracking-wider group/link">
                    View Gallery
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            ))}

            {events.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <p className="text-gray-400 italic text-lg">
                  No events published yet.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
