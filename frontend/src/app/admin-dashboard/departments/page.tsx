'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, LayoutGrid, Search } from 'lucide-react';

const API_URL = '/api-backend';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', department_display_name: '' });
  const [isSaving, setIsSaving] = useState(false);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Use the proxy route. Public path is /api-backend/doctors/specialities
      const res = await fetch(`${API_URL}/doctors/specialities`);
      const data = await res.json();
      setDepartments(data);
    } catch (e) { console.error('Fetch error:', e); }
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (dept: any) => {
    setEditingId(dept._id);
    setFormData({ 
      name: dept.name, 
      slug: dept.slug, 
      department_display_name: dept.department_display_name || '' 
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this department? This will also remove all doctors assigned to it.')) return;
    try {
      const res = await fetch(`${API_URL}/cms/specialities/${id}`, { 
        method: 'DELETE', 
        headers: getHeaders() 
      });

      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('admin_token');
        window.location.href = '/admin-login';
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete');
      }
      alert('Department deleted successfully');
      fetchData();
    } catch (e: any) { 
      console.error(e);
      alert('Error: ' + e.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Name is required');
    
    setIsSaving(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/cms/specialities/${editingId}`, {
          method: 'PUT', headers: getHeaders(), body: JSON.stringify(formData),
        });
      } else {
        res = await fetch(`${API_URL}/cms/specialities`, {
          method: 'POST', headers: getHeaders(), body: JSON.stringify(formData),
        });
      }

      if (res.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('admin_token');
        window.location.href = '/admin-login';
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        console.error('Response Error Body:', text);
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || `Error ${res.status}`);
        } catch (e) {
          throw new Error(`Server returned HTML (Status ${res.status}). Check if API URL is correct.`);
        }
      }

      alert(editingId ? 'Department updated' : 'Department added successfully');
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', slug: '', department_display_name: '' });
      await fetchData();
    } catch (e: any) { 
      console.error('Submit Error:', e);
      alert('Error: ' + e.message);
    }

    setIsSaving(false);
  };

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Departments</h2>
          <p className="text-sm text-gray-500 mt-1">{departments.length} categories active</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ name: '', slug: '', department_display_name: '' }); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDepts.map((spec: any) => (
            <div key={spec._id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{spec.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 truncate uppercase tracking-wider font-medium">/{spec.slug}</p>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(spec)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(spec._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {filteredDepts.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutGrid className="w-8 h-8 text-gray-200" />
               </div>
               <p className="text-sm">No departments found matching "{search}"</p>
            </div>
          )}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Department' : 'Add New Department'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" 
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
                <input 
                  required 
                  value={formData.slug} 
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name (for Doctor Cards)</label>
                <input 
                  value={formData.department_display_name} 
                  onChange={(e) => setFormData({ ...formData, department_display_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" 
                  placeholder="e.g. CARDIOLOGY"
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Will show as: DEPARTMENT OF {formData.department_display_name || formData.name || '...'}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSaving}
                  className="flex-1 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
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
