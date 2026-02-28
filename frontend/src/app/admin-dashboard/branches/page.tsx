'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Building2, MapPin, Clock, Phone, Image as ImageIcon } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', city: '', state: '', heading: '', title: '',
    description: '', address: '', phone: '', email: '', pincode: '',
    timings: '', image_one: '', image_two: '', image_three: '', image_four: '',
    mapEmbedUrl: '', mapDirectionsUrl: '', facilities: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/branches`);
      setBranches(await res.json());
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (branch: any) => {
    setEditingId(branch._id);
    setFormData({
      name: branch.name || '', slug: branch.slug || '', city: branch.city || '',
      state: branch.state || '', heading: branch.heading || '', title: branch.title || '',
      description: branch.description || '', address: branch.address || '',
      phone: branch.phone || '', email: branch.email || '', pincode: branch.pincode || '',
      timings: branch.timings || '',
      image_one: branch.image_one || '', image_two: branch.image_two || '',
      image_three: branch.image_three || '', image_four: branch.image_four || '',
      mapEmbedUrl: branch.mapEmbedUrl || '', mapDirectionsUrl: branch.mapDirectionsUrl || '',
      facilities: branch.facilities || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this branch?')) return;
    await fetch(`${API_URL}/api/cms/branches/${id}`, { method: 'DELETE', headers: getHeaders() });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await fetch(`${API_URL}/api/cms/branches/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: JSON.stringify(formData),
        });
      } else {
        await fetch(`${API_URL}/api/cms/branches`, {
          method: 'POST', headers: getHeaders(), body: JSON.stringify(formData),
        });
      }
      setShowForm(false); setEditingId(null); resetForm(); fetchData();
    } catch (e) { console.error(e); }
    setIsSaving(false);
  };

  const resetForm = () => {
    setFormData({
      name: '', slug: '', city: '', state: '', heading: '', title: '',
      description: '', address: '', phone: '', email: '', pincode: '',
      timings: '', image_one: '', image_two: '', image_three: '', image_four: '',
      mapEmbedUrl: '', mapDirectionsUrl: '', facilities: '',
    });
  };

  const filteredBranches = branches.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Branches</h2>
          <p className="text-sm text-gray-500 mt-1">{branches.length} locations</p>
        </div>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Branch
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search branches..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredBranches.map((branch) => (
            <div key={branch._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden">
              {/* Preview Image */}
              {branch.image_one && (
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <img src={branch.image_one} alt={branch.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">
                    {branch.city}
                  </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{branch.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">/{branch.slug}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleEdit(branch)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(branch._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{branch.description}</p>
                <div className="space-y-1.5 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /><span className="truncate">{branch.address}</span></div>
                  {branch.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /><span>{branch.phone}</span></div>}
                  {branch.timings && <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /><span>{branch.timings}</span></div>}
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className="w-3 h-3" />
                    <span>
                      {[branch.image_one, branch.image_two, branch.image_three, branch.image_four].filter(Boolean).length} images
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredBranches.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Building2 className="w-10 h-10 mx-auto mb-3 text-gray-200" /><p>No branches found</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center p-4 pt-[5vh] overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 relative my-4">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Branch' : 'Add New Branch'}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" /> Basic Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Popular Hospital – Main Branch" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
                    <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="varanasi-main" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                    <input required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Varanasi" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Uttar Pradesh" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Heading</label>
                    <input value={formData.heading} onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Our Flagship Centre in Varanasi" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Page Title</label>
                    <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Popular Hospital, Varanasi (Main Branch)" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none"
                    placeholder="Write a detailed description of this branch..." />
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" /> Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                    <input required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all"
                      placeholder="N-10 / 60, A-2, B.L.W. Road, Kakarmatta, Varanasi" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="+91-7800001895" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="info@popularhospital.in" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Timings</label>
                    <input value={formData.timings} onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="Open 24 × 7 • OPD: 9 AM – 8 PM" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                    <input value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="221004" />
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" /> Gallery Images (4 photos)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image One (Main)</label>
                    <input value={formData.image_one} onChange={(e) => setFormData({ ...formData, image_one: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="/images/branches/varanasi-main/1.webp" />
                    {formData.image_one && <img src={formData.image_one} alt="Preview" className="mt-2 h-20 w-full object-cover rounded-lg border" />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image Two</label>
                    <input value={formData.image_two} onChange={(e) => setFormData({ ...formData, image_two: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="/images/branches/varanasi-main/2.webp" />
                    {formData.image_two && <img src={formData.image_two} alt="Preview" className="mt-2 h-20 w-full object-cover rounded-lg border" />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image Three</label>
                    <input value={formData.image_three} onChange={(e) => setFormData({ ...formData, image_three: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="/images/branches/varanasi-main/3.webp" />
                    {formData.image_three && <img src={formData.image_three} alt="Preview" className="mt-2 h-20 w-full object-cover rounded-lg border" />}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image Four</label>
                    <input value={formData.image_four} onChange={(e) => setFormData({ ...formData, image_four: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="/images/branches/varanasi-main/4.webp" />
                    {formData.image_four && <img src={formData.image_four} alt="Preview" className="mt-2 h-20 w-full object-cover rounded-lg border" />}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" /> Google Maps
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Map Embed URL</label>
                    <input value={formData.mapEmbedUrl} onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="https://www.google.com/maps/embed?pb=..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Map Directions URL</label>
                    <input value={formData.mapDirectionsUrl} onChange={(e) => setFormData({ ...formData, mapDirectionsUrl: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="https://www.google.com/maps/dir/?api=1&..." />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? 'Update Branch' : 'Add Branch'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
