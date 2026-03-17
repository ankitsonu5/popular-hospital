'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Newspaper, Image as ImageIcon, Sparkles, Eye, Info, Link as LinkIcon } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

const CATEGORIES = [
  "Best Cancer Specialist Hospital",
  "best cancer specialist hospital in India",
  "best cardiology hospital",
  "Best Cardiology Hospital in India",
  "best dental hospital in India",
  "Best Eye Specialist Doctors in India",
  "Best Gynaecologist in Varanasi",
  "best Gynecologist in Varanasi",
  "Best Heart Hospital in Uttar Pradesh",
  "Best Joint Replacement Surgery Hospital",
  "Best Medicine Doctor in Varanasi",
  "best microbiology lab in India",
  "Best Neuro Department in India",
  "Best Neurological Hospital in India",
  "best neurology hospital in India",
  "Best Neurology Hospital in Varanasi",
  "best ortho hospital in India",
  "Best Plastic Surgeons in Uttar Pradesh",
  "Best Plastic Surgery Hospital in India",
  "Best Plastic Surgery Hospital in Uttar Pradesh",
  "Best Urologist Hospital",
  "Gastroenterology",
  "Orthopaedic in Varanasi",
  "Cardiology", 
  "Neurology", 
  "Orthopedics", 
  "ENT Care", 
  "Pediatrics", 
  "Emergency Care",
  "Blood Banks",
  "Cardiology Hospital",
  "Critical Care & ICU",
  "Endocrinology Center",
  "ENT Specialist Center",
  "General Surgery Center",
  "Hospitals",
  "Nephrology Specialist Center",
  "Neuro Surgery Center",
  "Orthopedic Center"
];

