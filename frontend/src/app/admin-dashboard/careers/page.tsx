'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Loader2, Briefcase, MapPin, Users, Globe } from 'lucide-react';
import Link from 'next/link';

interface Career {
  _id: string;
  title: string;
  category: string;
  department: string;
  designation: string;
  location: string;
  position: string;
  description: string;
  isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/careers`, {
        headers: getHeaders()
      });
      if (res.ok) {
        setCareers(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    fetchCareers();
    const handleFocus = () => fetchCareers();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchCareers]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career?')) return;
    try {
      const res = await fetch(`${API_URL}/api/cms/careers/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setCareers(careers.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCareers = careers.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.department?.toLowerCase().includes(search.toLowerCase()) ||
    c.designation?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && careers.length === 0) return <div className="min-h-[400px] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" /></div>;

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-[#0d9488]" />
            <span>Recruitment Center</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">{careers.length} job openings managed.</p>
        </div>
        <Link
          href="/admin-dashboard/careers/action"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl shadow-sm transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add New Role
        </Link>
      </div>

      {/* Stats & Search bar */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by role or department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#0d9488] outline-none transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{careers.filter(c => c.isActive).length} Active</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{careers.filter(c => !c.isActive).length} Drafts</span>
            </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredCareers.map((c) => (
          <div key={c._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    c.category === 'Medico' ? 'bg-red-50 text-red-600' : 
                    c.category === 'Non-Medical' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {c.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    c.isActive ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {c.isActive ? 'Live' : 'Hidden'}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{c.title}</h3>
                <p className="text-xs text-gray-500 mt-1 uppercase font-semibold text-[10px] tracking-wider">{c.department}</p>
              </div>
              <div className="flex gap-1">
                <Link href={`/admin-dashboard/careers/action?id=${c._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button onClick={() => handleDelete(c._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{c.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{c.position || 0} Openings</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dept / Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCareers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900 text-sm">{c.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{c.designation}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-gray-600">{c.department}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            c.category === 'Medico' ? 'text-red-500' : 
                            c.category === 'Non-Medical' ? 'text-blue-500' : 'text-orange-500'
                        }`}>{c.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{c.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${
                      c.isActive ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {c.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Link href={`/admin-dashboard/careers/action?id=${c._id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(c._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCareers.length === 0 && (
            <div className="py-20 text-center text-gray-400 font-medium">No roles found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
