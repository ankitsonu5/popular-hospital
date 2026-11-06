"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

export interface DoctorVideo {
  id: string;
  videoId: string;
  title: string;
}

export default function DoctorVideoCarousel({
  videos,
  channelUrl,
}: {
  videos: DoctorVideo[];
  channelUrl?: string;
}) {
  const [index, setIndex] = useState(0);
  // videoIds whose maxres thumbnail failed to load (fall back to hqdefault)
  const [fallbackIds, setFallbackIds] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState<DoctorVideo | null>(null);

  useEffect(() => {
    if (!playing) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaying(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [playing]);

  if (videos.length === 0) return null;

  const total = videos.length;
  const current = videos[Math.min(index, total - 1)];
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  const thumb = fallbackIds[current.videoId]
    ? `https://img.youtube.com/vi/${current.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${current.videoId}/maxresdefault.jpg`;

  return (
    <div className="relative mt-12">
      {/* Blue panel sits behind; the white card overflows its bottom edge */}
      <div className="absolute inset-x-0 top-0 bottom-14 rounded-2xl bg-[#0b1c43]" />

      <div className="relative px-5 pt-7 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Video Library
          </h3>
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#0b1c43]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Subscribe
            </a>
          )}
        </div>

        <div className="mx-auto mt-5 max-w-3xl rounded-2xl bg-white p-4 shadow-xl">
          <div className="relative overflow-hidden rounded-xl bg-slate-900">
            <button
              key={current.id}
              type="button"
              onClick={() => setPlaying(current)}
              aria-label={`Play video: ${current.title}`}
              className="group relative block w-full cursor-pointer pb-[56.25%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb}
                alt={current.title}
                loading="lazy"
                onError={() =>
                  setFallbackIds((prev) => ({ ...prev, [current.videoId]: true }))
                }
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-black/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#E85222] shadow-2xl ring-[6px] ring-white/25 sm:h-16 sm:w-16">
                  <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </span>
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous video"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1c43] shadow-md transition-colors hover:bg-[#E85222] hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next video"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b1c43] shadow-md transition-colors hover:bg-[#E85222] hover:text-white cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between gap-4 px-1 pb-1">
            <h4 className="font-heading text-lg font-bold leading-snug text-[#0b1c43] line-clamp-2">
              {current.title}
            </h4>
            {total > 1 && (
              <span className="shrink-0 pt-0.5 text-sm font-semibold text-slate-400">
                {Math.min(index, total - 1) + 1} / {total}
              </span>
            )}
          </div>
        </div>
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#020817]/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          onClick={() => setPlaying(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#071633] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white">
              <p className="truncate text-sm font-bold sm:text-base">
                {playing.title}
              </p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-[#0b1c43]"
                aria-label="Close video"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1&rel=0`}
                title={playing.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