export default function AdminBlogPage() {
  const [blogList, setBlogList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', 
    date: '', dateIso: '', author: 'popularhospital-admin', 
    category: '', isUncategorized: false, isActive: true,
    metaTitle: '', metaDescription: '', metaKeywords: '',
    focusKeyword: '', imageAlt: '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
    // Note: When uploading files with FormData, do not set Content-Type to application/json.
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/blogs`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
      if (res.ok) {
        setBlogList(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const parseDateToIso = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: typeof item.content === 'string' ? item.content : (item.content ? item.content.join('\n\n') : ''),
      date: item.date || '',
      dateIso: parseDateToIso(item.date),
      author: item.author || 'popularhospital-admin',
      category: item.category || '',
      isUncategorized: item.isUncategorized || false,
      isActive: item.isActive !== false,
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
      metaKeywords: item.metaKeywords || '',
      focusKeyword: item.focusKeyword || '',
      imageAlt: item.imageAlt || '',
    });
    
    // Set preview for existing image
    if (item.image) {
      setImagePreview(item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`);
    } else {
      setImagePreview('');
    }
    setImageFile(null); // Reset new chosen file
    
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog article?')) return;
    try {
      await fetch(`${API_URL}/api/cms/blogs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    let finalSlug = formData.slug;
    if (!finalSlug && formData.title) {
      finalSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Creating FormData for file upload
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', finalSlug);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('content', formData.content);
    submitData.append('author', formData.author);
    submitData.append('date', formData.date);
    submitData.append('category', formData.category);
    submitData.append('isUncategorized', String(formData.isUncategorized));
    submitData.append('isActive', String(formData.isActive));
    submitData.append('metaTitle', formData.metaTitle);
    submitData.append('metaDescription', formData.metaDescription);
    submitData.append('metaKeywords', formData.metaKeywords);
    submitData.append('focusKeyword', formData.focusKeyword);
    submitData.append('imageAlt', formData.imageAlt);
    
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/api/cms/blogs/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: submitData,
        });
      } else {
        await fetch(`${API_URL}/api/cms/blogs`, {
          method: 'POST', headers: getHeaders(), body: submitData,
        });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchData();
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const resetForm = () => {
    setFormData({ 
      title: '', slug: '', excerpt: '', content: '',
      date: '', dateIso: '', author: 'popularhospital-admin', 
      category: '', isUncategorized: false, isActive: true,
      metaTitle: '', metaDescription: '', metaKeywords: '',
      focusKeyword: '', imageAlt: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  const filteredBlogs = blogList.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.author?.toLowerCase().includes(search.toLowerCase()) ||
    n.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Blog Posts</h2>
          <p className="text-sm text-gray-500 mt-1">{blogList.length} blog posts published</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

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
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Blog Article</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Author</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBlogs.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 overflow-hidden relative border border-slate-100">
                          {item.image ? (
                            <img 
                              src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement?.classList.add('broken-img');
                              }}
                            />
                          ) : (
                            <Newspaper className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1" title={item.title}>{item.title}</p>
                          <p className="text-xs text-gray-400 max-w-[200px] truncate" title={item.slug}>/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">
                      {item.isUncategorized ? <span className="text-xs font-semibold text-gray-400 border px-2 py-0.5 rounded backdrop-blur-sm">Uncategorized</span> : item.category}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">{item.date}</td>
                    <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">{item.author || '-'}</td>
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
                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <Newspaper className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>No blog articles found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-start justify-center p-4 pt-[5vh] pb-[5vh] overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[1366px] min-h-[80vh] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 py-5">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{editingId ? 'Edit Blog Post' : 'Create Industry Standard Blog'}</h3>
                <p className="text-sm text-gray-500">Craft high-quality medical content with advanced SEO.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#1a3a5c] hover:bg-gray-50 rounded-xl transition-all"
                >
                  <Eye className="w-4 h-4" /> Live Preview
                </button>
                <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Heading / Title *</label>
                      <input 
                        required 
                        value={formData.title} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ 
                            ...formData, 
                            title: val, 
                            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            metaTitle: val // Pre-fill meta title
                          });
                        }}
                        placeholder="e.g., Breaking: New Cardiology Advancement at Popular Hospital"
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-100 text-lg font-semibold focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/5 outline-none transition-all placeholder:text-gray-300 shadow-sm bg-white" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL Name)</label>
                        <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Author Name</label>
                        <input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all bg-white" />
                      </div>
                    </div>

                    <div className="p-6 bg-[#f0f9ff] rounded-[2rem] border border-blue-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="w-5 h-5 text-blue-500" />
                        <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Editor Guidance</h4>
                      </div>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        <strong>💡 Tip:</strong> Use the <LinkIcon className="inline w-3 h-3" /> icon in the toolbar for <strong>Internal Linking</strong>. Linking to other services like /cardiology or /neurology improves your site's SEO value immensely.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Brief Excerpt / Summary (Appears in List)</label>
                      <Editor
                        apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                        value={formData.excerpt}
                        onEditorChange={(content: string) => setFormData({ ...formData, excerpt: content })}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ['link', 'wordcount'],
                          toolbar: 'bold italic underline | link | removeformat',
                          content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Content (Article History) *</label>
                      <Editor
                        apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                        value={formData.content}
                        onEditorChange={(content: string) => setFormData({ ...formData, content: content })}
                        init={{
                          height: 600,
                          menubar: true,
                          plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | image link media table | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | emoticons codesample | removeformat | help',
                          toolbar_mode: 'wrap',
                          image_advtab: true,
                          image_title: true,
                          automatic_uploads: true,
                          image_uploadtab: true,
                          images_upload_url: `${API_URL}/api/blog-image-direct`,
                          images_upload_handler: (blobInfo: any) => new Promise((resolve, reject) => {
                            const formData = new FormData();
                            formData.append('file', blobInfo.blob(), blobInfo.filename());

                            const uploadEndpoint = `${API_URL}/api/blog-image-direct`;
                            console.log('Attempting upload to:', uploadEndpoint);
                            
                            fetch(uploadEndpoint, {
                              method: 'POST',
                              headers: {
                                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
                              },
                              body: formData
                            })
                            .then(res => {
                              console.log('Upload response status:', res.status);
                              if (!res.ok) {
                                throw new Error(`HTTP Error: ${res.status}`);
                              }
                              return res.json();
                            })
                            .then(json => {
                              console.log('Upload success:', json);
                              if (json && json.location) {
                                resolve(json.location);
                              } else {
                                reject('Invalid JSON response');
                              }
                            })
                            .catch(err => {
                              console.error('Upload error:', err);
                              reject(err.message || 'Image upload failed');
                            });
                          }),
                          content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Media Section */}
                  <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      <h4 className="font-bold text-gray-900 text-lg tracking-tight">Post Media</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="relative group">
                        <div className={`w-full h-48 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all overflow-hidden ${!imagePreview ? 'hover:border-[#0d9488]/50 bg-gray-50/50' : ''}`}>
                          {imagePreview ? (
                            <div className="relative w-full h-full group">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="text-white text-xs font-bold cursor-pointer bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all">Change Image</label>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center p-4">
                              <ImageIcon className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                              <p className="text-xs text-gray-500 font-medium">Click to upload thumbnail</p>
                            </div>
                          )}
                          <input 
                            required={!editingId && !imagePreview} 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setImageFile(file);
                                setImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Image Alt Text (SEO)</label>
                        <input 
                          value={formData.imageAlt}
                          onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                          placeholder="Describe the image for accessibility"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all placeholder:text-gray-300"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Crucial for Google Image search ranking.</p>
                      </div>
                    </div>
                  </div>

                  {/* Settings Section */}
                  <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h4 className="font-bold text-gray-900 text-lg tracking-tight">SEO Toolkit</h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Focus Keywords (Use space or commas, no # or tags) *</label>
                        <input 
                          required
                          value={formData.focusKeyword}
                          onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value, metaKeywords: e.target.value })}
                          placeholder="e.g., Best Cardiology India"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-green-100 bg-green-50/20 text-sm focus:border-[#0d9488] outline-none transition-all"
                        />
                        <p className="text-[10px] text-green-600 mt-1">Main topic of this blog post.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Meta Title (Same or similar to Heading / Title)</label>
                        <input 
                          value={formData.metaTitle} 
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          placeholder="Search engine title"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Meta Description (Same or similar to Brief Excerpt / Summary)</label>
                        <textarea 
                          rows={3} 
                          value={formData.metaDescription} 
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          placeholder="Brief snippet for Google"
                          className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Classification Section */}
                  <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Publishing Status</label>
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, isActive: true})}
                          className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${formData.isActive ? 'bg-[#0d9488] text-white shadow-lg shadow-[#0d9488]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                          Public
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, isActive: false})}
                          className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!formData.isActive ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                          Draft
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Publish Date</label>
                      <input required type="date" value={formData.dateIso} 
                        onChange={(e) => {
                          const iso = e.target.value;
                          if (!iso) return;
                          const dateObj = new Date(iso);
                          const formatted = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                          setFormData({ ...formData, dateIso: iso, date: formatted });
                        }}
                        className="w-full px-3 py-3 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Category</label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" checked={formData.isUncategorized} onChange={(e) => setFormData({ ...formData, isUncategorized: e.target.checked })} className="rounded accent-[#0d9488]" />
                          <span className="text-[11px] font-bold text-gray-400">None</span>
                        </label>
                      </div>
                      <select 
                        disabled={formData.isUncategorized}
                        value={formData.category} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-3 rounded-xl border-2 border-gray-100 text-sm focus:border-[#0d9488] outline-none transition-all"
                      >
                        <option value="" disabled hidden>Select Speciality</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 z-40 -mx-8 -mb-8 px-8 py-6 bg-white border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-3xl">
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold text-sm rounded-xl transition-all">
                  Discard Changes
                </button>
                <button type="submit" disabled={isSaving}
                  className="px-8 py-3 bg-[#0d9488] hover:bg-[#0b8578] text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-[#0d9488]/20 flex items-center gap-2">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Save & Update Article' : 'Launch Post Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col overflow-hidden">
          <div className="bg-[#1a3a5c] px-8 py-4 flex items-center justify-between text-white shadow-xl">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" />
              <h4 className="font-black text-lg uppercase tracking-widest">LIVE PREVIEW MODE</h4>
            </div>
            <button onClick={() => setShowPreview(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#f0f7ff] pb-20">
            {/* Minimal Mock Up of Blog Page */}
            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
               <div className="relative w-full h-[400px]">
                 <img src={imagePreview || '/about-section-image.png'} className="w-full h-full object-cover" alt="Preview Hero" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-10 left-10 text-white">
                   <span className="bg-[#E85222] px-4 py-1.5 rounded-full text-xs font-black uppercase mb-4 inline-block">{formData.category || 'General'}</span>
                   <h1 className="text-4xl font-extrabold leading-tight">{formData.title || 'Post Title Preview'}</h1>
                 </div>
               </div>
               <div className="p-12">
                 <div className="flex items-center gap-6 text-sm font-bold text-gray-400 mb-10 pb-6 border-b border-gray-100">
                   <span>By {formData.author}</span>
                   <span>{formData.date || 'March 17, 2026'}</span>
                 </div>
                 {/* Excerpt */}
                 <div className="text-xl font-medium text-gray-600 mb-8 italic" dangerouslySetInnerHTML={{ __html: formData.excerpt }} />
                 {/* Content */}
                 <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData.content }} />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
