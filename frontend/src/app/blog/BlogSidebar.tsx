'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface NewsItem {
  id?: number;
  _id?: string;
  title: string;
  slug: string;
  date: string;
  image?: string;
}

interface CategoryMetric {
  _id: string;
  count: number;
  latestTitle: string;
}

export function BlogSearchWidget({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api-backend/blogs/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error(err);
      }
      setIsSearching(false);
    }, 400); // debounce 400ms

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100 relative ${className}`}>
      <div className="border-b border-gray-200 mb-6 flex">
        <h3 className="text-[15px] font-black text-[#1a3a5c] border-b-[3px] border-[#1a3a5c] pb-3 -mb-[2px] pr-4 uppercase tracking-widest">
          SEARCH
        </h3>
      </div>
      <div className="relative w-full">
        <div className="flex w-full">
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#f8fafc] px-4 py-3 border border-slate-200 rounded-l-xl focus:outline-none focus:border-[#E85222] text-sm transition-all"
          />
          <button className="bg-[#1a3a5c] hover:bg-[#E85222] text-white px-5 py-3 font-semibold transition-colors text-sm rounded-r-xl shadow-md">
            Search
          </button>
        </div>

        {/* Live Search Results Formatted Like Dropdown */}
        {query.trim().length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex flex-col">
            {isSearching ? (
              <div className="p-4 text-sm text-gray-500 text-center animate-pulse">Searching...</div>
            ) : results.length > 0 ? (
              results.map((r, i) => (
                <Link key={r._id || i} href={`/blog/${r.slug}`} className="flex items-start gap-3 p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors">
                  {r.image && (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 overflow-hidden relative">
                      <Image 
                        src={getImageUrl(r.image!)} 
                        alt={r.title} 
                        fill 
                        className="object-cover" 
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1a3a5c] line-clamp-2 leading-tight">{r.title}</p>
                    {r.category && <p className="text-xs text-[#E85222] font-semibold mt-1">{r.category}</p>}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500 text-center">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogSidebar({ 
  allArticles, 
  allCategories,
  metrics = [],
  showRecentPosts = false
}: { 
  allArticles: NewsItem[],
  allCategories: string[],
  metrics?: CategoryMetric[],
  showRecentPosts?: boolean
}) {
  // Recent Posts list state
  const [recentLimit, setRecentLimit] = useState(6);
  const displayedRecent = allArticles.slice(0, recentLimit);
  
  // Create an initial set of categories mixing default with actual db metrics if missing
  // But actually the user said 'jis category me kayo option honge uske aage uske andar kitne blog hai wo bhi show karega'
  // Let's rely heavily on metrics array from db if it comes, else fallback to standard list.
  
  // Merge metrics with defined categories if no metrics yet (e.g., initial or mock state)
  const mergedCategories = metrics.length > 0 
    ? metrics 
    : allCategories.map(c => ({ _id: c, count: 0, latestTitle: c }));

  // Categories list state
  const [catLimit, setCatLimit] = useState(10);
  const displayedCategories = mergedCategories.slice(0, catLimit);

  const loadMoreRecent = () => {
    if (recentLimit === 6) {
      setRecentLimit(10);
    } else {
      setRecentLimit(prev => prev + 10);
    }
  };

  const loadMoreCategories = () => {
    if (catLimit === 10 && mergedCategories.length > 10) {
      setCatLimit(20);
    } else {
      setCatLimit(prev => Math.min(prev + 10, mergedCategories.length));
    }
  };

  return (
    <aside className="w-full lg:w-[30%] space-y-10 flex-shrink-0">
      
      {/* Search Widget - Hidden on mobile, as it will be duplicated at the top of the mobile layout */}
      <BlogSearchWidget className="hidden lg:block" />

      {/* Recent Posts Widget */}
      {showRecentPosts && (
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="border-b border-gray-200 mb-6 flex">
            <h3 className="text-[15px] font-black text-[#1a3a5c] border-b-[3px] border-[#1a3a5c] pb-3 -mb-[2px] pr-4 uppercase tracking-widest">
              RECENT POSTS
            </h3>
          </div>
          <ul className="flex flex-col w-full">
            {displayedRecent.map((p, idx) => (
              <li key={p._id || p.id || idx} className="border-b border-gray-100 py-4 first:pt-0 last:border-0 last:pb-0">
                <Link href={`/blog/${p.slug}`} className="text-[#1a3a5c] text-[15px] font-medium hover:text-[#E85222] transition-colors leading-[1.6]">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories Widget */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="border-b border-gray-200 mb-6 flex">
          <h3 className="text-[15px] font-black text-[#1a3a5c] border-b-[3px] border-[#1a3a5c] pb-3 -mb-[2px] pr-4 uppercase tracking-widest">
            CATEGORIES
          </h3>
        </div>
        <ul className="flex flex-col w-full">
          {displayedCategories.map((cat, i) => (
            <li key={i} className="border-b border-gray-100 py-3 first:pt-0 last:border-0 last:pb-0">
              <Link href="#" className="flex justify-between items-center text-[15px] text-[#1a3a5c] font-medium hover:text-[#E85222] transition-colors group">
                <span>{cat._id}</span>
                {cat.count > 0 && (
                  <span className="text-xs bg-[#f8fafc] text-gray-500 px-2 py-1 rounded-full group-hover:bg-[#E85222]/10 group-hover:text-[#E85222] transition-colors">
                    {cat.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {catLimit < mergedCategories.length && (
          <button 
            onClick={loadMoreCategories}
            className="mt-6 text-[#1a3a5c] border border-[#1a3a5c] px-5 py-2 rounded-full font-bold text-xs hover:bg-[#1a3a5c] hover:text-white transition-colors uppercase tracking-wider block w-max"
          >
            {catLimit === 10 ? 'View All Category' : 'Load 10 More'}
          </button>
        )}
      </div>

      {/* Book Consultation banner (from original theme) */}
      <div className="bg-[#1a3a5c] p-8 rounded-[2rem] shadow-xl text-white text-center">
        <h3 className="text-xl font-black mb-4 font-heading uppercase tracking-wider">Want personalized health advice?</h3>
        <p className="text-gray-300 text-sm mb-6">Talk to our experts directly</p>
        <Link href="/book" className="block w-full py-4 bg-[#E85222] text-white rounded-2xl font-black hover:bg-[#d1451a] transition-all shadow-lg hover:shadow-orange-900/40 uppercase tracking-widest text-sm">
          Book Consultation
        </Link>
      </div>

    </aside>
  );
}
