"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Images,
  Play,
  Video,
  X,
} from "lucide-react";
import {
  fetchDepartmentGallery,
  getImageUrl,
  type DepartmentGalleryItem,
} from "@/lib/api";
import { getVideoEmbedUrl, getYoutubeId } from "@/lib/patientStories";

type GalleryFilter = "all" | "image" | "video";

const galleryFilters: Array<{
  value: GalleryFilter;
  label: string;
  icon: typeof Images;
}> = [
  { value: "all", label: "All", icon: Images },
  { value: "image", label: "Photos", icon: ImageIcon },
  { value: "video", label: "Videos", icon: Video },
];

function ResponsiveVideoThumbnail({
  item,
  alt,
}: {
  item: DepartmentGalleryItem;
  alt: string;
}) {
  const youtubeId = getYoutubeId(item.mediaUrl);
  const fallbackThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : "";
  const desktopThumbnail = item.thumbnailUrl || fallbackThumbnail;
  const mobileThumbnail =
    item.thumbnailMobileUrl || item.thumbnailUrl || fallbackThumbnail;

  if (!desktopThumbnail) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-[#0b1c43] text-white/60">
        <Video className="h-10 w-10" aria-hidden="true" />
      </span>
    );
  }

  return (
    <picture className="absolute inset-0 block overflow-hidden bg-[#071633]">
      <source
        media="(max-width: 639px)"
        srcSet={getImageUrl(mobileThumbnail, false, {
          preferRelativeUploads: true,
        })}
      />
      <img
        src={getImageUrl(desktopThumbnail, false, {
          preferRelativeUploads: true,
        })}
        alt={alt}
        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
      />
    </picture>
  );
}

