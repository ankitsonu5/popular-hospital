"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { getImageUrl, type PatientStory } from "@/lib/api";
import {
  getHomeStoryThumbnailUrl,
  getStoryThumbnailUrl,
  getVideoEmbedUrl,
  getPatientStoryLabel,
  getPatientStoryModalLayout,
  getYoutubeId,
  getVideoPlatform,
} from "@/lib/patientStories";

function TestimonialCard({
  story,
  index,
  className,
  useHomeThumbnail = false,
  onOpen,
}: {
  story: PatientStory;
  index: number;
  className: string;
  useHomeThumbnail?: boolean;
  onOpen: (story: PatientStory) => void;
}) {
  const shouldUseVideoPreview =
    (index === 2 || index === 3) && getVideoPlatform(story.videoUrl) === "direct";
  const thumbnailUrl = useHomeThumbnail
    ? getHomeStoryThumbnailUrl(
        story.homeThumbnailUrl,
        story.videoUrl,
      )
    : getStoryThumbnailUrl(story.thumbnailUrl, story.videoUrl);
  const title = story.title || getPatientStoryLabel(index);

  return (
    <button
      onClick={() => onOpen(story)}
      className={`relative group w-full overflow-hidden rounded-[14px] bg-gray-900 text-left shadow-[0_14px_34px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.18)] transform-gpu ${className}`}
      aria-label={`Play ${title}`}
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        isolation: "isolate",
        maskImage: "radial-gradient(white, black)",
        WebkitMaskImage: "radial-gradient(white, black)",
      }}
    >
      {shouldUseVideoPreview ? (
        <video
          src={getImageUrl(story.videoUrl)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/10 text-white backdrop-blur-[2px] transition-all group-hover:scale-110 group-hover:bg-white/20 sm:h-10 sm:w-10"
        >
          <svg
            className="ml-0.5 h-4 w-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-center text-white">
        <h3 className="text-sm font-black leading-tight drop-shadow-md line-clamp-2 sm:text-[15px]">
          {title}
        </h3>
      </div>
    </button>
  );
}

export default function Testimonials({
  stories,
}: {
  stories?: PatientStory[];
}) {
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  const selectedPlatform = selectedStory
    ? getVideoPlatform(selectedStory.videoUrl)
    : null;
  const modalLayout = selectedStory
    ? getPatientStoryModalLayout(selectedStory.videoUrl)
    : null;

  const displayStories = useMemo(() => {
    return (stories || []).slice(0, 7);
  }, [stories]);

  if (displayStories.length === 0) {
    return null;
  }

  const openStory = (story: PatientStory) => {
    setSelectedStory(story);
  };

  return (
    <>
      <section
        className="py-16 sm:py-24 bg-white relative overflow-hidden group/testimonials"
        aria-labelledby="patients-speak"
      >
        {/* Decorative Grid Lines Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0b1c43 1px, transparent 1px), linear-gradient(to bottom, #0b1c43 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="mx-auto w-full max-w-[1766px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
          <div className="mb-12 lg:mb-20 text-center">
            <h2
              id="patients-speak"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center font-jakarta"
            >
              Patients Speak
            </h2>
            <div className="mt-4 inline-flex items-center justify-center gap-2">
              <span className="h-[3px] w-6 rounded-full bg-[#ffb088]" />
              <span className="h-[5px] w-10 rounded-full bg-[#E85222] shadow-[0_2px_10px_rgba(232,82,34,0.35)]" />
              <span className="h-[3px] w-6 rounded-full bg-[#ffb088]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3 xl:gap-4 h-auto lg:h-[424px] items-stretch">
            <div className="flex flex-col justify-center">
              {displayStories[0] ? (
                <TestimonialCard
                  story={displayStories[0]}
                  index={0}
                  onOpen={openStory}
                  className="aspect-[4/5] lg:h-[224px] lg:aspect-auto"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:gap-3 xl:gap-4">
              {displayStories[1] ? (
                <TestimonialCard
                  story={displayStories[1]}
                  index={1}
                  onOpen={openStory}
                  className="h-[280px] lg:h-[196px]"
                />
              ) : null}
              {displayStories[2] ? (
                <TestimonialCard
                  story={displayStories[2]}
                  index={2}
                  onOpen={openStory}
                  className="h-[280px] lg:h-[202px]"
                />
              ) : null}
            </div>

            <div className="h-[400px] lg:h-full">
              {displayStories[3] ? (
                <TestimonialCard
                  story={displayStories[3]}
                  index={3}
                  onOpen={openStory}
                  useHomeThumbnail
                  className="h-full"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:gap-3 xl:gap-4">
              {displayStories[4] ? (
                <TestimonialCard
                  story={displayStories[4]}
                  index={4}
                  onOpen={openStory}
                  className="h-[280px] lg:h-[218px]"
                />
              ) : null}
              {displayStories[5] ? (
                <TestimonialCard
                  story={displayStories[5]}
                  index={5}
                  onOpen={openStory}
                  className="h-[280px] lg:h-[190px]"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-center">
              {displayStories[6] ? (
                <TestimonialCard
                  story={displayStories[6]}
                  index={6}
                  onOpen={openStory}
                  className="aspect-[4/5] lg:h-[224px] lg:aspect-auto"
                />
              ) : null}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-[#E85222] font-semibold text-xl hover:gap-3 transition-all"
            >
              View All Patient Stories
              <span className="w-8 h-8 rounded-full bg-[#E85222] text-white flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {selectedStory ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className={`relative w-full rounded-2xl ${modalLayout?.shellClassName || "max-w-4xl"} ${modalLayout?.shellSurfaceClassName || "bg-white overflow-hidden shadow-2xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className={`relative w-full ${modalLayout?.frameClassName || "aspect-video"} ${modalLayout?.frameWrapperClassName || ""}`}
              >
                {selectedPlatform === "direct" ? (
                  <video
                    src={getImageUrl(selectedStory.videoUrl)}
                    className="absolute inset-0 h-full w-full bg-black object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : selectedPlatform === "youtube" ||
                  selectedPlatform === "instagram" ||
                  selectedPlatform === "facebook" ? (
                  <iframe
                    src={
                      getVideoEmbedUrl(selectedStory.videoUrl) ||
                      selectedStory.videoUrl
                    }
                    className={
                      modalLayout?.iframeClassName ||
                      "absolute inset-0 w-full h-full"
                    }
                    style={
                      modalLayout?.useAbsoluteIframe === false
                        ? undefined
                        : { position: "absolute", inset: 0 }
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    scrolling="no"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-white px-6 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      This video format is not supported for inline playback.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
