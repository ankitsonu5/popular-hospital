'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Newspaper, Loader2, Save, X, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

function NewsActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '',
    image: '', date: '', dateIso: '', author: '', isActive: true,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (editId) {
      const fetchNews = async () => {
        try {
          const res = await fetch(`${API_URL}/api/cms/news`, {
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
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    submitData.append('content', formData.content);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('date', formData.date);
    submitData.append('author', formData.author);
    submitData.append('isActive', String(formData.isActive));
    
    if (imageFile) {
      submitData.append('image', imageFile);
    } else if (editId && formData.image) {
      submitData.append('existingImage', formData.image);
    }

    try {
      const url = editId ? `${API_URL}/api/cms/news/${editId}` : `${API_URL}/api/cms/news`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: submitData,
      });

      if (!res.ok) throw new Error('Failed to save news article');

      alert(editId ? 'Article updated successfully!' : 'Article published successfully!');
      
      if (window.opener || window.history.length === 1) {
        window.close();
      }
      router.push('/admin-dashboard/media-blog/news');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 shrink-0">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
             </div>
             <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-black text-[#1a3a5c] uppercase tracking-widest truncate">
                  {editId ? 'Edit News' : 'Draft News'}
                </h1>
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">Editor Panel • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
            <button type="button" onClick={() => window.close()} className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-2.5 sm:py-3.5 bg-[#1a3a5c] hover:bg-[#E85222] text-white rounded-xl sm:rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-[10px] sm:text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Save className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span>{editId ? 'Save' : 'Publish'}</span>
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 sm:mt-12 px-4 sm:px-6">
         <form className="space-y-6 sm:space-y-8 bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Article Title *</label>
                      <input required value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                        className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm" 
                        placeholder="Enter catchy headline..." />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Publish Date *</label>
                          <input required type="date" value={formData.dateIso} 
                            onChange={(e) => {
                              const iso = e.target.value;
                              if (!iso) return;
                              const dateObj = new Date(iso);
                              const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                              setFormData({ ...formData, dateIso: iso, date: formatted });
                            }}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Source / Author</label>
                          <input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="e.g. Times of India" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-[2rem] sm:rounded-[2.5rem] border-2 border-slate-100 flex flex-col items-center justify-center relative group overflow-hidden min-h-[200px]">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                <label className="cursor-pointer bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-white font-black text-xs uppercase tracking-widest">Replace Media</label>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                           <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Featured Media *</p>
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
                    }} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Short Brief (Excerpt)</label>
              <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm resize-none" 
                placeholder="A quick summary for the news listing..." />
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Detailed Article Content *</label>
                <div className="rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-2 border-gray-50 shadow-inner min-h-[400px] sm:min-h-[500px]">
                    <Editor
                      apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                      value={formData.content}
                      onEditorChange={(content: string) => setFormData({ ...formData, content: content })}
                      init={{
                        height: 550,
                        menubar: true,
                        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                        toolbar: 'undo redo | blocks | bold italic underline | image link table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                        branding: false
                      }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-5 sm:p-8 bg-slate-50 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100">
                <div className="flex flex-col">
                   <span className="text-sm font-black text-[#1a3a5c] uppercase tracking-widest">Public Visibility</span>
                   <span className="text-[10px] text-gray-400 font-bold italic">When toggled on, this news will be visible to all users.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
         </form>
      </div>
    </div>
  );
}

export default function NewsActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" /></div>}>
      <NewsActionForm />
    </Suspense>
  );
}
