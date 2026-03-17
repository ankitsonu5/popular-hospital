'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Camera, Newspaper } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminCoveragePage() {
  const [coverageList, setCoverageList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', date: '', dateIso: '', source: '', isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Single Newspaper Clipping Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/coverage`, { headers: getHeaders() });
      if (res.ok) {
        setCoverageList(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [getHeaders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const parseDateToIso = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      date: item.date || '',
      dateIso: parseDateToIso(item.date),
      source: item.source || '',
      isActive: item.isActive !== false,
    });
    
    setImagePreview(item.image ? getImageUrl(item.image) : '');
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media coverage?')) return;
    try {
      await fetch(`${API_URL}/api/cms/coverage/${id}`, { method: 'DELETE', headers: getHeaders() });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('date', formData.date);
    submitData.append('source', formData.source);
    submitData.append('isActive', String(formData.isActive));
    
    if (imageFile) {
      submitData.append('image', imageFile);
    } else if (editingId && imagePreview) {
      // Keep existing image if not changed (backend handles this if image field is present in body)
      // Actually my backend checks req.body.image if no file is present
      const imagePath = coverageList.find(i => i._id === editingId)?.image;
      if (imagePath) submitData.append('image', imagePath);
    }

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/cms/coverage/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: submitData,
        });
      } else {
        res = await fetch(`${API_URL}/api/cms/coverage`, {
          method: 'POST', headers: getHeaders(), body: submitData,
        });
      }

      if (res.headers.get('content-type')?.includes('text/html')) {
        throw new Error('Server returned HTML instead of JSON. Check if the API is running.');
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save coverage');

      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchData();
      alert(editingId ? 'Updated successfully!' : 'Published successfully!');
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: '', date: '', dateIso: '', source: '', isActive: true 
    });
    setImageFile(null);
    setImagePreview('');
  };

  const filteredItems = coverageList.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.source?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-teal-600" /> Media Coverage Gallery
          </h2>
          <p className="text-sm text-gray-500 mt-1">{coverageList.length} clippings published</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Clipping
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Newspaper Clipping</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 overflow-hidden relative border border-slate-100 shadow-sm">
                          {item.image ? (
                            <img 
                              src={getImageUrl(item.image)} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <Camera className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">{item.date}</td>
                    <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">{item.source || '-'}</td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${item.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {item.isActive !== false ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex gap-1 justify-end">
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Clipping' : 'Add Newspaper Clipping'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title (Heading) *</label>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all placeholder:text-gray-400"
                    placeholder="Enter the news headline..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Published Date *</label>
                    <input required type="date" value={formData.dateIso} 
                      onChange={(e) => {
                        const iso = e.target.value;
                        if (!iso) {
                          setFormData({ ...formData, dateIso: '', date: '' });
                          return;
                        }
                        const dateObj = new Date(iso);
                        const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                        setFormData({ ...formData, dateIso: iso, date: formatted });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">News Source *</label>
                    <input required value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Amar Ujala, Dainik Jagran" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Image Clipping *</label>
                  <div className="relative group aspect-[4/3] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-colors hover:border-teal-500/50">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Clipping" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="bg-red-500 text-white p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform"><X className="w-4 h-4" /></button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-400 font-medium">Click to upload newspaper image</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                    }} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded accent-[#0d9488] w-4 h-4" />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Display on Website</label>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-bold transition-all disabled:opacity-60 shadow-lg shadow-teal-500/10">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? 'Update Entry' : 'Publish to Gallery'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