export default function DepartmentGallerySection({
  departmentSlug,
  departmentName,
}: {
  departmentSlug: string;
  departmentName: string;
}) {
  const [items, setItems] = useState<DepartmentGalleryItem[]>([]);
  const [activeType, setActiveType] = useState<GalleryFilter>("all");
  const [selected, setSelected] = useState<DepartmentGalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchDepartmentGallery(departmentSlug)
      .then((data) => {
        if (!ignore) setItems(data);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [departmentSlug]);

  const filteredItems = useMemo(
    () =>
      activeType === "all"
        ? items
        : items.filter((item) => item.type === activeType),
    [activeType, items],
  );

  const itemCounts = useMemo(
    () => ({
      all: items.length,
      image: items.filter((item) => item.type === "image").length,
      video: items.filter((item) => item.type === "video").length,
    }),
    [items],
  );

  const updateScrollControls = useCallback(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(maxScrollLeft - track.scrollLeft > 4);
  }, []);

  useEffect(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    track.scrollTo({ left: 0 });
    const animationFrame = requestAnimationFrame(updateScrollControls);
    const resizeObserver = new ResizeObserver(updateScrollControls);
    resizeObserver.observe(track);
    track.addEventListener("scroll", updateScrollControls, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      track.removeEventListener("scroll", updateScrollControls);
    };
  }, [filteredItems, updateScrollControls]);

  const scrollGallery = useCallback(
    (direction: "left" | "right") => {
      const track = galleryTrackRef.current;
      if (!track) return;

      const firstCard = track.querySelector<HTMLElement>("[data-gallery-card]");
      const distance = (firstCard?.offsetWidth ?? track.clientWidth * 0.8) + 24;
      track.scrollBy({
        left: direction === "left" ? -distance : distance,
        behavior: "smooth",
      });
    },
    [],
  );

  const moveSelection = useCallback(
    (offset: number) => {
      if (filteredItems.length <= 1) return;

      setSelected((current) => {
        const currentIndex = current
          ? filteredItems.findIndex((item) => item._id === current._id)
          : -1;
        const nextIndex =
          (currentIndex + offset + filteredItems.length) %
          filteredItems.length;
        return filteredItems[nextIndex];
      });
    },
    [filteredItems],
  );

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") moveSelection(-1);
      if (event.key === "ArrowRight") moveSelection(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveSelection, selected]);

  if (!loading && items.length === 0) return null;

  const selectedIndex = selected
    ? filteredItems.findIndex((item) => item._id === selected._id)
    : -1;
  const selectedVideoEmbedUrl =
    selected?.type === "video" ? getVideoEmbedUrl(selected.mediaUrl) : null;

  return (
    <section className="departments-font-scope relative overflow-hidden border-y border-slate-100 bg-[#f7f9fc] py-16 sm:py-20 xl:py-14 2xl:py-24">
      <div
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-28 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 2xl:max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-[#1e3a8a]" />
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1e3a8a]">
                Inside our department
              </p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0b1c43] sm:text-4xl 2xl:text-[42px]">
              {departmentName}{" "}
              <span className="text-[#1e3a8a]">Photos &amp; Videos</span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] font-medium leading-relaxed text-slate-600 sm:text-base">
              Take a closer look at our advanced facilities, technology, and the
              care environment at Popular Hospital.
            </p>
          </div>

          {!loading && (
            <div
              className="inline-flex w-full items-center rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-sm sm:w-fit"
              aria-label="Filter gallery items"
            >
              {galleryFilters.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveType(value)}
                  aria-pressed={activeType === value}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 sm:flex-none sm:px-4 ${
                    activeType === value
                      ? "bg-[#1e3a8a] text-white shadow-md shadow-blue-900/15"
                      : "text-slate-600 hover:bg-blue-50 hover:text-[#1e3a8a]"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{label}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] leading-none ${
                      activeType === value
                        ? "bg-white/15 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {itemCounts[value]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex gap-5 overflow-hidden lg:gap-6">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-[270px] w-[88%] shrink-0 animate-pulse rounded-3xl border border-white bg-slate-200/70 shadow-sm sm:h-[310px] sm:w-[68%] lg:h-[330px] lg:w-[55%]"
              />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="relative">
            <div
              ref={galleryTrackRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-3 pt-1 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
            >
              {filteredItems.map((item) => {
                const itemTitle =
                  item.title ||
                  (item.type === "video"
                    ? `${departmentName} department video`
                    : `${departmentName} department photo`);

                return (
                  <button
                    key={item._id}
                    type="button"
                    data-gallery-card
                    onClick={() => setSelected(item)}
                    aria-label={`Open ${itemTitle}`}
                    className="group relative h-[270px] w-[88%] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/80 bg-[#0b1c43] text-left shadow-[0_18px_45px_-28px_rgba(15,23,42,0.55)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-26px_rgba(30,58,138,0.32)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:h-[310px] sm:w-[68%] lg:h-[330px] lg:w-[55%]"
                  >
                    {item.type === "video" ? (
                      <ResponsiveVideoThumbnail item={item} alt={itemTitle} />
                    ) : (
                      <Image
                        src={getImageUrl(item.mediaUrl, false, {
                          preferRelativeUploads: true,
                        })}
                        alt={itemTitle}
                        fill
                        sizes="(max-width: 639px) 88vw, (max-width: 1023px) 68vw, 550px"
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      />
                    )}

                    <span className="absolute inset-0 bg-gradient-to-t from-[#071633]/95 via-[#071633]/15 to-transparent" />
                    <span className="absolute inset-0 bg-[#1e3a8a]/0 transition-colors duration-300 group-hover:bg-[#1e3a8a]/5" />

                    {item.type === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/25 bg-white text-[#1e3a8a] shadow-2xl transition-transform duration-300 group-hover:scale-[1.04] sm:h-[72px] sm:w-[72px]">
                          <Play
                            className="ml-1 h-7 w-7 fill-current"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    )}

                    <span className="absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-6">
                      <span className="min-w-0">
                        <span className="line-clamp-2 block text-lg font-bold leading-snug text-white sm:text-xl">
                          {itemTitle}
                        </span>
                        <span className="mt-1.5 block text-xs font-semibold text-blue-100/90">
                          {item.type === "video" ? "Watch video" : "View photo"}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollGallery("left")}
                  disabled={!canScrollLeft}
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#1e3a8a] shadow-lg transition-colors hover:bg-[#1e3a8a] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#1e3a8a] sm:-left-3 sm:h-12 sm:w-12"
                  aria-label="Scroll gallery left"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery("right")}
                  disabled={!canScrollRight}
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#1e3a8a] shadow-lg transition-colors hover:bg-[#1e3a8a] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#1e3a8a] sm:-right-3 sm:h-12 sm:w-12"
                  aria-label="Scroll gallery right"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white/70 px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1e3a8a]">
              {activeType === "video" ? (
                <Video className="h-6 w-6" aria-hidden="true" />
              ) : (
                <ImageIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </span>
            <p className="mt-4 text-base font-bold text-[#0b1c43]">
              No {activeType === "video" ? "videos" : "photos"} added yet
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Explore the other gallery category to see more.
            </p>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#020817]/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${departmentName} gallery preview`}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#071633] shadow-2xl sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold sm:text-base">
                  {selected.title ||
                    (selected.type === "video"
                      ? `${departmentName} department video`
                      : `${departmentName} department photo`)}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-200/70">
                  {selected.type === "video" ? "Video" : "Photo"}
                  {filteredItems.length > 1 && selectedIndex >= 0
                    ? `  •  ${selectedIndex + 1} of ${filteredItems.length}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-[#0b1c43] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close gallery preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-[4/3] max-h-[78vh] bg-black sm:aspect-video">
              {selected.type === "video" && selectedVideoEmbedUrl ? (
                <iframe
                  src={selectedVideoEmbedUrl}
                  title={selected.title || `${departmentName} video`}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selected.type === "video" ? (
                <video
                  src={getImageUrl(selected.mediaUrl, false, {
                    preferRelativeUploads: true,
                  })}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={getImageUrl(selected.mediaUrl, false, {
                    preferRelativeUploads: true,
                  })}
                  alt={selected.title || `${departmentName} photo`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1152px"
                  className="object-contain"
                />
              )}

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveSelection(-1)}
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1c43]/75 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-[#0b1c43] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:h-12 sm:w-12"
                    aria-label="Previous gallery item"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSelection(1)}
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1c43]/75 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-[#0b1c43] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:h-12 sm:w-12"
                    aria-label="Next gallery item"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
