"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Images,
  Maximize2,
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

type GalleryTab = "all" | "image" | "video";

const galleryTabs: Array<{
  value: GalleryTab;
  label: string;
  icon: typeof Images;
}> = [
  { value: "all", label: "All", icon: Images },
  { value: "image", label: "Photos", icon: ImageIcon },
  { value: "video", label: "Videos", icon: Video },
];

const INITIAL_VISIBLE_ITEMS = 6;

const backdropClass =
  "h-full w-full scale-125 object-cover opacity-90 blur-2xl saturate-150";
const backdropTintClass = "absolute inset-0 bg-[#0b1c43]/25";
const foregroundClass =
  "h-full w-full object-contain";

function mediaSrc(url: string) {
  return getImageUrl(url, false, { preferRelativeUploads: true });
}

function getVideoThumbnails(item: DepartmentGalleryItem) {
  const youtubeId = getYoutubeId(item.mediaUrl);
  const fallback = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : "";
  const desktop = item.thumbnailUrl || fallback;
  const mobile = item.thumbnailMobileUrl || item.thumbnailUrl || fallback;

  return {
    desktop: desktop ? mediaSrc(desktop) : "",
    mobile: mobile ? mediaSrc(mobile) : "",
  };
}

function getItemTitle(item: DepartmentGalleryItem, departmentName: string) {
  return (
    item.title ||
    (item.type === "video"
      ? `${departmentName} department video`
      : `${departmentName} department photo`)
  );
}

function VideoThumbnail({
  item,
  alt,
}: {
  item: DepartmentGalleryItem;
  alt: string;
}) {
  const { desktop, mobile } = getVideoThumbnails(item);

  if (!desktop) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b1c43] to-[#1e3a8a] text-white/50">
        <Video className="h-10 w-10" aria-hidden="true" />
      </span>
    );
  }

  return (
    <>
      <picture className="absolute inset-0 block" aria-hidden="true">
        <source media="(max-width: 639px)" srcSet={mobile} />
        <img src={desktop} alt="" className={backdropClass} />
      </picture>
      <span className={backdropTintClass} />
      <picture className="absolute inset-0 block">
        <source media="(max-width: 639px)" srcSet={mobile} />
        <img src={desktop} alt={alt} className={foregroundClass} />
      </picture>
    </>
  );
}

function CardMedia({
  item,
  alt,
  sizes,
}: {
  item: DepartmentGalleryItem;
  alt: string;
  sizes: string;
}) {
  if (item.type === "video") {
    return <VideoThumbnail item={item} alt={alt} />;
  }

  const src = mediaSrc(item.mediaUrl);

  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={backdropClass}
      />
      <span className={backdropTintClass} />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={foregroundClass}
      />
    </>
  );
}

