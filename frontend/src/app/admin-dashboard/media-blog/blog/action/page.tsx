'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Newspaper, Loader2, Save, X, ArrowLeft, Image as ImageIcon, Sparkles, Eye, Info, Link as LinkIcon } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

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

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`${API_URL}/api/cms/blogs`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
               ...item,
               content: typeof item.content === 'string' ? item.content : (item.content ? item.content.join('\n\n') : ''),
               dateIso: item.date ? new Date(item.date).toISOString().split('T')[0] : ''
            });
            if (item.image) setImagePreview(item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`);
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
      if (key !== 'image') submitData.append(key, String(value));
    });
    
    if (imageFile) submitData.append('image', imageFile);

    try {
      const url = editId ? `${API_URL}/api/cms/blogs/${editId}` : `${API_URL}/api/cms/blogs`;
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" />
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
             <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Newspaper className="w-6 h-6 text-purple-600" />
             </div>
             <div>
                <h1 className="text-xl font-black text-[#1a3a5c] uppercase tracking-widest">
                  {editId ? 'Refine Medical Blog' : 'New Clinical Publication'}
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SEO Editorial Suite • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button type="button" onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-6 py-3 text-sm font-black text-blue-600 hover:bg-blue-50 rounded-2xl uppercase tracking-widest transition-all">
               <Eye className="w-5 h-5" /> Preview
            </button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-3 px-10 py-3.5 bg-[#0d9488] hover:bg-[#E85222] text-white rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editId ? 'Update Live' : 'Launch Live'}
            </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-12 px-8">
         <form className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-900/5 space-y-8 border border-white">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Article Heading *</label>
                    <input required value={formData.title} 
                      onChange={(e) => {
                        const v = e.target.value;
                        setFormData({ ...formData, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-'), metaTitle: v });
                      }}
                      className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-purple-500 focus:bg-white outline-none transition-all font-black text-xl text-[#1a3a5c]" 
                      placeholder="e.g. Breakthrough in Non-Invasive Heart Surgery..." />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Slug (URL)</label>
                      <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-purple-500 outline-none transition-all font-bold text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Author</label>
                      <input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-purple-500 outline-none transition-all font-bold text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Snippet / Excerpt</label>
                    <div className="rounded-[2rem] overflow-hidden border-2 border-gray-50">
                        <Editor
                          apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                          value={formData.excerpt}
                          onEditorChange={(content: string) => setFormData({ ...formData, excerpt: content })}
                          init={{ height: 180, menubar: false, plugins: ['link'], toolbar: 'bold italic | link | removeformat', branding: false }}
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Full Body Content *</label>
                    <div className="rounded-[2.5rem] overflow-hidden border-2 border-gray-50">
                        <Editor
                          apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                          value={formData.content}
                          onEditorChange={(content: string) => setFormData({ ...formData, content: content })}
                          init={{
                            height: 700,
                            menubar: true,
                            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | image link media table | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat | help',
                            images_upload_url: `${API_URL}/api/blog-image-direct`,
                            branding: false,
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

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-10">
               {/* Image Card */}
               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white space-y-6">
                  <div className="flex items-center gap-3">
                     <ImageIcon className="w-5 h-5 text-purple-500" />
                     <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Featured Asset</h4>
                  </div>
                  <div className="relative aspect-square rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden group flex items-center justify-center">
                     {imagePreview ? (
                        <>
                           <img src={imagePreview} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                              <label className="cursor-pointer bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest">Change Cover</label>
                           </div>
                        </>
                     ) : (
                        <div className="text-center">
                           <ImageIcon className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Upload 1:1 Aspect Frame</p>
                        </div>
                     )}
                     <input type="file" accept="image/*" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                     }} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <input value={formData.imageAlt} onChange={(e) => setFormData({...formData, imageAlt: e.target.value})} placeholder="SEO: Image alt text..." className="w-full px-5 py-3 rounded-xl bg-slate-50 text-xs font-bold border-2 border-transparent focus:border-purple-300 outline-none" />
               </div>

               {/* SEO Card */}
               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white space-y-6">
                  <div className="flex items-center gap-3">
                     <Sparkles className="w-5 h-5 text-amber-500" />
                     <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">SEO Intelligence</h4>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Focus Keyword *</label>
                        <input required value={formData.focusKeyword} onChange={(e) => setFormData({...formData, focusKeyword: e.target.value, metaKeywords: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 text-xs font-black border-2 border-transparent focus:border-amber-400 outline-none" placeholder="e.g. Best Hospital Varanasi" />
                     </div>
                     <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Meta Description</label>
                        <textarea rows={3} value={formData.metaDescription} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full px-5 py-3 rounded-xl bg-slate-50 text-xs font-bold border-2 border-transparent focus:border-amber-400 outline-none resize-none" placeholder="Search result snippet..." />
                     </div>
                  </div>
               </div>

               {/* Meta Card */}
               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Publishing Date</label>
                    <input required type="date" value={formData.dateIso} 
                       onChange={(e) => {
                         const iso = e.target.value;
                         if (!iso) return;
                         setFormData({ ...formData, dateIso: iso, date: new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                       }}
                       className="w-full px-5 py-4 rounded-xl bg-slate-50 text-xs font-black border-2 border-transparent focus:border-blue-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Category / Speciality</label>
                    <select disabled={formData.isUncategorized} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-slate-50 text-xs font-black border-2 border-transparent focus:border-blue-400 outline-none">
                       <option value="">Choose Category</option>
                       {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Status</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:bg-[#0d9488] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                     </label>
                  </div>
               </div>
            </div>
         </form>
      </div>

      {/* Preview Overlay */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col overflow-hidden">
           <div className="bg-[#1a3a5c] px-10 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                 <Eye className="w-6 h-6 text-blue-400" />
                 <h2 className="font-black tracking-[0.3em] uppercase">Vantage Preview Mode</h2>
              </div>
              <button onClick={() => setShowPreview(false)} className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"><X className="w-8 h-8" /></button>
           </div>
           <div className="flex-1 overflow-y-auto bg-[#f4f8fb] pb-40">
              <div className="max-w-4xl mx-auto mt-20 bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-50">
                 <div className="h-[450px] relative">
                    <img src={imagePreview || '/about-section-image.png'} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-16 left-16 right-16">
                       <span className="bg-[#E85222] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">{formData.category || 'General Health'}</span>
                       <h1 className="text-5xl font-black text-white leading-tight drop-shadow-2xl">{formData.title || 'Draft Article Heading'}</h1>
                    </div>
                 </div>
                 <div className="p-16">
                    <div className="flex items-center gap-6 mb-12 py-8 border-y border-slate-50 text-sm font-black text-slate-400 uppercase tracking-widest">
                       <span>Editor: {formData.author}</span>
                       <span className="w-2 h-2 rounded-full bg-slate-200" />
                       <span>{formData.date || 'Pending Release'}</span>
                    </div>
                    <div className="prose prose-2xl prose-slate max-w-none text-slate-700 font-medium leading-[2]" dangerouslySetInnerHTML={{ __html: formData.content }} />
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" /></div>}>
      <BlogActionForm />
    </Suspense>
  );
}
