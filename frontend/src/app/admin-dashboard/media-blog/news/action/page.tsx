'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Newspaper, Loader2, Save, X, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Editor = dynamic(() => import('@/components/TinyMCEEditor'), {
  ssr: false,
  loading: () => <div className="h-[700px] animate-pulse bg-gray-100 rounded-xl" />
});
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
    metaTitle: '', metaDescription: '', metaKeywords: '', focusKeyword: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [keywordInput, setKeywordInput] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim().replace(/,$/, '');
    if (!trimmed) return;
    const currentTags = formData.focusKeyword ? formData.focusKeyword.split(',').map(t => t.trim()) : [];
    if (!currentTags.includes(trimmed)) {
      const newTags = [...currentTags, trimmed].join(', ');
      setFormData({ ...formData, focusKeyword: newTags, metaKeywords: newTags });
    }
    setKeywordInput('');
  };

  const removeTag = (index: number) => {
    const currentTags = formData.focusKeyword.split(',').map(t => t.trim());
    const newTags = currentTags.filter((_, i) => i !== index).join(', ');
    setFormData({ ...formData, focusKeyword: newTags, metaKeywords: newTags });
  };

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
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'image') submitData.append(key, String(value));
    });

    if (imageFile) {
      submitData.append('image', imageFile);
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
      if (window.opener || window.history.length === 1) window.close();
      router.push('/admin-dashboard/media-blog/news');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
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
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 xl:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                <Newspaper className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? 'Edit News' : 'Draft News'}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">Editor Panel • Popular Hospital</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button type="button" onClick={() => window.close()} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editId ? 'Save Article' : 'Publish Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Form Content ─── */}
      <div className="max-w-[1800px] mx-auto mt-8 px-4 sm:px-8 lg:px-12 xl:px-16">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Details Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Article Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Headline *</label>
                  <input required value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900" 
                    placeholder="Enter catchy headline..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date *</label>
                    <input required type="date" value={formData.dateIso} 
                      onChange={(e) => {
                        const iso = e.target.value;
                        if (!iso) return;
                        const dateObj = new Date(iso);
                        const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                        setFormData({ ...formData, dateIso: iso, date: formatted });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Source / Author</label>
                    <input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900" placeholder="e.g. Times of India" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Short Brief (Excerpt)</label>
                  <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 resize-none font-medium" 
                    placeholder="A quick summary for the news listing..." />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Detailed Article Content *</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 min-h-[700px]">
                    <Editor
                      value={formData.content}
                      onEditorChange={(content: string) => setFormData({ ...formData, content: content })}
                      init={{
                        height: 700,
                        menubar: true,
                        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                        toolbar: 'undo redo | blocks | bold italic underline | image link table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                        images_upload_url: `${API_URL}/api/blog-image-direct`,
                        branding: false,
                        statusbar: false,
                        images_upload_handler: (blobInfo: any) => new Promise((resolve, reject) => {
                            const fd = new FormData();
                            fd.append('file', blobInfo.blob(), blobInfo.filename());
                            fetch(`${API_URL}/api/blog-image-direct`, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                                body: fd
                            })
                            .then(res => res.ok ? res.json() : reject('Upload failed'))
                            .then(json => json.location ? resolve(json.location) : reject('Invalid location'))
                            .catch(err => reject(err.message));
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Featured Media</h2>
              <div className="relative aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group">
                  {imagePreview ? (
                      <>
                         <Image src={imagePreview} alt="News Preview" fill unoptimized className="object-cover" />
                         <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-lg">Change Photo</label>
                         </div>
                      </>
                  ) : (
                      <div className="text-center">
                         <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                         <p className="text-[10px] font-bold text-gray-400 uppercase">Click to upload image</p>
                      </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
                  }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="flex items-center gap-2 text-blue-600 mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1.5">
                     <Save className="w-3 h-3" /> SEO Intelligence
                  </span>
               </div>
               <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Focus Keyword *</label>
                    <div className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap gap-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-inner">
                        {formData.focusKeyword && formData.focusKeyword.split(',').filter(t => t.trim()).map((tag, i) => (
                           <span key={i} className="flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight group">
                              {tag.trim()}
                              <button type="button" onClick={() => removeTag(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                                 <X className="w-3.5 h-3.5" />
                              </button>
                           </span>
                        ))}
                        <input 
                           value={keywordInput}
                           onChange={(e) => {
                             if (e.target.value.endsWith(',')) {
                               addTag(e.target.value);
                             } else {
                               setKeywordInput(e.target.value);
                             }
                           }}
                           onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                               e.preventDefault();
                               addTag(keywordInput);
                             }
                           }}
                           className="flex-1 min-w-[150px] bg-transparent outline-none text-xs font-bold text-gray-700 placeholder:text-gray-300"
                           placeholder="Type tag & press Enter..."
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Meta Description</label>
                    <textarea rows={3} value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs font-bold text-gray-700 border border-gray-200 resize-none outline-none focus:border-blue-500 focus:bg-white transition-all" placeholder="Enter meta description for Google snippets..." />
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-700">Visibility Status</span>
                     <span className="text-[10px] text-gray-400 font-medium">Visible to all users</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
               </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function NewsActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>}>
      <NewsActionForm />
    </Suspense>
  );
}
