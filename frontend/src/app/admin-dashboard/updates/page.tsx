'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Loader2, Bell, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UpdateItem {
  _id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  iconType: string;
  isImportant: boolean;
  isActive: boolean;
  pdfUrl?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function UpdatesAdminPage() {
  const router = useRouter();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState<Partial<UpdateItem>>({
    title: '', category: '', date: '', description: '', iconType: 'bell', isImportant: false, isActive: true, pdfUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api-backend/cms/updates?all=true', { headers: getHeaders() });
      if (res.status === 401) return router.push('/admin-login');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch updates');
      setUpdates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleOpenModal = (update?: UpdateItem) => {
    if (update) {
      setCurrentUpdate(update);
      setIsEditMode(true);
    } else {
      setCurrentUpdate({ title: '', category: '', date: '', description: '', iconType: 'bell', isImportant: false, isActive: true, pdfUrl: '' });
      setIsEditMode(false);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isCustomIcon = ['bell', 'clock', 'heart', 'star', 'alert', 'news', 'event'].includes(currentUpdate.iconType || '') ? currentUpdate.iconType : 'bell';
      
      const formData = new FormData();
      formData.append('title', currentUpdate.title || '');
      formData.append('category', currentUpdate.category || '');
      formData.append('date', currentUpdate.date || '');
      formData.append('description', currentUpdate.description || '');
      formData.append('iconType', String(isCustomIcon));
      formData.append('isImportant', String(currentUpdate.isImportant));
      formData.append('isActive', String(currentUpdate.isActive));
      
      if (selectedFile) {
        formData.append('pdf', selectedFile);
      }

      const url = isEditMode 
        ? `/api-backend/cms/updates/${currentUpdate._id}`
        : '/api-backend/cms/updates';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save update');

      setIsModalOpen(false);
      fetchUpdates();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update?')) return;
    try {
      const res = await fetch(`/api-backend/cms/updates/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete');
      setUpdates(updates.filter((u) => u._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" /></div>;
  if (error) return <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium">{error}</div>;

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
             <Bell className="w-6 h-6 text-[#E85222]" />
             <span>Manage Updates</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Hospital news, notices, and public updates.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl shadow-sm transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add Announcement
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {updates.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium italic text-sm">No announcements found.</p>
          </div>
        ) : updates.map((update) => (
          <div key={update._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[8px] font-bold uppercase tracking-widest">
                    {update.category}
                  </span>
                  {update.isImportant && (
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[8px] font-bold uppercase tracking-widest animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{update.title}</h3>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">{update.date}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => handleOpenModal(update)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(update._id)} className="p-2 text-gray-400 hover:text-red-300 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${update.isActive ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{update.isActive ? 'Live' : 'Hidden'}</span>
              </div>
              {update.pdfUrl && (
                <div className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full text-[8px] font-bold uppercase tracking-widest border border-teal-100">PDF Attached</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 font-semibold text-gray-600 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date / Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title / Preview</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status / Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {updates.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-400 font-medium italic">No announcements found.</td></tr>
              ) : updates.map((update) => (
                <tr key={update._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-900">{update.date}</p>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">{update.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       {update.isImportant && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></div>}
                       <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate max-w-md">{update.title}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-md italic">{update.description.substring(0, 60)}...</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${update.isActive ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{update.isActive ? 'Active' : 'Archived'}</span>
                        </div>
                        {update.pdfUrl && <span className="text-[8px] font-bold text-teal-500 uppercase tracking-wider">PDF Document</span>}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenModal(update)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(update._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditMode ? 'Modify Update' : 'New Notice'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category (e.g. OPD, Camps)</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#0d9488] outline-none transition-all text-sm font-medium"
                    value={currentUpdate.category} 
                    onChange={e => setCurrentUpdate({...currentUpdate, category: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date (e.g. March 15, 2026)</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#0d9488] outline-none transition-all text-sm font-medium"
                    value={currentUpdate.date} 
                    onChange={e => setCurrentUpdate({...currentUpdate, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                <input
                  type="text" required
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#0d9488] outline-none transition-all text-sm font-bold"
                  value={currentUpdate.title} 
                  onChange={e => setCurrentUpdate({...currentUpdate, title: e.target.value})}
                  placeholder="e.g. Cardiology OPD Timings"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <textarea
                  required rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0d9488] outline-none transition-all text-sm font-medium resize-none"
                  value={currentUpdate.description} 
                  onChange={e => setCurrentUpdate({...currentUpdate, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">PDF (Optional)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={currentUpdate.isImportant}
                    onChange={e => setCurrentUpdate({...currentUpdate, isImportant: e.target.checked})}
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${currentUpdate.isImportant ? 'bg-red-500 border-red-500' : 'border-gray-200 bg-white'}`}>
                    {currentUpdate.isImportant && <Check className="w-4 h-4 text-white font-bold" />}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Mark Important</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={currentUpdate.isActive}
                    onChange={e => setCurrentUpdate({...currentUpdate, isActive: e.target.checked})}
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${currentUpdate.isActive ? 'bg-[#0d9488] border-[#0d9488]' : 'border-gray-200 bg-white'}`}>
                    {currentUpdate.isActive && <Check className="w-4 h-4 text-white font-bold" />}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Live On Site</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl font-bold text-sm shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2 inline" /> : null}
                  {isEditMode ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
