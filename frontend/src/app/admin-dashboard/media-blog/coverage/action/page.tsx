'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Newspaper, Loader2, Save, X, ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

function PressActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', date: '', dateIso: '', source: '', isActive: true,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (editId) {
      const fetchPress = async () => {
        try {
          const res = await fetch(`${API_URL}/api/cms/coverage`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
              ...item,
              dateIso: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
            });
            if (item.image) setImagePreview(getImageUrl(item.image));
          }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
      };
      fetchPress();
    }
  }, [editId]);

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
    } else if (editId && imagePreview) {
        const path = imagePreview.split(`${API_URL}`).pop();
        if (path) submitData.append('image', path);
    }

    try {
      const url = editId ? `${API_URL}/api/cms/coverage/${editId}` : `${API_URL}/api/cms/coverage`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: submitData,
      });

      if (!res.ok) throw new Error('Failed to save press release');
      alert(editId ? 'Press clipping updated!' : 'Press clipping published!');
      if (window.opener || window.history.length === 1) window.close();
      router.push('/admin-dashboard/media-blog/coverage');
    } catch (err: any) { alert(err.message); }
    finally { setIsSaving(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
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
             <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Newspaper className="w-6 h-6 text-teal-600" />
             </div>
             <div>
                <h1 className="text-xl font-black text-[#1a3a5c] uppercase tracking-widest">
                  {editId ? 'Refine Press Publication' : 'New Press Archival'}
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Public Relations Hub • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button type="button" onClick={() => window.close()} className="px-6 py-3 text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-3 px-10 py-3.5 bg-teal-600 hover:bg-[#E85222] text-white rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editId ? 'Update & Save' : 'Publish Archival'}
            </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 px-6">
         <form className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Publication Heading *</label>
                      <input required value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-black text-lg" 
                        placeholder="e.g. Popular Hospital Awarded Best Cardiology..." />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Date *</label>
                          <input required type="date" value={formData.dateIso} 
                            onChange={(e) => {
                                const iso = e.target.value;
                                if (!iso) return;
                                setFormData({ ...formData, dateIso: iso, date: new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                            }}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-teal-500 outline-none font-bold text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Media Source *</label>
                          <input required value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-teal-500 outline-none font-bold text-sm" placeholder="e.g. Amar Ujala" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-[#1a3a5c] uppercase tracking-widest">Gallery Visibility</span>
                           <span className="text-[8px] text-gray-400 font-bold italic uppercase mt-1">Status: {formData.isActive ? 'VISIBLE' : 'HIDDEN'}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
                            <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:bg-teal-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2 mb-3">Press Clipping Photo *</label>
                    <div className="relative aspect-[3/4] rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center overflow-hidden transition-all hover:bg-slate-100/50 group shadow-inner">
                        {imagePreview ? (
                            <>
                               <img src={imagePreview} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                  <label className="cursor-pointer bg-white text-teal-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl">Replace Clipping</label>
                               </div>
                            </>
                        ) : (
                            <div className="text-center">
                               <Camera className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Scan or Photo of Publication</p>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                </div>
            </div>
         </form>
      </div>
    </div>
  );
}

export default function PressActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-teal-600" /></div>}>
      <PressActionForm />
    </Suspense>
  );
}
