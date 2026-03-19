'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Loader2, Save, X, ArrowLeft, Camera, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

function EventsActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', date: '', dateIso: '', description: '', isActive: true,
  });
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (editId) {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`${API_URL}/api/cms/events`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
              ...item,
              dateIso: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
            });
            if (item.thumbnail) setThumbnailPreview(getImageUrl(item.thumbnail));
            setExistingGallery(item.gallery || []);
          }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
      };
      fetchEvent();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    submitData.append('date', formData.date);
    submitData.append('description', formData.description);
    submitData.append('isActive', String(formData.isActive));
    
    if (thumbnailFile) {
        submitData.append('thumbnail', thumbnailFile);
    } else if (editId && thumbnailPreview) {
        const path = thumbnailPreview.split(`${API_URL}`).pop();
        if (path) submitData.append('thumbnail', path);
    }

    existingGallery.forEach(img => submitData.append('existingGallery', img));
    galleryFiles.forEach(file => submitData.append('gallery', file));

    try {
      const url = editId ? `${API_URL}/api/cms/events/${editId}` : `${API_URL}/api/cms/events`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: submitData,
      });

      if (!res.ok) throw new Error('Failed to save event');
      alert(editId ? 'Event updated!' : 'Event created!');
      if (window.opener || window.history.length === 1) window.close();
      router.push('/admin-dashboard/media-blog/events');
    } catch (err: any) { alert(err.message); }
    finally { setIsSaving(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans">
      {/* ─── Header Section ─── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? 'Edit Event' : 'New Event'}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">Capture & Share Every Moment</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button type="button" onClick={() => window.close()} className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editId ? 'Save Changes' : 'Publish Event'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Form Content ─── */}
      <div className="max-w-[1366px] mx-auto mt-8 px-4 sm:px-8 lg:px-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Details Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
                  <input required value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900" 
                    placeholder="Enter event name..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
                    <input required type="date" value={formData.dateIso} 
                      onChange={(e) => {
                          const iso = e.target.value;
                          if (!iso) return;
                          setFormData({ ...formData, dateIso: iso, date: new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setFormData({...formData, isActive: !formData.isActive})} className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all border ${
                        formData.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {formData.isActive ? 'ONLINE / LIVE' : 'HIDDEN / DRAFT'}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                  <textarea rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 resize-none font-medium" placeholder="Provide a brief overview of the event..."></textarea>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Media Gallery</h2>
                </div>
                <span className="text-xs font-bold text-gray-400 font-medium">Total: {existingGallery.length + galleryFiles.length} Photos</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {/* Existing Photos */}
                  {existingGallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 shadow-sm transition-transform hover:scale-[1.02]">
                         <img src={getImageUrl(img)} alt="Gallery" className="w-full h-full object-cover" />
                         <button type="button" onClick={() => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))}
                           className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"><Trash2 className="w-3.5 h-3.5" /></button>
                         <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-gray-900/60 text-white text-[8px] font-bold uppercase rounded-md">Existing</div>
                      </div>
                  ))}
                  {/* New Photos Previews */}
                  {galleryPreviews.map((pre, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-blue-200 shadow-sm transition-transform hover:scale-[1.02]">
                         <img src={pre} alt="New Preview" className="w-full h-full object-cover" />
                         <button type="button" onClick={() => {
                            setGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                            setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                         }} className="absolute top-2 right-2 p-1.5 bg-gray-900/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"><X className="w-3.5 h-3.5" /></button>
                         <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-bold uppercase rounded-md">New Upload</div>
                      </div>
                  ))}
                  {/* Upload Trigger */}
                  <label className="relative aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 flex items-center justify-center cursor-pointer transition-all hover:bg-blue-50/30 group">
                      <div className="text-center group-hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mx-auto mb-1" />
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 uppercase">Add Photo</span>
                      </div>
                      <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => {
                           const files = Array.from(e.target.files || []);
                           setGalleryFiles(prev => [...prev, ...files]);
                           setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
                        }} />
                  </label>
              </div>
            </div>
          </div>

          {/* Sidebar / Secondary Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Cover Image</h2>
              <div className="relative aspect-[4/3] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group">
                  {thumbnailPreview ? (
                      <>
                         <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-lg">Change Cover</label>
                         </div>
                      </>
                  ) : (
                      <div className="text-center">
                         <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                         <p className="text-[10px] font-bold text-gray-400 uppercase">Click to upload cover</p>
                      </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setThumbnailFile(f); setThumbnailPreview(URL.createObjectURL(f)); }
                  }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <p className="text-[10px] text-gray-400 mt-4 leading-relaxed font-medium">This image will be used as the primary thumbnail across the website.</p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

export default function EventsActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>}>
      <EventsActionForm />
    </Suspense>
  );
}
