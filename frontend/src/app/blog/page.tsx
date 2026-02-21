import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Blog & Health Updates | Popular Hospital',
  description: 'Stay updated with the latest medical advancements, health tips, and hospital news from Popular Hospital Varanasi.',
};

// Mock data structure - easily replaceable with backend API later
const blogPosts = [
  {
    id: 1,
    title: "Best ENT Hospital in Uttar Pradesh: Advanced Care for Ear, Nose & Throat",
    slug: "best-ent-hospital-uttar-pradesh",
    excerpt: "Popular Hospital provides comprehensive ENT services including advanced surgery and clinical care for all age groups with state-of-the-art diagnostic facilities.",
    image: "/images/latestnews/one.jpg",
    date: "May 15, 2025",
    category: "ENT Care",
    author: "Dr. A.K. Kaushik"
  },
  {
    id: 2,
    title: "Pediatric Emergency Hospital: 24/7 Specialized Care For Your Little Ones",
    slug: "pediatric-emergency-hospital-24-7",
    excerpt: "Our dedicated pediatric emergency wing is equipped with child-specialist doctors and advanced life support specifically designed for children's unique medical needs.",
    image: "/images/latestnews/two.jpg",
    date: "May 12, 2025",
    category: "Pediatrics",
    author: "Pediatric Dept"
  },
  {
    id: 3,
    title: "Revolutionizing Orthopedic Care: Robotic-Assisted Surgery in Varanasi",
    slug: "orthopedic-care-robotic-surgery",
    excerpt: "Experience the next level of precision in joint replacements and bone surgeries with our newly launched robotic-assisted orthopedic department.",
    image: "/images/latestnews/three.jpg",
    date: "May 10, 2025",
    category: "Orthopedics",
    author: "Ortho Specialists"
  },
  {
    id: 4,
    title: "Laparoscopic Surgery: Fewer Scars, Faster Recovery Options",
    slug: "laparoscopic-surgery-recovery",
    excerpt: "Learn how minimally invasive laparoscopic surgery is helping patients get back to their normal lives faster with less pain and smaller incisions.",
    image: "/images/latestnews/one.jpg",
    date: "May 08, 2025",
    category: "Surgery",
    author: "General Surgery Team"
  }
];

const categories = [
  "Cardiology", "Neurology", "Orthopedics", "Gastroenterology", "ENT Care", "Pediatrics", "Emergency Care"
];

const recentPosts = [
  { title: "Managing Hypertension Naturally", date: "May 20, 2025" },
  { title: "The Future of Cardiology", date: "May 18, 2025" },
  { title: "Understanding Dialysis", date: "May 15, 2025" }
];

export default function BlogListingPage() {
  return (
    <div className="bg-[#f0f7ff] min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-[1366px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a3a5c] mb-6 font-heading tracking-tight leading-tight">
            Popular Hospital <span className="text-[#E85222]">Health Blog</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-4xl">
            Insightful articles, health maintenance tips, and latest medical breakthroughs delivered by our expert medical team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row group border border-slate-100"
              >
                {/* Image Container */}
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a3a5c]/40 to-transparent z-10 opacity-60"></div>
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-[#E85222] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#E85222]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#E85222]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a3a5c] mb-6 leading-tight group-hover:text-[#E85222] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#E85222] font-black uppercase tracking-widest text-sm group/btn"
                  >
                    Read Full Story
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}

            {/* Pagination Component */}
            <div className="flex items-center justify-center gap-3 pt-10">
              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#1a3a5c] hover:bg-[#E85222] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
              </button>
              {[1, 2, 3, 4].map((num) => (
                <button 
                  key={num}
                  className={`w-12 h-12 rounded-2xl font-black transition-all ${num === 1 ? 'bg-[#1a3a5c] text-white shadow-lg' : 'bg-white text-[#1a3a5c] border border-slate-200 hover:border-[#1a3a5c]'}`}
                >
                  {num}
                </button>
              ))}
              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#1a3a5c] hover:bg-[#E85222] hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Search Box */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-[#1a3a5c] mb-6 font-heading uppercase tracking-wider">Search Blog</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full bg-[#f8fafc] border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-[#E85222] focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                />
                <button className="absolute right-3 top-3 bg-[#1a3a5c] text-white p-2.5 rounded-xl hover:bg-[#E85222] transition-colors shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-[#1a3a5c] mb-8 font-heading uppercase tracking-wider">Top Categories</h3>
              <div className="space-y-3">
                {categories.map((cat, i) => (
                  <Link 
                    key={i} 
                    href={`/blog/category/${cat.toLowerCase()}`}
                    className="flex justify-between items-center p-4 rounded-xl hover:bg-[#E85222]/5 text-slate-700 font-bold transition-all group border border-transparent hover:border-[#E85222]/20"
                  >
                    <span>{cat}</span>
                    <span className="bg-slate-100 text-slate-400 group-hover:bg-[#E85222] group-hover:text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-[#1a3a5c] p-8 rounded-[2rem] shadow-xl text-white">
              <h3 className="text-xl font-black mb-8 font-heading uppercase tracking-wider">Recent Consultations</h3>
              <div className="space-y-10">
                {recentPosts.map((rPost, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-[#E85222] rounded-full"></span>
                       {rPost.date}
                    </p>
                    <h4 className="text-lg font-bold group-hover:text-[#E85222] transition-colors leading-tight">
                      {rPost.title}
                    </h4>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                 <p className="text-gray-400 text-sm mb-6">Want personalized health advice?</p>
                 <Link href="/book" className="block w-full py-4 bg-[#E85222] text-white rounded-2xl font-black hover:bg-[#d1451a] transition-all shadow-lg hover:shadow-orange-900/40 uppercase tracking-widest text-sm">
                   Book Consultation
                 </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
