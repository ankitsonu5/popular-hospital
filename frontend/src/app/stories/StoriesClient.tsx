"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock Data for Patient Stories
const stories = [
  {
    id: 1,
    title: "Success Story: Cancer Care Journey",
    name: "Mr Fazil Hosany",
    thumbnail: "https://images.unsplash.com/photo-1544257662-8e100808cf51?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-one.mp4",
    category: "Cancer Care",
  },
  {
    id: 2,
    title: "A New Life: Recovery from Critical Condition",
    name: "Baby Bhavika",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/testimonial-two.mp4",
    category: "Pediatrics",
  },
  {
    id: 3,
    title: "Advanced Medical Care Experience",
    name: "Patient Story 1",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_one.mp4",
    category: "General Medicine",
  },
  {
    id: 4,
    title: "Excellence in Specialised Treatment",
    name: "Patient Story 2",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_two.mp4",
    category: "Specialized Care",
  },
  {
    id: 5,
    title: "Compassionate Care & Fast Recovery",
    name: "Patient Story 3",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_three.mp4",
    category: "Patient Care",
  },
  {
    id: 6,
    title: "Advanced Technology for Better Health",
    name: "Patient Story 4",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_four.mp4",
    category: "Health Tech",
  },
  {
    id: 7,
    title: "Transforming Lives Through Surgery",
    name: "Patient Story 5",
    thumbnail: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=800&auto=format&fit=crop",
    videoUrl: "/videos/popular_hospital_happy_pateint_five.mp4",
    category: "Surgery",
  }
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
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedVideo(story.videoUrl)}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-left flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden">
                <video
                  src={story.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  preload="metadata"
                  playsInline
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                    <span className="bg-[#0b1c43]/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        {story.category}
                    </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading leading-tight group-hover:text-[#E85222] transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mt-auto">
                  {story.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative aspect-video w-full">
              <video
                src={selectedVideo}
                className="absolute inset-0 w-full h-full"
                controls
                autoPlay
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
