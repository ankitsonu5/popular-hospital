'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Stethoscope } from 'lucide-react';

const API_URL = '/api-backend';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', speciality: '', qualification: '', designation: '',
    experience_years: '', experience_location: '', bio: '', image_url: '',
    consultation_fee: '', available_days: '', branches: [] as string[], is_active: true,
    opd_timings: {
      monday: '9am-12pm & 4pm-8pm',
      tuesday: '9am-12pm & 4pm-8pm',
      wednesday: '9am-12pm & 4pm-8pm',
      thursday: '9am-12pm & 4pm-8pm',
      friday: '9am-12pm & 4pm-8pm',
      saturday: '9am-12pm & 4pm-8pm',
      sunday: '-',
    }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [docsRes, specsRes, branchesRes] = await Promise.all([
        fetch(`${API_URL}/cms/doctors`, { headers: getHeaders() }),
        fetch(`${API_URL}/doctors/specialities`),
        fetch(`${API_URL}/branches`),
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
      designation: doc.designation || '',
      experience_years: doc.experience_years?.toString() || '',
      experience_location: doc.experience_location || '',
      bio: doc.bio || '', image_url: doc.image_url || '',
      consultation_fee: doc.consultation_fee?.toString() || '',
      available_days: doc.available_days || '',
      branches: doc.branches?.map((b: any) => b._id || b) || [],
      is_active: doc.is_active !== false,
      opd_timings: doc.opd_timings || {
        monday: '9am-12pm & 4pm-8pm', tuesday: '9am-12pm & 4pm-8pm', wednesday: '9am-12pm & 4pm-8pm',
        thursday: '9am-12pm & 4pm-8pm', friday: '9am-12pm & 4pm-8pm', saturday: '9am-12pm & 4pm-8pm',
        sunday: '-',
      }
    });
    setSelectedFile(null);
    setImagePreview(doc.image_url ? (doc.image_url.startsWith('http') ? doc.image_url : doc.image_url) : null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    await fetch(`${API_URL}/cms/doctors/${id}`, { method: 'DELETE', headers: getHeaders() });
    fetchData();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'branches') {
        (value as string[]).forEach((b: string) => data.append('branches[]', b));
      } else if (key === 'opd_timings') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value?.toString() || '');
      }
    });
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` };
      if (editingId) {
        await fetch(`${API_URL}/cms/doctors/${editingId}`, {
          method: 'PUT', headers, body: data,
        });
      } else {
        await fetch(`${API_URL}/cms/doctors`, {
          method: 'POST', headers, body: data,
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
    setFormData({ 
      name: '', slug: '', speciality: '', qualification: '', designation: '',
      experience_years: '', experience_location: '', bio: '', image_url: '', 
      consultation_fee: '', available_days: '', branches: [], is_active: true,
      opd_timings: {
        monday: '9am-12pm & 4pm-8pm', tuesday: '9am-12pm & 4pm-8pm', wednesday: '9am-12pm & 4pm-8pm',
        thursday: '9am-12pm & 4pm-8pm', friday: '9am-12pm & 4pm-8pm', saturday: '9am-12pm & 4pm-8pm',
        sunday: '-',
      }
    });
    setSelectedFile(null);
    setImagePreview(null);
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
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Department</th>
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
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 font-bold text-xs shrink-0 overflow-hidden border border-gray-100">
                          {doc.image_url ? (
                            <img src={doc.image_url.startsWith('http') ? doc.image_url : doc.image_url} alt={doc.name} className="w-full h-full object-cover" />
                          ) : (
                            doc.name?.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">{doc.name}</p>
                          <p className="text-[11px] text-[#0d9488] font-bold uppercase mt-0.5">{doc.designation || '-'}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{doc.qualification || '-'}</p>
                          {doc.experience_location && (
                            <p className="text-[10px] text-[#0d9488] font-bold uppercase mt-0.5">@ {doc.experience_location}</p>
                          )}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department *</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Designation</label>
                  <input value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" placeholder="e.g. Consultant" />
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Experience From (Hospital/Clinic)</label>
                  <input value={formData.experience_location} onChange={(e) => setFormData({ ...formData, experience_location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700">Bio</label>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      (formData.bio.trim() ? formData.bio.trim().split(/\s+/).length : 0) > 500 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {formData.bio.trim() ? formData.bio.trim().split(/\s+/).length : 0} / 500 words
                    </span>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Max 500 words</span>
                  </div>
                </div>
                <textarea rows={5} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about the doctor's background..."
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none" />
              </div>
              
              {/* OPD Timings Section */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-900 border-b pb-2">OPD Timings</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(formData.opd_timings).map(([day, timing]) => (
                    <div key={day}>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{day}</label>
                      <input 
                        value={timing} 
                        onChange={(e) => setFormData({
                          ...formData,
                          opd_timings: { ...formData.opd_timings, [day]: e.target.value }
                        })}
                        className="w-full px-2 py-1.5 rounded-lg border-2 border-gray-100 text-[11px] focus:border-[#0d9488] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor's Photo</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => { setSelectedFile(null); setImagePreview(null); setFormData({...formData, image_url: ''}); }} 
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg hover:bg-red-600 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden" 
                      id="doctor-image" 
                    />
                    <label 
                      htmlFor="doctor-image" 
                      className="flex flex-col items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-200 border-dashed rounded-xl appearance-none cursor-pointer hover:border-[#0d9488] focus:outline-none"
                    >
                      <span className="flex items-center space-x-2">
                        <Plus className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Choose Image</span>
                      </span>
                    </label>
                  </div>
                </div>
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
