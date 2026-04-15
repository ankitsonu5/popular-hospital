"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { PatientStory } from "@/lib/api";
import {
  getStoryThumbnailUrl,
  getVideoEmbedUrl,
  getPatientStoryLabel,
  getPatientStoryModalLayout,
  getYoutubeId,
} from "@/lib/patientStories";

function TestimonialCard({
  story,
  index,
  className,
  buttonSize,
  onOpen,
}: {
  story: PatientStory;
  index: number;
  className: string;
  buttonSize: string;
  onOpen: (story: PatientStory) => void;
}) {
  const thumbnailUrl = getStoryThumbnailUrl(story.thumbnailUrl, story.videoUrl);

  return (
    <button
      onClick={() => onOpen(story)}
      className={`relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full bg-gray-900 ${className}`}
      aria-label={`Play ${getPatientStoryLabel(index)}`}
    >
      <Image
        src={thumbnailUrl}
        alt={story.name}
        fill
        className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${buttonSize} rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E85222] transition-all`}
        >
          <svg
            className="text-white ml-0.5"
            width="40%"
            height="40%"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
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
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
          <div
            className="absolute -top-10 -left-10 w-[600px] h-[400px] opacity-[0.4] transition-transform duration-1000 group-hover/testimonials:scale-105"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 Z' fill='none' stroke='%23bae6fd' stroke-width='1.5'/%3E%3Ccircle cx='50' cy='0' r='3' fill='%237dd3fc'/%3E%3Ccircle cx='150' cy='0' r='3' fill='%237dd3fc'/%3E%3Ccircle cx='0' cy='86.6' r='3' fill='%237dd3fc'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 104px",
            }}
          />
          <div
            className="absolute top-1/4 -right-12 w-[300px] h-[600px] opacity-[0.5] transition-transform duration-1000 group-hover/testimonials:translate-y-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 Z' fill='none' stroke='%23bae6fd' stroke-width='1.5'/%3E%3Cpath d='M100 0 L100 173.2' stroke='%23e0f2fe' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 86.6px",
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1766px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
          <div className="mb-12 lg:mb-20 text-center">
            <h2
              id="patients-speak"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] text-center font-heading"
            >
              Patients Speak
            </h2>
            <div className="mt-4 inline-flex items-center justify-center gap-2">
              <span className="h-[3px] w-6 rounded-full bg-[#ffb088]" />
              <span className="h-[5px] w-10 rounded-full bg-[#E85222] shadow-[0_2px_10px_rgba(232,82,34,0.35)]" />
              <span className="h-[3px] w-6 rounded-full bg-[#ffb088]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 h-auto lg:h-[600px] items-stretch">
            <div className="flex flex-col justify-center">
              {displayStories[0] ? (
                <TestimonialCard
                  story={displayStories[0]}
                  index={0}
                  onOpen={openStory}
                  className="aspect-[4/5]"
                  buttonSize="w-10 h-10"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
              {displayStories[1] ? (
                <TestimonialCard
                  story={displayStories[1]}
                  index={1}
                  onOpen={openStory}
                  className="h-[280px] lg:h-1/2"
                  buttonSize="w-12 h-12"
                />
              ) : null}
              {displayStories[2] ? (
                <TestimonialCard
                  story={displayStories[2]}
                  index={2}
                  onOpen={openStory}
                  className="h-[280px] lg:h-1/2"
                  buttonSize="w-12 h-12"
                />
              ) : null}
            </div>

            <div className="h-[400px] lg:h-full">
              {displayStories[3] ? (
                <TestimonialCard
                  story={displayStories[3]}
                  index={3}
                  onOpen={openStory}
                  className="h-full"
                  buttonSize="w-20 h-20 border-2"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
              {displayStories[4] ? (
                <TestimonialCard
                  story={displayStories[4]}
                  index={4}
                  onOpen={openStory}
                  className="h-[280px] lg:h-1/2"
                  buttonSize="w-12 h-12"
                />
              ) : null}
              {displayStories[5] ? (
                <TestimonialCard
                  story={displayStories[5]}
                  index={5}
                  onOpen={openStory}
                  className="h-[280px] lg:h-1/2"
                  buttonSize="w-12 h-12"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-center">
              {displayStories[6] ? (
                <TestimonialCard
                  story={displayStories[6]}
                  index={6}
                  onOpen={openStory}
                  className="aspect-[4/5]"
                  buttonSize="w-10 h-10"
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
                {!getYoutubeId(selectedStory.videoUrl) ? (
                  <div className="flex h-full items-center justify-center bg-white px-6 text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      Only YouTube links are supported.
                    </p>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
