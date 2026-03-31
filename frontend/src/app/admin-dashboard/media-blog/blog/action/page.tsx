'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Newspaper, Loader2, Save, X, ArrowLeft, Image as ImageIcon, Sparkles, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Editor = dynamic(() => import('@/components/TinyMCEEditor'), {
  ssr: false,
  loading: () => <div className="h-[700px] animate-pulse bg-gray-100 rounded-xl" />
});
import { getImageUrl } from '@/lib/api';
const BLOG_CMS_API = '/api-backend/cms/blogs';
const BLOG_IMAGE_UPLOAD_API = '/api-backend/blog-image-direct';

const normalizeEditorImagePath = (value: string) => {
  if (!value) return value;
  const match = value.match(/\/uploads\/[^"'\s)]+/i);
  return match ? match[0] : value;
};

const normalizeEditorHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/https?:\/\/[^"'\s<]+(\/uploads\/[^"'\s<]+)/gi, '$1');
};

const CATEGORIES = [
  "Best Cancer Specialist Hospital", "best cancer specialist hospital in India", "best cardiology hospital",
  "Best Cardiology Hospital in India", "best dental hospital in India", "Best Eye Specialist Doctors in India",
  "Best Gynaecologist in Varanasi", "best Gynecologist in Varanasi", "Best Heart Hospital in Uttar Pradesh",
  "Best Joint Replacement Surgery Hospital", "Best Medicine Doctor in Varanasi", "best microbiology lab in India",
  "Best Neuro Department in India", "Best Neurological Hospital in India", "best neurology hospital in India",
  "Best Neurology Hospital in Varanasi", "best ortho hospital in India", "Best Plastic Surgeons in Uttar Pradesh",
  "Best Plastic Surgery Hospital in India", "Best Plastic Surgery Hospital in Uttar Pradesh", "Best Urologist Hospital",
  "Gastroenterology", "Orthopaedic in Varanasi", "Cardiology", "Neurology", "Orthopedics", "ENT Care", "Pediatrics",
  "Emergency Care", "Blood Banks", "Cardiology Hospital", "Critical Care & ICU", "Endocrinology Center",
  "ENT Specialist Center", "General Surgery Center", "Hospitals", "Nephrology Specialist Center",
  "Neuro Surgery Center", "Orthopedic Center"
];

function BlogActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', 
    date: '', dateIso: '', author: 'popularhospital-admin', 
    category: '', isUncategorized: false, isActive: true,
    metaTitle: '', metaDescription: '', metaKeywords: '',
    focusKeyword: '', imageAlt: '', image: ''
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
      const fetchBlog = async () => {
        try {
          const res = await fetch(BLOG_CMS_API, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
               ...item,
               content: normalizeEditorHtml(typeof item.content === 'string' ? item.content : (item.content ? item.content.join('\n\n') : '')),
               dateIso: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
            });
            if (item.image) setImagePreview(getImageUrl(item.image));
          }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
      };
      fetchBlog();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'image') submitData.append(key, key === 'content' ? normalizeEditorHtml(String(value)) : String(value));
    });
    
    if (imageFile) submitData.append('image', imageFile);

    try {
      const url = editId ? `${BLOG_CMS_API}/${editId}` : BLOG_CMS_API;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: submitData,
      });

      if (!res.ok) throw new Error('Failed to save blog post');
      alert(editId ? 'Post updated!' : 'Post launched!');
      if (window.opener || window.history.length === 1) window.close();
      router.push('/admin-dashboard/media-blog/blog');
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
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 xl:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shadow-sm">
                <Newspaper className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? 'Edit Blog' : 'Launch New Blog'}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">SEO Editorial Suite • Popular Hospital</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
             <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
               <Eye className="w-4 h-4" /> <span>Preview</span>
            </button>
            <button type="button" onClick={() => window.close()} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editId ? 'Save Article' : 'Launch Post'}</span>
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
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Article Body</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title *</label>
                  <input required value={formData.title} 
                    onChange={(e) => {
                      const v = e.target.value;
                      setFormData({ ...formData, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-'), metaTitle: v });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-bold text-lg" 
                    placeholder="Enter blog heading..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                    <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                    <input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Snippet / Excerpt</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                      <Editor
                        value={formData.excerpt}
                        onEditorChange={(content: string) => setFormData({ ...formData, excerpt: content })}
                        init={{ height: 180, menubar: false, plugins: ['link'], toolbar: 'bold italic | link | removeformat', branding: false, statusbar: false }}
                      />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Detailed Article Content *</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 min-h-[700px]">
                    <Editor
                      value={formData.content}
                      onEditorChange={(content: string) => setFormData({ ...formData, content: normalizeEditorHtml(content) })}
                      init={{
                        height: 700,
                        menubar: true,
                        plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | image link media table | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat | help',
                        images_upload_url: BLOG_IMAGE_UPLOAD_API,
                        branding: false,
                        statusbar: false,
                        images_upload_handler: (blobInfo: any) => new Promise((resolve, reject) => {
                            const fd = new FormData();
                            fd.append('file', blobInfo.blob(), blobInfo.filename());
                            fetch(BLOG_IMAGE_UPLOAD_API, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                                body: fd
                            })
                            .then(res => res.ok ? res.json() : reject('Upload failed'))
                            .then(json => json.location ? resolve(normalizeEditorImagePath(json.location)) : reject('Invalid location'))
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
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Featured Image</h2>
              <div className="relative aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group">
                  {imagePreview ? (
                      <>
                         <Image src={imagePreview} alt="Blog Preview" fill unoptimized className="object-cover" />
                         <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-lg">Change Image</label>
                         </div>
                      </>
                  ) : (
                      <div className="text-center">
                         <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                         <p className="text-[10px] font-bold text-gray-400 uppercase">1:1 Ratio Recommended</p>
                      </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                  }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <input value={formData.imageAlt} onChange={(e) => setFormData({...formData, imageAlt: e.target.value})} placeholder="Image Alt Text (SEO)..." className="w-full px-4 py-2 mt-4 rounded-lg bg-gray-50 text-xs font-semibold border border-gray-200 outline-none" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">SEO Intelligence</h2>
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
                    <textarea rows={3} value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-200 resize-none" placeholder="Search excerpt..." />
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Publish Date</label>
                  <input required type="date" value={formData.dateIso} 
                     onChange={(e) => {
                       const iso = e.target.value;
                       if (!iso) return;
                       setFormData({ ...formData, dateIso: iso, date: new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                     }}
                     className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
                  <select disabled={formData.isUncategorized} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold">
                     <option value="">Select Speciality</option>
                     {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-xs font-bold text-gray-600">Active Listing</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
               </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Overlay */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col overflow-hidden">
           <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-white shadow-xl">
              <div className="flex items-center gap-4">
                 <Eye className="w-6 h-6 text-blue-400" />
                 <h2 className="font-bold tracking-widest uppercase text-sm">Vantage Preview Mode</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X className="w-8 h-8" /></button>
           </div>
           <div className="flex-1 overflow-y-auto bg-gray-50 pb-40 px-4">
              <div className="max-w-4xl mx-auto mt-16 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                 <div className="h-[400px] relative">
                    <Image src={imagePreview || '/about-section-image.png'} alt="Preview" fill unoptimized className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12">
                       <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">{formData.category || 'General Health'}</span>
                       <h1 className="text-4xl font-bold text-white leading-tight">{formData.title || 'Draft Article'}</h1>
                    </div>
                 </div>
                 <div className="p-12">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100 text-sm text-gray-400 font-semibold uppercase">
                       <span>{formData.author}</span>
                       <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                       <span>{formData.date || 'Pending Release'}</span>
                    </div>
                    <div className="prose prose-xl prose-slate max-w-none text-gray-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: formData.content }} />
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default function BlogActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>}>
      <BlogActionForm />
    </Suspense>
  );
}
