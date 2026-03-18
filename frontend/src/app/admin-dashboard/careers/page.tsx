'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

interface CareerItem {
  _id: string;
  category: 'Medico' | 'Non-Medical' | 'Admin';
  department: string;
  designation: string;
  location: string;
  position: string;
  postedOn: string;
  lastDate: string;
  description: string;
  isActive: boolean;
}

export default function AdminCareersPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCareers = useCallback(async () => {
    const getHeaders = () => ({
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      'Content-Type': 'application/json',
    });

    setLoading(true);
    try {
      const res = await fetch('/api-backend/cms/careers', { headers: getHeaders() });
      if (res.status === 401) return router.push('/admin-login');
      const data = await res.json();
      if (res.ok) setCareers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCareers();
    
    // Listen for tab focus/return to refresh data
    const handleFocus = () => fetchCareers();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchCareers]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening?')) return;
    const getHeaders = () => ({
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      'Content-Type': 'application/json',
    });

    try {
      const res = await fetch(`/api-backend/cms/careers/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete');
      setCareers(careers.filter(c => c._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredCareers = careers.filter(c => 
    c.designation.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && careers.length === 0) return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#E85222]" /> Recruitment Center
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage job openings and career opportunities across all departments.</p>
        </div>
        <Link
          href="/admin-dashboard/careers/action"
          target="_blank"
          className="flex items-center gap-2 px-6 py-3 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-2xl shadow-lg transition-all font-bold whitespace-nowrap active:scale-95"
        >
          <Plus className="w-5 h-5 font-black" /> Add New Role
        </Link>
      </div>

      {/* Stats & Search bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by role or department..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-white bg-white/50 backdrop-blur-sm shadow-sm focus:bg-white focus:border-[#0d9488] outline-none transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-gray-700">{careers.filter(c => c.isActive).length} Active</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-300" />
                <span className="text-xs font-bold text-gray-700">{careers.filter(c => !c.isActive).length} Drafts</span>
            </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Department / Role</th>
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest text-center">Positions</th>
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Posted / Deadline</th>
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCareers.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center">
                      <Briefcase className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold italic">No career openings found Matching your search.</p>
                   </td>
                </tr>
              ) : filteredCareers.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#0d9488] uppercase tracking-wider mb-1 opacity-70">{job.department}</span>
                      <span className="text-base font-black text-[#1a3a5c] group-hover:text-[#E85222] transition-colors">{job.designation}</span>
                      <span className="text-[10px] text-gray-400 mt-1 font-bold italic">{job.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                       job.category === 'Medico' ? 'bg-blue-50 text-blue-600' :
                       job.category === 'Admin' ? 'bg-orange-50 text-orange-600' :
                       'bg-teal-50 text-teal-600'
                     }`}>
                       {job.category}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <span className="inline-flex w-8 h-8 rounded-full bg-slate-100 items-center justify-center text-xs font-black text-slate-700">{job.position}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <p className="text-xs font-bold text-gray-500">P: {job.postedOn}</p>
                    <p className={`text-xs font-black mt-1 ${job.lastDate === '-' ? 'text-gray-300 italic' : 'text-[#E85222]'}`}>D: {job.lastDate === '-' ? 'Ongoing' : job.lastDate}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter border ${
                      job.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {job.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2 whitespace-nowrap">
                    <Link 
                      href={`/admin-dashboard/careers/action?id=${job._id}`} 
                      target="_blank"
                      className="inline-flex p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(job._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
