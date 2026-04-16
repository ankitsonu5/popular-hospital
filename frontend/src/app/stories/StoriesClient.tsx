"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PatientStory } from "@/lib/api";
import {
  getStoryThumbnailUrl,
  getVideoEmbedUrl,
  getPatientStoryLabel,
  getPatientStoryModalLayout,
  getYoutubeId,
  getVideoPlatform,
  isFacebookReel,
} from "@/lib/patientStories";

export default function StoriesPage({
  stories,
}: {
  stories: PatientStory[];
}) {
  const [selectedStory, setSelectedStory] = useState<PatientStory | null>(null);
  const selectedPlatform = selectedStory
    ? getVideoPlatform(selectedStory.videoUrl)
    : null;
  const displayStories = stories;

  const openStory = (story: PatientStory) => {
    const platform = getVideoPlatform(story.videoUrl);
    if (platform === "facebook" || platform === "instagram") {
      window.open(story.videoUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedStory(story);
  };

  const modalLayout = selectedStory
    ? getPatientStoryModalLayout(selectedStory.videoUrl)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="relative w-full py-20 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/banners/patient_testimonials_video.png"
            alt="Patient Stories Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="absolute inset-0 block md:hidden">
          <Image
            src="/images/banners/patient_testimonials_video.png"
            alt="Patient Stories Banner Mobile"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 text-center text-white">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-4 drop-shadow-lg">
            Patient Stories
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-md">
            Hear directly from our patients about their experiences and
            successful recovery journeys at Popular Hospital.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {displayStories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
            No patient stories are available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayStories.map((story, index) => {
              const thumbnailUrl = getStoryThumbnailUrl(
                story.thumbnailUrl,
                story.videoUrl,
              );
              return (
                <button
                  key={story._id}
                  onClick={() => openStory(story)}
                  className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-left flex flex-col h-full"
                >
                  <div className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden">
                    <Image
                      src={thumbnailUrl}
                      alt={story.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center transform group-hover:scale-110 transition-all shadow-xl">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#0b1c43]">
                          <svg
                            className="w-6 h-6 text-white transition-colors group-hover:text-[#0b1c43] ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-gray-50 bg-white space-y-1">
                    <p className="text-[#0b1c43] text-sm font-bold tracking-tight">
                      {getPatientStoryLabel(index)}
                    </p>
                    {story.title ? (
                      <p className="text-sm text-gray-500 line-clamp-2">{story.title}</p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {selectedStory ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className={`relative w-full rounded-2xl ${modalLayout?.shellClassName || "max-w-5xl"} ${modalLayout?.shellSurfaceClassName || "bg-black overflow-hidden shadow-2xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition-all"
            >
              <svg
                className="w-6 h-6"
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
              {selectedPlatform === "youtube" || selectedPlatform === "instagram" ? (
                <iframe
                  src={getVideoEmbedUrl(selectedStory.videoUrl) || selectedStory.videoUrl}
                  className={
                    modalLayout?.iframeClassName || "absolute inset-0 w-full h-full"
                  }
                  style={
                    modalLayout?.useAbsoluteIframe === false
                      ? undefined
                      : { position: "absolute", inset: 0 }
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selectedPlatform === "facebook" ? (
                <iframe
                  src={getVideoEmbedUrl(selectedStory.videoUrl) || selectedStory.videoUrl}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
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
    </div>
  );
}
