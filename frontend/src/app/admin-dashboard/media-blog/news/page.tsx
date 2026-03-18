'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Newspaper } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/news`, { headers: getHeaders() });
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
    window.addEventListener('focus', fetchData);
    return () => window.removeEventListener('focus', fetchData);
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      await fetch(`${API_URL}/api/cms/news/${id}`, { method: 'DELETE', headers: getHeaders() });
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage News Articles</h2>
          <p className="text-sm text-gray-500 mt-1">{newsList.length} articles published</p>
        </div>
        <Link
          href="/admin-dashboard/media-blog/news/action"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add News
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

      {isLoading && newsList.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 font-semibold text-gray-600 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4">Article</th>
                  <th className="py-4 px-4 hidden md:table-cell">Date</th>
                  <th className="py-4 px-4 hidden lg:table-cell">Source</th>
                  <th className="py-4 px-4 hidden sm:table-cell text-center">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredNews.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 overflow-hidden border border-slate-100">
                          {item.image ? (
                            <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <Newspaper className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400">/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 hidden md:table-cell">{item.date}</td>
                    <td className="py-4 px-4 text-gray-600 hidden lg:table-cell">{item.author || '-'}</td>
                    <td className="py-4 px-4 hidden sm:table-cell text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${item.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {item.isActive !== false ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex gap-1 justify-end">
                        <Link 
                          href={`/admin-dashboard/media-blog/news/action?id=${item._id}`} 
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
