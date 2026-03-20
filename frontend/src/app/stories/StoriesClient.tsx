"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Mock Data for Patient Stories
const stories = [
  {
    id: 1,
    title: "Success Story: Cancer Care Journey",
    name: "Patient Story 1",
    thumbnail: "https://images.unsplash.com/photo-1544257662-8e100808cf51?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-one.mp4",
  },
  {
    id: 2,
    title: "A New Life: Recovery from Critical Condition",
    name: "Patient Story 2",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-two.mp4",
  },
  {
    id: 3,
    title: "Advanced Medical Care Experience",
    name: "Patient Story 3",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_one.mp4",
  },
  {
    id: 4,
    title: "Excellence in Specialised Treatment",
    name: "Patient Story 4",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_two.mp4",
  },
  {
    id: 5,
    title: "Compassionate Care & Fast Recovery",
    name: "Patient Story 5",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_three.mp4",
  },
  {
    id: 6,
    title: "Advanced Technology for Better Health",
    name: "Patient Story 6",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_four.mp4",
  },
  {
    id: 7,
    title: "Transforming Lives Through Surgery",
    name: "Patient Story 7",
    thumbnail: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_five.mp4",
  },
  // New YouTube Stories
  { id: 8, name: "Patient Story 8", videoUrl: "https://youtu.be/u1bEdChi85k" },
  { id: 9, name: "Patient Story 9", videoUrl: "https://youtu.be/XKOLgUQhQAc" },
  { id: 10, name: "Patient Story 10", videoUrl: "https://youtu.be/P3o0GstAjOw" },
  { id: 11, name: "Patient Story 11", videoUrl: "https://youtu.be/ns5Y_MiCk1g" },
  { id: 12, name: "Patient Story 12", videoUrl: "https://youtu.be/CKELqiNRXlU" },
  { id: 13, name: "Patient Story 13", videoUrl: "https://youtu.be/hQG0tT0oPwE" },
  { id: 14, name: "Patient Story 14", videoUrl: "https://youtu.be/OQ--tSdAr44" },
  { id: 15, name: "Patient Story 15", videoUrl: "https://youtu.be/_USYaLNBr0I" },
  { id: 16, name: "Patient Story 16", videoUrl: "https://youtu.be/lWoTlBf-iWY" },
  { id: 17, name: "Patient Story 17", videoUrl: "https://youtu.be/cA9QMYwRYvQ" },
  { id: 18, name: "Patient Story 18", videoUrl: "https://youtu.be/lRSfBVFRRyU" },
  { id: 19, name: "Patient Story 19", videoUrl: "https://youtu.be/JawHPyAW50U" },
  { id: 20, name: "Patient Story 20", videoUrl: "https://youtu.be/eaaW5JgGkFM" },
  { id: 21, name: "Patient Story 21", videoUrl: "https://youtu.be/_XYudCsc5zk" },
  { id: 22, name: "Patient Story 22", videoUrl: "https://youtu.be/enhaFLhURq0" },
  { id: 23, name: "Patient Story 23", videoUrl: "https://youtu.be/kM_fHur_wWM" },
  { id: 24, name: "Patient Story 24", videoUrl: "https://youtu.be/5Q9q9Azr6dA" },
  { id: 25, name: "Patient Story 25", videoUrl: "https://youtu.be/LiA2mdckn6U" },
  { id: 26, name: "Patient Story 26", videoUrl: "https://youtu.be/-Yjto4oDNI0" },
  { id: 27, name: "Patient Story 27", videoUrl: "https://youtu.be/rPYoLVXxvZM" },
  { id: 28, name: "Patient Story 28", videoUrl: "https://youtu.be/dHcZfxm6ZEI" },
  { id: 29, name: "Patient Story 29", videoUrl: "https://youtu.be/ykJorcbx6yA" },
  { id: 30, name: "Patient Story 30", videoUrl: "https://youtu.be/xunfVSSJhXE" },
  { id: 31, name: "Patient Story 31", videoUrl: "https://youtu.be/ICIDc8_pZFU" },
  { id: 32, name: "Patient Story 32", videoUrl: "https://youtu.be/ttXWMDHxdXQ" },
];

export default function StoriesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-[#0b1c43] text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Patient Stories</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear directly from our patients about their experiences and successful recovery journeys at Popular Hospital.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story) => {
            const ytId = getYoutubeId(story.videoUrl);
            const thumbUrl = ytId 
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : (story.thumbnail || "/images/news-sm-inner.jpg");

            return (
              <button
                key={story.id}
                onClick={() => setSelectedVideo(story.videoUrl)}
                className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-left flex flex-col h-full"
              >
                <div className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden">
                  {ytId ? (
                    <Image
                      src={thumbUrl}
                      alt={story.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={story.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      muted
                      preload="metadata"
                      playsInline
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center transform group-hover:scale-110 transition-all shadow-xl">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#0b1c43]">
                        <svg className="w-6 h-6 text-white transition-colors group-hover:text-[#0b1c43] ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-50 bg-white">
                  <p className="text-[#0b1c43] text-sm font-bold tracking-tight">
                    {story.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-red-500 text-white flex items-center justify-center transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative aspect-video w-full">
              {getYoutubeId(selectedVideo) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo)}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo}
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

