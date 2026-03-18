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
  
  // Modal State
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#E85222]" /> Manage Updates & Announcements
          </h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove hospital news, notices, and updates.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl shadow-md transition-all font-semibold whitespace-nowrap"
        >
          <Plus className="w-5 h-5" /> Add New Update
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date / Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status / Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {updates.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-500 font-medium">No updates found. Add one above.</td></tr>
              ) : updates.map((update) => (
                <tr key={update._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                    <p className="text-sm">{update.date}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{update.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors">{update.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1 mt-1 max-w-sm">{update.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2 items-start">
                        {update.isImportant && (
                            <span className="inline-flex py-1 px-2.5 rounded-md bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider">Important</span>
                        )}
                        <span className={`inline-flex py-1 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${update.isActive ? 'bg-green-50 border border-green-100 text-green-600' : 'bg-gray-100 border border-gray-200 text-gray-500'}`}>
                           {update.isActive ? 'Active' : 'Draft'}
                        </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenModal(update)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 inline-flex"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(update._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit Update / Announcement' : 'Add New Update'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category (e.g. OPD, Camps)</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium"
                    value={currentUpdate.category} 
                    onChange={e => setCurrentUpdate({...currentUpdate, category: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date (e.g. March 15, 2026)</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium"
                    value={currentUpdate.date} 
                    onChange={e => setCurrentUpdate({...currentUpdate, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium"
                  value={currentUpdate.title} 
                  onChange={e => setCurrentUpdate({...currentUpdate, title: e.target.value})}
                  placeholder="e.g. Cardiology OPD Timings Updated"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  required rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium resize-none"
                  value={currentUpdate.description} 
                  onChange={e => setCurrentUpdate({...currentUpdate, description: e.target.value})}
                  placeholder="Detailed description of the announcement..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Announcement PDF (Optional)</label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 group-hover:border-[#0d9488]/30 transition-all">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] hover:file:bg-[#0d9488]/20 cursor-pointer w-full"
                    />
                  </div>
                  {currentUpdate.pdfUrl && !selectedFile && (
                    <div className="text-xs text-[#0d9488] font-bold bg-white px-2 py-1 rounded border border-[#0d9488]/20">Existing File Attached</div>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 italic">Max size: 5MB. PDF format only.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={currentUpdate.isImportant}
                      onChange={e => setCurrentUpdate({...currentUpdate, isImportant: e.target.checked})}
                    />
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${currentUpdate.isImportant ? 'bg-red-500 border-red-500' : 'border-gray-300 bg-white group-hover:border-red-400'}`}>
                      {currentUpdate.isImportant && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Mark as Important</span>
                    <span className="text-xs text-gray-500">Highlights this post with red badge</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={currentUpdate.isActive}
                      onChange={e => setCurrentUpdate({...currentUpdate, isActive: e.target.checked})}
                    />
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${currentUpdate.isActive ? 'bg-[#0b1c43] border-[#0b1c43]' : 'border-gray-300 bg-white group-hover:border-[#0b1c43]/50'}`}>
                      {currentUpdate.isActive && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Published (Active)</span>
                    <span className="text-xs text-gray-500">Visible on the website to public</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isEditMode ? 'Update Record' : 'Save Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
