'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Stethoscope } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', speciality: '', qualification: '',
    experience_years: '', bio: '', image_url: '',
    consultation_fee: '', available_days: '', branches: [] as string[], is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [docsRes, specsRes, branchesRes] = await Promise.all([
        fetch(`${API_URL}/api/cms/doctors`, { headers: getHeaders() }),
        fetch(`${API_URL}/api/doctors/specialities`),
        fetch(`${API_URL}/api/branches`),
      ]);
      setDoctors(await docsRes.json());
      setSpecialities(await specsRes.json());
      setBranches(await branchesRes.json());
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (doc: any) => {
    setEditingId(doc._id);
    setFormData({
      name: doc.name || '', slug: doc.slug || '',
      speciality: doc.speciality?._id || doc.speciality || '',
      qualification: doc.qualification || '',
      experience_years: doc.experience_years?.toString() || '',
      bio: doc.bio || '', image_url: doc.image_url || '',
      consultation_fee: doc.consultation_fee?.toString() || '',
      available_days: doc.available_days || '',
      branches: doc.branches?.map((b: any) => b._id || b) || [],
      is_active: doc.is_active !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    await fetch(`${API_URL}/api/cms/doctors/${id}`, { method: 'DELETE', headers: getHeaders() });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const body = {
      ...formData,
      experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
      consultation_fee: formData.consultation_fee ? parseInt(formData.consultation_fee) : null,
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/api/cms/doctors/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: JSON.stringify(body),
        });
      } else {
        await fetch(`${API_URL}/api/cms/doctors`, {
          method: 'POST', headers: getHeaders(), body: JSON.stringify(body),
        });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchData();
    } catch (e) { console.error(e); }
    setIsSaving(false);
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', speciality: '', qualification: '', experience_years: '', bio: '', image_url: '', consultation_fee: '', available_days: '', branches: [], is_active: true });
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.qualification?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Doctors</h2>
          <p className="text-sm text-gray-500 mt-1">{doctors.length} doctors registered</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
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
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Speciality</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Experience</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDoctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                          {doc.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.qualification || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">{doc.speciality?.name || '-'}</td>
                    <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">{doc.experience_years ? `${doc.experience_years} yrs` : '-'}</td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${doc.is_active !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {doc.is_active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex gap-1">
                        <button onClick={() => handleEdit(doc)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(doc._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <Stethoscope className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                      <p>No doctors found</p>
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
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center p-4 pt-[10vh] overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
                  <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Speciality *</label>
                  <select required value={formData.speciality} onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all">
                    <option value="">Select</option>
                    {specialities.map((s: any) => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                  <input value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Experience (years)</label>
                  <input type="number" value={formData.experience_years} onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Consultation Fee (₹)</label>
                  <input type="number" value={formData.consultation_fee} onChange={(e) => setFormData({ ...formData, consultation_fee: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_active" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="rounded" />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingId ? 'Update Doctor' : 'Add Doctor'}
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
