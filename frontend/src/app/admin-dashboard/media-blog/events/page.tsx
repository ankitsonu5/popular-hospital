'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Camera, Calendar, Link as LinkIcon } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminEventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', date: '', dateIso: '', description: '', isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Thumbnail
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  
  // Gallery
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  
  const getHeaders = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  }), []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/events`, { headers: getHeaders() });
      if (res.ok) {
        setItems(await res.json());
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

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      date: item.date || '',
      dateIso: parseDateToIso(item.date),
      description: item.description || '',
      isActive: item.isActive !== false,
    });
    
    setThumbnailPreview(item.thumbnail ? getImageUrl(item.thumbnail) : '');
    setThumbnailFile(null);
    setExistingGallery(item.gallery || []);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await fetch(`${API_URL}/api/cms/events/${id}`, { method: 'DELETE', headers: getHeaders() });
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
    submitData.append('slug', formData.slug || generateSlug(formData.title));
    submitData.append('date', formData.date);
    submitData.append('description', formData.description);
    submitData.append('isActive', String(formData.isActive));
    
    if (thumbnailFile) {
      submitData.append('thumbnail', thumbnailFile);
    } else {
      submitData.append('thumbnail', formData.title); // Placeholder if not changed
      const current = items.find(i => i._id === editingId);
      if (current?.thumbnail) submitData.append('thumbnail', current.thumbnail);
    }

    existingGallery.forEach(img => submitData.append('existingGallery', img));
    galleryFiles.forEach(file => submitData.append('gallery', file));

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/cms/events/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: submitData,
        });
      } else {
        res = await fetch(`${API_URL}/api/cms/events`, {
          method: 'POST', headers: getHeaders(), body: submitData,
        });
      }

      if (res.headers.get('content-type')?.includes('text/html')) {
        throw new Error('Server error. Check if backend is running.');
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save event');

      setShowForm(false);
      resetForm();
      fetchData();
      alert('Event saved successfully!');
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', date: '', dateIso: '', description: '', isActive: true });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setEditingId(null);
  };

  const filteredItems = items.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Events Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">{items.length} events found</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-indigo-600 outline-none transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Event</th>
                <th className="text-left p-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Date</th>
                <th className="text-left p-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Photos</th>
                <th className="text-right p-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border">
                        {item.thumbnail ? <img src={getImageUrl(item.thumbnail)} className="w-full h-full object-cover" /> : <Camera className="w-5 h-5 mx-auto mt-3.5 text-gray-400" />}
                      </div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{item.date}</td>
                  <td className="p-4 text-gray-600">{(item.gallery?.length || 0)} photos</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-1">
                      <button onClick={() => handleEdit(item)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold mb-6">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Event Title *</label>
                    <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-600 outline-none" placeholder="e.g. Health Camp 2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Slug (URL) *</label>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        onFocus={() => { if(!formData.slug) setFormData({...formData, slug: generateSlug(formData.title)}) }}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-600 outline-none text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Event Date *</label>
                    <input required type="date" value={formData.dateIso} 
                      onChange={(e) => {
                        const iso = e.target.value;
                        const dateObj = new Date(iso);
                        const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                        setFormData({ ...formData, dateIso: iso, date: formatted });
                      }}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-600 outline-none h-24 text-sm" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Feature Thumbnail *</label>
                    <div className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden border-indigo-200">
                      {thumbnailPreview ? (
                        <img src={thumbnailPreview} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center text-gray-400">
                          <Camera className="w-8 h-8 mx-auto mb-1" />
                          <p className="text-xs">Upload thumbnail</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setThumbnailFile(f); setThumbnailPreview(URL.createObjectURL(f)); }
                      }} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Gallery (Multiple)</label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {existingGallery.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border group">
                          <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                      {galleryPreviews.map((pre, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-indigo-300">
                          <img src={pre} className="w-full h-full object-cover" />
                          <div className="absolute top-1 right-1 bg-indigo-500 text-white p-0.5 rounded text-[8px] font-bold">New</div>
                        </div>
                      ))}
                      <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <Plus className="w-6 h-6 text-gray-300" />
                        <input type="file" multiple accept="image/*" onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setGalleryFiles([...galleryFiles, ...files]);
                          setGalleryPreviews([...galleryPreviews, ...files.map(f => URL.createObjectURL(f))]);
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 border-t">
                 <button type="submit" disabled={isSaving} className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50">
                   {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                   {editingId ? 'Update Event' : 'Create Event'}
                 </button>
                 <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
