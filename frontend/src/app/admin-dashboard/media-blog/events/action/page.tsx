'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
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
    e.preventDefault();
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
      <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Calendar className="w-6 h-6 text-indigo-600" />
             </div>
             <div>
                <h1 className="text-xl font-black text-[#1a3a5c] uppercase tracking-widest">
                  {editId ? 'Modify Event Gallery' : 'Curate New Event'}
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Visual Historian • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button type="button" onClick={() => window.close()} className="px-6 py-3 text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-3 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editId ? 'Save & Sync' : 'Publish Gallery'}
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-6">
         <form className="space-y-10 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Event Title *</label>
                      <input required value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-black text-lg" 
                        placeholder="e.g. CSR Health Camp Varanasi..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Event Date *</label>
                          <input required type="date" value={formData.dateIso} 
                            onChange={(e) => {
                                const iso = e.target.value;
                                if (!iso) return;
                                setFormData({ ...formData, dateIso: iso, date: new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                            }}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-black text-sm" />
                        </div>
                        <div>
                           <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Public Status</label>
                           <button type="button" onClick={() => setFormData({...formData, isActive: !formData.isActive})} className={`w-full py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all border-2 ${
                              formData.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                           }`}>
                              {formData.isActive ? 'LIVE ON SITE' : 'HIDDEN / DRAFT'}
                           </button>
                        </div>
                    </div>
                    <div>
                       <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Description (Optional)</label>
                       <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-sm resize-none" placeholder="Write a short summary of the event..."></textarea>
                    </div>
                </div>

                <div className="space-y-6">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Master Thumbnail (Cover) *</label>
                    <div className="relative aspect-video rounded-[2.5rem] bg-indigo-50/30 border-2 border-dashed border-indigo-200 flex items-center justify-center overflow-hidden transition-all hover:bg-indigo-50/50 group">
                        {thumbnailPreview ? (
                            <>
                               <img src={thumbnailPreview} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                  <label className="cursor-pointer bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest">Swap Cover</label>
                               </div>
                            </>
                        ) : (
                            <div className="text-center">
                               <Camera className="w-12 h-12 text-indigo-200 mx-auto mb-3" />
                               <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Main Landing Image</p>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) { setThumbnailFile(f); setThumbnailPreview(URL.createObjectURL(f)); }
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6 pt-10 border-t border-slate-50">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <ImageIcon className="w-6 h-6 text-indigo-400" />
                      <h4 className="font-black text-gray-900 uppercase tracking-[0.2em] text-sm">Media Gallery (Multiple Photos)</h4>
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selection Count: {existingGallery.length + galleryFiles.length} photos</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {/* Existing Photos */}
                    {existingGallery.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-[1.5rem] overflow-hidden group border-4 border-white shadow-lg">
                           <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                           <button type="button" onClick={() => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))}
                             className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"><Trash2 className="w-4 h-4" /></button>
                           <div className="absolute bottom-2 left-2 px-3 py-1 bg-[#1a3a5c] text-white text-[8px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all">Archived</div>
                        </div>
                    ))}
                    {/* New Photos Previews */}
                    {galleryPreviews.map((pre, i) => (
                        <div key={i} className="relative aspect-square rounded-[1.5rem] overflow-hidden group border-4 border-indigo-100 shadow-lg">
                           <img src={pre} className="w-full h-full object-cover" />
                           <button type="button" onClick={() => {
                              setGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                              setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i));
                           }} className="absolute top-2 right-2 p-2 bg-slate-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"><X className="w-4 h-4" /></button>
                           <div className="absolute bottom-2 left-2 px-3 py-1 bg-green-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">New Selection</div>
                        </div>
                    ))}
                    {/* Upload Trigger */}
                    <label className="relative aspect-square rounded-[1.5rem] border-4 border-dashed border-slate-100 hover:border-indigo-400 bg-slate-50 flex items-center justify-center cursor-pointer transition-all group overflow-hidden">
                        <div className="text-center group-hover:scale-110 transition-all">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                              <Plus className="w-6 h-6 text-indigo-400 font-black" />
                           </div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add Photos</span>
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
         </form>
      </div>
    </div>
  );
}

export default function EventsActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>}>
      <EventsActionForm />
    </Suspense>
  );
}
