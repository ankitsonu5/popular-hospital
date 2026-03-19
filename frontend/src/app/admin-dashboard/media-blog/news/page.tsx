'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Newspaper, Sparkles, User, Calendar, ExternalLink } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';

const API_URL = '/api-backend';

function NewsList() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/news`, { headers: getHeaders() });
      if (res.ok) {
        setNewsList(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [getHeaders]);

  useEffect(() => {
    fetchData();
    const handleFocus = () => fetchData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      await fetch(`${API_URL}/cms/news/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredNews = newsList.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1366px] mx-auto pb-20 font-sans tracking-tight">
      {/* ─── Modern Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest mb-2 w-fit border border-blue-100 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            <Sparkles className="w-4 h-4" />
            <span>Media Desk</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">News Articles</h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Public hospital news and media archives management.</p>
        </div>

        <Link
          href="/admin-dashboard/media-blog/news/action"
          target="_blank"
          className="group inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Post New Article</span>
        </Link>
      </div>

      {/* ─── Search Bar ─── */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by article headline, author or source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* ─── Modern Table ─── */}
      {isLoading && newsList.length === 0 ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
           <Loader2 className="w-12 h-12 animate-spin text-blue-200" />
           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center italic">Digitizing Press Clippings...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 font-extrabold text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">News Profile</th>
                  <th className="px-8 py-6">Source/Author</th>
                  <th className="px-8 py-6">Publish Date</th>
                  <th className="px-8 py-6 text-center">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredNews.map((item) => (
                  <tr key={item._id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 shadow-sm relative group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                          {item.image ? (
                             <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700" title={item.title} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200 bg-slate-50">
                              <Newspaper className="w-5 h-5 opacity-40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 opacity-60">
                             <span className="text-[10px] font-bold tracking-widest uppercase">/{item.slug}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                       <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-gray-300" />
                          <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">{item.author || 'Hospital Archives'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-7">
                       <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-300" />
                          <span className="text-gray-500 font-medium whitespace-nowrap">{item.date || '-'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-7 text-center whitespace-nowrap">
                       <div className={`px-4 py-1.5 rounded-2xl inline-flex items-center justify-center border font-extrabold text-[10px] uppercase tracking-widest transition-all ${
                         item.isActive !== false 
                         ? 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-100 shadow-sm' 
                         : 'bg-slate-50 text-slate-400 border-slate-100'
                       }`}>
                          {item.isActive !== false ? 'Published' : 'Under Review'}
                       </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <div className="flex items-center justify-end gap-1 transition-all pr-2">
                        <Link 
                           href={`/admin-dashboard/media-blog/news/action?id=${item._id}`} 
                           target="_blank" 
                           className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                           title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                           onClick={() => handleDelete(item._id)} 
                           className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                           title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredNews.length === 0 && (
              <div className="py-24 flex flex-col items-center justify-center px-10">
                 <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-[2rem] mb-6 scale-90 opacity-40">
                    <Newspaper className="w-10 h-10 text-gray-300" />
                 </div>
                 <h3 className="font-extrabold text-gray-400 text-lg uppercase tracking-tight">No Articles Found</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminNewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-400"><Loader2 className="w-12 h-12 animate-spin" /></div>}>
      <NewsList />
    </Suspense>
  );
}