function LightboxThumb({ item }: { item: DepartmentGalleryItem }) {
  if (item.type === "video") {
    const { desktop } = getVideoThumbnails(item);
    return (
      <>
        {desktop ? (
          <img
            src={desktop}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-[#1e3a8a]/40">
            <Video className="h-5 w-5 text-white/70" aria-hidden="true" />
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/25">
          <Play className="h-4 w-4 fill-white text-white" aria-hidden="true" />
        </span>
      </>
    );
  }

  return (
    <Image
      src={mediaSrc(item.mediaUrl)}
      alt=""
      fill
      sizes="96px"
      className="object-cover"
    />
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
  const [activeTab, setActiveTab] = useState<GalleryTab>("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<DepartmentGalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

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
      activeTab === "all"
        ? items
        : items.filter((item) => item.type === activeTab),
    [activeTab, items],
  );

  const itemCounts = useMemo(
    () => ({
      all: items.length,
      image: items.filter((item) => item.type === "image").length,
      video: items.filter((item) => item.type === "video").length,
    }),
    [items],
  );

  const selectTab = useCallback((tab: GalleryTab) => {
    setActiveTab(tab);
    setExpanded(false);
  }, []);

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % galleryTabs.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + galleryTabs.length) % galleryTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = galleryTabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    selectTab(galleryTabs[nextIndex].value);
    tabRefs.current[nextIndex]?.focus();
  };

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

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [selected]);

  if (!loading && items.length === 0) return null;

  const visibleItems = expanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_ITEMS);
  const hasMore = filteredItems.length > INITIAL_VISIBLE_ITEMS;
  const activeTabMeta =
    galleryTabs.find((tab) => tab.value === activeTab) ?? galleryTabs[0];
  const activeNoun =
    activeTab === "image" ? "photos" : activeTab === "video" ? "videos" : "items";

  const columnCount = Math.min(visibleItems.length, 3);
  const gridClass =
    columnCount <= 1
      ? "mx-auto grid max-w-xl grid-cols-1 gap-4 sm:gap-5"
      : columnCount === 2
        ? "mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-5"
        : "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3";
  const mediaAspect =
    columnCount <= 1
      ? "aspect-[4/3] sm:aspect-[16/10]"
      : columnCount === 2
        ? "aspect-[4/3] sm:aspect-[16/10]"
        : "aspect-[4/3]";
  const mediaSizes =
    columnCount <= 1
      ? "(max-width: 1023px) 100vw, (max-width: 1535px) 960px, 1216px"
      : columnCount === 2
        ? "(max-width: 1023px) 50vw, (max-width: 1535px) 480px, 608px"
        : "(max-width: 1023px) 50vw, (max-width: 1535px) 320px, 405px";

  const emptyFallbackTab: GalleryTab | null =
    activeTab === "video" && itemCounts.image > 0
      ? "image"
      : activeTab === "image" && itemCounts.video > 0
        ? "video"
        : null;

  const selectedIndex = selected
    ? filteredItems.findIndex((item) => item._id === selected._id)
    : -1;
  const selectedVideoEmbedUrl =
    selected?.type === "video" ? getVideoEmbedUrl(selected.mediaUrl) : null;

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50/70 py-16 xl:py-12 2xl:py-20">
      <div
        className="pointer-events-none absolute -right-40 -top-24 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 2xl:max-w-7xl">
        {/* Heading */}
        <div className="mb-7 lg:mb-8">
          <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E85222]">
            <span className="h-[2px] w-6 rounded-full bg-[#E85222]" />
            Inside our department
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-block h-8 w-1 shrink-0 rounded-full bg-[#1e3a8a]" />
            <h2 className="text-2xl font-bold text-[#0b1c43] md:text-3xl 2xl:text-4xl">
              {departmentName}{" "}
              <span className="text-[#1e3a8a]">Photos &amp; Videos</span>
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-600">
            Take a closer look at our advanced facilities, technology, and the
            care environment at Popular Hospital.
          </p>
        </div>

        {/* Gallery panel */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-2 sm:px-5">
            <div
              role="tablist"
              aria-label={`${departmentName} gallery categories`}
              className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none] sm:flex-none [&::-webkit-scrollbar]:hidden"
            >
              {galleryTabs.map(({ value, label, icon: Icon }, index) => {
                const isActive = activeTab === value;
                return (
                  <button
                    key={value}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${value}`}
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTab(value)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`group relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-3 py-4 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:bg-blue-50/70 sm:flex-none sm:px-5 ${
                      isActive
                        ? "text-[#1e3a8a]"
                        : "text-slate-500 hover:text-[#0b1c43]"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive
                          ? "text-[#E85222]"
                          : "text-slate-400 group-hover:text-[#1e3a8a]"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                    <span
                      className={`min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold leading-none transition-colors ${
                        isActive
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {loading ? "–" : itemCounts[value]}
                    </span>
                    <span
                      className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-[#1e3a8a] transition-transform duration-300 sm:inset-x-4 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${activeTab}`}
            className="p-3 sm:p-5 lg:p-6"
          >
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border border-slate-100 ${
                      index === 2 ? "hidden lg:block" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] animate-pulse bg-slate-200/70" />
                    <div className="space-y-2 p-4">
                      <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-200/70" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center sm:py-16">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1e3a8a] shadow-sm ring-1 ring-slate-100">
                  <activeTabMeta.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-bold text-[#0b1c43]">
                  {activeTab === "video" ? "Videos coming soon" : "Photos coming soon"}
                </p>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500">
                  We&apos;re adding {activeNoun} of our {departmentName}{" "}
                  department soon.
                  {emptyFallbackTab &&
                    ` Meanwhile, explore our ${
                      emptyFallbackTab === "image" ? "photos" : "videos"
                    }.`}
                </p>
                {emptyFallbackTab && (
                  <button
                    type="button"
                    onClick={() => selectTab(emptyFallbackTab)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1e3a8a] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-900/15 transition hover:bg-[#0b1c43] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                  >
                    {emptyFallbackTab === "image" ? (
                      <ImageIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Video className="h-4 w-4" aria-hidden="true" />
                    )}
                    View {emptyFallbackTab === "image" ? "photos" : "videos"}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className={gridClass}>
                  {visibleItems.map((item) => {
                    const isVideo = item.type === "video";
                    const itemTitle = getItemTitle(item, departmentName);

                    return (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => setSelected(item)}
                        aria-label={`${isVideo ? "Play" : "View"} ${itemTitle}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition-colors duration-300 hover:border-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                      >
                        <span
                          className={`relative isolate block w-full overflow-hidden bg-[#0b1c43] ${mediaAspect}`}
                        >
                          <CardMedia
                            item={item}
                            alt={itemTitle}
                            sizes={mediaSizes}
                          />

                          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071633]/45 via-transparent to-transparent" />

                          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1e3a8a] shadow-sm sm:left-3 sm:top-3">
                            {isVideo ? (
                              <Video className="h-3 w-3 text-[#E85222]" aria-hidden="true" />
                            ) : (
                              <ImageIcon className="h-3 w-3 text-[#E85222]" aria-hidden="true" />
                            )}
                            {isVideo ? "Video" : "Photo"}
                          </span>

                          {isVideo ? (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1e3a8a] shadow-2xl ring-[6px] ring-white/25 sm:h-16 sm:w-16">
                                <Play
                                  className="ml-0.5 h-5 w-5 fill-current sm:ml-1 sm:h-6 sm:w-6"
                                  aria-hidden="true"
                                />
                              </span>
                            </span>
                          ) : (
                            <span className="absolute right-3 top-3 hidden h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:flex">
                              <Maximize2 className="h-4 w-4" aria-hidden="true" />
                            </span>
                          )}
                        </span>

                        <span className="flex flex-1 items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-bold text-[#0b1c43] sm:text-[15px]">
                              {itemTitle}
                            </span>
                            <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                              {isVideo ? "Watch video" : "View photo"}
                            </span>
                          </span>
                          <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#1e3a8a] transition-colors duration-300 group-hover:bg-[#1e3a8a] group-hover:text-white sm:flex">
                            <ArrowUpRight
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setExpanded((value) => !value)}
                      aria-expanded={expanded}
                      className="inline-flex items-center gap-2 rounded-full border border-[#1e3a8a]/20 bg-white px-6 py-2.5 text-sm font-bold text-[#1e3a8a] shadow-sm transition hover:border-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                    >
                      {expanded
                        ? "Show less"
                        : `View all ${filteredItems.length} ${activeNoun}`}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
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
                  {getItemTitle(selected, departmentName)}
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

            <div
              className={`relative aspect-[4/3] bg-black sm:aspect-video ${
                filteredItems.length > 1 ? "max-h-[64vh]" : "max-h-[78vh]"
              }`}
            >
              {selected.type === "video" && selectedVideoEmbedUrl ? (
                <iframe
                  key={selected._id}
                  src={selectedVideoEmbedUrl}
                  title={getItemTitle(selected, departmentName)}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selected.type === "video" ? (
                <video
                  key={selected._id}
                  src={mediaSrc(selected.mediaUrl)}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  key={selected._id}
                  src={mediaSrc(selected.mediaUrl)}
                  alt={getItemTitle(selected, departmentName)}
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

            {filteredItems.length > 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-3 [scrollbar-width:thin] sm:gap-3 sm:px-5">
                {filteredItems.map((item, index) => {
                  const isActive = item._id === selected._id;
                  return (
                    <button
                      key={item._id}
                      ref={isActive ? activeThumbRef : undefined}
                      type="button"
                      onClick={() => setSelected(item)}
                      aria-label={`Show item ${index + 1}: ${getItemTitle(item, departmentName)}`}
                      aria-current={isActive}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 transition sm:h-14 sm:w-20 ${
                        isActive
                          ? "opacity-100 ring-2 ring-[#E85222] ring-offset-2 ring-offset-[#071633]"
                          : "opacity-50 hover:opacity-90"
                      }`}
                    >
                      <LightboxThumb item={item} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
