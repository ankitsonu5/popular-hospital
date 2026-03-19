'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Calendar } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/events`, { headers: getHeaders() });
      if (res.ok) {
        setEvents(await res.json());
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
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await fetch(`${API_URL}/api/cms/events/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredEvents = events.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
             <Calendar className="w-6 h-6 text-orange-500" />
             <span>Events Gallery</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">{events.length} events documented.</p>
        </div>
        <Link
          href="/admin-dashboard/media-blog/events/action"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Event
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] outline-none transition-all"
        />
      </div>

      {isLoading && events.length === 0 ? (
        <div className="flex justify-center py-20 text-[#0d9488]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredEvents.map((item) => (
              <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-slate-50 border border-orange-100 overflow-hidden shrink-0">
                    {item.thumbnail ? (
                       <img src={getImageUrl(item.thumbnail)} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <Calendar className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-3">
                       <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${item.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                          {item.isActive !== false ? 'Live Gallery' : 'Draft'}
                       </span>
                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.gallery?.length || 0} Photos</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <Link href={`/admin-dashboard/media-blog/events/action?id=${item._id}`} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <button onClick={() => handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-500 rounded-xl font-bold text-xs">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 font-semibold text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Thumbnail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Photos</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredEvents.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-orange-50 overflow-hidden shrink-0 border border-orange-100">
                            {item.thumbnail ? (
                               <img src={getImageUrl(item.thumbnail)} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-orange-200">
                                <Calendar className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm line-clamp-1 max-w-md">{item.title}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">/{item._id.substring(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <span className="text-xs font-bold text-slate-500">{item.gallery?.length || 0}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${item.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-400'}`}>
                           {item.isActive !== false ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <Link href={`/admin-dashboard/media-blog/events/action?id=${item._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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
        </>
      )}
    </div>
  );
}
