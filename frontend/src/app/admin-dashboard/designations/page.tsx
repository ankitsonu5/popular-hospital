'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const API_URL = '/api-backend';

export default function DesignationsPage() {
  const [designations, setDesignations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cms/designations`, { headers: getHeaders() });
      if (res.ok) {
        setDesignations(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `${API_URL}/cms/designations/${editingId}` 
        : `${API_URL}/cms/designations`;

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '' });
        fetchData();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save designation');
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const handleEdit = (desig: any) => {
    setEditingId(desig._id);
    setFormData({ name: desig.name });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This may affect doctors linked to this designation.')) return;
    try {
      await fetch(`${API_URL}/cms/designations/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin-dashboard/doctors" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Designations ({designations.length})</h2>
            <p className="text-sm text-gray-500">List of designations for doctors</p>
          </div>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormData({ name: '' }); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Designation
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-right py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {designations.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-gray-900">{d.name}</td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => handleEdit(d)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(d._id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {designations.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-10 text-gray-400">No designations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-6">{editingId ? 'Edit Designation' : 'Add New Designation'}</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Designation Name *</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="e.g. Senior Consultant"
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
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
