'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Newspaper, Image as ImageIcon } from 'lucide-react';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', contentText: '', 
    date: '', dateIso: '', author: 'popularhospital-admin', 
    category: '', isUncategorized: false, isActive: true,
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
      contentText: item.content ? item.content.join('\n\n') : '',
      date: item.date || '',
      dateIso: parseDateToIso(item.date),
      author: item.author || 'popularhospital-admin',
      category: item.category || '',
      isUncategorized: item.isUncategorized || false,
      isActive: item.isActive !== false,
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
    
    const paragraphs = formData.contentText
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    let finalSlug = formData.slug;
    if (!finalSlug && formData.title) {
      finalSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Creating FormData for file upload
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', finalSlug);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('content', JSON.stringify(paragraphs));
    submitData.append('author', formData.author);
    submitData.append('date', formData.date);
    submitData.append('category', formData.category);
    submitData.append('isUncategorized', String(formData.isUncategorized));
    submitData.append('isActive', String(formData.isActive));
    
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
      title: '', slug: '', excerpt: '', contentText: '',
      date: '', dateIso: '', author: 'popularhospital-admin', 
      category: '', isUncategorized: false, isActive: true 
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
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center p-4 pt-[5vh] pb-[5vh] overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Heading / Title *</label>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL snippet)</label>
                  <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date *</label>
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
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-semibold text-gray-700">Category</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="uncategorized" 
                        checked={formData.isUncategorized} 
                        onChange={(e) => setFormData({ ...formData, isUncategorized: e.target.checked })} 
                        className="rounded accent-[#0d9488]" 
                      />
                      <label htmlFor="uncategorized" className="text-sm font-medium text-gray-600 block cursor-pointer">Uncategorized</label>
                    </div>
                  </div>
                  <select 
                    disabled={formData.isUncategorized}
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                  >
                    <option value="" disabled hidden>Choose Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Image Upload (Thumbnail) *</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <input 
                        required={!editingId && !imagePreview} 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          } else {
                            setImageFile(null);
                            setImagePreview('');
                          }
                        }}
                        className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0d9488]/10 file:text-[#0d9488] hover:file:bg-[#0d9488]/20" 
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-2 text-center p-2 rounded-xl border border-dashed border-gray-300 w-fit">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-[200px] h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Brief Excerpt / Summary</label>
                  <p className="text-xs text-gray-400 mb-2">Short summary to display on the blog listing page.</p>
                  <textarea rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Content (Paragraphs) *</label>
                  <p className="text-xs text-gray-400 mb-2">Separate paragraphs with a new line.</p>
                  <textarea required rows={6} value={formData.contentText} onChange={(e) => setFormData({ ...formData, contentText: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name / Admin</label>
                  <input required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? 'Update Blog Post' : 'Publish Blog Post'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
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
