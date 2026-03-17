'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Newspaper, Image as ImageIcon } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { getImageUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '',
    image: '', date: '', dateIso: '', author: '', isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cms/news`, { headers: getHeaders() });
      if (res.ok) {
        setNewsList(await res.json());
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
      content: item.content || '',
      excerpt: item.excerpt || '',
      image: item.image || '',
      date: item.date || '',
      dateIso: parseDateToIso(item.date),
      author: item.author || '',
      isActive: item.isActive !== false,
    });
    
    if (item.image) {
      setImagePreview(getImageUrl(item.image));
    } else {
      setImagePreview('');
    }
    
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    try {
      await fetch(`${API_URL}/api/cms/news/${id}`, { method: 'DELETE', headers: getHeaders() });
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

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', finalSlug);
    submitData.append('content', formData.content);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('date', formData.date);
    submitData.append('author', formData.author);
    submitData.append('isActive', String(formData.isActive));
    
    if (imageFile) {
      submitData.append('image', imageFile);
    } else if (editingId && formData.image) {
      submitData.append('existingImage', formData.image);
    }

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/cms/news/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: submitData,
        });
      } else {
        res = await fetch(`${API_URL}/api/cms/news`, {
          method: 'POST', headers: getHeaders(), body: submitData,
        });
      }

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save news article');
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchData();
      alert(editingId ? 'News updated successfully!' : 'News published successfully!');
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: '', slug: '', content: '', excerpt: '',
      image: '', date: '', dateIso: '', author: '', isActive: true 
    });
    setImageFile(null);
    setImagePreview('');
  };

  const filteredNews = newsList.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage News Articles</h2>
          <p className="text-sm text-gray-500 mt-1">{newsList.length} articles published</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add News
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

      {/* Table */}
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
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Article</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredNews.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 overflow-hidden relative border border-slate-100">
                          {item.image ? (
                            <img 
                              src={getImageUrl(item.image)} 
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
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400">/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">{item.date}</td>
                    <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">{item.author || '-'}</td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${item.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {item.isActive !== false ? 'Active' : 'Draft'}
                      </span>
                    </td>
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
                {filteredNews.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <Newspaper className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>No news articles found</p>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit News Article' : 'Add New News Article'}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                    <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                    <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">News Source (Author)</label>
                    <input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="e.g., Dainik Jagran / Times of India"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                  </div>
                </div>

                {/* Right Column (Image) */}
                <div className="bg-gray-50/50 p-4 rounded-3xl border-2 border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Featured Image *</label>
                  <div className="space-y-4">
                    <div className="relative group aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6">
                           <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                           <p className="text-xs text-gray-400">Click to upload featured image</p>
                        </div>
                      )}
                      <input 
                        required={!editingId && !imagePreview} 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Excerpt Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Brief / Excerpt</label>
                <textarea 
                  rows={2} 
                  value={formData.excerpt} 
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Small snippet for list view..."
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" 
                />
              </div>

              {/* TinyMCE News Content */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Content Highlights (News Body) *</label>
                <Editor
                  apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                  value={formData.content}
                  onEditorChange={(content: string) => setFormData({ ...formData, content: content })}
                  init={{
                    height: 450,
                    menubar: true,
                    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample',
                    toolbar: 'undo redo | blocks | bold italic underline | image link table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
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
                      fetch(uploadEndpoint, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                        body: formData
                      })
                      .then(res => res.ok ? res.json() : reject('Upload failed'))
                      .then(json => json.location ? resolve(json.location) : reject('Invalid response'))
                      .catch(err => reject(err.message));
                    }),
                    content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded accent-[#0d9488] w-4 h-4" />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (Visible on website)</label>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-bold transition-all disabled:opacity-60 shadow-lg shadow-teal-700/20 active:scale-[0.98]">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? 'Update News' : 'Publish News'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]">
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
